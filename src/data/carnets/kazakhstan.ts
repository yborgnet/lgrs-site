import type { Carnet } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { kazakhstanPhotos } from "../photos/kazakhstan-2025";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/raid-ski-kazakhstan-ile-alatau/
 * Récit initialement publié dans Alpine Mag :
 * https://alpinemag.fr/ski-rando-yann-borgnet-kazakhstan-traversee-monts-ile-alatau/
 * (mention reprise en fin de récit, sans le lien cliquable — CarnetStorySection
 * ne supporte pas de liens riches dans ses paragraphes).
 *
 * PHOTOS : passe photo faite à partir des 54 JPEG fournis par Yann (EXIF
 * complets, noms SEO définitifs, localisation croisée GPX par jour),
 * déposés dans public/photos/Kazakhstan/. Métadonnées (ALT, légende,
 * localisation, jour, certitude GPX) dérivées telles quelles de
 * src/data/photos/kazakhstan-2025.ts — lui-même généré depuis
 * controle-exif-et-manifeste-kazakhstan.json (source documentaire de
 * référence). openingPhoto et intro.photo reprennent les choix déjà faits
 * sur la page WordPress live (même photo de couverture — DSC02253 — et même
 * photo de prologue — DSC01777 —, jamais choisies au hasard). Portfolio :
 * les 54 photos, dans un ordre chronologique par jour ; les 15 premières
 * (réparties sur les 6 jours) forment la mosaïque visible au chargement.
 *
 * GPX ORIGINAL fourni par l'utilisateur le 16/09/2026 (9204 points horodatés,
 * 20-25/04/2025) — voir data/gpx-sources/kazakhstan-ile-alatau-2025.original.gpx.
 * Découpage en 6 jours basé sur les 5 seules coupures temporelles > 2h30 de
 * toute la trace (12.4 à 18.2h, confiance CONFIRMÉ), qui correspondent aux 6
 * jours de ski annoncés par WordPress. D+/D- lissés (fenêtre 9 points, seuil
 * 2 m) sur les altitudes <ele> réelles ; distance géodésique point à point.
 * Les distances par jour recalculées collent aux chiffres déjà publiés par
 * WordPress (à 0.3 km près) ; les D+/D- diffèrent davantage (jusqu'à ~15%
 * sur certains jours, probablement un paramétrage de lissage différent côté
 * WordPress) — les valeurs ci-dessous sont celles recalculées directement
 * sur le GPX, jugées plus fiables (même méthode que Bernina/Argentera). Le
 * "jour" GPX (1-6) des photos, dérivé des mêmes coupures temporelles,
 * correspond directement à J1-J6 ci-dessous.
 */

const IMG = "/photos/Kazakhstan/";

/** ALT = texte_alternatif du manifeste, jamais réécrit à la main (voir
 *  src/data/photos/kazakhstan-2025.ts). Générique par jour (pas de légende
 *  distincte par photo côté source) — reflet fidèle du manifeste fourni. */
