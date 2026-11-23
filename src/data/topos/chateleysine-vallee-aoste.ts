/**
 * Topo n° 2 — Chateleysine · Traversée à ski du massif, Vallée d'Aoste.
 *
 * Source unique : data/gpx-sources/italie-chateleysine-2024.original.gpx
 * (raid du 29 janvier au 1er février 2024). Découpage, distances et dénivelés :
 * méthode du site (docs/gpx-methodology.md, segmentDays + computeDayStats,
 * lissage par défaut, arrondi à 10 m). Script : scripts/gpx-topo-chateleysine.ts
 * (produit public/gpx/topo-chateleysine-vallee-aoste.gpx et le profil).
 *
 * Toponymie : départ Blavy et arrivée confirmés par Yann ; point haut (Mont Mary)
 * identifié par coordonnées, à confirmer.
 * Bivouacs : données croisées refuges.info / lovevda.it / inalto, novembre 2026,
 * à reconfirmer chaque saison. Pas de carnet publié : pas de bloc Récits.
 */
import type { Topo } from "./types";
import profile from "./chateleysine-vallee-aoste.profile.json";
import gallery from "./chateleysine-vallee-aoste.gallery.json";

const BIVOUAC = {
  fr: "Bivouac non gardé, toujours ouvert, cuisine autonome",
  en: "Unstaffed bivouac hut, always open, self-catering",
  it: "Bivacco non custodito, sempre aperto, cucina in autonomia",
};

