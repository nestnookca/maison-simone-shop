/* Maison Simone — gestion du panier (démo locale, aucune transaction réelle) */
const CART_KEY = "ms_cart_v1";

function getCart(){
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch(e){ return []; }
}
function saveCart(cart){
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}
function addToCart(id, qty=1){
  const cart = getCart();
  const line = cart.find(l => l.id === id);
  if (line) line.qty += qty;
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
  return getCart().map(l => ({ ...l, product: getProduct(l.id) })).filter(l => l.product);
}
function cartCount(){
  return getCart().reduce((sum, l) => sum + l.qty, 0);
}
function cartSubtotal(){
  return cartLines().reduce((sum, l) => sum + l.product.price * l.qty, 0);
}
function updateCartBadge(){
  document.querySelectorAll("[data-cart-count]").forEach(el => {
    const n = cartCount();
    el.textContent = n;
    el.style.display = n > 0 ? "flex" : "none";
  });
}
document.addEventListener("DOMContentLoaded", updateCartBadge);
