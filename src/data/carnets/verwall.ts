import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { verwallPhotos } from "../photos/autriche-verwall-2024";

/**
 * RÉCIT (18/09/2026) : texte source fourni par Yann en conversation (Google
 * Doc "Récits hiver 2024", document "29-1er avril : tour de la Verwalltal ou
 * le ventilo du Voralberg autrichien"), édité a minima — orthographe,
 * accords, quelques coquilles, découpage en paragraphes/journées pour la
 * lecture web, intertitres sobres (titre d'origine + "JN — départ → arrivée"
 * repris de l'itinéraire déjà validé) — jamais réécrit, rien d'inventé.
 * Corrections appliquées (typographie/coquilles uniquement) : "fût" → "fut",
 * "épargné" → "épargnés" (accord), "alpin" → "alpins" (accord), "Voralberg"
 * → "Vorarlberg" (nom propre réel, partout où il apparaît), "Reutinger
 * hütte" / "Retlinger" → "Reutlinger Hütte" (nom confirmé, voir TOPONYMIE
 * ci-dessous), "Scharze Wand" → "Schwarze Wand" (confirmé), "Heilbronner
 * hütte" → "Heilbronner Hütte" (majuscule, cohérence avec "Friedrichshafener
 * Hütte" déjà capitalisé par Yann dans le même texte), "belotte" → "belote",
 * "bas-flanc" → "bat-flanc" (terme réel de mobilier de refuge — couchette
 * collective en bois — "bas-flanc" n'existe pas), guillemets normalisés
 * (« »), espaces avant unités ("1°C" → "1 °C").
 *
 * TOPONYMIE DU RÉCIT — vérifiée (recherche web, jamais devinée) : Kuchenjöchli
 * (2730 m, confirmé, secteur Rendlbahn/St-Anton), Muttenjoch et Schrottenkopf
 * (confirmés, existe une fiche de randonnée exactement "Neue Heilbronner
 * Hütte – Schrottenkopf – Neue Heilbronner Hütte"), Valschavieljöchle et
 * Schwarze Wand (non trouvés indépendamment en ligne — petits cols peu
 * référencés — mais rien ne les contredit, gardés tels que donnés par Yann,
 * qui a lui-même mené ce raid), Oberer Rauer Kopf (le "Rauer Kopf"/"Rauhe
 * Kopf" existe bien dans le secteur, cohérent). Aucune anomalie détectée
 * cette fois (contrairement à Ötztal/Titlis) : la toponymie de Yann s'est
 * avérée exacte une fois vérifiée.
 *
 * Slug : "verwall-tour-ski-randonnee".
 *
 * GPX : data/gpx-sources/autriche-verwall-2024.original.gpx (trace originale
 * AlpineQuest, type "skimo", 17 105 points horodatés, 29/03–01/04/2024, 4
 * <trkseg> natifs). Découpage en 4 jours PAS basé sur les 4 segments natifs
 * (un seul des 3 écarts de nuit coïncide avec une frontière de trkseg — voir
 * scripts/gpx-report-verwall.ts) mais sur les 3 coupures temporelles franches
 * (764 à 1099 min chacune, `segmentDays` de src/lib/gpx, confident=true) —
 * cohérentes avec les dates EXIF des photos (jour 1 = 29/03, jour 2 = 30/03,
 * jour 3 = 31/03, jour 4 = 01/04 : aucun écart entre le découpage GPX et les
 * tags "jour X" du manifeste photo, sur les 20 photos).
 *
 * TOPONYMIE (Alpes → OSM Nominatim/Overpass ; Camptocamp/Skitour peu
 * pertinents pour l'Autriche, non forcés, voir docs/gpx-methodology.md) —
 * géocodage inverse sur les 3 coupures de nuit + départ/arrivée, jamais
 * deviné :
 *  - Départ J1 (47.104597, 10.268057) = Sankt Anton am Arlberg, secteur
 *    Riffel/Rendl (Intersport Riffel Höhenweg) — CONFIRMÉ (accès probable par
 *    les pistes/télésièges du domaine avant le début du ski de randonnée
 *    proprement dit).
 *  - Fin J1 / départ J2 (46.994688, 10.215570, alt. 2140 m) = Friedrichshafener
 *    Hütte, Mathon (Ischgl) — CONFIRMÉ (correspondance OSM exacte à
 *    46.9948227, 10.2156880 ; le nom de fichier GPX source orthographiait
 *    "Fiedrichshafener", sans le premier r — coquille corrigée). Nuitée dans
 *    le local d'hiver "Schlafhaus", annexe de la Friedrichshafener Hütte au
 *    même point OSM.
 *  - Fin J2 / départ J3 (47.007247, 10.139412, alt. 2308 m) = Neue Heilbronner
 *    Hütte, Gaschurn (massif Verwallgruppe, confirmé par le tag OSM
 *    "massif") — CONFIRMÉ (correspondance OSM exacte à 47.0072143,
 *    10.1389124). Une recherche directe de "Heilbronner Hütte" seule
 *    remonte par erreur une autre cabane du même nom, détruite, dans le Val
 *    Senales (Tyrol du Sud, Italie, à ~140 km) — sans rapport avec ce
 *    carnet ; le nom complet exact est bien "Neue Heilbronner Hütte". Nuitée
 *    probable dans le local d'hiver "Peter-Käß-Hütte", annexe au même point.
 *  - Fin J3 / départ J4 (47.075273, 10.115535, alt. 2392 m) = Neue Reutlinger
 *    Hütte, Silbertal — CONFIRMÉ (correspondance OSM exacte à 47.0753318,
 *    10.1156262).
 *  - Arrivée J4 (47.131785, 10.120938, alt. ~1210 m) = Langen am Arlberg
 *    (Vorarlberg), village avec gare — CONFIRMÉ (correspondance OSM exacte,
 *    "Langen am Arlberg Bahnhof" ; la photo de fin, une église de village
 *    sous la neige, correspond au clocher à bulbe visible sur place).
 *
 * PHOTOS : passe photo faite à partir des 20 JPEG fournis par Yann (EXIF
 * complets, noms SEO définitifs, localisation croisée GPX), déposés dans
 * public/photos/Autriche Verwalltal/. Métadonnées (ALT, légende,
 * localisation, certitude GPX) dérivées telles quelles de
 * src/data/photos/autriche-verwall-2024.ts — jamais réécrites à la main.
 * Une photo (J4, "église de montagne sous la neige") avait un tag EXIF
 * Orientation=6 erroné — pixels déjà droits une fois vérifiés visuellement,
 * tag supprimé sans rotation (même correction que sur une photo Alpes
 * Ligures plus tôt dans ce projet — toujours vérifier visuellement avant de
 * faire confiance à un tag EXIF).
 */

