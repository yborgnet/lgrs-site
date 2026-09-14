import type { Voyage } from "./types";

export const georgie: Voyage = {
  slug: "ski-randonnee-georgie-petit-caucase-2027",
  seo: {
    title: "Ski de randonnée en Géorgie | Petit Caucase 2027",
    description:
      "Du Javakheti à l’Adjarie et la Gourie : 7 jours de ski de randonnée en itinérance dans le Petit Caucase géorgien, du 17 au 26 janvier 2027.",
    ogImage:
      "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/georgie-svanetie-2024DSC03959.jpg",
  },
  masthead: {
    eyebrow: "Voyage à ski de randonnée",
    title: "GÉORGIE",
    meta: ["PETIT CAUCASE", "2027"],
  },
  description: {
    label: "Description du voyage",
    title: "Une traversée à ski du Petit Caucase",
    paragraphs: [
      "<strong>Des volcans du Javakheti aux neiges profondes d’Adjarie et de Gourie.</strong>",
      "J’ai construit ce voyage comme un diptyque. À l’est, les hauts plateaux volcaniques autour de Bakuriani, Tabatskouri, du Samsari et d’Abuli. À l’ouest, les forêts profondes et les neiges abondantes d’Adjarie et de Gourie, en cherchant les marges de Bakhmaro plutôt que ses itinéraires les plus parcourus.",
      "Entre les deux, une liaison routière, des villages, de l’hospitalité et une halte dans un domaine viticole. Le programme restera souple : neige, météo et état des routes écriront une partie du voyage.",
      "<em>Photos : Svanétie 2024, utilisées ici pour illustrer l’hiver géorgien.</em>",
    ],
  },
  photoIntro: {
    src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/georgie-svanetie-2024DSC03959.jpg",
    alt: "Ski de randonnée en Géorgie — Petit Caucase",
  },
  info: {
    label: "Informations",
    paragraphs: [
      "<strong>Pays :</strong> Géorgie<br/><strong>Massif :</strong> Petit Caucase<br/><strong>Ville d’accès et de retour :</strong> Tbilissi, vols depuis Genève ou Paris via Istanbul<br/><strong>Durée :</strong> 10 jours / 9 nuits, environ 7 jours de ski<br/><strong>Dates :</strong> du dimanche 17 au mardi 26 janvier 2027<br/><strong>Forme du voyage :</strong> deux itinérances reliées par une traversée routière du pays<br/><strong>Territoires :</strong> Javakheti, Adjarie et Gourie<br/><strong>Hébergements :</strong> petits hôtels, maisons d’hôtes et hébergements de montagne chauffés<br/><strong>Participants :</strong> 5 à 6, plus le guide<br/><strong>Prix avec vol :</strong> 3 980 €<br/><strong>Prix hors vol :</strong> 3 480 € au départ de Tbilissi<br/><strong>Physique :</strong> ★★★★☆ 4/5<br/><strong>Technique ski :</strong> ★★☆☆☆ 2/5<br/><strong>Engagement :</strong> ★★★☆☆ 3/5<br/><strong>Encadrant :</strong> Yann Borgnet, guide de haute montagne UIAGM",
      "Le séjour s’adresse à des skieurs de randonnée autonomes, en bonne condition physique, capables d’enchaîner plusieurs journées complètes. Les pentes sont généralement modérées ; une bonne maîtrise du ski en toutes neiges et des conversions reste indispensable. L’isolement, le froid, la neige profonde et les changements possibles d’itinéraire constituent l’essentiel de l’engagement.",
    ],
  },
  photoInfo: {
    src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/georgie-svanetie-2024DSC02883.jpg",
    alt: "Skieur en descente dans un vaste vallon enneigé de Haute-Svanétie, Géorgie",
  },
  bigPhoto: {
    src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/georgie-svanetie-2024DSC02883.jpg",
    alt: "Skieur en descente dans un vaste vallon enneigé de Haute-Svanétie, Géorgie",
  },
  itinerary: {
    eyebrow: "Itinéraire",
    title: "10 jours. Deux versants du Petit Caucase.",
    intro:
      "Un voyage construit en deux temps : quatre journées dans les hauts plateaux volcaniques du Javakheti, puis trois journées dans les neiges profondes de l’Adjarie et de la Gourie. Entre les deux, une traversée du pays, qui fait elle aussi partie de l’histoire.",
    map: {
      src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/carte-georgie-petit-caucase-2027-2400w-hq.webp",
      alt: "Carte de l’itinéraire à ski 2027 dans le Petit Caucase, entre Javakheti, Adjarie et Gourie",
    },
    items: [
      {
        type: "day",
        dayNum: "J1",
        dateLabel: "17 JAN",
        title: "France → Tbilissi",
        text: "Vol vers la Géorgie. Arrivée à Tbilissi le lendemain matin.",
        variant: "travel",
      },
      { type: "chapter", label: "Est", title: "Javakheti · 4 jours à ski" },
      {
        type: "day",
        dayNum: "J2",
        dateLabel: "18 JAN",
        title: "Tsikhisjvari",
        text: "Première sortie à ski en étoile au-dessus de Tsikhisjvari, pour entrer progressivement dans le voyage.",
      },
      {
        type: "day",
        dayNum: "J3",
        dateLabel: "19 JAN",
        title: "Bakuriani → Tabatskouri",
        text: "Première vraie traversée à ski vers Tabatskouri, village d’altitude posé au bord de son lac.",
      },
      {
        type: "day",
        dayNum: "J4",
        dateLabel: "20 JAN",
        title: "Tabatskouri → Samsari / Abuli",
        text: "Progression sur le plateau volcanique. Selon les conditions, une courte dépose en motoneige pourra raccourcir l’approche. Nuit dans la cabane de Rafael.",
      },
      {
        type: "day",
        dayNum: "J5",
        dateLabel: "21 JAN",
        title: "Samsari / Abuli → Olaverdi",
        text: "Sommet ou traversée selon la neige et la météo, puis sortie du massif vers Olaverdi.",
      },
      { type: "chapter", label: "Ouest", title: "Adjarie & Gourie · 3 jours à ski" },
      {
        type: "day",
        dayNum: "J6",
        dateLabel: "22 JAN",
        title: "Utkhisubani → Danisparauli",
        text: "Après la traversée routière du pays, départ à ski depuis Utkhisubani. Changement radical de décor : reliefs plus boisés, neige plus abondante et premières lignes autour de Goderdzi en direction de Danisparauli.",
      },
      {
        type: "day",
        dayNum: "J7",
        dateLabel: "23 JAN",
        title: "Danisparauli → Ghorjomi",
        text: "Une étape pensée pour quitter les axes les plus fréquentés et chercher une ligne plus personnelle, à travers forêts, clairières et reliefs de l’Adjarie.",
      },
      {
        type: "day",
        dayNum: "J8",
        dateLabel: "24 JAN",
        title: "Ghorjomi → Bakhmaro",
        text: "Traversée jusqu’à Bakhmaro, en Gourie. L’idée n’est pas de consommer un spot connu, mais d’y arriver autrement : par les marges, les interstices et une vraie ligne d’itinérance.",
      },
      {
        type: "day",
        dayNum: "J9",
        dateLabel: "25 JAN",
        highlightLabel: "Temps fort hors ski",
        title: "Retour vers Tbilissi · domaine viticole",
        text: "Retour vers Tbilissi à travers le pays, avec une halte dans un domaine viticole pour découvrir l’une des grandes traditions géorgiennes. Un temps fort du voyage hors ski, au même titre que les traversées en montagne.",
        variant: "highlight",
      },
      {
        type: "day",
        dayNum: "J10",
        dateLabel: "26 JAN",
        title: "Vol pour la France",
        text: "Vol retour vers Genève ou Paris via Istanbul.",
        variant: "travel",
      },
    ],
    note: "Le programme est une trame, pas une promesse au jour près. Neige, météo, état des routes et possibilités locales pourront déplacer une étape ou la journée de battement : c’est précisément ce qui permet de garder le voyage vivant.",
  },
  techCta: {
    span: "GÉORGIE · PETIT CAUCASE · 2027",
    title: "Recevoir la fiche technique",
    text: "Programme détaillé, niveaux, prix et conditions du voyage.",
    buttonText: "Demander la fiche technique",
    buttonHref: "https://wa.me/33689295826",
  },
};
