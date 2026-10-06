import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { dammastock2023Photos } from "../photos/suisse-dammastock-2023";

/**
 * Traversée du Dammastock, 3-7 avril 2023 — carnet DISTINCT du carnet
 * Dammastock–Titlis 2025 (autre trace, autres photos, autre URL).
 *
 * SOURCES
 *  - Trace : data/gpx-sources/suisse-dammastock-2023.original.gpx (AlpineQuest,
 *    5 <trkseg> natifs, 5 207 points, 03/04/2023 → 07/04/2023). Les 4 coupures
 *    entre journées sont des pauses nocturnes de 14 à 17 h, sans ambiguïté
 *    (voir scripts/gpx-report-dammastock-2023.ts). Les 5 journées coïncident
 *    avec les 5 segments natifs.
 *  - Distance/D+/D− : calculés sur la trace originale (lissage de la
 *    méthodologie, docs/gpx-methodology.md). D+ et D− arrondis à 10 m, distance
 *    à 0,01 km (pour que la somme des journées affichée à 0,1 km égale le total
 *    calculé sur la trace : 54,9 km). J1 : D− lissé ≈ 4 m (101 m en brut), arrondi à 0.
 *  - Points de départ/arrivée de chaque journée = premier/dernier point du
 *    segment (lat/lon utilisés pour les repères de la carte).
 *  - Récit : texte fourni par Yann, repris tel quel.
 *  - Les dénivelés « annoncés » du récit initial (≈1000/1900/1500/2000/600 m)
 *    ne servent que de repère : la page affiche les valeurs du GPX.
 *
 * TOPONYMIE : orthographes reprises du descriptif de Yann (Meiggelengrat,
 * Rohrspitzli, Flüelücke, Voralphütte, Sustenhorn, Steigletscher, Steinalp,
 * Fünffingerstock, Gassenbiwak, Firnalpeligletscher, Stössensattel,
 * Sustlihütte, Stössenstock, Farnigen). Altitudes extrêmes du GPX cohérentes
 * avec le Sustenhorn en J3 (point haut 3 505 m). Pas de croisement
 * Camptocamp/Skitour fait à ce stade (niveau « à valider » pour la
 * toponymie fine) ; aucun passage n'est ajouté qui ne soit dans la
 * description fournie.
 *
 * PHOTOS : voir src/data/photos/suisse-dammastock-2023.ts (aucune photo du
 * 3 avril ; J1 n'a donc pas de rail photo).
 */

const IMG = "/photos/Dammastock%202023/";

const photo = (key: string): CarnetPhoto => {
  const file = `dammastock-suisse-${key}.jpg`;
  const meta = dammastock2023Photos[file];
  if (!meta) throw new Error(`Photo Dammastock 2023 inconnue : ${file}`);
  return {
    src: `${IMG}${file}`,
    alt: meta.alt,
    width: meta.width,
    height: meta.height,
    ...(meta.legende ? { caption: meta.legende } : {}),
  };
};

