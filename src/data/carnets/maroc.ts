import type { Carnet } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { marocPhotos } from "../photos/maroc-toubkal-2026";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/maroc/
 * Récit initialement publié dans Alpine Mag :
 * https://alpinemag.fr/raid-ski-de-rando-maroc-aventure-pays-berbere/
 * (mention reprise en fin de récit, sans le lien cliquable — CarnetStorySection
 * ne supporte pas de liens riches dans ses paragraphes).
 *
 * PHOTOS : passe photo faite à partir des 98 JPEG déposés dans
 * public/photos/Maroc/ (voir src/data/photos/maroc-toubkal-2026.ts pour le
 * détail des sources et des choix). Pas d'EXIF exploitable (date/GPS perdus
 * au traitement) donc pas de rail storyDays par journée — seulement un
 * portfolio thématique "best of", comme decrit dans SELECTION_EDITORIALE_
 * MAROC_TOUBKAL_2026.txt (fourni par Yann), adapté aux 4 photos qu'il
 * désignait mais qui ne sont finalement pas sur le disque : chacune
 * remplacée par une photo existante de la même thématique (même préfixe de
 * nom de fichier SEO) — jamais une photo choisie hors de ce thème :
 *   - hero (DSC06079, absente) → DSC06136, même thème
 *     "vallee-et-pentes-du-haut-atlas"
 *   - grande photo pleine largeur (DSC07365, absente) → DSC07413, même
 *     thème "montee-vers-les-hautes-pentes"
 *   - photo narrative (DSC06671, absente) → DSC06675, même thème
 *     "villages-berberes-et-rencontres"
 *   - photo narrative (DSC07491, absente) → DSC07340, même thème
 *     "montee-vers-les-hautes-pentes"
 * openingPhoto et intro.photo choisies parmi les plus fortes de la
 * sélection (respectivement le remplaçant du hero, et une autre photo de
 * montée avec skieur à contre-jour, thème "vallee-et-pentes-du-haut-atlas").
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

const IMG = "/photos/Maroc/";

/** ALT/légende = texte du manifeste, jamais réécrits à la main (voir
 *  src/data/photos/maroc-toubkal-2026.ts). */
const photo = (file: string) => {
  const meta = marocPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.alt, width: meta.width, height: meta.height };
};

