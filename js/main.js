/* Maison Simone — comportements globaux */

/* ---------- Navigation mobile ---------- */
function initNav(){
  const burger = document.querySelector(".burger");
  const mobileNav = document.querySelector(".mobile-nav");
  const scrim = document.querySelector(".scrim");
  const closeX = document.querySelector(".close-x");
  const open = () => { mobileNav.classList.add("open"); scrim.classList.add("open"); };
  const close = () => { mobileNav.classList.remove("open"); scrim.classList.remove("open"); };
  if (burger) burger.addEventListener("click", open);
  if (closeX) closeX.addEventListener("click", close);
  if (scrim) scrim.addEventListener("click", close);
  document.querySelectorAll(".mobile-nav a").forEach(a => a.addEventListener("click", close));

  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("data-nav") === path) a.classList.add("active");
  });
}

/* ---------- Reveal on scroll ---------- */
function initReveal(){
  const items = document.querySelectorAll(".reveal:not(.in)");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.15 });
  items.forEach(el => io.observe(el));
}

/* ---------- Toast ---------- */
let toastTimer;
function showToast(title, msg){
  let toast = document.querySelector(".toast");
  if (!toast){
    toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<svg><use href="#i-check"/></svg><div><b></b><span></span></div>`;
    document.body.appendChild(toast);
  }
  toast.querySelector("b").textContent = title;
  toast.querySelector("span").textContent = msg;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

/* ---------- Envoi de formulaires vers le service configuré ---------- */
function collectForm(form){
  const data = {};
  form.querySelectorAll("input, select, textarea").forEach(el => {
    if (el.type === "password" || el.type === "submit" || el.type === "button") return;
    const label = el.closest(".field")?.querySelector("label")?.textContent || el.name || el.placeholder || el.type;
    if (/carte|cvc|expiration/i.test(label)) return; // on n'envoie jamais d'informations de paiement
    if (el.value) data[label.trim()] = el.value;
  });
  return data;
}
function postToService(payload){
  if (!SITE_CONFIG.formEndpoint) return Promise.resolve(false);
  return fetch(SITE_CONFIG.formEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Accept": "application/json" },
    body: JSON.stringify(payload)
  }).then(r => r.ok).catch(() => false);
}

/* ---------- Product card markup ---------- */
function productCard(p){
  const oldPrice = p.old ? `<span class="old">${fmtPrice(p.old)} $</span>` : "";
  const badge = p.badge ? `<span class="pc-badge">${p.badge}</span>` : "";
  return `
  <div class="product-card reveal" data-cat="${p.cat}">
    <a href="produit.html?id=${p.id}" class="pc-media">
      ${badge}
      <img src="${p.img}" alt="${p.name}" loading="lazy">
      <div class="pc-quick"><span class="btn small ghost"><span>Voir le produit</span></span></div>
    </a>
    <div class="pc-body">
      <span class="pc-cat">${CATEGORIES[p.cat]}</span>
      <a href="produit.html?id=${p.id}"><h3 class="pc-title">${p.name}</h3></a>
      <p class="pc-desc">${p.short}</p>
      <div class="pc-foot">
        <div class="pc-price">${oldPrice}${fmtPrice(p.price)} $</div>
        <button class="add-btn" data-add="${p.id}" aria-label="Ajouter au panier : ${p.name}">
          <svg style="width:18px;height:18px"><use href="#i-cart"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function bindAddButtons(root=document, after){
  root.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-add");
      const p = getProduct(id);
      if (p.options){ location.href = "produit.html?id=" + id; return; }
      addToCart(id, 1);
      showToast("Ajouté au panier", p.name);
      if (after) after();
    });
  });
}

/* ---------- Home: featured products ---------- */
function renderFeatured(){
  const el = document.querySelector("[data-featured]");
  if (!el) return;
  const picks = PRODUCTS.filter(p => p.badge === "Meilleure vente").slice(0, 8);
  el.innerHTML = picks.map(productCard).join("");
  bindAddButtons(el);
}

/* ---------- Catalogue page ---------- */
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

