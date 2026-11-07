/* Maison Simone — réglages du site (à modifier ici) */
const SITE_CONFIG = {
  // Code promo de bienvenue (rabais de 10 % sur la première commande)
  couponCode: "BIENVENUE10",
  couponRate: 0.10,

  // Livraison
  freeShippingFrom: 100,   // livraison gratuite dès ce montant ($)
  shippingFee: 12,         // frais de livraison sinon ($)
  taxRate: 0.14975,        // TPS + TVQ (estimation)

  // Paiement Stripe : adresse du Worker déployé (voir worker/README.md),
  // ex. "https://maison-simone-checkout.VOTRE-COMPTE.workers.dev".
  // Laissée vide, la caisse reste en mode démonstration (aucun paiement réel).
  checkoutEndpoint: "",

  // Adresse du service qui reçoit les formulaires (courriels du popup, infolettre,
  // messages de contact et commandes). Exemples : Formspree, Web3Forms, Brevo, Make/Zapier.
  // Laissée vide, rien n'est envoyé : le code promo s'affiche simplement à l'écran.
  formEndpoint: "",

  // true seulement si le service ci-dessus envoie automatiquement le code par courriel
  emailsTheCode: false
};
