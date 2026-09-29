import type { Voyage } from "./types";

export const georgie: Voyage = {
  slug: "ski-randonnee-georgie-petit-caucase-2027",
  seo: {
    title: "Ski de randonnée en Géorgie | Petit Caucase 2027",
    description:
      "Du Javakheti à l’Adjarie et la Gourie : 7 jours de ski de randonnée en itinérance dans le Petit Caucase géorgien, du 17 au 26 janvier 2027.",
    ogImage:
      "/images/georgie-svanetie-2024DSC03959.jpg",
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
    src: "/images/georgie-svanetie-2024DSC03959.jpg",
    alt: "Ski de randonnée en Géorgie — Petit Caucase",
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Géorgie" },
      { label: "Massif", value: "Petit Caucase" },
      { label: "Ville d’accès et de retour", value: "Tbilissi, vols depuis Genève ou Paris via Istanbul" },
      { label: "Durée", value: "10 jours / 9 nuits, environ 7 jours de ski" },
      { label: "Dates", value: "du dimanche 17 au mardi 26 janvier 2027" },
      { label: "Forme du voyage", value: "deux itinérances reliées par une traversée routière du pays" },
      { label: "Territoires", value: "Javakheti, Adjarie et Gourie" },
      { label: "Hébergements", value: "petits hôtels, maisons d’hôtes et hébergements de montagne chauffés" },
      { label: "Participants", value: "5 à 6, plus le guide" },
      { label: "Prix avec vol", value: "3 980 €" },
      { label: "Prix hors vol", value: "3 480 € au départ de Tbilissi" },
      { label: "Physique", value: "★★★★☆ 4/5" },
      { label: "Technique ski", value: "★★☆☆☆ 2/5" },
      { label: "Engagement", value: "★★★☆☆ 3/5" },
      { label: "Encadrant", value: "Yann Borgnet, guide de haute montagne UIAGM" },
    ],
    note: "Le séjour s’adresse à des skieurs de randonnée autonomes, en bonne condition physique, capables d’enchaîner plusieurs journées complètes. Les pentes sont généralement modérées ; une bonne maîtrise du ski en toutes neiges et des conversions reste indispensable. L’isolement, le froid, la neige profonde et les changements possibles d’itinéraire constituent l’essentiel de l’engagement.",
  },
  photoInfo: {
    src: "/images/georgie-svanetie-2024DSC02883.jpg",
    alt: "Skieur en descente dans un vaste vallon enneigé de Haute-Svanétie, Géorgie",
  },
  bigPhoto: {
    src: "/images/georgie-svanetie-2024DSC02883.jpg",
    alt: "Skieur en descente dans un vaste vallon enneigé de Haute-Svanétie, Géorgie",
  },
  itinerary: {
    eyebrow: "Itinéraire",
    title: "10 jours. Deux versants du Petit Caucase.",
    intro:
      "Un voyage construit en deux temps : quatre journées dans les hauts plateaux volcaniques du Javakheti, puis trois journées dans les neiges profondes de l’Adjarie et de la Gourie. Entre les deux, une traversée du pays, qui fait elle aussi partie de l’histoire.",
    map: {
      src: "/images/carte-georgie-petit-caucase-2027-2400w-hq.webp",
      alt: "Carte de l’itinéraire à ski 2027 dans le Petit Caucase, entre Javakheti, Adjarie et Gourie",
    },
    gpx: "/gpx/georgie-petit-caucase-2027.gpx",
    mapTitle: "Carte de l’itinéraire du voyage à ski en Géorgie – Petit Caucase",
    /* Stats par jour : ce GPX n'est pas découpé par <trkseg> par jour (contrairement à
       l'Arménie/l'Ouzbékistan/le Tadjikistan) — il contient même des <trkseg> imbriqués
       par erreur (fermetures manquantes, regroupées en fin de fichier). Les jours sont
       donc découpés sur la trace continue (2636 points, tous <trkpt> du fichier dans
       l'ordre) aux points d'étape déjà nommés dans ce fichier, retrouvés par point le
       plus proche (coordonnées Wikipedia/OSM) : Tsikhisjvari (départ, 0,07 km),
       Bakuriani (~6 km, seul repère disponible pour cette coupure), Tabatskuri
       (0,43 km), Samsari (0,05 km), Olaverdi (0,32 km), Danisparauli (0,05 km),
       Ghorjomi (0,22 km), Bakhmaro (arrivée, 0,56 km). Le grand écart de 82,8 km entre
       Olaverdi et le début de J6 est la traversée routière Javakheti → Adjarie décrite
       dans le texte, jamais reliée par une trace ski. Didi Abuli (0,16 km) est traversé
       PENDANT J5 (l'option sommet "selon les conditions" du texte) : J4 et J5 se
       partagent la zone Samsari/Abuli dans le programme, donc la coupure est placée à
       la première arrivée dans la zone (Samsari) plutôt que devinée arbitrairement.
       J9 (retour Tbilissi + domaine viticole) est explicitement hors ski : pas de stat.
       Distance/D+/D- calculés directement sur la trace réelle, hystérésis légère
       (3 m, sans moyenne glissante, mêmes raisons que l'Arménie). */
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
        distanceKm: 28.1,
        ascentM: 1660,
        descentM: 1440,
      },
      {
        type: "day",
        dayNum: "J3",
        dateLabel: "19 JAN",
        title: "Bakuriani → Tabatskouri",
        text: "Première vraie traversée à ski vers Tabatskouri, village d’altitude posé au bord de son lac.",
        distanceKm: 20.2,
        ascentM: 1340,
        descentM: 1210,
      },
      {
        type: "day",
        dayNum: "J4",
        dateLabel: "20 JAN",
        title: "Tabatskouri → Samsari / Abuli",
        text: "Progression sur le plateau volcanique. Selon les conditions, une courte dépose en motoneige pourra raccourcir l’approche. Nuit dans la cabane de Rafael.",
        distanceKm: 14.6,
        ascentM: 1280,
        descentM: 120,
      },
      {
        type: "day",
        dayNum: "J5",
        dateLabel: "21 JAN",
        title: "Samsari / Abuli → Olaverdi",
        text: "Sommet ou traversée selon la neige et la météo, puis sortie du massif vers Olaverdi.",
        distanceKm: 22.7,
        ascentM: 1030,
        descentM: 2240,
      },
      { type: "chapter", label: "Ouest", title: "Adjarie & Gourie · 3 jours à ski" },
      {
        type: "day",
        dayNum: "J6",
        dateLabel: "22 JAN",
        title: "Utkhisubani → Danisparauli",
        text: "Après la traversée routière du pays, départ à ski depuis Utkhisubani. Changement radical de décor : reliefs plus boisés, neige plus abondante et premières lignes autour de Goderdzi en direction de Danisparauli.",
        distanceKm: 13.6,
        ascentM: 980,
        descentM: 920,
      },
      {
        type: "day",
        dayNum: "J7",
        dateLabel: "23 JAN",
        title: "Danisparauli → Ghorjomi",
        text: "Une étape pensée pour quitter les axes les plus fréquentés et chercher une ligne plus personnelle, à travers forêts, clairières et reliefs de l’Adjarie.",
        distanceKm: 24.6,
        ascentM: 1190,
        descentM: 1420,
      },
      {
        type: "day",
        dayNum: "J8",
        dateLabel: "24 JAN",
        title: "Ghorjomi → Bakhmaro",
        text: "Traversée jusqu’à Bakhmaro, en Gourie. L’idée n’est pas de consommer un spot connu, mais d’y arriver autrement : par les marges, les interstices et une vraie ligne d’itinérance.",
        distanceKm: 21.5,
        ascentM: 1730,
        descentM: 1200,
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
  birth: {
    title: "Géorgie — Petit Caucase",
    paragraphs: [
      "Un 4e voyage en Géorgie, après trois visites de la Svanétie, plus au nord, région frontalière avec la Russie.",
      "Je suis venu en Géorgie pour la première fois en 2014, pour explorer les possibilités de paralpinisme. Nous avions grimpé au gré des envies, partant plusieurs jours en itinérance pour tenter de gravir un sommet que nous avions repéré de loin et dont la forme élancée nous avait attirés.",
      "Après quatre jours au pied de ces montagnes immenses, nous étions revenus bredouilles dudit sommet, mais avec d’autres belles arêtes rocheuses, et un orage dans la tente dont on se souvient encore… En recroisant les infos, on s’était trompés de deux vallées !",
      "C’était une première expérience du Caucase, des montagnes autrement plus grandes que nos Alpes.",
      "En 2019, j’étais revenu avec ma compagne pour tester des fringues Pyrenex. On avait carte blanche, il fallait juste aller dans le froid. Un froid relatif, car fin mai-début juin, c’était déjà l’été dans le Caucase.",
      "Nous avons passé cinq jours à itinérer au milieu de glaciers immenses, fait l’ascension d’un sommet alpin sur toutes ses faces, qu’il a bien fallu redescendre, et même dormi une nuit en Russie, à l’époque !",
      "En 2024, la Géorgie a été mon premier voyage à ski extra-alpin organisé pour des clients. Et quel voyage ! Une itinérance de sept jours, de la neige incroyable, des chiens suiveurs, et même du « vin sans défaut », que le vigneron du groupe nous avait ramené dans des bouteilles en plastique, au fin fond d’un petit village svanète.",
      "Le vin, justement, est paraît-il né en Géorgie. Et il avait été un trop gros angle mort de mes précédents voyages.",
      "En 2027, je voulais explorer le massif du Petit Caucase, frontalier avec la Turquie. Alors j’ai préparé les deux versions du voyage : la version turque et la version géorgienne.",
      "Et un peu pour l’accueil géorgien, beaucoup pour son relief a priori plus adapté à l’itinérance au mois de janvier et passionnément pour son vin, j’ai finalement opté pour le nord du massif : la Géorgie.",
      "La ligne trouvée est discontinue, pour explorer en deux temps des montagnes bien différentes.",
      "D’abord, à l’est, les hauts plateaux volcaniques du Javakheti. Des reliefs ouverts, assez doux, posés très haut, entre Bakuriani, Tabatskouri, le Samsari et l’Abuli. Des villages habités en hiver, beaucoup d’espace, et surtout cette impression qu’à ski, presque tout reste à inventer. L’idée est d’y tracer une première itinérance de plusieurs jours, en passant d’un village à l’autre, avec peut-être une nuit plus isolée au pied des volcans.",
      "Puis une traversée du pays par la route pour rejoindre l’ouest, où le décor change complètement. En Adjarie et en Gourie, les reliefs sont plus boisés, plus encaissés, et la neige beaucoup plus abondante. Bakhmaro est désormais connu des skieurs et du cat-ski, mais ce qui m’intéresse est justement ailleurs : dans les marges, les interstices, les vallées qui permettent encore de relier les villages à ski, de Utkhisubani à Danisparauli, puis Ghorjomi et Bakhmaro.",
      "Deux itinérances donc, reliées par la route, avec deux ambiances presque opposées : les grands plateaux volcaniques de l’est, puis les forêts profondes et les neiges épaisses de l’ouest.",
      "Et sur le chemin du retour vers Tbilissi, cette fois, impossible de refaire l’impasse : un arrêt dans un domaine viticole est prévu.",
    ],
  },
  techCta: {
    span: "GÉORGIE · PETIT CAUCASE · 2027",
    title: "Recevoir la fiche technique",
    text: "Programme détaillé, niveaux, prix et conditions du voyage.",
    buttonText: "Demander la fiche technique",
    buttonHref: "https://wa.me/33689295826",
  },
};
