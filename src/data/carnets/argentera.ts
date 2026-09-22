import type { Carnet, CarnetPhoto } from "./types";
import {
  computeItineraryTotals,
  formatAscent,
  formatDescent,
  formatDistanceKm,
  formatDaysLabel,
  formatMeters,
} from "../../lib/carnet/itinerary-totals";

/**
 * Texte (intro + itinéraire court + récit complet) repris tel quel de la page
 * WordPress live : https://lesgrandsraidsaski.com/traversee-ski-argentera-mercantour/
 * — à l'exception des `via`/`text` de J4, J6 et J7, corrigés par rapport à la
 * page WordPress après vérification GPX + Camptocamp/Skitour/OSM (voir
 * data/gpx-sources/argentera-mercantour-2026.original.gpx) :
 *   - J4 : "lac de Chiotas" n'est pas un passage confirmé (la trace passe
 *     ~500 m à distance et ~160 m plus haut) — remplacé par le Passo di
 *     Brocan (2892 m, écart 3 m), réellement franchi ; le vallon du lac
 *     reste mentionné comme repère visuel, pas comme un lieu traversé.
 *   - J6 : "traversée intérieure du massif" (trop vague) remplacé par le
 *     Colletto Est della Paur (2890 m, écart ~18 m/10 m).
 *   - J7 : ajout de la Cima del Latous (2744 m, écart ~5 m/2 m), non
 *     mentionnée sur la page d'origine.
 * Photos : fournies directement par l'utilisateur dans public/photos/, donc
 * hébergées localement (pas de dépendance WordPress/OVH — voir mémoire
 * project_wordpress_migration).
 */

const IMG = "/photos/Argentera/";

// Dimensions réelles (lues avec Pillow) — permettent au rail/portfolio de
// connaître le ratio de chaque photo avant chargement, requis depuis que ces
// gabarits utilisent le ratio intrinsèque plutôt qu'un recadrage forcé (voir
// CarnetPhoto.width/height, ajouté lors de la correction Géorgie du 17/09).
const DIMS: Record<string, [number, number]> = {
  "couloir-ski-argentera-mercantour.jpg": [1536, 1027],
  "descente-ski-argentera-mercantour (2).jpg": [1536, 1027],
  "descente-ski-argentera-mercantour.jpg": [1536, 1025],
  "descente-ski-randonnee-argentera.jpg": [1536, 1027],
  "descente-ski-randonnee-mercantour-argentera.jpg": [1536, 1027],
  "gardien-refuge-argentera.jpg": [1027, 1536],
  "gardien-refuge-mercantour.jpg": [1027, 1536],
  "gardien-refuge-nice-mercantour.jpg": [1536, 1027],
  "groupe-ski-randonnee-argentera-mercantour.jpg": [1536, 1027],
  "groupe-ski-randonnee-crete-argentera.jpg": [1536, 1027],
  "groupe-ski-randonnee-mercantour.jpg": [1536, 1027],
  "groupe-ski-randonnee-traversee-argentera.jpg": [1536, 1027],
  "lagopede-mercantour-hiver.jpg": [1536, 1027],
  "lagopede-neige-argentera-mercantour.jpg": [1536, 1027],
  "portage-ski-haute-montagne-argentera.jpg": [1536, 1027],
  "portage-ski-mercantour-panorama.jpg": [1536, 1027],
  "portage-skis-panorama-argentera.jpg": [1536, 1027],
  "raid-ski-argentera-mercantour.jpg": [1536, 1027],
  "refuge-mercantour-argentera-gardien.jpg": [1027, 1536],
  "refuge-montagne-argentera-mercantour.jpg": [1536, 1027],
  "refuge-nice-gardien-mercantour.jpg": [1536, 1027],
  "refuge-nice-mercantour-ski-randonnee.jpg": [1536, 1027],
  "repas-refuge-mercantour.jpg": [1027, 1536],
  "ski-poudreuse-argentera-mercantour.jpg": [1536, 1027],
  "ski-randonnee-argentera-lac-barrage.jpg": [1027, 1536],
  "ski-randonnee-argentera-vue-mediterranee.jpg": [1536, 1027],
  "ski-randonnee-couloir-mercantour.jpg": [1027, 1536],
  "ski-randonnee-melezes-mercantour.jpg": [1536, 1027],
  "ski-randonnee-mercantour-argentera-casterino.jpg": [1536, 1027],
  "ski-randonnee-mercantour-montee-vallee-neige.jpg": [1536, 1027],
  "ski-randonnee-mercantour-panorama-montagne.jpg": [1536, 1027],
  "ski-randonnee-mercantour-relief-neige.jpg": [1536, 1027],
  "ski-randonnee-mercantour-vallon-neige.jpg": [1536, 1027],
  "ski-randonnee-mercantour-vue-mediterranee.jpg": [1536, 1027],
  "ski-randonnee-refuge-mercantour.jpg": [1027, 1536],
  "ski-randonnee-vent-mercantour.jpg": [1027, 1536],
  "tempete-vent-ski-mercantour.jpg": [1536, 1027],
  "trace-ski-randonnee-neige-argentera.jpg": [1027, 1536],
  "traversee-ski-argentera-mercantour.jpg": [1536, 1027],
  "traversee-ski-mercantour-argentera-panorama.jpg": [1536, 1027],
  "traversee-ski-mercantour-grands-espaces.jpg": [1536, 1027],
  "traversee-ski-mercantour-paysage-alpin.jpg": [1536, 1027],
  "vie-refuge-mercantour-poele.jpg": [1536, 1027],
  "vie-refuge-poele-argentera.jpg": [1536, 1027],
};