const photo = (file: string) => {
  const meta = kazakhstanPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

const photos = {
  // Jour 1
  j1_dsc01038: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01038-1-013.jpg"),
  j1_dsc01077: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01077-014.jpg"),
  j1_dsc01101: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01101-015.jpg"),
  j1_dsc01118: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01118-2025-04-30t07-24-22-176-016.jpg"),
  j1_dsc01173: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01173-1-017.jpg"),
  j1_dsc01212: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01212-018.jpg"),
  j1_dsc01251: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01251-019.jpg"),
  j1_dsc01305: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01305-020.jpg"),
  // Jour 2
  j2_dsc01363: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01363-021.jpg"),
  j2_dsc01501: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01501-022.jpg"),
  j2_dsc01514: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01514-023.jpg"),
  j2_dsc01522: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01522-1-024.jpg"),
  j2_dsc01566: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01566-025.jpg"),
  j2_dsc01582: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01582-026.jpg"),
  // Jour 3
  j3_dsc01634: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01634-027.jpg"),
  j3_dsc01667: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01667-2025-04-29t13-10-08-404-028.jpg"),
  j3_dsc01689: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01689-029.jpg"),
  j3_dsc01724: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01724-030.jpg"),
  j3_dsc01777: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01777-1-2025-04-29t13-09-47-272-031.jpg"),
  j3_p20250422093322: photo("kazakhstan-ile-alatau-ski-randonnee-20250422-093322-1-001.jpg"),
  j3_p20250422120555: photo("kazakhstan-ile-alatau-ski-randonnee-20250422-120555-002.jpg"),
  // Jour 4
  j4_p20250423050840: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-050840-1-003.jpg"),
  j4_p20250423061238: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-061238-004.jpg"),
  j4_p20250423081349: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-081349-1-005.jpg"),
  j4_p20250423101337: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-101337-006.jpg"),
  j4_p20250423144634: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-144634-1-007.jpg"),
  j4_p20250423153240: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-153240-009.jpg"),
  j4_p20250423150749: photo("kazakhstan-ile-alatau-ski-randonnee-20250423-150749-008.jpg"),
  j4_dsc01836: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01836-1-032.jpg"),
  j4_dsc01852: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01852-033.jpg"),
  j4_dsc01880: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01880-034.jpg"),
  j4_dsc01885: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01885-2025-04-27t11-41-30-967-035.jpg"),
  j4_dsc01923: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01923-036.jpg"),
  j4_dsc01925: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01925-037.jpg"),
  j4_dsc01949: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01949-1-038.jpg"),
  // Jour 5
  j5_p20250424050153: photo("kazakhstan-ile-alatau-ski-randonnee-20250424-050153-010.jpg"),
  j5_dsc01956: photo("kazakhstan-ile-alatau-ski-randonnee-dsc01956-039.jpg"),
  j5_dsc02004: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02004-040.jpg"),
  j5_dsc02036: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02036-041.jpg"),
  j5_dsc02110: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02110-042.jpg"),
  j5_dsc02121: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02121-043.jpg"),
  // Jour 6
  j6_dsc02166: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02166-044.jpg"),
  j6_dsc02199: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02199-2025-04-27t11-41-32-920-045.jpg"),
  j6_dsc02253: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02253-2025-04-27t11-41-35-349-046.jpg"),
  j6_dsc02323: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02323-047.jpg"),
  j6_dsc02363: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02363-048.jpg"),
  j6_dsc02411: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02411-049.jpg"),
  j6_dsc02419: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02419-050.jpg"),
  j6_p20250425140324: photo("kazakhstan-ile-alatau-ski-randonnee-20250425-140324-011.jpg"),
  j6_dsc02453: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02453-051.jpg"),
  j6_dsc02478: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02478-052.jpg"),
  j6_dsc02481: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02481-053.jpg"),
  j6_dsc02501: photo("kazakhstan-ile-alatau-ski-randonnee-dsc02501-054.jpg"),
  j6_p20250426122432: photo("kazakhstan-ile-alatau-ski-randonnee-20250426-122432-012.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "6 jours. Une traversée des monts Ile Alatau.",
  intro:
    "De Chimbulak à Koklaisay, une ligne engagée entre glaciers, bivouacs isolés et vestiges soviétiques.",
  days: [
    {
      dayNum: "J1",
      title: "Chimbulak → bivouac de Tuyuk-Su",
      text: "Départ de la station de Chimbulak et bascule vers le bassin de Tuyuk-Su.",
      distanceKm: 8.6,
      ascentM: 900,
      descentM: 680,
      elevationMin: 3170,
      elevationMax: 3870,
    },
    {
      dayNum: "J2",
      title: "Tuyuk-Su → gorge gauche du Talgar",
      text: "Passage du col de Tuyuk-Su et entrée dans la longue vallée glaciaire du Talgar.",
      distanceKm: 11.4,
      ascentM: 780,
      descentM: 1230,
      elevationMin: 2970,
      elevationMax: 4180,
    },
    {
      dayNum: "J3",
      title: "Gorge gauche du Talgar → Kuzylsau",
      text: "Traversée glaciaire engagée jusqu'au bivouac de Kuzylsau.",
      distanceKm: 20.1,
      ascentM: 1530,
      descentM: 1390,
      elevationMin: 2900,
      elevationMax: 4230,
    },
    {
      dayNum: "J4",
      title: "Kuzylsau → Cosmo Tian-Shan",
      text: "Sortie progressive du monde glaciaire et arrivée à la station d'observation astronomique.",
      distanceKm: 15.3,
      ascentM: 1440,
      descentM: 1220,
      elevationMin: 2920,
      elevationMax: 3800,
    },
    {
      dayNum: "J5",
      title: "Cosmo Tian-Shan → gorges de Kargaly",
      text: "Traversée vers l'ouest et dernier bivouac dans les montagnes.",
      distanceKm: 12.5,
      ascentM: 1100,
      descentM: 1100,
      elevationMin: 2880,
      elevationMax: 3900,
    },
    {
      dayNum: "J6",
      title: "Gorges de Kargaly → Koklaisay",
      text: "Dernière étape et sortie du massif vers Koklaisay.",
      distanceKm: 18.6,
      ascentM: 680,
      descentM: 2460,
      elevationMin: 1580,
      elevationMax: 4000,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données publiées par
// WordPress jour par jour) — jamais recopiés en dur, voir totals.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Avril 2025"; // "9 jours, dont 6 jours de ski, avril 2025" (WordPress)

export const kazakhstan: Carnet = {
  slug: "raid-ski-kazakhstan-ile-alatau",
  seo: {
    title: "Ski au Kazakhstan : traversée des monts Ile Alatau",
    description:
      "Raid à ski au Kazakhstan : traversée en itinérance des monts Ile Alatau : hautes montagnes glaciaires et bivouacs en Asie centrale.",
    ogImage: photos.j6_dsc02253.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "KAZAKHSTAN",
    subtitle: "Une traversée des monts Ile Alatau",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  // Même photo de couverture que la page WordPress live (DSC02253, jour 6).
  openingPhoto: photos.j6_dsc02253,
  intro: {
    heading: "Raid à ski au Kazakhstan — Traversée des monts Ile Alatau",
    paragraphs: [
      "Cette traversée à ski des monts Ile Alatau, au Kazakhstan, est un raid à ski original et engagé au cœur de l'Asie centrale. Entre glaciers, bivouacs sommaires et vestiges de l'ère soviétique, ce périple à ski de rando nous a permis d'explorer des montagnes peu parcourues, où l'itinérance impose une lecture fine du terrain et une adaptation constante.",
      "Plus qu'un simple voyage à ski, cette traversée interroge le rapport à l'engagement, à l'isolement et aux limites — humaines autant que géographiques.",
    ],
    // Même photo de prologue que la page WordPress live (DSC01777, jour 3).
    photo: photos.j3_dsc01777,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Kazakhstan" },
      { label: "Massif", value: "Monts Ile Alatau" },
      { label: "Départ", value: "Chimbulak" },
      { label: "Arrivée", value: "Koklaisay" },
      { label: "Forme du raid", value: "Traversée de massif" },
      { label: "Hébergements", value: "Observatoire astronomique, bivouacs" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Chimbulak → Koklaisay",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/kazakhstan-ile-alatau-2025.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        paragraphs: [
          "Mon voisin de rang est togolais, expatrié au Burkina Faso, à Ouagadugu. Il est chercheur dans les systèmes d'assainissement dans les pays en développement. Il y a quand même quelque chose d'intrigant dans ce mode de transport aérien, qui, avec ses connexions et correspondances, brasse des personnes aux horizons incroyablement variés. À ses yeux, je suis sportif, un grand malade, quand je lui parle de notre projet au Kazakhstan. Si je l'avais rencontré lors du vol retour, je lui aurais dit d'emblée que ce voyage n'a pas été simple !",
        ],
      },
      {
        heading: "Jour 1 — De Chimbulak au premier bivouac",
        paragraphs: [
          "La station de ski de Chimbulak ne nous dépayse pas, ou du moins pas comme on pourrait imaginer un pays post-soviétique. En bas, une rangée de commerces flambant neufs, des photographes qui ciblent les touristes apprêtés, des jeunes femmes déguisées en cosmonautes qui tentent de vendre je ne sais quoi aux passants et de grosses berlines. Au sommet des remontées mécaniques, des drones survolent la foule de touristes venus de la ville pour capter l'« instagramabilité » de l'instant. Ce n'est pas vraiment la montagne qui a suscité notre motivation pour venir jusque-là, et c'est pourtant ici que commence notre aventure, aux antipodes de cette vision marchandisée.",
          "Nous remontons une raide pente froide jusqu'à un col surmonté d'un gendarme élancé. De l'autre côté, la vue sur le bassin de Tuyuk-Su nous donne la mesure des montagnes kazakhes. Au loin, nous apercevons notre premier bivouac : un algeco orange, à l'intérieur duquel se trouvent trois couchettes, une table et un poêle. Aurélien Lurquin nous a ramené une bouteille de pinot. Un grand champagne pour fêter un départ sans accroc, dégusté dans un petit bol en inox trouvé sur place.",
        ],
      },
      {
        heading: "Jour 2 — Basculer dans la vallée du Talgar",
        paragraphs: [
          "La seconde journée doit nous permettre de basculer dans la vallée du Talgar, une très longue vallée où la retraite par le bas serait particulièrement compliquée. Nous remontons jusqu'au col de Tuyuk-Su, à 4 015 m, et prenons pied sur une large arête cornichée, d'où s'ouvre un nouveau pan de massif. En bas de la première combe, nous rejoignons un vaste bassin glaciaire ; comme souvent dans ces configurations, il faut viser les rives pour trouver des canyons skiables.",
          "Le bassin glaciaire que nous rejoignons après le passage de la clue est vaste et surmonté d'impressionnants sommets glaciaires. C'est incroyable d'immensité et de beauté, et j'immortalise le moment de façon frénétique. Tout à coup, un écriteau s'affiche sur mon écran : « impossible d'enregistrer le fichier »… Ma carte SD est morte. Un coup au moral…",
        ],
      },
      {
        heading: "Jour 3 — La chute",
        paragraphs: [
          "Nous continuons à remonter le glacier sous une chaleur pesante. Mais tout n'est pas aussi simple que sur ma carte, et l'arête repérée devient plus effilée et technique. La fatigue du groupe impose de recomposer le plan initial. Je pars en reconnaissance. Sans me méfier, j'engage le ski amont dans une neige plus dure dont le grip me paraît sûr. Mais mon ski aval ne mord pas lorsque je lui transfère mon poids, et il m'entraîne, comme à la suite d'un pas dans le vide. Mes skis grattent alors la surface de la neige, découvrant de la glace bleue. Je crie. C'est interminable. Entre l'approche de la pierre et mon arrêt, c'est le trou noir.",
          "Je lève la tête vers l'origine de ma chute. La pente de glace était en fait très raide. Il y a du sang dans la neige. Mes lèvres me brûlent. Mais le plus inquiétant, c'est ma cuisse que je sens douloureuse. Ma crainte principale concerne le fémur. Nous sommes très isolés, loin de tout, et le mauvais temps est en train d'arriver. Thomas émerge de la crête piégeuse. Mes compagnons me rejoignent en contournant la pente de glace, crampons aux pieds.",
          "Quelques conversions plus haut, j'atteins le col, et le premier regard sur le versant opposé confirme mes craintes. J'opte pour la « moins pire ». Je sors la corde pour assurer l'entrée de la pente, et les premiers virages confirment mon pari. Nous prenons bientôt pied sur l'immense glacier Gorodetsky et la cabane est finalement atteinte, avec plus de facilité que ce que je redoutais.",
        ],
      },
      {
        heading: "Jour 4 — Cosmo, vestige soviétique",
        paragraphs: [
          "Cosmo est une station d'observation astronomique perchée à 3 300 m, possédant deux télescopes Gamma encore en activité. Nous la rejoignons après une journée de lent glissement hors du monde glaciaire. Le brouillard enveloppe des bâtiments hérités de l'ère soviétique. Un homme surgit de la brume et vient à notre rencontre. « Yann ? » — « Da ».",
          "Il nous accompagne dans un bâtiment d'époque. C'est tellement bon de se trouver dans une pièce chauffée que cet hébergement, par contraste, me paraît très confortable. Igor est un retraité actif, ingénieur mécanique et électronique sur les télescopes gamma depuis 1983.",
          "Au repas, l'ambiance est pesante. J'engage la discussion avec Amélie. En tant que guide, nous nous concentrons sur les incertitudes liées aux conditions de la montagne, en occultant peut-être parfois les incertitudes de l'humain. Une chose est certaine : ce soir, tout le monde se couche le cœur plus léger.",
        ],
      },
      {
        heading: "Jours 5 & 6 — Vers Koklaisay",
        paragraphs: [
          "Le soleil se lève sur Tian-Shan, et sa position dominante développe l'étendue des montagnes d'Ile Alatau. L'horizon s'ouvre sur la plaine kazakhe et sa capitale économique, Almaty, d'où nous sommes partis. L'ambiance est plus légère aujourd'hui et la descente, délicieuse.",
          "Nous vivons ici notre dernière soirée dans les montagnes kazakhes. Elle est joyeuse et teintée de nostalgie. Demain, nous achèverons notre traversée. Puis il y aura la lente descente, au sens propre comme figuré.",
          "En tant que guide, j'ai atteint avec cette itinérance l'incarnation de ce que je veux vivre comme professionnel, et également une limite de ce que je suis prêt à accepter comme engagement avec des clients. Ce voyage m'a poussé dans mes retranchements. Mais à la fin, quel voyage !",
        ],
      },
    ],
    // Note éditoriale, pas un paragraphe du récit : sortie du dernier bloc et
    // déplacée après coup (voir CarnetStory) — lien réel déjà identifié en
    // tête de fichier, jamais une URL inventée.
    sourceNote: {
      text: "Ce récit a été initialement publié dans Alpine Mag.",
      linkLabel: "Lire l'article original",
      href: "https://alpinemag.fr/ski-rando-yann-borgnet-kazakhstan-traversee-monts-ile-alatau/",
    },
    /* Rail jour par jour : 2-4 photos par journée selon la longueur du
       passage de récit qui lui correspond (J3 "La chute" et J4 "Cosmo" sont
       les plus longs, J1/J2/J5/J6 partagent des paragraphes plus courts ou
       une heading commune "Jours 5 & 6") — sélection chronologique dans
       chaque jour GPX (voir la note "jour" en tête de fichier), jamais un
       sous-ensemble choisi au hasard. */
    storyDays: itinerary.days.map((d, i) => ({
      day: d.dayNum,
      route: d.title,
      photos: [
        // J1 — Chimbulak → bivouac de Tuyuk-Su
        [photos.j1_dsc01038, photos.j1_dsc01251],
        // J2 — Tuyuk-Su → gorge gauche du Talgar
        [photos.j2_dsc01363, photos.j2_dsc01566],
        // J3 — Gorge gauche du Talgar → Kuzylsau
        [photos.j3_dsc01634, photos.j3_dsc01689, photos.j3_dsc01777, photos.j3_p20250422120555],
        // J4 — Kuzylsau → Cosmo Tian-Shan
        [photos.j4_p20250423050840, photos.j4_p20250423101337, photos.j4_dsc01923],
        // J5 — Cosmo Tian-Shan → gorges de Kargaly
        [photos.j5_p20250424050153, photos.j5_dsc02110],
        // J6 — Gorges de Kargaly → Koklaisay
        [photos.j6_dsc02166, photos.j6_dsc02253, photos.j6_p20250426122432],
      ][i],
    })),
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "KAZAKHSTAN",
    subtitle: "Une traversée des monts Ile Alatau",
    meta: "Avril 2025 · 6 jours de traversée à ski des monts Ile Alatau, entre glaciers et vestiges soviétiques · Photos : Yann Borgnet",
    // Les 54 photos disponibles, dans l'ordre chronologique par jour (voir
    // src/data/photos/kazakhstan-2025.ts) — pas de séquence "best of"
    // distincte de la chronologie faute de jugement visuel photo par photo :
    // les 15 premières (réparties sur les 6 jours) forment la mosaïque
    // visible au chargement, le reste se déplie au clic (CarnetGallery).
    photos: [
      // --- 15 visibles au chargement (2-3 par jour) ---
      photos.j1_dsc01038,
      photos.j1_dsc01251,
      photos.j2_dsc01363,
      photos.j2_dsc01514,
      photos.j3_dsc01634,
      photos.j3_p20250422093322,
      photos.j3_p20250422120555,
      photos.j4_p20250423101337,
      photos.j4_dsc01923,
      photos.j4_dsc01885,
      photos.j5_p20250424050153,
      photos.j5_dsc02036,
      photos.j6_dsc02253,
      photos.j6_dsc02419,
      photos.j6_p20250425140324,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.j1_dsc01077,
      photos.j1_dsc01101,
      photos.j1_dsc01118,
      photos.j1_dsc01173,
      photos.j1_dsc01212,
      photos.j1_dsc01305,
      photos.j2_dsc01501,
      photos.j2_dsc01522,
      photos.j2_dsc01566,
      photos.j2_dsc01582,
      photos.j3_dsc01667,
      photos.j3_dsc01689,
      photos.j3_dsc01724,
      photos.j3_dsc01777,
      photos.j4_p20250423050840,
      photos.j4_p20250423061238,
      photos.j4_p20250423081349,
      photos.j4_p20250423144634,
      photos.j4_p20250423153240,
      photos.j4_p20250423150749,
      photos.j4_dsc01836,
      photos.j4_dsc01852,
      photos.j4_dsc01880,
      photos.j4_dsc01925,
      photos.j4_dsc01949,
      photos.j5_dsc01956,
      photos.j5_dsc02004,
      photos.j5_dsc02110,
      photos.j5_dsc02121,
      photos.j6_dsc02166,
      photos.j6_dsc02199,
      photos.j6_dsc02323,
      photos.j6_dsc02363,
      photos.j6_dsc02411,
      photos.j6_dsc02453,
      photos.j6_dsc02478,
      photos.j6_dsc02481,
      photos.j6_dsc02501,
      photos.j6_p20250426122432,
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera/Géorgie,
 *  jamais une photo retapée séparément. */
export const indexCover = photos.j6_dsc02253;
