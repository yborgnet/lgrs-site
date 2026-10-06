import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { kosovoPhotos } from "../photos/kosovo-2025";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/kosovo/
 * Récit initialement publié dans Alpine Mag :
 * https://alpinemag.fr/ski-kosovo-albanie-macedoine-nord-traversee-montagnes-sar/
 * (mention reprise en fin de récit, sans le lien cliquable — CarnetStorySection
 * ne supporte pas de liens riches dans ses paragraphes).
 *
 * Une page /portfolio/kosovo/ existe aussi sur WordPress (custom post type
 * "portfolio" du thème) : c'est une simple galerie photo de ce même voyage,
 * pas un second carnet — pas de contenu texte propre à reprendre ici.
 *
 * PHOTOS : passe photo faite à partir des 66 JPEG fournis par Yann (EXIF
 * complets, noms SEO définitifs, localisation croisée GPX), déposés dans
 * public/photos/Kosovo/. Métadonnées (ALT, légende, localisation, certitude
 * GPX) dérivées telles quelles de src/data/photos/kosovo-2025.ts — lui-même
 * généré depuis correspondance-seo-gpx-kosovo-2025.csv (source documentaire
 * de référence). Répartition jour par jour (photos des sections du récit) faite en
 * recoupant l'horodatage EXIF réel (DateTimeOriginal, converti en UTC) avec
 * les bornes temporelles de chaque <trkseg> du GPX original — pas avec la
 * seule colonne "écart_photo_GPX_secondes" du CSV, qui ne donne que le point
 * le plus proche dans le temps, pas la journée. Répartition confirmée nette :
 * 8/11/10/10/11/4/5/2/5 photos sur J1..J9, sans ambiguïté entre deux jours.
 *
 * GPX : trace originale AlpineQuest fournie par Yann (9 <trkseg> natifs, un
 * par jour), archivée telle quelle dans
 * data/gpx-sources/kosovo-montagnes-sar-2025.original.gpx — remplace
 * l'ancien tracé lat/lon minimal (sans altitude ni horodatage) reconstruit
 * depuis la carte interactive WordPress. Distances/D+/D- par jour
 * recalculés depuis cette trace réelle (lissage standard : fenêtre 9,
 * seuil 2 m, voir docs/gpx-methodology.md et scripts/gpx-report-kosovo.ts) —
 * très proches des chiffres publiés par WordPress (écarts de quelques
 * mètres/dizaines de mètres selon les jours), qui utilisait déjà
 * vraisemblablement cette même trace ; le GPX reste la source de vérité
 * désormais. public/gpx/kosovo-montagnes-sar-2025.gpx est la version simplifiée (RDP,
 * epsilon=8 m) servant uniquement à l'affichage carte.
 */

const IMG = "/photos/Kosovo/";

/** ALT = texte_alternatif du CSV, jamais réécrit à la main (voir
 *  src/data/photos/kosovo-2025.ts). Quand certitude_GPX est "faible", la
 *  localisation qu'il contient reste déjà volontairement large — ne jamais
 *  la resserrer ici. */
