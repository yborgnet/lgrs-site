/**
 * Topo n° 1 — Dammastock · Une grande traversée des Alpes uranaises.
 *
 * Principe : la traversée a été « grignotée » en deux raids (avril 2023 et fin
 * mars 2025). Le topo assemble les meilleures étapes des deux :
 *   J1–J3 : trace 2023 (data/gpx-sources/suisse-dammastock-2023.original.gpx, jours 1 à 3)
 *   J4–J5 : trace 2025 (data/gpx-sources/suisse-titlis-dammastock-2025.original.gpx, jours 3 et 4)
 *   J6    : trace 2025, jour 5, coupée à la fin du parcours à ski (point 6205,
 *           ~1 060 m, à ~4 km d'Engelberg) : la suite de la trace est un trajet
 *           motorisé (vitesse > 30 km/h) puis les remontées vers le Jochpass.
 * Découpage, distances et dénivelés : méthode du site (docs/gpx-methodology.md,
 * segmentDays + computeDayStats, lissage par défaut, arrondi à 10 m) —
 * mêmes valeurs que les carnets pour les étapes communes. Script :
 * scripts/gpx-topo-dammastock.ts (produit aussi public/gpx/topo-dammastock-alpes-uranaises.gpx).
 *
 * NB : le brief citait 72 km · D+ 8 220 · D− 8 360, calculés sur une trace
 * fusionnée qui n'est pas dans le dépôt ; les chiffres ci-dessous viennent des
 * GPX originaux archivés (écarts : lissage différent, et J6 arrêtée à la fin du
 * ski au lieu du centre d'Engelberg).
 *
 * Hébergements : contacts fournis par Yann (vérifiés en ligne en novembre 2026,
 * à reconfirmer). Coordonnées : points de la trace GPX à l'arrivée/au départ.
 */
import type { Topo } from "./types";
import profile from "./dammastock-alpes-uranaises.profile.json";
import gallery from "./dammastock-alpes-uranaises.gallery.json";

const AC = { fr: "à compléter", en: "to be completed", it: "da completare" };

