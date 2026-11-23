/**
 * Topo n° 2 — Chateleysine · Traversée à ski du massif, Vallée d'Aoste.
 *
 * Source unique : data/gpx-sources/italie-chateleysine-2024.original.gpx
 * (raid du 29 janvier au 1er février 2024). Découpage, distances et dénivelés :
 * méthode du site (docs/gpx-methodology.md, segmentDays + computeDayStats,
 * lissage par défaut, arrondi à 10 m). Script : scripts/gpx-topo-chateleysine.ts
 * (produit public/gpx/topo-chateleysine-vallee-aoste.gpx et le profil).
 *
 * Toponymie : départ Blavy et arrivée confirmés par Yann ; point haut Mont Mary
 * (2 815 m) identifié par les coordonnées de la trace.
 * Bivouacs : source unique lovevda.it (office du tourisme de la Vallée d'Aoste),
 * novembre 2026 ; champ sans donnée = champ masqué. Pas de carnet publié : pas de bloc Récits.
 */
import type { Topo } from "./types";
import profile from "./chateleysine-vallee-aoste.profile.json";
import gallery from "./chateleysine-vallee-aoste.gallery.json";

const BIVOUAC = {
  fr: "Bivouac non gardé, cuisine autonome",
  en: "Unstaffed bivouac hut, self-catering",
  it: "Bivacco non custodito, cucina in autonomia",
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
    {
      label: { fr: "Accès en transports publics", en: "Public transport", it: "Trasporti pubblici" },
      value: {
        fr: "Aller : Aoste est desservie par bus depuis Turin et Milan ; pas de ligne régulière identifiée jusqu'à Blavy (environ 12 km d'Aoste par la route) : taxi à prévoir. Retour : rejoindre Lignan (1 633 m), d'où une ligne Arriva descend à Nus quelques jours par semaine seulement, puis bus pour Aoste. Horaires à vérifier sur aosta.arriva.it.",
        en: "Outbound: Aosta is served by bus from Turin and Milan; no regular line found up to Blavy (about 12 km from Aosta by road): plan on a taxi. Return: walk to Lignan (1,633 m), from where an Arriva bus runs down to Nus only a few days a week, then bus to Aosta. Check timetables on aosta.arriva.it.",
        it: "Andata: Aosta è servita da autobus da Torino e Milano; nessuna linea regolare individuata fino a Blavy (circa 12 km da Aosta su strada): prevedere un taxi. Ritorno: raggiungere Lignan (1.633 m), da dove una linea Arriva scende a Nus solo alcuni giorni alla settimana, poi autobus per Aosta. Orari da verificare su aosta.arriva.it.",
      },
    },
    { label: { fr: "Forme", en: "Type", it: "Tipo" }, value: { fr: "Traversée", en: "Traverse (one way)", it: "Traversata" } },
    { label: { fr: "Durée", en: "Duration", it: "Durata" }, value: { fr: "4 jours, 3 nuits en bivouac", en: "4 days, 3 nights in bivouac huts", it: "4 giorni, 3 notti in bivacco" } },
    { label: { fr: "Distance", en: "Distance", it: "Distanza" }, value: { fr: "34,4 km", en: "34.4 km", it: "34,4 km" } },
    { label: { fr: "Dénivelé positif", en: "Ascent", it: "Dislivello positivo" }, value: { fr: "3 610 m", en: "3,610 m", it: "3.610 m" } },
    { label: { fr: "Dénivelé négatif", en: "Descent", it: "Dislivello negativo" }, value: { fr: "3 160 m", en: "3,160 m", it: "3.160 m" } },
    {
      label: { fr: "Point haut", en: "High point", it: "Punto più alto" },
      value: { fr: "Mont Mary, 2 815 m", en: "Mont Mary, 2,815 m", it: "Mont Mary, 2.815 m" },
    },
    {
      label: { fr: "Période conseillée", en: "Best period", it: "Periodo consigliato" },
      value: {
        fr: "De janvier à mars, selon l'enneigement : départ à 1 490 m et versants souvent au sud, la neige manque vite en bas. Parcouru fin janvier 2024.",
        en: "January to March, depending on snow cover: the start is at 1,490 m and many slopes face south, so the lower part loses its snow quickly. Done in late January 2024.",
        it: "Da gennaio a marzo, secondo l'innevamento: partenza a 1.490 m e versanti spesso a sud, la neve in basso sparisce in fretta. Percorso a fine gennaio 2024.",
      },
    },
    {
      label: { fr: "Terrain / difficulté", en: "Terrain / difficulty", it: "Terreno / difficoltà" },
      value: {
        fr: "BS (bon skieur, échelle italienne), cotation donnée par Gulliver.it pour les itinéraires du secteur Vessonaz–Lignan. Non glaciaire. Arête du Mont Mary parfois ventée et dure : crampons utiles. Autonomie complète (nourriture et réchaud pour trois nuits).",
        en: "BS (good skier, Italian scale), the grade given by Gulliver.it for routes around Vessonaz–Lignan. Non-glaciated. The Mont Mary ridge can be wind-scoured and hard: crampons useful. Fully self-supported (food and stove for three nights).",
        it: "BS (buon sciatore), difficoltà indicata da Gulliver.it per gli itinerari della zona Vessona–Lignan. Non glaciale. Dorsale del Mont Mary a volte ventata e dura: ramponi utili. Completa autonomia (viveri e fornello per tre notti).",
      },
    },
    {
      label: { fr: "Matériel spécifique", en: "Specific equipment", it: "Materiale specifico" },
      value: {
        fr: "Checklist raid à ski non glaciaire, cabanes non gardées →",
        en: "Non-glaciated ski tour checklist, unstaffed huts (in French) →",
        it: "Checklist raid con gli sci non glaciale, bivacchi (in francese) →",
      },
      href: "/checklist/?activite=raid&heb=cabane&opt=",
    },
    {
      label: { fr: "Cartes", en: "Maps", it: "Carte" },
      value: {
        fr: "L'Escursionista n° 6 « Valpelline, Saint-Barthélemy » 1:25 000 ; ou Fraternali n° 31 « Valpelline, Saint-Barthélemy, Aosta – Valle Centrale » 1:25 000",
        en: "L'Escursionista no. 6 “Valpelline, Saint-Barthélemy” 1:25,000; or Fraternali no. 31 “Valpelline, Saint-Barthélemy, Aosta – Valle Centrale” 1:25,000",
        it: "L'Escursionista n. 6 «Valpelline, Saint-Barthélemy» 1:25.000; oppure Fraternali n. 31 «Valpelline, Saint-Barthélemy, Aosta – Valle Centrale» 1:25.000",
      },
    },
  ],
  gpx: "/gpx/topo-chateleysine-vallee-aoste.gpx",
  points: [
    { id: "depart", kind: "depart", name: "Blavy", lat: 45.7769, lon: 7.3409, ele: 1490 },
    { id: "mary", kind: "sommet", name: "Mont Mary", lat: 45.793, lon: 7.3723, ele: 2815 },
    { id: "penne", kind: "bivouac", name: "Bivacco Penne Nere", lat: 45.7966, lon: 7.3674, ele: 2730 },
    { id: "lliee", kind: "bivouac", name: "Bivacco La Lliée", lat: 45.8178, lon: 7.4008, ele: 2422 },
    { id: "rosaire", kind: "bivouac", name: "Bivacco Rosaire et Clermont", lat: 45.8263, lon: 7.4581, ele: 2692 },
    { id: "arrivee", kind: "arrivee", name: "Vallon de Saint-Barthélemy", lat: 45.8038, lon: 7.4967, ele: 1960 },
  ],
  profile: profile as [number, number, number][],
  stages: [
    {
      day: 1, from: "Blavy", to: "Penne Nere", source: "2024",
      distanceKm: 8.2, ascentM: 1400, descentM: 150, recordedMin: 430,
      waypoints: ["Mont Mary (2 815 m)", "Bivacco Penne Nere"],
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
      places: { fr: "14 places", en: "14 places", it: "14 posti" },
      season: { fr: "Toujours ouvert", en: "Always open", it: "Sempre aperto" },
      winterRoom: null,
      booking: null,
      phones: [],
      email: null,
      website: "https://balteus.lovevda.it/en/database/7/bivouacs/valpelline/penne-nere-bivouac/2523",
      lat: 45.7966, lon: 7.3674,
      notes: [
        { fr: "Au col de Viou ; inauguré en 2005", en: "At the Col de Viou; opened in 2005", it: "Al colle di Viou; inaugurato nel 2005" },
        { fr: "Couvertures et réchaud à gaz", en: "Blankets and gas stove", it: "Coperte e fornello a gas" },
        { fr: "Accès d'été : environ 3 h depuis Blavy (sentier 105)", en: "Summer access: about 3 h from Blavy (trail 105)", it: "Accesso estivo: circa 3 h da Blavy (sentiero 105)" },
      ],
      verified: "2026-11",
    },
    {
      id: "lliee", name: "Bivacco La Lliée", ele: 2422,
      kind: BIVOUAC,
      places: { fr: "16 places", en: "16 places", it: "16 posti" },
      season: { fr: "Toujours ouvert", en: "Always open", it: "Sempre aperto" },
      winterRoom: null,
      booking: null,
      phones: [],
      email: null,
      website: "https://balteus.lovevda.it/en/database/7/bivouacs/oyace/la-lliee-bivouac/2503",
      lat: 45.8178, lon: 7.4008,
      notes: [
        { fr: "Dans le vallon de Verzignolette (Oyace), sous le col de l'Arpeyssaou", en: "In the Verzignolette valley (Oyace), below the Col de l'Arpeyssaou", it: "Nel vallone di Verzignolette (Oyace), sotto il colle dell'Arpeyssaou" },
        { fr: "Couvertures, réchaud à gaz et matériel de cuisine ; fontaine en été seulement", en: "Blankets, gas stove and cooking gear; fountain in summer only", it: "Coperte, fornello a gas e stoviglie; fontana solo d'estate" },
      ],
      verified: "2026-11",
    },
    {
      id: "rosaire", name: "Bivacco Rosaire et Clermont", ele: 2692,
      kind: BIVOUAC,
      places: { fr: "12 places", en: "12 places", it: "12 posti" },
      season: { fr: "Toujours ouvert", en: "Always open", it: "Sempre aperto" },
      winterRoom: null,
      booking: null,
      phones: [],
      email: null,
      website: "https://lovevda.it/en/database/7/bivouacs/quart/rosaire-clermont-bivouac/3251",
      lat: 45.8263, lon: 7.4581,
      notes: [
        { fr: "Sous le col de Vessonaz ; construit en 1990", en: "Below the Col de Vessonaz; built in 1990", it: "Sotto il colle di Vessona; costruito nel 1990" },
        { fr: "Couvertures, réchaud à gaz, eau au lac voisin, toilettes extérieures", en: "Blankets, gas stove, water from the nearby lake, outdoor toilet", it: "Coperte, fornello a gas, acqua dal laghetto vicino, servizio esterno" },
        { fr: "Accès d'été : 3 h 30 depuis Lignan", en: "Summer access: 3 h 30 from Lignan", it: "Accesso estivo: 3 h 30 da Lignan" },
      ],
      verified: "2026-11",
    },
  ],
  variants: [
    {
      fr: "Échappatoire depuis Penne Nere : retour à Blavy par l'itinéraire de montée, ou descente sur Valpelline par le vallon d'Arpisson.",
      en: "Escape from Penne Nere: back to Blavy along the ascent route, or down to Valpelline via the Arpisson valley.",
      it: "Via di fuga da Penne Nere: ritorno a Blavy per l'itinerario di salita, oppure discesa su Valpelline per il vallone di Arpisson.",
    },
    {
      fr: "Échappatoire depuis La Lliée : descente sur Oyace par le vallon de Verzignolette (Moncorvé, Vernosse).",
      en: "Escape from La Lliée: down to Oyace via the Verzignolette valley (Moncorvé, Vernosse).",
      it: "Via di fuga da La Lliée: discesa su Oyace per il vallone di Verzignolette (Moncorvé, Vernosse).",
    },
    {
      fr: "Échappatoire depuis Rosaire et Clermont : descente directe sur Lignan par l'alpe Champanement.",
      en: "Escape from Rosaire et Clermont: straight down to Lignan via the Champanement alp.",
      it: "Via di fuga da Rosaire et Clermont: discesa diretta su Lignan per l'alpe Champanement.",
    },
    {
      fr: "Ces descentes suivent des sentiers d'été : en hiver, l'itinéraire à ski dépend des conditions nivologiques.",
      en: "These descents follow summer trails: in winter, the ski line depends on snow and avalanche conditions.",
      it: "Queste discese seguono sentieri estivi: d'inverno la linea con gli sci dipende dalle condizioni nivologiche.",
    },
  ],
  gallery: gallery as Topo["gallery"],
  recits: [],
  method: {
    fr: "Chiffres calculés sur la trace GPX enregistrée lors du raid de janvier 2024, dénivelés lissés et arrondis à 10 m. Durées : temps réellement enregistré, pauses comprises. Bivouacs : fiches de l'office du tourisme de la Vallée d'Aoste (lovevda.it). Accès et cotation : Gulliver.it et Arriva. À vérifier avant chaque saison.",
    en: "Figures computed from the GPX track recorded on the January 2024 trip, smoothed elevation rounded to 10 m. Durations: time actually recorded, breaks included. Bivouac huts: Aosta Valley tourist office listings (lovevda.it). Access and grade: Gulliver.it and Arriva. To be checked before each season.",
    it: "Dati calcolati sulla traccia GPX registrata durante il raid di gennaio 2024, dislivelli livellati e arrotondati a 10 m. Durate: tempo effettivamente registrato, pause comprese. Bivacchi: schede dell'ufficio del turismo della Valle d'Aosta (lovevda.it). Accesso e difficoltà: Gulliver.it e Arriva. Da verificare prima di ogni stagione.",
  },
};
