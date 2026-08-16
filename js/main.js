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
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
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

/* ---------- Product card markup ---------- */
function productCard(p){
  const oldPrice = p.old ? `<span class="old">${fmtPrice(p.old)} $</span>` : "";
  const badge = p.badge ? `<span class="pc-badge">${p.badge}</span>` : "";
  return `
  <div class="product-card reveal" data-cat="${p.cat}">
    <a href="produit.html?id=${p.id}" class="pc-media">
      ${badge}
      <svg><use href="#${p.icon}"/></svg>
      <div class="pc-quick"><a class="btn small ghost" href="produit.html?id=${p.id}"><span>Voir le produit</span></a></div>
    </a>
    <div class="pc-body">
      <span class="pc-cat">${p.cat === "soins" ? "Soins visage" : "Appareils"}</span>
      <a href="produit.html?id=${p.id}"><h3 class="pc-title">${p.name}</h3></a>
      <p class="pc-desc">${p.short}</p>
      <div class="pc-foot">
        <div class="pc-price">${oldPrice}${fmtPrice(p.price)} $</div>
        <button class="add-btn" data-add="${p.id}" aria-label="Ajouter au panier">
          <svg style="width:18px;height:18px"><use href="#i-cart"/></svg>
        </button>
      </div>
    </div>
  </div>`;
}

function bindAddButtons(root=document){
  root.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const id = btn.getAttribute("data-add");
      const p = getProduct(id);
      addToCart(id, 1);
      showToast("Ajouté au panier", p.name);
    });
  });
}

/* ---------- Home: featured products ---------- */
function renderFeatured(){
  const el = document.querySelector("[data-featured]");
  if (!el) return;
  const picks = PRODUCTS.filter(p => p.badge).slice(0, 8);
  el.innerHTML = picks.map(productCard).join("");
  bindAddButtons(el);
}

/* ---------- Catalogue page ---------- */
function renderCatalogue(){
  const el = document.querySelector("[data-catalogue]");
  if (!el) return;
  const params = new URLSearchParams(location.search);
  let active = params.get("cat") || "tous";

  function paint(){
    const list = active === "tous" ? PRODUCTS : PRODUCTS.filter(p => p.cat === active);
    el.innerHTML = list.map(productCard).join("");
    bindAddButtons(el);
    initReveal();
    document.querySelectorAll(".filters button").forEach(b => {
      b.classList.toggle("active", b.dataset.filter === active);
    });
  }
  document.querySelectorAll(".filters button").forEach(b => {
    b.addEventListener("click", () => { active = b.dataset.filter; paint(); });
  });
  paint();
}

/* ---------- Product detail page ---------- */
function renderProductDetail(){
  const el = document.querySelector("[data-product-detail]");
  if (!el) return;
  const id = new URLSearchParams(location.search).get("id");
  const p = getProduct(id) || PRODUCTS[0];
  document.title = `${p.name} — Maison Simone`;
  el.innerHTML = `
    <div class="split">
      <div class="split-art reveal in">
        ${p.badge ? `<span class="pc-badge" style="position:absolute;top:20px;left:20px">${p.badge}</span>` : ""}
        <svg><use href="#${p.icon}"/></svg>
      </div>
      <div class="reveal in">
        <span class="pc-cat">${p.cat === "soins" ? "Soins visage" : "Appareils professionnels"}</span>
        <h1 class="serif" style="font-size:2.4rem;margin-top:10px">${p.name}</h1>
        <div class="pc-price" style="font-size:1.6rem;margin-top:16px">
          ${p.old ? `<span class="old">${fmtPrice(p.old)} $</span>` : ""}${fmtPrice(p.price)} $
          <span style="font-size:.7rem;color:var(--cream-dim);font-family:'Jost',sans-serif">— ${p.vol}</span>
        </div>
        <p style="color:var(--cream-dim);margin-top:22px">${p.desc}</p>
        <div class="divider left"></div>
        <p style="font-size:.82rem;color:var(--gold-light);margin-bottom:6px"><b>Mode d'emploi</b></p>
        <p style="font-size:.86rem;color:var(--cream-dim)">${p.use}</p>
        <p style="font-size:.82rem;color:var(--gold-light);margin:16px 0 6px"><b>Ingrédients clés</b></p>
        <p style="font-size:.86rem;color:var(--cream-dim)">${p.ingr}</p>
        <div style="display:flex;gap:16px;margin-top:34px;align-items:center;flex-wrap:wrap">
          <button class="btn solid" data-add="${p.id}"><span>Ajouter au panier</span></button>
          <a href="panier.html" class="btn ghost"><span>Voir le panier</span></a>
        </div>
        <div class="secure-note"><svg><use href="#i-truck"/></svg> Livraison partout au Canada — expédition sous 2 à 3 jours ouvrables.</div>
      </div>
    </div>`;
  bindAddButtons(el);

  const relEl = document.querySelector("[data-related]");
  if (relEl){
    const rel = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 4);
    relEl.innerHTML = rel.map(productCard).join("");
    bindAddButtons(relEl);
  }
}

