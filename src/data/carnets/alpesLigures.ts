import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { liguresPhotos } from "../photos/alpes-ligures-2024";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/alpes-ligures-traversee-ski-randonnee/
 * (déjà mentionné comme carnet à publier dans src/data/carnets/index.ts —
 * "n'existe pas encore" y était vrai côté Astro, mais la page WordPress,
 * elle, existe bien et est reprise ici).
 *
 * Ce carnet est présenté sur WordPress comme le "segment 1" d'un projet plus
 * large ("Traversée des Alpes") — voir le champ Informations "Projet" et
 * l'eyebrow d'origine "Traversée des Alpes · segment 1" (repris tel quel).
 *
 * PHOTOS (18/09/2026) : passe photo faite à partir des 59 JPEG fournis par
 * Yann (EXIF complets, noms SEO définitifs, localisation croisée GPX),
 * déposés à l'origine dans public/photos/TravAlpes#1/, renommé en
 * "Alpes Ligures" (le "#" dans un nom de dossier casse le chargement des
 * images — confirmé en dev ET en preview build, pas juste un artefact du
 * serveur de dev — voir aussi TravAlpes#2/#3, vides pour l'instant mais à
 * renommer avant d'y stocker de vraies photos). Métadonnées (ALT, légende,
 * localisation, certitude GPX) dérivées telles quelles de
 * src/data/photos/alpes-ligures-2024.ts — jamais réécrites à la main.
 * Répartition par jour confirmée sur DateTimeOriginal (jamais sur les
 * numéros de fichier, les deux séries — téléphone 001-015 et DSC 031-074 —
 * étant entrelacées chronologiquement) : J1 = 2, J2 = 13, J3 = 11, J4 = 21,
 * J5 = 12. Aucune photo du prologue 2023 (tentative avortée + rebond Val
 * d'Aoste) : ce dossier ne couvre que la traversée 2024 réalisée.
 *
 * GPX ORIGINAL fourni par l'utilisateur le 16/09/2026 (20607 points
 * horodatés, 12-16/03/2024) — voir
 * data/gpx-sources/alpes-ligures-traversee-2024.original.gpx. Découpage en
 * 5 jours basé sur les 4 seules coupures temporelles > 2h30 de toute la
 * trace (13.0 à 16.2h, confiance CONFIRMÉ), qui correspondent aux 5 jours
 * annoncés par WordPress. D+/D- lissés (fenêtre 9 points, seuil 2 m) sur les
 * altitudes <ele> réelles ; distance géodésique point à point. Recoupement
 * fort : l'altitude max de J1 (2240 m) et J2 (2660 m) correspondent presque
 * exactement aux sommets cités dans le texte (Cima del Becco ~2229 m, Cima
 * Marguareis 2651 m — point culminant des Alpes ligures).
 *
 * À VALIDER — les distances par jour recalculées sont mesurablement plus
 * courtes que celles déjà publiées par WordPress sur 2 des 5 jours (J2 :
 * 8,4 km recalculés contre 9,6 km publiés ; J5 : 17,2 km contre 20,7 km),
 * l'écart total atteignant ~8 %. Les repères de sommets (voir ci-dessus)
 * confirment que le découpage par jour est correct ; l'écart vient donc
 * plus probablement de portions non enregistrées par le GPS (passages
 * techniques, ex. « désescalade dans la cascade » au J1/J2 du récit) que
 * d'une erreur de découpage. Valeurs ci-dessous = calcul direct sur le GPX
 * (même méthode que Bernina/Argentera/Grèce), donc les plus fiables
 * disponibles ; à confirmer si une précision absolue est nécessaire. Le
 * texte de chaque étape reste la simple chaîne de sommets/cols séparés par
 * des tirets déjà publiée par WordPress (pas une phrase rédigée) : conservé
 * verbatim, sans reformulation.
 *
 * RÉCIT (18/09/2026) : reconstruit à partir de DEUX sources, jamais
 * mélangées sans le dire :
 *  1. Texte source fourni par Yann en conversation (Google Doc, prologue
 *     2023 détaillé + confirmation/transition 2024) — édité a minima
 *     (coquilles, typographie), voir liste des corrections ci-dessous.
 *  2. Les deux paragraphes "Tout a été incroyable... / Et surtout : la
 *     solitude..." pour la traversée 2024 elle-même : PAS du nouveau texte,
 *     déjà présents dans ce fichier depuis la reprise WordPress d'origine
 *     (voir tout en haut de ce commentaire) — donc bien "le texte source
 *     2024" de Yann, seulement déjà publié plutôt que retrouvé dans le
 *     Google Doc. Conservés tels quels.
 *
 * SENS DE LA TRAVERSÉE CONFIRMÉ : 2023 était planifié Garessio → Limone (cf.
 * prologue, "les Alpes Ligures de Garessio à Limone") ; 2024 a été réalisé
 * dans le sens INVERSE, Limone → Garessio 2000 (cf. intro déjà existante
 * "j'inverse le sens de la traversée", et la citation de clôture "mon
 * arrivée à Garessio 2000 après une fantastique chevauchée"). Les deux
 * traversées ne sont donc pas dans le même sens — jamais confondu ci-dessous.
 *
 * CORRECTIONS APPLIQUÉES AU TEXTE SOURCE (typographie/coquilles seulement,
 * rien de reformulé) : "à 4h" → "à 4 h", "retour d'est" → "retour d'Est"
 * (cohérence avec le titre "Foutu retour d'Est !"), "valdotain" →
 * "valdôtain", bivouac nommé "Cosimo Zappelli" (confirmé par Yann — la
 * citation d'Étienne, déjà dans ce fichier, l'appelait "cabane Zappelli"),
 * durée du projet "Traversée des Alpes" harmonisée à 20 ans partout (le
 * texte 2024 source disait "15 prochaines années" — Yann confirme qu'il
 * faut garder 20 ans, chiffre du texte 2023).
 *
 * GAP NON COMBLÉ (volontairement) : le détail jour par jour de la
 * traversée 2024 (anecdotes par étape, au niveau du prologue 2023) reste
 * introuvable dans les extraits du Google Doc fournis par Yann — SEULS les
 * deux paragraphes WordPress ci-dessus existent comme texte 2024. Repères
 * pour une future recherche dans le Doc : "Don Barbera", "Marguareis",
 * "Saracco Volante", "Mondovì", "Mongioie", "Caravero", "Manolino" (noms
 * validés par le GPX, voir itinerary ci-dessous). Pas de placeholder
 * "[À COMPLÉTER]" affiché sur la page publiée (le carnet est déjà
 * `published: true`) : le récit reste simplement plus court sur cette
 * partie plutôt que rempli d'un texte inventé.
 *
 * LIENS DE CLÔTURE (story.closingLinks, nouveau champ — voir
 * src/data/carnets/types.ts et CarnetStory.astro) : le manuscrit de thèse
 * n'a pas d'URL sur ce site (document externe personnel) → placeholder
 * `href: null`, affiché comme texte, jamais un lien inventé. L'étape 2
 * (Argentera) existe déjà et est publiée → lien réel vers
 * "/traversee-ski-argentera-mercantour/".
 */

const IMG = "/photos/Alpes%20Ligures/";

const photo = (file: string): CarnetPhoto => {
  const meta = liguresPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

const photos = {
  // J1
  selfieSurUnTelesiege: photo("italie-alpes-ligures-ski-randonnee-20240312-133757-001.jpg"),
  skisAlignesSurLeTelesiege: photo("italie-alpes-ligures-ski-randonnee-20240312-135229-002.jpg"),
  // J2
  groupeReuniSurUnSommet: photo("italie-alpes-ligures-ski-randonnee-20240313-132851-003.jpg"),
  descenteDansUnePenteSoutenue: photo("italie-alpes-ligures-ski-randonnee-dsc06856-031.jpg"),
  skieurDansUnCouloirEnneige: photo("italie-alpes-ligures-ski-randonnee-dsc06878-1-032.jpg"),
  virageSousLesFalaises: photo("italie-alpes-ligures-ski-randonnee-dsc06941-033.jpg"),
  descenteAuSoleilSousLesBarresRocheuses: photo("italie-alpes-ligures-ski-randonnee-dsc06990-034.jpg"),
  skiSousLesToursCalcaires: photo("italie-alpes-ligures-ski-randonnee-dsc07027-035.jpg"),
  monteeEnConversionVersLeCol: photo("italie-alpes-ligures-ski-randonnee-dsc07139-036.jpg"),
  groupeProgressantDansUnVallon: photo("italie-alpes-ligures-ski-randonnee-dsc07187-037.jpg"),
  traverseeDunVastePlateauBlanc: photo("italie-alpes-ligures-ski-randonnee-dsc07211-038.jpg"),
  petiteCabaneRougeDansLaNeige: photo("italie-alpes-ligures-ski-randonnee-dsc07245-039.jpg"),
  arriveeDuGroupeALaCabane: photo("italie-alpes-ligures-ski-randonnee-dsc07250-040.jpg"),
  soirTombantDerriereLaVitreDuRefuge: photo("italie-alpes-ligures-ski-randonnee-dsc07272-041.jpg"),
  preparationDuDinerDansLaCabane: photo("italie-alpes-ligures-ski-randonnee-dsc07309-1-042.jpg"),
  // J3
  groupeReuniDansLeRefuge: photo("italie-alpes-ligures-ski-randonnee-dsc07333-1-043.jpg"),
  traceSinueuseSurUneCrete: photo("italie-alpes-ligures-ski-randonnee-dsc07427-1-044.jpg"),
  virageEnPoudreuseAuDessusDesVallees: photo("italie-alpes-ligures-ski-randonnee-dsc07471-045.jpg"),
  franchissementDuneCornicheSommitale: photo("italie-alpes-ligures-ski-randonnee-dsc07618-046.jpg"),
  groupeMontantSurUneAreteAerienne: photo("italie-alpes-ligures-ski-randonnee-dsc07657-047.jpg"),
  panoramaSurLesAlpesLigures: photo("italie-alpes-ligures-ski-randonnee-dsc07764-048.jpg"),
  panoramaSurLesReliefsEnneiges: photo("italie-alpes-ligures-ski-randonnee-20240314-155556-004.jpg"),
  deuxSkieursApparaissantDerriereUneBosse: photo("italie-alpes-ligures-ski-randonnee-dsc07771-049.jpg"),
  forteresseRocheuseAuDessusDesNuages: photo("italie-alpes-ligures-ski-randonnee-dsc07812-1-050.jpg"),
  soireeALaLumiereRouge: photo("italie-alpes-ligures-ski-randonnee-dsc07816-1-051.jpg"),
  repasALaFrontaleDansLaCabane: photo("italie-alpes-ligures-ski-randonnee-dsc07839-052.jpg"),
  // J4
  reposDuGroupeSurLesCouchettes: photo("italie-alpes-ligures-ski-randonnee-dsc07848-053.jpg"),
  portraitSouriantAuReveil: photo("italie-alpes-ligures-ski-randonnee-dsc07863-054.jpg"),
  preparationDesVetementsAvantLeDepart: photo("italie-alpes-ligures-ski-randonnee-dsc07875-055.jpg"),
  chapelleIsoleeDansLaNeige: photo("italie-alpes-ligures-ski-randonnee-20240315-073045-005.jpg"),
  skieurAuPiedDuneGrandeParoi: photo("italie-alpes-ligures-ski-randonnee-dsc07920-056.jpg"),
  sommetRocheuxDansLaLumiereMatinale: photo("italie-alpes-ligures-ski-randonnee-dsc07941-057.jpg"),
  groupeMinusculeSousLeSommet: photo("italie-alpes-ligures-ski-randonnee-dsc07957-058.jpg"),
  progressionSurUneNeigeTravailleeParLeVent: photo("italie-alpes-ligures-ski-randonnee-dsc08014-059.jpg"),
  monteeAuBordDuneFalaiseAuDessusDesNuages: photo("italie-alpes-ligures-ski-randonnee-dsc08080-1-060.jpg"),
  valleeAuDessusDuneMerDeNuages: photo("italie-alpes-ligures-ski-randonnee-20240315-114106-006.jpg"),
  versantEscarpeDesAlpesLigures: photo("italie-alpes-ligures-ski-randonnee-20240315-115500-007.jpg"),
  enchainementDeSommetsEnneiges: photo("italie-alpes-ligures-ski-randonnee-20240315-115507-0-008.jpg"),
  descenteDansUneGrandeCombe: photo("italie-alpes-ligures-ski-randonnee-20240315-122851-009.jpg"),
  longueDescenteVersLeVallon: photo("italie-alpes-ligures-ski-randonnee-dsc08262-2-061.jpg"),
  cabanePresqueEnsevelieSousLaNeige: photo("italie-alpes-ligures-ski-randonnee-dsc08283-062.jpg"),
  interieurSimpleDuneCabane: photo("italie-alpes-ligures-ski-randonnee-20240315-153846-010.jpg"),
  pauseAuSoleilEnTenueLegere: photo("italie-alpes-ligures-ski-randonnee-dsc08309-063.jpg"),
  reposDuGroupeDevantLesSkis: photo("italie-alpes-ligures-ski-randonnee-dsc08321-064.jpg"),
  secondePauseAuSoleilDevantLesSommets: photo("italie-alpes-ligures-ski-randonnee-dsc08323-2-065.jpg"),
  preparationDeLitineraireSurLesTelephones: photo("italie-alpes-ligures-ski-randonnee-dsc08377-066.jpg"),
  cabaneEclaireeDansLaNuit: photo("italie-alpes-ligures-ski-randonnee-dsc08397-067.jpg"),
  // J5
  reveilSurLesCouchettesDeLaCabane: photo("italie-alpes-ligures-ski-randonnee-dsc08398-068.jpg"),
  cabaneEtSkisAuxPremieresLueurs: photo("italie-alpes-ligures-ski-randonnee-dsc08400-069.jpg"),
  departDuGroupeAuLeverDuSoleil: photo("italie-alpes-ligures-ski-randonnee-dsc08425-070.jpg"),
  refletDesSommetsDansUneMareDeFonte: photo("italie-alpes-ligures-ski-randonnee-dsc08466-1-071.jpg"),
  areteBlancheEntreLesSommets: photo("italie-alpes-ligures-ski-randonnee-20240316-082944-011.jpg"),
  skieurSolitaireSurUnPlateau: photo("italie-alpes-ligures-ski-randonnee-20240316-102103-012.jpg"),
  descenteEntreLesToursRocheuses: photo("italie-alpes-ligures-ski-randonnee-dsc08859-072.jpg"),
  longueTraverseeDuGroupeSousLesParois: photo("italie-alpes-ligures-ski-randonnee-dsc08910-1-073.jpg"),
  telesiegeFaceAuxMontagnes: photo("italie-alpes-ligures-ski-randonnee-dsc08936-1-074.jpg"),
  passagePresDunPanneauDeStation: photo("italie-alpes-ligures-ski-randonnee-20240316-144230-013.jpg"),
  dejeunerAuSoleilSurUneTerrasse: photo("italie-alpes-ligures-ski-randonnee-20240316-155654-014.jpg"),
  rueDunVillageAlpin: photo("italie-alpes-ligures-ski-randonnee-20240317-120851-015.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. Des Alpes à la Méditerranée.",
  intro:
    "De Limone Piemonte à Garessio 2000, une traversée des Alpes ligures par les sommets, cols et cabanes.",
  days: [
    {
      dayNum: "J1",
      title: "Limone Piemonte → Rifugio Don Barbera",
      text: "Cima del Becco – Vachere de Malabergue – Rifugio Don Barbera.",
      distanceKm: 11.3,
      ascentM: 1000,
      descentM: 980,
      elevationMin: 1600,
      elevationMax: 2240,
    },
    {
      dayNum: "J2",
      title: "Rifugio Don Barbera → Capanna Saracco Volante",
      text: "Passo della Gaina – Cima Marguareis – Colle dei Torinesi et couloir N – Porta Marguareis – Colle del Pas – Capanna Saracco Volante.",
      distanceKm: 8.4,
      ascentM: 1040,
      descentM: 930,
      elevationMin: 1930,
      elevationMax: 2660,
    },
    {
      dayNum: "J3",
      title: "Capanna Saracco Volante → Rifugio Mondovì",
      text: "Cima Pian Ballaur – Monte Ballaur – descente de la pente SE jusqu'à la cote 2100 m – Colle degli Arpetti – Cima delle Saline – Passo delle Saline – Rifugio Mondovì.",
      distanceKm: 11.2,
      ascentM: 1000,
      descentM: 1480,
      elevationMin: 1740,
      elevationMax: 2620,
    },
    {
      dayNum: "J4",
      title: "Rifugio Mondovì → Bivacco Franco Caravero",
      text: "Colle delle Colme Est – Monte Mongioie – Colletto Revelli – Bivacco Franco Caravero.",
      distanceKm: 12.9,
      ascentM: 1340,
      descentM: 930,
      elevationMin: 1730,
      elevationMax: 2640,
    },
    {
      dayNum: "J5",
      title: "Bivacco Franco Caravero → Garessio 2000",
      text: "Cima Ruscarina – Cima Cuaiera – Rifugio Manolino – sommet des pistes de Garessio 2000.",
      distanceKm: 17.2,
      ascentM: 1010,
      descentM: 1940,
      elevationMin: 1300,
      elevationMax: 2260,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données publiées par
// WordPress jour par jour) — jamais recopiés en dur. WordPress ne publie
// d'ailleurs pas de phrase d'agrégat pour ce carnet (pas de champ Distance
// dans son bloc Informations) : les totaux calculés sont donc la SEULE
// source pour la Distance/D+/D- affichés.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Du 12 au 16 mars 2024"; // "5 jours, du 12 au 16 mars 2024" (WordPress)

export const alpesLigures: Carnet = {
  slug: "alpes-ligures-traversee-ski-randonnee",
  seo: {
    title: "Alpes Ligures à ski : traversée de Limone à Garessio",
    description:
      "Cinq jours de traversée à ski dans les Alpes Ligures, de Limone Piemonte à Garessio 2000 : cabanes non gardées, solitude et Méditerranée en ligne de mire.",
    ogImage: photos.panoramaSurLesAlpesLigures.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "ALPES LIGURES",
    subtitle: "Des Alpes à la Méditerranée",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.panoramaSurLesAlpesLigures,
  intro: {
    heading: "Une traversée aux confins des Alpes, entre plaine du Pô et Méditerranée",
    paragraphs: [
      "L'an passé, on s'était cassé les dents. Un puissant retour d'Est avait commencé le premier jour prévu du raid pour se terminer… le dernier. Cette année, les conditions sont presque inverses : neige abondante jusqu'à basse altitude, anticyclone sans vent, lumière limpide. Seul hic, un risque d'avalanche encore annoncé à 4 au départ.",
      "Je décide donc d'inverser le sens de la traversée : Limone Piemonte vers Garessio 2000. Cinq jours entre la plaine du Pô et la Méditerranée, quatre cabanes non gardées, des centaines de chamois et une solitude presque totale. Pas un skieur, pas une trace. Dans les Alpes, c'est chose rare.",
    ],
    photo: photos.petiteCabaneRougeDansLaNeige,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Projet", value: "Traversée des Alpes — segment 1" },
      { label: "Pays", value: "Italie" },
      { label: "Massif", value: "Alpes Ligures" },
      { label: "Départ", value: "Limone Piemonte" },
      { label: "Arrivée", value: "Garessio 2000" },
      { label: "Forme du raid", value: "Traversée de massif — voyage à ski en itinérance" },
      { label: "Hébergements", value: "Refuges et cabanes non gardées" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Limone Piemonte → Garessio 2000",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/alpes-ligures-traversee-2024.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "Prologue — 2023 : « Foutu retour d'Est ! »",
        paragraphs: [
          "Cela faisait des mois que l'on en discutait. Elle m'enthousiasmait. Elle me faisait vibrer et constituait l'acmé d'une saison d'hiver quasi uniquement tournée vers l'itinérance à ski. Commencer une traversée des Alpes en segments, sur 20 ans, avec un groupe de clients que je connais depuis trois ans. La commencer par la plus belle des manières, en traversant un massif méconnu, dernière ou première extrémité des Alpes, les Alpes Ligures de Garessio à Limone.",
          "Tout commençait pourtant pour le mieux. En se retrouvant dans un petit restaurant de Garessio, impatients à l'idée d'engager l'aventure, on ne pensait pas que Gianluca était aussi motivé que nous à faire la fête et à vivre l'instant présent. Tout cela s'est terminé à 4 h du matin, avec une dernière bouteille de Barolo. Voilà ce que l'on était venu chercher. En fait rien de spécial, mais tout ce qui pouvait advenir, surtout si cela n'était pas planifié.",
          "L'issue du lendemain l'était d'ailleurs davantage. On le savait. Tous les modèles l'avaient anticipé, ce retour d'Est. Et de jour en jour, son intensité s'amplifiait. Mais il nous fallait monter à la station de Garessio 2000 pour le constater physiquement. Le but devenait une évidence. Gianluca nous a parlé d'un autre refuge sur le versant sud. Allons voir…",
          "Le vent nous a fait vaciller mais il a laissé notre détermination intacte. Inébranlable, même en découvrant le petit local faisant office de refuge d'hiver : un espace de 5 m² avec trois lits superposés. Nous étions 6 ! Je me suis entêté dans ce plan, mais il fallait à présent se rendre à l'évidence : les Alpes Ligures seraient inhospitalières cette année, dans le créneau imparti. Après une nuit « encastrée », à sentir les vibrations de la structure causées par les rafales, nous avons dû prendre la décision.",
          "Le moral des troupes n'était pas haut, au milieu de la gare de Fossano, lorsque nous mangions un pique-nique que nous aurions préféré partager là-haut. Après moultes plans, la Vallée d'Aoste paraissait encore la meilleure des options. Nous jubilions tous à l'idée de ne pas rentrer si vite à la maison. Peut-être un peu moins Guillaume et Mat, dont la mission consistait à retrouver la voiture garée à Limone et à lui ôter son épais parement blanc — au moins 60 cm !",
          "Le Val d'Aoste, c'est un peu ma deuxième maison. J'avais deux plans, assez certains. Après un coup de fil à un ami guide valdôtain, nous optons pour le plan situé au plus près de la frontière, gage cette année encore d'un meilleur enneigement.",
          "Une itinérance magnifique, entre le bivouac Cosimo Zappelli, encore secret, et le refuge Deffeyes, au pied des imposants glaciers du Ruitor. Personne et pas une trace de ski pendant trois jours, pourtant à quelques encablures de Courmayeur. Tout cela me surprendra toujours ! Et une dernière descente mémorable, dans un unique canyon de 1000 m de dénivelé, ponctué d'un petit ressaut pas si prévu sur la carte !",
        ],
      },
      {
        heading: "Un an plus tard",
        paragraphs: [
          "Un an a passé. Le projet Garessio–Limone était resté en suspens — une traversée commencée par son échec, qu'il fallait bien terminer.",
        ],
      },
      {
        heading: "2024 : la traversée réalisée",
        paragraphs: [
          "Cette année, les conditions sont bien différentes. Cela fait deux week-ends que les retours d'Est agrémentent généreusement les Alpes du Sud d'une couverture blanche jusqu'à basse altitude, et ils prévoient un anticyclone sans vent. C'est l'occasion rêvée de retenter l'aventure, dans des conditions plus sereines.",
          "Seul hic : le risque d'avalanches est encore annoncé à 4 le jour de notre départ. En Italie, j'ai l'épée de Damoclès au-dessus de la tête. Notamment pour cette raison, je décide d'inverser le sens de la traversée : nous partirons cette fois-ci de Limone Piemonte pour terminer à Garessio 2000, aux confins des Alpes !",
          "Tout a été incroyable : la vue dégagée sur l'ensemble de l'arc alpin grâce aux contrastes de couleurs entre la plaine du Pô, verte, et les montagnes enneigées, la vue sur la mer Méditerranée sur l'autre versant, les lumières douces parfaites pour les photos, les 4 cabanes non gardées dans lesquelles nous avons dormi…",
          "Et surtout : la solitude. Si nous avons croisé des centaines de chamois, nous n'avons pas croisé un skieur ni une trace durant ces cinq jours de traversée. Dans les Alpes, c'est chose rare !",
        ],
      },
      {
        heading: "Vers le nord",
        paragraphs: [
          "Les emplois du temps se sont parfaitement alignés, et le surlendemain de mon arrivée à Garessio 2000 après une fantastique chevauchée des Alpes Ligures et après une journée marathon pour finaliser et (enfin) envoyer la version définitive de mon manuscrit de thèse, j'ai la chance de repartir depuis la même station de Limone Piemonte, mais cette fois-ci en mettant le cap au nord et initier une traversée des Alpes en segments, fil rouge des 20 prochaines années.",
        ],
      },
    ],
    // Rail jour par jour de la traversée 2024 (aucune photo du prologue
    // 2023, voir note PHOTOS en tête de fichier) — le récit 2024 lui-même
    // reste court (pas de détail par étape encore retrouvé, voir GAP NON
    // COMBLÉ ci-dessus), donc 2-4 photos par jour plutôt qu'un rail dense.
    storyDays: [
      { day: "J1", route: itinerary.days[0].title, photos: [photos.selfieSurUnTelesiege, photos.skisAlignesSurLeTelesiege] },
      {
        day: "J2",
        route: itinerary.days[1].title,
        photos: [photos.groupeReuniSurUnSommet, photos.skiSousLesToursCalcaires, photos.petiteCabaneRougeDansLaNeige, photos.soirTombantDerriereLaVitreDuRefuge],
      },
      {
        day: "J3",
        route: itinerary.days[2].title,
        photos: [photos.groupeMontantSurUneAreteAerienne, photos.forteresseRocheuseAuDessusDesNuages, photos.soireeALaLumiereRouge, photos.deuxSkieursApparaissantDerriereUneBosse],
      },
      {
        day: "J4",
        route: itinerary.days[3].title,
        photos: [photos.skieurAuPiedDuneGrandeParoi, photos.sommetRocheuxDansLaLumiereMatinale, photos.monteeAuBordDuneFalaiseAuDessusDesNuages, photos.longueDescenteVersLeVallon, photos.cabanePresqueEnsevelieSousLaNeige, photos.cabaneEclaireeDansLaNuit],
      },
      {
        day: "J5",
        route: itinerary.days[4].title,
        photos: [photos.departDuGroupeAuLeverDuSoleil, photos.refletDesSommetsDansUneMareDeFonte, photos.descenteEntreLesToursRocheuses, photos.longueTraverseeDuGroupeSousLesParois],
      },
    ],
    closingLinks: [
      { label: "Le manuscrit de thèse", href: null },
      { label: "Étape 2 de la traversée des Alpes en segments : l'Argentera, de Limone Piemonte à Vinadio →", href: "/traversee-ski-argentera-mercantour/" },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "ALPES LIGURES",
    subtitle: "Des Alpes à la Méditerranée",
    meta: "Du 12 au 16 mars 2024 · 5 jours de traversée à ski, de Limone Piemonte à Garessio 2000 · Photos : Yann Borgnet",
    // 59 photos disponibles au total (aucune exclue) : 17 visibles au
    // chargement (mosaïque qui se termine proprement), le reste derrière
    // "Voir la suite du portfolio", dans l'ordre chronologique.
    photos: [
      // --- visibles au chargement ---
      photos.panoramaSurLesAlpesLigures,
      photos.longueTraverseeDuGroupeSousLesParois,
      photos.groupeMontantSurUneAreteAerienne,
      photos.forteresseRocheuseAuDessusDesNuages,
      photos.monteeAuBordDuneFalaiseAuDessusDesNuages,
      photos.versantEscarpeDesAlpesLigures,
      photos.descenteEntreLesToursRocheuses,
      photos.refletDesSommetsDansUneMareDeFonte,
      photos.departDuGroupeAuLeverDuSoleil,
      photos.chapelleIsoleeDansLaNeige,
      photos.petiteCabaneRougeDansLaNeige,
      photos.cabanePresqueEnsevelieSousLaNeige,
      photos.cabaneEclaireeDansLaNuit,
      photos.franchissementDuneCornicheSommitale,
      photos.groupeReuniSurUnSommet,
      photos.skieurSolitaireSurUnPlateau,
      photos.traceSinueuseSurUneCrete,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.selfieSurUnTelesiege,
      photos.skisAlignesSurLeTelesiege,
      photos.descenteDansUnePenteSoutenue,
      photos.skieurDansUnCouloirEnneige,
      photos.virageSousLesFalaises,
      photos.descenteAuSoleilSousLesBarresRocheuses,
      photos.skiSousLesToursCalcaires,
      photos.monteeEnConversionVersLeCol,
      photos.groupeProgressantDansUnVallon,
      photos.traverseeDunVastePlateauBlanc,
      photos.arriveeDuGroupeALaCabane,
      photos.soirTombantDerriereLaVitreDuRefuge,
      photos.preparationDuDinerDansLaCabane,
      photos.groupeReuniDansLeRefuge,
      photos.virageEnPoudreuseAuDessusDesVallees,
      photos.panoramaSurLesReliefsEnneiges,
      photos.deuxSkieursApparaissantDerriereUneBosse,
      photos.soireeALaLumiereRouge,
      photos.repasALaFrontaleDansLaCabane,
      photos.reposDuGroupeSurLesCouchettes,
      photos.portraitSouriantAuReveil,
      photos.preparationDesVetementsAvantLeDepart,
      photos.skieurAuPiedDuneGrandeParoi,
      photos.sommetRocheuxDansLaLumiereMatinale,
      photos.groupeMinusculeSousLeSommet,
      photos.progressionSurUneNeigeTravailleeParLeVent,
      photos.valleeAuDessusDuneMerDeNuages,
      photos.enchainementDeSommetsEnneiges,
      photos.descenteDansUneGrandeCombe,
      photos.longueDescenteVersLeVallon,
      photos.interieurSimpleDuneCabane,
      photos.pauseAuSoleilEnTenueLegere,
      photos.reposDuGroupeDevantLesSkis,
      photos.secondePauseAuSoleilDevantLesSommets,
      photos.preparationDeLitineraireSurLesTelephones,
      photos.reveilSurLesCouchettesDeLaCabane,
      photos.cabaneEtSkisAuxPremieresLueurs,
      photos.areteBlancheEntreLesSommets,
      photos.telesiegeFaceAuxMontagnes,
      photos.passagePresDunPanneauDeStation,
      photos.dejeunerAuSoleilSurUneTerrasse,
      photos.rueDunVillageAlpin,
    ],
    initialPortfolioCount: 17,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera. */
export const indexCover = photos.panoramaSurLesAlpesLigures;
