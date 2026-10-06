import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { argentera2024Photos } from "../photos/argentera-2024";

/**
 * Segment 2 de la "Traversée des Alpes" (projet en plusieurs segments sur
 * 20 ans — voir src/data/carnets/alpesLigures.ts, segment 1). Confirmé par
 * recoupement GPX : la trace de ce carnet commence à Limonetto (Limone
 * Piemonte, 44.1585,7.5603) et se termine à Roviera (Vinadio, 44.2822,
 * 7.1438) — exactement la route "Limone Piemonte → Vinadio" déjà annoncée
 * dans le lien de clôture d'alpesLigures.ts, qui pointait par erreur vers
 * le carnet argentera.ts existant (2026, Entracque → Sant'Anna di Valdieri
 * — un massif voisin mais un itinéraire différent, une autre année). Ce
 * lien est corrigé dans alpesLigures.ts pour pointer ici.
 *
 * PHOTOS (28/09/2026) : 46 JPEG + 1 GPX fournis par l'utilisateur dans
 * public/photos/Argentera-2024/ (dossier renommé depuis "TravAlpes#2", le
 * "#" cassant le chargement — voir alpesLigures.ts). AUCUN EXIF dans les
 * fichiers (export "SEO web" strippé) : seules 11/46 photos sont datables
 * (horodatage dans le NOM de fichier), les 35 autres (DSCxxxxx) vont au
 * portfolio sans jour assigné — voir src/data/photos/argentera-2024.ts.
 * 8 photos étaient pivotées à 90° (flag EXIF perdu) : corrigées en place
 * après vérification visuelle et confirmation explicite de l'utilisateur.
 *
 * GPX ORIGINAL fourni par l'utilisateur (31692 points horodatés,
 * 18-22/03/2024) — archivé tel quel dans
 * data/gpx-sources/argentera-2024.original.gpx (copie identique conservée
 * dans public/photos/Argentera-2024/trace-gpx-originale.gpx, telle que
 * livrée). La trace affichée sur la carte (/gpx/argentera-2024.gpx) est une
 * version dérivée simplifiée (RDP, voir scripts/gpx-derive-argentera.ts),
 * jamais utilisée pour les calculs de distance/D+/D- ci-dessous. Découpage en 5 jours par coupures temporelles nettes
 * (`segmentDays`, minHours=3, confident=true), D+/D- lissés (fenêtre 9
 * points, seuil 2 m — trace dense ~6300 pts/jour, mêmes réglages que
 * Bernina/Argentera 2026). Étapes nommées par les hameaux/gias confirmés à
 * chaque jonction de jour (écart <1 km au point GPX réel, reverse-géocodage
 * OSM) : Limone Piemonte, Entracque, Canale Saint Robert, Gias delle
 * Mosche (Valdieri), Gias della Paur (Vinadio), Roviera (Vinadio).
 *
 * TOPONYMIE — seuls deux cols de altitude sont CONFIRMÉS par un point GPX
 * exact (écart <50 m) : Bassa del Claus (2807 m, point haut J3) et Colle
 * Aver (2773 m, point haut J5). Le reste des passages intermédiaires n'a
 * pas été vérifié Camptocamp/Skitour col par col (zone alpine, croisement
 * requis par docs/gpx-methodology.md mais non fait faute de temps dans
 * cette passe) : le texte de chaque jour reste donc volontairement général
 * sur ces passages plutôt que de nommer un col non confirmé — À VALIDER.
 *
 * RÉCIT : texte complet fourni par Yann (brief carnets), repris mot pour mot
 * (fautes manifestes corrigées) ; photos datables de chaque journée en regard
 * (CarnetStoryFlow).
 */

const IMG = "/photos/Argentera-2024/";

const photo = (file: string): CarnetPhoto => {
  const meta = argentera2024Photos[file];
  return { src: `${IMG}${file}`, alt: meta.alt, width: meta.width, height: meta.height, caption: meta.caption };
};

