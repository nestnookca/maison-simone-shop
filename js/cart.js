/* Maison Simone — gestion du panier (démo locale, aucune transaction réelle) */
const CART_KEY = "ms_cart_v1";
const COUPON_KEY = "ms_coupon_v1";

/* Un identifiant de ligne peut contenir une variante : "id::Noir" */
function splitId(id){
  const i = id.indexOf("::");
  return i < 0 ? { base: id, variant: "" } : { base: id.slice(0, i), variant: id.slice(i + 2) };
}
function lineName(l){ return l.product.name + (l.variant ? " — " + l.variant : ""); }
const round2 = n => Math.round(n * 100) / 100;

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch(e){}
  updateCartBadge();
}
function addToCart(id, qty=1){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (line) line.qty = Math.min(20, line.qty + qty);
  else cart.push({ id, qty });
  saveCart(cart);
  return cart;
}
function removeFromCart(id){
  saveCart(getCart().filter(l => l.id !== id));
}
function setQty(id, qty){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (!line) return;
  line.qty = Math.max(1, Math.min(20, qty));
  saveCart(cart);
}
function cartLines(){
  return getCart().map(l => {
    const s = splitId(l.id);
    return { ...l, variant: s.variant, product: getProduct(s.base) };
  }).filter(l => l.product);
}
function cartCount(){
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}
function cartSubtotal(){
  return round2(cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0));
}

/* ---------- Code promo ---------- */
function getCoupon(){
  try { return localStorage.getItem(COUPON_KEY) || ""; } catch(e){ return ""; }
}
function setCoupon(code){
  try { code ? localStorage.setItem(COUPON_KEY, code) : localStorage.removeItem(COUPON_KEY); } catch(e){}
}
/* Retourne true si le code saisi est valide (et l'enregistre) */
function tryCoupon(input){
  if (String(input || "").trim().toUpperCase() === SITE_CONFIG.couponCode){
    setCoupon(SITE_CONFIG.couponCode);
    return true;
  }
  return false;
}

/* ---------- Totaux ---------- */
function cartTotals(){
  const subtotal = cartSubtotal();
  const coupon = getCoupon() === SITE_CONFIG.couponCode ? SITE_CONFIG.couponCode : "";
  const discount = coupon ? round2(subtotal * SITE_CONFIG.couponRate) : 0;
  const shipping = subtotal > 0 && subtotal < SITE_CONFIG.freeShippingFrom ? SITE_CONFIG.shippingFee : 0;
  const tax = round2((subtotal - discount) * SITE_CONFIG.taxRate);
  const total = round2(subtotal - discount + shipping + tax);
  return { subtotal, coupon, discount, shipping, tax, total };
}

function updateCartBadge(){
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
}
document.addEventListener("DOMContentLoaded", updateCartBadge);
