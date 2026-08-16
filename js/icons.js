/* Maison Simone — hand-drawn line-art icon sprite (no external image assets). */
const ICON_SPRITE = `
<svg xmlns="http://www.w3.org/2000/svg" style="display:none">
<defs>
  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
    <stop offset="0%" stop-color="#8a6a1f"/>
    <stop offset="45%" stop-color="#e8cd8a"/>
    <stop offset="100%" stop-color="#c9a24a"/>
  </linearGradient>
  <linearGradient id="goldGradV" x1="0%" y1="0%" x2="0%" y2="100%">
    <stop offset="0%" stop-color="#f0dca3"/>
    <stop offset="100%" stop-color="#8a6a1f"/>
  </linearGradient>
  <linearGradient id="glassFill" x1="15%" y1="0%" x2="85%" y2="100%">
    <stop offset="0%" stop-color="#f0dca3" stop-opacity=".32"/>
    <stop offset="45%" stop-color="#c9a24a" stop-opacity=".12"/>
    <stop offset="100%" stop-color="#050502" stop-opacity=".38"/>
  </linearGradient>
  <radialGradient id="podium" cx="50%" cy="50%" r="50%">
    <stop offset="0%" stop-color="#c9a24a" stop-opacity=".35"/>
    <stop offset="100%" stop-color="#c9a24a" stop-opacity="0"/>
  </radialGradient>

  <symbol id="i-bottle" viewBox="0 0 100 100">
    <ellipse cx="50" cy="88" rx="30" ry="6" fill="url(#podium)"/>
    <rect x="34" y="10" width="14" height="12" rx="2" fill="url(#goldGrad)" opacity=".55" stroke="url(#goldGrad)" stroke-width="2"/>
    <path d="M30 24 h22 v8 c8 6 10 14 10 24 v24 a6 6 0 0 1-6 6 H26 a6 6 0 0 1-6-6 V56 c0-10 2-18 10-24z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="22" y1="66" x2="60" y2="66" stroke="url(#goldGrad)" stroke-width="1.4" opacity=".6"/>
    <line x1="34" y1="76" x2="52" y2="76" stroke="url(#goldGrad)" stroke-width="1.2" opacity=".4"/>
    <path d="M27 30 c-2 10-2 20 0 46" fill="none" stroke="#fff" stroke-width="1.4" opacity=".25" stroke-linecap="round"/>
  </symbol>

  <symbol id="i-jar" viewBox="0 0 100 100">
    <ellipse cx="42" cy="90" rx="30" ry="6" fill="url(#podium)"/>
    <rect x="24" y="16" width="40" height="10" rx="2" fill="url(#goldGrad)" opacity=".55" stroke="url(#goldGrad)" stroke-width="2.2"/>
    <path d="M20 30 h48 l-4 46 a8 8 0 0 1-8 8 H32 a8 8 0 0 1-8-8z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="26" y1="46" x2="62" y2="46" stroke="url(#goldGrad)" stroke-width="1.2" opacity=".5"/>
    <line x1="30" y1="60" x2="58" y2="60" stroke="url(#goldGrad)" stroke-width="1.1" opacity=".35"/>
    <path d="M25 34 c-2 12-2 24 1 42" fill="none" stroke="#fff" stroke-width="1.4" opacity=".22" stroke-linecap="round"/>
  </symbol>

  <symbol id="i-pump" viewBox="0 0 100 100">
    <ellipse cx="41" cy="90" rx="26" ry="6" fill="url(#podium)"/>
    <path d="M40 6 l14 8 v10 h-14z" fill="url(#goldGrad)" opacity=".55" stroke="url(#goldGrad)" stroke-width="2"/>
    <rect x="28" y="26" width="26" height="56" rx="6" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2"/>
    <line x1="28" y1="42" x2="54" y2="42" stroke="url(#goldGrad)" stroke-width="1.2" opacity=".5"/>
    <path d="M54 16 h16 v6 h-10 v6" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-linecap="round"/>
    <line x1="32" y1="30" x2="32" y2="76" stroke="#fff" stroke-width="1.4" opacity=".22" stroke-linecap="round"/>
  </symbol>

  <symbol id="i-dropper" viewBox="0 0 100 100">
    <ellipse cx="50" cy="90" rx="24" ry="6" fill="url(#podium)"/>
    <path d="M42 6 h16 v18 l-4 4 v50 a4 4 0 0 1-8 0 V28 l-4-4z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <ellipse cx="50" cy="14" rx="7" ry="5" fill="url(#goldGrad)" opacity=".55" stroke="url(#goldGrad)" stroke-width="1.6"/>
    <line x1="40" y1="46" x2="60" y2="46" stroke="url(#goldGrad)" stroke-width="1" opacity=".4"/>
    <line x1="45" y1="30" x2="45" y2="72" stroke="#fff" stroke-width="1.2" opacity=".2" stroke-linecap="round"/>
  </symbol>

  <symbol id="i-tube" viewBox="0 0 100 100">
    <ellipse cx="46" cy="94" rx="24" ry="6" fill="url(#podium)"/>
    <path d="M38 10 h24 l-2 14 h-20z" fill="url(#goldGrad)" opacity=".55" stroke="url(#goldGrad)" stroke-width="2"/>
    <path d="M36 24 h28 c4 20 6 34 2 50 c-1 5-6 8-16 8s-15-3-16-8c-4-16-2-30 2-50z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="34" y1="40" x2="66" y2="40" stroke="url(#goldGrad)" stroke-width="1.1" opacity=".5"/>
  </symbol>

  <symbol id="i-led" viewBox="0 0 100 100">
    <ellipse cx="50" cy="88" rx="34" ry="6" fill="url(#podium)"/>
    <rect x="14" y="24" width="72" height="52" rx="10" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2"/>
    <circle cx="32" cy="42" r="3.4" fill="url(#goldGrad)"/>
    <circle cx="50" cy="42" r="3.4" fill="url(#goldGrad)"/>
    <circle cx="68" cy="42" r="3.4" fill="url(#goldGrad)"/>
    <circle cx="32" cy="58" r="3.4" fill="url(#goldGrad)" opacity=".6"/>
    <circle cx="50" cy="58" r="3.4" fill="url(#goldGrad)" opacity=".6"/>
    <circle cx="68" cy="58" r="3.4" fill="url(#goldGrad)" opacity=".6"/>
    <path d="M40 18 q10-10 20 0" fill="none" stroke="url(#goldGrad)" stroke-width="1.6"/>
  </symbol>

  <symbol id="i-steam" viewBox="0 0 100 100">
    <ellipse cx="50" cy="90" rx="30" ry="6" fill="url(#podium)"/>
    <path d="M50 14 C30 30 26 46 34 58 h32 C74 46 70 30 50 14z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <rect x="22" y="58" width="56" height="14" rx="3" fill="url(#goldGrad)" opacity=".4" stroke="url(#goldGrad)" stroke-width="2.2"/>
    <rect x="30" y="72" width="40" height="10" rx="2" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2"/>
    <path d="M44 4 q4 6 0 10 M56 4 q4 6 0 10" fill="none" stroke="url(#goldGrad)" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>
  </symbol>

  <symbol id="i-rf" viewBox="0 0 100 100">
    <ellipse cx="50" cy="94" rx="20" ry="5" fill="url(#podium)"/>
    <circle cx="50" cy="26" r="16" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2"/>
    <circle cx="50" cy="26" r="7" fill="url(#goldGrad)" opacity=".5" stroke="url(#goldGrad)" stroke-width="1.6"/>
    <path d="M42 40 l-10 44 a4 4 0 0 0 4 5h28 a4 4 0 0 0 4-5l-10-44z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="44" y1="60" x2="56" y2="60" stroke="url(#goldGrad)" stroke-width="1.2" opacity=".5"/>
  </symbol>

  <symbol id="i-derma" viewBox="0 0 100 100">
    <ellipse cx="50" cy="94" rx="18" ry="5" fill="url(#podium)"/>
    <path d="M50 8 l8 10 v56 a8 8 0 0 1-16 0V18z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <line x1="42" y1="34" x2="58" y2="34" stroke="url(#goldGrad)" stroke-width="1.2" opacity=".5"/>
    <path d="M44 82 l6 10 6-10z" fill="url(#goldGrad)" opacity=".55" stroke="url(#goldGrad)" stroke-width="2" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-guasha" viewBox="0 0 100 100">
    <ellipse cx="50" cy="92" rx="22" ry="5" fill="url(#podium)"/>
    <path d="M50 14 C22 20 20 48 34 64 c6 7 8 14 8 20 h16 c0-6 2-13 8-20 14-16 12-44-16-50z" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2" stroke-linejoin="round"/>
    <path d="M40 30 q10-8 20 0" fill="none" stroke="url(#goldGrad)" stroke-width="1.4" opacity=".6"/>
  </symbol>

  <symbol id="i-wand" viewBox="0 0 100 100">
    <ellipse cx="50" cy="94" rx="18" ry="5" fill="url(#podium)"/>
    <circle cx="50" cy="22" r="14" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2"/>
    <path d="M50 8 v28 M36 22 h28" stroke="url(#goldGrad)" stroke-width="1.4" opacity=".6"/>
    <rect x="44" y="36" width="12" height="50" rx="5" fill="url(#glassFill)" stroke="url(#goldGrad)" stroke-width="2.2"/>
  </symbol>

  <symbol id="i-leaf" viewBox="0 0 100 100">
    <path d="M20 80 C20 40 50 15 85 15 C80 55 55 80 20 80z" fill="none" stroke="url(#goldGrad)" stroke-width="2.4" stroke-linejoin="round"/>
    <path d="M24 78 C40 56 58 38 82 18" fill="none" stroke="url(#goldGrad)" stroke-width="1.4" opacity=".6"/>
  </symbol>

  <symbol id="i-cart" viewBox="0 0 100 100">
    <path d="M10 12h10l10 50h48l10-36H32" fill="none" stroke="currentColor" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="38" cy="86" r="6" fill="none" stroke="currentColor" stroke-width="5"/>
    <circle cx="72" cy="86" r="6" fill="none" stroke="currentColor" stroke-width="5"/>
  </symbol>

  <symbol id="i-menu" viewBox="0 0 100 100">
    <line x1="14" y1="28" x2="86" y2="28" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
    <line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
    <line x1="14" y1="72" x2="86" y2="72" stroke="currentColor" stroke-width="5" stroke-linecap="round"/>
  </symbol>

  <symbol id="i-star" viewBox="0 0 100 100">
    <path d="M50 6 L61 38 96 38 68 59 78 92 50 72 22 92 32 59 4 38 39 38z" fill="currentColor"/>
  </symbol>

  <symbol id="i-check" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="42" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M30 52 l14 14 26-30" fill="none" stroke="url(#goldGrad)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-mail" viewBox="0 0 100 100">
    <rect x="10" y="22" width="80" height="56" rx="4" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M14 26 L50 56 86 26" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-phone" viewBox="0 0 100 100">
    <path d="M22 12c8 0 10 14 14 18s-6 8-4 12c6 12 14 20 26 26 4 2 8-10 12-4 4 4 18 6 18 14 0 10-8 14-16 14-30 0-56-26-56-56 0-8 4-16 6-24z" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-pin" viewBox="0 0 100 100">
    <path d="M50 8c-18 0-32 14-32 32 0 24 32 52 32 52s32-28 32-52c0-18-14-32-32-32z" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="50" cy="40" r="11" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  </symbol>

  <symbol id="i-clock" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M50 26 v26 l18 12" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round"/>
  </symbol>

  <symbol id="i-ig" viewBox="0 0 100 100">
    <rect x="12" y="12" width="76" height="76" rx="20" fill="none" stroke="currentColor" stroke-width="4"/>
    <circle cx="50" cy="50" r="19" fill="none" stroke="currentColor" stroke-width="4"/>
    <circle cx="72" cy="28" r="4.5" fill="currentColor"/>
  </symbol>

  <symbol id="i-fb" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="4"/>
    <path d="M58 32h8V18h-8c-10 0-16 6-16 16v8H32v14h10v34h14V56h10l2-14H56v-6c0-3 1-4 4-4z" fill="currentColor"/>
  </symbol>

  <symbol id="i-arrow" viewBox="0 0 100 100">
    <path d="M20 50 h58 M56 26 l24 24-24 24" fill="none" stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-lock" viewBox="0 0 100 100">
    <rect x="24" y="44" width="52" height="42" rx="6" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M34 44V30a16 16 0 0 1 32 0v14" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <circle cx="50" cy="64" r="5" fill="url(#goldGrad)"/>
  </symbol>

  <symbol id="i-truck" viewBox="0 0 100 100">
    <rect x="8" y="34" width="50" height="32" rx="3" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <path d="M58 44h18l14 14v8H58z" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round"/>
    <circle cx="26" cy="76" r="8" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <circle cx="76" cy="76" r="8" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
  </symbol>

  <symbol id="i-shield" viewBox="0 0 100 100">
    <path d="M50 6 L88 20 v26 c0 26-16 40-38 48-22-8-38-22-38-48V20z" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round"/>
    <path d="M34 50 l12 12 20-24" fill="none" stroke="url(#goldGrad)" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-sparkle" viewBox="0 0 100 100">
    <path d="M50 10 L58 42 90 50 58 58 50 90 42 58 10 50 42 42z" fill="url(#goldGrad)"/>
  </symbol>

  <symbol id="logo-mark" viewBox="0 0 120 100">
    <path d="M6 82 V22 l20 34 20-34 v60" fill="none" stroke="url(#goldGrad)" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M64 30c0-12 10-20 22-20 8 0 15 4 19 10-5-3-10-4-15-3-11 2-18 12-18 23s7 21 18 23c5 1 10 0 15-3-4 6-11 10-19 10-12 0-22-8-22-20 0-4 1-8 2-11-1-3-2-6-2-9z" fill="none" stroke="url(#goldGrad)" stroke-width="4" stroke-linejoin="round"/>
    <circle cx="86" cy="42" r="15" fill="none" stroke="url(#goldGrad)" stroke-width="2.4" opacity=".85"/>
    <path d="M20 68c6-6 14-8 20-6" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linecap="round" opacity=".8"/>
    <path d="M12 78c8-2 16 2 18 9-9 2-16-2-18-9z" fill="none" stroke="url(#goldGrad)" stroke-width="2.4" stroke-linejoin="round"/>
  </symbol>

  <symbol id="i-empty-cart" viewBox="0 0 100 100">
    <path d="M10 12h10l10 50h48l10-36H32" fill="none" stroke="url(#goldGrad)" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="38" cy="86" r="6" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <circle cx="72" cy="86" r="6" fill="none" stroke="url(#goldGrad)" stroke-width="3"/>
    <line x1="30" y1="30" x2="70" y2="60" stroke="url(#goldGrad)" stroke-width="2" opacity=".5"/>
  </symbol>
</defs>
</svg>`;

document.addEventListener('DOMContentLoaded', () => {
  const wrap = document.createElement('div');
  wrap.innerHTML = ICON_SPRITE;
  document.body.prepend(wrap.firstElementChild);
});