const IMG = "/photos/Autriche%20Verwalltal/";

const photo = (file: string): CarnetPhoto => {
  const meta = verwallPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

const photos = {
  // J1
  groupeRemontantUnVallonEncaisse: photo("autriche-verwall-ski-randonnee-dsc00525-1-002.jpg"),
  sommetEffileDansLeBrouillard: photo("autriche-verwall-ski-randonnee-dsc00685-1-003.jpg"),
  descenteSousUneGrandeParoi: photo("autriche-verwall-ski-randonnee-dsc00710-004.jpg"),
  skieurFaceAUnSommetPyramidal: photo("autriche-verwall-ski-randonnee-dsc00726-1-005.jpg"),
  // J2
  petitDejeunerDansUneCabane: photo("autriche-verwall-ski-randonnee-dsc00754-006.jpg"),
  skieurSolitaireAuDessusDesVallees: photo("autriche-verwall-ski-randonnee-dsc00810-1-007.jpg"),
  descenteSurUneLargePente: photo("autriche-verwall-ski-randonnee-dsc00834-008.jpg"),
  virageDansUneCombeEnneigee: photo("autriche-verwall-ski-randonnee-dsc00878-1-009.jpg"),
  // J3
  vueMatinaleDepuisLaFenetreDuRefuge: photo("autriche-verwall-ski-randonnee-dsc00911-010.jpg"),
  preparationDuCafeAvantLeDepart: photo("autriche-verwall-ski-randonnee-dsc00915-011.jpg"),
  monteeSolitaireSurUnPlateau: photo("autriche-verwall-ski-randonnee-dsc00944-012.jpg"),
  groupeTracantDansLaNeigeFraiche: photo("autriche-verwall-ski-randonnee-dsc00957-013.jpg"),
  descenteDunSkieurSurUnePenteRaide: photo("autriche-verwall-ski-randonnee-dsc01040-014.jpg"),
  virageAppuyeSousLesCretes: photo("autriche-verwall-ski-randonnee-dsc01081-1-015.jpg"),
  traverseeAuDessusDunVallon: photo("autriche-verwall-ski-randonnee-dsc01250-1-016.jpg"),
  monteeDuGroupeAuDessusDesForets: photo("autriche-verwall-ski-randonnee-dsc01354-1-017.jpg"),
  progressionVersUnColDuVerwall: photo("autriche-verwall-ski-randonnee-dsc01490-1-018.jpg"),
  chauffageAuPoeleDansLaCabane: photo("autriche-verwall-ski-randonnee-dsc01667-019.jpg"),
  pauseBoissonApresLetape: photo("autriche-verwall-ski-randonnee-dsc01686-1-020.jpg"),
  // J4
  egliseDeMontagneSousLaNeige: photo("autriche-verwall-ski-randonnee-20240401-134250-001.jpg"),
};

// Journées reconstruites depuis la trace GPX originale (segmentDays sur les
// coupures temporelles, confident=true — voir note en tête de fichier) :
// distance/D+/D-/altitudes calculés sur la trace réelle, jamais estimés
// (voir scripts/gpx-report-verwall.ts).
const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "4 jours. Un tour à ski du massif du Verwall.",
  intro:
    "De Sankt Anton am Arlberg à Langen am Arlberg, un tour à ski de refuge en refuge dans le massif du Verwall, entre Tyrol et Vorarlberg.",
  days: [
    {
      dayNum: "J1",
      title: "Sankt Anton am Arlberg → Friedrichshafener Hütte",
      text: "Par le Kuchenjöchli et le Schafbichjoch, longue première journée jusqu'à la Friedrichshafener Hütte, à Mathon.",
      distanceKm: 21.5,
      ascentM: 2040,
      descentM: 1930,
      elevationMin: 1700,
      elevationMax: 2740,
    },
    {
      dayNum: "J2",
      title: "Friedrichshafener Hütte → Neue Heilbronner Hütte",
      text: "Par le Muttenjoch et le Schrottenkopf, jusqu'à la Neue Heilbronner Hütte, au cœur du Verwall.",
      distanceKm: 9,
      ascentM: 920,
      descentM: 750,
      elevationMin: 2140,
      elevationMax: 2780,
    },
    {
      dayNum: "J3",
      title: "Neue Heilbronner Hütte → Neue Reutlinger Hütte",
      text: "Par le Valschavieljöchle et la Schwarze Wand, longue descente jusqu'à la Neue Reutlinger Hütte, à Silbertal.",
      distanceKm: 13.5,
      ascentM: 1570,
      descentM: 1490,
      elevationMin: 1700,
      elevationMax: 2540,
    },
    {
      dayNum: "J4",
      title: "Neue Reutlinger Hütte → Langen am Arlberg",
      text: "Par l'Oberer Rauer Kopf, dernière et longue descente jusqu'au village de Langen am Arlberg, qui clôt le tour du massif.",
      distanceKm: 10.8,
      ascentM: 430,
      descentM: 1610,
      elevationMin: 1210,
      elevationMax: 2400,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Fin mars – début avril 2024";

export const verwall: Carnet = {
  slug: "verwall-tour-ski-randonnee",
  seo: {
    title: "Verwall à ski : tour du massif en Autriche",
    description:
      "Tour à ski de randonnée du massif du Verwall, entre Tyrol et Vorarlberg en Autriche : refuges de club alpin, cols et longues descentes, de Sankt Anton à Langen am Arlberg.",
    ogImage: photos.skieurFaceAUnSommetPyramidal.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "VERWALL",
    subtitle: "Tour du massif, en Autriche",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.skieurFaceAUnSommetPyramidal,
  intro: {
    heading: "Un tour à ski du massif du Verwall, entre Tyrol et Vorarlberg",
    paragraphs: [
      "Quatre jours de tour à ski dans le massif du Verwall, en Autriche, de Sankt Anton am Arlberg à Langen am Arlberg : trois nuits en refuge (Friedrichshafener Hütte, Neue Heilbronner Hütte, Neue Reutlinger Hütte) et de longues journées de ski entre le Tyrol et le Vorarlberg voisin.",
    ],
    photo: photos.progressionVersUnColDuVerwall,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Autriche" },
      { label: "Massif", value: "Verwallgruppe · Tyrol et Vorarlberg" },
      { label: "Départ", value: "Sankt Anton am Arlberg" },
      { label: "Arrivée", value: "Langen am Arlberg" },
      { label: "Forme du raid", value: "Tour de massif — traversée de refuge en refuge à ski de randonnée" },
      { label: "Hébergements", value: "Refuges gardés (locaux d'hiver)" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Sankt Anton am Arlberg → Langen am Arlberg",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/verwall-tour-ski-randonnee.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    // Texte source fourni par Yann le 18/09/2026, édité a minima (voir note
    // en tête de fichier pour le détail des corrections).
    sections: [
      {
        heading: "29-1er avril : tour de la Verwalltal ou le ventilo du Vorarlberg autrichien",
        paragraphs: [
          "Ce raid-là, plus encore que d'autres déjà compliqués à organiser cette année, fut un casse-tête. Sur les 4 jours projetés, la météo annonçait un retour d'Est actif sur la frontière italienne et une perturbation venue de l'Ouest touchant les Alpes centrales et occidentales. Il n'y a guère que l'Autriche qui était épargnée. Nous avions dans tous les cas prévu de visiter l'Ortles tyrolien, et en comparaison la partie occidentale de l'Autriche est plus accessible.",
          "Sauf que je n'ai jamais mis les pieds en Autriche, et en gardant l'éthique que j'applique aux autres massifs que je visite, je m'interdis d'aller sur les sites des agences commerciales pour copier-coller un raid déjà tout prêt. Je veux au contraire m'immerger virtuellement dans un massif, en comprendre le relief et les « zones de faiblesse », identifier les hébergements possibles… Dans tous les cas, je voulais privilégier cette fois-ci un massif secondaire, par nécessité impérieuse de fuir la foule du week-end de Pâques.",
          "En balayant grossièrement les différents massifs autrichiens, cherchant ceux qui n'avaient pas un profil trop alpin, je m'arrêtais sur le Vorarlberg.",
          "Ensuite, il a fallu gérer le casse-tête des hébergements. Entre les hébergements dont le local d'hiver est fermé jusqu'à nouvel ordre, ceux où il faut récupérer une clé et ceux qui ne possèdent pas de local d'hiver, le choix n'est pas grand. Il en restait tout pile trois, assez éloignés les uns des autres pour imaginer de belles étapes. Seul hic, la première d'entre elles sera longue… deuxième hic : si nous fuyons le mauvais temps, nous ne serons pas épargnés par le vent…",
        ],
      },
      {
        heading: "J1 — Sankt Anton am Arlberg → Friedrichshafener Hütte",
        paragraphs: [
          "Premier indice : le sommet de la station de St-Anton am Arlberg est fermé. Le ton est donné. Nous « perdons » 200 m de dénivelé et frisons à présent les 2000 m de D+. Au-delà du vent et du dénivelé, la distance sera la troisième invitée de cette journée éprouvante pour tous.",
          "Je découvre l'Autriche et ses montagnes, d'altitude modeste mais aux profils furieusement alpins. Le foehn apporte ses tonnes de sable du Sahara et teinte le ciel d'une belle lumière jaune.",
          "On ne retiendra pas cette première descente, à moitié transformée mais pas complètement, mais on retiendra cette seconde montée, interminable, jusqu'au Schafbichjoch. Comme souvent lors des premières journées, c'est à la frontale que nous rejoignons la cabane. Deux de ses occupants dorment déjà, après avoir sifflé six grandes canettes de bière et une bouteille de vin. Des cadavres qu'envient mes compagnons belges !",
        ],
      },
      {
        heading: "J2 — Friedrichshafener Hütte → Neue Heilbronner Hütte",
        paragraphs: [
          "La seconde journée, avec un petit 1000 m de dénivelé et sans distance, est passée sans forcer. Le vent est plus intermittent, mais encore bien là. Il claque sur les fenêtres de la Heilbronner Hütte, mais ne dérange plus nos longues parties de belote, passe-temps d'un après-midi de farniente…",
        ],
      },
      {
        heading: "J3 — Neue Heilbronner Hütte → Neue Reutlinger Hütte",
        paragraphs: [
          "Le troisième jour restera dans la mémoire de mes compagnons comme la plus belle journée. On a joué à saute-crête, en montant au sud et en descendant dans la bonne neige froide tombée pendant la nuit. D'abord le Valschavieljöchle, en guise d'échauffement, puis la belle pente nord du Schwarze Wand et enfin une autre belle pente d'une bosse sans nom.",
          "Arrivés à la Reutlinger Hütte, la seule cabane où j'ai pu réserver des places, nous trouvons une première porte close. Nous dégageons une seconde porte, dans l'espoir qu'elle soit ouverte. Mais après une demi-heure de labeur, on doit se résoudre à la même conclusion… La cabane est fermée, et à aucun moment cela n'était indiqué sur internet. La gardienne m'a seulement envoyé un mail pour m'avertir que la réserve de bois était quasiment épuisée, mais elle ne m'a jamais évoqué la présence d'une éventuelle clé. L'inquiétude me gagne. Les idées fusent vite dans la tête des garçons, mais avec bien plus de clairvoyance dans celle de Cécile, qui émet l'idée d'essayer la clé utilisée pour la première cabane. Nous n'aurons pas besoin d'user d'autres stratagèmes. La porte s'ouvre, et nous poussons tous un grand ouf de soulagement !",
          "Cette petite cabane est bien plus rustique que la précédente, mais elle incarne l'imaginaire de la cabane : une grande table et sur l'autre bat-flanc un grand dortoir qui occupe toute la largeur. C'est la première fois depuis 3 jours que personne n'a chauffé la cabane pour nous, et nous ressentons les 1 °C affichés sur le thermomètre intérieur. Nous monterons péniblement à 8 °C, et pas un dixième de plus ! Elle fait d'autant plus office d'abri que dehors, la tempête fait rage. Son emplacement, au milieu d'un col, n'est peut-être pas pour rien dans la vibration des murs à chaque rafale. Le vent parvient à s'engouffrer dans les micro-interstices des murs et du sol et même à ouvrir la double porte d'entrée pourtant fermée.",
        ],
      },
      {
        heading: "J4 — Neue Reutlinger Hütte → Langen am Arlberg",
        paragraphs: [
          "Le lendemain, la perturbation prévue est bien là. Premier indice : les vitres sont recouvertes de neige. Le vent ne semble pas avoir faibli au col. Ça va être ambiance ! Et pourtant, quelques centaines de mètres sous le col, il n'y a plus un souffle. En revanche, la pluie remplace bientôt la neige, et nous progressons à présent dans un manteau peu consistant.",
          "Une à une, les options anticipées sont rendues caduques. Telle pente ne m'inspire pas, telle autre a été balayée par une avalanche de fond, telle autre encore est plongée dans le brouillard. L'option finalement retenue n'avait jamais été identifiée. Dans la mesure du possible, je cherche à rejoindre puis franchir la crête qui me sépare de Langen, car la descente me semble beaucoup moins galère.",
          "C'est finalement dans une pente labyrinthique que nous parvenons à nos fins. Que j'aime ces descentes scandées d'incertitudes !",
        ],
      },
    ],
    // Rail jour par jour : sélection guidée par Yany (ouverture, J1,
    // Heilbronner Hütte, belle journée de J3, Neue Reutlinger/tempête, sortie
    // vers Langen). J1/J2 : toutes les photos disponibles (4 chacun). J3 :
    // sélection sur les 11 disponibles, couvrant ski + cabane/tempête. J4 :
    // une seule photo existe pour ce jour (aucune comblée artificiellement).
    storyDays: [
      {
        day: "J1",
        route: itinerary.days[0].title,
        photos: [photos.groupeRemontantUnVallonEncaisse, photos.sommetEffileDansLeBrouillard, photos.descenteSousUneGrandeParoi, photos.skieurFaceAUnSommetPyramidal],
      },
      {
        day: "J2",
        route: itinerary.days[1].title,
        photos: [photos.petitDejeunerDansUneCabane, photos.skieurSolitaireAuDessusDesVallees, photos.descenteSurUneLargePente],
      },
      {
        day: "J3",
        route: itinerary.days[2].title,
        photos: [
          photos.monteeSolitaireSurUnPlateau,
          photos.groupeTracantDansLaNeigeFraiche,
          photos.descenteDunSkieurSurUnePenteRaide,
          photos.virageAppuyeSousLesCretes,
          photos.chauffageAuPoeleDansLaCabane,
          photos.pauseBoissonApresLetape,
        ],
      },
      {
        day: "J4",
        route: itinerary.days[3].title,
        photos: [photos.egliseDeMontagneSousLaNeige],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "VERWALL",
    subtitle: "Tour du massif, en Autriche",
    meta: "Fin mars – début avril 2024 · 4 jours de tour à ski de randonnée, de Sankt Anton am Arlberg à Langen am Arlberg · Photos : Yann Borgnet",
    // 20 photos disponibles au total (aucune exclue), toutes visibles dès le
    // chargement (mosaïque courte, pas besoin de dépliage pour ce nombre).
    photos: [
      photos.skieurFaceAUnSommetPyramidal,
      photos.progressionVersUnColDuVerwall,
      photos.groupeRemontantUnVallonEncaisse,
      photos.sommetEffileDansLeBrouillard,
      photos.descenteSousUneGrandeParoi,
      photos.petitDejeunerDansUneCabane,
      photos.skieurSolitaireAuDessusDesVallees,
      photos.descenteSurUneLargePente,
      photos.virageDansUneCombeEnneigee,
      photos.vueMatinaleDepuisLaFenetreDuRefuge,
      photos.preparationDuCafeAvantLeDepart,
      photos.monteeSolitaireSurUnPlateau,
      photos.groupeTracantDansLaNeigeFraiche,
      photos.descenteDunSkieurSurUnePenteRaide,
      photos.virageAppuyeSousLesCretes,
      photos.traverseeAuDessusDunVallon,
      photos.monteeDuGroupeAuDessusDesForets,
      photos.chauffageAuPoeleDansLaCabane,
      photos.pauseBoissonApresLetape,
      photos.egliseDeMontagneSousLaNeige,
    ],
    initialPortfolioCount: 20,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera. */
export const indexCover = photos.skieurFaceAUnSommetPyramidal;