const photo = (file: string, alt: string): CarnetPhoto => {
  const [width, height] = DIMS[file] ?? [];
  return { src: `${IMG}${file}`, alt, width, height };
};

const photos = {
  hero: photo("traversee-ski-mercantour-grands-espaces.jpg", "Skieurs de randonnée dans les grands espaces du massif de l'Argentera, mer en toile de fond"),
  introPhoto: photo("ski-randonnee-argentera-lac-barrage.jpg", "Descente à ski au-dessus du lac de barrage de Chiotas et du refuge Genova-Figari, massif de l'Argentera"),

  // J2
  tempeteVent: photo("tempete-vent-ski-mercantour.jpg", "Skieur progressant seul dans le vent et la neige transportée, massif du Mercantour"),
  gardienNice: photo("gardien-refuge-nice-mercantour.jpg", "Christophe, gardien du refuge de Nice, préparant un repas en cuisine"),
  vueMediterranee: photo("ski-randonnee-mercantour-vue-mediterranee.jpg", "Groupe de skieurs de randonnée avec la Méditerranée en arrière-plan, Mercantour"),

  // J3
  groupeCrete: photo("groupe-ski-randonnee-crete-argentera.jpg", "Groupe en ski de randonnée sur une crête du massif de l'Argentera, plaine italienne en contrebas"),
  gardienCougourde: photo("gardien-refuge-argentera.jpg", "Quentin, gardien d'hiver du refuge de la Cougourde, en cuisine"),
  couloir: photo("couloir-ski-argentera-mercantour.jpg", "Skieur portant ses skis dans un couloir rocheux étroit, massif de l'Argentera"),

  // J4
  portage: photo("portage-ski-mercantour-panorama.jpg", "Skieur en portage sur une pente raide, panorama sur les vallées du Mercantour"),
  poeleRefuge: photo("vie-refuge-poele-argentera.jpg", "Vie de refuge autour du poêle à bois pendant la traversée de l'Argentera"),

  // J5
  traverseeGroupe: photo("groupe-ski-randonnee-traversee-argentera.jpg", "Trois skieurs de randonnée en traversée sur une crête enneigée, massif de l'Argentera"),
  repasValasco: photo("repas-refuge-mercantour.jpg", "Service de la polenta au refuge de Valasco pendant la traversée de l'Argentera"),
  descenteLeccia: photo("descente-ski-argentera-mercantour.jpg", "Descente à ski sous une tour rocheuse, massif de l'Argentera"),

  // Rail photo du récit (complément J1-J5, voir dayPhotos plus bas) — ancien
  // fichier fourni mais jamais référencé (ni portfolio, ni récit), et photos
  // reprises du portfolio quand un rapprochement direct avec le texte ou
  // l'itinéraire du jour est net.
  refugeNiceArrivee: photo("refuge-nice-mercantour-ski-randonnee.jpg", "Le refuge de Nice perché sur son éperon rocheux, vue sur les sommets du Mercantour"),
  vallonNeige: photo("ski-randonnee-mercantour-vallon-neige.jpg", "Deux skieurs de randonnée dans un vallon enneigé du Mercantour"),
  ventPortrait: photo("ski-randonnee-vent-mercantour.jpg", "Skieur de randonnée seul dans le vent et la neige transportée, massif du Mercantour"),
  melezes: photo("ski-randonnee-melezes-mercantour.jpg", "Ski de randonnée parmi les mélèzes, massif du Mercantour"),
  couloirPortrait: photo("ski-randonnee-couloir-mercantour.jpg", "Skieurs de randonnée sous une paroi rocheuse, massif du Mercantour"),
  descenteRandoMercantour: photo("descente-ski-randonnee-mercantour-argentera.jpg", "Descente à ski de randonnée, massif du Mercantour"),
  portageHaute: photo("portage-ski-haute-montagne-argentera.jpg", "Groupe en portage des skis en haute montagne, massif de l'Argentera, mer en arrière-plan"),
  portagePanoramaArgentera: photo("portage-skis-panorama-argentera.jpg", "Portage des skis avec panorama sur le massif de l'Argentera"),
  vueMediterraneeArgentera: photo("ski-randonnee-argentera-vue-mediterranee.jpg", "Skieurs de randonnée avec vue sur la Méditerranée, massif de l'Argentera"),
  descente2: photo("descente-ski-argentera-mercantour (2).jpg", "Descente à ski dans le massif de l'Argentera"),

  // Portfolio
  groupeMercantour: photo("groupe-ski-randonnee-mercantour.jpg", "Groupe en ski de randonnée dans le massif du Mercantour"),
  groupeArgentera: photo("groupe-ski-randonnee-argentera-mercantour.jpg", "Groupe en ski de randonnée dans le massif de l'Argentera"),
  gardienRefugeGenerique: photo("gardien-refuge-mercantour.jpg", "Gardien de refuge pendant la traversée de l'Argentera"),
  gardienNiceGenerique: photo("refuge-nice-gardien-mercantour.jpg", "Deux randonneurs dans l'entrée du refuge de Nice"),
  gardienRefugePortrait: photo("refuge-mercantour-argentera-gardien.jpg", "Portrait d'un gardien de refuge pendant la traversée de l'Argentera"),
  refugeCrete: photo("refuge-montagne-argentera-mercantour.jpg", "Refuge de montagne perché sur un éperon rocheux, massif de l'Argentera"),
  lagopede1: photo("lagopede-mercantour-hiver.jpg", "Lagopède alpin en vol au-dessus de la neige, massif du Mercantour"),
  lagopede2: photo("lagopede-neige-argentera-mercantour.jpg", "Lagopède alpin dans la neige, massif de l'Argentera"),
  raid: photo("raid-ski-argentera-mercantour.jpg", "Raid à ski de randonnée dans le massif de l'Argentera"),
  panneauPeche: photo("ski-randonnee-mercantour-argentera-casterino.jpg", "Panneau de réglementation de pêche au bord d'un torrent gelé, sur le trajet de la traversée"),
  poeleRefuge2: photo("vie-refuge-mercantour-poele.jpg", "Vie de refuge autour du poêle pendant la traversée du Mercantour"),
  descenteRando: photo("descente-ski-randonnee-argentera.jpg", "Descente à ski de randonnée dans le massif de l'Argentera"),
  skiPoudreuse: photo("ski-poudreuse-argentera-mercantour.jpg", "Ski en poudreuse dans le massif de l'Argentera"),
  monteeVallee: photo("ski-randonnee-mercantour-montee-vallee-neige.jpg", "Montée à ski dans une vallée enneigée du Mercantour"),
  panoramaMontagne: photo("ski-randonnee-mercantour-panorama-montagne.jpg", "Panorama de montagne pendant la traversée du Mercantour"),
  reliefNeige: photo("ski-randonnee-mercantour-relief-neige.jpg", "Relief enneigé du massif du Mercantour"),
  refugePortrait: photo("ski-randonnee-refuge-mercantour.jpg", "Arrivée à un refuge pendant la traversée du Mercantour"),
  tracePortrait: photo("trace-ski-randonnee-neige-argentera.jpg", "Trace de peaux de phoque dans la neige, massif de l'Argentera"),
  traverseeArgentera: photo("traversee-ski-argentera-mercantour.jpg", "Traversée à ski du massif de l'Argentera"),
  traverseePanorama: photo("traversee-ski-mercantour-argentera-panorama.jpg", "Panorama pendant la traversée à ski du Mercantour et de l'Argentera"),
  paysageAlpin: photo("traversee-ski-mercantour-paysage-alpin.jpg", "Paysage alpin pendant la traversée à ski du Mercantour"),
};

