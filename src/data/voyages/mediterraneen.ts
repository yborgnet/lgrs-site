import type { Voyage } from "./types";

// TODO(contenu manquant sur la source WordPress) :
// - aucune photo n'est encore configurée pour ce voyage (ni intro, ni info, ni photo pleine largeur).
// - l'image OpenGraph du site source pointe vers "ARVA-R32-test.jpg" (photo de test de matériel),
//   manifestement un placeholder : elle n'a pas été reprise ici. À fournir par Yann.
export const mediterraneen: Voyage = {
  slug: "raid-ski-mediterraneen-2027",
  seo: {
    title: "Raid à ski méditerranéen 2027 | Destination selon la neige",
    description:
      "Un raid à ski itinérant dans les montagnes méditerranéennes, avec destination choisie selon l’enneigement : Atlas, Kaçkar, Corse ou Abruzzes.",
  },
  masthead: {
    eyebrow: "Voyage à ski de randonnée",
    title: {
      desktop: "RAID À SKI MÉDITERRANÉEN",
      mobileLines: ["RAID À SKI", "MÉDITERR-", "ANÉEN"],
    },
    meta: ["2027"],
  },
  description: {
    label: "Description du voyage",
    title: "7 à 8 jours de ski, destination choisie avec l’hiver",
    paragraphs: [
      "<strong>Qui n’a jamais rêvé de skier face à la mer ?</strong>",
      "Les montagnes méditerranéennes offrent ce contraste rare entre neige et horizon marin, mais leur enneigement est trop irrégulier pour figer une destination un an à l’avance. Haut Atlas, Kaçkar, Corse ou Abruzzes : le massif sera choisi peu avant le départ, là où les conditions seront les meilleures.",
      "Le projet, lui, ne change pas : une vraie itinérance, un territoire à traverser et des habitants à rencontrer.",
    ],
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Destination", value: "choisie quelques jours ou semaines avant le départ selon les conditions" },
      { label: "Massifs possibles", value: "Haut Atlas, Kaçkar, Asturies, Abruzzes, Etna, Crète, Kabylie, Rila–Pirin, Corse ou Pyrénées françaises" },
      { label: "Durée", value: "10 jours / 9 nuits, dont 7 à 8 jours de ski" },
      { label: "Dates", value: "du vendredi 5 au dimanche 14 mars 2027" },
      { label: "Forme du voyage", value: "itinérance dans le massif offrant les meilleures conditions" },
      { label: "Hébergements", value: "variables selon la destination : hébergements locaux, refuges, cabanes ou bivouacs" },
      { label: "Participants", value: "5 à 6, plus le guide" },
      { label: "Prix", value: "de 1 500 € à 3 600 € selon la destination" },
      { label: "Physique", value: "★★★★★ 5/5" },
      { label: "Technique ski", value: "★★★★★ 5/5" },
      { label: "Engagement", value: "★★★★★ 5/5" },
      { label: "Encadrant", value: "Yann Borgnet, guide de haute montagne UIAGM" },
    ],
    note: "Ce voyage s’adresse à des skieurs de randonnée très expérimentés, en excellente condition physique, capables de s’adapter à un itinéraire, un climat et une logistique arrêtés tardivement. Le niveau réel sera précisé dès que la destination aura été choisie.",
  },
  itinerary: {
    eyebrow: "Destinations possibles",
    title: "Une date fixe. Le meilleur massif du moment.",
    intro:
      "Quelques jours ou semaines avant le départ, nous comparerons l’enneigement, la stabilité du manteau neigeux et la météo. Le voyage prendra alors la direction du massif offrant la meilleure combinaison entre qualité du ski, itinérance et présence de la mer. La Corse est le plan A, mais la destination définitive pourra être un autre massif selon les conditions.",
    gpx: "/gpx/corse-alta-strada-2027.gpx",
    mapTitle:
      "Trace indicative de l’Alta Strada en Corse (Cinto et Rotondo) — plan A, la destination définitive dépendra de l’enneigement",
    items: [
      { type: "chapter", label: "Afrique", title: "Des sommets enneigés au-dessus de la Méditerranée" },
      {
        type: "day",
        dayNum: "MAROC",
        title: "Haut Atlas",
        text: "Les plus hauts sommets d’Afrique du Nord, des vallées berbères et de grandes pentes dominant les plaines du sud. Une neige parfois éphémère, mais un décor et une culture de montagne exceptionnels.",
      },
      {
        type: "day",
        dayNum: "ALGÉRIE",
        title: "Kabylie · Djurdjura",
        text: "Une crête calcaire spectaculaire dressée au-dessus de la Méditerranée. Lorsque la neige descend suffisamment bas, le Djurdjura offre un ski rare, sauvage et profondément dépaysant.",
      },
      { type: "chapter", label: "Europe du Sud", title: "Îles, volcans et montagnes maritimes" },
      {
        type: "day",
        dayNum: "ESPAGNE",
        title: "Asturies · cordillère Cantabrique",
        text: "Des reliefs calcaires abrupts, des vallées très vertes et l’océan tout proche. Un terrain compact où la neige maritime peut transformer les sommets en belvédères spectaculaires.",
      },
      {
        type: "day",
        dayNum: "ITALIE",
        title: "Abruzzes · Apennins",
        text: "De vastes plateaux, les hauts reliefs du Gran Sasso et de la Majella, des villages de pierre et l’Adriatique en toile de fond. L’un des ensembles les plus complets pour une itinérance hivernale.",
      },
      {
        type: "day",
        dayNum: "ITALIE",
        highlightLabel: "Volcan",
        title: "Etna · Sicile",
        text: "Skier sur les flancs du plus haut volcan actif d’Europe, entre lave noire, neige et mer Ionienne. Une destination singulière, entièrement dépendante des conditions du moment.",
        variant: "highlight",
      },
      {
        type: "day",
        dayNum: "GRÈCE",
        title: "Crète · Montagnes Blanches et Psiloritis",
        text: "Des massifs calcaires dépassant 2 000 mètres, posés entre mer Égée et mer de Libye. Le ski y est rare et aléatoire, mais le contraste entre plateaux enneigés et rivages est incomparable.",
      },
      {
        type: "day",
        dayNum: "FRANCE",
        highlightLabel: "Plan A",
        title: "Corse",
        text: "Des lignes techniques et sauvages dans les massifs du Cinto et du Rotondo, avec la mer visible depuis les sommets. Un véritable raid insulaire lorsque l’enneigement permet les liaisons. Option retenue en priorité : la destination définitive dépendra néanmoins de l’enneigement.",
        variant: "highlight",
      },
      {
        type: "day",
        dayNum: "FRANCE",
        title: "Pyrénées françaises",
        text: "Une solution proche et très variée, depuis les grands reliefs centraux jusqu’aux massifs orientaux ouverts vers la Méditerranée. Le secteur exact sera choisi en fonction de la neige.",
      },
      { type: "chapter", label: "Est", title: "Reliefs alpins et neige venue des mers" },
      {
        type: "day",
        dayNum: "TURQUIE",
        title: "Kaçkar",
        text: "Une haute chaîne alpine dominant la mer Noire, réputée pour ses précipitations abondantes, ses villages isolés et ses longues vallées. Un terrain puissant pour une itinérance engagée.",
      },
      {
        type: "day",
        dayNum: "BULGARIE",
        title: "Rila et Pirin",
        text: "Deux massifs alpins des Balkans, faits de cirques, de forêts et de hauts sommets. Une option plus continentale, retenue si elle offre les conditions les plus solides pour construire le raid.",
      },
    ],
    note: "La destination définitive, le parcours, les hébergements et le prix précis seront communiqués dès que les conditions permettront d’arrêter le voyage.",
  },
  techCta: {
    span: "RAID À SKI MÉDITERRANÉEN · 2027",
    title: "Recevoir les informations",
    text: "Destination retenue, programme détaillé, prix précis et conditions du voyage.",
    buttonText: "Être informé de la destination",
    buttonHref: "https://wa.me/33689295826",
  },
};