export const dammastock: Topo = {
  slug: "dammastock-alpes-uranaises",
  updated: "2026-11-23",
  photoHero: {
    src: "/photos/Suisse Titlis/suisse-dammastock-titlis-ski-randonnee-dsc09268-026.jpg",
    alt: {
      fr: "Skieurs de randonnée en traversée sous les sommets, au-dessus du Grassenbiwak, Alpes uranaises (Suisse)",
      en: "Ski tourers traversing below the summits above the Grassenbiwak, Uri Alps (Switzerland)",
      it: "Scialpinisti in traversata sotto le cime sopra il Grassenbiwak, Alpi Urane (Svizzera)",
    },
    caption: { fr: "", en: "", it: "" },
    width: 1616,
    height: 1080,
  },
  name: { fr: "Dammastock", en: "Dammastock", it: "Dammastock" },
  subtitle: {
    fr: "Une grande traversée des Alpes uranaises",
    en: "A great ski traverse of the Uri Alps",
    it: "Una grande traversata delle Alpi Urane",
  },
  country: { fr: "Suisse", en: "Switzerland", it: "Svizzera" },
  massif: { fr: "Alpes uranaises", en: "Uri Alps", it: "Alpi Urane" },
  seo: {
    title: {
      fr: "Topo ski de randonnée — Dammastock, traversée des Alpes uranaises | Les Grands Raids à Ski",
      en: "Ski touring topo — Dammastock, traverse of the Uri Alps | Les Grands Raids à Ski",
      it: "Topo scialpinismo — Dammastock, traversata delle Alpi Urane | Les Grands Raids à Ski",
    },
    description: {
      fr: "Topo de la traversée du Dammastock à ski de randonnée : 6 jours, 70 km, 8 100 m D+, Sustenhorn 3 503 m. Salbithütte, Voralphütte, Steingletscher, Grassenbiwak, Spannorthütte. Carte, GPX, étapes et contacts.",
      en: "Ski touring topo of the Dammastock traverse: 6 days, 70 km, 8,100 m of ascent, Sustenhorn 3,503 m. Salbithütte, Voralphütte, Steingletscher, Grassenbiwak, Spannorthütte. Map, GPX, stages and contacts.",
      it: "Topo della traversata del Dammastock con gli sci: 6 giorni, 70 km, 8.100 m D+, Sustenhorn 3.503 m. Salbithütte, Voralphütte, Steingletscher, Grassenbiwak, Spannorthütte. Mappa, GPX, tappe e contatti.",
    },
  },
  stats: {
    days: 6,
    distanceKm: 69.8,
    ascentM: 8100,
    descentM: 8170,
    highPoint: { name: "Sustenhorn", ele: 3503 },
  },
  facts: [
    { label: { fr: "Pays", en: "Country", it: "Paese" }, value: { fr: "Suisse", en: "Switzerland", it: "Svizzera" } },
    {
      label: { fr: "Massif", en: "Range", it: "Massiccio" },
      value: {
        fr: "Alpes uranaises (Dammastock, Sustenhorn, Titlis)",
        en: "Uri Alps (Dammastock, Sustenhorn, Titlis)",
        it: "Alpi Urane (Dammastock, Sustenhorn, Titlis)",
      },
    },
    { label: { fr: "Départ", en: "Start", it: "Partenza" }, value: { fr: "Abfrutt (Göschenertal), 1 170 m", en: "Abfrutt (Göschenertal), 1,170 m", it: "Abfrutt (Göschenertal), 1.170 m" } },
    { label: { fr: "Arrivée", en: "Finish", it: "Arrivo" }, value: { fr: "Engelberg", en: "Engelberg", it: "Engelberg" } },
    {
      label: { fr: "Accès en transports publics", en: "Public transport", it: "Trasporti pubblici" },
      value: {
        fr: "Retour depuis Engelberg en train.",
        en: "Return from Engelberg by train.",
        it: "Ritorno da Engelberg in treno.",
      },
    },
    { label: { fr: "Forme", en: "Type", it: "Tipo" }, value: { fr: "Traversée", en: "Traverse (one way)", it: "Traversata" } },
    { label: { fr: "Durée", en: "Duration", it: "Durata" }, value: { fr: "6 jours", en: "6 days", it: "6 giorni" } },
    { label: { fr: "Distance", en: "Distance", it: "Distanza" }, value: { fr: "69,8 km", en: "69.8 km", it: "69,8 km" } },
    { label: { fr: "Dénivelé positif", en: "Ascent", it: "Dislivello positivo" }, value: { fr: "8 100 m", en: "8,100 m", it: "8.100 m" } },
    { label: { fr: "Dénivelé négatif", en: "Descent", it: "Dislivello negativo" }, value: { fr: "8 170 m", en: "8,170 m", it: "8.170 m" } },
    { label: { fr: "Point haut", en: "High point", it: "Punto più alto" }, value: { fr: "Sustenhorn, 3 503 m", en: "Sustenhorn, 3,503 m", it: "Sustenhorn, 3.503 m" } },
    {
      label: { fr: "Période conseillée", en: "Best period", it: "Periodo consigliato" },
      value: { fr: "Fin mars – début avril", en: "Late March – early April", it: "Fine marzo – inizio aprile" },
    },
    {
      label: { fr: "Terrain / difficulté", en: "Terrain / difficulty", it: "Terreno / difficoltà" },
      value: {
        fr: "Glaciers, couloirs autour de 40°, passages skis sur le sac.",
        en: "Glaciers, couloirs around 40°, sections with skis on the pack.",
        it: "Ghiacciai, canali intorno ai 40°, tratti con gli sci sullo zaino.",
      },
    },
    { label: { fr: "Matériel spécifique", en: "Specific equipment", it: "Materiale specifico" }, value: null },
    {
      label: { fr: "Cartes", en: "Maps", it: "Carte" },
      value: {
        fr: "Swisstopo 1:25 000 et 1:50 000 SKI",
        en: "Swisstopo 1:25,000 and 1:50,000 SKI",
        it: "Swisstopo 1:25.000 e 1:50.000 SKI",
      },
    },
  ],
  gpx: "/gpx/topo-dammastock-alpes-uranaises.gpx",
  points: [
    { id: "abfrutt", kind: "depart", name: "Abfrutt", lat: 46.6653, lon: 8.5697, ele: 1170 },
    { id: "salbit", kind: "refuge", name: "Salbithütte", lat: 46.6766, lon: 8.5518, ele: 2105 },
    { id: "voralp", kind: "refuge", name: "Voralphütte", lat: 46.6905, lon: 8.4877, ele: 2126 },
    { id: "sustenhorn", kind: "sommet", name: "Sustenhorn", lat: 46.6989, lon: 8.4551, ele: 3503 },
    { id: "steingletscher", kind: "hotel", name: "Steingletscher", lat: 46.7306, lon: 8.4277, ele: 1865 },
    { id: "grassen", kind: "bivouac", name: "Grassenbiwak", lat: 46.7702, lon: 8.4467, ele: 2647 },
    { id: "spannort", kind: "refuge", name: "Spannorthütte", lat: 46.7998, lon: 8.5097, ele: 1956 },
    { id: "engelberg", kind: "arrivee", name: "Engelberg", lat: 46.8058, lon: 8.4452, ele: 1060 },
  ],
  profile: profile as [number, number, number][],
  stages: [
    {
      day: 1, from: "Abfrutt", to: "Salbithütte", source: "2023",
      distanceKm: 4.8, ascentM: 960, descentM: 0, recordedMin: 160,
      waypoints: ["Abfrutt (Göschenertal)", "Salbithütte"],
      keyPassages: [],
      nightId: "salbit",
    },
    {
      day: 2, from: "Salbithütte", to: "Voralphütte", source: "2023",
      distanceKm: 14.1, ascentM: 1810, descentM: 1790, recordedMin: 530,
      waypoints: ["Meiggelengrat", "Fluelücke"],
      keyPassages: [
        { fr: "Montée en couloir et passage d’arête, skis sur le sac (point haut de l’étape vers 3 150 m)", en: "Couloir climb and ridge section with skis on the pack (stage high point around 3,150 m)", it: "Salita in canale e tratto di cresta con gli sci sullo zaino (punto più alto della tappa intorno ai 3.150 m)" },
      ],
      nightId: "voralp",
    },
    {
      day: 3, from: "Voralphütte", to: "Steingletscher", source: "2023",
      distanceKm: 13.6, ascentM: 1410, descentM: 1680, recordedMin: 425,
      waypoints: ["Sustenhorn (3 503 m)", "Steigletscher"],
      keyPassages: [
        { fr: "Montée à pied, skis sur le sac, sous le Sustenhorn", en: "Climb on foot with skis on the pack below the Sustenhorn", it: "Salita a piedi con gli sci sullo zaino sotto lo Sustenhorn" },
        { fr: "Glacier : Steigletscher", en: "Glacier: Steigletscher", it: "Ghiacciaio: Steigletscher" },
      ],
      nightId: "steingletscher",
    },
    {
      day: 4, from: "Steingletscher", to: "Grassenbiwak", source: "2025",
      distanceKm: 9.4, ascentM: 1510, descentM: 720, recordedMin: 370,
      waypoints: ["Obertaljoch", "Wendengletscher"],
      keyPassages: [
        { fr: "Glacier : Wendengletscher", en: "Glacier: Wendengletscher", it: "Ghiacciaio: Wendengletscher" },
        { fr: "Étape commune aux raids 2023 et 2025", en: "Stage shared by the 2023 and 2025 trips", it: "Tappa comune ai raid 2023 e 2025" },
      ],
      nightId: "grassen",
    },
    {
      day: 5, from: "Grassenbiwak", to: "Spannorthütte", source: "2025",
      distanceKm: 12.6, ascentM: 1130, descentM: 1810, recordedMin: 480,
      waypoints: ["Grassen (2 946 m)", "Bärenhorn"],
      keyPassages: [],
      nightId: "spannort",
    },
    {
      day: 6, from: "Spannorthütte", to: "Engelberg", source: "2025",
      distanceKm: 15.3, ascentM: 1280, descentM: 2170, recordedMin: 560,
      waypoints: ["Wissberg (2 627 m)", "Engelberg"],
      keyPassages: [
        { fr: "Départ de la Spannorthütte dans une pente raide, souvent verglacée au petit matin", en: "Departure from the Spannorthütte up a steep slope, often icy early in the morning", it: "Partenza dalla Spannorthütte su un pendio ripido, spesso ghiacciato al mattino presto" },
        { fr: "La trace à ski s’arrête vers 1 060 m, à environ 4 km d’Engelberg ; en 2025, la suite s’est faite en véhicule", en: "The ski track ends around 1,060 m, about 4 km from Engelberg; in 2025 the rest was done by vehicle", it: "La traccia con gli sci termina intorno ai 1.060 m, a circa 4 km da Engelberg; nel 2025 il resto è stato percorso in veicolo" },
      ],
    },
  ],
  huts: [
    {
      id: "salbit", name: "Salbithütte SAC", ele: 2105,
      kind: { fr: "Refuge gardé (hors saison : local d’hiver)", en: "Staffed hut (off season: winter room)", it: "Rifugio custodito (fuori stagione: locale invernale)" },
      section: "SAC Lindenberg",
      places: { fr: "58 places", en: "58 places", it: "58 posti" },
      season: { fr: "Gardiennage de mi-juin à mi-octobre", en: "Staffed mid-June to mid-October", it: "Custodito da metà giugno a metà ottobre" },
      winterRoom: {
        fr: "Ouvert toute l’année selon le portail SAC ; capacité annoncée de 23 places par une autre source, à confirmer",
        en: "Open all year according to the SAC portal; another source gives 23 places, to be confirmed",
        it: "Aperto tutto l’anno secondo il portale SAC; un’altra fonte indica 23 posti, da confermare",
      },
      booking: null,
      phones: [{ label: { fr: "Refuge", en: "Hut", it: "Rifugio" }, value: "+41 41 885 14 31" }],
      email: "info@salbit.ch", website: "https://salbit.ch",
      lat: 46.6766, lon: 8.5518, notes: [], verified: "2026-11",
    },
    {
      id: "voralp", name: "Voralphütte SAC", ele: 2126,
      kind: { fr: "Refuge gardé (hors saison : local d’hiver)", en: "Staffed hut (off season: winter room)", it: "Rifugio custodito (fuori stagione: locale invernale)" },
      section: "SAC Uto",
      places: { fr: "40 places", en: "40 places", it: "40 posti" },
      season: null,
      winterRoom: { fr: "18 places, ouvert toute l’année", en: "18 places, open all year", it: "18 posti, aperto tutto l’anno" },
      booking: null,
      phones: [{ label: { fr: "Refuge", en: "Hut", it: "Rifugio" }, value: "+41 41 887 04 20" }],
      email: "info@voralphuette.ch", website: "https://voralphuette.ch",
      lat: 46.6905, lon: 8.4877,
      notes: [{ fr: "Gardienne : Petra Betschart", en: "Hut keeper: Petra Betschart", it: "Gestrice: Petra Betschart" }],
      verified: "2026-11",
    },
    {
      id: "steingletscher", name: "Berghotel Steingletscher / Alpin Center Sustenpass", ele: 1865,
      kind: { fr: "Hôtel de montagne gardé, au pied du Sustenpass", en: "Staffed mountain hotel below the Susten Pass", it: "Albergo di montagna custodito, ai piedi del passo del Susten" },
      places: null,
      season: {
        fr: "Ouvert fin mars en 2025 ; l’office du tourisme indique « du printemps à l’automne » : dates d’hiver à vérifier chaque saison",
        en: "Open in late March 2025; the tourist office says “spring to autumn”: winter dates to be checked every season",
        it: "Aperto a fine marzo nel 2025; l’ufficio turistico indica «dalla primavera all’autunno»: date invernali da verificare ogni stagione",
      },
      winterRoom: null,
      booking: null,
      phones: [{ label: { fr: "Hôtel", en: "Hotel", it: "Hotel" }, value: "+41 33 975 12 22" }],
      email: "info@sustenpass.ch", website: "https://sustenpass.ch",
      lat: 46.7306, lon: 8.4277, notes: [], verified: "2026-11",
    },
    {
      id: "grassen", name: "Grassenbiwak SAC", ele: 2647,
      kind: { fr: "Bivouac non gardé, cuisine autonome", en: "Unstaffed bivouac hut, self-catering", it: "Bivacco non custodito, cucina in autonomia" },
      section: "SAC Engelberg",
      places: {
        fr: "14 places (matelas et couvertures) + 4 places d’urgence",
        en: "14 places (mattresses and blankets) + 4 emergency places",
        it: "14 posti (materassi e coperte) + 4 posti di emergenza",
      },
      season: null,
      winterRoom: null,
      booking: { fr: "Réservation obligatoire sur le portail de réservation SAC", en: "Booking compulsory via the SAC booking portal", it: "Prenotazione obbligatoria sul portale di prenotazione SAC" },
      phones: [{ label: { fr: "Indiqué par Outdooractive, à confirmer avec la section", en: "Listed by Outdooractive, to be confirmed with the section", it: "Indicato da Outdooractive, da confermare con la sezione" }, value: "+41 76 304 08 77" }],
      email: "grassen.biwak@gmail.com", website: "https://sac-engelberg.ch/grassenbiwak",
      lat: 46.7702, lon: 8.4467,
      notes: [
        { fr: "Sur l’arête du Tierberg, au-dessus du Wendenjoch, face à la paroi du Titlis", en: "On the Tierberg ridge above the Wendenjoch, facing the Titlis face", it: "Sulla cresta del Tierberg, sopra il Wendenjoch, di fronte alla parete del Titlis" },
        { fr: "Apporter un sac à viande", en: "Bring a sleeping-bag liner", it: "Portare un sacco lenzuolo" },
        { fr: "Construit en 1970 ; un nouveau bivouac est en projet : vérifier l’état et les dates de chantier avant chaque saison", en: "Built in 1970; a new bivouac hut is planned: check its condition and building dates before each season", it: "Costruito nel 1970; è in progetto un nuovo bivacco: verificare lo stato e le date dei lavori prima di ogni stagione" },
      ],
      verified: "2026-11",
    },
    {
      id: "spannort", name: "Spannorthütte SAC", ele: 1956,
      kind: { fr: "Refuge gardé (hors saison : local d’hiver)", en: "Staffed hut (off season: winter room)", it: "Rifugio custodito (fuori stagione: locale invernale)" },
      section: "SAC Uto",
      places: { fr: "40 places", en: "40 places", it: "40 posti" },
      season: { fr: "Gardiennage de juin à octobre", en: "Staffed June to October", it: "Custodito da giugno a ottobre" },
      winterRoom: {
        fr: "Réservable hors gardiennage ; taxe de nuitée payée par TWINT ou bulletin de versement",
        en: "Bookable outside the staffed season; overnight fee paid by TWINT or payment slip",
        it: "Prenotabile fuori dal periodo di custodia; tassa di pernottamento pagata con TWINT o polizza di versamento",
      },
      booking: { fr: "hut-reservation.org ou par téléphone", en: "hut-reservation.org or by phone", it: "hut-reservation.org o per telefono" },
      phones: [
        { label: { fr: "Été", en: "Summer", it: "Estate" }, value: "+41 41 637 34 80" },
        { label: { fr: "Hiver", en: "Winter", it: "Inverno" }, value: "+41 79 869 97 20" },
      ],
      email: "info@spannorthuette.ch", website: "https://spannorthuette.ch",
      lat: 46.7998, lon: 8.5097, notes: [], verified: "2026-11",
    },
  ],
  variants: [
    {
      fr: "Retour d’Engelberg en train ; ou, comme en 2025, remontées mécaniques jusqu’au Jochpass puis descente du Gental jusqu’à Innertkirchen.",
      en: "Return from Engelberg by train; or, as in 2025, lifts up to the Jochpass then a descent of the Gental to Innertkirchen.",
      it: "Ritorno da Engelberg in treno; oppure, come nel 2025, impianti fino al Jochpass e discesa del Gental fino a Innertkirchen.",
    },
    {
      fr: "Approche du raid 2025 : de Guttannen à la Windegghütte, puis au Steingletscher (2 jours), à la place des étapes 1 à 3.",
      en: "Approach used in 2025: from Guttannen to the Windegghütte, then to Steingletscher (2 days), instead of stages 1 to 3.",
      it: "Approccio del raid 2025: da Guttannen alla Windegghütte, poi allo Steingletscher (2 giorni), al posto delle tappe da 1 a 3.",
    },
    {
      fr: "Fin du raid 2023 : du Steingletscher à la Sustlihütte, puis descente vers Farnigen (2 jours), à la place des étapes 4 à 6.",
      en: "End of the 2023 trip: from Steingletscher to the Sustlihütte, then down to Farnigen (2 days), instead of stages 4 to 6.",
      it: "Fine del raid 2023: dallo Steingletscher alla Sustlihütte, poi discesa verso Farnigen (2 giorni), al posto delle tappe da 4 a 6.",
    },
  ],
  gallery: gallery as Topo["gallery"],
  recits: [
    {
      href: "/traversee-dammastock-2023/",
      title: { fr: "Traversée du Dammastock, 2023", en: "Dammastock traverse, 2023", it: "Traversata del Dammastock, 2023" },
      meta: { fr: "Avril 2023 · Abfrutt → Farnigen · étapes 1 à 3 du topo", en: "April 2023 · Abfrutt → Farnigen · topo stages 1 to 3", it: "Aprile 2023 · Abfrutt → Farnigen · tappe 1-3 del topo" },
      photo: "/photos/Dammastock 2023/dammastock-suisse-mer-nuages-sommets.jpg",
    },
    {
      href: "/dammastock-titlis-traversee-ski-randonnee/",
      title: { fr: "Dammastock–Titlis, 2025", en: "Dammastock–Titlis, 2025", it: "Dammastock–Titlis, 2025" },
      meta: { fr: "Mars 2025 · Guttannen → Innertkirchen · étapes 4 à 6 du topo", en: "March 2025 · Guttannen → Innertkirchen · topo stages 4 to 6", it: "Marzo 2025 · Guttannen → Innertkirchen · tappe 4-6 del topo" },
      photo: "/photos/Suisse Titlis/suisse-dammastock-titlis-ski-randonnee-dsc09606-038.jpg",
    },
  ],
  method: {
    fr: "Chiffres calculés sur les traces GPX enregistrées lors des deux raids (étapes 1 à 3 : avril 2023 ; étapes 4 à 6 : mars 2025), dénivelés lissés et arrondis à 10 m. Durées : temps réellement enregistré, pauses comprises.",
    en: "Figures computed from the GPX tracks recorded on the two trips (stages 1 to 3: April 2023; stages 4 to 6: March 2025), smoothed elevation rounded to 10 m. Durations: time actually recorded, breaks included.",
    it: "Dati calcolati sulle tracce GPX registrate durante i due raid (tappe 1-3: aprile 2023; tappe 4-6: marzo 2025), dislivelli livellati e arrotondati a 10 m. Durate: tempo effettivamente registrato, pause comprese.",
  },
};

export { AC };
