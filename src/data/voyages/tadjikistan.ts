import type { Voyage } from "./types";

// TODO(contenu manquant sur la source WordPress) :
// - aucune photo n'est encore configurée pour ce voyage (ni intro, ni info, ni photo pleine largeur).
// - l'image OpenGraph du site source pointe vers "ARVA-R32-test.jpg" (photo de test de matériel),
//   manifestement un placeholder : elle n'a pas été reprise ici. À fournir par Yann.
export const tadjikistan: Voyage = {
  slug: "ski-randonnee-tadjikistan-zeravshan-2027",
  seo: {
    title: "Ski au Tadjikistan : vallées du Zeravshan 2027",
    description:
      "Exploration à ski au Tadjikistan : Sarytag, Pereval Angisht et Haut-Zeravshan, avec bivouac sous tente et itinérance de village en village.",
  },
  masthead: {
    eyebrow: "Voyage à ski de randonnée",
    title: {
      desktop: "TADJIKISTAN",
      mobileLines: ["TADJIKI-", "STAN"],
    },
    meta: ["VALLÉES DU ZERAVSHAN", "2027"],
  },
  description: {
    label: "Description du voyage",
    title: "Exploration à ski des vallées oubliées du Zeravshan",
    paragraphs: [
      "<strong>Une exploration à ski dans les vallées oubliées du Zeravshan.</strong>",
      "Le Tadjikistan est sans doute le voyage le plus engagé de cette collection. D’abord autour de Sarytag et du Pereval Angisht, avec deux nuits sous tente pour rester plusieurs jours au cœur de la montagne. Puis dans le Haut-Zeravshan, entre Margib, Anzob et Marzich, de village en village.",
      "Vallées suspendues, hauts plateaux, cols et maisons habitées en hiver : ici plus qu’ailleurs, neige, météo et accès décideront de la ligne exacte du voyage.",
    ],
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Tadjikistan" },
      { label: "Région", value: "vallées du Zeravshan et Haut-Zeravshan" },
      { label: "Ville d’accès et de retour", value: "Douchanbé, vols via Istanbul depuis Paris ou Genève" },
      { label: "Durée", value: "9 jours / 8 nuits, environ 7 jours de ski" },
      { label: "Dates", value: "du dimanche 21 au lundi 29 mars 2027" },
      { label: "Forme du voyage", value: "exploration avec bivouac, puis itinérance de village en village" },
      { label: "Hébergements", value: "guest houses en pension complète et deux nuits sous tente" },
      { label: "Participants", value: "5 à 6, plus le guide" },
      { label: "Prix avec vol", value: "4 374 €" },
      { label: "Prix hors vol", value: "3 374 € au départ de Douchanbé" },
      { label: "Physique", value: "★★★★★ 5/5" },
      { label: "Technique ski", value: "★★★☆☆ 3/5" },
      { label: "Engagement", value: "★★★★★ 5/5" },
      { label: "Encadrant", value: "Yann Borgnet, guide de haute montagne UIAGM" },
    ],
    note: "Le séjour s’adresse à des skieurs de randonnée autonomes, en excellente condition physique, capables d’enchaîner plusieurs journées complètes avec un sac plus lourd pendant la partie bivouac. L’altitude, l’isolement, les deux nuits sous tente et l’absence de solutions de repli immédiates constituent l’essentiel de l’engagement.",
  },
  itinerary: {
    eyebrow: "Itinéraire",
    title: "9 jours. Deux visages du Zeravshan.",
    intro:
      "Une première exploration autonome autour du Pereval Angisht, avec deux nuits sous tente, puis une traversée entre les villages d’hiver du Haut-Zeravshan.",
    gpx: "/gpx/tadjikistan-zeravshan-2027.gpx",
    mapTitle: "Carte de l’itinéraire du voyage à ski au Tadjikistan – vallées du Zeravshan",
    items: [
      {
        type: "day",
        dayNum: "J1",
        dateLabel: "21 MAR",
        title: "Paris → Douchanbé",
        text: "Vol depuis Paris vers le Tadjikistan.",
        variant: "travel",
      },
      {
        type: "day",
        dayNum: "J2",
        dateLabel: "22 MAR",
        title: "Sarytag · mise en jambes",
        text: "Après un transfert matinal depuis Douchanbé, arrivée à Sarytag. Selon l’heure et les conditions, première sortie à ski sur les pentes dominant le village.",
      },
      { type: "chapter", label: "Exploration", title: "Pereval Angisht · 3 jours en autonomie" },
      {
        type: "day",
        dayNum: "J3",
        dateLabel: "23 MAR",
        title: "Vers le Pereval Angisht",
        text: "Entrée dans le secteur sauvage du Pereval Angisht et installation du premier bivouac sous tente.",
      },
      {
        type: "day",
        dayNum: "J4",
        dateLabel: "24 MAR",
        title: "Vallées du Pereval Angisht",
        text: "Exploration à ski entre vallées suspendues, cols d’altitude et vastes combes enneigées. Deuxième nuit sous tente.",
      },
      {
        type: "day",
        dayNum: "J5",
        dateLabel: "25 MAR",
        title: "Pereval Angisht → route du tunnel d’Anzob",
        text: "Dernière traversée dans le secteur, sortie vers la route du tunnel d’Anzob puis transfert vers le Haut-Zeravshan.",
      },
      { type: "chapter", label: "Traversée", title: "Haut-Zeravshan · Margib, Marzich et Anzob" },
      {
        type: "day",
        dayNum: "J6",
        dateLabel: "26 MAR",
        title: "Margib",
        text: "Départ de la traversée du Haut-Zeravshan depuis Margib, entre cols et vallées d’altitude. Nuit au village.",
      },
      {
        type: "day",
        dayNum: "J7",
        dateLabel: "27 MAR",
        title: "Margib → Marzich",
        text: "Traversée à ski vers Marzich par une succession de cols et de vallées d’altitude.",
      },
      {
        type: "day",
        dayNum: "J8",
        dateLabel: "28 MAR",
        highlightLabel: "Dernière journée à ski",
        title: "Marzich → Anzob → Douchanbé",
        text: "Dernière étape de la traversée vers Anzob, puis transfert de retour à Douchanbé en fin de journée.",
        variant: "highlight",
      },
      {
        type: "day",
        dayNum: "J9",
        dateLabel: "29 MAR",
        title: "Douchanbé → Paris",
        text: "Vol retour et arrivée en France.",
        variant: "travel",
      },
    ],
    note: "Ce programme est donné à titre indicatif. Nous devrons nous adapter à la météo, aux conditions de la montagne et au niveau des participants.",
  },
  techCta: {
    span: "TADJIKISTAN · ZERAVSHAN · 2027",
    title: "Recevoir la fiche technique",
    text: "Programme détaillé, itinéraire, niveaux, prix et conditions du voyage.",
    buttonText: "Demander la fiche technique",
    buttonHref: "https://wa.me/33689295826",
  },
};
