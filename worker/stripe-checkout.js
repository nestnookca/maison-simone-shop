/**
 * Maison Simone — création d'une session Stripe Checkout (Cloudflare Worker).
 *
 * Le navigateur envoie { items: [{ id, qty, variant }], coupon }.
 * Les prix sont relus ICI (catalog.js), jamais pris du navigateur.
 *
 * Variables (Cloudflare → Settings → Variables) :
 *   STRIPE_SECRET_KEY  (secret)  clé secrète Stripe : sk_live_… ou sk_test_…
 *   SITE_URL           https://maisonsimon.shop
 *   AUTOMATIC_TAX      "1" pour que Stripe Tax calcule TPS/TVQ (à activer dans Stripe)
 */
import { CATALOG } from "./catalog.js";

const COUPON_CODE = "BIENVENUE10";
const COUPON_PERCENT = 10;
const FREE_SHIPPING_FROM_CENTS = 10000; // 100 $
const SHIPPING_FEE_CENTS = 1200;        // 12 $

export default {
  async fetch(request, env) {
    try { return await handle(request, env); }
    catch (e) { return new Response(JSON.stringify({ error: String(e.message || e) }), { status: 400, headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": env.SITE_URL || "*" } }); }
  }
};

async function handle(request, env) {
  {
    const origin = env.SITE_URL || "https://maisonsimon.shop";
    const cors = {
      "Access-Control-Allow-Origin": origin,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") return json({ error: "Méthode non permise" }, 405, cors);

    let body;
    try { body = await request.json(); } catch { return json({ error: "Requête invalide" }, 400, cors); }

    const items = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
    if (!items.length) return json({ error: "Panier vide" }, 400, cors);

    const params = new URLSearchParams();
    params.set("mode", "payment");
    params.set("success_url", origin + "/merci.html");
    params.set("cancel_url", origin + "/panier.html");
    params.set("locale", "fr-CA");
    params.set("billing_address_collection", "auto");
    params.set("phone_number_collection[enabled]", "true");
    params.append("shipping_address_collection[allowed_countries][]", "CA");

    let subtotal = 0;
    items.forEach((it, i) => {
      const p = CATALOG[it.id];
      const qty = Math.max(1, Math.min(20, parseInt(it.qty, 10) || 1));
      if (!p) throw new Error("Produit inconnu : " + it.id);
      let name = p.name;
      if (p.options) {
        if (!p.options.includes(it.variant)) throw new Error("Option invalide pour " + it.id);
        name += " — " + it.variant;
      }
      subtotal += p.cents * qty;
      params.set(`line_items[${i}][quantity]`, String(qty));
      params.set(`line_items[${i}][price_data][currency]`, "cad");
      params.set(`line_items[${i}][price_data][unit_amount]`, String(p.cents));
      params.set(`line_items[${i}][price_data][product_data][name]`, name);
      if (env.AUTOMATIC_TAX === "1") params.set(`line_items[${i}][price_data][tax_behavior]`, "exclusive");
    });

    // Livraison : gratuite dès 100 $ (avant rabais), sinon 12 $
    const free = subtotal >= FREE_SHIPPING_FROM_CENTS;
    params.set("shipping_options[0][shipping_rate_data][type]", "fixed_amount");
    params.set("shipping_options[0][shipping_rate_data][display_name]", free ? "Livraison gratuite" : "Livraison standard");
    params.set("shipping_options[0][shipping_rate_data][fixed_amount][amount]", String(free ? 0 : SHIPPING_FEE_CENTS));
    params.set("shipping_options[0][shipping_rate_data][fixed_amount][currency]", "cad");
    params.set("shipping_options[0][shipping_rate_data][delivery_estimate][minimum][unit]", "business_day");
    params.set("shipping_options[0][shipping_rate_data][delivery_estimate][minimum][value]", "2");
    params.set("shipping_options[0][shipping_rate_data][delivery_estimate][maximum][unit]", "business_day");
    params.set("shipping_options[0][shipping_rate_data][delivery_estimate][maximum][value]", "5");
    if (env.AUTOMATIC_TAX === "1") params.set("automatic_tax[enabled]", "true");

    // Rabais de bienvenue : un coupon à usage unique créé pour cette session
    if (String(body.coupon || "").trim().toUpperCase() === COUPON_CODE) {
      const c = await stripe(env, "/v1/coupons", new URLSearchParams({
        percent_off: String(COUPON_PERCENT), duration: "once", max_redemptions: "1", name: COUPON_CODE
      }));
      if (c.id) params.set("discounts[0][coupon]", c.id);
    }

    const session = await stripe(env, "/v1/checkout/sessions", params);
    if (!session.url) return json({ error: (session.error && session.error.message) || "Erreur Stripe" }, 502, cors);
    return json({ url: session.url }, 200, cors);
  }
}

async function stripe(env, path, params) {
  const r = await fetch("https://api.stripe.com" + path, {
    method: "POST",
    headers: { Authorization: "Bearer " + env.STRIPE_SECRET_KEY, "Content-Type": "application/x-www-form-urlencoded" },
    body: params
  });
  return r.json();
}
function json(data, status, headers) {
  return new Response(JSON.stringify(data), { status, headers: { ...headers, "Content-Type": "application/json" } });
}
