import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { otztalPhotos } from "../photos/autriche-otztal-2024";

/**
 * CORRECTION (18/09/2026) : le récit source EXISTE — Google Doc "Récits
 * hiver 2024" de Yann, section "27-01/04/2024 Tour de l'Otztal", fourni par
 * Yann en conversation. Le constat initial ("aucun récit trouvé", basé sur
 * le seul sitemap WordPress live + une recherche interne "?s=otztal") ne
 * portait que sur des sources publiques du site — pas sur le Drive de
 * Yann, qui n'est pas accessible en recherche automatique. Texte intégré
 * ci-dessous (story.sections), édité a minima : orthographe, typographie,
 * quelques normalisations de noms propres — jamais réécrit ni enrichi
 * (voir détail des corrections juste avant `story` ci-dessous).
 *
 * DATE — le titre brut du Google Doc ("27-01/04/2024") est trompeur : les
 * timestamps du GPX confirment 27 avril → 1er mai 2024 (premier point
 * 2024-04-27T11:19:22Z, dernier 2024-05-01T09:04:51Z, voir
 * scripts/gpx-report-otztal.ts) — cohérent avec PERIOD_LABEL ci-dessous
 * ("Fin avril – début mai 2024"), déjà correct, aucun changement nécessaire.
 *
 * Slug proposé faute d'URL historique à reprendre : "otztal-tour-ski-randonnee".
 *
 * GPX : data/gpx-sources/autriche-otztal-2024.original.gpx (trace originale,
 * 23 942 points horodatés, 27/04–01/05/2024). Découpage en 5 jours PAS basé
 * sur les 5 <trkseg> natifs de l'enregistreur (ils ne correspondent pas aux
 * nuits réelles : voir script d'analyse) mais sur les 4 coupures temporelles
 * franches (11h à 18h chacune, `segmentDays` de src/lib/gpx, confident=true) —
 * elles-mêmes exactement alignées, aux quelques mètres près, sur 4 refuges
 * confirmés par géocodage inverse OpenStreetMap (Fidelitas Hütte,
 * Martin-Busch-Hütte, Hochjoch-Hospiz). Le nom de fichier source
 * ("...(5j)...Vernagt Hütte") a servi de piste de départ, jamais de preuve :
 * le nombre de jours (5) est confirmé indépendamment par l'analyse GPX, mais
 * le 4e refuge qu'il cite ("Vernagt Hütte") NE correspond PAS aux coordonnées
 * réelles de fin de J4/début J5 — voir anomalie ci-dessous.
 *
 * ANOMALIE TOPONYMIQUE REPÉRÉE (à signaler, pas corrigée en silence) : le nom
 * de fichier GPX et les métadonnées photo (voir
 * src/data/photos/autriche-otztal-2024.ts, "localisation" du J4/J5) désignent
 * "Vernagthütte" comme le refuge du J4. Or le point GPX réel (46.868246,
 * 10.8796657, halte de ~19h) correspond exactement à la Breslauer Hütte
 * (46.8682117, 10.8793050 sur OSM) — la vraie Vernagthütte est ~5,5 km plus
 * loin (46.8536572, 10.8240152). Les deux refuges appartiennent au même
 * réseau de circuit (Vent–Breslauer Hütte–Vernagthütte–Hochjoch Hospiz–
 * Martin-Busch-Hütte–Vent, cf. oetztal.com), d'où la confusion probable.
 * L'itinéraire ci-dessous suit le tracé GPX (source de vérité absolue) et
 * nomme donc "Breslauer Hütte" ; les métadonnées photo elles-mêmes ne sont
 * PAS modifiées (texte déjà validé éditorialement, voir règle ci-dessous).
 * CONFIRMATION INDÉPENDANTE (18/09/2026) : le récit de Yann lui-même dit,
 * pour le J4, "le petit couloir de descente sur le refuge Breslauer" — donc
 * corrobore "Breslauer Hütte" sans avoir été influencé par cette anomalie.
 *
 * PHOTOS : passe photo faite à partir des 25 JPEG fournis par Yann (EXIF
 * complets, noms SEO définitifs, localisation croisée GPX), déposés dans
 * public/photos/Autriche Otztal/. Métadonnées (ALT, légende, localisation,
 * certitude GPX) dérivées telles quelles de
 * src/data/photos/autriche-otztal-2024.ts — jamais réécrites à la main, y
 * compris la légende "Vernagthütte" ci-dessus (voir anomalie). Répartition
 * par jour déjà vérifiée sur le DateTimeOriginal EXIF (pas sur les numéros
 * de fichiers) : J1 = 0 photo (aucune prise ce jour-là), J2 = 4, J3 = 12,
 * J4 = 6, J5 = 3 — confirmé à nouveau le 18/09/2026, aucune correction
 * nécessaire.
 *
 * TOPONYMIE DU RÉCIT — vérifiée (le Saykogel, sommet-charnière entre
 * Martin-Busch-Hütte et Hochjoch-Hospiz cité au J3, est bien la voie de
 * liaison classique entre les deux refuges, seul passage "sans glace" du
 * tour des cabanes de l'Ötztal). Une correction de nom propre : "Hochjoch
 * hütte" (récit) → "Hochjoch-Hospiz" (c'est un Hospiz, pas une Hütte —
 * nom exact déjà utilisé partout ailleurs dans ce fichier).
 */

