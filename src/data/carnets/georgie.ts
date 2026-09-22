import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { georgiePhotos } from "../photos/georgie-2024";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/georgie-raid-ski-rando-traversee/
 * Récit initialement publié dans Alpine Mag :
 * https://alpinemag.fr/georgie-haute-route-haute-svanetie-ski-randonnee-yann-borgnet/
 * (mention reprise en fin de récit, sans le lien cliquable — CarnetStorySection
 * ne supporte pas de liens riches dans ses paragraphes).
 *
 * ANOMALIE WORDPRESS REPÉRÉE (à signaler, pas corrigée en silence) : le bloc
 * Informations de la page WordPress affiche "175 km et 13 300 m de D+" pour
 * ce carnet — des chiffres strictement IDENTIQUES à ceux du carnet Kosovo
 * (page distincte), très probablement un copier-coller resté en l'état côté
 * WordPress. La somme des étapes ci-dessous (elles, publiées jour par jour et
 * cohérentes) donne ~112 km / ~9 640 m de D+ / ~10 120 m de D- : ce sont ces
 * totaux calculés (computeItineraryTotals), pas la phrase d'agrégat suspecte,
 * qui alimentent le hero et le bloc Informations — même mécanisme que
 * Bernina/Argentera (aucun total jamais recopié à la main).
 *
 * PHOTOS : passe photo faite à partir des 71 JPEG retouchés fournis par Yann
 * (EXIF complets, noms SEO définitifs, localisation croisée GPX), déposés
 * dans public/photos/Georgie/. Métadonnées (ALT, légende, localisation,
 * certitude GPX) dérivées telles quelles de src/data/photos/georgie-2024.ts —
 * lui-même généré depuis correspondance-seo-gpx-georgie-2024.csv (source
 * documentaire de référence). Sélection éditoriale (signature/portfolio/rail)
 * déjà validée par Yann + ChatGPT, reprise ici sans reprioriser depuis les
 * noms de fichiers.
 *
 * GPX : pas de GPX original téléchargeable sur WordPress — tracé lat/lon de
 * la carte interactive récupéré tel quel et resérialisé en `.gpx` minimal
 * (sans altitude ni horodatage, voir public/gpx/georgie-raid-ski-rando-traversee.gpx).
 */

const IMG = "/photos/Georgie/";

/** ALT = texte_alternatif du CSV, jamais réécrit à la main (voir
 *  src/data/photos/georgie-2024.ts). Quand certitude_GPX est "faible", la
 *  localisation qu'il contient reste déjà volontairement large (ex. "vallée
 *  de Becho, vers le massif de l'Ushba") — ne jamais la resserrer ici. */
