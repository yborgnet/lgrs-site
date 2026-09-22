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
 * de référence). Répartition jour par jour (story.storyDays) faite en
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
// signature/portfolio et le rail jour par jour du récit (story.storyDays),
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
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "De l'Albanie au Kosovo",
        paragraphs: [
          "Le Kosovo était pour moi chargé d'une histoire familiale avant même de devenir une destination de ski. Mon père y avait travaillé en mission humanitaire à la fin des années 1990. Après sa disparition, j'ai imaginé cette traversée comme un récit que j'aurais aimé pouvoir lui raconter.",
          "Le massif de Šar se prête étonnamment bien à l'itinérance : des villages habités tout au long de la chaîne, des crêtes longues et ouvertes et, surtout, la possibilité de tracer une ligne presque continue entre l'Albanie, le Kosovo et la Macédoine du Nord. Après des heures passées sur les cartes, le projet prend forme d'ouest en est, avec les plus grosses étapes dès le début.",
        ],
      },
      {
        heading: "Radomirë, le Korab et la longue journée vers Brod",
        paragraphs: [
          "Depuis Zimur, le Maja Grames donne le ton : une montagne très ouverte, un froid continental et cette manière de « gratter » du dénivelé en traversée qui deviendra notre quotidien. Radomirë, sa mosquée et son hôtel chauffé par un poêle bricolé constituent notre première vraie immersion.",
          "Le lendemain, nous gagnons le mont Korab, point culminant du massif. Puis vient la grosse étape du voyage : près de quarante kilomètres, environ deux mille mètres de dénivelé et une interminable traversée vers Brod. Au soir, le Kosovo est atteint et la fatigue se mêle au sentiment d'avoir réellement basculé dans une autre partie du voyage.",
        ],
      },
      {
        heading: "Brod, Bozovce et un autre rapport au temps",
        paragraphs: [
          "À Brod commence ce que j'ai fini par appeler le « traquenard kosovar » : la dépossession joyeuse de la maîtrise de son temps par les habitants. Un taxi, un café, un autre arrêt, des cigarettes, une course à Dragash… et notre horaire de départ se dissout peu à peu.",
          "Plus loin, la traversée du Kleç et du Zallinë nous fait brièvement passer en Macédoine du Nord avant de rejoindre Bozovce à la frontale. Le village est rustique, l'accueil d'Hesat chaleureux. Au matin, l'unique café concentre toute la vie locale : une pièce sombre, un poêle, des hommes qui fument et boivent leur café pendant que le temps semble s'étirer.",
        ],
      },
      {
        heading: "Prevallë, Brezovicë et les stations kosovares",
        paragraphs: [
          "À partir de Lubinje e Poshtme, le voyage change de visage. Nous remontons les forêts de hêtres, retrouvons la crête frontalière puis gagnons Prevallë, station touristique sans véritables remontées mécaniques. Des chiens errants nous adoptent et plusieurs nous accompagneront jusqu'au bout de l'aventure.",
          "La traversée du Bistër nous conduit ensuite à Brezovicë, station de ski restée presque figée dans les années 1980. Ce décor d'un autre temps tranche avec les villages traversés les jours précédents et rappelle à quel point cette itinérance mêle sans cesse montagne, histoire et géographie humaine.",
        ],
      },
      {
        heading: "Vers le Ljuboten et l'extrémité orientale du massif",
        paragraphs: [
          "Après le Kyne, nous gagnons le refuge Ljuboten, l'un des plus anciens refuges de Macédoine du Nord. L'accueil du club alpin de Tetovo, les bières et un repas gargantuesque donnent à cette avant-dernière soirée un parfum de fin d'expédition.",
          "Le neuvième jour, le Maja e Lubotenit ferme la ligne. Entre les strates de nuages, le paysage se dévoile par bribes et laisse deviner l'immensité du chemin parcouru. La dernière descente offre enfin une neige réellement agréable avant de finir, presque absurdement, par skier dans un fossé jusqu'aux portes de la vallée.",
          "À Pristina, une dernière rencontre ramène brutalement à l'histoire récente du pays. Le voyage se termine comme il a commencé : bien au-delà du ski, dans ce que les lieux et les gens racontent.",
        ],
      },
    ],
    // Note éditoriale, pas un paragraphe du récit : sortie du dernier bloc et
    // déplacée après coup (voir CarnetStory) — lien réel déjà identifié en
    // tête de fichier, jamais une URL inventée.
    sourceNote: {
      text: "Ce récit a été initialement publié dans Alpine Mag.",
      linkLabel: "Lire l'article original",
      href: "https://alpinemag.fr/ski-kosovo-albanie-macedoine-nord-traversee-montagnes-sar/",
    },
    // Rail jour par jour : nombre de photos par jour scalé sur le texte du
    // récit réellement consacré à chaque journée (J1/J2/J3 se partagent un
    // seul bloc "Radomirë, le Korab et la longue journée vers Brod" — J3,
    // la grande étape, reste la mieux fournie des trois ; J6/J8 n'ont que
    // 4 et 2 photos disponibles dans leur fenêtre GPX, reprises telles
    // quelles). `route` reprend le titre réel de chaque étape dans
    // `itinerary.days`, jamais retapé.
    storyDays: itinerary.days.map((d, i) => ({
      day: d.dayNum,
      route: d.title,
      photos: [
        // J1 — Zimur → Maja Grames → Radomirë
        [photos.groupeMonteeCrete, photos.skieurCreteAerienne],
        // J2 — Radomirë → mont Korab → Radomirë
        [photos.groupeSommetSar, photos.viragePoudreuseRochers, photos.retourSkiVillage],
        // J3 — Radomirë → Qafa e Korabit → Brod
        [photos.traverseePlateauNeige, photos.panoramaValleeBrume, photos.plateauLumiereSoir, photos.epicerieVillageSoir],
        // J4 — Brod → Kleç → Zallinë → Bozovce
        [photos.burekVillage, photos.rencontreHabitantsInterieur, photos.groupeTraverseePlateau, photos.descenteVersVallee],
        // J5 — Bozovce → Vërtop → Lubinje e Poshtme
        [photos.skieurCreteNuages, photos.skiCouloirNeige, photos.descentePoudreuseSar],
        // J6 — Lubinje e Poshtme → Prevallë
        [photos.repasFamille, photos.skieurAvecChiens],
        // J7 — Prevallë → Bistër → Brezovicë
        [photos.monteeSkiAvecChien, photos.groupeVallonAvecChiens, photos.groupeColPanorama],
        // J8 — Brezovicë → Kyne → refuge Ljuboten
        [photos.skieursPenteAerienne, photos.guesthousePierreBois],
        // J9 — Refuge Ljuboten → Maja e Lubotenit → vallée
        [photos.skieurCouloirRocheux, photos.groupeBrouillardCrete, photos.groupeSommetNuages, photos.descenteSkiNuages],
      ][i],
    })),
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