const IMG = "/photos/Autriche%20Otztal/";

const photo = (file: string): CarnetPhoto => {
  const meta = otztalPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

const photos = {
  // J2 — Fidelitas Hütte → Martin-Busch-Hütte
  pauseColBrouillard: photo("autriche-otztal-ski-randonnee-pause-col-brouillard-01.jpg"),
  departCabaneFidelitas: photo("autriche-otztal-ski-randonnee-depart-cabane-neige-03.jpg"),
  vallonGlaciaireBrouillard: photo("autriche-otztal-ski-randonnee-vallon-glaciaire-brouillard-04.jpg"),
  monteeMartinBusch: photo("autriche-otztal-ski-randonnee-montee-vers-martin-busch-05.jpg"),

  // J3 — Martin-Busch-Hütte → Hochjoch-Hospiz
  interieurRefuge: photo("autriche-otztal-ski-randonnee-interieur-refuge-otztal-02.jpg"),
  groupeMonteeGlaciaire: photo("autriche-otztal-ski-randonnee-groupe-montee-glaciaire-06.jpg"),
  traverseeGlaciairePanorama: photo("autriche-otztal-ski-randonnee-traversee-glaciaire-panorama-07.jpg"),
  heroSkieursSommets: photo("autriche-otztal-ski-randonnee-skieurs-montee-sommets-08.jpg"),
  groupeHauteRoute: photo("autriche-otztal-ski-randonnee-groupe-haute-route-otztal-09.jpg"),
  skieursCreteGlaciaire: photo("autriche-otztal-ski-randonnee-skieurs-crete-glaciaire-10.jpg"),
  panoramaArete: photo("autriche-otztal-ski-randonnee-panorama-arete-otztal-11.jpg"),
  descentePoudreuse: photo("autriche-otztal-ski-randonnee-descente-ski-poudreuse-12.jpg"),
  viragePoudreuseGlacier: photo("autriche-otztal-ski-randonnee-virage-poudreuse-glacier-13.jpg"),
  skieurCombeGlaciaire: photo("autriche-otztal-ski-randonnee-skieur-combe-glaciaire-14.jpg"),
  terrasseHochjochHospiz: photo("autriche-otztal-ski-randonnee-terrasse-hochjoch-hospiz-15.jpg"),
  soireeRefugeFrontale: photo("autriche-otztal-ski-randonnee-soiree-refuge-frontale-16.jpg"),

  // J4 — Hochjoch-Hospiz → Breslauer Hütte (voir anomalie toponymique ci-dessus)
  departMatinalHochjoch: photo("autriche-otztal-ski-randonnee-depart-matinal-hochjoch-17.jpg"),
  groupeMonteeCol: photo("autriche-otztal-ski-randonnee-groupe-montee-col-18.jpg"),
  traverseeVersVernagt: photo("autriche-otztal-ski-randonnee-traversee-vers-vernagt-19.jpg"),
  groupeGlacierVernagt: photo("autriche-otztal-ski-randonnee-groupe-glacier-vernagt-20.jpg"),
  traverseePenteRaide: photo("autriche-otztal-ski-randonnee-traversee-pente-raide-21.jpg"),
  cuisineVernagthutte: photo("autriche-otztal-ski-randonnee-cuisine-vernagthutte-22.jpg"),

  // J5 — Breslauer Hütte → Sölden
  descentePassageRocheux: photo("autriche-otztal-ski-randonnee-descente-passage-rocheux-23.jpg"),
  groupeRetourSolden: photo("autriche-otztal-ski-randonnee-groupe-retour-solden-24.jpg"),
  skieursImmensiteBlanche: photo("autriche-otztal-ski-randonnee-skieurs-immensite-blanche-25.jpg"),
};

// Journées reconstruites depuis la trace GPX originale (segmentDays sur les
// coupures temporelles, confident=true — voir note en tête de fichier) :
// distance/D+/D-/altitudes calculés sur la trace réelle, jamais estimés.
const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. Une traversée de refuge en refuge dans l'Ötztal.",
  intro:
    "D'Obergurgl à Sölden, une ligne de refuge en refuge entre glaciers et sommets tyroliens de plus de 3 300 m.",
  days: [
    {
      dayNum: "J1",
      title: "Obergurgl → Fidelitas Hütte",
      text: "Départ de la région d'Obergurgl, à 1 940 m, montée jusqu'à la Fidelitas Hütte, à 2 870 m.",
      distanceKm: 17.7,
      ascentM: 1530,
      descentM: 600,
      elevationMin: 1940,
      elevationMax: 3170,
    },
    {
      dayNum: "J2",
      title: "Fidelitas Hütte → Martin-Busch-Hütte",
      text: "Traversée par un point haut proche de 3 360 m avant la descente sur la Martin-Busch-Hütte, à 2 500 m.",
      distanceKm: 15,
      ascentM: 840,
      descentM: 1210,
      elevationMin: 2310,
      elevationMax: 3360,
    },
    {
      dayNum: "J3",
      title: "Martin-Busch-Hütte → Hochjoch-Hospiz",
      text: "Montée glaciaire, bascule par le Saykogel, puis descente à ski en poudreuse jusqu'au Hochjoch-Hospiz.",
      distanceKm: 9.7,
      ascentM: 1010,
      descentM: 1110,
      elevationMin: 2290,
      elevationMax: 3360,
    },
    {
      dayNum: "J4",
      title: "Hochjoch-Hospiz → Breslauer Hütte",
      text: "Départ matinal, montée vers un col d'altitude puis traversée glaciaire jusqu'à la Breslauer Hütte.",
      distanceKm: 13.9,
      ascentM: 1550,
      descentM: 1120,
      elevationMin: 2410,
      elevationMax: 3430,
    },
    {
      dayNum: "J5",
      title: "Breslauer Hütte → Sölden",
      text: "Dernière montée avant la longue descente finale jusqu'à Sölden.",
      distanceKm: 13.3,
      ascentM: 1110,
      descentM: 1290,
      elevationMin: 2600,
      elevationMax: 3460,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Fin avril – début mai 2024";

export const otztal: Carnet = {
  slug: "otztal-tour-ski-randonnee",
  seo: {
    title: "Ötztal à ski : tour du massif en Autriche",
    description:
      "Traversée à ski de randonnée du massif de l'Ötztal, en Autriche, de refuge en refuge : glaciers, cols et sommets tyroliens de plus de 3 300 m.",
    ogImage: photos.heroSkieursSommets.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "ÖTZTAL",
    subtitle: "Tour du massif, en Autriche",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.heroSkieursSommets,
  intro: {
    heading: "Une traversée de refuge en refuge dans les Alpes de l'Ötztal",
    paragraphs: [
      "Cinq jours de traversée dans le massif de l'Ötztal, au Tyrol autrichien, entre Obergurgl et Sölden : quatre nuits en refuge (Fidelitas Hütte, Martin-Busch-Hütte, Hochjoch-Hospiz, Breslauer Hütte) et de longues journées de ski sur les glaciers qui séparent l'Ötztal du Val Senales italien voisin.",
    ],
    photo: photos.monteeMartinBusch,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Autriche" },
      { label: "Massif", value: "Ötztaler Alpen · Tyrol" },
      { label: "Départ", value: "Obergurgl" },
      { label: "Arrivée", value: "Sölden" },
      { label: "Forme du raid", value: "Tour de massif — traversée de refuge en refuge à ski de randonnée" },
      { label: "Hébergements", value: "Refuges gardés" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Obergurgl → Sölden",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/autriche-otztal-2024.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    // Texte source : Google Doc "Récits hiver 2024" de Yann, section
    // "27-01/04/2024 Tour de l'Otztal" (fourni par Yann le 18/09/2026),
    // édité a minima. Corrections faites : "Otztal"/"Otzi" → "Ötztal"/"Ötzi"
    // (tréma), "JC" → "J.-C." (typo), guillemets normalisés («»), "Martin-
    // Büsch hütte" → "Martin-Busch-Hütte" (coquille + orthographe déjà
    // utilisée partout ailleurs), accord "deux Allemands... sympathiques"
    // (coquille), "Hochjoch hütte" → "Hochjoch-Hospiz" (nom propre exact,
    // voir note en tête de fichier), "Pitztaler gletscher" → "Pitztaler
    // Gletscher" (majuscule), "roschti-oeufs-bacon" → "rösti-œufs-bacon"
    // (orthographe/typo). Aucune phrase réécrite, aucune anecdote coupée,
    // aucune transition ajoutée.
    sections: [
      {
        heading: "Encore un changement de plan",
        paragraphs: [
          "La der des ders ! Et encore une fois, il a fallu composer. On devait initialement faire le classique tour de la Bernina, mais l'énorme écroulement intervenu le 14 avril dernier dans le Val Roseg, dont j'avais finalement réussi à résoudre la problématique, puis la mauvaise météo annoncée m'ont une nouvelle fois orienté vers l'Autriche.",
          "De l'Ötztal, je ne connaissais qu'Ötzi, cette momie parfaitement conservée, retrouvée par hasard en 1991, et datant de 3 millénaires avant J.-C. Les immenses glaciers, bien visibles sur les cartes aériennes et le maillage important des refuges m'ont attiré pour organiser ces 5 jours d'itinérance à cheval sur le week-end du 1er mai.",
          "Après avoir placé tous les refuges sur la carte en m'assurant qu'ils possèdent bien un local d'hiver ouvert, il me restait à trouver la bonne combinaison. Et entre le projet initial et la composition de l'itinérance sur le terrain, il y eut quelques ajustements !",
          "Les moments marquants :",
        ],
      },
      {
        heading: "J1 — Obergurgl → Fidelitas Hütte",
        paragraphs: [
          "Le premier jour, le brouillard, la nuit tombante et les quelques flocons pour s'essayer au cramponnage pour 2 de mes 3 compagnons. Aventure épique et rite initiatique impromptu pour eux ! L'arrivée à la petite cabane Fidelitas bien de nuit, avec des restes de bois bien cachés (j'avais « optimisé » le gaz et ne pouvais me permettre une soirée de fonte de neige) et les toilettes sèches pleines. Ça sent la fin de saison.",
        ],
      },
      {
        heading: "J2 — Fidelitas Hütte → Martin-Busch-Hütte",
        paragraphs: [
          "Le deuxième jour, le brouillard épais, encore mais sans la nuit cette fois. Et une désorientation aiguë qui me pousse inexorablement à gauche sans même que je ne m'en rende compte, à la montée comme à la descente. Lorsqu'enfin nous passons en dessous de la couche, tout le monde semble retrouver sa respiration, et ses esprits. La Martin-Busch-Hütte est déjà occupée par deux Allemands, au demeurant très sympathiques, d'autant qu'ils ont déjà chauffé la cabane !",
        ],
      },
      {
        heading: "J3 — Martin-Busch-Hütte → Hochjoch-Hospiz",
        paragraphs: [
          "Petit changement de programme pour le troisième jour. Au vu de la forme des troupes, nous décidons de réduire les ambitions. Et ce sera finalement un très bon choix. Nous sommes à une ligne de crête de la Hochjoch-Hospiz, et nous optons pour le sommet du Saykogel, qui permet de faire facilement la bascule. La dernière partie est une petite arête à cramponner, encore une nouveauté pour mes compagnons. Et en prime, la meilleure descente du trip nous accueille de l'autre côté. La terrasse sèche et baignée de soleil est une invitation à un bon café !",
        ],
      },
      {
        heading: "J4 — Hochjoch-Hospiz → Breslauer Hütte",
        paragraphs: [
          "L'acmé du quatrième jour sera résolument le petit couloir de descente sur le refuge Breslauer, et, nouvelle surprise, le confort de la cabane. Sûrement la plus confortable des 4, c'est sympa quand ça se passe ainsi !",
        ],
      },
      {
        heading: "J5 — Breslauer Hütte → Sölden",
        paragraphs: [
          "La dernière journée consiste en un retour progressif à la civilisation, bien aidé par la vue des imposantes remontées mécaniques du Pitztaler Gletscher puis de Sölden, plus précisément Rettenbach, où nous terminons par une bonne assiette de rösti-œufs-bacon.",
        ],
      },
    ],
    // Rail jour par jour : J1 est omis (0 photo prise ce jour-là, EXIF à
    // l'appui — jamais comblé artificiellement, voir CarnetPhoto["placeholder"]
    // et la règle de src/data/carnets/types.ts). J2/J4/J5 : texte court à
    // moyen → 2-4 photos. J3 : paragraphe le plus dense → 6 photos, sélection
    // éditoriale sur les 12 disponibles (le reste dans le portfolio).
    storyDays: [
      {
        day: "J2",
        route: itinerary.days[1].title,
        photos: [photos.pauseColBrouillard, photos.departCabaneFidelitas, photos.vallonGlaciaireBrouillard, photos.monteeMartinBusch],
      },
      {
        day: "J3",
        route: itinerary.days[2].title,
        photos: [
          photos.groupeMonteeGlaciaire,
          photos.traverseeGlaciairePanorama,
          photos.heroSkieursSommets,
          photos.skieursCreteGlaciaire,
          photos.descentePoudreuse,
          photos.terrasseHochjochHospiz,
        ],
      },
      {
        day: "J4",
        route: itinerary.days[3].title,
        photos: [photos.traverseePenteRaide, photos.cuisineVernagthutte],
      },
      {
        day: "J5",
        route: itinerary.days[4].title,
        photos: [photos.groupeRetourSolden, photos.skieursImmensiteBlanche],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "ÖTZTAL",
    subtitle: "Tour du massif, en Autriche",
    meta: "Fin avril – début mai 2024 · 5 jours de traversée à ski de refuge en refuge, d'Obergurgl à Sölden · Photos : Yann Borgnet",
    // 25 photos disponibles au total (aucune exclue) : 17 visibles au
    // chargement (mosaïque qui se termine proprement), le reste derrière
    // "Voir la suite du portfolio" — y compris les photos déjà utilisées
    // dans le rail du récit (voir story.storyDays), jamais exclues d'ici.
    photos: [
      // --- 17 visibles au chargement ---
      photos.heroSkieursSommets,
      photos.traverseeGlaciairePanorama,
      photos.departMatinalHochjoch,
      photos.groupeMonteeCol,
      photos.monteeMartinBusch,
      photos.groupeHauteRoute,
      photos.skieursCreteGlaciaire,
      photos.departCabaneFidelitas,
      photos.vallonGlaciaireBrouillard,
      photos.groupeMonteeGlaciaire,
      photos.panoramaArete,
      photos.descentePoudreuse,
      photos.viragePoudreuseGlacier,
      photos.terrasseHochjochHospiz,
      photos.soireeRefugeFrontale,
      photos.groupeGlacierVernagt,
      photos.skieursImmensiteBlanche,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.pauseColBrouillard,
      photos.interieurRefuge,
      photos.skieurCombeGlaciaire,
      photos.traverseeVersVernagt,
      photos.traverseePenteRaide,
      photos.cuisineVernagthutte,
      photos.descentePassageRocheux,
      photos.groupeRetourSolden,
    ],
    initialPortfolioCount: 17,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera. */
export const indexCover = photos.heroSkieursSommets;
