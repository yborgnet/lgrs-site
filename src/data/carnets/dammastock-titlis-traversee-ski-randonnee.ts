import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { titlisPhotos } from "../photos/suisse-titlis-dammastock-2025";

/**
 * RÉCIT : texte source fourni par Yann le 18/09/2026 (voir conversation),
 * édité a minima (orthographe, accords, ponctuation, quelques articles
 * manquants) — jamais réécrit ni enrichi. Toponymie et altitudes vérifiées
 * une à une (OSM Nominatim + recherches SAC/Camptocamp-like/outdooractive/
 * hikr, voir détail ci-dessous) : toutes confirmées correctes telles
 * qu'écrites par Yann, à une exception près :
 *  - J1 "vallée de Gäntel" → corrigé en "vallée du Gental", pour deux
 *    raisons convergentes : (1) le même récit orthographie correctement
 *    "Gental" au J5 ("une longue descente... à travers le Gental jusqu'à la
 *    voiture") pour désigner très probablement le même lieu (la voiture-
 *    relais déposée au J1 est celle récupérée en fin de J5) ; (2) le Gental
 *    est un vallon latéral confirmé du Gadmertal, entre Engstlensee/Jochpass
 *    et Innertkirchen — cohérent avec le point d'arrivée réel du GPX (voir
 *    ANOMALIE/NOTE J5 ci-dessous). "Gäntel" n'existe dans aucune source.
 *
 * DEUX PASSAGES SIGNALÉS, NON MODIFIÉS (ambiguïté réelle, à trancher par
 * Yann, jamais arbitré seul) :
 *  - J2 : "la CSV de la veille nous a alertés sur les pentes raides..." —
 *    "CSV" ne correspond à rien d'identifiable (bulletin d'avalanche,
 *    carte des pentes, etc.) ; probable coquille de dictée non résolue,
 *    laissée telle quelle.
 *  - J3 : "Certaines doutent de la pente" — accord au féminin pluriel,
 *    possiblement une confusion de dictée avec "Certains" (homophone à
 *    l'oral) ; laissé tel quel faute de certitude sur la composition du
 *    groupe.
 *
 * NOTE J5 — point d'arrivée : le titre donné par Yann est "de Guttannen à
 * Gadmen", mais le dernier point GPX (46.7240, 8.2692, 16h26) géocode très
 * précisément sur Innertkirchen (confirmé OSM Nominatim), à l'embouchure du
 * Gental/Gadmertal — pas sur le village de Gadmen lui-même, plus haut dans
 * la même vallée. Les deux ne se contredisent pas (Innertkirchen est bien
 * "à Gadmen" au sens de la vallée/commune), mais `info.fields` ci-dessous
 * retient "Innertkirchen" (valeur GPX exacte) — à corriger si Yann veut
 * "Gadmen" à la place.
 *
 * NOTE J5 — portion mécanisée : le récit de Yann ("transition en bus...
 * remontées mécaniques d'Engelberg-Titlis... Du Jochpass... une longue
 * descente") est confirmé point par point par la trace GPX : entre 13h50 et
 * 14h35 le 28/03, la trace passe d'une progression au rythme du ski/marche à
 * des sauts de position incompatibles avec un déplacement humain (jusqu'à
 * +99 m d'altitude en 32 s), en deux temps — un bus à plat dans la vallée
 * d'Engelberg (13h50-14h07, alt. ~990-1060 m) puis une télécabine/télésiège
 * (14h07-14h35, ~990 m → 2209 m, arrivée au Jochpass réel à 2207 m — écart
 * de 2 m). Cette portion (~9,9 km, ~1260 m de D+) N'EST PAS skiée : les
 * stats du J5 ci-dessous ne retiennent donc QUE les deux tronçons réellement
 * skiés (Spannorthütte → vallée d'Engelberg, puis Jochpass → Innertkirchen),
 * jamais la trace brute complète — voir scripts/gpx-report-titlis.ts pour le
 * détail des trois segments (ski / transport / ski).
 *
 * TOPONYMIE DU RÉCIT — vérifiée (OSM + recherches web, jamais devinée) :
 * Rindertal, Furtwangsattel (2568 m), Windegghütte (SAC, ~1886 m),
 * Triftbrücke, Giglistock (2901 m), Gigligletscher, Steingletscher (hôtel),
 * Obertaljoch, Wendengletscher, bivouac Grassen (= Grassenbiwak SAC),
 * Grassen (2946 m, altitude de Yann exacte), Bärenhorn (sommet réel sur
 * l'arête Grassenbiwak→Spannort, confirmé), Spannorthütte, Wissberg
 * (2627 m, altitude de Yann exacte), Rugghubelhütte (2290 m), Jochpass
 * (2207 m), Gental — aucune correction nécessaire au-delà du cas "Gäntel"
 * ci-dessus. Toutes les altitudes citées par Yann dans le texte se
 * recoupent au mètre ou au décamètre près avec les mesures GPX.
 *
 * Slug proposé faute d'URL historique à reprendre :
 * "dammastock-titlis-traversee-ski-randonnee" (ordre Dammastock→Titlis, sens
 * réel du parcours et ordre déjà utilisé dans les noms de fichiers photo SEO
 * "suisse-dammastock-titlis-ski-randonnee-*.jpg" — le dossier source
 * "Suisse Titlis Dammastock" inversait l'ordre, jamais repris tel quel).
 *
 * GPX : data/gpx-sources/suisse-titlis-dammastock-2025.original.gpx (trace
 * AlpineQuest originale, type "skimo", 27 231 points horodatés,
 * 24–28/03/2025, 10 <trkseg> natifs, aucun waypoint). Découpage en 5 jours PAS
 * basé sur les 10 segments natifs (voir scripts/gpx-report-titlis.ts : un seul
 * des 4 écarts de nuit coïncide avec une frontière de trkseg ; les 9 autres
 * bornes de segments correspondent à des coupures GPS/pauses internes à une
 * même journée, jamais à une nuit) mais sur les 4 coupures temporelles
 * franches (12,4h à 18,6h chacune, `segmentDays` de src/lib/gpx,
 * confident=true) — cohérentes avec les dates EXIF des photos (jour 1 = 24/03,
 * jour 2 = 25/03, jour 3 = 26/03, jour 4 = 27/03, jour 5 = 28/03 : aucun écart
 * entre le découpage GPX et les tags "jour X" du manifeste photo).
 *
 * J5 est une journée exceptionnellement longue (38,3 km, D+2590/D-3330,
 * 11,9h) : elle enchaîne la montée/traversée d'altitude du matin (photos
 * jusqu'à 12h58) et une longue descente de vallée l'après-midi (13h46-16h26,
 * sans photo) qui ramène la trace près du secteur de départ (boucle) — voir
 * note J5 ci-dessus (portion mécanisée, confirmée par le récit de Yann) et
 * anomalie de toponymie ci-dessous pour le point d'arrivée.
 *
 * TOPONYMIE (Alpes → croisement Camptocamp/Skitour + OSM, voir
 * docs/gpx-methodology.md) — géocodage inverse OpenStreetMap (Nominatim) sur
 * les 4 coupures de nuit, jamais deviné :
 *  - Fin J1 / départ J2 (46.694836, 8.347991) = Windegghütte SAC — CONFIRMÉ
 *    (correspondance OSM exacte, tourism=alpine_hut à 46.694987, 8.348034).
 *  - Fin J2 / départ J3 (46.730575, 8.427358) = hôtel du Steingletscher, au
 *    pied du col du Sustenpass — CONFIRMÉ (correspondance OSM exacte,
 *    "Steingletscher" à 46.730838, 8.427715).
 *  - Fin J3 / départ J4 (46.770173, 8.446689, alt. 2657 m) = Grassenbiwak SAC
 *    — CONFIRMÉ a posteriori par le récit de Yany lui-même ("le petit
 *    bivouac Grassen"), qui recoupe la fiche trouvée pour l'ascension au
 *    Grassen (2946 m) depuis Steingletscher via Obertaljoch/Wendengletscher.
 *    Anciennement "à valider" (aucune correspondance OSM exacte au point
 *    précis) — le nom réel "Grassenbiwak" n'existait que dans des sources
 *    web tierces, pas sur OSM lui-même.
 *  - Fin J4 / départ J5 (46.799794, 8.509771) = Spannorthütte SAC — CONFIRMÉ
 *    (correspondance OSM exacte, tourism=alpine_hut à 46.799813, 8.509797).
 *
 * ANOMALIE TOPONYMIQUE REPÉRÉE (à signaler, pas corrigée en silence) : la
 * photo du J3 (voir src/data/photos/suisse-titlis-dammastock-2025.ts,
 * "dsc08855", localisation "hôtel du glacier du rhône") désigne le point GPX
 * 46.7305589, 8.4276707 comme un hôtel du glacier du Rhône. Or ce point
 * correspond exactement (à quelques mètres) à l'hôtel du Steingletscher, au
 * pied du Sustenpass (canton de Berne) — le vrai glacier du Rhône (Belvédère,
 * Furkapass) se trouve à ~20 km de là, dans une autre vallée (canton du
 * Valais). L'itinéraire ci-dessous suit le tracé GPX (source de vérité
 * absolue) et nomme donc "Steingletscher" ; le texte de la photo lui-même
 * n'est PAS modifié (déjà "validé éditorialement", voir règle en tête de
 * src/data/photos/suisse-titlis-dammastock-2025.ts) — même principe que
 * l'anomalie "Vernagthütte" documentée dans src/data/carnets/otztal.ts.
 *
 * Aucun des deux massifs cités dans le titre n'est réellement gravi par la
 * trace (altitude max mesurée : 2 960 m, contre 3 630 m au sommet du
 * Dammastock et 3 238 m à celui du Titlis) : "DAMMASTOCK · TITLIS" désigne les
 * deux massifs reliés par la boucle, pas deux sommets atteints — même logique
 * que "ÖTZTAL" ou "BERNINA" (tour/traversée de massif, voir masthead.title).
 *
 * PHOTOS : passe photo faite à partir des 41 JPEG fournis par Yann (EXIF
 * complets, noms SEO définitifs, localisation croisée GPX), déposés dans
 * public/photos/Suisse Titlis/. Métadonnées (ALT, légende, localisation,
 * certitude GPX) dérivées telles quelles de
 * src/data/photos/suisse-titlis-dammastock-2025.ts — jamais réécrites à la
 * main, y compris la légende "hôtel du glacier du rhône" ci-dessus (voir
 * anomalie).
 */