const photos = {
  selfieGroupeMinibus: photo("ski-randonnee-traversees-alpes-italie-20240318-091016.jpg"),
  helicoptereNeige: photo("ski-randonnee-traversees-alpes-italie-20240319-112733.jpg"),
  entrainementDvaFosse: photo("ski-randonnee-traversees-alpes-italie-20240319-173245.jpg"),
  rechercheDvaPelle: photo("ski-randonnee-traversees-alpes-italie-20240319-174506.jpg"),
  melezesMontagneEnneigee: photo("ski-randonnee-traversees-alpes-italie-20240320-165749.jpg"),
  sommetEntreMelezes: photo("ski-randonnee-traversees-alpes-italie-20240320-165754.jpg"),
  detenteAuRefuge: photo("ski-randonnee-traversees-alpes-italie-20240320-181555.jpg"),
  charcuterieAuRefuge: photo("ski-randonnee-traversees-alpes-italie-20240320-193035.jpg"),
  groupeSommetSkis: photo("ski-randonnee-traversees-alpes-italie-20240322-112052.jpg"),
  provisionsVinVinadio: photo("ski-randonnee-traversees-alpes-italie-20240322-134515.jpg"),
  dinerClotureVinadio: photo("ski-randonnee-traversees-alpes-italie-20240322-135658.jpg"),
  transfertRoutier: photo("ski-randonnee-traversees-alpes-italie-dsc08964.jpg"),
  skieurSolitairePente: photo("ski-randonnee-traversees-alpes-italie-dsc09001.jpg"),
  ascensionSommetRocheux: photo("ski-randonnee-traversees-alpes-italie-dsc09008-2.jpg"),
  groupeFileCrete: photo("ski-randonnee-traversees-alpes-italie-dsc09097.jpg"),
  descentePenteSoutenue: photo("ski-randonnee-traversees-alpes-italie-dsc09108-1.jpg"),
  progressionVersCol: photo("ski-randonnee-traversees-alpes-italie-dsc09110-1.jpg"),
  monteeSousParoi: photo("ski-randonnee-traversees-alpes-italie-dsc09117-1.jpg"),
  traverseeVallon: photo("ski-randonnee-traversees-alpes-italie-dsc09137-1.jpg"),
  areteCoucherSoleil: photo("ski-randonnee-traversees-alpes-italie-dsc09175.jpg"),
  panoramaDepuisCrete: photo("ski-randonnee-traversees-alpes-italie-dsc09218-1.jpg"),
  sommetIsoleCrepuscule: photo("ski-randonnee-traversees-alpes-italie-dsc09220.jpg"),
  veilleeRefugeFrontale: photo("ski-randonnee-traversees-alpes-italie-dsc09254.jpg"),
  veilleeRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc09327.jpg"),
  portraitAuRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc09339.jpg"),
  arriveeAuRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc09348.jpg"),
  progressionFileCielBleu: photo("ski-randonnee-traversees-alpes-italie-dsc09349-1.jpg"),
  monteeEnConversion: photo("ski-randonnee-traversees-alpes-italie-dsc09373.jpg"),
  progressionVersSommet: photo("ski-randonnee-traversees-alpes-italie-dsc09421-1.jpg"),
  refugePierreNeige: photo("ski-randonnee-traversees-alpes-italie-dsc09449-1.jpg"),
  traverseeVallonDeux: photo("ski-randonnee-traversees-alpes-italie-dsc09507.jpg"),
  panoramaChaineSommets: photo("ski-randonnee-traversees-alpes-italie-dsc09530.jpg"),
  progressionCielNuageux: photo("ski-randonnee-traversees-alpes-italie-dsc09543-1.jpg"),
  tracesMonteeGlacier: photo("ski-randonnee-traversees-alpes-italie-dsc09548-1.jpg"),
  vuePlongeanteVallee: photo("ski-randonnee-traversees-alpes-italie-dsc09575.jpg"),
  sommetDominantVallon: photo("ski-randonnee-traversees-alpes-italie-dsc09618-1.jpg"),
  descenteSolitaire: photo("ski-randonnee-traversees-alpes-italie-dsc09646-1.jpg"),
  faceCirqueEnneige: photo("ski-randonnee-traversees-alpes-italie-dsc09720.jpg"),
  refugeIsoleCielBleu: photo("ski-randonnee-traversees-alpes-italie-dsc09764-1.jpg"),
  monteeVersCol: photo("ski-randonnee-traversees-alpes-italie-dsc09775.jpg"),
  panoramaCretesFrontalieres: photo("ski-randonnee-traversees-alpes-italie-dsc09845.jpg"),
  sousSommetPointu: photo("ski-randonnee-traversees-alpes-italie-dsc09888.jpg"),
  seulDansCombe: photo("ski-randonnee-traversees-alpes-italie-dsc09899.jpg"),
  largePanoramaMontagneux: photo("ski-randonnee-traversees-alpes-italie-dsc09901.jpg"),
  degustationVinRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc09916.jpg"),
  descenteCouloirRocheux: photo("ski-randonnee-traversees-alpes-italie-dsc09958-1.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. De Limone Piemonte à Vinadio.",
  intro:
    "Deuxième segment de la traversée des Alpes en plusieurs étapes : depuis Limone Piemonte, une itinérance à ski vers l'Argentera, jusqu'à Vinadio.",
  days: [
    {
      dayNum: "J1",
      title: "Limone Piemonte → Entracque",
      text: "Départ de Limone Piemonte, entrée dans le versant italien du massif en direction d'Entracque.",
      distanceKm: 13.6,
      ascentM: 1070,
      descentM: 640,
      elevationMin: 1810,
      elevationMax: 2420,
    },
    {
      dayNum: "J2",
      title: "Entracque → Canale Saint Robert",
      text: "Depuis Entracque, montée dans les vallons d'altitude du massif jusqu'au secteur du Canale Saint Robert, avec une séance d'entraînement DVA en cours de route.",
      distanceKm: 12.4,
      ascentM: 1320,
      descentM: 890,
      elevationMin: 2270,
      elevationMax: 2720,
    },
    {
      dayNum: "J3",
      title: "Canale Saint Robert → Gias delle Mosche",
      via: ["Bassa del Claus"],
      text: "Longue étape par la Bassa del Claus (2807 m), point culminant de la journée, avant de rejoindre le secteur de Gias delle Mosche, sur la commune de Valdieri.",
      distanceKm: 22.4,
      ascentM: 1490,
      descentM: 2850,
      elevationMin: 1350,
      elevationMax: 2810,
    },
    {
      dayNum: "J4",
      title: "Gias delle Mosche → Gias della Paur",
      text: "Traversée vers le versant de Vinadio, jusqu'au secteur de Gias della Paur.",
      distanceKm: 12.4,
      ascentM: 1210,
      descentM: 760,
      elevationMin: 1370,
      elevationMax: 2530,
    },
    {
      dayNum: "J5",
      title: "Gias della Paur → Vinadio",
      via: ["Colle Aver"],
      text: "Dernière étape par le Colle Aver (2773 m), puis descente vers Roviera, sur la commune de Vinadio, où se termine ce deuxième segment.",
      distanceKm: 15.3,
      ascentM: 1170,
      descentM: 1800,
      elevationMin: 1200,
      elevationMax: 2770,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Du 18 au 22 mars 2024";

export const argentera2024: Carnet = {
  slug: "argentera-2024-traversee-ski-randonnee",
  seo: {
    title: "Argentera à ski 2024 : traversée de Limone Piemonte à Vinadio",
    description:
      "Cinq jours de traversée à ski dans le massif de l'Argentera, de Limone Piemonte à Vinadio — deuxième segment de la traversée des Alpes en plusieurs étapes.",
    ogImage: photos.areteCoucherSoleil.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "GRANDE TRAVERSÉE DES ALPES À SKI",
    subtitle: "Segment #2 : Argentera",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.areteCoucherSoleil,
  intro: {
    heading: "Deuxième segment de la traversée des Alpes",
    paragraphs: [
      "Deux jours après l'arrivée à Garessio 2000, départ pour la suite de la traversée des Alpes en plusieurs segments : direction l'Argentera, versant italien du massif frontalier entre Piémont et Alpes-Maritimes.",
      "Cinq jours de ski entre Limone Piemonte et Vinadio, en passant par Entracque et le secteur de Valdieri, avec des nuits en refuge et gias d'altitude.",
    ],
    photo: photos.sommetDominantVallon,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Projet", value: "Traversée des Alpes — segment 2" },
      { label: "Pays", value: "Italie" },
      { label: "Massif", value: "Argentera" },
      { label: "Départ", value: "Limone Piemonte" },
      { label: "Arrivée", value: "Vinadio" },
      { label: "Forme du raid", value: "Traversée de massif — voyage à ski en itinérance" },
      { label: "Hébergements", value: "Refuges et gias d'altitude" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Limone Piemonte → Vinadio",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/argentera-2024.gpx",
    // Positions = premier/dernier point de chaque segment du GPX (fins d'étape), noms repris des titres de journée.
    markers: [
      { name: "Limone Piemonte", lat: 44.158464, lon: 7.560323 },
      { name: "Entracque", lat: 44.131056, lon: 7.466456, direction: "top" },
      { name: "Canale Saint Robert", lat: 44.130885, lon: 7.389358, direction: "left" },
      { name: "Gias delle Mosche", lat: 44.206638, lon: 7.271104, direction: "top" },
      { name: "Gias della Paur", lat: 44.220198, lon: 7.184533, direction: "left" },
      { name: "Vinadio", lat: 44.282151, lon: 7.143812 },
    ],
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    title: "Le deuxième segment",
    standfirst: "17-21 (Demi)-traversée de l’Argentera, de Limone Piemonte à Vinadio.",
    // Récit complet fourni par Yann (brief carnets) ; photos datables de chaque
    // journée en regard du passage correspondant (J4 : aucune photo datable).
    sections: [
      {
        paragraphs: [
          "Après notre fantastique chevauchée dans les Alpes Ligures, jusqu’aux confins des Alpes, je me retrouve seul à Vinadio, avec la lourde charge de rendre mon manuscrit de thèse.  Après 7 années où “Thérèse” a été une obsession quotidienne, Vinadio et son Caffè della Piazza ont été mon dernier port, ultime bureau éphémère.",
          "Le soir, une bonne équipe me rejoint, avec pour projet d’initier une traversée des Alpes sur plusieurs années. Pour la première étape, nous avons projeté une demi traversée du massif de l’Argentera. De longues étapes nous attendent, à la fois en termes de dénivelé et de distance. Et il y eut quelques péripéties !",
        ],
      },
      {
        heading: `J1 ${itinerary.days[0].title}`,
        paragraphs: [
          "Le premier soir, après une belle étape dans les forêts de pins et de mélèzes, nous arrivons de nuit dans une cabane que je n’aurais pas de mal à classer parmi les plus rustiques visitées cet hiver. Les murs en béton, déjà humides avant notre passage, n’ont pas été arrangés par celui-ci. Les lits sont superposés, à trois étages, équipés de sommiers à ressorts. Les couvertures sont rationnées : une douce et confortable et une rustique par personne. Heureusement, nous y arrivons tard et nous avons prévu de la quitter aux aurores. La nuit est fraîche.",
        ],
        photos: [photos.selfieGroupeMinibus, photos.helicoptereNeige],
      },
      {
        heading: `J2 ${itinerary.days[1].title}`,
        paragraphs: [
          "Le deuxième jour, Sylvain doit nous quitter subitement, à la suite d’une mauvaise chute la veille qui n’a pas laissé sa cuisse indemne. Pour la troisième fois de ma carrière, je suis contraint d’appeler les secours transalpins. L’hélicoptère tardera à arriver, et nous ne sommes pas en avance pour terminer notre étape. Une belle pente ouest nous attend, raide à souhait, avec un petit passage de dry skiing pour en sortir. Cette pente était une zone d’ombre de ma préparation, et on s’en sort bien, sans avoir besoin de redescendre trop bas. Une autre pente me préoccupe : nous devons monter assez haut en direction du refuge Pagari pour parvenir par gravité à un petit passage exposé, que j’aimerais pouvoir franchir à la descente. Ça passe sans problème ! Il nous reste une dernière montée pour arriver à notre seconde cabane. Sauf qu’une fois arrivés au point où nous devrions la voir, il n’y a rien. Seulement une raide pente de neige.",
          "Je me remémore alors cette expérience du petit bivouac Blais, situé juste sous la crête de la frontière franco-italienne, où pendant la nuit le vent avait apporté près d’un mètre de neige devant la porte, nous obligeant à redoubler d’ingéniosité pour ouvrir la porte de l’intérieur. La configuration de ce bivouac est identique, situé sous une crête. J’avais eu la bonne idée d’enregistrer les cartes aériennes de la zone où le bivouac est bien visible. Il m’a suffi de quelques coups de sonde pour identifier l’emplacement de la porte. Et après une petite heure de pelletage, l’entrée du bivouac est dégagée ! Ce qui est certain, c’est que nous n’avons pas eu froid cette nuit-là.",
        ],
        photos: [photos.entrainementDvaFosse, photos.rechercheDvaPelle],
      },
      {
        heading: `J3 ${itinerary.days[2].title}`,
        paragraphs: [
          "Le lendemain, c’est Roland qui ne se sent pas bien, encore sous antibio après une mauvaise bronchite. Il me faut organiser son rapatriement, cette fois-ci sans hélicoptère car il n’était pas empêché pour skier à la descente. S’en est suivi une journée interminable, alourdie par la chaleur. Il y eut encore l’épisode du lac de barrage, qu’il nous fallait bien traverser. Loupant le petit tunnel du chemin d’été, en partie obstrué par la neige, on s’est retrouvé à faire de l’urban ski-mountaineering le long d’une imposante structure de béton… puis il y a eu enfin ce chemin à descendre pour arriver aux thermes de Valdieri. Il n’en fallait pas moins pour skier.",
          "Valdieri, Casa Savoia, enfin, on va manger autre chose que des Rana, enfin on peut épancher notre soif d’une grande bière et se délecter de bons vins piémontais. Alors que la soirée était aussi mollassonne que notre fatigue, elle a subitement été relancée lorsque quatre italiennes sont entrées dans le refuge, de façon tout à fait improbable, tirées des entrailles de la nuit noire.",
        ],
        photos: [photos.melezesMontagneEnneigee, photos.detenteAuRefuge],
      },
      {
        heading: `J4 ${itinerary.days[3].title}`,
        paragraphs: [
          "Refuge Valasco, on profite d’une petite pause boisson, au cœur de la canicule printanière. Refuge étrange, tout droit sorti d’un conte de fées ou bien un reste du tournage d’un film fantastique. Je profite du wifi pour caler un énième changement de plan météo pour le week-end qui arrive. Ce n’est pas mince affaire de trouver un refuge pour 12, un samedi soir du mois de mars. Dans la montée qui suit, nous croisons enfin des skieurs. C’est Claude, un guide suisse à qui j’ai conseillé il y a quelques jours de venir dans le coin.",
          "Refuge Malinvern, perché là-haut sur son promontoire. Le local d’hiver, également haut perché, jouit d’une vue magnifique sur la vallée.",
        ],
      },
      {
        heading: `J5 ${itinerary.days[4].title}`,
        paragraphs: [
          "La dernière étape remplit toutes ses promesses : le paysage est ouvert et de nouveau clairsemé de petits mélèzes. Nous décidons de monter jusqu’à la Cima Gias dei Laghi, notamment pour voir la suite de notre traversée. L’an prochain, nous essayerons de dormir à l’imposant hospice de Sant’Anna. On a du mal à partir tant la vue est prenante. Encore une bonne descente abritée du soleil, avant de retrouver Sylvain là où la neige ne recouvre plus la route.",
          "Cette demi-traversée de l’Argentera a rempli toutes ses promesses. De belles et longues étapes, des paysages très variés, des cabanes rustiques et parfois joueuses, des descentes restées froides et parfois devenues très molles. Des rencontres aussi, avec les gardiens de Valdieri, avec des coqs de bruyères et des dizaines de chamois.",
        ],
        photos: [photos.groupeSommetSkis, photos.dinerClotureVinadio],
      },
      {
        heading: "Parcours",
        paragraphs: [
          "J1 : sommet du télésiège “Colle di Tenda” - Asile Arnaldi - crête de la Cima del Sabbione - Bivacco Sperenza.",
          "J2 : col à l’ouest de la Cima della Scandeiera - lac de l’Agnel - passo dell’agnello - traversée sur le flanc nord de la Cima de Peïrabroc - refuge Pagari - bivouac Moncalieri bien caché !",
          "J3 : passaggio dei Ghiacchiai del Gelas - Rifugio Soria Elena - Colle delle Fenestrelle - Lago dei Chiotas - passo del Chiapous - Terme di Valdieri",
          "J4 : rifugio Valasco - Coletto di Valscura - rifugio Malinvern",
          "J5 : Testa Gias dei Laghi - valone di Sant’Anna - Vinadio.",
        ],
      },
    ],
    closingLinks: [
      { label: "← Étape 1 de la traversée des Alpes en segments : les Alpes Ligures, de Limone Piemonte à Garessio 2000", href: "/alpes-ligures-traversee-ski-randonnee/" },
      { label: "Étape 3 de la traversée des Alpes en segments : de Vinadio à Pontechianale →", href: "/argentera-2025-traversee-ski-randonnee/" },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "GRANDE TRAVERSÉE DES ALPES À SKI",
    subtitle: "Segment #2 : Argentera",
    meta: "Du 18 au 22 mars 2024 · 5 jours de traversée à ski, de Limone Piemonte à Vinadio · Photos : Yann Borgnet",
    photos: [
      // --- visibles au chargement ---
      photos.areteCoucherSoleil,
      photos.groupeSommetSkis,
      photos.sommetDominantVallon,
      photos.refugeIsoleCielBleu,
      photos.panoramaChaineSommets,
      photos.faceCirqueEnneige,
      photos.sommetIsoleCrepuscule,
      photos.progressionFileCielBleu,
      photos.melezesMontagneEnneigee,
      photos.charcuterieAuRefuge,
      photos.veilleeRefugeFrontale,
      photos.degustationVinRefuge,
      photos.descenteCouloirRocheux,
      photos.groupeFileCrete,
      photos.panoramaCretesFrontalieres,
      photos.provisionsVinVinadio,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.selfieGroupeMinibus,
      photos.helicoptereNeige,
      photos.entrainementDvaFosse,
      photos.rechercheDvaPelle,
      photos.sommetEntreMelezes,
      photos.detenteAuRefuge,
      photos.dinerClotureVinadio,
      photos.transfertRoutier,
      photos.skieurSolitairePente,
      photos.ascensionSommetRocheux,
      photos.descentePenteSoutenue,
      photos.progressionVersCol,
      photos.monteeSousParoi,
      photos.traverseeVallon,
      photos.panoramaDepuisCrete,
      photos.veilleeRefuge,
      photos.portraitAuRefuge,
      photos.arriveeAuRefuge,
      photos.monteeEnConversion,
      photos.progressionVersSommet,
      photos.refugePierreNeige,
      photos.traverseeVallonDeux,
      photos.progressionCielNuageux,
      photos.tracesMonteeGlacier,
      photos.vuePlongeanteVallee,
      photos.descenteSolitaire,
      photos.monteeVersCol,
      photos.sousSommetPointu,
      photos.seulDansCombe,
      photos.largePanoramaMontagneux,
    ],
    initialPortfolioCount: 16,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

export const indexCover = photos.areteCoucherSoleil;