const photo = (file: string): CarnetPhoto => {
  const meta = georgiePhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

// Sélection éditoriale : 4 signature/présentation + 18 portfolio (item 6) +
// 31 photos réparties dans le rail jour par jour du récit (item 11/12, voir
// story.storyDays) — 52 fichiers sur les 71 fournis, choisis depuis les
// horodatages EXIF réels (dateTimeOriginal) recoupés avec le récit, jamais
// depuis les seuls noms de fichiers.
const photos = {
  // Signature / présentation
  heroAlpenglow: photo("georgie-svanetie-groupe-ski-alpenglow-15.jpg"),
  villageMontagnes: photo("georgie-svanetie-village-svane-montagnes-68.jpg"),
  groupeCrete: photo("georgie-svanetie-groupe-ski-crete-caucase-34.jpg"),
  skiArete: photo("georgie-svanetie-ski-arete-panorama-24.jpg"),

  // Portfolio (complément aux 4 signature ci-dessus, déjà réutilisées)
  alpenglowSommets: photo("georgie-svanetie-alpenglow-sommets-44.jpg"),
  monteeShkhara: photo("georgie-svanetie-montee-ski-shkhara-47.jpg"),
  panoramaSommets: photo("georgie-svanetie-panorama-sommets-caucase-35.jpg"),
  descenteGrandVallon: photo("georgie-svanetie-descente-ski-grand-vallon-42.jpg"),
  descenteVallonPortfolio: photo("georgie-svanetie-descente-ski-vallon-32.jpg"),
  viragePoudreuseCaucase: photo("georgie-svanetie-virage-ski-poudreuse-caucase-51.jpg"),
  cordeeCrete: photo("georgie-svanetie-cordee-montee-crete-59.jpg"),
  reliefsPoudreuse: photo("georgie-svanetie-skieurs-reliefs-poudreuse-63.jpg"),
  passageVillagePortfolio: photo("georgie-svanetie-passage-village-skieurs-13.jpg"),
  cabaneNeigePortfolio: photo("georgie-svanetie-cabane-bois-sous-neige-37.jpg"),
  refugeNuit: photo("georgie-svanetie-refuge-nuit-montagne-43.jpg"),
  portraitHabitant: photo("georgie-svanetie-portrait-habitant-svanetie-04.jpg"),
  enfantsVillage: photo("georgie-svanetie-enfants-village-23.jpg"),
  toursVillage: photo("georgie-svanetie-tours-svanes-village-66.jpg"),

  // Rail du récit — arrivée
  routeTbilissiMestia: photo("georgie-svanetie-route-tbilissi-mestia-71.jpg"),
  routeVillage: photo("georgie-svanetie-route-village-svanetie-69.jpg"),
  tourNeige: photo("georgie-svanetie-tour-svane-neige-67.jpg"),
  toastArrivee: photo("georgie-svanetie-toast-arrivee-svanetie-65.jpg"),

  // Rail du récit — J1 à J3 (Oushgouli → Adishi), horodatages EXIF 04/04-04/06
  groupeMonteeVallee: photo("georgie-svanetie-groupe-montee-vallee-48.jpg"),
  groupeCabane: photo("georgie-svanetie-groupe-devant-cabane-40.jpg"),
  interieurCabane: photo("georgie-svanetie-interieur-cabane-repos-45.jpg"),
  departRefuge: photo("georgie-svanetie-depart-refuge-ski-46.jpg"),
  traverseeVallonSkieur: photo("georgie-svanetie-skieur-traversee-vallon-41.jpg"),
  vachesMaison: photo("georgie-svanetie-vaches-maison-pierre-30.jpg"),
  vieVillage: photo("georgie-svanetie-vie-village-hiver-49.jpg"),
  repasHabitants: photo("georgie-svanetie-repas-chez-habitants-28.jpg"),

  // Rail du récit — J4 (Adishi → Mestia)
  viragePoudreuse: photo("georgie-svanetie-virage-ski-poudreuse-33.jpg"),
  traverseeForet: photo("georgie-svanetie-traversee-ski-foret-31.jpg"),
  portageVillage: photo("georgie-svanetie-portage-skis-village-29.jpg"),
  toastGuesthouse: photo("georgie-svanetie-toast-groupe-guesthouse-17.jpg"),
  portageMaison: photo("georgie-svanetie-portage-skis-maison-27.jpg"),
  groupeCreteTetnuldi: photo("georgie-svanetie-groupe-ski-crete-26.jpg"),
  massifEnneige: photo("georgie-svanetie-massif-enneige-svanetie-25.jpg"),
  rencontreHabitants: photo("georgie-svanetie-rencontre-habitants-village-22.jpg"),
  toursSvanesNuit: photo("georgie-svanetie-tours-svanes-nuit-21.jpg"),

  // Rail du récit — J5 (Mestia → Cloud Base Hut)
  materielSkiBalcon: photo("georgie-svanetie-materiel-ski-balcon-16.jpg"),
  monteePanoramaVallee: photo("georgie-svanetie-montee-ski-panorama-vallee-64.jpg"),
  villageFaceMontagnes: photo("georgie-svanetie-village-face-montagnes-20.jpg"),
  chaletNeigeMontagne: photo("georgie-svanetie-chalet-neige-montagne-19.jpg"),

  // Rail du récit — J6 (Cloud Base Hut → Mazeri)
  monteeReliefs: photo("georgie-svanetie-skieurs-montee-reliefs-neige-55.jpg"),
  flancMontagne: photo("georgie-svanetie-skieurs-flanc-montagne-61.jpg"),
  descenteRaide: photo("georgie-svanetie-descente-ski-pente-raide-50.jpg"),
  skieurCreteNeige: photo("georgie-svanetie-skieur-crete-neige-14.jpg"),
  anciensVehicules: photo("georgie-svanetie-anciens-vehicules-village-10.jpg"),

  // Rail du récit — J7 (Mazeri → Iskari)
  monteeCol: photo("georgie-svanetie-groupe-montee-col-neige-53.jpg"),
  panoramaVallee: photo("georgie-svanetie-panorama-vallee-caucase-52.jpg"),
  traverseeVallon: photo("georgie-svanetie-traversee-vallon-ski-54.jpg"),
  repasFinal: photo("georgie-svanetie-repas-groupe-guesthouse-01.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "7 jours. Une traversée de la Haute-Svanétie.",
  intro:
    "D'Oushgouli à Iskari, une ligne continue sous les grands sommets du Caucase, entre glaciers, cols, villages et cabanes d'alpage.",
  days: [
    {
      dayNum: "J1",
      title: "Oushgouli → cabanes du Chkhara",
      text: "Depuis Oushgouli, à 2 100 m, montée vers les crêtes sous le Chkhara puis traversée jusqu'aux cabanes d'alpage.",
      distanceKm: 11.6,
      ascentM: 1190,
      descentM: 1020,
    },
    {
      dayNum: "J2",
      title: "Cabanes du Chkhara → Khalde",
      text: "Passage glaciaire à proximité de la frontière russo-géorgienne, puis descente vers Khalde Mountain Farms.",
      distanceKm: 14.0,
      ascentM: 1220,
      descentM: 1240,
    },
    {
      dayNum: "J3",
      title: "Khalde → Adishi",
      text: "Ascension d'un sommet sans nom autour de 3 500 m, traversée glaciaire puis descente vers Adishi, à 2 100 m.",
      distanceKm: 10.7,
      ascentM: 680,
      descentM: 850,
    },
    {
      dayNum: "J4",
      title: "Adishi → Mestia",
      text: "Passage par un sommet sans nom autour de 3 500 m et le glacier du Tetnuldi, puis descente par Zhabeshi jusqu'à Mestia, à 1 500 m.",
      distanceKm: 33.0,
      ascentM: 2180,
      descentM: 2860,
    },
    {
      dayNum: "J5",
      title: "Mestia → Cloud Base Hut",
      text: "Montée depuis Mestia jusqu'à Cloud Base Hut.",
      distanceKm: 5.6,
      ascentM: 900,
      descentM: 50,
    },
    {
      dayNum: "J6",
      title: "Cloud Base Hut → Mazeri",
      text: "Franchissement du col Chaali puis longue descente sous la face est de l'Ushba jusqu'à Mazeri, à 1 600 m.",
      distanceKm: 19.6,
      ascentM: 1670,
      descentM: 2330,
    },
    {
      dayNum: "J7",
      title: "Mazeri → Iskari",
      text: "Dernière étape par le mont Bok, autour de 2 900 m, avant la descente vers Iskari, à 1 400 m.",
      distanceKm: 17.6,
      ascentM: 1800,
      descentM: 1770,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données publiées par
// WordPress jour par jour) — jamais recopiés en dur. Voir la note d'anomalie
// en tête de fichier : ces totaux diffèrent volontairement de la phrase
// d'agrégat WordPress ("175 km et 13 300 m de D+"), dupliquée par erreur
// depuis la page Kosovo.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Avril 2024"; // "9 jours, dont 7 jours de ski, avril 2024" (WordPress)

export const georgie: Carnet = {
  slug: "georgie-raid-ski-rando-traversee",
  seo: {
    title: "Géorgie à ski : traversée de la Haute-Svanétie",
    description:
      "Traversée à ski de la Haute-Svanétie, d'Oushgouli à Iskari : glaciers du Caucase, cabanes isolées, villages et hospitalité svane.",
    ogImage: photos.heroAlpenglow.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "GÉORGIE",
    subtitle: "Une traversée de la Haute-Svanétie",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  // Photo entière, ratio intrinsèque (voir carnet.css .carnet-photo--hero) —
  // plus de recadrage panoramique forcé : aucune position ne pouvait
  // conserver à la fois les six skieurs ET les sommets sur tous les écrans
  // larges (essayé : 62%, 84% — toujours un compromis). La photo entière,
  // plus haute sur desktop, règle le problème à la racine (choix éditorial).
  openingPhoto: photos.heroAlpenglow,
  intro: {
    heading: "Une ligne continue d'Ushguli à Iskari, en passant par Mestia",
    paragraphs: [
      "La Haute-Svanétie est un territoire frontalier au sens plein du terme. Frontière géographique, matérialisée par la grande muraille glaciaire du Caucase, mais aussi politique et historique. Ici, les sommets — Chkhara, Tetnuldi, Ushba — incarnent une limite. C'est dans cet entre-deux que s'inscrit cette haute route à ski, d'Oushgouli à Iskari.",
      "Je connais cette région depuis une décennie et c'est la première fois que j'y viens à ski. Neige fraîche, glaciers immenses, chutes de séracs : la montagne impose vite ses règles. Mais ce voyage se joue aussi le soir, dans les cabanes et les villages, autour de tables trop pleines, de chacha et d'hospitalité svane. Avec Shako Margiani, guide UIAGM et enfant du pays, on ne traverse pas seulement un massif : on entre un peu dans son histoire.",
    ],
    // Crop resserré sur les deux tours svanes centrales + les sommets
    // (colonne étroite et haute, très éloignée du ratio natif de la photo).
    photo: { ...photos.villageMontagnes, position: "78% 20%" },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Géorgie" },
      { label: "Massif", value: "Haute-Svanétie · Caucase" },
      { label: "Départ", value: "Oushgouli" },
      { label: "Arrivée", value: "Iskari" },
      { label: "Forme du raid", value: "Traversée de massif — voyage à ski de randonnée en itinérance" },
      { label: "Hébergements", value: "Guest-houses, cabanes non gardées" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Oushgouli → Iskari",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/georgie-raid-ski-rando-traversee.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "Le melting-pot des rencontres",
        paragraphs: [
          "Gérer un voyage commercial, c'est aussi tenter de rassembler des gens qui seront susceptibles de trouver des points de convergence. Pour cela, rien de mieux qu'un trajet de plus de 24 h, de Paris ou Genève à Oushgouli, au fin fond de la Haute-Svanétie. Après une nuit de voyage aérien et d'escale, nous voilà à Tbilissi, où Guladi nous attend pour nous conduire à travers la Géorgie à bord de son vieux bus Mercedes.",
          "À Mestia, nous retrouvons Shako, guide UIAGM et enfant du pays. Puis les Delica nous conduisent jusqu'à Oushgouli. Nous arrivons juste à temps pour les lumières du couchant sur les tours du village et la muraille du Chkhara. À peine le dîner commencé, Shako sort la chacha : ici, le digestif commence tôt.",
        ],
      },
      {
        heading: "Oushgouli – Adishi : trois jours à l'ombre du Chkhara",
        paragraphs: [
          "Le premier jour donne le ton. Il a neigé et venté pendant la nuit. Le paysage est immaculé, grandiose, mais piégeux. Les couches fragiles propagent facilement et plusieurs départs de plaques nous rappellent immédiatement l'engagement de cette traversée. Après une descente mémorable, nous rejoignons deux petites cabanes de berger pour la nuit.",
          "Le Chkhara se dégage enfin dans les lumières du soir. Son sérac décharge pendant la nuit et une avalanche balaie la face. Le lendemain, nous poursuivons sous cette immense chaîne frontalière, puis descendons le glacier Zaresho-Khalde vers les Khalde Mountain Farms. La perturbation revenue dans l'après-midi nous offrira une neige de cinéma le matin suivant.",
          "Au loin apparaissent les tours d'Adishi. Nous arrivons presque à ski au milieu des vaches et des chemins boueux. Ce village, longtemps en partie abandonné après un hiver meurtrier en 1978, reprend aujourd'hui vie avec le tourisme. Autour de la table de la guest-house, plats svanes, bières et vin local prolongent la journée.",
        ],
      },
      {
        heading: "Adishi – Mestia : bambée et traquenard",
        paragraphs: [
          "Depuis Adishi, nous gagnons un sommet sans nom autour de 3 500 m, au-dessus du glacier du Tetnuldi, puis descendons vers la station et Zhabeshi. Plutôt que de prendre le taxi, une partie du groupe poursuit à pied et à ski jusqu'à Mestia : près de 30 km et plus de 2 000 m de dénivelé positif pour cette longue journée.",
          "À Mestia, la table se remplit à nouveau jusqu'à faire disparaître la nappe. Puis Shako propose un « petit tour en ville ». La soirée se poursuit dans un bar fréquenté par les guides locaux, autour d'une chacha artisanale servie généreusement dans une petite corne. Le piège géorgien fonctionne parfaitement.",
        ],
      },
      {
        heading: "Mestia – Iskari : à l'ombre de l'Oushba",
        paragraphs: [
          "La Cloud Base Hut, cabane non gardée appartenant à Nick, un guide de Mestia, marque le début de la seconde partie. À cinq heures, nous quittons la cabane. Dans l'obscurité de l'aube, une silhouette animale file au loin. Le lever de soleil sur l'imposante face Est de l'Oushba est fantastique. Nous franchissons ensuite le secteur du Chaali glacier avant de descendre vers Mazeri.",
          "Il reste une dernière étape jusqu'à Iskari. Dans la forêt au-dessus de Mazeri, d'énormes traces dans la neige ne laissent guère de doute : un ours est passé par là. Plus haut, l'hiver cède progressivement la place au printemps. Après le mont Bok, les grandes pentes sud se transforment en neige molle, puis en prés et en buissons.",
          "À Iskari, notre hôte nous accueille dans une ferme où cohabitent bétail, scierie mobile et serveurs de minage de bitcoins. Le repas final commence à quinze heures et, comme toujours, la chacha accompagne généreusement l'hospitalité svane. Après sept jours de traversée, il faut finalement saluer Shako et refermer cette ligne entre Oushgouli et Iskari.",
        ],
      },
      {
        heading: "Le contexte historique et géopolitique",
        paragraphs: [
          "Cette traversée s'inscrit aussi dans un territoire frontalier. Depuis mes premiers voyages en Haute-Svanétie, la proximité de la Russie, de l'Abkhazie et des zones sous tension s'est toujours invitée dans l'expérience de la montagne. En 2024, le contexte lié à la guerre en Ukraine et les recommandations officielles autour de la frontière russo-géorgienne ont même posé la question de la faisabilité du voyage.",
        ],
      },
    ],
    // Note éditoriale, pas un paragraphe du récit : sortie de la dernière
    // section et déplacée après coup (voir CarnetStory) — lien réel déjà
    // identifié en tête de fichier, jamais une URL inventée.
    sourceNote: {
      text: "Ce récit a été initialement publié dans Alpine Mag.",
      linkLabel: "Lire l'article original",
      href: "https://alpinemag.fr/georgie-haute-route-haute-svanetie-ski-randonnee-yann-borgnet/",
    },
    /* Rail jour par jour (correction "v5") : nombre de photos par jour
       rééquilibré sur la hauteur réelle du texte du récit, pas seulement sur
       le matériel EXIF disponible (v4 produisait un rail ~900px plus haut
       que le texte, d'où un grand vide blanc sous le texte en fin de récit,
       item 4). Le récit ne consacre qu'un seul paragraphe à J1/J2/J3/J5
       (les trois jours "Oushgouli-Adishi" se partagent un seul bloc, et J5
       n'a pas de paragraphe dédié — simple montée vers Cloud Base Hut) : ces
       jours restent donc à 1 ligne. J3 garde 2 lignes (village d'Adishi,
       plus illustré). J4 (la plus longue étape, ~33 km, doublée d'une
       soirée à Mestia) et J6/J7 (paragraphe le plus long du récit, ours,
       arrivée) restent les mieux fournis. Photos retirées de J1/J4/J5/J7
       toujours présentes ailleurs dans le carnet (portfolio, voir plus bas) —
       jamais supprimées du site, seulement sorties du rail. `route` reprend
       le titre réel de chaque étape dans `itinerary.days`, jamais retapé. */
    storyDays: itinerary.days.map((d, i) => ({
      day: d.dayNum,
      route: d.title,
      photos: [
        // J1 — Oushgouli → cabanes du Chkhara
        [photos.groupeMonteeVallee, photos.refugeNuit],
        // J2 — cabanes du Chkhara → Khalde
        [photos.traverseeVallonSkieur, photos.descenteGrandVallon],
        // J3 — Khalde → Adishi
        [photos.descenteVallonPortfolio, photos.traverseeForet, photos.vachesMaison, photos.repasHabitants],
        // J4 — Adishi → Mestia
        [photos.portageMaison, photos.groupeCreteTetnuldi, photos.massifEnneige,
          photos.enfantsVillage, photos.rencontreHabitants, photos.toursSvanesNuit],
        // J5 — Mestia → Cloud Base Hut
        [photos.villageFaceMontagnes, photos.chaletNeigeMontagne],
        // J6 — Cloud Base Hut → Mazeri
        [photos.heroAlpenglow, photos.skieurCreteNeige, photos.passageVillagePortfolio, photos.anciensVehicules],
        // J7 — Mazeri → Iskari
        [photos.monteeCol, photos.descenteRaide, photos.traverseeVallon, photos.repasFinal],
      ][i],
    })),
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "GÉORGIE",
    subtitle: "Traversée de la Haute-Svanétie",
    meta: "Avril 2024 · 7 jours de traversée à ski entre Oushgouli et Iskari, sous les glaciers du Caucase · Photos : Yann Borgnet",
    // Mise en page en colonnes (masonry, voir carnet.css) : chaque photo garde
    // son ratio naturel, plus de classe wide/tall à choisir à la main. 15
    // premières = portfolio autonome pour qui ne déplie jamais (item 12) ;
    // le reste (item 3) reprend les meilleures photos sorties du rail lors de
    // l'allègement du récit, plus quelques bonnes photos jamais utilisées —
    // jamais les 71 fichiers, une vraie sélection (item 14), sans 3 variantes
    // quasi identiques d'une même scène côte à côte dans les 15 visibles.
    // Le portfolio complet réunit aussi les photos déjà utilisées dans le
    // rail du récit (item 8/11) : elles rejoignent la partie repliée plutôt
    // que d'être exclues du portfolio complet.
    photos: [
      // --- 15 visibles au chargement ---
      photos.heroAlpenglow,
      photos.villageMontagnes,
      photos.tourNeige,
      photos.groupeCrete,
      photos.skiArete,
      photos.panoramaSommets,
      photos.portraitHabitant,
      photos.alpenglowSommets,
      photos.monteeShkhara,
      photos.toursVillage,
      photos.cordeeCrete,
      photos.reliefsPoudreuse,
      photos.viragePoudreuseCaucase,
      photos.descenteGrandVallon,
      photos.refugeNuit,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.passageVillagePortfolio,
      photos.cabaneNeigePortfolio,
      photos.enfantsVillage,
      photos.descenteVallonPortfolio,
      photos.viragePoudreuse,
      photos.groupeMonteeVallee,
      photos.traverseeVallonSkieur,
      photos.panoramaVallee,
      photos.monteePanoramaVallee,
      photos.vieVillage,
      photos.traverseeForet,
      photos.monteeReliefs,
      photos.departRefuge,
      photos.materielSkiBalcon,
      photos.routeTbilissiMestia,
      // --- utilisées (ou l'ayant été) dans le rail jour par jour, voir
      //     story.storyDays : le portfolio complet reste exhaustif même
      //     quand une photo a été sortie du rail lors du rééquilibrage v5 ---
      photos.routeVillage, photos.toastArrivee,
      photos.groupeCabane, photos.interieurCabane,
      photos.vachesMaison, photos.repasHabitants,
      photos.portageVillage, photos.toastGuesthouse,
      photos.flancMontagne, photos.descenteRaide,
      photos.monteeCol, photos.repasFinal,
      photos.portageMaison, photos.groupeCreteTetnuldi, photos.massifEnneige,
      photos.rencontreHabitants, photos.toursSvanesNuit,
      photos.villageFaceMontagnes, photos.chaletNeigeMontagne,
      photos.skieurCreteNeige, photos.anciensVehicules,
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera, jamais
 *  une photo retapée séparément. */
export const indexCover = photos.heroAlpenglow;