function renderCatalogue(){
  const el = document.querySelector("[data-catalogue]");
  if (!el) return;
  const params = new URLSearchParams(location.search);
  let active = params.get("cat") || "tous";
  const search = document.querySelector("[data-search]");
  const sort = document.querySelector("[data-sort]");
  const count = document.querySelector("[data-count]");

  function paint(){
    let list = active === "tous" ? PRODUCTS.slice() : PRODUCTS.filter(p => p.cat === active);
    const q = search ? norm(search.value.trim()) : "";
    if (q) list = list.filter(p => norm([p.name, p.short, p.ingr, CATEGORIES[p.cat]].join(" ")).includes(q));
    const mode = sort ? sort.value : "";
    if (mode === "prix-asc") list.sort((a, b) => a.price - b.price);
    else if (mode === "prix-desc") list.sort((a, b) => b.price - a.price);
    else if (mode === "nom") list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    else if (mode === "ventes") list.sort((a, b) => (b.badge === "Meilleure vente") - (a.badge === "Meilleure vente"));
    el.innerHTML = list.length
      ? list.map(productCard).join("")
      : `<p class="no-result">Aucun produit ne correspond à votre recherche.</p>`;
    if (count) count.textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
    bindAddButtons(el);
    initReveal();
    document.querySelectorAll(".filters button").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === active);
    });
  }
  document.querySelectorAll(".filters button").forEach(b => {
    b.addEventListener("click", () => { active = b.dataset.filter; paint(); });
  });
  if (search) search.addEventListener("input", paint);
  if (sort) sort.addEventListener("change", paint);
  paint();
}

/* ---------- Product detail page ---------- */
function renderProductDetail(){
  const el = document.querySelector("[data-product-detail]");
  if (!el) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id) || PRODUCTS[0];
  document.title = `${p.name} — Maison Simone`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) metaDesc.content = p.short;

  const ld = document.createElement("script");
  ld.type = "application/ld+json";
  ld.textContent = JSON.stringify({
    "@context": "https://schema.org", "@type": "Product",
    name: p.name, description: p.short,
    image: new URL(p.img, location.href).href,
    category: CATEGORIES[p.cat],
    brand: { "@type": "Brand", name: "Maison Simone" },
    offers: { "@type": "Offer", priceCurrency: "CAD", price: p.price.toFixed(2), availability: "https://schema.org/InStock", url: location.href }
  });
  document.head.appendChild(ld);

  const thumbs = p.img2 ? `
        <div class="thumbs">
          <button type="button" class="on" data-thumb="${p.img}" aria-label="Photo 1"><img src="${p.img}" alt=""></button>
          <button type="button" data-thumb="${p.img2}" aria-label="Photo 2"><img src="${p.img2}" alt=""></button>
        </div>` : "";
  const options = p.options ? `
        <div class="opt-row"><label for="opt">${p.options.label}</label>
          <select id="opt" data-option>${p.options.values.map(v => `<option>${v}</option>`).join("")}</select>
        </div>` : "";

  el.innerHTML = `
    <div class="split">
      <div class="reveal in">
        <div class="split-art">
          ${p.badge ? `<span class="pc-badge" style="position:absolute;top:20px;left:20px;z-index:2">${p.badge}</span>` : ""}
          <img src="${p.img}" alt="${p.name}" data-main-img>
        </div>${thumbs}
      </div>
      <div class="reveal in">
        <span class="pc-cat">${CATEGORIES[p.cat]}</span>
        <h1 class="serif" style="font-size:2.4rem;margin-top:10px">${p.name}</h1>
        <div class="pc-price" style="font-size:1.6rem;margin-top:16px">
          ${p.old ? `<span class="old">${fmtPrice(p.old)} $</span>` : ""}${fmtPrice(p.price)} $
          ${p.vol ? `<span style="font-size:.7rem;color:var(--cream-dim);font-family:'Jost',sans-serif">— ${p.vol}</span>` : ""}
        </div>
        <p style="color:var(--cream-dim);margin-top:22px">${p.desc}</p>
        <div class="divider left"></div>
        ${p.inc ? `<p style="font-size:.82rem;color:var(--gold-light);margin-bottom:6px"><b>Contenu du coffret</b></p>
        <p style="font-size:.86rem;color:var(--cream-dim)">${p.inc}</p>` : ""}
        ${p.ingr ? `<p style="font-size:.82rem;color:var(--gold-light);margin:16px 0 6px"><b>Ingrédients clés</b></p>
        <p style="font-size:.86rem;color:var(--cream-dim)">${p.ingr}</p>` : ""}
        ${options}
        <div class="buy-row">
          <div class="qty-box"><button type="button" data-q-dec aria-label="Moins">–</button><input type="text" value="1" readonly data-q aria-label="Quantité"><button type="button" data-q-inc aria-label="Plus">+</button></div>
          <button class="btn solid" data-buy><span>Ajouter au panier</span></button>
          <a href="panier.html" class="btn ghost"><span>Voir le panier</span></a>
        </div>
        <ul class="trust-list">
          <li><svg><use href="#i-truck"/></svg> Livraison gratuite dès ${SITE_CONFIG.freeShippingFrom}&nbsp;$ — expédition sous 2 à 3 jours ouvrables</li>
          <li><svg><use href="#i-check"/></svg> 10&nbsp;% de rabais sur votre première commande — <a href="#" data-open-promo>obtenir mon code</a></li>
          <li><svg><use href="#i-pin"/></svg> Boutique à Québec : centre commercial Fleur de Lys, entrée no&nbsp;3</li>
        </ul>
      </div>
    </div>
    <div class="sticky-buy" data-sticky>
      <div><b>${p.name}</b><span>${fmtPrice(p.price)} $</span></div>
      <button class="btn solid small" data-buy><span>Ajouter</span></button>
    </div>`;

  let qty = 1;
  const qInput = el.querySelector("[data-q]");
  el.querySelector("[data-q-dec]").addEventListener("click", () => { qty = Math.max(1, qty - 1); qInput.value = qty; });
  el.querySelector("[data-q-inc]").addEventListener("click", () => { qty = Math.min(20, qty + 1); qInput.value = qty; });
  el.querySelectorAll("[data-thumb]").forEach(t => t.addEventListener("click", () => {
    el.querySelector("[data-main-img]").src = t.dataset.thumb;
    el.querySelectorAll("[data-thumb]").forEach(x => x.classList.toggle("on", x === t));
  }));
  el.querySelectorAll("[data-buy]").forEach(btn => btn.addEventListener("click", () => {
    const variant = el.querySelector("[data-option]")?.value;
    addToCart(variant ? `${p.id}::${variant}` : p.id, qty);
    showToast("Ajouté au panier", `${p.name}${variant ? " — " + variant : ""}${qty > 1 ? " × " + qty : ""}`);
  }));

  const relEl = document.querySelector("[data-related]");
  if (relEl){
    const same = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id);
    const others = PRODUCTS.filter(x => x.cat !== p.cat && x.badge === "Meilleure vente");
    relEl.innerHTML = same.concat(others).slice(0, 4).map(productCard).join("");
    bindAddButtons(relEl);
  }
}

