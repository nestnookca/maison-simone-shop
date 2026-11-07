// Génère worker/catalog.js à partir de js/data.js (à relancer si les produits ou prix changent)
//   node worker/build-catalog.js
const fs = require("fs");
global.window = {};
eval(fs.readFileSync(__dirname + "/../js/data.js", "utf8") + ";global.P = PRODUCTS;");
const catalog = {};
for (const p of P) catalog[p.id] = { name: p.name, cents: Math.round(p.price * 100), options: p.options ? p.options.values : null };
fs.writeFileSync(__dirname + "/catalog.js", "// Fichier généré par build-catalog.js — ne pas modifier à la main\nexport const CATALOG = " + JSON.stringify(catalog, null, 2) + ";\n");
console.log(Object.keys(catalog).length + " produits");
