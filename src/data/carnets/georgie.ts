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
    // Positions de fin d'étape placées par distance cumulée (distances par jour publiées) sur la trace WordPress simplifiée, sans horodatage : à ±1 km. Mestia recoupe les coordonnées réelles du village.
    markers: [
      { name: "Oushgouli", lat: 42.915706, lon: 43.013326, direction: "left" },
      { name: "Cabanes du Chkhara", lat: 42.949595, lon: 43.076678 },
      { name: "Khalde", lat: 42.969000, lon: 42.991980 },
      { name: "Adishi", lat: 42.997862, lon: 42.914626, direction: "left" },
      { name: "Mestia", lat: 43.045526, lon: 42.733086, direction: "left" },
      { name: "Cloud Base Hut", lat: 43.066303, lon: 42.723958, direction: "left" },
      { name: "Mazeri", lat: 43.078677, lon: 42.598305, direction: "top" },
      { name: "Iskari", lat: 43.051871, lon: 42.526544 },
    ],
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    title: "Géorgie : Haute Route de la Haute-Svanétie à ski de randonnée",
    standfirst:
      "La Mingrélie-Haute-Svanétie est une des douze régions de la Géorgie. Elle se déploie de la Mer Noire jusqu’aux hautes cimes du Caucase, qui marque la frontière russo-géorgienne. Plusieurs hauts sommets composent cette frontière naturelle : le Chkhara (5193m) et ses neuf cimes, point culminant de la Géorgie et troisième plus haut sommet du Caucase ; le Djangha (5059m) ; le pic Tetnuldi (4858m), qui pourrait être comparé au mont Blanc et enfin le mont Oushba et ses deux imposants sommets (4710m). La haute route de la Haute-Svanétie est un raid à ski qui traverse depuis Ouchgouli, au pied du Chkhara, jusqu’à Iskari, au sud-ouest de l’Ouchba. Ce parcours a été réalisé par les guides Yann Borgnet et Shako Margiani et leurs 9 clients du 4 au 10 avril 2024. Récit.",
    sections: [
      {
        heading: "Des considérations géopolitiques",
        paragraphs: [
          "Je suis déjà allé deux fois en Géorgie, dans la Haute-Svanétie. La première fois, en 2014, alors que le pays sortait à peine d’une escalade des tensions encore perceptible avec son voisin russe, déjà engagé dans des velléités impériales. Dans cette guerre éclair de six jours d’août 2008, elle a perdu le contrôle de deux régions “pro-russes” et déjà autonomes, l’Ossétie du sud et l’Abkhasie, devenues des protectorats russes, après que la Russie en reconnaisse officiellement l’indépendance en 2008. Après deux heures d’intense “bartasse”, au milieu des broussailles et des fougères qui encombraient un ancien sentier, et avec une totale stupéfaction, nous nous étions fait cueillir par des militaires postés là pour surveiller la frontière distante d’une dizaine de kilomètres à vol d’oiseau. En 2019, le poste était encore en place, mais vide et nous avons eu le loisir de retourner arpenter les immenses glaciers caucasiens, à quelques encablures de la frontière russo-géorgienne. Le contexte lié à la guerre en Ukraine bouleverse le destin géorgien, qui a un temps opté pour l’intégration européenne et qui est aujourd’hui balloté entre deux voies. Sa présidente, Salomé Zourabichvili, ancienne ambassadrice de France en Géorgie, parfaitement francophone et pro-européenne, occupe un poste majoritairement symbolique. Le parti au pouvoir depuis 2012, “Rêve géorgien”, fondé par l’oligarque milliardaire Bidzina Ivanichvili, se réclamait initialement du centre-gauche et a été décrit comme favorable à l’économie de marché et pour un rapprochement avec l’Occident, est devenu ouvertement pro-russe à partir de 2021-2022. Les élections législatives du 26 octobre 2024, considérées comme “existentielles” pour l’avenir du pays, ont permis à ce parti de renforcer encore son pouvoir, sur fond d’irrégularités et de dérives autoritaires.",
          "Ce contexte a menacé la faisabilité de ce voyage en Géorgie : sur le site du ministère des Affaires étrangères (Ariane), la frontière est à présent soulignée d’un liseré rouge, identifiant les zones “formellement déconseillées”. Autrement dit, un “no go” dans le contexte d’organisation d’un voyage commercial. Il m’a fallu déployer (un peu) d’énergie pour recevoir enfin l’assentiment du ministère et de l’ambassade.",
        ],
      },
      {
        heading: "Le melting-pot des rencontres",
        paragraphs: [
          "Mardi 2 avril, on se retrouve (presque) tous à l’aéroport de Genève. Si je connais quasi tout le monde, ce n’est pas le cas des participants. Gérer un voyage commercial, c’est aussi tenter de rassembler des gens qui seront susceptibles de trouver des points de convergence. Pour cela, rien de mieux qu’un trajet de plus de 24h, de Paris/Genève à Oushgouli, au fin fond de la Haute-Svanétie. Le groupe se retrouve enfin au complet dans l’enceinte impressionnante de l’aéroport d’Istanbul, et cet événement marque réellement pour moi le début du voyage, puisqu’il teinte fortement la suite des réjouissances. Après une nuit de voyage aérien et d’escale, nous voilà à Tbilissi, où Guladi nous attend déjà pour nous conduire à travers la Géorgie, à bord de son vieux bus Mercedes. Ceinture derrière le dos, sa conduite souple n’est étrangement pas modifiée par ses très nombreux coups de fil, le téléphone à l’oreille. Guladi a ses adresses, et les pauses ne sont probablement pas hasardeuses. Lors de l’une d’elles, nous mangeons notre premier khachapuri, marquant pour moi le véritable retour en Géorgie. Nous sommes alors au début de la vallée de l’Ingouri, la longue vallée que nous devons remonter pour rejoindre Oushgouli depuis Zougdidi. Le barrage hydraulique de l’Inguri qui se dresse au milieu de cette vallée crée un bassin de rétention de plusieurs kilomètres et contribue à la production d’énergie nationale à hauteur de 40%.",
          "À Mestia, nous retrouvons Shako, avec qui je vais bosser pour cette traversée. Je ne le connais que de réputation, et par les quelques coups de fils que nous avons échangés pour préparer le voyage. Shako vit ici, avec sa femme et ses deux enfants. Il est guide UIAGM, comme moi, et très bon skieur. Vainqueur de l’étape locale du Freeride World Tour Qualifier en 2023, il aime le ski et préfère ne pas concéder la skiabilité au poids du matériel. C’est ce qui me surprend lorsque je tends sa paire de ski au chauffeur posté sur le toit de son “Delica”, ces petits camions 4x4 qui sont légions ici, indispensables pour notre transfert jusqu’à Oushgouli. Nous arrivons juste à l’heure pour apprécier les fantastiques lumières du couchant sur les nombreuses tours du village, à l'époque utilisées comme bunker de protection par chaque famille en cas d'attaques et devenues symboles de la région. L’imposante muraille du Chkhara se dégage par bribes et nous procure des frissons par son caractère alpin.",
          "À peine le dîner commencé, Shako nous propose un verre de l’amitié. Il passe derrière le comptoir du bar, sort une bouteille au contenu translucide et sert copieusement des petits verres. Selon lui, la “chacha” s’apprécie pendant le repas. Ici, le dijo commence tôt ! Elle est “strong” la chacha, et en cette veille de départ pour 7 jours d’itinérance, personne n’ose se resservir ! Sauf Shako, bien sûr, qui partage volontiers quelques verres supplémentaires avec les chauffeurs des Delica. Eux ne comptent pas les coups avant de reprendre la route escarpée pour Mestia!",
        ],
      },
      {
        heading: "Oushgouli-Adishi : trois jours en cabanes à l’ombre du Chkhara",
        paragraphs: [
          "Ce premier jour de ski en Géorgie va teinter la suite du périple. Il a neigé cette nuit, comme les jours précédents, et le vent là-haut n’a cessé de souffler. Le paysage est immaculé, grandiose. Mais piégeux, aussi. Ce matin, on se croirait presque dans une combe des Aravis un samedi matin, alors que deux grands groupes de skieurs nous devancent. Ils s’arrêtent à l'issue de la première bosse, grande classique de la zone. Nous continuons alors à cheminer sur une crête qui ne voit jamais de skieurs. Alors que nous marchons à trois de front, non loin de l’arête, nous ressentons un wouf suivi d’un bruit continu. Mon réflexe porte mon regard sur le versant d’en face mais aucune trace d’activité avalancheuse. Il y a bien eu une avalanche, et elle est partie juste en-dessous de nous. Une cassure de 40cm sur une partie de la face… première alerte, je n’ai jamais déclenché pareille plaque dans les Alpes, et encore moins à distance. La couche fragile est sensible et elle propage très facilement.  Quelques centaines de mètres plus loin, on assiste à une seconde alerte, bien plus sérieuse. Le scénario est le même. Le groupe de tête passe sans souci à quelques encablures de la crête sommitale, et c'est lorsque le second groupe passe que toute la face part, 5m en dessous. Au point le plus haut, la cassure avoisine le mètre,  c'est vraiment impressionnant.  Je vais voir ce qu'il y a dessous : la couche fragile est constituée d'une vingtaine de centimètres de gobelets…",
          "Nous rejoignons les deux petites cabanes dans lesquelles nous dormirons ce soir. Elles sont encore en cours de construction, et dans celles que nous occupons sont stockés une bonne vingtaine de rouleaux de laine de verre. La table et les bancs ont été bricolés rapidement, à base de sommiers de lits en métal et de chutes de planche. Comme à son habitude, Etienne brasse et vante les qualités de son nouveau matelas gonflable. Jusqu'au moment fatidique où, à force de le faire bouger sur le plancher en bois certes neuf mais pas parfait, il constate que celui-ci ramollit… On a bien ri. Lui moins. Le Chkhara se dégage enfin avec les lumières du couchant, c'est à la fois incroyable et effrayant.  Et encore davantage lorsque, à l'heure du coucher, son sérac décharge copieusement et qu'une avalanche balaie toute la face. Le Caucase, ce n’est pas les Alpes, voilà le principal enseignement de cette première journée de ski.",
          "Le créneau météo bouge tout le temps. La neige va tomber dans l'après-midi et on se lève en conséquence. Bientôt un rayon de soleil et quelques photos volées avec en fond la crête frontière russo-géorgienne. Avec une vitesse fulgurante, un front nuageux envahit le ciel par l'ouest. Cependant, et comme les prévisions l'indiquaient, le plafond reste aux alentours de 4000m, nous laissant la perspective d'une descente par le glacier. Peu de pente, mais une sacrée ambiance. La neige, excellente en haut, devient rapidement croutée. Ici, les gradients de température sont importants, en témoignent les très nombreuses reptations. Nous rejoignons nos deux petites cabanes de berger, les “Khalde mountain farms”. L’une est aménagée d’un vieux poêle à bois et de trois sommiers à ressorts vénérés par Pascal, Quentin et Shako qui ont fait l’impasse sur les matelas. L’autre est vide, et son vieux parquet accueille nos matelas gonflables.",
          "La nuit a été fraîche. La neige a immaculé les versants qui nous surplombent, couvrant les zones dégarnies par de précédentes avalanches de fond. La chaîne frontalière, cette haute muraille, continue de nous écraser par son ampleur. Du sommet sans nom que nous atteignons, la vue est saisissante, notamment sur le Tetnuldi, un sommet que j'avais gravi lorsque j'étais venu la première fois en Géorgie, il y a 10 ans. Je ne sais pas si je laisse beaucoup le choix à Shako, mais je m'engage en premier dans la descente, dans une neige de cinéma. C'est fluide et le petit fond dur permet d'impulser les virages. Un délice. On se languit tous de cette descente en s'exclamant par des cris de joie, sauf peut-être Robin qui envoie un peu trop fort, jump et atterrit en tête-pied. Un de ses skis se fait la malle, après avoir rompu le leash. D'en bas, je le vois arriver à pleine vitesse, sauter une bosse et se planter dans la neige à mon niveau. C'était moins une… Ici, les conséquences peuvent être problématiques. Suit un long plat de quelques kilomètres, en partie en poussée de bâtons, en partie avec les peaux. Au loin, nous voyons les tours caractéristiques du petit village d'Adishi. Nous arrivons presque à ski au village, au milieu des vaches et par des chemins boueux qui en font tout le charme (avec les tours !). Natia ne tarde pas à nous apporter onze grandes bières, il ne nous en fallait pas moins pour apprécier cette journée. Adishi est un village en partie en ruine, qui a été abandonné par sa population en 1978 à la suite d'un hiver meurtrier. Shako nous raconte ainsi qu'en 2009, il n'y avait plus que 3 familles vivant ici et qu'elles sont aujourd'hui une vingtaine grâce au développement rapide du tourisme. D'ailleurs, en nous promenant au-dessus du village, nous entendons des bruits de travaux provenant de plusieurs habitations, signe de transformations encore en cours. Aurélien, le vigneron du groupe, ne peut s'empêcher d'aller acheter du vin local dans l'épicerie du village. Il revient, très fier de sa quête, avec deux bouteilles en plastique remplies du précieux liquide, l'une rouge, l'autre orangée. Des vins sans défauts selon lui, mais visiblement pas au goût de tous… Ils accompagnent à merveille les nombreux mets qui couvrent le moindre centimètre carré de la table : salade de carottes râpées à la coriandre, tranches d’aubergines grillées et fourrées au fromage frais, khatchapouri au fromage et à la viande, viande de poulet en sauce, choux fleur poêlée. Un vrai festin !",
        ],
        photos: [photos.groupeMonteeVallee, photos.traverseeVallonSkieur, photos.descenteVallonPortfolio, photos.vachesMaison],
      },
      {
        heading: "Adishi-Mestia, de la bambée au traquenard",
        paragraphs: [
          "Il y avait plusieurs options pour cette journée. J'avais très envie de monter jusqu'à l'épaule du Tetnuldi pour skier son glacier jusqu'à Mestia. Mais selon Shako, la dernière section, entre un canyon encaissé et des bushes denses, est trop galère. En lot de consolation, je formule le projet de ne pas prendre le taxi depuis Zhabeshi, sous la station de ski Tetnuldi, pour me rendre à Mestia, mais de faire cette jonction à pied/ski. Sur le papier, près de 30 km et un peu plus de 2000m de D+. À mon grand étonnement (et plaisir), une bonne partie de l'équipe me suit dans ce projet. Après l'ascension d'un sommet sans nom à 3500m qui surplombe l'imposant glacier du Tetnuldi, nous descendons en direction de la station de ski, alors en pleine phase de construction lors de ma première visite en Géorgie en 2014. Les lignes de descente du versant nord, là où a lieu l'étape du Freeride World Tour, sont nombreuses. Kai, le chien qui nous suivait depuis le deuxième jour, nous a abandonnés ici pour un autre groupe de skieurs. La bonne poudreuse de la partie haute se mue en incroyable moquette dans la partie basse de la descente, juste avant que ne commence la bartasse, plutôt gentillette, dans les bushes svanetiens. On rejoint ainsi facilement Zhabeshi où 3 équipes se forment : la team taxi, la team basket&running et la team marche&ski. Nous rejoignons Mestia à la tombée de la nuit. Cette ville subit une mutation “touristique” et se compose de constructions à l'architecture très hétérogène, où se côtoient des hôtels de luxe et des bâtiments faits de bric et de broc. Dans les rues, les gens nous observent comme si nous sortions d'un ailleurs. Sans transition, le repas est gargantuesque, et comme d'habitude, la table se remplit de mets jusqu'à ce que disparaisse la nappe. Je raffole notamment de ces patates frites dans le gras et de ces salades où la coriandre règne en maîtresse du goût.",
          "Il ne fallait pas trop le chauffer. Ayant eu le malheur de parler de chacha à Shako, celui-ci s'éclipse un moment, revenant avec une bouteille du breuvage distillé artisanalement en Svanétie. Ça a beau être artisanal, on le sent passer ! Et pour l'honneur, on termine la bouteille. Mais vient bientôt la proposition d'un traquenard typiquement géorgien : Shako nous propose de faire un “petit tour en ville”, autrement dit, faire excès de chacha… Il nous conduit donc dans un petit bar de la ville, plutôt branché, qui se trouve être également le repère des guides de Mestia. L'un d’eux, qui n'a pourtant pas vraiment le morphotype du guide, nous est rapidement présenté. Le “bear”, comme nous le nommerons pour son physique et son regard de nounours, tient dans sa main une petite corne de biquette qu'il distribue à qui se présente à lui, ayant pris préalablement le soin de la remplir à ras bord du précieux remède translucide. Cette chacha est de sa propre production, elle est aussi chargée que la précédente, mais ne fait sourciller aucun géorgien. La voiture de la police locale, gyro allumés, campe devant le bar, mais cela n'empêche pas un petit groupe de fumer des grandes tiges de marijuana, ou de prendre la voiture garée en face du bar, a priori au-delà de la limite légale des 0g/L. Ici, le rapport aux règles semble plus souple que chez nous ! Mention spéciale à Aurélien qui a raté le premier train et qui nous a rejoint de façon fortuite, ouvrant la porte du premier bar trouvé sur le chemin en sortant de la guest house. Et à Arthur, notre animal de soirée, qui s'est vu infliger un no go par un géorgien, trouvant qu'il s'approchait, pourtant de façon non offensive, d'un groupe de géorgiennes, se faisant comprendre en matérialisant la “red line”.",
        ],
        photos: [photos.groupeCreteTetnuldi, photos.toursSvanesNuit],
      },
      {
        heading: "Mestia - Iskari : à l’ombre de l’Ushba",
        paragraphs: [
          "La “Cloud base hut” est une cabane non-gardée appartenant à Nick, un autre guide de Mestia. En Svanétie, à partir du moment où l'on possède un terrain, que l'on est “d’ici” depuis plusieurs générations et que l'on respecte le style architectural local grâce à l'usage de bois, il est admis de construire sa propre cabane. Shako, qui possède un terrain un peu au-dessus, y réfléchit. Grand ami de Nick, ils avaient organisé une grande beuverie d'inauguration, comme les géorgiens ont le secret, il y a 8 ans, rejoignant alors la cabane en 4x4 sur piste sèche. Sauf qu'il neigea 50cm dans la nuit. Ils mirent alors une journée entière pour parvenir à faire redescendre les voitures… Ce matin, le groupe est silencieux, chacun étant occupé à transpirer les excès de la veille. Le toit caractéristique de la cabane apparaît enfin, le jour le plus long pour certain, le plus court sur la carte.. Des aventuriers de la chacha de la veille, seul Shako semble ne rien subir. Et pourtant, la corne l'a rassasié bien plus souvent que nous ! Il s'affaire à organiser la vie de la cabane et bientôt, à nous cuisiner un festin sur le poêle. La pasta n'est certes pas al dente, mais subtilement relevée à la géorgienne. Ce soir, le cognac local qu’a monté Shako ne rencontre pas beaucoup de succès…",
        ],
        photos: [photos.villageFaceMontagnes, photos.chaletNeigeMontagne],
      },
      {
        paragraphs: [
          "5h, le réveil met en branle la maisonnée. Shako nous a encore préparé un festin : grosse omelette arrangée et porridge. À peine sortis de la cabane, nous distinguons une bestiole courir au loin, la première du voyage. Wolf ou fox ? Shako mise sur la première hypothèse. Le lever de soleil face à l’imposante face Est de l’Ushba est fantastique. De l'autre côté, la chaîne du Leïla Peak me donne quelques idées pour une prochaine visite ici. La descente du Chaalali glacier est décevante : depuis les premiers jours, la neige a commencé sa métamorphose avec sa petite croûte de regel assez déstabilisante. On se rattrape sur la moquette de la face SE, particulièrement bonne et propice aux grandes courbes à pleine vitesse ! Le temps du déjeuner, la neige est devenue collante et profonde. À présent, on perd de l'altitude plus que l'on ne skie, et tout cela se terminera en marchant, à travers les rues boueuses du petit hameau du Mazeri. Nous croisons des bœufs tirant une petite remorque remplie de fumier, un couple s'affairant à dresser les bestiaux tout en répartissant équitablement le contenu dans des sillons préalablement creusés. Nous passons également devant la “Mazeri ski resort”, un petit téléski pour les “gamins” du village. Le grand hôtel Ushba, notre lieu de repos pour la nuit, a été dessiné par Shako dans le cadre de son projet de fin d'étude : avant d'être guide UIAGM, Shako a été ingénieur en génie civil.",
        ],
        photos: [photos.heroAlpenglow, photos.skieurCreteNeige],
      },
      {
        paragraphs: [
          "Il faut s'y résoudre, nous arrivons au terme de cette incroyable aventure. Il nous reste une étape pour rejoindre notre ultime village : Iskari et achever un bel itinéraire traversant de part en part la haute-Svanétie. Une longue étape pour rejoindre le Mt Bak. Dans la forêt au-dessus de Mazeri, nous suivons d'anciennes traces de ski, et bientôt d'énormes marques dans la neige : cette fois-ci, pas de doute sur l’animal qui est passé par là, nous sommes nez à nez avec des traces d'ours. Shako en a déjà vu plusieurs fois, dont récemment au camp de base du Leïla Peak, sommet phare de la chaîne de montagne qui dresse le décor du sud de la vallée que nous “descendons” depuis 7 jours. D'ailleurs, cette chaîne, je la reluque depuis que l'on est parti, avec la folle envie de la traverser à ski un jour. Nous sortons bientôt du bois. Ça y est, c'est le printemps. Je remplace le pantalon de ski par le short. L'accès au col Bok est bien plus long que ce que j'imaginais. Tout d'un coup, deux beaux coqs de bruyère que l'on entendait depuis un moment prennent leur envol. Bien que protégés, ces animaux sont braconnés en Svanétie. Cette dernière montée éprouve encore des organismes déjà bien sollicités ces derniers jours, même si à présent ils sont mieux habitués à l'effort au long cours. Une photo collective au sommet du mont Bok puis nous engageons de grandes courbes dans ses larges pentes sud. La neige devient de plus en plus molle, et nous devons bientôt batailler avec les bushes avant de nous retrouver dans des prés parsemés de taches de neige, à présent minoritaires. Les plus téméraires se préparent au “ski de demain”, parfois fatal pour les carres. Et à un moment, il faut se résoudre à changer de tenue.",
          "Après avoir traversé la rue en terre battue traversant le petit village d’Iskari, nous arrivons dans une cour intérieure où l’on vient de faire usage d’une scierie mobile qui n'est pas de la première jeunesse. Il manque des dents à la lame et il n'y a évidemment aucune protection. D'ailleurs, notre hôte a un doigt enveloppé d'un gros pansement, et lorsque je lui demande la cause de cette blessure, il pointe la scie du doigt. Ils s'affairent à nettoyer la sciure méticuleusement. Ensuite, les vaches sont rentrées dans une étable particulièrement bien tenue. Au cours de l’arpentage des lieux, nous tombons sur une pièce en terre battue réchauffée par le ronronnement d'une petite dizaine de serveurs. Notre hôte, paysan comme tout le monde dans ces petits villages reculés, mine des bitcoins. Ces gens n'auront pas fini de nous surprendre dans leur ingéniosité et leur débrouillardise, derrière une image que l'on pourrait trop rapidement leur coller. Ici, tout est bien propre et bien tenu. L'unique douche est bien chaude. Les femmes sont très discrètes et peu (ou pas) souriantes. En revanche, la malice se lit dans les yeux de notre hôte, qui ne tarde pas à nous ramener une première bouteille de chacha arrangée, mi cognac mi chacha, à la suite du déjeuner de bienvenue qu'il nous offre à notre arrivée. Le déjeuner autant que la chacha sont des totems de l'accueil svanetienne et pour aucune raison ils ne se refuseraient. Sauf qu'il n'est que 15h, et qu'au rythme où les verres se vident puis se remplissent à nouveau, soit la chacha va arriver rapidement à court de stock, soit c'est notre capacité à éponger l'alcool qui va faire défaut. Évidemment, il n'y a jamais de pénurie de chacha… Notre hôte, qui a subi récemment une opération, est (soi-disant) interdit d'alcool, mais il semble éprouver un malin plaisir à nous faire boire par procuration !",
          "Après sept jours à partager le quotidien de cette folle aventure, et de découvrir progressivement cet homme à l’abord discret, il nous faut nous rendre à l'évidence qu'il nous faut saluer notre guide local, fin connaisseur de ses montagnes et des traditions. L'émotion est palpable et elle est partagée. Mais rapidement, l'appel de la chacha reprend le dessus : la bouteille de chacha arrangée est terminée, place à présent aux pichets de chacha pure. L'état de mes compagnons flanche vite, quant à moi, qui n'ai pas envie de récidiver l'expérience de Mestia, je n’honore qu’avec mesure la générosité sans mesure, elle, de notre hôte. À table, l'ambiance est joyeuse, et Arthur en bon capitaine de soirée nous anime le repas d’un one man show dont lui seul a le secret…",
        ],
        photos: [photos.monteeCol, photos.repasFinal],
      },
    ],
    sourceNote: {
      text: "Ce récit a été initialement publié dans Alpine Mag.",
      linkLabel: "Lire l'article original",
      href: "https://alpinemag.fr/georgie-haute-route-haute-svanetie-ski-randonnee-yann-borgnet/",
    },
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

// Grande photo d'ouverture de la page listing des carnets (/carnets-de-voyage-ski/).
// Sommet en alpenglow avec ligne d'horizon nette ; différente de indexCover
// (heroAlpenglow, carte Géorgie) pour ne pas afficher deux fois la même image
// sur la page. Cadrage vérifié en bandeau desktop (2,35:1) et mobile (portrait).
export const indexHeroPhoto = { ...photos.alpenglowSommets, position: "50% 40%" };