export const chateleysine: Topo = {
  slug: "chateleysine-vallee-aoste",
  updated: "2026-11-23",
  photoHero: {
    src: "/photos/Italie Chateleysine/italie-chateleysine-ski-randonnee-dsc02563-010.jpg",
    alt: {
      fr: "Skieurs de randonnée en traversée montante, le Mont-Blanc à l'horizon, massif de Chateleysine (Vallée d'Aoste)",
      en: "Ski tourers on a rising traverse, Mont Blanc on the horizon, Chateleysine range (Aosta Valley)",
      it: "Scialpinisti in traverso ascendente, il Monte Bianco all'orizzonte, massiccio di Chateleysine (Valle d'Aosta)",
    },
    caption: { fr: "", en: "", it: "" },
    width: 1616,
    height: 1080,
  },
  name: { fr: "Chateleysine", en: "Chateleysine", it: "Chateleysine" },
  subtitle: {
    fr: "Une traversée de bivouac en bivouac au-dessus d'Aoste",
    en: "A bivouac-to-bivouac ski traverse above Aosta",
    it: "Una traversata di bivacco in bivacco sopra Aosta",
  },
  country: { fr: "Italie", en: "Italy", it: "Italia" },
  massif: { fr: "Vallée d'Aoste", en: "Aosta Valley", it: "Valle d'Aosta" },
  seo: {
    title: {
      fr: "Topo ski de randonnée — traversée du massif de Chateleysine, Vallée d'Aoste | Les Grands Raids à Ski",
      en: "Ski touring topo — Chateleysine traverse, Aosta Valley | Les Grands Raids à Ski",
      it: "Topo scialpinismo — traversata del massiccio di Chateleysine, Valle d'Aosta | Les Grands Raids à Ski",
    },
    description: {
      fr: "Topo de la traversée du massif de Chateleysine à ski de randonnée : 4 jours, 34 km, 3 600 m D+, trois nuits en bivouacs non gardés (Penne Nere, La Lliée, Rosaire et Clermont). Carte, GPX, étapes.",
      en: "Ski touring topo of the Chateleysine traverse: 4 days, 34 km, 3,600 m of ascent, three nights in unstaffed bivouac huts (Penne Nere, La Lliée, Rosaire et Clermont). Map, GPX, stages.",
      it: "Topo della traversata del massiccio di Chateleysine con gli sci: 4 giorni, 34 km, 3.600 m D+, tre notti in bivacchi non custoditi (Penne Nere, La Lliée, Rosaire et Clermont). Mappa, GPX, tappe.",
    },
  },
  stats: {
    days: 4,
    distanceKm: 34.4,
    ascentM: 3610,
    descentM: 3160,
    highPoint: { name: "Mont Mary", ele: 2815 },
  },
  facts: [
    { label: { fr: "Pays", en: "Country", it: "Paese" }, value: { fr: "Italie", en: "Italy", it: "Italia" } },
    {
      label: { fr: "Massif", en: "Range", it: "Massiccio" },
      value: {
        fr: "Chateleysine, entre Valpelline et vallon de Saint-Barthélemy (Vallée d'Aoste)",
        en: "Chateleysine, between the Valpelline and the Saint-Barthélemy valley (Aosta Valley)",
        it: "Chateleysine, tra la Valpelline e la valle di Saint-Barthélemy (Valle d'Aosta)",
      },
    },
    {
      label: { fr: "Départ", en: "Start", it: "Partenza" },
      value: {
        fr: "Blavy (Roisan), 1 490 m",
        en: "Blavy (Roisan), 1,490 m",
        it: "Blavy (Roisan), 1.490 m",
      },
    },
    {
      label: { fr: "Arrivée", en: "Finish", it: "Arrivo" },
      value: {
        fr: "Vallon de Saint-Barthélemy, vers 1 960 m",
        en: "Saint-Barthélemy valley, around 1,960 m",
        it: "Valle di Saint-Barthélemy, intorno ai 1.960 m",
      },
    },
    { label: { fr: "Accès en transports publics", en: "Public transport", it: "Trasporti pubblici" }, value: null },
    { label: { fr: "Forme", en: "Type", it: "Tipo" }, value: { fr: "Traversée", en: "Traverse (one way)", it: "Traversata" } },
    { label: { fr: "Durée", en: "Duration", it: "Durata" }, value: { fr: "4 jours, 3 nuits en bivouac", en: "4 days, 3 nights in bivouac huts", it: "4 giorni, 3 notti in bivacco" } },
    { label: { fr: "Distance", en: "Distance", it: "Distanza" }, value: { fr: "34,4 km", en: "34.4 km", it: "34,4 km" } },
    { label: { fr: "Dénivelé positif", en: "Ascent", it: "Dislivello positivo" }, value: { fr: "3 610 m", en: "3,610 m", it: "3.610 m" } },
    { label: { fr: "Dénivelé négatif", en: "Descent", it: "Dislivello negativo" }, value: { fr: "3 160 m", en: "3,160 m", it: "3.160 m" } },
    {
      label: { fr: "Point haut", en: "High point", it: "Punto più alto" },
      value: { fr: "Mont Mary, 2 815 m (à confirmer)", en: "Mont Mary, 2,815 m (to be confirmed)", it: "Mont Mary, 2.815 m (da confermare)" },
    },
    {
      label: { fr: "Période conseillée", en: "Best period", it: "Periodo consigliato" },
      value: {
        fr: "Parcouru fin janvier (2024). Période conseillée : à compléter.",
        en: "Done in late January (2024). Best period: to be completed.",
        it: "Percorso a fine gennaio (2024). Periodo consigliato: da completare.",
      },
    },
    {
      label: { fr: "Terrain / difficulté", en: "Terrain / difficulty", it: "Terreno / difficoltà" },
      value: {
        fr: "Itinéraire non glaciaire, en autonomie complète (nourriture et réchaud pour trois nuits). Cotation : à compléter.",
        en: "Non-glaciated route, fully self-supported (food and stove for three nights). Grade: to be completed.",
        it: "Itinerario non glaciale, in completa autonomia (viveri e fornello per tre notti). Difficoltà: da completare.",
      },
    },
    { label: { fr: "Matériel spécifique", en: "Specific equipment", it: "Materiale specifico" }, value: null },
    { label: { fr: "Cartes", en: "Maps", it: "Carte" }, value: null },
  ],
  gpx: "/gpx/topo-chateleysine-vallee-aoste.gpx",
  points: [
    { id: "depart", kind: "depart", name: "Blavy", lat: 45.7769, lon: 7.3409, ele: 1490 },
    { id: "mary", kind: "sommet", name: "Mont Mary", lat: 45.793, lon: 7.3723, ele: 2815 },
    { id: "penne", kind: "bivouac", name: "Bivacco Penne Nere", lat: 45.7966, lon: 7.3674, ele: 2730 },
    { id: "lliee", kind: "bivouac", name: "Bivacco La Lliée", lat: 45.8178, lon: 7.4008, ele: 2422 },
    { id: "rosaire", kind: "bivouac", name: "Bivacco Rosaire et Clermont", lat: 45.8263, lon: 7.4581, ele: 2704 },
    { id: "arrivee", kind: "arrivee", name: "Vallon de Saint-Barthélemy", lat: 45.8038, lon: 7.4967, ele: 1960 },
  ],
  profile: profile as [number, number, number][],
  stages: [
    {
      day: 1, from: "Blavy", to: "Penne Nere", source: "2024",
      distanceKm: 8.2, ascentM: 1400, descentM: 150, recordedMin: 430,
      waypoints: ["Mont Mary (2 815 m, à confirmer)", "Bivacco Penne Nere"],
      keyPassages: [
        { fr: "Longue montée d'approche (1 400 m) ; en 2024, arrivée au bivouac à la frontale", en: "Long approach climb (1,400 m); in 2024, arrival at the bivouac by headtorch", it: "Lunga salita di avvicinamento (1.400 m); nel 2024, arrivo al bivacco con la frontale" },
      ],
      nightId: "penne",
    },
    {
      day: 2, from: "Penne Nere", to: "La Lliée", source: "2024",
      distanceKm: 8.2, ascentM: 790, descentM: 1100, recordedMin: 380,
      waypoints: ["Bivacco Penne Nere", "Bivacco La Lliée"],
      keyPassages: [],
      nightId: "lliee",
    },
    {
      day: 3, from: "La Lliée", to: "Rosaire et Clermont", source: "2024",
      distanceKm: 11.0, ascentM: 1100, descentM: 850, recordedMin: 480,
      waypoints: ["Col de Vessonaz (2 794 m)", "Bivacco Rosaire et Clermont"],
      keyPassages: [
        { fr: "Étape la plus longue ; point haut de l'étape vers 2 800 m, près du col de Vessonaz", en: "Longest stage; stage high point around 2,800 m, near the Col de Vessonaz", it: "Tappa più lunga; punto più alto della tappa intorno ai 2.800 m, vicino al colle di Vessonaz" },
      ],
      nightId: "rosaire",
    },
    {
      day: 4, from: "Rosaire et Clermont", to: "Saint-Barthélemy", source: "2024",
      distanceKm: 7.0, ascentM: 320, descentM: 1060, recordedMin: 180,
      waypoints: ["Vallon de Saint-Barthélemy"],
      keyPassages: [],
    },
  ],
  huts: [
    {
      id: "penne", name: "Bivacco Penne Nere", ele: 2730,
      kind: BIVOUAC,
      places: {
        fr: "14 places selon lovevda.it, 16 selon une autre source : à confirmer",
        en: "14 places according to lovevda.it, 16 according to another source: to be confirmed",
        it: "14 posti secondo lovevda.it, 16 secondo un'altra fonte: da confermare",
      },
      season: { fr: "Ouvert toute l'année", en: "Open all year", it: "Aperto tutto l'anno" },
      winterRoom: null,
      booking: null,
      phones: [],
      email: null, website: null,
      lat: 45.7966, lon: 7.3674,
      notes: [
        { fr: "Propriété de la commune de Valpelline ; construit en 2005", en: "Owned by the municipality of Valpelline; built in 2005", it: "Di proprietà del comune di Valpelline; costruito nel 2005" },
        { fr: "Pas d'eau : prévoir de faire fondre la neige", en: "No water: plan to melt snow", it: "Niente acqua: prevedere di sciogliere la neve" },
        { fr: "Éclairage à la bougie", en: "Candle lighting", it: "Illuminazione a candela" },
      ],
      verified: "2026-11",
    },
    {
      id: "lliee", name: "Bivacco La Lliée", ele: 2422,
      kind: BIVOUAC,
      places: { fr: "18 places", en: "18 places", it: "18 posti" },
      season: { fr: "Ouvert toute l'année", en: "Open all year", it: "Aperto tutto l'anno" },
      winterRoom: null,
      booking: null,
      phones: [
        { label: { fr: "Commune d'Oyace (à confirmer)", en: "Municipality of Oyace (to be confirmed)", it: "Comune di Oyace (da confermare)" }, value: "+39 0165 730914" },
      ],
      email: null, website: null,
      lat: 45.8178, lon: 7.4008,
      notes: [
        { fr: "Couvertures sur place", en: "Blankets on site", it: "Coperte sul posto" },
        { fr: "Point d'eau à une centaine de mètres (souvent sous la neige en hiver)", en: "Water point about 100 m away (often under snow in winter)", it: "Punto d'acqua a un centinaio di metri (spesso sotto la neve d'inverno)" },
      ],
      verified: "2026-11",
    },
    {
      id: "rosaire", name: "Bivacco Rosaire et Clermont", ele: 2704,
      kind: BIVOUAC,
      places: null,
      season: { fr: "Ouvert toute l'année", en: "Open all year", it: "Aperto tutto l'anno" },
      winterRoom: null,
      booking: null,
      phones: [
        { label: { fr: "Commune de Quart", en: "Municipality of Quart", it: "Comune di Quart" }, value: "+39 0165 762169" },
      ],
      email: null, website: null,
      lat: 45.8263, lon: 7.4581,
      notes: [
        { fr: "Sous le versant sud-est du col de Vessonaz (2 794 m) ; construit en 1990", en: "Below the south-east side of the Col de Vessonaz (2,794 m); built in 1990", it: "Sotto il versante sud-est del colle di Vessonaz (2.794 m); costruito nel 1990" },
        { fr: "Altitude donnée entre 2 692 et 2 704 m selon les sources", en: "Elevation given between 2,692 and 2,704 m depending on the source", it: "Quota indicata tra 2.692 e 2.704 m a seconda delle fonti" },
        { fr: "Couvertures, eau et latrines signalées", en: "Blankets, water and latrine reported", it: "Coperte, acqua e latrina segnalate" },
      ],
      verified: "2026-11",
    },
  ],
  variants: [
    {
      fr: "Échappatoires étape par étape : à compléter.",
      en: "Escape routes, stage by stage: to be completed.",
      it: "Vie di fuga tappa per tappa: da completare.",
    },
  ],
  gallery: gallery as Topo["gallery"],
  recits: [],
  method: {
    fr: "Chiffres calculés sur la trace GPX enregistrée lors du raid de janvier 2024, dénivelés lissés et arrondis à 10 m. Durées : temps réellement enregistré, pauses comprises. Bivouacs : données des sites refuges.info et lovevda.it, à vérifier avant chaque saison.",
    en: "Figures computed from the GPX track recorded on the January 2024 trip, smoothed elevation rounded to 10 m. Durations: time actually recorded, breaks included. Bivouac huts: data from refuges.info and lovevda.it, to be checked before each season.",
    it: "Dati calcolati sulla traccia GPX registrata durante il raid di gennaio 2024, dislivelli livellati e arrotondati a 10 m. Durate: tempo effettivamente registrato, pause comprese. Bivacchi: dati di refuges.info e lovevda.it, da verificare prima di ogni stagione.",
  },
};