/* Itinéraire reconstruit à partir du GPX ORIGINAL enregistré (AlpineQuest,
   21978 points horodatés, 30/03–05/04/2026) — voir data/gpx-sources/
   argentera-mercantour-2026.original.gpx. Découpage en 7 jours basé sur les
   6 seules coupures temporelles > 13h de toute la trace (13.3 à 17.5h),
   très nettement dominantes sur les pauses diurnes (~1h) : le nom de fichier
   original ("6 jours") est une erreur d'étiquetage, la trace enregistre bien
   7 journées de ski réelles. D+/D- lissés (fenêtre 9 points, seuil 2 m) sur
   les altitudes <ele> réelles du GPX ; distance géodésique point à point.
   Chaque passage intermédiaire n'est listé dans `via` que s'il est CONFIRMÉ
   (coordonnées + altitude d'une source topographique concordant avec la
   trace, écart <300-500 m) — jamais de passage "à valider" dans le texte
   public. */
const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "7 jours. Du Mercantour à l'Argentera.",
  intro:
    "D'Entracque à Sant'Anna di Valdieri, une traversée transalpine par Casterino et une succession de refuges ouverts en hiver.",
  days: [
    {
      dayNum: "J1",
      title: "Entracque → Casterino",
      via: ["Vallon d'Ischietto"],
      text: "Depuis Entracque, montée par le vallon d'Ischietto — terrain sauvage, grands dépôts d'avalanche traversés en chemin — puis première bascule côté français jusqu'à Casterino.",
      distanceKm: 20.5,
      ascentM: 1780,
      descentM: 1320,
      elevationMin: 1070,
      elevationMax: 2710,
    },
    {
      dayNum: "J2",
      title: "Casterino → Refuge de Nice",
      via: ["Baisse de Fontanalbe", "Baisse du Basto", "Mont Clapier"],
      text: "Depuis Casterino, presque en ligne droite par la Baisse de Fontanalbe puis la Baisse du Basto, dans le vent et la neige transportée. La trace passe aussi par le sommet du Mont Clapier (3045 m), calme malgré le vent, avant de rejoindre le refuge de Nice.",
      distanceKm: 20.1,
      ascentM: 2170,
      descentM: 1500,
      elevationMin: 1550,
      elevationMax: 3050,
    },
    {
      dayNum: "J3",
      title: "Refuge de Nice → Refuge de la Cougourde",
      via: ["Épaule du mont Gélas", "Pas des Ladres"],
      text: "Depuis le refuge de Nice, montée vers l'épaule du mont Gélas (environ 3093 m, sous le sommet à 3143 m), puis bascule par le Pas des Ladres jusqu'au refuge de la Cougourde, avec une échappée possible vers la Cima Gaisse.",
      distanceKm: 21.6,
      ascentM: 2300,
      descentM: 2410,
      elevationMin: 1960,
      elevationMax: 3090,
    },
    {
      dayNum: "J4",
      title: "Refuge de la Cougourde → Rifugio Remondino",
      via: ["Cima dell'Agnel", "Passo di Brocan"],
      text: "Bascule en Italie par le sommet de la Cima dell'Agnel (2932 m), puis descente dominant en balcon le vallon du lac de Chiotas, avant un second col, le Passo di Brocan (2892 m), pour rejoindre le Rifugio Remondino.",
      distanceKm: 13.0,
      ascentM: 1680,
      descentM: 1330,
      elevationMin: 2040,
      elevationMax: 2930,
    },
    {
      dayNum: "J5",
      title: "Rifugio Remondino → Refuge de Valasco",
      via: ["Cima di Leccia", "Col de Cerise", "Baisse de Rogué", "Tête des Bresses Sud"],
      text: "Depuis Remondino, montée à la Cima di Leccia en passant par le col de Cerise, puis traversée par la Baisse de Rogué et la Tête des Bresses Sud, avant la descente sur le refuge de Valasco, ancienne casemate de chasse de Victor-Emmanuel II.",
      distanceKm: 18.7,
      ascentM: 1620,
      descentM: 2330,
      elevationMin: 1760,
      elevationMax: 2830,
    },
    {
      dayNum: "J6",
      title: "Refuge de Valasco → Rifugio Livio Bianco",
      via: ["Colletto Est della Paur"],
      text: "Depuis Valasco, franchissement du Colletto Est della Paur (2890 m), seul et net point culminant de la journée, entre hauts vallons et refuges italiens, avant de rejoindre le Rifugio Livio Bianco.",
      distanceKm: 13.3,
      ascentM: 1400,
      descentM: 1280,
      elevationMin: 1770,
      elevationMax: 2880,
    },
    {
      dayNum: "J7",
      title: "Rifugio Livio Bianco → Sant'Anna di Valdieri",
      via: ["Cima del Latous"],
      text: "Dernière étape : passage par la Cima del Latous (2744 m), puis longue descente vers la vallée pour rejoindre Sant'Anna di Valdieri et la fin de la traversée transalpine.",
      distanceKm: 14.7,
      ascentM: 900,
      descentM: 1810,
      elevationMin: 980,
      elevationMax: 2740,
    },
  ],
};

