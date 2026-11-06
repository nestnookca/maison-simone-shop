/* Maison Simone — popup de bienvenue (10 % de rabais) + inscription infolettre */
(function(){
  const SEEN_KEY = "ms_promo_seen";
  const CLAIMED_KEY = "ms_promo_claimed";
  const SNOOZE_DAYS = 7;
  const page = (location.pathname.split("/").pop() || "index.html");
  const quietPage = /^(panier|commande)\.html$/.test(page);

  const store = {
    get(k){ try { return localStorage.getItem(k); } catch(e){ return null; } },
    set(k, v){ try { localStorage.setItem(k, v); } catch(e){} }
  };
  const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
  const pct = Math.round(SITE_CONFIG.couponRate * 100);

  let overlay = null;

  function build(){
    overlay = document.createElement("div");
    overlay.className = "promo-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "promo-title");
    overlay.innerHTML = `
      <div class="promo-card">
        <button class="promo-close" type="button" aria-label="Fermer">&times;</button>
        <div class="promo-art"><img src="assets/img/products/le-rose-bio-active-vitamin-c-serum-1.jpg" alt=""></div>
        <div class="promo-body">
          <div data-promo-ask>
            <span class="eyebrow">Bienvenue chez Maison Simone</span>
            <h2 id="promo-title" class="serif">${pct}&nbsp;% de rabais sur votre première commande</h2>
            <p>Inscrivez votre courriel pour obtenir votre code promo, nos nouveautés et nos offres privées.</p>
            <form class="promo-form" novalidate>
              <input type="email" placeholder="Votre courriel" aria-label="Votre courriel" autocomplete="email" required>
              <button type="submit" class="btn solid"><span>Obtenir mon code</span></button>
            </form>
            <p class="promo-err" hidden>Veuillez entrer une adresse courriel valide.</p>
            <p class="promo-fine">Offre réservée aux nouveaux clients. Désabonnement possible en tout temps.</p>
            <button type="button" class="promo-skip">Non merci</button>
          </div>
          <div data-promo-done hidden>
            <span class="eyebrow">Merci !</span>
            <h2 class="serif">Voici votre code</h2>
            <div class="promo-code"><b data-promo-code>${SITE_CONFIG.couponCode}</b><button type="button" data-promo-copy>Copier</button></div>
            <p>${SITE_CONFIG.emailsTheCode
              ? "Nous vous l'avons aussi envoyé par courriel."
              : "Il est déjà appliqué à votre panier."} Valable sur votre première commande.</p>
            <a href="produits.html" class="btn solid" data-promo-shop><span>Découvrir la boutique</span></a>
          </div>
        </div>
      </div>`;
    document.body.appendChild(overlay);

    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });
    overlay.querySelector(".promo-close").addEventListener("click", close);
    overlay.querySelector(".promo-skip").addEventListener("click", close);
    overlay.querySelector(".promo-form").addEventListener("submit", e => {
      e.preventDefault();
      const email = overlay.querySelector(".promo-form input").value.trim();
      if (!validEmail(email)){ overlay.querySelector(".promo-err").hidden = false; return; }
      claim(email, "popup");
    });
    overlay.querySelector("[data-promo-copy]").addEventListener("click", e => {
      const btn = e.currentTarget;
      const done = () => { btn.textContent = "Copié ✓"; setTimeout(() => btn.textContent = "Copier", 2000); };
      if (navigator.clipboard) navigator.clipboard.writeText(SITE_CONFIG.couponCode).then(done, done);
      else done();
    });
    overlay.querySelector("[data-promo-shop]").addEventListener("click", () => close());
    document.addEventListener("keydown", e => { if (e.key === "Escape" && overlay.classList.contains("open")) close(); });
  }

  function open(){
    if (!overlay) build();
    const claimed = store.get(CLAIMED_KEY);
    overlay.querySelector("[data-promo-ask]").hidden = !!claimed;
    overlay.querySelector("[data-promo-done]").hidden = !claimed;
    requestAnimationFrame(() => overlay.classList.add("open"));
    document.body.classList.add("promo-lock");
    const input = overlay.querySelector(".promo-form input");
    if (!claimed) setTimeout(() => input.focus(), 350);
  }

  function close(){
    if (!overlay) return;
    overlay.classList.remove("open");
    document.body.classList.remove("promo-lock");
    store.set(SEEN_KEY, String(Date.now()));
  }

  function claim(email, source){
    store.set(CLAIMED_KEY, email);
    tryCoupon(SITE_CONFIG.couponCode);
    window.dispatchEvent(new Event("ms:coupon"));
    postToService({ type: "inscription", source, courriel: email, code: SITE_CONFIG.couponCode, rabais: pct + " %" });
    if (!overlay) build();
    overlay.querySelector("[data-promo-ask]").hidden = true;
    overlay.querySelector("[data-promo-done]").hidden = false;
    if (!overlay.classList.contains("open")) open();
  }

  function shouldAutoShow(){
    if (quietPage || store.get(CLAIMED_KEY)) return false;
    const seen = +store.get(SEEN_KEY);
    return !(seen && Date.now() - seen < SNOOZE_DAYS * 864e5);
  }

  function init(){
    // Liens « obtenir mon code »
    document.addEventListener("click", e => {
      const a = e.target.closest("[data-open-promo]");
      if (a){ e.preventDefault(); open(); }
    });

    // Formulaires d'infolettre
    document.querySelectorAll("[data-newsletter]").forEach(f => {
      f.addEventListener("submit", e => {
        e.preventDefault();
        const email = f.querySelector("input[type=email]").value.trim();
        if (!validEmail(email)) return;
        claim(email, "infolettre");
        f.reset();
      });
    });

    if (!shouldAutoShow()) return;
    let shown = false;
    const show = () => { if (shown || !shouldAutoShow()) return; shown = true; open(); };
    setTimeout(show, 7000);
    document.addEventListener("mouseout", e => {
      if (!e.relatedTarget && e.clientY <= 0) show();   // intention de quitter (ordinateur)
    });
  }

  window.MSPromo = { open, bind(){} };
  document.addEventListener("DOMContentLoaded", init);
})();
