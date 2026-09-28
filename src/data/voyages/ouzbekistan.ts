import type { Voyage } from "./types";

export const ouzbekistan: Voyage = {
  slug: "ski-randonnee-ouzbekistan-traversee-baysun",
  seo: {
    title: "Ski en Ouzbékistan : massif du Hissar 2027",
    description:
      "Raid à ski dans le massif du Hissar en Ouzbékistan : exploration sauvage, bivouac, villages d’altitude et hospitalité au cœur de l’Asie centrale.",
    ogImage:
      "/images/Illustration-FT-Ouzbekistan-scaled.jpeg",
  },
  masthead: {
    eyebrow: "Voyage à ski de randonnée",
    title: "OUZBÉKIS­TAN",
    meta: ["HISSAR", "2027"],
  },
  description: {
    label: "Description du voyage",
    title: "Exploration itinérante dans le massif du Hissar",
    paragraphs: [
      "<strong>Montagnes sauvages, bivouac et villages d’altitude au cœur de l’Asie centrale.</strong>",
      "Ce raid dans le massif du Hissar se déroule en deux temps. D’abord une vraie exploration, avec des vallées reculées et une nuit sous tente au cœur de montagnes peu parcourues. Puis une itinérance de village en village, où les nuits chez l’habitant prennent autant de place que le ski.",
      "Samarcande ouvre et referme le voyage. Entre les deux, neige, météo et conditions d’accès décideront de la ligne exacte.",
    ],
  },
  photoIntro: {
    src: "/images/Illustration-FT-Ouzbekistan-scaled.jpeg",
    alt: "Ski de randonnée en Ouzbékistan — massif du Hissar",
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Ouzbékistan" },
      { label: "Massif", value: "Hissar" },
      { label: "Ville d’accès et de retour", value: "Samarcande, vols depuis Paris ou Genève" },
      { label: "Durée", value: "10 jours / 9 nuits, 8 jours de ski" },
      { label: "Dates", value: "du jeudi 4 au samedi 13 février 2027" },
      { label: "Forme du voyage", value: "exploration itinérante puis traversée de village en village" },
      { label: "Hébergements", value: "guest-houses et une nuit en bivouac sous tente" },
      { label: "Participants", value: "5 à 6, plus le guide" },
      { label: "Prix avec vol", value: "4 090 €" },
      { label: "Prix hors vol", value: "3 290 € au départ de Samarcande (réduction de 800 €)" },
      { label: "Physique", value: "★★★★★" },
      { label: "Technique ski", value: "★★★☆☆ 3/5" },
      { label: "Engagement", value: "★★★★☆ 4/5" },
      { label: "Encadrant", value: "Yann Borgnet, guide de haute montagne UIAGM" },
    ],
    note: "Le séjour demande une très bonne condition physique : huit journées de ski, environ 1 200 à 2 000 m de dénivelé positif selon les étapes et du matériel de bivouac à porter dans la première partie. Les pentes sont généralement modérées à soutenues, avec quelques passages possibles autour de 40°. L’engagement vient surtout de l’isolement : plusieurs journées loin des secours, peu d’infrastructures et une évacuation complexe.",
  },
  photoInfo: {
    src: "/images/Illustration-FT-Ouzbekistan-1-scaled.jpeg",
    alt: "Montagnes enneigées du massif du Hissar en Ouzbékistan",
  },
  bigPhoto: {
    src: "/images/Illustration-FT-Ouzbekistan-1-scaled.jpeg",
    alt: "Montagnes enneigées du massif du Hissar en Ouzbékistan",
  },
  itinerary: {
    eyebrow: "Itinéraire",
    title: "10 jours. Le Hissar en deux temps.",
    intro:
      "D’abord une exploration de vallées isolées, avec une nuit sous tente au cœur du massif. Puis une itinérance de village en village, avant une journée de battement qui pourra devenir dernière journée de ski ou découverte de Samarcande.",
    gpx: "/gpx/ouzbekistan-hissar-2027.gpx",
    mapTitle: "Carte de l’itinéraire du voyage à ski en Ouzbékistan – massif du Hissar",
    /* Stats par jour calculées depuis les 7 <trkseg> natifs de public/gpx/
       ouzbekistan-hissar-2027.gpx (trace planifiée, non modifiée) — reproductible via
       `node scripts/gpx-report-voyages.ts public/gpx/ouzbekistan-hissar-2027.gpx`.
       Les 7 segments correspondent à J3–J9 : le transfert d'environ une heure décrit en
       fin de J5 ("Suvlisay/Ammagan → Tamshush") correspond exactement à l'écart de
       16,4 km entre le 3e et le 4e segment, ce qui confirme ce calage. J2 (sortie en
       étoile à l'arrivée, itinéraire non fixé à l'avance) n'a pas de segment GPX dédié :
       aucune stat n'est inventée pour ce jour. Hystérésis légère (3 m, sans moyenne
       glissante) plutôt que le lissage par défaut — mêmes raisons que l'Arménie (trace
       échantillonnée sur MNT, pas un enregistrement GPS/baro dense). */
    items: [
      {
        type: "day",
        dayNum: "J1",
        dateLabel: "04 FÉV",
        title: "Paris / Genève → Samarcande",
        text: "Vol depuis Genève ou Paris vers Samarcande.",
        variant: "travel",
      },
      { type: "chapter", label: "Exploration", title: "Hissar sauvage · 4 jours à ski" },
      {
        type: "day",
        dayNum: "J2",
        dateLabel: "05 FÉV",
        title: "Samarcande → Hissar",
        text: "Arrivée matinale à Samarcande puis transfert vers le massif du Hissar. Première randonnée à ski en étoile afin de découvrir la région. Nuit chez l’habitant.",
      },
      {
        type: "day",
        dayNum: "J3",
        dateLabel: "06 FÉV",
        title: "Lyaylik → Kosh-Kul",
        text: "Départ de Lyaylik, montée vers l’observatoire de Maidanak puis traversée jusqu’au village de Kosh-Kul. Nuit chez l’habitant.",
        distanceKm: 23.8,
        ascentM: 1640,
        descentM: 1350,
      },
      {
        type: "day",
        dayNum: "J4",
        dateLabel: "07 FÉV",
        title: "Kosh-Kul → Zarmas",
        text: "Traversée des hautes vallées sauvages du Hissar jusqu’au campement de Zarmas. Nuit sous tente.",
        distanceKm: 19.7,
        ascentM: 1460,
        descentM: 1290,
      },
      {
        type: "day",
        dayNum: "J5",
        dateLabel: "08 FÉV",
        title: "Zarmas → Suvlisay ou Ammagan → Tamshush",
        text: "Ascension du Chorti Tog’i puis longue descente vers Suvlisay ou Ammagan selon les conditions. En fin de journée, court transfert d’environ une heure jusqu’à Tamshush. Nuit chez l’habitant.",
        distanceKm: 15.8,
        ascentM: 1360,
        descentM: 2120,
      },
      { type: "chapter", label: "Itinérance", title: "De village en village · 3 jours à ski" },
      {
        type: "day",
        dayNum: "J6",
        dateLabel: "09 FÉV",
        title: "Tamshush → Sarahashma",
        text: "Traversée à ski jusqu’au village de Sarahashma. Nuit chez l’habitant.",
        distanceKm: 14.7,
        ascentM: 1500,
        descentM: 1470,
      },
      {
        type: "day",
        dayNum: "J7",
        dateLabel: "10 FÉV",
        title: "Sarahashma → Gelon",
        text: "Belle étape de ski reliant les villages de Sarahashma et Gelon. Nuit chez l’habitant.",
        distanceKm: 8.0,
        ascentM: 1270,
        descentM: 1000,
      },
      {
        type: "day",
        dayNum: "J8",
        dateLabel: "11 FÉV",
        title: "Gelon → Kul’",
        text: "Dernière traversée de village en village jusqu’à Kul’. Nuit chez l’habitant.",
        distanceKm: 10.0,
        ascentM: 1040,
        descentM: 1020,
      },
      {
        type: "day",
        dayNum: "J9",
        dateLabel: "12 FÉV",
        highlightLabel: "Journée de battement",
        title: "Dernier ski ou Samarcande",
        text: "Dernière journée de ski ou retour à Samarcande pour découvrir la mythique cité de la Route de la Soie. Nuit à l’hôtel.",
        variant: "highlight",
        distanceKm: 8.2,
        ascentM: 1110,
        descentM: 1050,
      },
      {
        type: "day",
        dayNum: "J10",
        dateLabel: "13 FÉV",
        title: "Samarcande → Paris / Genève",
        text: "Transfert à l’aéroport et vol retour.",
        variant: "travel",
      },
    ],
    note: "Ce programme est donné à titre indicatif. Il pourra être adapté aux aléas de la météo, aux conditions de la montagne et au niveau des participants.",
  },
  techCta: {
    span: "OUZBÉKISTAN · HISSAR · 2027",
    title: "Recevoir la fiche technique",
    text: "Programme détaillé, niveaux, prix et conditions du voyage.",
    buttonText: "Demander la fiche technique",
    buttonHref: "https://wa.me/33689295826",
  },
};
