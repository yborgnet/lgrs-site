import type { CarnetPhoto, CarnetSansRecit } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { agneaux2025Photos } from "../photos/ecrins-tour-des-agneaux-2025";

/**
 * Tour des Agneaux (massif des Écrins), 27 février – 1er mars 2025 — carnet
 * SANS rubrique « Le récit » : seul le texte d'introduction fourni par Yann
 * est publié (pas de CarnetStory sur la page, voir
 * src/pages/ecrins-tour-des-agneaux-ski-randonnee/index.astro).
 *
 * SOURCES
 *  - Trace : data/gpx-sources/ecrins-tour-des-agneaux-2025.original.gpx
 *    (AlpineQuest, 3 <trkseg> natifs, 15 131 points, 27/02/2025 → 01/03/2025).
 *    Les 2 coupures entre journées sont des pauses nocturnes de 14,3 h et 15,6 h,
 *    sans ambiguïté (voir scripts/gpx-report-agneaux-2025.ts) ; les 3 journées
 *    coïncident avec les 3 segments natifs. Dates = dates UTC de la trace, qui
 *    tombent sur les mêmes jours en heure locale.
 *  - Distance/D+/D− : calculés sur la trace originale (lissage de la
 *    méthodologie, docs/gpx-methodology.md). D+ et D− arrondis à 10 m, distance
 *    à 0,01 km. Totaux = somme des journées arrondies (convention du site) :
 *    D+ 3 810 m (3 800 m calculé d'un bloc), D− 5 060 m, 39,6 km.
 *  - Forme du raid : TRAVERSÉE. Le départ (2 765 m) et la fin de trace
 *    (1 525 m) sont à ~5,9 km l'un de l'autre : ce n'est pas une boucle.
 *  - Départ : « télésiège de l'Yret » (intitulé fourni par Yann pour le J1 ;
 *    le GPX démarre à 2 765 m). Arrivée : Le Casset (Le Monêtier-les-Bains),
 *    identifiée par géocodage inverse OpenStreetMap du dernier point (chemin
 *    du Grand Pré, Le Casset) — le brief indique seulement « arrivée ».
 *  - Fins de J1 et J2 = refuge du Glacier Blanc et refuge de l'Alpe de
 *    Villar-d'Arêne (noms fournis par Yann ; positions des derniers points des
 *    segments cohérentes avec ces refuges).
 *  - Repères de carte : refuges = premier/dernier point des segments ;
 *    « Col Émile-Pic » = point haut de la J2 (3 512 m, seul col nommé de la
 *    journée) ; « Col coté 3 261 m » = point haut de la J3 (3 273 m, trace
 *    GPS). Pas de repère pour le col du Monêtier, les Dômes de Monêtier ni le
 *    col d'Arsine : la trace n'y présente pas de point haut isolé permettant
 *    de les situer sans deviner (J1 a deux points hauts à ~3 340-3 390 m).
 *    Le couloir Davin n'est pas repéré non plus (descente après le col coté).
 *  - TOPONYMIE : noms repris du brief de Yann. Pas de croisement
 *    Camptocamp/Skitour concluant à ce stade (une recherche web n'a pas
 *    retourné de fiche sur ce tour) : niveau « à valider » pour la toponymie.
 *
 * PHOTOS : voir src/data/photos/ecrins-tour-des-agneaux-2025.ts (42 photos du
 * 27/02 au 01/03/2025, aucune d'un autre raid).
 */

const IMG = "/photos/Agneaux%202025/";

const photo = (key: string): CarnetPhoto => {
  const file = `tour-des-agneaux-ecrins-ski-alpinisme-${key}.jpg`;
  const meta = agneaux2025Photos[file];
  if (!meta) throw new Error(`Photo Tour des Agneaux inconnue : ${file}`);
  return {
    src: `${IMG}${file}`,
    alt: meta.alt,
    width: meta.width,
    height: meta.height,
    ...(meta.legende ? { caption: meta.legende } : {}),
  };
};

const hero = photo("dsc07804");
const portrait = { ...photo("20250227_120348"), position: "center 75%" };

