import type { Carnet } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/maroc/
 * Récit initialement publié dans Alpine Mag :
 * https://alpinemag.fr/raid-ski-de-rando-maroc-aventure-pays-berbere/
 * (mention reprise en fin de récit, sans le lien cliquable — CarnetStorySection
 * ne supporte pas de liens riches dans ses paragraphes).
 *
 * PHOTOS : passe photo pas encore faite — openingPhoto/intro.photo sont des
 * placeholders, portfolio vide. Aucune image WordPress
 * référencée (voir mémoire project_wordpress_migration).
 *
 * GPX ORIGINAL fourni par l'utilisateur le 16/09/2026 (15789 points
 * horodatés, 19-23/01/2026) — voir
 * data/gpx-sources/maroc-toubkal-2026.original.gpx. Découpage en 5 jours
 * basé sur les 4 seules coupures temporelles > 2h30 de toute la trace
 * (13.8 à 16.6h, confiance CONFIRMÉ), qui correspondent aux 5 jours de ski
 * annoncés par WordPress. D+/D- lissés (fenêtre 9 points, seuil 2 m) sur les
 * altitudes <ele> réelles ; distance géodésique point à point. Les distances
 * par jour recalculées correspondent EXACTEMENT (au dixième de km) à celles
 * déjà publiées par WordPress ; D+/D- à quelques dizaines de mètres près
 * (écart de lissage normal) — confiance CONFIRMÉ sur l'ensemble du
 * découpage. Autre recoupement fort : l'altitude max de J3 (3890 m) et de J5
 * (3990 m) correspondent presque exactement aux sommets cités dans le texte
 * (Bou Iguenouane 3882 m, Tazaghart 3980 m).
 */

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. Une itinérance à ski dans le Haut-Atlas.",
  intro:
    "D'Imlil aux vallées berbères, une ligne recomposée au fil de la neige, des cols et des contraintes du terrain.",
  days: [
    {
      dayNum: "J1",
      title: "Imlil → Tacchdirt",
      text: "Depuis Imlil (1 740 m), passage du Tizi n'Tamatert (2 279 m) puis descente vers Tacchdirt (2 300 m).",
      distanceKm: 13.3,
      ascentM: 1180,
      descentM: 550,
      elevationMin: 1730,
      elevationMax: 2470,
    },
    {
      dayNum: "J2",
      title: "Tacchdirt → Timichchi",
      text: "Talate n'Chaoute, Tizi n'Ou Addi, Tizi n'Itbir puis Agounss avant la longue descente vers Timichchi.",
      distanceKm: 17.5,
      ascentM: 1460,
      descentM: 1850,
      elevationMin: 1940,
      elevationMax: 3380,
    },
    {
      dayNum: "J3",
      title: "Timichchi → Bou Iguenouane → Tacchdirt",
      text: "Remontée par Labassen et le Tizi Tacherddirt, ascension du Bou Iguenouane (3 882 m), puis retour à Tacchdirt.",
      distanceKm: 19.5,
      ascentM: 2200,
      descentM: 1790,
      elevationMin: 1930,
      elevationMax: 3890,
    },
    {
      dayNum: "J4",
      title: "Tacchdirt → Imlil → Tizi Oussem",
      text: "Le projet de traversée vers Amsouzart est abandonné. Retour à Imlil puis transfert en taxi vers Tizi Oussem.",
      distanceKm: 10.0,
      ascentM: 640,
      descentM: 690,
      elevationMin: 2160,
      elevationMax: 2510,
    },
    {
      dayNum: "J5",
      title: "Tizi Oussem → Tazaghart → Tizgui",
      text: "Passage par Azib Tamsoult, les hauts cols autour de 3 000 m et le Tazaghart (3 980 m), avant la descente vers Tizgui.",
      distanceKm: 21.8,
      ascentM: 2350,
      descentM: 2330,
      elevationMin: 1810,
      elevationMax: 3990,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données publiées par
// WordPress jour par jour) — jamais recopiés en dur, voir totals.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Janvier 2026"; // "7 jours, dont 5 jours de ski, janvier 2026" (WordPress)

export const maroc: Carnet = {
  slug: "maroc",
  seo: {
    title: "Ski au Maroc : itinérance dans le Haut Atlas",
    description:
      "Raid à ski dans le Haut Atlas marocain : neige capricieuse, hauts plateaux, vallons reculés et itinéraire recomposé au fil des conditions.",
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "MAROC",
    subtitle: "Une itinérance à ski dans le Haut-Atlas",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: {
    src: "",
    alt: "Skieurs en itinérance dans le Haut-Atlas marocain, parmi les cades centenaires",
    placeholder: true,
  },
  intro: {
    heading: "Skier au milieu des cades centenaires",
    paragraphs: [
      "Nous sommes bringuebalés dans une vieille Peugeot 405. Quatre cent vingt mille kilomètres au compteur. À chaque relief, le bas de caisse racle la piste détrempée par la pluie tombée toute la nuit. Au-dessus de nous, de vastes pans de montagnes et un talus instable. Mohammed chante, ses mains gantées agrippent le volant. Mohammed prie.",
      "Skier ici n'a rien d'évident. La neige est rare, mais quand elle se met à tomber, elle peut être capricieuse, nécessitant une recomposition permanente de l'itinéraire. Le Haut-Atlas nous offre des combes arides, des hauts plateaux balayés par les bourrasques et des vallons reculés où poussent les cades centenaires.",
    ],
    photo: {
      src: "",
      alt: "Cades centenaires et hauts plateaux du Haut-Atlas marocain",
      placeholder: true,
    },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Maroc" },
      { label: "Massif", value: "Haut-Atlas" },
      { label: "Départ", value: "Imlil" },
      { label: "Arrivée", value: "Tizgui" },
      { label: "Forme du raid", value: "Tentative de traversée de massif" },
      { label: "Hébergements", value: "Guest-houses" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Imlil → Tizgui",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/maroc-toubkal-2026.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "Skier au milieu des cades centenaires",
        paragraphs: [
          "Nous sommes bringuebalés dans une vieille Peugeot 405. Quatre cent vingt mille kilomètres au compteur. À chaque relief, le bas de caisse racle la piste détrempée par la pluie tombée toute la nuit. Au-dessus de nous, de vastes pans de montagnes et un talus instable. Mohammed chante, ses mains gantées agrippent le volant. Mohammed prie.",
          "Skier ici n'a rien d'évident. La neige est rare, mais quand elle se met à tomber, elle peut être capricieuse, nécessitant une recomposition permanente de l'itinéraire. On a chaussé les skis au cœur d'Imlil, ville porte du Toubkal, alors que l'importante chute de neige de la veille agite les habitants. Quelques heures plus tard, on se retrouve dans un village accroché à un flanc de montagne abrupte.",
        ],
      },
      {
        heading: "Une traversée faite d'incertitudes",
        paragraphs: [
          "Le voyage devient avant tout un jeu avec les incertitudes : celles de la montagne, dont nous sommes coutumiers, et celles, plus locales, de l'administration marocaine. D'Imlil à Tacchdirt puis Timichchi, les cols et les vallées imposent de recomposer sans cesse la ligne imaginée sur la carte.",
          "Le Haut-Atlas offre un contraste singulier : des combes arides, des hauts plateaux balayés par les bourrasques et de nombreux vallons reculés où poussent les cades centenaires, aux silhouettes torsadées. Entre deux cols, il y a toujours un village suspendu, un thé partagé, un tajine fumant, un regard échangé souvent sans langue commune.",
        ],
      },
      {
        heading: "Changer de ligne",
        paragraphs: [
          "La traversée prévue vers Amsouzart doit finalement être abandonnée. Retour à Imlil, transfert vers Tizi Oussem, puis nouvelle ligne à ski vers Azib Tamsoult et les hauts reliefs du Tazaghart. L'itinérance continue autrement : moins comme une ligne figée que comme une exploration adaptée chaque jour aux conditions.",
        ],
      },
    ],
    // Note éditoriale, pas un paragraphe du récit : sortie du dernier bloc et
    // déplacée après coup (voir CarnetStory) — lien réel déjà identifié en
    // tête de fichier, jamais une URL inventée.
    sourceNote: {
      text: "Ce récit a été initialement publié dans Alpine Mag.",
      linkLabel: "Lire l'article original",
      href: "https://alpinemag.fr/raid-ski-de-rando-maroc-aventure-pays-berbere/",
    },
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};
