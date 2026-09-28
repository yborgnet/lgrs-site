import type { Voyage } from "./types";

export const armenie: Voyage = {
  slug: "ski-randonnee-armenie-sevan-aragats-2027",
  seo: {
    title: "Ski en Arménie : du lac Sevan à l’Aragats 2027",
    description:
      "Traversée à ski en Arménie, du lac Sevan au massif de l’Aragats : forêts, hauts plateaux, volcans et nuits chez l’habitant.",
    ogImage:
      "/images/Armenie-—-Parc-national-de-Dilijan-en-hiver.jpg",
  },
  masthead: {
    eyebrow: "Voyage à ski de randonnée",
    title: "ARMÉNIE",
    meta: ["SEVAN À L’ARAGATS", "2027"],
  },
  description: {
    label: "Description du voyage",
    title: "8 jours de traversée du lac Sevan à l’Aragats",
    paragraphs: [
      "<strong>Une itinérance à ski de village en village, des rives du lac Sevan au massif de l’Aragats.</strong>",
      "L’Arménie est probablement la plus belle surprise de cette collection. Peu connue des skieurs, elle permet de relier forêts, hauts plateaux et volcans en dormant chaque soir chez l’habitant ou dans de petites guest houses.",
      "Depuis Sevan, la ligne traverse Dilijan, Margahovit, Meghradzor et Aghveran avant le mont Ara et l’Aragats. Comme toujours, neige et météo garderont le dernier mot sur le détail des étapes.",
    ],
  },
  photoIntro: {
    src: "/images/Armenie-—-Parc-national-de-Dilijan-en-hiver.jpg",
    alt: "Parc national de Dilijan en hiver, Arménie",
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Arménie" },
      { label: "Massifs", value: "Sevan, Dilijan, mont Ara et Aragats" },
      { label: "Ville d’accès et de retour", value: "Erevan, vols depuis Paris, Genève ou autres villes" },
      { label: "Durée", value: "10 jours / 9 nuits, dont 8 jours de ski" },
      { label: "Dates", value: "du samedi 20 février au lundi 1er mars 2027" },
      { label: "Forme du voyage", value: "itinérance de village en village et traversée de massifs volcaniques" },
      { label: "Hébergements", value: "chez l’habitant, petites guest houses familiales, station météorologique de Kari Lake et hôtel à Erevan" },
      { label: "Participants", value: "5 à 6, plus le guide" },
      { label: "Prix avec vol", value: "3 770 €" },
      { label: "Prix hors vol", value: "3 220 € au départ d’Erevan" },
      { label: "Physique", value: "★★★★☆ 4/5" },
      { label: "Technique ski", value: "★★★☆☆ 3/5" },
      { label: "Engagement", value: "★★★☆☆ 3/5" },
      { label: "Encadrant", value: "Yann Borgnet, guide de haute montagne UIAGM" },
    ],
    note: "Le séjour s’adresse à des skieurs de randonnée expérimentés, en bonne condition physique, capables d’enchaîner plusieurs journées complètes. Une bonne maîtrise du ski en toutes neiges et des conversions est indispensable. L’itinérance, l’altitude et l’adaptation permanente aux conditions constituent l’essentiel de l’engagement.",
  },
  photoInfo: {
    src: "/images/Armenie-—-Mont-Aragats-depuis-Kari-Lake.jpg",
    alt: "Mont Aragats enneigé vu depuis le lac Kari gelé en Arménie",
  },
  bigPhoto: {
    src: "/images/Armenie-—-Mont-Aragats-depuis-Kari-Lake.jpg",
    alt: "Mont Aragats enneigé vu depuis le lac Kari gelé en Arménie",
  },
  itinerary: {
    eyebrow: "Itinéraire",
    title: "10 jours. Du lac Sevan à l’Aragats.",
    intro:
      "Une traversée à ski de village en village, depuis les forêts du nord et les rives du lac Sevan jusqu’aux reliefs volcaniques du mont Ara et de l’Aragats.",
    gpx: "/gpx/armenie-sevan-aragats-2027.gpx",
    mapTitle: "Carte de l’itinéraire du voyage à ski en Arménie – du lac Sevan à l’Aragats",
    /* Stats par jour calculées depuis les 7 <trkseg> natifs de public/gpx/
       armenie-sevan-aragats-2027.gpx (trace planifiée AlpineQuest, non modifiée) —
       reproductible via `node scripts/gpx-report-armenie.ts`. Confirmé avec Yann :
       chaque <trkseg> est une portion réellement skiée ; les écarts entre segments
       (6,48 / 0 / 0,04 / 3,06 / 8,76 / 0,15 km) sont des transferts taxi/véhicule,
       jamais comblés par une trace ski reconstruite (voir docs/gpx-methodology.md).
       Élévation : trace planifiée échantillonnée sur MNT (espacement moyen ~130 m,
       pas un enregistrement GPS/baro dense) — le lissage par défaut (fenêtre 9 pts
       ≈ 1 km) gommerait du vrai relief plutôt que du bruit capteur, donc hystérésis
       légère (3 m, sans moyenne glissante) plutôt que les réglages par défaut.
       J8 (Pentes de l'Aragats) est une journée de réserve sans trace GPX dédiée :
       aucune stat n'est inventée pour ce jour. */
    items: [
      { type: "chapter", label: "Nord", title: "Sevan · Dilijan · hauts plateaux" },
      {
        type: "day",
        dayNum: "J1",
        dateLabel: "20 FÉV",
        title: "France → Erevan",
        text: "Vol vers l’Arménie, puis arrivée à Erevan.",
        variant: "travel",
      },
      {
        type: "day",
        dayNum: "J2",
        dateLabel: "21 FÉV",
        title: "Lac Sevan → Dilijan",
        text: "Transfert matinal vers les rives du lac Sevan, puis première traversée à ski vers Dilijan et les forêts du nord du pays.",
        distanceKm: 16.9,
        ascentM: 1280,
        descentM: 1860,
      },
      {
        type: "day",
        dayNum: "J3",
        dateLabel: "22 FÉV",
        title: "Dilijan → Margahovit",
        text: "Traversée à ski entre forêts et clairières jusqu’à Margahovit. Nuit en guest house.",
        distanceKm: 11.6,
        ascentM: 1150,
        descentM: 840,
      },
      {
        type: "day",
        dayNum: "J4",
        dateLabel: "23 FÉV",
        title: "Margahovit → Meghradzor",
        text: "Une nouvelle étape d’itinérance à travers les hauts plateaux arméniens, de village en village.",
        distanceKm: 24.2,
        ascentM: 1870,
        descentM: 1840,
      },
      {
        type: "day",
        dayNum: "J5",
        dateLabel: "24 FÉV",
        title: "Meghradzor → Aghveran",
        text: "Traversée à ski vers Aghveran, avec un nouvel accueil local à l’arrivée.",
        distanceKm: 26.5,
        ascentM: 1330,
        descentM: 1290,
      },
      { type: "chapter", label: "Ouest", title: "Mont Ara · massif de l’Aragats" },
      {
        type: "day",
        dayNum: "J6",
        dateLabel: "25 FÉV",
        title: "Aghveran → Taghenik / Karashamb",
        text: "Progression vers les reliefs du mont Ara et les villages de Taghenik ou Karashamb, selon les conditions.",
        distanceKm: 9.6,
        ascentM: 830,
        descentM: 780,
      },
      {
        type: "day",
        dayNum: "J7",
        dateLabel: "26 FÉV",
        title: "Taghenik / Karashamb → Aragats",
        text: "Traversée à ski vers le massif de l’Aragats et changement d’échelle à l’approche du point culminant du pays.",
        distanceKm: 16.6,
        ascentM: 1580,
        descentM: 340,
      },
      {
        type: "day",
        dayNum: "J8",
        dateLabel: "27 FÉV",
        title: "Pentes de l’Aragats",
        text: "Journée de ski d’altitude sur les pentes du massif, avec un itinéraire choisi en fonction de la neige et de la météo.",
      },
      {
        type: "day",
        dayNum: "J9",
        dateLabel: "28 FÉV",
        highlightLabel: "Point culminant",
        title: "Aragats · 4 090 m → Erevan",
        text: "Tentative du sommet de l’Aragats selon les conditions, puis retour vers Erevan pour la dernière nuit.",
        variant: "highlight",
        distanceKm: 21.2,
        ascentM: 1110,
        descentM: 2100,
      },
      {
        type: "day",
        dayNum: "J10",
        dateLabel: "1 MAR",
        title: "Erevan → France",
        text: "Vol retour.",
        variant: "travel",
      },
    ],
    note: "Le tracé précis reste adaptable à l’enneigement, à la météo et aux conditions rencontrées. Cette souplesse fait partie intégrante du voyage.",
  },
  techCta: {
    span: "ARMÉNIE · SEVAN À L’ARAGATS · 2027",
    title: "Recevoir la fiche technique",
    text: "Programme détaillé, itinéraire, niveaux, prix et conditions du voyage.",
    buttonText: "Demander la fiche technique",
    buttonHref: "https://wa.me/33689295826",
  },
};