// Photo de couverture pour la page listing des carnets (/carnets-de-voyage-ski/)
// — distincte de openingPhoto et de traverseePanorama (déjà utilisées sur la
// homepage) pour ne pas répéter deux fois la même image entre les deux pages.
export const indexCover = photos.traverseeArgentera;
// Grande photo d'ouverture de la page listing elle-même (hero éditorial) —
// encore une image différente, pour que les trois apparitions du carnet
// (homepage, listing, page carnet) montrent trois photos distinctes.
// vueMediterranee : les trois skieurs (premier plan bien visible, ligne de
// crête en haut de cadre) tiennent dans une bande panoramique sans être
// coupés ni collés au bord bas — object-position calé sur le bas du cadre
// (ski tips du skieur de tête, marge de neige sous eux) et légèrement à
// droite du centre (skieur de tête décalé côté droit de la photo).
export const indexHeroPhoto = { ...photos.vueMediterranee, position: "55% 96%" };

// Totaux calculés depuis l'itinéraire structuré ci-dessus — jamais de valeur
// en dur : si un jour est corrigé, le hero se met à jour automatiquement.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Début avril 2026"; // période réelle (30/03–05/04/2026)
  // d'après les timestamps du GPX — plus précise que le "hiver 2026" de la
  // page d'origine (non contradictoire, simple affinage).