/* ---------- Cart page ---------- */
function renderCart(){
  const el = document.querySelector("[data-cart]");
  if (!el) return;

  function paint(){
    const lines = cartLines();
    if (!lines.length){
      el.innerHTML = `
        <div class="empty-state reveal in">
          <svg><use href="#i-empty-cart"/></svg>
          <h3 class="serif" style="font-size:1.6rem;margin-bottom:10px">Votre panier est vide</h3>
          <p>Découvrez nos soins et appareils signature.</p>
          <a href="produits.html" class="btn solid"><span>Découvrir la boutique</span></a>
        </div>`;
      document.querySelector("[data-cart-summary]")?.style.setProperty("display","none");
      return;
    }
    document.querySelector("[data-cart-summary]")?.style.removeProperty("display");

    const rows = lines.map(l => `
      <tr data-row="${l.id}">
        <td>
          <div class="cart-item">
            <svg><use href="#${l.product.icon}"/></svg>
            <div><b>${l.product.name}</b><span>${l.product.vol}</span>
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
        <svg><use href="#${l.product.icon}"/></svg>
        <div style="flex:1">
          <b style="font-family:'Cormorant Garamond',serif;font-size:1.05rem">${l.product.name}</b>
          <div style="font-size:.78rem;color:var(--cream-dim);margin:4px 0 10px">${fmtPrice(l.product.price)} $ · ${l.product.vol}</div>
          <div style="display:flex;justify-content:space-between;align-items:center">
            <div class="qty-box"><button data-dec="${l.id}">–</button><input type="text" value="${l.qty}" readonly><button data-inc="${l.id}">+</button></div>
            <a class="remove-link" data-remove="${l.id}">Retirer</a>
          </div>
        </div>
      </div>`).join("");

    el.innerHTML = `
      <table class="cart-table">
        <thead><tr><th>Produit</th><th>Prix</th><th>Quantité</th><th style="text-align:right">Total</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <div class="mobile-cart">${mobile}</div>`;

    el.querySelectorAll("[data-inc]").forEach(b => b.addEventListener("click", () => {
      const l = getCart().find(x => x.id === b.dataset.inc); setQty(b.dataset.inc, l.qty + 1); paint(); paintSummary();
    }));
    el.querySelectorAll("[data-dec]").forEach(b => b.addEventListener("click", () => {
      const l = getCart().find(x => x.id === b.dataset.dec); setQty(b.dataset.dec, l.qty - 1); paint(); paintSummary();
    }));
    el.querySelectorAll("[data-remove]").forEach(b => b.addEventListener("click", () => {
      removeFromCart(b.dataset.remove); paint(); paintSummary();
    }));
  }

  function paintSummary(){
    const sum = document.querySelector("[data-cart-summary]");
    if (!sum) return;
    const subtotal = cartSubtotal();
    const shipping = subtotal > 0 ? (subtotal >= 100 ? 0 : 12) : 0;
    const tax = subtotal * 0.14975;
    const total = subtotal + shipping + tax;
    sum.innerHTML = `
      <div class="summary-row"><span>Sous-total</span><span>${fmtPrice(subtotal)} $</span></div>
      <div class="summary-row"><span>Livraison</span><span>${shipping === 0 ? "Gratuite" : fmtPrice(shipping) + " $"}</span></div>
      <div class="summary-row"><span>Taxes (TPS/TVQ est.)</span><span>${fmtPrice(tax)} $</span></div>
      <div class="summary-row total"><span>Total</span><span>${fmtPrice(total)} $</span></div>
      <a href="commande.html" class="btn solid block" style="margin-top:24px ${subtotal===0?';pointer-events:none;opacity:.4':''}"><span>Passer à la caisse</span></a>
      <p style="font-size:.7rem;color:var(--cream-dim);margin-top:14px;text-align:center">Site de démonstration — aucun paiement réel n'est traité.</p>`;
  }

  paint();
  paintSummary();
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

  // Cart summary in checkout
  const sum = document.querySelector("[data-checkout-summary]");
  if (sum){
    const lines = cartLines();
    if (!lines.length){ location.href = "panier.html"; return; }
    const subtotal = cartSubtotal();
    const shipping = subtotal >= 100 ? 0 : 12;
    const tax = subtotal * 0.14975;
    const total = subtotal + shipping + tax;
    sum.innerHTML = `
      ${lines.map(l => `
        <div style="display:flex;justify-content:space-between;gap:10px;margin-bottom:14px;font-size:.85rem">
          <span style="color:var(--cream-dim)">${l.product.name} × ${l.qty}</span>
          <span>${fmtPrice(l.product.price * l.qty)} $</span>
        </div>`).join("")}
      <div class="divider left" style="margin:18px 0"></div>
      <div class="summary-row"><span>Sous-total</span><span>${fmtPrice(subtotal)} $</span></div>
      <div class="summary-row"><span>Livraison</span><span>${shipping === 0 ? "Gratuite" : fmtPrice(shipping) + " $"}</span></div>
      <div class="summary-row"><span>Taxes est.</span><span>${fmtPrice(tax)} $</span></div>
      <div class="summary-row total"><span>Total</span><span>${fmtPrice(total)} $</span></div>`;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const orderId = "MS-" + Math.floor(100000 + Math.random() * 899999);
    document.querySelector("[data-order-id]").textContent = orderId;
    localStorage.removeItem(CART_KEY);
    updateCartBadge();
    goTo(4);
  });

  goTo(1);
}

/* ---------- Contact / newsletter (fake submit) ---------- */
function initFakeForms(){
  document.querySelectorAll("[data-fake-form]").forEach(f => {
    f.addEventListener("submit", (e) => {
      e.preventDefault();
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