const heroPhoto = photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06136.jpg");
const introPhoto = photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06045.jpg");

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
    ogImage: heroPhoto.src,
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
  openingPhoto: heroPhoto,
  intro: {
    heading: "Skier au milieu des cades centenaires",
    paragraphs: [
      "Nous sommes bringuebalés dans une vieille Peugeot 405. Quatre cent vingt mille kilomètres au compteur. À chaque relief, le bas de caisse racle la piste détrempée par la pluie tombée toute la nuit. Au-dessus de nous, de vastes pans de montagnes et un talus instable. Mohammed chante, ses mains gantées agrippent le volant. Mohammed prie.",
      "Skier ici n'a rien d'évident. La neige est rare, mais quand elle se met à tomber, elle peut être capricieuse, nécessitant une recomposition permanente de l'itinéraire. Le Haut-Atlas nous offre des combes arides, des hauts plateaux balayés par les bourrasques et des vallons reculés où poussent les cades centenaires.",
    ],
    photo: introPhoto,
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
  portfolio: {
    eyebrow: "Portfolio",
    title: "MAROC",
    subtitle: "Une itinérance à ski dans le Haut-Atlas",
    meta: "Janvier 2026 · 5 jours de ski dans le Haut-Atlas marocain, entre cades centenaires et villages berbères · Photos : Yann Borgnet, Julien",
    // Les 98 photos disponibles (voir src/data/photos/maroc-toubkal-2026.ts).
    // Pas de chronologie fiable (EXIF perdu) donc pas d'ordre par jour : les
    // 22 premières reprennent la sélection éditoriale de Yann
    // (SELECTION_EDITORIALE_MAROC_TOUBKAL_2026.txt — hero, grandes photos
    // pleine largeur, photos narratives ; 4 remplacées par une photo
    // existante de même thème, voir la note en tête de fichier) et forment
    // la mosaïque visible au chargement ; le reste (thématique, ordre
    // alphabétique du nom de fichier SEO) se déplie au clic
    // (CarnetGallery).
    photos: [
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06136.jpg"),
      photo("maroc-haut-atlas-toubkal-route-et-village-sous-la-neige-05483.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06045.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06144.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06336.jpg"),
      photo("maroc-haut-atlas-toubkal-villages-berberes-et-rencontres-06873.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-vers-les-hautes-pentes-07413.jpg"),
      photo("maroc-haut-atlas-toubkal-vie-de-village-et-accueil-berbere-05569.jpg"),
      photo("maroc-haut-atlas-toubkal-vie-de-village-et-accueil-berbere-05614.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05712.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05834.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05968.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06092.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06210.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06362.jpg"),
      photo("maroc-haut-atlas-toubkal-cretes-et-descente-en-neige-06511.jpg"),
      photo("maroc-haut-atlas-toubkal-villages-berberes-et-rencontres-06675.jpg"),
      photo("maroc-haut-atlas-toubkal-villages-berberes-et-rencontres-06721.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-06948.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07076.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-vers-les-hautes-pentes-07340.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07619.jpg"),
      photo("maroc-haut-atlas-toubkal-alpiniste-pic-rocheux.jpg"),
      photo("maroc-haut-atlas-toubkal-cretes-et-descente-en-neige-06400.jpg"),
      photo("maroc-haut-atlas-toubkal-cretes-et-descente-en-neige-06408.jpg"),
      photo("maroc-haut-atlas-toubkal-cretes-et-descente-en-neige-06434.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-06963.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-06983.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-06990.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07019.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07044.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07058.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07066.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07080.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07097.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07103.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07105.jpg"),
      photo("maroc-haut-atlas-toubkal-groupe-a-ski-dans-la-vallee-07137.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05753.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05775.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05813.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05844.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05903.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-a-ski-dans-la-neige-05984.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-vers-les-hautes-pentes-07322.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-vers-les-hautes-pentes-07380.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-vers-les-hautes-pentes-07424.jpg"),
      photo("maroc-haut-atlas-toubkal-montee-vers-les-hautes-pentes-07473.jpg"),
      photo("maroc-haut-atlas-toubkal-monteur-ski-couloir-neige.jpg"),
      photo("maroc-haut-atlas-toubkal-portrait-montagnard-berbere.jpg"),
      photo("maroc-haut-atlas-toubkal-refuge-montagne-ski-randonnee.jpg"),
      photo("maroc-haut-atlas-toubkal-rencontre-habitants-village-montagne.jpg"),
      photo("maroc-haut-atlas-toubkal-retour-de-traversee-et-ambiance-du-groupe-07802.jpg"),
      photo("maroc-haut-atlas-toubkal-route-et-village-sous-la-neige-05489.jpg"),
      photo("maroc-haut-atlas-toubkal-route-et-village-sous-la-neige-05496.jpg"),
      photo("maroc-haut-atlas-toubkal-route-et-village-sous-la-neige-05543.jpg"),
      photo("maroc-haut-atlas-toubkal-route-hivernale-et-vie-locale-07852.jpg"),
      photo("maroc-haut-atlas-toubkal-route-hivernale-et-vie-locale-07875.jpg"),
      photo("maroc-haut-atlas-toubkal-route-hivernale-et-vie-locale-07916.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06206.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06219.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06234.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06245.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06261.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06302.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06304.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06312.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06318.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06386.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06392.jpg"),
      photo("maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06399.jpg"),
      photo("maroc-haut-atlas-toubkal-skieur-porte-refuge.jpg"),
      photo("maroc-haut-atlas-toubkal-soiree-refuge-autour-du-feu.jpg"),
      photo("maroc-haut-atlas-toubkal-sommets-neige-vue-panoramique.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07521.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07534.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07556.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07563.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07569.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07578.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07601.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07607.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07649.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-a-ski-et-meteo-montagne-07665.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-groupe-a-ski.jpg"),
      photo("maroc-haut-atlas-toubkal-traversee-ski-randonnee-vallee-berbere.jpg"),
      photo("maroc-haut-atlas-toubkal-troupeau-chevres-village-neige.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06026.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06072.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-et-pentes-du-haut-atlas-06176.jpg"),
      photo("maroc-haut-atlas-toubkal-vallee-neige-ski-randonnee.jpg"),
      photo("maroc-haut-atlas-toubkal-vie-de-village-et-accueil-berbere-05597.jpg"),
      photo("maroc-haut-atlas-toubkal-vie-de-village-et-accueil-berbere-05655.jpg"),
      photo("maroc-haut-atlas-toubkal-vie-de-village-et-accueil-berbere-05672.jpg"),
      photo("maroc-haut-atlas-toubkal-vie-de-village-et-accueil-berbere-05679.jpg"),
      photo("maroc-haut-atlas-toubkal-villages-berberes-et-rencontres-06817.jpg"),
      photo("maroc-haut-atlas-toubkal-villages-berberes-et-rencontres-06830.jpg"),
      photo("maroc-haut-atlas-toubkal-villages-berberes-et-rencontres-06889.jpg"),
    ],
    initialPortfolioCount: 22,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera/Géorgie,
 *  jamais une photo retapée séparément. */
export const indexCover = heroPhoto;