/* ---------- Cart page ---------- */
function shippingBar(subtotal){
  const goal = SITE_CONFIG.freeShippingFrom;
  const rest = round2(goal - subtotal);
  const pct = Math.min(100, subtotal / goal * 100);
  return rest > 0
    ? `<div class="ship-bar"><p>Plus que <b>${fmtPrice(rest)} $</b> pour obtenir la livraison gratuite</p><div class="bar"><i style="width:${pct}%"></i></div></div>`
    : `<div class="ship-bar ok"><p>✓ Votre commande est admissible à la livraison gratuite</p><div class="bar"><i style="width:100%"></i></div></div>`;
}

function renderCart(){
  const el = document.querySelector("[data-cart]");
  if (!el) return;
  const upsell = document.querySelector("[data-cart-upsell]");

  function paintUpsell(){
    if (!upsell) return;
    const inCart = new Set(cartLines().map(l => l.product.id));
    const picks = PRODUCTS.filter(p => !inCart.has(p.id) && !p.options)
      .sort((a, b) => (b.badge === "Meilleure vente") - (a.badge === "Meilleure vente")).slice(0, 4);
    upsell.innerHTML = picks.map(productCard).join("");
    bindAddButtons(upsell, () => { paint(); paintSummary(); });
    initReveal();
  }

  function paint(){
    const lines = cartLines();
    if (!lines.length){
      el.innerHTML = `
        <div class="empty-state reveal in">
          <svg><use href="#i-empty-cart"/></svg>
          <h3 class="serif" style="font-size:1.6rem;margin-bottom:10px">Votre panier est vide</h3>
          <p>Découvrez nos soins signature.</p>
          <a href="produits.html" class="btn solid"><span>Découvrir la boutique</span></a>
        </div>`;
      document.querySelector("[data-cart-summary]")?.style.setProperty("display","none");
      paintUpsell();
      return;
    }
    document.querySelector("[data-cart-summary]")?.style.removeProperty("display");

    const rows = lines.map(l => `
      <tr data-row="${l.id}">
        <td>
          <div class="cart-item">
            <img src="${l.product.img}" alt="">
            <div><b>${lineName(l)}</b><span>${l.product.vol || ""}</span>
              <a class="remove-link" data-remove="${l.id}">Retirer</a>
            </div>
          </div>
        </td>
        <td>${fmtPrice(l.product.price)} $</td>
        <td>
          <div class="qty-box">
            <button data-dec="${l.id}">–</button>
            <input type="text" value="${l.qty}" readonly>
            <button data-inc="${l.id}">+</button>
          </div>
        </td>
        <td style="text-align:right">${fmtPrice(l.product.price * l.qty)} $</td>
      </tr>`).join("");

    const mobile = lines.map(l => `
      <div class="mcart-item" data-row="${l.id}">
        <img src="${l.product.img}" alt="">
        <div style="flex:1">
          <b style="font-family:'Cormorant Garamond',serif;font-size:1.05rem">${lineName(l)}</b>
          <div style="font-size:.78rem;color:var(--cream-dim);margin:4px 0 10px">${fmtPrice(l.product.price)} $${l.product.vol ? " · " + l.product.vol : ""}</div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div class="qty-box"><button data-dec="${l.id}">–</button><input type="text" value="${l.qty}" readonly><button data-inc="${l.id}">+</button></div>
            <a class="remove-link" data-remove="${l.id}">Retirer</a>
          </div>
        </div>
      </div>`).join("");

    el.innerHTML = `
      ${shippingBar(cartSubtotal())}
      <table class="cart-table">
        <thead><tr><th>Produit</th><th>Prix</th><th>Quantité</th><th style="text-align:right">Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="mobile-cart">${mobile}</div>`;

    const refresh = () => { paint(); paintSummary(); };
    el.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => {
      const l = getCart().find(x => x.id === b.dataset.inc); setQty(b.dataset.inc, l.qty + 1); refresh();
    }));
    el.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => {
      const l = getCart().find(x => x.id === b.dataset.dec); setQty(b.dataset.dec, l.qty - 1); refresh();
    }));
    el.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => {
      removeFromCart(b.dataset.remove); refresh();
    }));
    paintUpsell();
  }

  function paintSummary(){
    const sum = document.querySelector("[data-cart-summary]");
    if (!sum) return;
    const t = cartTotals();
    sum.innerHTML = `
      <div class="summary-row"><span>Sous-total</span><span>${fmtPrice(t.subtotal)} $</span></div>
      ${t.coupon ? `<div class="summary-row discount"><span>Rabais ${t.coupon} (−${Math.round(SITE_CONFIG.couponRate * 100)} %) <a class="remove-link" data-coupon-remove>retirer</a></span><span>−${fmtPrice(t.discount)} $</span></div>` : ""}
      <div class="summary-row"><span>Livraison</span><span>${t.shipping === 0 ? "Gratuite" : fmtPrice(t.shipping) + " $"}</span></div>
      <div class="summary-row"><span>Taxes (TPS/TVQ est.)</span><span>${fmtPrice(t.tax)} $</span></div>
      <div class="summary-row total"><span>Total</span><span>${fmtPrice(t.total)} $</span></div>
      ${t.coupon ? "" : `
      <form class="coupon-row" data-coupon-form>
        <input type="text" data-coupon-input placeholder="Code promo" aria-label="Code promo" autocomplete="off">
        <button type="submit">Appliquer</button>
      </form>
      <p class="coupon-msg" data-coupon-msg>Nouveau client ? <a href="#" data-open-promo>Obtenez 10&nbsp;% de rabais</a></p>`}
      <a href="commande.html" class="btn solid block" style="margin-top:24px ${t.subtotal===0?';pointer-events:none;opacity:.4':''}"><span>Passer à la caisse</span></a>
      <p style="font-size:.7rem;color:var(--cream-dim);margin-top:14px;text-align:center">Site de démonstration — aucun paiement réel n'est traité.</p>`;

    sum.querySelector("[data-coupon-form]")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const v = sum.querySelector("[data-coupon-input]").value;
      if (tryCoupon(v)){ showToast("Code appliqué", "10 % de rabais sur votre commande"); paintSummary(); }
      else {
        const msg = sum.querySelector("[data-coupon-msg]");
        msg.textContent = "Ce code n'est pas valide.";
        msg.classList.add("err");
      }
    });
    sum.querySelector("[data-coupon-remove]")?.addEventListener("click", () => { setCoupon(""); paintSummary(); });
    if (window.MSPromo) MSPromo.bind(sum);
  }

  paint();
  paintSummary();
  window.addEventListener("ms:coupon", paintSummary);
}

