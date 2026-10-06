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
    // Positions = premier/dernier point de chaque segment du GPX (fins d'étape), noms repris des titres de journée.
    markers: [
      { name: "Chimbulak", lat: 43.112938, lon: 77.111280 },
      { name: "Tuyuk-Su", lat: 43.061127, lon: 77.082849 },
      { name: "Gorge gauche du Talgar", lat: 43.040695, lon: 77.156303 },
      { name: "Kuzylsau", lat: 43.002158, lon: 77.018237 },
      { name: "Cosmo Tian-Shan", lat: 43.041855, lon: 76.944225 },
      { name: "Gorges de Kargaly", lat: 43.017981, lon: 76.848644, direction: "left" },
      { name: "Koklaisay", lat: 43.095039, lon: 76.784693 },
    ],
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    title: "Itinérance à ski dans les montagnes sauvages du Kazakhstan",
    standfirst:
      "À travers les hautes vallées glaciaires du Kazakhstan, le guide de haute montagne Yann Borgnet retrace sa traversée à ski des monts Ile Alatau. Des rencontres insolites, des grands sommets et des petites cabanes oranges, et un incident qui aurait pu mal tourner : voici le récit d’une belle aventure à ski de rando au cœur de l’Asie Centrale.",
    // Récit intégral Alpine Mag (21/12/2025) ; photos des journées J1→J6 en regard
    // des passages correspondants (rail de droite, intercalées sur mobile).
    sections: [
      {
        paragraphs: [
          "Mon voisin de rang est togolais, expatrié au Burkina Faso, à Ouagadugu. Il est chercheur dans les systèmes d’assainissement dans les pays en développement. Il y a quand même quelque chose d’intrigant dans ce mode de transport aérien, qui, avec ses connexions et correspondances, brasse des personnes aux horizons incroyablement variés.",
          "À ses yeux, je suis sportif, un grand malade quand je lui parle de notre projet au Kazakhstan. Si je l’avais rencontré lors du vol retour, je lui aurais dit d’emblée que ce voyage n’a pas été simple.",
        ],
      },
      {
        heading: "De Chimbulak au premier algeco",
        paragraphs: [
          "La station de ski de Chimbulak ne nous dépayse pas, ou du moins pas comme on pourrait imaginer un pays post-soviétique. En bas, une rangée de commerces flambant neufs, des photographes qui ciblent les touristes apprêtés, des jeunes femmes déguisées en cosmonautes qui tentent de vendre je ne sais quoi aux passants et de grosses berlines – certes, électriques et de marques chinoises inconnues.",
          "Au sommet des remontées mécaniques, des drones survolent la foule de touristes venus de la ville pour capter l’« instagramabilité » de l’instant, devant un quatre par trois « Rolex ». Ce n’est pas vraiment la montagne qui a suscité notre motivation pour venir jusque-là, et c’est pourtant ici que commence notre aventure, aux antipodes de cette vision marchandisée.",
          "Nous remontons une raide pente froide, comme une initiation à la nivologie kazakh, jusqu’à un col surmonté d’un gendarme élancé. De l’autre côté, la pente sud, très rocailleuse, est dégarnie, mais la vue sur le bassin de Tuyuk-Su nous donne la mesure des montagnes kazakhs.",
          "Au loin, nous apercevons notre premier bivouac : un algeco orange à l’intérieur duquel se trouvent trois couchettes, une table, un système de production d’électricité non fonctionnel et un poêle. Aurélien (Lurquin) nous a ramené une bouteille de pinot. Un grand champagne pour fêter un départ sans accroc, dégusté dans un petit bol en inox trouvé sur place ; ici, nul besoin de Zalto pour l’apprécier !",
        ],
        photos: [photos.j1_dsc01038, photos.j1_dsc01251],
      },
      {
        heading: "Exploration de la vallée de Talgar",
        paragraphs: [
          "La seconde journée doit nous permettre de basculer dans la vallée du Talgar, une très longue vallée où la retraite par le bas serait particulièrement compliquée. Nous remontons jusqu’au col de Tuyuk-Su (4015 m) et prenons pied sur une large arête cornichée, d’où s’ouvre un nouveau pan de massif. Des montagnes plus arrondies, surmontées de vastes pentes dégarnies où affleure la glace noire. En bas de la première combe, nous rejoignons un vaste bassin glaciaire.",
          "Comme souvent dans ces configurations, il faut viser les rives pour trouver des canyons skiables. À gauche, le versant sud, complètement déneigé, abrite une nuée d’oiseaux qui s’envole à notre passage.",
          "Notre bivouac est le même que la veille, un algeco orange à l’équipement sommaire. Il n’est que midi et nous disposons de l’après-midi pour goûter au silence de ce lieu, coupé du monde, sans réseau ni trace humaine. Le point le plus reculé de notre traversée.",
          "Le contour des montagnes s’irrise déjà d’un fin liseré blanc, signe que le lever du jour est proche. De visu, il n’est vraiment pas évident de trouver la clé du labyrinthe causé par les débris morainiques. Ces pierriers erratiques nous imposent des tours et des détours, mais il y a tout juste assez de neige pour garder les skis aux pieds. J’adore ces situations de perpétuels paris sur la suite.",
          "Le bassin glaciaire que nous rejoignons après le passage de la clue est vaste et surmonté d’impressionnants sommets glaciaires, lointains et inaccessibles. C’est incroyable d’immensité et de beauté, et j’immortalise le moment de façon frénétique.",
          "Tout à coup, un écriteau s’affiche sur mon écran : « impossible d’enregistrer le fichier »… Ma carte SD est morte, et il n’y aura aucun moyen de la remplacer avant la station Cosmo, à tout le moins. Un coup au moral.",
        ],
        photos: [photos.j2_dsc01363, photos.j2_dsc01566],
      },
      {
        heading: "La chute",
        paragraphs: [
          "Nous continuons à remonter le glacier sous une chaleur pesante. J’ai envie de rallier un sommet frontalier avec le Kirghizistan, qui nous permettrait ensuite de basculer dans une pente a priori skiable. Mais tout n’est pas aussi simple que sur ma carte et l’arête repérée, d’abord confortable, devient plus effilée et technique. La fatigue du groupe impose de recomposer le plan initial et de traverser à flanc jusqu’au col Ouest dudit sommet.",
          "Nous rejoignons une selle confortable, et, pendant que mes compagnons rechaussent leurs skis, je pars en reconnaissance. Je traverse à flanc dans une neige poudreuse, je suis détendu. Je rejoins une petite arête qui coupe verticalement la pente et marque un changement d’orientation.",
          "Sans me méfier, j’engage le ski amont dans une neige plus dure dont le grip me paraît sûr. Mais mon ski aval ne mord pas lorsque je lui transfère mon poids. Il m’entraîne, comme à la suite d’un pas dans le vide.",
          "Mes skis grattent alors la surface de la neige, découvrant de la glace bleue. Je sens ses petits reliefs sur mon fessier postérieur. Je crie. C’est interminable. Je vois tout et en premier lieu cette pierre saillante vers laquelle je me dirige à pleine vitesse. J’essaie de me freiner par tous les moyens mais évidemment il n’y a rien à faire. Seulement attendre et espérer ne pas taper trop fort.",
          "Dans ma tentative de résistance à la gravité, j’ai commencé à pivoter la tête la première. Entre l’approche de la pierre et mon arrêt, quelques dizaines de mètres plus loin, c’est le trou noir. Je me suis arrêté car la pente devenait plus douce et la neige froide et molle. Je lève la tête vers l’origine de ma chute.",
        ],
        photos: [photos.j3_dsc01634],
      },
      {
        paragraphs: [
          "La pente de glace était en fait très raide. Mais avec le jour blanc, je n’ai rien vu, rien perçu non plus avec mes skis. Rien. Il y a du sang dans la neige, j’essaie d’en comprendre l’origine. Le nez, ça va. Mes lèvres me brûlent. Mais le plus inquiétant, c’est ma cuisse que je sens douloureuse. J’inspecte mon pantalon sans rien voir au premier regard. Mais il est bien déchiré, et l’ouverture correspond à l’angle arrondi de mon DVA. Une perforatrice n’aurait pas été plus précise.",
          "Ma jambe est douloureuse et ma crainte principale concerne le fémur. Si jamais quelque chose était cassé, la situation deviendrait extrêmement tendue. D’une part parce que nous sommes très isolés, loin de tout, et d’autre part car le mauvais temps est en train d’arriver. Je suis agare, incapable d’acter la moindre décision.",
          "Une tête émerge de la crête piégeuse. C’est Thomas, qui m’a entendu crier et qui a compris tout de suite que j’avais chuté. Malgré le coup de l’émotion, je suis préoccupé à présent par la manière dont le groupe pourra me rejoindre en sécurité. Mes compagnons me rejoignent en contournant la pente de glace, crampons aux pieds.",
          "Visiblement, Amélie est sous le choc de ce qui vient de se produire. Le plus dur reste à faire : prendre une décision pour passer cette foutue crête en sécurité. J’ai bien du mal à comprendre la carte, et les images satellites ne m’aident guère davantage.",
          "D’ici, je distingue clairement une pente évidente à remonter, mais qu’est ce que nous allons trouver derrière ? Je sens que je n’ai plus beaucoup d’énergie pour gérer le groupe alors qu’habituellement, de telles situations d’incertitudes me feraient jubiler.",
          "Quelques conversions plus haut, j’atteins le col. Le premier regard sur le versant opposé confirme mes craintes. J’égraine, comme d’habitude, le kaléidoscope des options qui s’offrent à nous pour ensuite opter pour la « moins pire ». Longer la crête vers le sud me semble compliqué à gérer dans ces conditions de fatigue avancée d’une partie de groupe et de ma douleur à la cuisse, toujours vive.",
          "Tout droit en dessous, c’est beaucoup trop raide et escarpé. En revanche, légèrement en contrebas, à droite, une pente de neige semble skiable. « Semble », car entre-temps, la neige s’est mise à tomber et la visibilité s’est considérablement dégradée. Ce que confirment les images aériennes : l’été, il y a là un pierrier. Et conformément aux lois de la gravité, un pierrier n’est jamais très raide.",
          "Je sors la corde pour assurer l’entrée de la pente et les premiers virages confirment mon pari, bingo ! Nous prenons bientôt pied sur l’immense glacier Gorodetsky et je suis à présent très concentré pour trouver la meilleure ligne « gravitaire » dans ce relief particulièrement torturé.",
          "Je compare la carte imprécise aux images aériennes, plus fidèles au terrain et qui permettent notamment de détecter les lits de rivière. La visibilité est nulle et le terrain particulièrement complexe et torturé, mais la cabane est finalement atteinte, avec plus de facilité que ce que je redoutais.",
          "Mon bon Aurélien, fidèle parmi les fidèles, accepte volontiers la corvée consistant à remplir la vache à eau dans le cours d’eau jouxtant la cabane. Mais quand il revient, avec sa mine optimiste qu’il quitte rarement, il accompagne la dépose du bidon avec une sentence dont il garde le secret : « de la belle pisse ! » Effectivement, l’eau est jaunâtre, vaseuse.",
          "Une fois que tout le monde s’est mis au sec, nous nous activons pour nettoyer le bivouac, avec la technique à présent éprouvée : plusieurs sacs de neige sont déversés sur le sol, humide et boueux, puis évacués avec un balai rudimentaire trouvé sur place. Mais l’ambiance reste humide : la grille de ventilation a été bouchée avec un sac en plastique, l’eau suinte sur la vitre et le sol ne sèche pas…",
          "Au lit, il me faut trouver les positions les moins inconfortables, car outre ma cuisse droite, je me rends compte que mon fessier gauche est lui aussi douloureux à la pression.",
        ],
        photos: [photos.j3_dsc01777],
      },
      {
        heading: "Cosmo et fin de la traversée",
        paragraphs: [
          "Cosmo est une station d’observation astronomique perchée à 3300m et possédant deux télescopes Gamma encore en activité, permettant d’analyser les rayons cosmiques. Ce lieu dépend historiquement de l’Institut de physique Lebedev de la faculté des Sciences de Moscou, qui gère également deux autres bases similaires : la station sur le Mont Aragats en Arménie, et une autre située sur le plateau de Fedtchenko dans les montagnes du Pamir, au Tadjikistan.",
          "Ils étaient une soixantaine à travailler ici à l’apogée de l’observatoire, mais ils ne sont tout au plus qu’une quinzaine aujourd’hui.",
          "Nous la rejoignons après une journée de lent glissement hors du monde glaciaire, lorsque l’herbe réapparaît par larges îlots et que le relief semble répondre au cri des lagopèdes. Derrière nous, les glaciers descendus la veille dans le brouillard étirent leur masse pâle, donnant au paysage une profondeur saisissante.",
          "Le brouillard enveloppe des bâtiments hérités de l’ère soviétique, accentuant encore leur caractère délabré. Un homme de bonne corpulence surgit de la brume et vient à notre rencontre. Il nous parle en russe et je lui réponds par un signe illustrant le dodo. « Yann ? » « Da. »",
          "Il nous accompagne dans une contre-allée et nous pénétrons dans un bâtiment d’époque, fermé grâce à une double porte. Le minuscule sas d’entrée accueille nos skis, à côté du coin cuisine. Un raide escalier à pas alternés nous conduit dans une pièce lumineuse, qui donne à son tour accès à deux pièces borgnes avec, dans chacune d’elle, un lit en alcôve. Une table et 4 chaises complètent l’équipement rudimentaire du lieu.",
          "Aux questionnements d’Amélie sur la présence fortement désirée d’une douche (je leur avais vendu un hébergement « confortable »), il répond d’un « niet. » C’est tellement bon de se trouver dans une pièce chauffée que cet hébergement, par contraste, me paraît très confortable. Je me délecte de l’ambiance de ce lieu. J’improvise une douche en suspendant la vache à eau sous l’avant-toit du sas d’entrée. L’eau tiédie sur la gazinière atténue le froid mordant, tandis que quelques flocons s’attardent dans l’air calme.",
        ],
        photos: [photos.j4_p20250423101337],
      },
      {
        paragraphs: [
          "Une visite des lieux s’impose. Je traverse la rue principale et rejoins un grand parking où sont garées quelques voitures. Je ne sais pas vraiment si j’ai le droit d’être là. Je m’approche d’un homme farfouillant dans son coffre. Le prétexte de la carte mémoire me permet de l’aborder. Il m’invite à le suivre. Après avoir gravi un large escalier, nous entrons dans une vaste pièce lambrissée où trône un grand billard. Le plancher, gondolé par endroits, a sans doute pris l’eau.",
          "Nous poursuivons dans un long couloir, dont nous nous échappons par une porte maçonnée pour gagner l’étage. Là-haut, le même couloir, immense, s’étire à nouveau, débouchant sur une petite pièce meublée d’un bureau, d’une table et d’un canapé. Après m’avoir réchauffé au micro-ondes un mug de café soluble, il sort un téléphone à la vitre fissurée, en extrait la carte mémoire et me la tend.",
          "Je lui propose de venir déguster le reste du champagne d’Aurélien à l’apéro. Igor est un retraité actif. Il est ingénieur mécanique et électronique sur les télescopes gamma depuis 1983 et en assure la maintenance en restant ici généralement sur des périodes de 15 jours.",
          "Après le départ d’Igor, Amélie se retire et je sens qu’il se passe quelque chose. Elle a besoin d’être seule, me dit-elle. Au repas, l’ambiance est pesante. Je vois bien que cela ne va pas. Alors j’engage la discussion : « tu es perturbée par rapport au voyage ? ». Sa dernière question à Igor se renseignait sur les manières de descendre de la station de Tian-Shan : 23 km à pied. Cette absence d’alternative lui pesait, même si au fond, Amélie est une battante qui n’a pas l’habitude d’abandonner. Mais elle se sent acculée en ayant la désagréable impression de nous retarder.",
          "Elle a aussi besoin de se projeter sur les étapes restantes. En tant que guide, nous nous concentrons sur les incertitudes liées aux conditions de la montagne, en occultant peut-être parfois les incertitudes de l’humain, qui sont paradoxalement plus faciles à lever, à condition de provoquer de tels moments d’échanges. Une chose est certaine : ce soir, tout le monde se couche le cœur plus léger !",
        ],
        photos: [photos.j4_dsc01923],
      },
      {
        paragraphs: [
          "Le soleil se lève sur Tian-Shan, et sa position dominante développe l’étendue des montagnes d’Ile Alatau. Un pont de neige providentiel nous permet de traverser le torrent pour basculer sur le versant d’en face. L’horizon s’ouvre sur la plaine Kazakh et sa capitale économique, Almaty, d’où nous sommes partis. L’ambiance est plus légère aujourd’hui et la descente, délicieuse.",
          "Au loin, nous apercevons notre petite cabane. Il s’agit d’une petite construction en tôle, avec un toit à deux pans et une petite cheminée. Aurélien blague en se demandant si nous parviendrons à nous allonger. Étonnamment, elle est plutôt moderne dans sa fabrication : plancher au sol, doublage des murs avec un contreplaqué d’aspect bois, fenêtre en double-vitrage. La banquette de lit est calée sous chaque pied mais encore loin d’être plane, et la porte a disparu, substituée par une couverture en laine.",
          "Assis dans nos duvets, nous lisons, écrivons, discutons, et parfois, nous ne faisons rien. Il ne s’agit pas d’attente, puisque attendre signifie qu’il y aurait un terme à atteindre, un aboutissement à quelque chose ou un objectif à remplir. Le bruissement presque imperceptible de la neige qui se dépose délicatement sur le toit en tôle de notre petit abri ajoute au silence une douceur presque irréelle.",
          "Peut-être formulons-nous l’espoir, en chacun de nous, que jamais ce temps volé à nos existences frénétiques ne prenne fin ou ne soit perturbé d’une quelconque entrave. Nous vivons ici notre dernière soirée dans les montagnes kazakhs. Elle est joyeuse, car toutes ces péripéties nous ont souvent fait douter de l’issue du périple. Mais elle est aussi teintée de nostalgie, ces passages de vie étant éphémères, condition de leur existence et incarnation d’une rareté chérie.",
        ],
        photos: [photos.j5_p20250424050153, photos.j5_dsc02110],
      },
      {
        paragraphs: [
          "Demain, nous achèverons notre traversée par un beau sommet dominant l’immense plaine kazakh, à perte de vue, d’où nous pourrons mesurer le chemin parcouru. Puis il y aura la lente descente, au sens propre comme figuré, que je sais longue et incertaine. Nous rencontrerons des kazakhs intrigués de nous voir arriver de montagnes pour eux infréquentables l’hiver. Ils nous offriront un bol de soupe comme marque d’hospitalité à l’étranger. Puis nous irons nous saouler dans les bars d’Almaty pour oublier ce retour brutal à la civilisation moderne.",
          "En tant que guide, j’ai atteint avec cette itinérance à la fois l’incarnation de ce que je veux vivre comme professionnel et une limite de ce que je suis prêt à accepter comme engagement avec des clients. Ce voyage m’a poussé dans mes retranchements et l’accident a probablement fortement teinté ce ressenti. Mais à la fin, quel voyage !",
        ],
        photos: [photos.j6_dsc02166, photos.j6_p20250426122432],
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