const hero = photo("arete-glacier-ski-alpinisme");
const portrait = photo("montee-ski-couloir");

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. Une traversée du massif du Dammastock.",
  intro: "D'Abfrutt à Farnigen, cinq étapes entre Salbithütte, Voralphütte, Steinalp et Sustlihütte.",
  days: [
    {
      dayNum: "J1",
      title: "Abfrutt → Salbithütte",
      text: "Départ d'Abfrutt et montée à la Salbithütte.",
      distanceKm: 4.83,
      ascentM: 960,
      descentM: 0,
      elevationMin: 1170,
      elevationMax: 2130,
    },
    {
      dayNum: "J2",
      title: "Salbithütte → Voralphütte",
      via: ["Meiggelengrat", "col à l'est du Rohrspitzli", "Flüelücke"],
      text: "Par le Meiggelengrat, un col à l'est du Rohrspitzli puis la Flüelücke, jusqu'à la Voralphütte : deux couloirs montés skis sur le sac, un glacier à remonter, une pente nord à descendre et deux couloirs de descente.",
      distanceKm: 14.13,
      ascentM: 1810,
      descentM: 1790,
      elevationMin: 2090,
      elevationMax: 3150,
    },
    {
      dayNum: "J3",
      title: "Voralphütte → Steinalp",
      via: ["col coté 3 285 m", "Sustenhorn", "rive droite du Steigletscher"],
      text: "Montée au col coté 3 285 m puis au Sustenhorn, descente par la rive droite du Steigletscher jusqu'à Steinalp.",
      distanceKm: 13.62,
      ascentM: 1410,
      descentM: 1680,
      elevationMin: 1860,
      elevationMax: 3500,
    },
    {
      dayNum: "J4",
      title: "Steinalp → Sustlihütte",
      via: ["Fünffingerstock", "Gassenbiwak", "Firnalpeligletscher", "Stössensattel"],
      text: "Montée au Fünffingerstock, descente du versant nord jusqu'au Gassenbiwak, remontée du Firnalpeligletscher, puis Stössensattel et Sustlihütte.",
      distanceKm: 14.09,
      ascentM: 1920,
      descentM: 1530,
      elevationMin: 1860,
      elevationMax: 2980,
    },
    {
      dayNum: "J5",
      title: "Sustlihütte → Farnigen",
      via: ["col au sud du Stössenstock"],
      text: "Passage du col au sud du Stössenstock, puis descente vers Farnigen.",
      distanceKm: 8.21,
      ascentM: 590,
      descentM: 1240,
      elevationMin: 1600,
      elevationMax: 2860,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Du 3 au 7 avril 2023";

const PORTFOLIO_FIRST = [
  "arete-glacier-ski-alpinisme",
  "ski-soleil-pente-neige",
  "mer-nuages-sommets",
  "ski-poudreuse-descente",
  "ski-seracs-glacier",
  "descente-poudreuse",
  "montee-ski-couloir",
  "passage-neige-ski-alpinisme",
  "groupe-ski-souvenir",
  "glacier-seracs-hiver",
  "refuge-ski-haute-montagne",
  "ski-soleil-poudreuse",
  "traces-ski-poudreuse",
  "ski-couloir-haute-montagne",
  "passage-rocheux-ski-alpinisme",
  "ski-neige-pentes",
  "couloir-arete-ski",
];
const ALL_KEYS = Object.keys(dammastock2023Photos).map((f) => f.replace(/^dammastock-suisse-/, "").replace(/\.jpg$/, ""));
const portfolioPhotos = [...PORTFOLIO_FIRST, ...ALL_KEYS.filter((k) => !PORTFOLIO_FIRST.includes(k))].map(photo);

export const traverseeDammastock2023: Carnet = {
  slug: "traversee-dammastock-2023",
  seo: {
    title: "Traversée du Dammastock à ski de randonnée (avril 2023)",
    description:
      "Cinq jours de traversée à ski dans le massif du Dammastock, d'Abfrutt à Farnigen, par la Salbithütte, la Voralphütte, Steinalp et la Sustlihütte : itinéraire, carte et récit.",
    ogImage: hero.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "DAMMASTOCK",
    subtitle: "Traversée du massif",
    compactTitle: true,
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: hero,
  intro: {
    heading: "Lorsque les planètes s'alignent",
    paragraphs: [
      "Le projet initial était un raid dans le massif de la Bernina, mais faute de neige il a fallu se rabattre sur un plan B : le Dammastock.",
      "À la veille du départ, le refuge Albert-Heim s'est révélé complet. L'itinéraire a été recomposé au dernier moment par la Salbithütte, pour une traversée de cinq jours entre Abfrutt et Farnigen.",
      "Un groupe qui a fonctionné à merveille, de la bonne neige et trois jours de soleil consécutifs : tous les paramètres se sont alignés.",
    ],
    photo: portrait,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Suisse" },
      { label: "Massif", value: "Dammastock" },
      { label: "Départ", value: "Abfrutt" },
      { label: "Arrivée", value: "Farnigen" },
      { label: "Forme du raid", value: "Traversée" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
      { label: "Hébergements", value: "Salbithütte, Voralphütte, Steinalp et Sustlihütte" },
      { label: "Année", value: "2023" },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Abfrutt → Farnigen",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/dammastock-2023.gpx",
    // Positions = premier/dernier point de chaque segment du GPX original ;
    // Sustenhorn = point le plus haut de J3 (3 505 m).
    markers: [
      { name: "Abfrutt", lat: 46.665318, lon: 8.569659 },
      { name: "Salbithütte", lat: 46.676559, lon: 8.551809 },
      { name: "Voralphütte", lat: 46.690472, lon: 8.487747 },
      { name: "Sustenhorn", lat: 46.698883, lon: 8.455076 },
      { name: "Steinalp", lat: 46.730507, lon: 8.427432 },
      { name: "Sustlihütte", lat: 46.751693, lon: 8.470907 },
      { name: "Farnigen", lat: 46.743601, lon: 8.508609 },
    ],
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    // Texte source de Yann (brief « DAMMASTOCK 2023 »), repris mot pour mot ;
    // corrections d'orthographe/typographie manifestes seulement. Pas de photo
    // du 3 avril (J1 dans le brouillard) : les photos commencent en J2.
    sections: [
      {
        heading: "Itinérance #11 — Traversée du Dammastock, ou lorsque les planètes s'alignent",
        paragraphs: [
          "La saison n'est pas tout à fait terminée, mais ce sera probablement l'itinérance qui m'aura le plus marqué. Nous devions initialement aller dans le massif de la Bernina, mais faute de neige, il a fallu se rabattre sur un plan B, et quel plan B !",
          "Sur la route de l'Ubaye, trois jours avant de partir, je cogitais activement sur le projet de substitution, traçant des itinéraires du côté du Nufenenpass, des Tödi, du Dammastock ou du val de Suse. Un peu au nord, un peu au sud, puisque la météo continuait de jouer avec nos nerfs (surtout les miens, depuis un bon mois, car les clients, a priori, me font confiance !).",
          "Notre principal avantage : partir 5 jours en semaine, ce qui permet de n'avoir aucun mal à réserver. Enfin ça, c'est ce que je pensais !",
          "Las de ne pas trouver la ligne idéale, et un peu pressé par le temps, je me suis rabattu sur la traversée classique du Dammastock, un peu honteux tout de même de suivre a priori un topo déjà existant. Voyant de la place dans tous les refuges, je m'empressais de les réserver.",
          "Le lendemain, donc la veille du départ, traduisant par sécurité les mails de confirmation, quel n'a pas été mon dépit de constater que ma demande de réservation du premier refuge essuyait une réponse négative. Albert-Heim était plein… Panique à bord ! Il me fallait replonger dans les cartes.",
          "Plan A : Sidelenhütte. Pas de local d'hiver, fermé.",
          "Plan B : hôtel Tiefenbach. Premier jour plus cool mais 1800 m le lendemain… bof.",
          "Plan C : Salbithütte, mais J2 long, technique et aventureux. Bref, ça me plaît mais je ne dois pas être le seul à jubiler ! L'équipe doit me suivre dans cette idée, et je leur présente en toute transparence les deux plans. Avis unanime : on veut de l'aventure, go ! Et en plus, ça nous facilite grandement la logistique du transport pour le retour.",
          "J1 : montée à la Salbithütte. 500 m de marche puis le reste dans le brouillard. Pas mémorable, mais comme toute première journée de raid. En revanche, on découvre une cabane chauffée et des placards remplis de bières !",
        ],
      },
      {
        paragraphs: [
          "J2 : une journée mémorable ! Entre soleil et nappes de nuages, je jubile derrière l'objectif. Deux couloirs skis sur le sac à la montée, puis deux couloirs inclinés d'un bon 40° à descendre en bonne transfo. Et entre les deux, un magnifique glacier à remonter et 700 m de pente nord, vierge, tout poudre !",
        ],
        photos: ["passage-neige-ski-alpinisme", "mer-nuages-sommets"].map(photo),
      },
      {
        paragraphs: [
          "J3 : enfin un sommet : le Sustenhorn. Et en décalant légèrement de la descente classique, plus de 1000 m de pente vierge, froide, tout poudre, à travers puis sous un glacier majestueux.",
        ],
        photos: ["ski-alpinisme-vallon", "ski-seracs-glacier"].map(photo),
      },
      {
        paragraphs: [
          "J4 : une journée à 2000 de D+, il en fallait une tellement les conditions étaient bonnes et mauvaise était annoncée la journée du lendemain. Encore du ski exceptionnel : du raide en face nord du Fünffingerstock puis de la poudre légère sur le glacier du Firnalpeli, rajout opportun à une journée déjà longue ! Et quand même un peu de croûtée en face sud, pour rejoindre la Sustlihütte, il fallait bien redescendre de notre petit nuage !",
        ],
        photos: ["groupe-ski-montee", "glacier-seracs-hiver"].map(photo),
      },
      {
        paragraphs: [
          "J5 : la météo nous laisse un petit créneau le matin, pour bien terminer !",
        ],
        photos: ["groupe-ski-montagne", "passage-rocheux-ski-alpinisme"].map(photo),
      },
      {
        paragraphs: [
          "Difficile de mieux faire, difficile d'aligner autant de paramètres : une équipe où tout le monde ne se connaissait pas mais qui a fonctionné à merveille, un refuge plein, des plans contraints, de la bonne neige et 3 jours de soleil consécutifs, rares en ces temps perturbés !",
          "Parcours :",
          "J1 : Abfrutt > Salbithütte (1000 m D+)",
          "J2 : Meiggelengrat > col E du Rohrspitzli > Fluelucke > Voralphütte (1900 m D+)",
          "J3 : col au point 3285 m > Sustenhorn > rive droite du Steigletscher > Steinalp (1500 m D+)",
          "J4 : Fünffingerstock > descente au N > Gassenbiwak > Firnalpeligletscher > Stossensattel > Sustlihütte (2000 m D+)",
          "J5 : col S du Stössenstock > Farnigen (600 m D+)",
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "DAMMASTOCK",
    subtitle: "Traversée du massif",
    meta: "Du 3 au 7 avril 2023 · 5 jours de traversée à ski de randonnée, d'Abfrutt à Farnigen · Photos : Yann Borgnet",
    photos: portfolioPhotos,
    initialPortfolioCount: 17,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Couverture pour le listing /carnets-de-voyage-ski/. */
export const indexCover = hero;