/* ---------- Checkout ---------- */
function initCheckout(){
  const form = document.querySelector("[data-checkout-form]");
  if (!form) return;

  const steps = document.querySelectorAll(".step");
  const panels = document.querySelectorAll("[data-panel]");
  let current = 1;

  function goTo(n){
    current = n;
    panels.forEach(p => p.style.display = (+p.dataset.panel === n) ? "block" : "none");
    steps.forEach(s => {
      const sn = +s.dataset.step;
      s.classList.toggle("active", sn === n);
      s.classList.toggle("done", sn < n);
    });
    window.scrollTo({ top: document.querySelector(".steps").offsetTop - 100, behavior:"smooth" });
  }

  document.querySelectorAll("[data-next]").forEach(btn => btn.addEventListener("click", () => {
    const panel = btn.closest("[data-panel]");
    const inputs = panel.querySelectorAll("input[required]");
    for (const inp of inputs) if (!inp.value.trim()){ inp.focus(); return; }
    goTo(current + 1);
  }));
  document.querySelectorAll("[data-back]").forEach(btn => btn.addEventListener("click", () => goTo(current - 1)));

  document.querySelectorAll(".pay-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".pay-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      document.querySelectorAll("[data-pay-panel]").forEach(p => {
        p.style.display = p.dataset.payPanel === tab.dataset.pay ? "block" : "none";
      });
    });
  });

  const sum = document.querySelector("[data-checkout-summary]");
  if (sum){
    const lines = cartLines();
    if (!lines.length){ location.href = "panier.html"; return; }
    const t = cartTotals();
    sum.innerHTML = `
      ${lines.map(l => `
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:14px;font-size:.85rem">
          <span style="color:var(--cream-dim)">${lineName(l)} × ${l.qty}</span>
          <span>${fmtPrice(l.product.price * l.qty)} $</span>
        </div>`).join("")}
      <div class="divider left" style="margin:18px 0"></div>
      <div class="summary-row"><span>Sous-total</span><span>${fmtPrice(t.subtotal)} $</span></div>
      ${t.coupon ? `<div class="summary-row discount"><span>Rabais ${t.coupon}</span><span>−${fmtPrice(t.discount)} $</span></div>` : ""}
      <div class="summary-row"><span>Livraison</span><span>${t.shipping === 0 ? "Gratuite" : fmtPrice(t.shipping) + " $"}</span></div>
      <div class="summary-row"><span>Taxes est.</span><span>${fmtPrice(t.tax)} $</span></div>
      <div class="summary-row total"><span>Total</span><span>${fmtPrice(t.total)} $</span></div>`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const orderId = "MS-" + Math.floor(100000 + Math.random() * 899999);
    const t = cartTotals();
    postToService({
      type: "commande", orderId,
      client: collectForm(form.querySelector('[data-panel="1"]')),
      articles: cartLines().map(l => ({ produit: lineName(l), quantite: l.qty, prix: l.product.price })),
      totaux: t
    });
    document.querySelector("[data-order-id]").textContent = orderId;
    try { localStorage.removeItem(CART_KEY); } catch(err){}
    updateCartBadge();
    goTo(4);
  });

  goTo(1);
}

/* ---------- Contact (formulaire) ---------- */
function initFakeForms(){
  document.querySelectorAll("[data-fake-form]").forEach(f => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
      postToService({ type: "contact", ...collectForm(f) });
      showToast("Message envoyé", "Merci — notre équipe vous répondra sous peu.");
      f.reset();
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  renderFeatured();
  renderCatalogue();
  renderProductDetail();
  renderCart();
  initCheckout();
  initFakeForms();
  initReveal();
  updateCartBadge();
});