const photo = (file: string): CarnetPhoto => {
  const meta = kosovoPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

// Sélection éditoriale : les 66 photos fournies sont réparties entre les
// signature/portfolio et le rail jour par jour du récit (story.sections[].photos),
// toutes réutilisées dans le portfolio complet (aucune exclusion, contrairement
// à Géorgie où 19 fichiers sur 71 n'avaient pas été retenus).
const photos = {
  // J1 — Zimur → Maja Grames → Radomirë
  boulanger: photo("kosovo-traversee-ski-monts-sar-boulanger-kosovo-01.jpg"),
  epicier: photo("kosovo-traversee-ski-monts-sar-epicier-kosovo-02.jpg"),
  portageSkis: photo("kosovo-traversee-ski-monts-sar-portage-skis-vers-neige-03.jpg"),
  monteeMerNuages: photo("kosovo-traversee-ski-monts-sar-montee-ski-mer-nuages-04.jpg"),
  groupeMonteeCrete: photo("kosovo-traversee-ski-monts-sar-groupe-montee-crete-05.jpg"),
  skieurCreteAerienne: photo("kosovo-traversee-ski-monts-sar-skieur-crete-aerienne-06.jpg"),
  pausePiqueNique: photo("kosovo-traversee-ski-monts-sar-pause-pique-nique-rochers-07.jpg"),
  villageMontagneCrepuscule: photo("kosovo-traversee-ski-monts-sar-village-montagne-kosovo-08.jpg"),

  // J2 — Radomirë → mont Korab → Radomirë
  petitDejGuesthouse: photo("kosovo-traversee-ski-monts-sar-petit-dejeuner-guesthouse-09.jpg"),
  cirqueNeigeRochers: photo("kosovo-traversee-ski-monts-sar-cirque-neige-rochers-10.jpg"),
  descentePanorama: photo("kosovo-traversee-ski-monts-sar-descente-ski-panorama-11.jpg"),
  groupeSommetSar: photo("kosovo-traversee-ski-monts-sar-groupe-sommet-sar-12.jpg"),
  viragePoudreuseRochers: photo("kosovo-traversee-ski-monts-sar-virage-poudreuse-rochers-13.jpg"),
  skieursAreteRocheuse: photo("kosovo-traversee-ski-monts-sar-skieurs-arete-rocheuse-14.jpg"),
  minaretVallee: photo("kosovo-traversee-ski-monts-sar-minaret-vallee-montagne-15.jpg"),
  retourSkiVillage: photo("kosovo-traversee-ski-monts-sar-retour-ski-village-16.jpg"),
  vieRuraleGrange: photo("kosovo-traversee-ski-monts-sar-vie-rurale-grange-17.jpg"),
  portraitsHabitants: photo("kosovo-traversee-ski-monts-sar-portraits-habitants-kosovo-18.jpg"),
  marcheRueVillage: photo("kosovo-traversee-ski-monts-sar-marche-rue-village-19.jpg"),

  // J3 — Radomirë → Qafa e Korabit → Brod
  rencontreCafeVillage: photo("kosovo-traversee-ski-monts-sar-rencontre-cafe-village-20.jpg"),
  mosqueeNuitDepart: photo("kosovo-traversee-ski-monts-sar-mosquee-nuit-depart-21.jpg"),
  traverseePlateauNeige: photo("kosovo-traversee-ski-monts-sar-traversee-plateau-neige-22.jpg"),
  monteeSolitairePlateau: photo("kosovo-traversee-ski-monts-sar-montee-solitaire-plateau-23.jpg"),
  cabanePlateau: photo("kosovo-traversee-ski-monts-sar-cabane-plateau-sar-24.jpg"),
  panoramaValleeBrume: photo("kosovo-traversee-ski-monts-sar-panorama-vallee-brume-25.jpg"),
  coucherSoleilCrete: photo("kosovo-traversee-ski-monts-sar-coucher-soleil-crete-26.jpg"),
  plateauLumiereSoir: photo("kosovo-traversee-ski-monts-sar-plateau-sar-lumiere-soir-27.jpg"),
  skieurImmensiteSar: photo("kosovo-traversee-ski-monts-sar-skieur-immensite-sar-28.jpg"),
  epicerieVillageSoir: photo("kosovo-traversee-ski-monts-sar-epicerie-village-soir-29.jpg"),

  // J4 — Brod → Kleç → Zallinë → Bozovce
  toastGuesthouse: photo("kosovo-traversee-ski-monts-sar-toast-guesthouse-kosovo-30.jpg"),
  repasGroupeGuesthouse: photo("kosovo-traversee-ski-monts-sar-repas-groupe-guesthouse-31.jpg"),
  petitDejLocal: photo("kosovo-traversee-ski-monts-sar-petit-dejeuner-local-32.jpg"),
  preparationEtape: photo("kosovo-traversee-ski-monts-sar-preparation-etape-carte-33.jpg"),
  burekVillage: photo("kosovo-traversee-ski-monts-sar-burek-village-kosovo-34.jpg"),
  rencontreHabitantsInterieur: photo("kosovo-traversee-ski-monts-sar-rencontre-habitants-interieur-35.jpg"),
  rueMosqueeVillage: photo("kosovo-traversee-ski-monts-sar-rue-mosquee-village-36.jpg"),
  groupeTraverseePlateau: photo("kosovo-traversee-ski-monts-sar-groupe-traversee-plateau-37.jpg"),
  skieurSommetRocheux: photo("kosovo-traversee-ski-monts-sar-skieur-sommet-rocheux-38.jpg"),
  descenteVersVallee: photo("kosovo-traversee-ski-monts-sar-descente-vers-vallee-39.jpg"),

  // J5 — Bozovce → Vërtop → Lubinje e Poshtme
  villageMatinal: photo("kosovo-traversee-ski-monts-sar-village-matinal-kosovo-40.jpg"),
  interieurMaisonVillage: photo("kosovo-traversee-ski-monts-sar-interieur-maison-village-41.jpg"),
  trajetVehicule: photo("kosovo-traversee-ski-monts-sar-trajet-vehicule-montagne-42.jpg"),
  minaretFenetre: photo("kosovo-traversee-ski-monts-sar-minaret-fenetre-43.jpg"),
  skieurCreteNuages: photo("kosovo-traversee-ski-monts-sar-skieur-crete-nuages-44.jpg"),
  groupeCreteTempete: photo("kosovo-traversee-ski-monts-sar-groupe-crete-tempete-45.jpg"),
  skiCouloirNeige: photo("kosovo-traversee-ski-monts-sar-ski-couloir-neige-46.jpg"),
  viragePenteLarge: photo("kosovo-traversee-ski-monts-sar-virage-pente-large-47.jpg"),
  skieurPenteVallee: photo("kosovo-traversee-ski-monts-sar-skieur-pente-vallee-48.jpg"),
  descentePoudreuseSar: photo("kosovo-traversee-ski-monts-sar-descente-poudreuse-sar-49.jpg"),
  travauxJardinVillage: photo("kosovo-traversee-ski-monts-sar-travaux-jardin-village-50.jpg"),

  // J6 — Lubinje e Poshtme → Prevallë
  cuisineChezHabitants: photo("kosovo-traversee-ski-monts-sar-cuisine-chez-habitants-51.jpg"),
  repasFamille: photo("kosovo-traversee-ski-monts-sar-repas-famille-kosovo-52.jpg"),
  portraitHote: photo("kosovo-traversee-ski-monts-sar-portrait-hote-kosovo-53.jpg"),
  skieurAvecChiens: photo("kosovo-traversee-ski-monts-sar-skieur-avec-chiens-54.jpg"),

  // J7 — Prevallë → Bistër → Brezovicë
  interieurBoisGuesthouse: photo("kosovo-traversee-ski-monts-sar-interieur-bois-guesthouse-55.jpg"),
  groupeMonteeForet: photo("kosovo-traversee-ski-monts-sar-groupe-montee-foret-56.jpg"),
  monteeSkiAvecChien: photo("kosovo-traversee-ski-monts-sar-montee-ski-avec-chien-57.jpg"),
  groupeVallonAvecChiens: photo("kosovo-traversee-ski-monts-sar-groupe-vallon-avec-chiens-58.jpg"),
  groupeColPanorama: photo("kosovo-traversee-ski-monts-sar-groupe-col-panorama-59.jpg"),

  // J8 — Brezovicë → Kyne → refuge Ljuboten
  skieursPenteAerienne: photo("kosovo-traversee-ski-monts-sar-skieurs-pente-aerienne-60.jpg"),
  guesthousePierreBois: photo("kosovo-traversee-ski-monts-sar-guesthouse-pierre-bois-61.jpg"),

  // J9 — Refuge Ljuboten → Maja e Lubotenit → vallée
  repasConvivial: photo("kosovo-traversee-ski-monts-sar-repas-convivial-kosovo-62.jpg"),
  skieurCouloirRocheux: photo("kosovo-traversee-ski-monts-sar-skieur-couloir-rocheux-63.jpg"),
  groupeBrouillardCrete: photo("kosovo-traversee-ski-monts-sar-groupe-brouillard-crete-64.jpg"),
  groupeSommetNuages: photo("kosovo-traversee-ski-monts-sar-groupe-sommet-nuages-65.jpg"),
  descenteSkiNuages: photo("kosovo-traversee-ski-monts-sar-descente-ski-nuages-66.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "9 jours. Trois pays. Une traversée des montagnes de Šar.",
  intro:
    "De Zimur à l'extrémité orientale du massif, une ligne continue entre Albanie, Kosovo et Macédoine du Nord, de villages en crêtes frontalières.",
  days: [
    {
      dayNum: "J1",
      title: "Zimur → Maja Grames → Radomirë",
      text: "Première mise en jambes par le Maja Grames (2 344 m), puis descente vers Radomirë.",
      distanceKm: 21.1,
      ascentM: 1400,
      descentM: 1490,
      elevationMin: 1240,
      elevationMax: 2350,
    },
    {
      dayNum: "J2",
      title: "Radomirë → mont Korab → Radomirë",
      text: "Ascension du mont Korab (2 764 m), point culminant du massif, puis retour à Radomirë.",
      distanceKm: 20.1,
      ascentM: 1580,
      descentM: 1580,
      elevationMin: 1240,
      elevationMax: 2760,
    },
    {
      dayNum: "J3",
      title: "Radomirë → Qafa e Korabit → Brod",
      text: "La grande étape du raid : plateau frontalier, passage par Arxhena et arrivée à Brod.",
      distanceKm: 37.3,
      ascentM: 2020,
      descentM: 1900,
      elevationMin: 1250,
      elevationMax: 2240,
    },
    {
      dayNum: "J4",
      title: "Brod → Kleç → Zallinë → Bozovce",
      text: "Traversée des sommets du Kleç (2 414 m) et du Zallinë (2 494 m), puis descente vers Bozovce.",
      distanceKm: 20.6,
      ascentM: 1560,
      descentM: 1650,
      elevationMin: 1300,
      elevationMax: 2530,
    },
    {
      dayNum: "J5",
      title: "Bozovce → Vërtop → Lubinje e Poshtme",
      text: "Longue traversée jusqu'au Vërtop (2 555 m), puis descente vers Lubinje e Poshtme.",
      distanceKm: 17.1,
      ascentM: 1510,
      descentM: 1720,
      elevationMin: 920,
      elevationMax: 2570,
    },
    {
      dayNum: "J6",
      title: "Lubinje e Poshtme → Prevallë",
      text: "Remontée des forêts de hêtres, passage sur la crête frontalière et arrivée à Prevallë.",
      distanceKm: 16.6,
      ascentM: 1650,
      descentM: 1200,
      elevationMin: 1100,
      elevationMax: 2500,
    },
    {
      dayNum: "J7",
      title: "Prevallë → Bistër → Brezovicë",
      text: "Passage au Bistër (2 651 m) puis longue descente vers la station de Brezovicë.",
      distanceKm: 16.1,
      ascentM: 1640,
      descentM: 1490,
      elevationMin: 1550,
      elevationMax: 2670,
    },
    {
      dayNum: "J8",
      title: "Brezovicë → Kyne → refuge Ljuboten",
      text: "Retour sur la crête, sommet du Kyne (2 324 m), puis traversée jusqu'au refuge Ljuboten.",
      distanceKm: 13.9,
      ascentM: 1460,
      descentM: 1540,
      elevationMin: 1550,
      elevationMax: 2480,
    },
    {
      dayNum: "J9",
      title: "Refuge Ljuboten → Maja e Lubotenit → vallée",
      text: "Dernier sommet au Maja e Lubotenit (2 498 m), puis descente vers la vallée avant le transfert à Pristina.",
      distanceKm: 12.7,
      ascentM: 960,
      descentM: 1490,
      elevationMin: 1100,
      elevationMax: 2510,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données GPX réelles, voir
// scripts/gpx-report-kosovo.ts) — jamais recopiés en dur, voir totals.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Février 2025"; // "11 jours, dont 9 jours de ski, février 2025" (WordPress)

export const kosovo: Carnet = {
  slug: "kosovo",
  seo: {
    title: "Kosovo à ski : traversée des montagnes de Šar",
    description:
      "Neuf jours de traversée à ski dans les montagnes de Šar, entre Albanie, Kosovo et Macédoine du Nord, de village en village.",
    ogImage: photos.skieurImmensiteSar.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "KOSOVO",
    subtitle: "Une traversée des montagnes de Šar",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.skieurImmensiteSar,
  intro: {
    heading: "Entre Albanie, Macédoine du Nord et Kosovo",
    paragraphs: [
      "La traversée des montagnes de Šar est née d'un désir ancien : aller skier dans un pays chargé, pour moi, d'une histoire familiale et politique. Le Kosovo, je le connaissais à travers le récit de mon père, engagé dans l'humanitaire à la fin des années 1990. Ce voyage, je l'ai écrit comme j'aurais aimé le lui raconter.",
      "Neuf jours de ski au long cours, de village en village, entre Albanie, Kosovo et Macédoine. Ici, la question n'est pas tant le sommet que la possibilité d'avancer chaque jour, de trouver un passage, un toit, un café. Une traversée faite d'ajustements constants et de rencontres, où la ligne se trace autant sur le terrain que dans les relations humaines.",
    ],
    photo: { ...photos.minaretVallee, position: "35% center" },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Albanie, Kosovo & Macédoine du Nord" },
      { label: "Massif", value: "Montagnes de Šar" },
      { label: "Départ", value: "Zimur" },
      { label: "Arrivée", value: "Vallée sous le Luboten" },
      { label: "Forme du raid", value: "Traversée de massif" },
      { label: "Hébergements", value: "Guest-houses, refuges" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Zimur → vallée sous le Luboten",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/kosovo-montagnes-sar-2025.gpx",
    // Positions = premier/dernier point de chaque segment du GPX (fins d'étape), noms repris des titres de journée.
    markers: [
      { name: "Zimur", lat: 41.720756, lon: 20.447336, direction: "left" },
      { name: "Radomirë", lat: 41.814502, lon: 20.488102, direction: "left" },
      { name: "Brod", lat: 41.991219, lon: 20.705443, direction: "left" },
      { name: "Bozovce", lat: 42.054674, lon: 20.827850 },
      { name: "Lubinje e Poshtme", lat: 42.128909, lon: 20.869701, direction: "left" },
      { name: "Prevallë", lat: 42.171237, lon: 20.963576, direction: "left" },
      { name: "Brezovicë", lat: 42.182718, lon: 21.034197, direction: "top" },
      { name: "Refuge Ljuboten", lat: 42.184625, lon: 21.127322 },
    ],
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        paragraphs: [
          "L'énonciation du nom d'un pays résonne souvent avec des idées, parfois préconçues, ou des souvenirs. Le Kosovo, ce sont les kosovars, parfois usités dans des expressions qui louent leur pugnacité. Mais pour moi, le Kosovo, c'est surtout un pays où mon père est parti en mission humanitaire, au tournant des années 2000, pour le compte de MSF. Au retour d'un voyage en Géorgie, en avril dernier, je lui avais partagé mon souhait d'aller skier dans ce pays des Balkans. Il était resté taiseux sur le sujet, et j'ai alors compris que la guerre du Kosovo et son déplacement là-bas l'avaient marqué, pour les atrocités qu'il y a vu. Depuis, mon père a quitté cette terre, et derrière la cruelle frustration de ne pouvoir lui raconter mon histoire avec le Kosovo, j'ai décidé de l'écrire.",
          "Le Kosovo, dans l'expérience que j'en avais au travers de mon père, c'était donc une guerre. Une guerre récente, aux portes de l'Europe qui se déroula en 1998-1999. Une guerre sanguinaire, aux traits génocidaires, sous couvert de tensions ethniques entre albanais et serbes et d'enjeux territoriaux. À l'époque, la Serbie de Slobodan Milošević voulait récupérer le contrôle du Kosovo, qui était une province autonome de la Serbie dans l'ex-Yougoslavie. La guerre opposa donc l'armée du régime serbe et l'Armée de libération du Kosovo (UCK), bientôt épaulée par les forces de l'OTAN, via la KFOR. Le Kosovo est ensuite passé sous administration onusienne, avant de déclarer son indépendance en 2008. Une indépendance qui n'est pas unanimement reconnue, y compris par certains pays de l'UE.",
          "Le Kosovo n'est a priori pas une destination de ski. L'idée de partir là-bas m'a été donnée par Jean Annequin, il y a cinq ans. Au sortir du confinement, il avait encadré une formation pour l'organisation de voyages et revenait enchanté de l'aventure vécue là-bas. Essuyant de mauvaises conditions météo, ils n'avaient pas pu skier exactement la ligne projetée, soit la traversée de Radomirë, en Albanie, jusqu'à l'extrémité Est de la chaîne, entre Kosovo et Macédoine. M'inspirant de leur parcours, j'ai passé des heures sur les cartes pour trouver une ligne qui traverse l'intégralité du massif à ski, avec l'envie de visiter des villages des trois pays frontaliers : l'Albanie à l'ouest, la Macédoine du nord au sud et le Kosovo au nord. J'ai hésité pour savoir dans quel sens effectuer ce raid, et il m'est apparu plus opportun de viser des descentes au nord et de réaliser les grosses étapes obligatoires au début. De partir d'Albanie pour rejoindre le Kosovo et la Macédoine au bout du troisième jour. Cette traversée des montagnes de Sharr a été un voyage au long cours. Neuf jours de ski, de villages en villages, avec des dénivelés conséquents et parfois de longues distances à couvrir.",
        ],
      },
      {
        heading: "La partie albanaise, de Peshkopi à Brod.",
        paragraphs: [
          "Après deux bonnes heures de bus depuis Tirana, le froid nous cueille à la sortie du bus. Peshkopi est déjà fort animé. À peine descendus, plusieurs chauffeurs de taxi viennent nous proposer leur service, mais notre priorité est davantage portée sur le café et un lieu chauffé. Il n'y a qu'à traverser la rue, comme dirait l'autre, pour trouver… un café. Nous pénétrons dans une double salle, presque vide. Seul un groupe d'anciens est attablé à une table, et fume. Ça nous paraît d'un autre temps de fumer ainsi librement dans ces lieux. Les cafés, très serrés, tout comme les chocolats, « denso », sont comme ceux que l'on boit en Italie. Un dernier tronçon en taxi, et nous arrivons au départ de notre traversée. Zimur, une mosquée, trois maisons et un ancien, qui se tient à distance et nous dévisage d'un air suspect. Ou peut être interrogatif. Nous remontons une croupe qui surplombe de vastes plaines, et le contraste de couleur est frappant. La brume monte jusqu'à nous, et avec elle les émanations de fumée des feux de bois qui, partout dans les vallées ici, chauffent les maisons. C'est étrange de sentir ces odeurs si haut. La descente du Maja Grames (2344m), premier sommet de la traversée, consiste en une longue traversée. Il est midi passé mais la neige n'a pas ramolli. Cela nous facilite grandement l'opération, et nous gagnons ainsi du temps et de l'énergie. Après avoir franchi un petit col, une seconde longue traversée nous permet de rejoindre les hauteurs du village de Radomirë, halte pour les deux prochaines nuits. À peine nous commençons à voir le village et son imposante mosquée que le muezzin se met à chanter. Quel dépaysement ! Nous arrivons à l'hôtel Radomira et pénétrons dans une vaste salle de bar où trône un poêle de conception artisanale. Un cylindre où sont soudés 4 pieds, un fond et un couvercle, un trou pour l'évacuation des fumées par un tube coudé, qui traverse la moitié de la pièce et paraît presque descendre. Et pourtant, il tire sacrément bien ce poêle. Il chauffe à lui seul l'ensemble de la pièce, malgré les fenêtres constamment ouvertes pour évacuer les fumées de cigarette.",
        ],
        photos: [photos.groupeMonteeCrete, photos.skieurCreteAerienne],
      },
      {
        paragraphs: [
          "Nous ne sommes pas seuls dans la montée vers le point culminant du Kosovo. Un jeune français, en jean-basket, a décidé de monter sur le Korab coûte que coûte. Malgré le partage de nos doutes, nous le retrouverons au sommet et, bien plus tard, à l'hôtel. Deux jours durant, le mont Korab se joue de nous, car nous ne parvenons pas vraiment à identifier précisément sa cime parmi les sommets qui nous entourent. Du sommet se déploie une immense étendue relativement plate. Celle-là même que nous devrons traverser le lendemain, la journée clé de cette traversée. Nous optons pour une descente sur l'autre versant, nous permettant de laisser les skis à la limite de la neige pour faciliter le début de l'étape du lendemain. De retour au village, nous croisons deux anciens, qui nous proposent une cigarette, comme une invitation à discuter. Tout le monde refuse, et par politesse ou bien pour accepter l'invitation, j'en prends une dans le paquet, que je crapoterai. L'échange est avant tout gestuel. Ce soir, nous prenons le temps de discuter avec notre hôte, Billy. À 15 ans, sa famille l'a envoyé vivre en Angleterre, où il a fait le menuisier pendant 8 ans. Il est rentré l'année passée, pour travailler dans l'hôtel familial, qu'il rénove en partie pour agrandir les chambres existantes. À présent, il travaille ici, dans cette salle de bar où les hommes se retrouvent, pour fumer et jouer aux cartes.",
        ],
        photos: [photos.groupeSommetSar, photos.viragePoudreuseRochers],
      },
      {
        paragraphs: [
          "C'est le jour J. La grosse étape du raid, non pas seulement pour les 2000m de dénivelé, mais surtout pour la distance à couvrir, près de 40km. À 5h, lorsque nous débarquons dans la salle du bar, Billy et son père s'affairent déjà. Deux tasses de café vides témoignent d'un moment de partage avant de commencer la journée de travail. La porte de la cuisine est entrouverte, et l'on voit un instant une femme s'activer en coulisse, avant que le père ne referme la porte... Le premier col est un bon aperçu, tout comme l'interminable traversée pseudo descendante, où l'objectif est de gratter un maximum de dénivelé. En bas de la descente, un ancien algeco marquant la frontière entre le Kosovo et la Macédoine marque pour nous le début de la plus longue montée du jour : une petite dizaine de kilomètres, presque plats. La dernière montée s'effectue aux lumières du soir. Au sommet, nous voyons au loin le mont Korab, et ce vaste plateau qui nous sépare et que nous avons traversé au prix de longues heures. Ce petit massif déploie ici toute son immensité. C'est grandiose. Nous rejoignons rapidement le sommet de la station d'Arxhena. Les pistes sont bétons, et visiblement la dameuse ne passera pas ce soir… Brod est notre première étape kosovars. Lorsque nous pénétrons dans le « restaurant », un bar servant de la petite restauration, une vingtaine de regards se pointent vers nous, probablement que ces regards ne sont pas menaçants, mais ils sont pesants et je n'ose, inconsciemment, les croiser, préférant fuir vers la salle du premier étage où le patron nous entraîne. Nous commandons des « Peja » et sept « burgers ». Les assiettes que l'on nous sert sont composées d'un steak haché fourré de fromage, sorte de burger à l'envers, le tout garni de quelques tranches de légumes. Arrive ensuite une assiette de pain grillé. Nous fêtons cette première journée avec une bouteille de champagne d'Aurélien Lurquin, le vigneron du groupe. Un Chardonnay 2020, parcelle les Traverses, qui nous met bien, tout en éveillant subtilement nos papilles. Probablement plus que le plat unique du soir, qui a néanmoins le mérite de remplir nos panses…",
        ],
        photos: [photos.traverseePlateauNeige, photos.plateauLumiereSoir],
      },
      {
        heading: "Brod - Lubinje e Posthme : à saute-mouton sur la frontière entre Macédoine et Kosovo",
        paragraphs: [
          "Ce matin, la pleine lune m'a tiré du lit tôt. J'étais déjà devant la mosquée lorsque le chant enivrant du muezzin était craché par des haut-parleurs au son saturé. En quête d'un café ouvert, avec le prétexte de visiter le village. Ce matin, une mission m'attend, rapidement transformée en traquenard, que je définis comme dépossession de la maîtrise de son temps par un local. Le début, c'est donc l'attente dans le magasin de notre hôte, le « mini-market pizza » de Brod, puis l'arrivée d'un vieux combi VW, qu'il interpelle. C'est le taxi, me dit-il. Nous prenons place, et, au bout de 200m, le chauffeur s'arrête dans une rue en nous proposant un « café », seul mot universel que nous comprenons, quelque soit la langue. Nous montons à l'étage d'un lieu que nous n'aurions jamais désigné comme tel, et le patron nous propose d'emblée un « macchiato ». Ici aussi, l'influence italienne est importante, visiblement. Le chauffeur du taxi, Bilgaip, allume sa cigarette avec son café. Puis une autre. Puis une autre. Et le temps file, je me demande si il a encore conscience que nous avons convenu d'un aller-retour à Dragash. Je décide donc de conserver quelques interstices dans ce temps pour lequel j'ai perdu la maîtrise, et je me dirige vers l'enseigne « Burek » où un homme s'affaire à fabriquer une sorte de pâte feuilletée au fromage, la faisant tournoyer en l'air pour l'étirer, avec une dextérité impressionnante. Quand je reviens au café après avoir donné rendez-vous à tout le groupe, c'est a priori le moment de partir. Le temps du trajet, soit une dizaine de kilomètres, trois cigarettes ont été fumées par notre chauffeur, fenêtre fermée et seulement ouverte pour évacuer les mégots. Dragash est une ville sans âme, mais avec l'agitation de la ville et ses commodités, dont un supermarché et un distributeur. Ce sont des euros que je retire, bien que le Kosovo ne soit ni membre de l'UE, ni par conséquent de la zone euro. Après la guerre, le dinar yougoslave a été un temps remplacé par le mark allemand, puis par l'euro en 2002, qui est devenu la monnaie principale sans accord officiel avec la BCE. Le Kosovo utilise donc l'euro de façon unilatérale, sans pour autant pouvoir l'émettre. Commence alors une longue attente. Je ne maîtrise plus rien. Bilgaip me dit qu'il attend deux personnes, mais je n'arrive pas à savoir si ce sont des personnes qu'il attend réellement, ou si c'est pour remplir son taxi. Il attend ainsi dans la rue, se baladant d'un magasin à un autre, sans pour autant afficher qu'il est chauffeur de taxi et qu'il monte à Brod. Lorsque l'attente devient pesante, nous décidons de reprendre le cours de notre temps et poussons la porte du café d'en face. L'atmosphère y est suffocante, tant les gens fument dans cet espace clos et sans aération. Nous commandons 3 cafés, en signifiant au serveur que nous les boirons en terrasse. Au moment où les cafés nous sont servis, il semble que notre chauffeur est finalement disposé à partir. Vite avalés, nous remontons dans le vieux combi, qui s'arrête quelques centaines de mètres plus loin, pour je ne sais quel motif. Bilgaip sort et entre dans une boutique, revenant chargé d'une caisse de bouteilles. Nous reprenons une nouvelle fois la route, et nouvel arrêt. Celui-là durera tant que je ne signifierai pas explicitement que nous devons vraiment remonter à Brod. Il est déjà 10h, et une longue journée de ski nous attend.",
          "Nous partons à pied dans une vallée encaissée, où le sentier vient rapidement mourir en de nombreuses sentes de troupeaux intermittentes, exploitant les deux versants. Nous jouons à saute-mouton au-dessus de la rivière, nous jouant des carapaces gelées des pierres émergeant du cours d'eau. Au loin, la vallée tourne, et j'espère trouver derrière l'enneigement continu. Du Kleç (2414m), nous descendons sur quelques centaines de mètres côté Macédoine, avant de monter au Zallinë (2494m) par une pente indiquée à moins de 30° sur ma carte, mais qui, en réalité, est bien plus raide. Reste à optimiser la neige pour la descente. Je vise un sentier bien plus à l'est, et la descente consiste, comme souvent depuis le début de ce périple, à traverser à flanc. Je suis content de mon parcours, de langues de neige en langues de neige, ce qui devient au passage un jeu assez grisant, jusqu'à ce qu'elles ne deviennent trop éparses. On n'arrête plus Pascal, qui file droit dans la pente, en chaussures de ski. Nous sortons bientôt les frontales, et évoluons dans des champs de fougères séchées et couchées par la neige, louvoyant entre les buissons de gratte-cul. Bientôt, nous rejoignons un sentier de bovins non indiqué sur la carte, qui nous amène au village. L'appartement dans lequel nous pénétrons est glacial, tout comme la douche. J'ai besoin d'un temps de décompression, d'un apéro pour apprécier la journée que l'on vient de vivre. Cette montée bucolique au bord de la rivière, ces lumières du couchant, qui semblent ici durer une éternité, l'arrivée au-dessus du village de Bozovce, qui est apparu subrepticement au détour d'un virage. J'ai besoin de profiter, sans rien faire, que de siroter mon coca. Pas de bière ce soir, pour le malheur d'Aurélien, le vigneron du groupe qui ne semble pas coutumier de la chose. Le repas est léger au regard des efforts consentis dans la journée, et c'est la panse pas complètement tendue que nous allons nous coucher, manquant de féculent ou d'une bonne dose de protéines ! Des matelas par terre, un canapé convertible au confort sommaire et un petit chauffage radiant qui a bien du mal à chauffer convenablement la pièce. Cette première soirée en Macédoine est plus rustique que les nuits précédentes…",
        ],
        photos: [photos.burekVillage, photos.groupeTraverseePlateau],
      },
      {
        paragraphs: [
          "Ce matin, nous sommes réveillés par l'appel du muezzin de 5h53. J'enlève mes boules quies pour mieux apprécier ce chant qui me rappelle ce voyage en Afrique avec mon père, pour descendre une Peugeot 504 en Mauritanie, alors j'avais une dizaine d'années. Le village de Bozovce semble plus pauvre que Brod, où nous étions la veille. Si les rues principales sont pavées, de nombreux chemins sont encore en terre, et nombre de maisons sont en ruine ou abandonnées. Ici, les murs en pierre des maisons sont bâtis avec des travées en bois horizontales, placées régulièrement.",
          "Lorsque nous pénétrons dans la pénombre de la pièce, la fumée de cigarette est suffocante. Nous sommes dans le seul café de Bozovce, où une dizaine d'hommes répartis sur plusieurs tables boivent des cafés et fument des cigarettes. Les tables sont disposées sur les côtés, et nous avons l'impression de pénétrer au milieu d'une assemblée, où le temps semble suspendu. Il s'étire et comble l'inactivité du quotidien. Notre présence ici, en plein hiver, est inhabituelle, nous le ressentons. L'un d'eux parle bien italien, et j'engage la conversation. Il a travaillé pendant 11 ans comme maçon en Italie avant de revenir ici, au village, pour y faire des petits boulots. Mais il passe le plus clair de son temps ici, au café. Je lui en propose un, et comme c'est délicat de ne pas en proposer aux autres, j'offre le café à tout le monde. Le barman, qui semble connaître les habitudes de chacun de ses clients, sert à qui veut un expresso sucré ou un café au lait. Pour nous, ils ouvrent la porte du café, laissant échapper les émanations de fumée de cigarette, ainsi que la chaleur que dégage le poêle qui trône au milieu de la pièce. Mais aussitôt que nous partons, la porte se referme derrière nous. Et dans ce huis-clos, ces hommes continuent de fumer, pour apprécier le temps qui passe. Nous voilà repartis à pied, sur un sentier qui n'est pas indiqué sur la carte mais que j'ai trouvé en scrutant les images aériennes. Ce matin, malgré le versant méridional, la neige n'est pas loin, et l'enneigement continu est atteint en une vingtaine de minutes. Nous remontons un plateau, croisons de vieilles traces de skieurs, puis une pente qui devrait être en dessous des 30° sur la carte, mais qui est en réalité bien plus raide. Je suis heureux que le manteau neigeux soit aussi figé, car ce ne serait pas la même aventure si la nivologie s'avérait instable… Arrivés à la crête, nous la longeons sur son versant sud, jusqu'à rallier le sommet du Vërtop (2555m). Pour la première fois depuis le début du raid, la pente que j'avais initialement projetée me laisse dubitatif. Je m'engage tout de même, pour apprécier la composition du manteau neigeux : il y a une plaque d'une trentaine de centimètres, plutôt compacte, et en dessous une couche bien plus meuble. La large pente et cette configuration me font renoncer pour une autre pente moins soutenue, depuis le col. La neige n'est pas si mauvaise. De la poudreuse tassée, parfois soufflée et irrégulière. Mais au vu de la qualité de la neige que nous skions depuis le début, on s'en contente ! Par une grande traversée, nous rejoignons la pente initiale. L'ampleur de ce versant, et sa raideur me donnent des frissons, mais je bénis cette nivologie très stable. Le premier couloir que je surplombe est ravagé par une vieille avalanche de neige humide. Le second, que j'avais projeté de descendre, est lisse dans sa première partie, mais devient rapidement inskiable. Il nous faut prendre la tangente, dans une forêt de hêtres très dense, où Aurélien tente et échoue dans un numéro d'équilibriste dont lui seul a le don, terminant perché dans un arbre.",
          "Lubinje e Poshtme est étonnante. Il n'y a presque que des maisons neuves ou en cours de construction. Mais notre hébergement est excentré de la ville et il nous faut remonter une bonne centaine de mètres de dénivelé. Il s'agit d'une maison isolée dans la montagne, et le tenancier nous accueille chaleureusement, m'interpellant à notre arrivée : « Yann ». Il s'agit d'un couple d'anciens, dont le fils est exilé à Genève. Ils tiennent ici un restaurant de poisson, lié à un élevage de truites km0. Nous sommes affamés, et la manière dont nous nous installons tous à table l'exprime explicitement. Il n'est que 17h, mais nous attaquons donc un repas, sans savoir s'il s'agit du déjeuner retardé ou du dîner anticipé. Après des plats de crudités, arrivent 7 truites grillées. Si bien que la peau du ventre est bien tendue en sortant de table, mais il n'est que 18h, et à 20h, nous sommes déjà revenus au même point : presque affamés ! Mais nos hôtes sont redescendus au village, et nous n'avons, pour nous sustenter, qu'une caisse de bières…",
        ],
        photos: [photos.skieurCreteNuages, photos.skiCouloirNeige],
      },
      {
        heading: "Lubinje e Posthme -",
        paragraphs: [
          "Notre hôte est au petit soin, s'enquérant souvent sur la qualité du petit déjeuner qu'il nous propose : les poivrons marinés et la confiture maison sont de vraies pépites. Ses beaux yeux bleus et son regard amical le rendent attachant. Il nous sort une carte, plutôt approximative, des montagnes de Sharr pour comprendre notre parcours du jour, m'écrivant grâce à une application de traduction, qu'il lui paraît « ardu ».",
          "Nous partons, comme à l'accoutumée, à pied et chargés des skis, dans une magnifique forêt de hêtres. Nous chaussons comme d'habitude autour de 1400m, puis nous rejoignons la crête frontalière, progressivement prise dans le brouillard. Changement de plan : rien ne sert de suivre l'arête la tête dans le guidon avec cette visibilité, nous prenons donc la tangente, pour rejoindre le col plutôt que le sommet. Mis à part la piètre visibilité, la neige n'est pas pire, voire presque bonne en comparaison des jours précédents. À vue et à la carte, je ne m'en tire pas trop mal, notamment en optant pour le bon couloir. C'est grisant de faire ainsi des paris, et de voir qu'ils s'avèrent bons. Pour la première fois depuis le début du séjour, nous arrivons à l'hôtel skis aux pieds. Le col de Prevallë est un lieu atypique. Il ne s'agit pas d'une station de ski, mais il en a tous les traits, composé essentiellement d'hôtels, de restaurants et de villas à louer. On est loin du petit village de Bozovce que nous avons quitté ce matin. En revanche, l'hôtel Krojet dans lequel nous dormons ce soir est clairement au-dessus du lot en termes de standing au regard des hébergements visités jusqu'alors. Une grande salle de réception est chauffée par deux poêles à bois, dont l'un est entouré de fauteuils qui inspirent au farniente. Le bois y règne en maître, sublimant le côté chaleureux. Au bar s'affairent plusieurs serveurs, qui différencient bizarrement les « cappuccino » des « macchiato ». Les deux tasses sont égales, mais sur la mousse de lait du premier est dessinée une fleur avec une crème au chocolat trop sucrée. Alors que le macchiato ressemble à un cappuccino italien bien fait, avec la fleur dessinée dans la mousse de lait. Outre cette subtilité kosovare, les plats sont ici essentiellement composés de viande, et les desserts n'existent pas. Les chocolats chauds, épais comme en Italie, se sont révélés être le meilleur compromis pour terminer le repas sur une touche sucrée.",
        ],
        photos: [photos.repasFamille, photos.skieurAvecChiens],
      },
      {
        paragraphs: [
          "Je n'ai pas réussi à négocier un petit déjeuner avant 8h, mais en revanche, à 8h pétante, la table se remplissait de plusieurs plateaux de mets, comme des poivrons marinés, du kiri, des œufs pochés à l'huile, ou d'autre forme de fromage à tartiner, le tout accompagné de beignets huileux. Ce matin, une petite dizaine de chiens nous accompagne et quatre d'entre eux, plus téméraires, nous accompagneront toute la journée. Le ciel se bouche à mesure que nous montons, si bien que nous nous retrouvons à nouveau dans les nuages au sommet du Bister (2651m). La petite couche de neige tombée entre hier et cette nuit est irrégulière à cause du vent, et nécessite un ski prudent. Mais plus nous descendons, et plus la fine couche de poudreuse devient homogène et plaisante à skier, si bien que l'on finit par skier la meilleure neige du séjour, notre curseur étant descendu bien bas. Nous entrons dans une forêt de pins éparse, qui marque un changement brutal de végétation. Ces forêts semblent plus skiantes que les forêts de hêtres, parfois très denses. Cela change également l'ambiance du ski, car si les hêtres sont très hauts, les pins sont presque à hauteur d'homme, ouvrant le paysage. Après une longue traversée à flanc, nous remontons une raide épaule qui nous permet de basculer sur la station de Brezovicë.",
          "Brezovicë est une station de ski d'un autre temps. Les premières remontées mécaniques ont été installées à l'orée des années 1980, et elle a alors été identifiée comme un site alternatif pour les épreuves de ski des Jeux Olympiques d'hiver de Sarajevo 1984. Depuis la guerre du Kosovo en 1998-1999, elle n'a reçu aucun investissement pour son entretien ou sa modernisation, jusqu'à l'arrivée providentielle du groupe français « Compagnie des Alpes » en 2014, qui avait prévu d'investir plus de 400 millions d'euros. Ce plan de modernisation n'a finalement pas vu le jour, et la station est restée en l'état. Nous arrivons au niveau du parking, et d'un tas impressionnant d'immondices. Une décharge à ciel ouvert qui ne dit pas son nom. Cela donne le ton de notre expérience dans cette station. Nous remontons à pied en direction des remontées mécaniques et de notre hôtel. Un vieux bâtiment, dont la gestion a été reprise l'hiver précédent. Mis à part un coup de peinture blanche mal fait et le changement du mobilier, le bâtiment n'a pas dû recevoir de rénovation d'ampleur depuis des décennies. Tout comme l'immense hôtel qui nous surplombe, construit sur le front de neige, dans une disposition très similaire à nos stations alpines de troisième génération. Le hall qui fait office de réception est immense et abrite un petit market, où l'on trouve essentiellement des produits sucrés. En bas, dans la salle du bar, les patrons fument des cigarettes et boivent des cafés. L'odeur de tabac est répugnante.",
        ],
        photos: [photos.monteeSkiAvecChien, photos.groupeColPanorama],
      },
      {
        paragraphs: [
          "Nous sommes heureux de quitter cette station, et en même temps, nous ne sommes pas mécontents d'avoir vécu cette expérience. Nous remontons une crête sur son versant est, au milieu des pins, jusqu'au sommet qui la domine. La brume monte sur le versant macédonien, et nous profitons d'une trouée pour une belle descente en neige transformée. Plus nous progressons, et meilleure devient la neige. La seconde montée se fait complètement dans le brouillard, et nous permet de rallier le Kyne (2324m). Et une incroyable descente dans un long couloir du versant macédonien, à jouer avec la brume et la neige transfo. L'accueil au refuge de Ljuboten, construit en 1931 et plus vieux refuge de montagne macédonien, est chaleureux. Les deux gardiens, des golgoths au regard de nounours, sont bénévoles pour le compte du club Alpin de Tetovo. Nous pénétrons dans une pièce basse de plafond, chauffée par un poêle à bois. Les bières sont immédiatement commandées, et arrivent en version pinte. Nous savons que nous arrivons au bout de l'aventure, et il y a comme un relâchement général ce soir, une ambiance bonne enfant, car nous sommes conscients que nous venons de vivre une belle épopée. Le repas est gargantuesque, de l'entrée au dessert, pour le bonheur d'Étienne, et pour notre malheur. John Deer va ronquer toute la nuit…",
        ],
        photos: [photos.skieursPenteAerienne, photos.guesthousePierreBois],
      },
      {
        paragraphs: [
          "Pour ce neuvième et dernier jour de traversée, le programme est enfin plus léger, avec un peu moins de 1000m de dénivelé pour rejoindre le dernier sommet à l'est du massif, le Maja e Lubotenit. Après avoir louvoyé pour trouver un enneigement continu, le pari de viser la combe SE s'est révélé être le bon. Nous la quittons pour prendre pied sur une belle arête, confortable à ski. Entre les strates de nuages et le jeu de la brume, nous pouvons par intermittence apprécier une partie du chemin déjà parcouru. La montagne, aujourd'hui, ne se donne que par bribes, déployant l'immensité du paysage par une ligne de fuite qui tend vers l'infini, l'horizon étant nébuleux, par-delà la mer de nuage que nous dominons. Sommet, nous savourons l'instant. Pour une dernière descente, nous ne pouvions rêver mieux. De la pente, de la place et de la neige transformée, à point. Nous pouvons enfin skier sans craindre les brusques changements de neige. Je ne peux m'empêcher de lâcher prise, et parfois d'atteindre les limites de mon matériel, la légèreté de l'ensemble skis-chaussures, privilégiés pour la montée, n'étant pas vraiment compatible avec la vitesse et les micro-reliefs… Nous nous retrouvons bientôt sous la couche, et sentons, comme au premier jour, les émanations de fumée des habitations de la vallée. Cela devient moins évident d'anticiper l'itinéraire pour optimiser l'enneigement intermittent. Le brouillard est tellement dense que nous finissons par être trempés par la bruine. En grattant et en finissant par skier du givre dans un fossé, et quelques pierres perdues ça et là, nous déchaussons à 50m de la route. Parfois, les choses sont bien faites, puisque la route traversée, nous poussons la porte d'un restaurant ouvert. Il n'y a personne dans la salle, et les serveurs ne semblent pas mécontents de nous voir débarquer. La salle de restaurant fait honneur au bois, et donne envie de s'y asseoir pour partager un bon repas. On ne pouvait rêver mieux et je commande sans attendre une rafale de pizza. À 3 euros la Margherita et à 6,5 euros la pizza la plus chère, on pouvait s'attendre à se faire servir des pizzas soit petites, soit médiocres. Nos préjugés seront déchus.",
          "Pristina. Je pensais débarquer dans un grand établissement, mais l'hôtel que j'ai réservé est une petite gestion familiale. Le fils nous accueille, intrigué de nous voir débarquer avec des skis. Sa famille est d'origine albanaise. Ses deux grands-pères et son oncle ont été tués par les serbes durant la guerre, il y a 25 ans. Après le dîner, nous partons en quête d'un lieu pour passer la soirée, et peut-être une partie de la nuit. Pristina est bien plus sympathique que ce que nous avons vu de Tirana. La rue piétonne, large et pavée de pierre, est décorée de drapeaux albanais et kosovars. Bientôt, nous entrons dans un bar nommé « Bubble ». Aucun videur à l'entrée, aucun filtrage et pour cause, nous nous rendons compte que l'ambiance décontractée provient de sa fréquentation. Il y a beaucoup d'hommes, peu de femmes, et ceux-ci sont plutôt efféminés dans leurs tenues vestimentaires ou leur attitude. Une Drag queen débarque et enflamme la piste de danse. Nous sommes dans un bar queer, dans un pays où plus de 90% de la population est musulmane. Comme quoi, les préjugés ont bon dos…",
        ],
        photos: [photos.skieurCouloirRocheux, photos.groupeSommetNuages],
      },
    ],
    sourceNote: {
      text: "Ce récit a été initialement publié dans Alpine Mag.",
      linkLabel: "Lire l'article original",
      href: "https://alpinemag.fr/ski-kosovo-albanie-macedoine-nord-traversee-montagnes-sar/",
    },
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "KOSOVO",
    subtitle: "Une traversée des montagnes de Šar",
    meta: "Février 2025 · 9 jours de traversée à ski entre Zimur et la vallée sous le Luboten, entre Albanie, Kosovo et Macédoine du Nord · Photos : Yann Borgnet",
    // 15 premières = mosaïque visible au chargement, choisies parmi les 66
    // pour la diversité (paysage/action/portraits/vie locale) plutôt que
    // l'ordre chronologique. Le reste (repliés derrière "Voir la suite du
    // portfolio") reprend les 51 photos restantes dans l'ordre du voyage —
    // aucune exclusion, contrairement à Géorgie : les 66 fichiers fournis
    // sont tous déjà une sélection éditoriale faite par Yann.
    photos: [
      // --- 15 visibles au chargement ---
      photos.skieurImmensiteSar,
      photos.groupeSommetNuages,
      photos.minaretVallee,
      photos.skieurCreteAerienne,
      photos.groupeCreteTempete,
      photos.descentePoudreuseSar,
      photos.panoramaValleeBrume,
      photos.groupeColPanorama,
      photos.cabanePlateau,
      photos.portraitHote,
      photos.groupeVallonAvecChiens,
      photos.plateauLumiereSoir,
      photos.skieurCouloirRocheux,
      photos.villageMontagneCrepuscule,
      photos.groupeSommetSar,
      // --- repliées derrière "Voir la suite du portfolio" (ordre du voyage) ---
      photos.boulanger,
      photos.epicier,
      photos.portageSkis,
      photos.monteeMerNuages,
      photos.groupeMonteeCrete,
      photos.pausePiqueNique,
      photos.petitDejGuesthouse,
      photos.cirqueNeigeRochers,
      photos.descentePanorama,
      photos.viragePoudreuseRochers,
      photos.skieursAreteRocheuse,
      photos.retourSkiVillage,
      photos.vieRuraleGrange,
      photos.portraitsHabitants,
      photos.marcheRueVillage,
      photos.rencontreCafeVillage,
      photos.mosqueeNuitDepart,
      photos.traverseePlateauNeige,
      photos.monteeSolitairePlateau,
      photos.coucherSoleilCrete,
      photos.epicerieVillageSoir,
      photos.toastGuesthouse,
      photos.repasGroupeGuesthouse,
      photos.petitDejLocal,
      photos.preparationEtape,
      photos.burekVillage,
      photos.rencontreHabitantsInterieur,
      photos.rueMosqueeVillage,
      photos.groupeTraverseePlateau,
      photos.skieurSommetRocheux,
      photos.descenteVersVallee,
      photos.villageMatinal,
      photos.interieurMaisonVillage,
      photos.trajetVehicule,
      photos.minaretFenetre,
      photos.skieurCreteNuages,
      photos.skiCouloirNeige,
      photos.viragePenteLarge,
      photos.skieurPenteVallee,
      photos.travauxJardinVillage,
      photos.cuisineChezHabitants,
      photos.repasFamille,
      photos.skieurAvecChiens,
      photos.interieurBoisGuesthouse,
      photos.groupeMonteeForet,
      photos.monteeSkiAvecChien,
      photos.skieursPenteAerienne,
      photos.guesthousePierreBois,
      photos.repasConvivial,
      photos.groupeBrouillardCrete,
      photos.descenteSkiNuages,
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
export const indexCover = photos.skieurImmensiteSar;