export const argentera: Carnet = {
  slug: "traversee-ski-argentera-mercantour",
  seo: {
    title: "Argentera-Mercantour à ski : traversée transalpine",
    description:
      "Traversée à ski de l'Argentera et du Mercantour : 7 jours d'Entracque à Sant'Anna di Valdieri, cols, refuges gardés et rencontres avec les loups entre France et Italie.",
    ogImage: photos.hero.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "ARGENTERA",
    subtitle: "Traversée du massif",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: { ...photos.hero, position: "center 40%" },
  intro: {
    heading: "Deux plans B, et quels plans B !",
    paragraphs: [
      "La météo étant perturbée dans les Tödi puis dans la Silvretta, je me suis rabattu sur l'Argentera, massif déjà traversé en 2015 puis retrouvé en 2024 et 2025 au fil de ma traversée des Alpes.",
      "Sept jours d'Entracque à Sant'Anna di Valdieri, via Casterino et les refuges de Nice, de la Cougourde, Remondino, Valasco et Livio Bianco. Un massif idéal pour l'itinérance à ski, très enneigé cette année, où l'on peut composer des journées tranquilles ou engagées. Et surtout, au détour d'une étape, ma première rencontre avec des loups, en plein jour, à quelques dizaines de mètres.",
    ],
    photo: { ...photos.introPhoto, position: "center 30%" },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "France & Italie" },
      { label: "Massifs", value: "Mercantour & Argentera" },
      { label: "Départ", value: "Entracque" },
      { label: "Arrivée", value: "Sant'Anna di Valdieri" },
      { label: "Forme du raid", value: "Traversée transalpine — raid à ski en itinérance" },
      { label: "Hébergements", value: "Refuges gardés" },
      // Durée/Distance/D+/D− : mêmes totaux calculés que le hero et la carte
      // (voir `totals` plus haut) — jamais recopiés en dur.
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Traversée du Mercantour à l'Argentera",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/argentera-mercantour-2026.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "Une traversée transalpine sous le signe du vent, des loups et de l'improvisation",
        paragraphs: [
          "Ce matin, il règne une ambiance à la fois légère et grave. Légère car il faudra probablement improviser, et cette dose d'incertitude qui ne permet pas de se projeter ouvre le champ de nos possibles. Elle ouvre la journée sur des inconnues enivrantes.",
          "Grave, parce que nous sommes silencieusement conscients des conditions qui nous attendent une fois le palier de la porte franchi. Pas de promesses aujourd'hui. Nous sommes les premiers à partir du refuge. Dehors, il neige et le vent est rafaleux. Chaque centimètre carré de mon visage est recouvert. Seuls les yeux, à travers mes lunettes, peuvent voir.",
          "Je pense à ces femmes qui ne peuvent respirer librement par le nez. Aux femmes afghanes et à toutes les autres. Je pense aux talibans, qui ont si rapidement repris les rênes d'un pays pourtant engagé sur un chemin de liberté.",
          "« Il y a quelqu'un au col ! », je m'écrie. Une silhouette élancée, un sac sur le dos, se dresse dans l'échancrure, projetant son être dans la blancheur du ciel. D'où peut-il bien venir ? L'autre versant est encore plus sauvage que celui que nous remontons. Et puis non, l'illusion ne tient pas longtemps. C'est un panneau. Je suis à la fois déçu et heureux. Heureux de nous savoir seuls dans cette montagne qui doute du bien-fondé de notre présence.",
          "De l'autre côté du col, le refuge Figari, fermé à cette période, et le lac de barrage de Chiotas donnent le sentiment d'une présence rassurante. Ils sont pourtant des êtres de béton inanimés. Des choses inertes. Mais ils tiennent lieu de repères, et probablement aussi d'abri en cas d'imprévu.",
          "Le tour du Kaçkar, en Turquie, s'est transformé en une traversée Rätikon-Silvretta, en Suisse et Autriche. À cause de Trump et de sa guerre insensée au Moyen-Orient. Et le voyage helvétique est devenu transalpin pour une cause légitime du montagnard, presque une ritournelle en cet hiver 2026 particulièrement enneigé : la météo.",
          "Une, deux, puis trois réponses négatives pour les refuges. Retour au départ. Et pourquoi ne pas faire la traversée dans l'autre sens ? Bien souvent, c'est dans ce genre de contraintes qu'apparaissent les plus belles opportunités.",
          "Ce sera donc une traversée d'Entracque à Sant'Anna di Valdieri, en passant par Casterino et les refuges de Nice, de la Cougourde, de Remondino, de Valasco et de Livio Bianco. Et si possible en déviant des lignes évidentes. Avec l'objectif, à peine caché, de voir à nouveau les loups de l'Argentera.",
          "Entre les refuges Livio Bianco et Valasco, quelques jours avant, avec Alexis, Géraud et Laurent, j'ai enfin vu le loup. Un trio, surpris de voir dévaler des skieurs, et à leur tour dévalant la pente. Rencontre furtive, plaisir consommé mais sûrement non partagé avec ces individus qui habituellement ne se font pas voir.",
          "Des traces, nous en croiserons dès le premier jour, à l'entrée du vallon d'Ischietto, en laissant à main gauche le vallon de Sabbione. Un vaste versant raide et moutonné nous fait face. À l'intersection de ces deux options, personne n'a voulu arbitrer entre l'option paisible de Sabbione et l'option plus aventureuse de l'Ischietto. Alors, en l'absence de voix pour l'option facile, j'ai tranché pour l'inconnue.",
          "Un trou dans la neige, maculé de sang sur ses bordures. Au fond, un chamois dépecé, dont les cuisseaux sont encore bien charnus, d'une viande rosée. À l'évidence, le festin a été consommé, et les restes ont été placés au frais. Guère plus loin, nous traversons un énorme dépôt d'avalanche. Alors que je grimpe sur l'un de ses talus latéraux, je suis tout à coup surpris par un envol inattendu. Un aigle royal vient de déployer toute son envergure juste en dessous de moi, alors qu'il s'affairait à déchiqueter le cou d'un jeune chamois mort. Que de rencontres !",
          "Avec Gilles, nous nous partageons la trace. Bientôt je le vois disparaître dans les volutes de neige transportées par le vent. Un aperçu désagréable des conditions que nous allons devoir affronter les prochains jours.",
          "Casterino est un village saisonnier. Une dizaine de bâtiments, et presque la moitié d'hébergements touristiques. Contre toute attente, la neige recouvre tous les versants alentour. Une décennie que Paul n'a pas vu autant de neige, aussi tard en saison. Résolument l'année du ski méditerranéen, sous toutes ses latitudes.",
          "La mer sera notre toile de fond pour les jours à venir, un horizon bleu profond, infini, contrastant avec les versants enneigés et les forêts de pins.",
          "On sent les Préalpes, les montagnes s'apparentent à des collines, des formes douces recouvertes de mélézins. Le vent nous cueille à la sortie de la forêt, pour ne plus nous lâcher. Il n'est plus question de faire des détours pour rejoindre le refuge de Nice : Baisse de Fontanalbe et Baisse de Basto constituent presque un azimut parfait.",
          "On pense être protégés en se mettant sous le vent dominant. Une sorte de canyon, bordé au nord par une falaise, pourrait être salvateur. Mais le vent est si fort qu'il tourne alternativement dans tous les sens, sans nous laisser le moindre répit. Nous sommes comme les personnages de La Horde du Contrevent, contraints d'élaborer des stratégies collectives face à cet élément qui s'impose peu à peu comme le cœur de l'expérience.",
          "Au mont Clapier, il n'y a presque plus un souffle d'air, et l'horizon s'étend jusqu'à la mer.",
          "Toute la nuit, le vent a tenté de faire vibrer le refuge, à coups de rafales. Mais même les plus fortes d'entre elles n'ont rien fait à cette construction de pierre, aux murs épais. J'aime sentir les éléments qui se déchaînent, ainsi protégé. Ils sont proches, perceptibles, mais ils ne nous atteignent pas.",
          "Christophe attaque sa vingt-sixième année de gardiennage du refuge de Nice. Une force tranquille, avec son bonnet à grosses mailles vissé sur la tête. Ici, comme à la Cougourde, il faut être déterminé et aimer son métier pour ouvrir l'hiver. Un demi-millier de nuitées, sans eau courante et sans possibilité de faire des héliportages pour transporter la nourriture, parc national oblige.",
          "Nous repartons au milieu des bourrasques, en direction de l'épaule du mont Gelas. Certaines rafales stoppent instantanément le moindre mouvement et le caractère « sous le vent » des lieux n'a que peu d'effet. Mais une fois de plus, par un mécanisme physique incompréhensible ou l'action de je ne sais quelle divinité, le vent se tait au sommet.",
          "Après quelques heures lors desquelles chacun se replie dans ses différentes couches protectrices, où chacun suit le rythme imposé par le concours du vent, nous rejoignons le refuge de la Cougourde. En basculant derrière le pas des Ladres, la végétation apparaît plus dense qu'auparavant. Une forêt méridionale qui mêle pins et mélèzes, un terrain idéal pour les loups.",
          "Alors que je repars, toujours dans la même quête de fatiguer Gilles, vers la Cima Gaisse, ils les verront, les loups. Juste en face, depuis les petites fenêtres du refuge. Un trio, comme la semaine précédente.",
          "Quant à nous, je chercherai non sans détour la clé pour l'entrée du couloir nord-ouest. Après avoir tenté d'y rentrer à mi-pente, me retrouvant au-dessus d'une petite barre rocheuse continue, puis avoir cherché à suivre la ligne bleue en pointillé indiquée sur la carte, me retrouvant à nouveau au-dessus de hautes barres, nous nous résignons à remettre les peaux pour tenter un accès depuis le sommet.",
          "L'accès au couloir est d'ici plus évident, même si un doute subsiste puisqu'un gros rocher semble barrer l'accès à la partie inférieure. Cela passe tout juste, et la suite est délicieuse à skier. Au retour, une nouvelle, et quelle nouvelle ! Trois loups sont passés, en plein jour, juste en face du refuge.",
          "Quentin, presque trentenaire, est gardien d'hiver depuis cette année à la Cougourde. Seul le petit poêle réchauffe la pièce. Ici aussi, ouvrir l'hiver demande d'aimer son métier.",
          "Aujourd'hui, nous basculons en Italie, pour la seconde moitié du raid que j'ai résolument pensée transalpine, puisque trois refuges sont gardés : Remondino, Valasco et Livio Bianco.",
          "Un beau couloir ne m'était pas apparu initialement comme évident, et sa présence permet de basculer sur le lac de Chiotas avec une certaine logique, augurant une belle descente depuis la Cima dell'Agnel. Le vent a bien baissé, mais il nous accueille au sommet de façon glaciale, avant de se taire totalement dans le vallon du lac de Chiotas.",
          "Pour une fois, nous rejoignons le refuge tôt. Remondino n'était pas sur la ligne initiale : une option parmi d'autres du kaléidoscope des possibilités.",
          "Après un petit couloir remonté en crampons, neige froide ventée, dure et compacte sous le pied, nous débouchons en réalité à la Cima di Leccia. La mer, d'ici, devient l'horizon principal de nos regards. Sur le versant opposé, la neige a pris le soleil de la Méditerranée, sa surface est dure, presque verglacée. Et la pente raide.",
          "J'esquisse deux virages sautés, courts, pour me rendre compte qu'il n'est pas raisonnable de faire descendre mes clients à ski ici, même en dérapage. Le grip n'est pas assez bon, l'erreur n'est pas permise. Il n'y a pas davantage de calcul rationnel, seulement une intuition qui me signifie que ce ne serait pas raisonnable.",
          "Nous rejoignons un versant aux pentes douces, couvert de forêts de pins et de mélèzes. Un terrain à loups. Et justement, les indices ne se font pas attendre longtemps. Plusieurs traces parallèles, caractérisées par de gros coussinets, descendent la pente de la Baisse de Rogue.",
          "Un dernier coup d'œil à la mer depuis la tête de la Bresses Sud, et nous plongeons dans le versant opposé. Le vent a trop soufflé, rendant le manteau tantôt dur, tantôt aléatoire pour les appuis.",
          "Valasco, un refuge étrange. Ancienne casemate de chasse de Victor-Emmanuel II, deux tours marquent l'entrée d'une grande cour intérieure, comme dans un riad. Tables et transats sont une invitation à la bière. Il y règne une ambiance particulière : la convivialité des retrouvailles après une bonne journée de ski.",
          "Après une assiette variée d'antipasti, une table se dresse juste derrière le bar. De grosses gamelles et une demi-meule de gorgonzola y prennent place : l'une est remplie de polenta, l'autre du traditionnel plat salsiccia in umido, comprendre saucisses à la sauce tomate. Comme au self, chacun vient se servir à sa guise après qu'Andrea a garni chaque assiette d'une généreuse louche de polenta. Ce petit rien anime la salle et donne une ambiance joyeuse.",
        ],
      },
    ],
    // Rail jour par jour (item "correction rail v4") : le récit publié
    // couvre J1 à J5 en une seule section continue (s'arrête au dîner de
    // Valasco) — pas de J6/J7 ici, faute de toute prose ou de tout repère
    // GPS/date exploitable pour ces deux jours dans le pool de photos
    // disponible (voir note ci-dessous plutôt que d'assigner une photo
    // générique au hasard). `route` reprend le titre réel de chaque étape
    // dans `itinerary.days`, jamais retapé. Sélection éditoriale par jour
    // quand un rapprochement texte/photo ou étape/photo est net (vallon
    // d'Ischietto J1, vent et gardiens nommés J2, couloir et Quentin J3,
    // bascule italienne J4, Cima di Leccia et polenta J5) ; les photos trop
    // génériques pour être rattachées à un jour précis restent dans le
    // portfolio plutôt que d'être assignées au hasard.
    storyDays: itinerary.days.slice(0, 5).map((d, i) => ({
      day: d.dayNum,
      route: d.title,
      photos: [
        [photos.tracePortrait, photos.monteeVallee, photos.panneauPeche, photos.vallonNeige],
        [photos.tempeteVent, photos.gardienNice, photos.refugeNiceArrivee, photos.ventPortrait,
          photos.melezes, photos.gardienNiceGenerique, photos.vueMediterranee],
        [photos.groupeCrete, photos.descenteRandoMercantour, photos.couloir,
          photos.gardienCougourde, photos.couloirPortrait],
        [photos.portage, photos.panoramaMontagne, photos.poeleRefuge,
          photos.portageHaute, photos.portagePanoramaArgentera],
        [photos.traverseeGroupe, photos.descenteLeccia, photos.repasValasco,
          photos.vueMediterraneeArgentera, photos.descente2],
      ][i],
    })),
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "ARGENTERA",
    subtitle: "Traversée du Mercantour à l'Argentera",
    meta: "Hiver 2026 · 7 jours de traversée à ski entre France et Italie · Photos : Yann Borgnet",
    // Le portfolio complet réunit toutes les photos du voyage (item 8/11) :
    // les 15 premières forment la mosaïque "best of" visible au chargement ;
    // les photos déjà utilisées dans le rail dense du récit se déplient
    // ensuite derrière "Voir la suite du portfolio", plutôt que d'en être
    // exclues.
    photos: [
      // --- 15 visibles au chargement ---
      photos.groupeMercantour, photos.groupeArgentera, photos.gardienRefugeGenerique,
      photos.gardienRefugePortrait, photos.refugeCrete,
      photos.lagopede1, photos.lagopede2,
      photos.raid, photos.poeleRefuge2,
      photos.descenteRando, photos.skiPoudreuse,
      photos.reliefNeige,
      photos.refugePortrait, photos.traverseeArgentera,
      photos.traverseePanorama,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.paysageAlpin,
      photos.tracePortrait, photos.monteeVallee, photos.panneauPeche, photos.vallonNeige,
      photos.tempeteVent, photos.gardienNice, photos.refugeNiceArrivee, photos.ventPortrait,
      photos.melezes, photos.gardienNiceGenerique, photos.vueMediterranee,
      photos.groupeCrete, photos.descenteRandoMercantour, photos.couloir,
      photos.gardienCougourde, photos.couloirPortrait,
      photos.portage, photos.panoramaMontagne, photos.poeleRefuge,
      photos.portageHaute, photos.portagePanoramaArgentera,
      photos.traverseeGroupe, photos.descenteLeccia, photos.repasValasco,
      photos.vueMediterraneeArgentera, photos.descente2,
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};