const itinerary: NonNullable<CarnetSansRecit["itinerary"]> = {
  eyebrow: "Itinéraire",
  title: "3 jours. Le Tour des Agneaux.",
  intro: "De l'Yret au Casset, trois étapes entre le refuge du Glacier Blanc et le refuge de l'Alpe de Villar-d'Arêne.",
  days: [
    {
      dayNum: "J1",
      title: "Télésiège de l'Yret → Refuge du Glacier Blanc",
      via: ["Dômes de Monêtier", "col du Monêtier"],
      text: "Départ du télésiège de l'Yret, traversée des Dômes de Monêtier et passage du col du Monêtier, jusqu'au refuge du Glacier Blanc.",
      distanceKm: 11.59,
      ascentM: 1220,
      descentM: 1440,
      elevationMin: 2540,
      elevationMax: 3390,
    },
    {
      dayNum: "J2",
      title: "Refuge du Glacier Blanc → Refuge de l'Alpe de Villar-d'Arêne",
      via: ["col Émile-Pic"],
      text: "Montée au col Émile-Pic, point haut de la journée, puis descente jusqu'au refuge de l'Alpe de Villar-d'Arêne.",
      distanceKm: 12.69,
      ascentM: 1240,
      descentM: 1710,
      elevationMin: 1970,
      elevationMax: 3510,
    },
    {
      dayNum: "J3",
      title: "Refuge de l'Alpe de Villar-d'Arêne → Le Casset",
      via: ["col d'Arsine", "col coté 3 261 m", "couloir Davin"],
      text: "Montée par le col d'Arsine jusqu'au col coté 3 261 m, puis descente par le couloir Davin jusqu'au Casset.",
      distanceKm: 15.34,
      ascentM: 1350,
      descentM: 1910,
      elevationMin: 1520,
      elevationMax: 3270,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Du 27 février au 1er mars 2025";

const PORTFOLIO_FIRST = [
  "dsc07804",
  "dsc07473",
  "dsc07420",
  "dsc07538",
  "dsc07707",
  "dsc07851",
  "dsc07686",
  "dsc07631",
  "dsc07489",
  "dsc07822",
  "dsc07855",
  "dsc07917",
  "dsc07960",
  "dsc07415",
  "dsc07734",
];
const ALL_KEYS = Object.keys(agneaux2025Photos).map((f) =>
  f.replace(/^tour-des-agneaux-ecrins-ski-alpinisme-/, "").replace(/\.jpg$/, "")
);
const portfolioPhotos = [...PORTFOLIO_FIRST, ...ALL_KEYS.filter((k) => !PORTFOLIO_FIRST.includes(k))].map(photo);

export const ecrinsTourDesAgneaux2025: CarnetSansRecit = {
  slug: "ecrins-tour-des-agneaux-ski-randonnee",
  seo: {
    title: "Tour des Agneaux à ski de randonnée, massif des Écrins (2025)",
    description:
      "Trois jours de raid à ski dans les Écrins : Tour des Agneaux de l'Yret au Casset, par le refuge du Glacier Blanc, le col Émile-Pic, l'Alpe de Villar-d'Arêne et le couloir Davin.",
    ogImage: hero.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "TOUR DES AGNEAUX",
    subtitle: "Massif des Écrins",
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
    heading: "Grand raid à ski #4, millésime 2025 : Tour des Agneaux, massif des Écrins",
    paragraphs: [
      "On avait initialement projeté l'Ubaye ou bien le Queyras. Et puis le manque de neige sur la frontière m'a conduit à regarder du côté des Écrins. J’ai toujours perçu ce massif comme complexe pour faire de l'itinérance à ski. Je connaissais les traditionnels tours de la Meije ou du Sirac, l'un et l'autre techniques.",
      "J'avais déjà fait plusieurs fois la traversée des Dômes de Monêtier, et j'avais le souvenir qu'il était possible de basculer sur le Glacier Blanc. Voilà qui constitua la première pièce du puzzle.",
      "Au final, ce tour des Agneaux constitue un raid à ski magnifique, avec plusieurs petits passages techniques, notamment à la descente. Mention spéciale au couloir Davin et à son entrée depuis le glacier du Casset, qui nécessite d'être bien posé sur les skis. Chapeau bas à Amélie et Matthieu !",
    ],
    photo: portrait,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "France" },
      { label: "Massif", value: "Écrins" },
      { label: "Départ", value: "Télésiège de l'Yret" },
      { label: "Arrivée", value: "Le Casset" },
      { label: "Forme du raid", value: "Traversée" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
      { label: "Hébergements", value: "Refuge du Glacier Blanc et refuge de l'Alpe de Villar-d'Arêne" },
      { label: "Année", value: "2025" },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "De l'Yret au Casset",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/ecrins-tour-des-agneaux-2025.gpx",
    // Voir la note en tête de fichier pour l'origine de chaque position.
    markers: [
      { name: "Télésiège de l'Yret", lat: 44.934826, lon: 6.491589 },
      { name: "Refuge du Glacier Blanc", lat: 44.937561, lon: 6.411514, direction: "bottom" },
      { name: "Col Émile-Pic", lat: 44.95438, lon: 6.38706, direction: "left" },
      { name: "Refuge de l'Alpe de Villar-d'Arêne", lat: 44.996367, lon: 6.384241 },
      { name: "Col coté 3 261 m", lat: 44.9593, lon: 6.4324 },
      { name: "Le Casset", lat: 44.987412, lon: 6.481139 },
    ],
  },
  itinerary,
  portfolio: {
    eyebrow: "Portfolio",
    title: "ÉCRINS",
    subtitle: "Tour des Agneaux",
    meta: "Du 27 février au 1er mars 2025 · 3 jours de raid à ski de randonnée, de l'Yret au Casset · Photos : Yann Borgnet",
    photos: portfolioPhotos,
    initialPortfolioCount: 15,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Couverture pour le listing /carnets-de-voyage-ski/. */
export const indexCover = hero;
