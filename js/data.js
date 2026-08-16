/* Maison Simone — catalogue produits (démo) */
const PRODUCTS = [
  {
    id: "serum-vitc",
    cat: "soins",
    icon: "i-dropper",
    badge: "Meilleure vente",
    name: "Sérum Éclat Vitaminé C",
    short: "Sérum concentré illuminateur à la vitamine C stabilisée.",
    desc: "Un sérum haute concentration qui ravive l'éclat naturel du teint, atténue les taches pigmentaires et lisse le grain de peau dès les premières semaines d'utilisation.",
    price: 68, old: 82, vol: "30 ml",
    use: "Appliquer 3 à 4 gouttes matin sur peau propre, avant la crème hydratante.",
    ingr: "Vitamine C stabilisée, acide férulique, extrait de vigne rouge, glycérine végétale."
  },
  {
    id: "creme-nuit",
    cat: "soins",
    icon: "i-jar",
    badge: "",
    name: "Crème Nuit Régénérante",
    short: "Soin nocturne riche à la peptide et au beurre de karité.",
    desc: "Une texture fondante qui travaille pendant le sommeil pour restaurer la barrière cutanée et repulper la peau, pour un réveil visiblement reposé.",
    price: 74, old: 0, vol: "50 ml",
    use: "Masser sur visage et cou le soir, en mouvements ascendants.",
    ingr: "Complexe peptidique, beurre de karité, huile de rose musquée, niacinamide."
  },
  {
    id: "nettoyant-mousse",
    cat: "soins",
    icon: "i-pump",
    badge: "",
    name: "Nettoyant Moussant Douceur",
    short: "Mousse nettoyante quotidienne sans sulfates agressifs.",
    desc: "Élimine les impuretés et le maquillage tout en respectant l'équilibre naturel de la peau. Formule douce convenant aux peaux sensibles.",
    price: 38, old: 0, vol: "150 ml",
    use: "Faire mousser sur peau humide, masser 30 secondes, rincer à l'eau tiède.",
    ingr: "Tensioactifs doux d'origine végétale, aloès, camomille, panthénol."
  },
  {
    id: "masque-argile",
    cat: "soins",
    icon: "i-jar",
    badge: "Édition limitée",
    name: "Masque Argile Purifiant",
    short: "Masque minéral détoxifiant à l'argile verte et au thé vert.",
    desc: "Absorbe l'excès de sébum, resserre visiblement les pores et laisse la peau nette et matifiée sans dessécher.",
    price: 46, old: 0, vol: "75 ml",
    use: "Appliquer une couche fine 10 minutes, 1 à 2 fois par semaine, rincer.",
    ingr: "Argile verte, extrait de thé vert, zinc, eau florale de romarin."
  },
  {
    id: "contour-yeux",
    cat: "soins",
    icon: "i-tube",
    badge: "",
    name: "Contour des Yeux Anti-Fatigue",
    short: "Soin rafraîchissant pour cernes et poches matinales.",
    desc: "Une formule fraîche enrichie en caféine et en extrait de bleuet qui réveille instantanément le regard.",
    price: 52, old: 0, vol: "15 ml",
    use: "Tapoter délicatement sous l'œil matin et soir avec l'embout froid.",
    ingr: "Caféine, extrait de bleuet sauvage, acide hyaluronique, vitamine E."
  },
  {
    id: "huile-rose",
    cat: "soins",
    icon: "i-dropper",
    badge: "",
    name: "Huile Sèche Rose Musquée",
    short: "Huile sèche nourrissante 100% d'origine naturelle.",
    desc: "Absorption rapide, fini non gras. Nourrit intensément et unifie le teint pour une peau souple et lumineuse.",
    price: 58, old: 65, vol: "30 ml",
    use: "2 à 3 gouttes le soir, seule ou mélangée à votre crème.",
    ingr: "Huile de rose musquée biologique, huile de jojoba, vitamine E."
  },
  {
    id: "tonique-floral",
    cat: "soins",
    icon: "i-bottle",
    badge: "",
    name: "Tonique Floral Équilibrant",
    short: "Brume tonifiante à l'eau de rose et à l'hamamélis.",
    desc: "Rééquilibre le pH de la peau après le nettoyage et prépare idéalement à l'application du sérum.",
    price: 34, old: 0, vol: "150 ml",
    use: "Vaporiser sur peau propre ou en brume rafraîchissante durant la journée.",
    ingr: "Eau de rose, hamamélis, glycérine, extrait de concombre."
  },
  {
    id: "exfoliant-enzyme",
    cat: "soins",
    icon: "i-jar",
    badge: "Nouveauté",
    name: "Exfoliant Enzymatique Micro-Peel",
    short: "Gommage doux aux enzymes de fruits pour un teint lissé.",
    desc: "Affine le grain de peau et stimule le renouvellement cellulaire sans agresser, grâce à des enzymes de papaye et d'ananas.",
    price: 49, old: 0, vol: "60 ml",
    use: "Appliquer 5 minutes sur peau humide, 2 fois par semaine, rincer.",
    ingr: "Enzymes de papaye et d'ananas, acide lactique doux, aloès."
  },
  {
    id: "baume-levres",
    cat: "soins",
    icon: "i-tube",
    badge: "",
    name: "Baume Réparateur Lèvres",
    short: "Baume fondant pour lèvres et contour gercés.",
    desc: "Répare, nourrit et protège durablement les lèvres sensibles grâce au beurre de cacao et à la cire d'abeille.",
    price: 22, old: 0, vol: "10 ml",
    use: "Appliquer généreusement autant que nécessaire.",
    ingr: "Beurre de cacao, cire d'abeille, huile de coco, vitamine E."
  },
  {
    id: "serum-ha",
    cat: "soins",
    icon: "i-dropper",
    badge: "Meilleure vente",
    name: "Sérum Acide Hyaluronique",
    short: "Hydratation intense et effet repulpant immédiat.",
    desc: "Trois poids moléculaires d'acide hyaluronique pour une hydratation en profondeur et un effet repulpant visible dès la première application.",
    price: 64, old: 0, vol: "30 ml",
    use: "Appliquer matin et soir sur peau légèrement humide avant la crème.",
    ingr: "Acide hyaluronique multi-poids, aloès, panthénol, eau florale."
  },

  {
    id: "led-photo",
    cat: "appareils",
    icon: "i-led",
    badge: "Populaire",
    name: "Masque LED Photothérapie 7 Couleurs",
    short: "Photothérapie professionnelle pour usage à domicile ou en boutique.",
    desc: "Sept longueurs d'onde ciblées pour stimuler le collagène, apaiser les rougeurs et réduire les imperfections. Utilisé lors de nos rituels signature en boutique.",
    price: 349, old: 399, vol: "1 appareil",
    use: "Séances de 15 à 20 minutes, 3 à 4 fois par semaine.",
    ingr: "7 modes de lumière LED, minuterie automatique, capteur de sécurité oculaire."
  },
  {
    id: "vapeur-ozone",
    cat: "appareils",
    icon: "i-steam",
    badge: "Usage professionnel",
    name: "Vaporisateur Facial Ozone Pro",
    short: "Machine à vapeur professionnelle pour ouverture des pores.",
    desc: "Diffuse une vapeur fine et chaude qui prépare la peau au nettoyage en profondeur et à l'extraction, comme dans nos boutiques.",
    price: 289, old: 0, vol: "1 appareil",
    use: "Séance de 8 à 10 minutes à 20 cm du visage avant le soin.",
    ingr: "Réservoir 200 ml, fonction ozone, bras articulé, base sur roulettes."
  },
  {
    id: "rf-raffermissant",
    cat: "appareils",
    icon: "i-rf",
    badge: "Nouveauté",
    name: "Appareil Radiofréquence Raffermissant",
    short: "Technologie RF pour un effet liftant progressif.",
    desc: "Stimule la production de collagène en profondeur pour raffermir visiblement l'ovale du visage, avec ou sans accompagnement en boutique.",
    price: 419, old: 0, vol: "1 appareil",
    use: "3 séances de 10 minutes par semaine sur peau nettoyée.",
    ingr: "Radiofréquence multipolaire, 3 intensités, arrêt automatique."
  },
  {
    id: "microdermabrasion",
    cat: "appareils",
    icon: "i-wand",
    badge: "",
    name: "Appareil Microdermabrasion Diamant",
    short: "Exfoliation mécanique douce à embouts diamantés.",
    desc: "Affine la texture, atténue les cicatrices superficielles et ravive l'éclat par une exfoliation mécanique contrôlée.",
    price: 259, old: 289, vol: "1 appareil + 6 embouts",
    use: "Une séance hebdomadaire de 10 minutes en mouvements circulaires.",
    ingr: "6 embouts diamantés interchangeables, aspiration réglable."
  },
  {
    id: "guasha-jade",
    cat: "appareils",
    icon: "i-guasha",
    badge: "Fait main",
    name: "Rouleau Gua Sha en Jade Naturel",
    short: "Outil de sculptage facial en pierre de jade véritable.",
    desc: "Draine, sculpte et détend les tissus du visage. Un rituel apaisant inspiré des soins ancestraux, offert lors de nos consultations.",
    price: 42, old: 0, vol: "1 pièce",
    use: "Glisser en mouvements ascendants sur peau huilée, 5 minutes par jour.",
    ingr: "Jade naturel véritable, poli à la main."
  },
  {
    id: "ultrasonique",
    cat: "appareils",
    icon: "i-wand",
    badge: "Usage professionnel",
    name: "Nettoyeur Ultrasonique Pro",
    short: "Spatule ultrasonique pour un nettoyage en profondeur.",
    desc: "Élimine en douceur les impuretés, cellules mortes et résidus de maquillage grâce aux vibrations ultrasoniques haute fréquence.",
    price: 179, old: 0, vol: "1 appareil",
    use: "Passer la spatule sur peau humide en mouvements lents ascendants.",
    ingr: "Vibrations 25 000 Hz, mode ionisation, écran tactile LED."
  }
];

function getProduct(id){ return PRODUCTS.find(p => p.id === id); }
function fmtPrice(n){ return n.toLocaleString('fr-CA', {minimumFractionDigits:2, maximumFractionDigits:2}); }
