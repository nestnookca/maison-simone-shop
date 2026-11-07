# Paiement Stripe — mise en route

Le site est statique : il ne peut pas parler à Stripe avec une clé secrète. Ce petit Worker
(Cloudflare, gratuit) crée la page de paiement Stripe à partir du panier. Les prix sont relus
dans `catalog.js`, jamais envoyés par le navigateur.

## 1. Stripe
1. Créez/activez votre compte sur https://dashboard.stripe.com (infos d'entreprise + compte bancaire).
2. Activez **Stripe Tax** (Produits → Tax) et enregistrez vos numéros TPS/TVQ si vous voulez que les taxes soient calculées automatiquement.
3. Copiez la clé secrète : Développeurs → Clés API → `sk_test_…` (essais) puis `sk_live_…` (réel).

## 2. Cloudflare Worker
```bash
cd worker
npx wrangler login
npx wrangler secret put STRIPE_SECRET_KEY     # collez la clé sk_…
# si Stripe Tax est activé : mettre AUTOMATIC_TAX = "1" dans wrangler.toml
npx wrangler deploy
```
Wrangler affiche l'adresse du Worker, ex. `https://maison-simone-checkout.xxx.workers.dev`.

## 3. Brancher le site
Dans `js/config.js`, mettre cette adresse dans `checkoutEndpoint`, puis commit + push.
Le bouton du panier devient « Payer en toute sécurité » et redirige vers Stripe.

## 4. Tester
Avec une clé `sk_test_…`, payez avec la carte `4242 4242 4242 4242` (date future, CVC quelconque).
Passez ensuite à `sk_live_…` (`npx wrangler secret put STRIPE_SECRET_KEY`).

## Si les produits ou les prix changent
```bash
node worker/build-catalog.js && cd worker && npx wrangler deploy
```
Le Worker refuse tout produit absent de `catalog.js`.

## Commandes reçues
Stripe envoie le reçu au client et la liste des paiements apparaît dans le tableau de bord
(avec l'adresse de livraison). Activez aussi les courriels de notification de paiement dans Stripe.