const IMG = "/photos/Suisse%20Titlis/";

const photo = (file: string): CarnetPhoto => {
  const meta = titlisPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

const photos = {
  // J1 — Guttannen (route du Grimsel) → Windegghütte
  passageEtroitRochers: photo("suisse-dammastock-titlis-ski-randonnee-20250324-175013-001.jpg"),
  arriveeNocturneCabane: photo("suisse-dammastock-titlis-ski-randonnee-dsc08730-2025-04-03t10-28-26-099-004.jpg"),
  dinerConvivialCabane: photo("suisse-dammastock-titlis-ski-randonnee-dsc08761-005.jpg"),

  // J2 — Windegghütte → Steingletscher (voir anomalie toponymique ci-dessus)
  leverJourMontagnes: photo("suisse-dammastock-titlis-ski-randonnee-dsc08763-2025-04-03t10-28-48-853-006.jpg"),
  traverseePasserelle: photo("suisse-dammastock-titlis-ski-randonnee-dsc08781-007.jpg"),
  panoramaLacGele: photo("suisse-dammastock-titlis-ski-randonnee-dsc08804-008.jpg"),

  // J3 — Steingletscher → halte d'altitude sous le Grassen (bivouac)
  passageHotelGlacier: photo("suisse-dammastock-titlis-ski-randonnee-dsc08855-009.jpg"),
  pauseDejeunerCabane: photo("suisse-dammastock-titlis-ski-randonnee-dsc08878-010.jpg"),
  portraitApresEtape: photo("suisse-dammastock-titlis-ski-randonnee-dsc08904-011.jpg"),

  // J4 — halte sous le Grassen → Spannorthütte
  aiguilleRocheuseCielBleu: photo("suisse-dammastock-titlis-ski-randonnee-20250327-085103-002.jpg"),
  couloirEnneigeParois: photo("suisse-dammastock-titlis-ski-randonnee-20250327-095008-003.jpg"),
  petitDejeunerDepart: photo("suisse-dammastock-titlis-ski-randonnee-dsc08916-012.jpg"),
  cabaneSousAiguille: photo("suisse-dammastock-titlis-ski-randonnee-dsc08942-013.jpg"),
  descenteSkiNuages: photo("suisse-dammastock-titlis-ski-randonnee-dsc08992-014.jpg"),
  sommetsMerNuages: photo("suisse-dammastock-titlis-ski-randonnee-dsc09025-2025-04-03t10-27-55-558-015.jpg"),
  monteeAiguilleRocheuse: photo("suisse-dammastock-titlis-ski-randonnee-dsc09069-016.jpg"),
  aiguilleDominantGlacier: photo("suisse-dammastock-titlis-ski-randonnee-dsc09118-017.jpg"),
  groupeMontantNuages: photo("suisse-dammastock-titlis-ski-randonnee-dsc09143-018.jpg"),
  skieursConversionPente: photo("suisse-dammastock-titlis-ski-randonnee-dsc09192-019.jpg"),
  progressionFileArete: photo("suisse-dammastock-titlis-ski-randonnee-dsc09208-020.jpg"),
  sommetIsoleNuages: photo("suisse-dammastock-titlis-ski-randonnee-dsc09216-021.jpg"),
  groupeAreteEtroite: photo("suisse-dammastock-titlis-ski-randonnee-dsc09221-022.jpg"),
  pauseGroupeSommet: photo("suisse-dammastock-titlis-ski-randonnee-dsc09225-023.jpg"),
  panoramaItineraireAltitude: photo("suisse-dammastock-titlis-ski-randonnee-dsc09237-2025-04-03t10-27-15-375-024.jpg"),
  virageDynamiquePoudreuse: photo("suisse-dammastock-titlis-ski-randonnee-dsc09263-025.jpg"),
  grandeTraverseeSommets: photo("suisse-dammastock-titlis-ski-randonnee-dsc09268-026.jpg"),
  skieursLigneBalcon: photo("suisse-dammastock-titlis-ski-randonnee-dsc09274-027.jpg"),
  monteeFaceAiguilles: photo("suisse-dammastock-titlis-ski-randonnee-dsc09288-028.jpg"),
  descenteVallonSuspendu: photo("suisse-dammastock-titlis-ski-randonnee-dsc09301-029.jpg"),
  groupeTraverseeParois: photo("suisse-dammastock-titlis-ski-randonnee-dsc09374-030.jpg"),
  cordeeVasteVersant: photo("suisse-dammastock-titlis-ski-randonnee-dsc09425-2025-04-03t10-27-26-043-031.jpg"),
  arriveePlateauPanoramique: photo("suisse-dammastock-titlis-ski-randonnee-dsc09447-2025-04-03t10-27-33-645-032.jpg"),
  toursRocheusesLumiereSoir: photo("suisse-dammastock-titlis-ski-randonnee-dsc09449-033.jpg"),
  descenteToursRocheuses: photo("suisse-dammastock-titlis-ski-randonnee-dsc09460-034.jpg"),

  // J5 — Spannorthütte → Innertkirchen (boucle de retour)
  departNocturneFrontale: photo("suisse-dammastock-titlis-ski-randonnee-dsc09502-035.jpg"),
  alpenglowSommetRocheux: photo("suisse-dammastock-titlis-ski-randonnee-dsc09521-036.jpg"),
  progressionPlateauGlaciaire: photo("suisse-dammastock-titlis-ski-randonnee-dsc09547-037.jpg"),
  monteeMerNuages: photo("suisse-dammastock-titlis-ski-randonnee-dsc09606-038.jpg"),
  passageCroixSommitale: photo("suisse-dammastock-titlis-ski-randonnee-dsc09645-2025-04-03t10-27-46-455-039.jpg"),
  panoramaToursCalcaires: photo("suisse-dammastock-titlis-ski-randonnee-dsc09657-040.jpg"),
  dernierVirageValee: photo("suisse-dammastock-titlis-ski-randonnee-dsc09676-041.jpg"),
};

// Journées reconstruites depuis la trace GPX originale (segmentDays sur les
// coupures temporelles, confident=true — voir note en tête de fichier) :
// distance/D+/D-/altitudes calculés sur la trace réelle, jamais estimés
// (voir scripts/gpx-report-titlis.ts).
const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. Une boucle à ski entre Dammastock et Titlis.",
  intro:
    "De Guttannen à Innertkirchen, une boucle de refuge en refuge (et un bivouac) entre les massifs du Dammastock et du Titlis.",
  days: [
    {
      dayNum: "J1",
      title: "Guttannen → Windegghütte",
      text: "Départ au-dessus de Guttannen, montée par le Rindertal et le Furtwangsattel (2568 m) jusqu'à la Windegghütte.",
      distanceKm: 10.1,
      ascentM: 1460,
      descentM: 730,
      elevationMin: 1150,
      elevationMax: 2570,
    },
    {
      dayNum: "J2",
      title: "Windegghütte → Steingletscher",
      text: "Via la Triftbrücke et le col à l'ouest du Giglistock (2901 m), descente du Gigligletscher jusqu'à l'hôtel du Steingletscher.",
      distanceKm: 11.4,
      ascentM: 1240,
      descentM: 1260,
      elevationMin: 1730,
      elevationMax: 2750,
    },
    {
      dayNum: "J3",
      title: "Steingletscher → Grassenbiwak",
      text: "Montée par l'Obertaljoch, puis le Wendengletscher dans le brouillard, jusqu'au bivouac Grassen.",
      distanceKm: 9.4,
      ascentM: 1510,
      descentM: 720,
      elevationMin: 1860,
      elevationMax: 2960,
    },
    {
      dayNum: "J4",
      title: "Grassenbiwak → Spannorthütte",
      text: "Montée au sommet du Grassen (2946 m), traversée par le Bärenhorn au-dessus d'une mer de nuages, jusqu'à la Spannorthütte.",
      distanceKm: 12.6,
      ascentM: 1130,
      descentM: 1810,
      elevationMin: 1950,
      elevationMax: 2960,
    },
    {
      dayNum: "J5",
      title: "Spannorthütte → Innertkirchen",
      // Distance/D+/D- ci-dessous = UNIQUEMENT les deux tronçons réellement
      // skiés (Spannorthütte → vallée d'Engelberg, puis Jochpass →
      // Innertkirchen) — la portion bus + télécabine/télésiège
      // Engelberg→Jochpass (~9,9 km, ~1260 m de D+ mesurés sur la trace,
      // confirmée par le récit de Yany) est volontairement exclue de ces
      // stats de ski, voir note en tête de fichier et
      // scripts/gpx-report-titlis.ts. Trace GPX affichée sur la carte : trace
      // complète (y compris bus/télécabine), car c'est la trajectoire réelle
      // du jour — seules les stats "à ski" ci-dessous sont recalculées.
      text: "Montée à la croix du Wissberg (2627 m), descente sur Engelberg, bus et télécabine jusqu'au Jochpass, puis longue descente à travers le Gental jusqu'à Innertkirchen.",
      distanceKm: 28.5,
      ascentM: 1330,
      descentM: 3200,
      elevationMin: 980,
      elevationMax: 2630,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Fin mars 2025";

export const dammastockTitlis: Carnet = {
  slug: "dammastock-titlis-traversee-ski-randonnee",
  seo: {
    title: "Dammastock–Titlis à ski : boucle dans les Alpes uranaises",
    description:
      "Traversée à ski de randonnée en boucle entre les massifs du Dammastock et du Titlis, en Suisse : refuges, hôtel de montagne, bivouac d'altitude et longue descente finale.",
    ogImage: photos.grandeTraverseeSommets.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "DAMMASTOCK · TITLIS",
    subtitle: "Boucle à ski dans les Alpes uranaises",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.grandeTraverseeSommets,
  intro: {
    heading: "Une boucle à ski entre les massifs du Dammastock et du Titlis",
    paragraphs: [
      "Cinq jours de traversée en boucle dans les Alpes uranaises, entre Guttannen et Innertkirchen : deux refuges gardés (Windegghütte, Spannorthütte), une nuit à l'hôtel du Steingletscher au pied du Sustenpass, une nuit au bivouac Grassen, et un dernier jour qui referme la boucle via le Wissberg, Engelberg et le Jochpass, puis la descente du Gental.",
    ],
    photo: photos.progressionFileArete,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Suisse" },
      { label: "Massif", value: "Alpes uranaises · Dammastock et Titlis" },
      { label: "Départ", value: "Guttannen" },
      { label: "Arrivée", value: "Innertkirchen" },
      { label: "Forme du raid", value: "Boucle à ski de randonnée, de refuge en refuge" },
      { label: "Hébergements", value: "Refuges gardés, hôtel de montagne, bivouac" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Guttannen → Innertkirchen (boucle)",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/dammastock-titlis-traversee-ski-randonnee.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    // Texte source fourni par Yann le 18/09/2026, édité a minima (voir note
    // en tête de fichier pour le détail des corrections et des deux passages
    // signalés mais non modifiés : "la CSV" au J2, "Certaines" au J3).
    sections: [
      {
        heading: "J1 — Guttannen → Windegghütte",
        paragraphs: [
          "Bouchons à Genève, puis à Lausanne, café à Yverdon, pause pour faire les sacs et laisser un sac de nourriture au propriétaire de Steingletscher à Meiringen, dépose d'une voiture dans la vallée du Gental pour 40 fr. la semaine, puis recherche d'une route d'accès non interdite pour monter le plus haut possible en voiture. Après plusieurs tentatives, négociation d'une place gratuite légèrement au-dessus de Guttannen auprès de paysans.",
          "Si bien qu'il n'est pas très tôt quand nous attaquons le premier pique-nique, et encore plus tard lorsque nous attaquons la montée en baskets, skis sur le dos. Nous croisons un ancien en Duster qui insiste pour nous montrer le départ du chemin, bien que nous ayons tenté de lui dire que nous avions la carte. Mais il semblait si enthousiaste de voir un groupe de jeunes skieurs…",
          "Après 500 m à pied, nous chaussons enfin les skis, pour remonter dans une neige bien ramollie le long du Rindertal, puis, aux lumières du couchant, jusqu'au Furtwangsattel. Par une belle session de grattage, nous rejoignons les pentes surplombant la Windegghütte, régulièrement croûtées puis de plus en plus portantes à mesure que nous descendons.",
          "Une petite cabane d'hiver, très confortable, avec un poêle à bois et du bois que nous tarderons à trouver !",
        ],
      },
      {
        heading: "J2 — Windegghütte → Steingletscher",
        paragraphs: [
          "La CSV de la veille nous a alertés sur les pentes raides et potentiellement dures et exposées qui permettent de quitter la cabane par le bas. Nous rejoignons l'impressionnant pont tibétain Triftbrücke, attraction de ce début de journée.",
          "La longue combe que nous remontons ensuite nous inspire une pause café, allongés dans l'herbe, bercés par le bruit du ruisseau. La pause déj au col à l'ouest du Giglistock nous coûtera la visibilité lors de la descente du Gigligletscher…",
          "La neige s'alourdit à mesure que nous perdons de l'altitude, si bien que nous préférons gratter en traversée à la fin plutôt que de risquer des virages. Nous remontons ensuite le canyon jusqu'à Steingletscher, où Thomas nous accueille très chaleureusement.",
          "Aprem belote, chill et échange avec Daniel Dulac que je n'avais pas croisé depuis longtemps. C'est bon, le confort d'une bonne douche chaude, parfois, au milieu d'un trip à ski de randonnée. Et aussi de se faire servir à manger et d'ouvrir le robinet pour se procurer de l'eau !",
        ],
      },
      {
        heading: "J3 — Steingletscher → Grassenbiwak",
        paragraphs: [
          "La journée crasseuse de la semaine. Elle était annoncée dès le départ, et les modèles ne se sont pas trompés…",
          "Nous partons sous une épaisse couche de brouillard, dans laquelle nous évoluons bientôt. La neige est ramollie. Au col Obertaljoch, nous nous concertons pour savoir quelle option nous prenons à la descente : raide et plein nord, ou moins raide et ouest. Certaines doutent de la pente et, sans hésitation, nous basculons à main gauche.",
          "La neige tombée les jours précédents est posée sur un fond dur, et l'ensemble est homogène et plutôt plaisant à skier. Si ce n'est la piètre visibilité. J'opte pour une option intermédiaire, et nous plongeons bientôt à main droite, pour retrouver le versant froid. Nous nous retrouvons dans une pente soutenue, dans laquelle nous n'avons d'autre choix que de repeauter.",
          "La remontée du Wendengletscher se déroule dans un brouillard épais, des conditions qui rendent le petit bivouac Grassen, haut perché sur la crête dominée par l'imposante paroi du Titlis, d'autant plus accueillant.",
          "Nous passerons l'après-midi et la soirée réchauffés par le feu de bois, à écouter le vent et la neige fouetter les parois du bivouac.",
        ],
      },
      {
        heading: "J4 — Grassenbiwak → Spannorthütte",
        paragraphs: [
          "Lever 6 h, en espérant apprécier le lever du soleil. Nous déchantons en voyant les différentes strates de nuages et de brouillard à toutes les altitudes. Je décide de temporiser.",
          "Mais une heure plus tard, tout semble changer très vite, et nous nous activons pour partir dès que possible. En effet, les couches se déchirent successivement, laissant place, enfin, au soleil. Comme prix de ce changement brutal, le vent nous cueille à la sortie du bivouac.",
          "Nous décidons de monter au Grassen, sommet situé à 2946 m, pour apprécier la vue sur l'imposante paroi du Titlis, et de là-haut, c'est un paysage féerique qui s'ouvre, les sommets étant révélés par la mer de nuages qui s'étend à perte de vue.",
          "Nous traversons à flanc, jusqu'à rejoindre une belle pente toute poudre. Nous récoltons les fruits de la perturbation des derniers jours. Par excès de zèle, je me retrouve un peu bas par rapport à la trace de ski, qui semble passer au milieu de la falaise. Je m'étonne de ce loupé.",
          "Nous remontons une pente raide et étroite, qui nous donne accès à nouveau aux glaciers de cette incroyable traversée suspendue, pour rejoindre le sommet du Bärenhorn.",
          "En dessous, la mer de nuages, toujours, sous laquelle nous skions bientôt. Comme la veille, la visibilité est réduite à néant, et je m'oriente au GPS. La neige s'alourdit, et nous devons rester au fond du couloir pour espérer éviter les cailloux piégeux.",
          "Il nous faut encore traverser une moraine presque entièrement déneigée et effectuer une longue traversée en grattage pour atteindre enfin le refuge.",
          "La surprise est plutôt bonne : s'il est moins cosy que les précédents, il est en revanche neuf et confortable, et bien doté en bière. Manque peut-être juste un poêle à bois qui aurait adouci l'ambiance plutôt fraîche.",
        ],
      },
      {
        heading: "J5 — Spannorthütte → Innertkirchen",
        paragraphs: [
          "Réveil matinal, le premier de cette saison hivernale. Ça sent le printemps ! À 5h30, nous sommes sur les skis pour un échauffement sans transition, dans une pente verglacée où il ne faut pas tomber. Dérapage pour tout le monde !",
          "Je ne comprends pas la trace de ski de rando indiquée sur les cartes suisses, qui semble être débonnaire, mais le terrain est tout autre : raide, verglacé.",
          "Nous rejoignons le fond de vallon et remontons en face, au milieu d'une micro-station de ski. Rapidement, nous retrouvons un terrain bien sauvage et, à mesure que nous nous élevons, nous avons une vue imprenable sur le Titlis et la traversée sur les crêtes de la veille.",
          "De la croix du Wissberg, à 2627 m, nous pourrions imaginer poursuivre encore cette traversée vers le nord et rejoindre la Rugghubelhütte. Mais la journée, de notre côté, n'est pas finie et nous devons retrouver nos voitures.",
          "Après la descente vers Engelberg, une transition en bus dans la vallée nous permet de rejoindre les remontées mécaniques d'Engelberg-Titlis. Du Jochpass, au sommet du domaine skiable, une longue descente nous attend à travers le Gental jusqu'à la voiture.",
          "Quelle journée et quelle traversée !",
        ],
      },
    ],
    // Rail jour par jour : J1/J2/J3 reprennent leurs 3 photos disponibles
    // (texte court à moyen). J4 (texte le plus long, 25 photos disponibles)
    // et J5 (7 photos) restent une sélection éditoriale resserrée sur l'arc
    // du récit — jamais un simple ordre chronologique brut — le reste de
    // chaque journée est de toute façon accessible dans le portfolio.
    storyDays: [
      {
        day: "J1",
        route: itinerary.days[0].title,
        photos: [photos.passageEtroitRochers, photos.arriveeNocturneCabane, photos.dinerConvivialCabane],
      },
      {
        day: "J2",
        route: itinerary.days[1].title,
        photos: [photos.leverJourMontagnes, photos.traverseePasserelle, photos.panoramaLacGele],
      },
      {
        day: "J3",
        route: itinerary.days[2].title,
        photos: [photos.passageHotelGlacier, photos.pauseDejeunerCabane, photos.portraitApresEtape],
      },
      {
        day: "J4",
        route: itinerary.days[3].title,
        photos: [
          photos.aiguilleDominantGlacier,
          photos.panoramaItineraireAltitude,
          photos.virageDynamiquePoudreuse,
          photos.groupeAreteEtroite,
          photos.grandeTraverseeSommets,
          photos.cordeeVasteVersant,
          photos.arriveePlateauPanoramique,
          photos.toursRocheusesLumiereSoir,
        ],
      },
      {
        day: "J5",
        route: itinerary.days[4].title,
        photos: [
          photos.departNocturneFrontale,
          photos.alpenglowSommetRocheux,
          photos.progressionPlateauGlaciaire,
          photos.monteeMerNuages,
          photos.passageCroixSommitale,
          photos.panoramaToursCalcaires,
          photos.dernierVirageValee,
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "DAMMASTOCK · TITLIS",
    subtitle: "Boucle à ski dans les Alpes uranaises",
    meta: "Fin mars 2025 · 5 jours de traversée en boucle à ski de randonnée, de Guttannen à Innertkirchen · Photos : Yann Borgnet",
    // 41 photos disponibles au total (aucune exclue) : 17 visibles au
    // chargement (mosaïque qui se termine proprement), le reste derrière
    // "Voir la suite du portfolio".
    photos: [
      // --- 17 visibles au chargement ---
      photos.grandeTraverseeSommets,
      photos.cordeeVasteVersant,
      photos.progressionFileArete,
      photos.arriveePlateauPanoramique,
      photos.departNocturneFrontale,
      photos.alpenglowSommetRocheux,
      photos.aiguilleDominantGlacier,
      photos.monteeAiguilleRocheuse,
      photos.groupeAreteEtroite,
      photos.virageDynamiquePoudreuse,
      photos.progressionPlateauGlaciaire,
      photos.monteeMerNuages,
      photos.passageCroixSommitale,
      photos.panoramaToursCalcaires,
      photos.panoramaLacGele,
      photos.traverseePasserelle,
      photos.leverJourMontagnes,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.passageEtroitRochers,
      photos.arriveeNocturneCabane,
      photos.dinerConvivialCabane,
      photos.passageHotelGlacier,
      photos.pauseDejeunerCabane,
      photos.portraitApresEtape,
      photos.petitDejeunerDepart,
      photos.cabaneSousAiguille,
      photos.descenteSkiNuages,
      photos.sommetsMerNuages,
      photos.groupeMontantNuages,
      photos.skieursConversionPente,
      photos.sommetIsoleNuages,
      photos.pauseGroupeSommet,
      photos.panoramaItineraireAltitude,
      photos.aiguilleRocheuseCielBleu,
      photos.couloirEnneigeParois,
      photos.skieursLigneBalcon,
      photos.monteeFaceAiguilles,
      photos.descenteVallonSuspendu,
      photos.groupeTraverseeParois,
      photos.toursRocheusesLumiereSoir,
      photos.descenteToursRocheuses,
      photos.dernierVirageValee,
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
export const indexCover = photos.grandeTraverseeSommets;
