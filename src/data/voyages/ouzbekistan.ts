import type { Voyage } from "./types";

export const ouzbekistan: Voyage = {
  slug: "ski-randonnee-ouzbekistan-traversee-baysun",
  seo: {
    title: "Ski en Ouzbékistan : massif du Hissar 2027",
    description:
      "Raid à ski dans le massif du Hissar en Ouzbékistan : exploration sauvage, bivouac, villages d’altitude et hospitalité au cœur de l’Asie centrale.",
    ogImage:
      "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/Illustration-FT-Ouzbekistan-scaled.jpeg",
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
    src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/Illustration-FT-Ouzbekistan-scaled.jpeg",
    alt: "Ski de randonnée en Ouzbékistan — massif du Hissar",
  },
  info: {
    label: "Informations",
    paragraphs: [
      "<strong>Pays :</strong> Ouzbékistan<br/><strong>Massif :</strong> Hissar<br/><strong>Ville d’accès et de retour :</strong> Samarcande, vols depuis Paris ou Genève<br/><strong>Durée :</strong> 10 jours / 9 nuits, 8 jours de ski<br/><strong>Dates :</strong> du jeudi 4 au samedi 13 février 2027<br/><strong>Forme du voyage :</strong> exploration itinérante puis traversée de village en village<br/><strong>Hébergements :</strong> guest-houses et une nuit en bivouac sous tente<br/><strong>Participants :</strong> 5 à 6, plus le guide<br/><strong>Prix avec vol :</strong> 4 090 €<br/><strong>Prix hors vol :</strong> 3 290 € au départ de Samarcande (réduction de 800 €)<br/><strong>Physique :</strong> ★★★★★<br/><strong>Technique ski :</strong> ★★★☆☆ 3/5<br/><strong>Engagement :</strong> ★★★★☆ 4/5<br/><strong>Encadrant :</strong> Yann Borgnet, guide de haute montagne UIAGM",
      "Le séjour demande une très bonne condition physique : huit journées de ski, environ 1 200 à 2 000 m de dénivelé positif selon les étapes et du matériel de bivouac à porter dans la première partie. Les pentes sont généralement modérées à soutenues, avec quelques passages possibles autour de 40°. L’engagement vient surtout de l’isolement : plusieurs journées loin des secours, peu d’infrastructures et une évacuation complexe.",
    ],
  },
  photoInfo: {
    src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/Illustration-FT-Ouzbekistan-1-scaled.jpeg",
    alt: "Montagnes enneigées du massif du Hissar en Ouzbékistan",
  },
  bigPhoto: {
    src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/Illustration-FT-Ouzbekistan-1-scaled.jpeg",
    alt: "Montagnes enneigées du massif du Hissar en Ouzbékistan",
  },
  itinerary: {
    eyebrow: "Itinéraire",
    title: "10 jours. Le Hissar en deux temps.",
    intro:
      "D’abord une exploration de vallées isolées, avec une nuit sous tente au cœur du massif. Puis une itinérance de village en village, avant une journée de battement qui pourra devenir dernière journée de ski ou découverte de Samarcande.",
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
      },
      {
        type: "day",
        dayNum: "J4",
        dateLabel: "07 FÉV",
        title: "Kosh-Kul → Zarmas",
        text: "Traversée des hautes vallées sauvages du Hissar jusqu’au campement de Zarmas. Nuit sous tente.",
      },
      {
        type: "day",
        dayNum: "J5",
        dateLabel: "08 FÉV",
        title: "Zarmas → Suvlisay ou Ammagan → Tamshush",
        text: "Ascension du Chorti Tog’i puis longue descente vers Suvlisay ou Ammagan selon les conditions. En fin de journée, court transfert d’environ une heure jusqu’à Tamshush. Nuit chez l’habitant.",
      },
      { type: "chapter", label: "Itinérance", title: "De village en village · 3 jours à ski" },
      {
        type: "day",
        dayNum: "J6",
        dateLabel: "09 FÉV",
        title: "Tamshush → Sarahashma",
        text: "Traversée à ski jusqu’au village de Sarahashma. Nuit chez l’habitant.",
      },
      {
        type: "day",
        dayNum: "J7",
        dateLabel: "10 FÉV",
        title: "Sarahashma → Gelon",
        text: "Belle étape de ski reliant les villages de Sarahashma et Gelon. Nuit chez l’habitant.",
      },
      {
        type: "day",
        dayNum: "J8",
        dateLabel: "11 FÉV",
        title: "Gelon → Kul’",
        text: "Dernière traversée de village en village jusqu’à Kul’. Nuit chez l’habitant.",
      },
      {
        type: "day",
        dayNum: "J9",
        dateLabel: "12 FÉV",
        highlightLabel: "Journée de battement",
        title: "Dernier ski ou Samarcande",
        text: "Dernière journée de ski ou retour à Samarcande pour découvrir la mythique cité de la Route de la Soie. Nuit à l’hôtel.",
        variant: "highlight",
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
