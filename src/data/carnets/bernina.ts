import type { Carnet, CarnetPhoto } from "./types";
import {
  computeItineraryTotals,
  formatAscent,
  formatDescent,
  formatDistanceKm,
  formatDaysLabel,
  formatMeters,
} from "../../lib/carnet/itinerary-totals";

/**
 * Contenu repris tel quel de la page WordPress live (texte, photos, tracé GPX) :
 * https://lesgrandsraidsaski.com/bernina-tour-massif-ski-randonnee/
 *
 * Le récit complet publié sur WordPress ne couvre que le J1 et le début du J2
 * (il s'arrête à la traversée de moraine du Vadret Tschierva) — aucune prose
 * n'existe pour la suite du J2, le J3 et le J4. Plutôt que d'inventer du texte,
 * ces journées restent représentées par le court résumé d'itinéraire (réel,
 * lui aussi tiré de WordPress) et par les photos correspondantes (bivouacs,
 * ski de nuit, aube, sommets) dans le portfolio de fin de page.
 */

const IMG = "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/bernina-ski-randonnee-";

const photo = (num: string, slug: string, alt: string): CarnetPhoto => ({
  src: `${IMG}${num}-${slug}.jpg`,
  alt,
});

const photos = {
  p01: photo("01", "panorama-piz-palu-glaciers", "Panorama sur le Piz Palü et les glaciers du massif de la Bernina"),
  p02: photo("02", "skieur-montee-glaciaire", "Skieur en montée sur un glacier du massif de la Bernina"),
  p03: photo("03", "skieurs-seracs", "Skieurs sous les séracs dans le massif de la Bernina"),
  p04: photo("04", "traversee-glacier", "Traversée à ski sur un glacier du massif de la Bernina"),
  p05: photo("05", "montee-terrain-rocheux", "Montée à ski entre neige et rochers dans la Bernina"),
  p06: photo("06", "skieurs-arete-fortezza", "Skieurs sur l'arête de la Fortezza dans le massif de la Bernina"),
  p07: photo("07", "panorama-glaciers-bernina", "Panorama glaciaire dans le massif de la Bernina"),
  p08: photo("08", "refuge-boval-gardien", "Gardien au refuge Boval pendant le tour de la Bernina à ski"),
  p09: photo("09", "refuge-boval-interieur", "Intérieur du refuge Boval pendant le tour de la Bernina"),
  p10: photo("10", "portage-neige", "Portage des skis dans un passage enneigé du massif de la Bernina"),
  p11: photo("11", "massif-glaciaire", "Paysage glaciaire et sommets du massif de la Bernina"),
  p12: photo("12", "refuge-boval-moraine", "Refuge Boval au-dessus de la moraine dans le massif de la Bernina"),
  p13: photo("13", "seracs-glacier", "Skieurs au pied d'une zone de séracs dans le massif de la Bernina"),
  p14: photo("14", "skieur-moraine", "Skieur progressant sur une moraine enneigée dans la Bernina"),
  p15: photo("15", "grande-combe-glaciaire", "Grande combe glaciaire parcourue à ski dans le massif de la Bernina"),
  p16: photo("16", "skieurs-glacier", "Skieurs traversant un glacier dans le massif de la Bernina"),
  p17: photo("17", "bivouac-rouge-montagne", "Bivouac rouge en haute montagne pendant le tour de la Bernina"),
  p18: photo("18", "interieur-bivouac", "Vie à l'intérieur d'un bivouac pendant le tour de la Bernina à ski"),
  p19: photo("19", "rechaud-bivouac", "Réchaud et matériel dans un bivouac du massif de la Bernina"),
  p20: photo("20", "depart-bivouac", "Départ à ski depuis un bivouac du massif de la Bernina"),
  p21: photo("21", "skieur-panorama-alpin", "Skieur dans un vaste panorama alpin du massif de la Bernina"),
  p22: photo("22", "montee-vers-bivouac", "Montée à ski vers un bivouac dans le massif de la Bernina"),
  p23: photo("23", "bivouac-cretes", "Bivouac rouge sur une crête pendant le tour de la Bernina"),
  p24: photo("24", "panorama-cretes-alpines", "Panorama de crêtes enneigées pendant le tour de la Bernina"),
  p25: photo("25", "repas-bivouac", "Repas partagé dans un bivouac pendant le tour de la Bernina"),
  p26: photo("26", "ski-nocturne-lune", "Progression à ski de nuit sous la lune dans le massif de la Bernina"),
  p27: photo("27", "skieurs-frontales-lune", "Skieurs à la frontale sous la lune dans le massif de la Bernina"),
  p28: photo("28", "ski-aube", "Skieurs à l'aube pendant le tour de la Bernina"),
  p29: photo("29", "lever-soleil-alpes", "Lever de soleil sur les Alpes pendant le tour de la Bernina"),
  p30: photo("30", "alpenglow-sommet", "Lumière d'alpenglow sur un sommet du massif de la Bernina"),
  p31: photo("31", "lumieres-matin-sommet", "Premières lumières du matin sur un sommet enneigé de la Bernina"),
  p32: photo("32", "panorama-sommets-glaces", "Panorama sur les sommets glaciaires du massif de la Bernina"),
  p33: photo("33", "alpinistes-sommet", "Alpinistes à ski au sommet dans le massif de la Bernina"),
  p34: photo("34", "alpinistes-arete-sommitale", "Alpinistes sur une arête sommitale enneigée dans le massif de la Bernina"),
};

/* Itinéraire reconstruit à partir du GPX ORIGINAL enregistré (AlpineQuest,
   12366 points horodatés, 30/04–03/05/2026) — voir data/gpx-sources/
   bernina-tour-massif-2026.original.gpx. Découpage en 4 jours basé sur les
   3 seules coupures temporelles > 9h de toute la trace (14.3h / 12.7h / 9.9h,
   confiance CONFIRMÉ), chacune ancrée sur un lieu réel identifié par
   géocodage inverse OSM directement sur les points de la trace (pas par
   simple proximité). D+/D- lissés (fenêtre 9 points, seuil 2 m) sur les
   altitudes <ele> réelles du GPX ; distance géodésique point à point.
   Extrait en `const` (avant l'objet `bernina`) pour que le hero puisse
   calculer sa ligne de métadonnées à partir de CES MÊMES données — une
   seule source de vérité entre la carte, les étapes et le hero. */
const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "4 jours autour du massif de la Bernina.",
  intro:
    "Reconstruit à partir de la trace GPS réelle du raid : Diavolezza, la Fortezza, le refuge Boval, le glacier de Tschierva, le Pizzo Bernina et le Piz Palü.",
  days: [
    {
      dayNum: "J1",
      title: "Diavolezza → Chamanna da Boval",
      via: ["Vadret Pers", "Vadret da la Fortezza", "Fortezza", "Vadret da Morteratsch"],
      text: "Depuis la station supérieure de Diavolezza, descente sur le Vadret Pers, puis traversée du glacier vers le pied de la Fortezza. Remontée du Vadret da la Fortezza et franchissement de l'arête de la Fortezza, avant une longue descente vers le bassin du Vadret da Morteratsch. Traversée du glacier puis remontée de la moraine jusqu'à la Chamanna da Boval, à 2 495 m.",
      distanceKm: 10.9,
      ascentM: 850,
      descentM: 1330,
      elevationMin: 2380,
      elevationMax: 3320,
    },
    {
      dayNum: "J2",
      title: "Chamanna da Boval → Bivacco Agostino Parravicini",
      via: ["Fuorcla Misaun", "Fuorcla da Boval", "Chamanna da Tschierva", "Fuorcla da la Sella"],
      text: "De Boval, remontée vers le Vadret Boval puis franchissement de la Fuorcla Misaun. La trace poursuit vers la Fuorcla da Boval, autour de 3 346 m, puis bascule sur le Vadrettin da Tschierva pour rejoindre exactement la Chamanna da Tschierva. Après être redescendus dans le système glaciaire de Tschierva/Roseg, longue traversée vers le sud et remontée à la Fuorcla da la Sella, à 3 253 m. De là, passage côté italien jusqu'au Bivacco Agostino Parravicini, perché à 3 183 m au-dessus de la Vedretta di Scerscen Superiore.",
      distanceKm: 21.1,
      ascentM: 2220,
      descentM: 1540,
      elevationMin: 2400,
      elevationMax: 3360,
    },
    {
      dayNum: "J3",
      title: "Bivacco Parravicini → Bivacco Pansera, via le Piz Bernina",
      via: [
        "Vedretta di Scerscen Superiore",
        "Passo Marinelli Occidentale",
        "Bivacco Pansera",
        "Pass dal Zupò",
        "La Spedla",
        "Piz Bernina",
        "Fuorcla Bellavista",
      ],
      text: "Depuis Parravicini, traversée de la Vedretta di Scerscen Superiore vers le Passo Marinelli Occidentale. La trace poursuit vers l'est jusqu'au secteur du Bivacco Pansera, atteint une première fois en cours de journée, puis entame une grande boucle d'altitude : remontée vers le Pass dal Zupò, traversée du secteur de Cresta Guzza, puis voie normale du Bernina par La Spedla — l'épaule italienne à environ 4 020 m — avant d'atteindre précisément le Piz Bernina, point culminant du raid à 4 048 m. Après le sommet, retour vers l'est sur le haut massif, puis traversée jusqu'à la Fuorcla Bellavista et retour au Bivacco Pansera, où la trace s'interrompt pour la nuit à environ 3 540 m.",
      distanceKm: 25.4,
      ascentM: 2600,
      descentM: 2250,
      elevationMin: 2880,
      elevationMax: 4060,
    },
    {
      dayNum: "J4",
      title: "Bivacco Pansera → Bernina Diavolezza",
      via: ["Piz Spinas", "traversée du Piz Palü", "Vadret Pers"],
      text: "Départ avant l'aube depuis le Bivacco Pansera. Remontée vers la crête occidentale du massif du Palü, en passant par le secteur du Piz Spinas, puis traversée du Piz Palü : la trace atteint précisément son sommet central autour de 3 900 m, puis poursuit vers son sommet oriental. Longue descente ensuite sur le versant nord, par le système glaciaire du Vadret Pers, avant de rejoindre Bernina Diavolezza, dans la vallée, à environ 2 090 m — la gare aval, et non la station supérieure de Diavolezza (2 978 m).",
      distanceKm: 14.5,
      ascentM: 730,
      descentM: 2180,
      elevationMin: 2090,
      elevationMax: 3900,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré ci-dessus — jamais de valeur
// en dur : si un jour est corrigé, le hero se met à jour automatiquement.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Fin avril – début mai 2026"; // période réelle (30/04–03/05/2026),
  // formulée en langage naturel — la seule valeur de cette ligne qui reste
  // rédigée à la main plutôt que calculée (voir résumé de la passe).

export const bernina: Carnet = {
  slug: "bernina-tour-massif-ski-randonnee",
  seo: {
    title: "Bernina à ski : tour glaciaire entre Suisse et Italie",
    description:
      "Tour de la Bernina à ski de randonnée : Diavolezza, refuge Boval, glaciers, moraines et bivouacs d'altitude entre Suisse et Italie.",
    ogImage: photos.p01.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "BERNINA",
    subtitle: "Tour du massif",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: { ...photos.p01, position: "center 18%" },
  intro: {
    heading: "Un tour glaciaire entre Engadine et Italie",
    paragraphs: [
      "Depuis plusieurs hivers, le massif de la Bernina me donnait des envies d'exploration à ski. Pour ce dernier grand raid de la saison 2026, une fenêtre météo de quatre jours a enfin permis de partir : Diavolezza, la Fortezza, Boval, les glaciers suspendus, les moraines et les bivouacs d'altitude.",
    ],
    // p02 est nativement portrait mais place le skieur trop bas dans le cadre.
    // p05 (aussi nativement portrait, 1080×1616) fonctionne mieux : sommet et
    // ciel préservés, alpinistes bien placés sur l'arête. p02 repart au portfolio.
    photo: { ...photos.p05, position: "center 70%" },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Suisse / Italie" },
      { label: "Région", value: "Engadine / Lombardie" },
      { label: "Massif", value: "Bernina" },
      { label: "Période", value: "fin avril – début mai 2026" },
      // Durée/Distance/D+/D− : mêmes totaux calculés que le hero et la carte
      // (voir `totals` plus haut) — jamais recopiés en dur.
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Tour du massif de la Bernina",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/bernina-tour-massif-2026.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "Un massif qui attendait depuis trois hivers",
        paragraphs: [
          "Cela fait au moins trois hivers que ce petit massif à l'est des Alpes me donne des envies d'exploration à ski, et j'avais multiplié, chaque année, les tracés possibles sur mon application cartographique, partant parfois de St-Moritz ou de Diavolezza en Suisse, parfois de Campo Moro, en Italie.",
          "Et puis vient ce dernier grand raid de la saison 2026, où je dois partager une expérience avec deux frères jumeaux, qui fêtent leurs quatre décennies, à cheval sur les mois d'avril et de mai. Je lance en pâture cette idée. Le caractère lointain du lieu ne semble pas les effrayer et le créneau météo se précise : une petite perturbation passe le mercredi, mais du jeudi au dimanche, le temps devient stable, avant de tourner à nouveau le lundi suivant. Une aubaine !",
        ],
      },
      {
        heading: "Diavolezza, la Fortezza et Boval",
        paragraphs: [
          "Lorsque nous nous garons sur le grand parking, au pied du téléphérique de Diavolezza, celui-ci est immense et presque vide. L'ambiance est printanière, seul un petit air frais nous rappelle que nous sommes venus pour skier. Diavolezza, étrange nom. Pourquoi le diable, présent de façon suggestive dans la communication de la station, est-il ainsi convoqué pour nommer un lieu touristique ? Que diable fait-il ici !",
          "Peut-être que l'image du diable traduit à la fois la splendeur et la dangerosité de ces immenses barres de séracs qui frappent l'œil de quiconque arrivant au sommet du téléphérique, quand s'ouvre le panorama s'étendant du Piz Palü jusqu'à la Bernina, et ses innombrables glaciers suspendus et chaotiques. Peu de massifs alpins renvoient ces images. Et paradoxalement, ce caractère impressionnant est contrebalancé par la taille relativement modeste du massif, dont le tour est envisageable en trois ou quatre jours.",
          "Nous traversons le glacier en direction d'une langue de neige, sorte d'écharpe entre les barres rocheuses. Alors que nous subissons la chaleur, je choisis presque inconsciemment un endroit ventilé pour pique-niquer : la crête issue de la Fortezza, notre objectif du jour. Elle forme une épaule confortable à remonter à ski, protégée de part et d'autre par des barres rocheuses, qui bientôt s'emparent également de la crête pour former cette fameuse forteresse.",
          "De là, une nouvelle écharpe nous dépose sur le glacier opposé, et à la cabane Boval, bâtie bien au-dessus de la moraine, immense ici. Après quelques réflexions mûries sur la possibilité de remettre les peaux pour une petite remontée, au vu de la qualité de la neige inégale, nous optons sans trop hésiter pour la bière en terrasse.",
          "Le pari s'avère gagnant : une terrasse au soleil, et la solitude d'un refuge où nous serons presque seuls ce soir. Le gardien, Roberto, semble rustre d'abord. Pas très causant, mais il fait tout de même l'effort de parler un mix de français et d'anglais, pour nous amener trois grandes bières pression. Cela fait vingt-deux ans qu'il garde ce refuge après quatre années passées à la cabane Forno.",
        ],
      },
      {
        heading: "L'enfer des moraines",
        paragraphs: [
          "Quand nous descendons au réfectoire, à 6 h, les deux autres skieurs arrivés tard la veille sont déjà repartis. Inconsciemment, cette journée me stresse. Je ne sais si c'est à cause de sa longueur, du fait que je ne connaisse pas vraiment mes compagnons, ou de l'inconnu des passages et du versant opposé, où en 2024 un gigantesque écroulement a balayé le Vadret de Tschierva.",
          "De la Fuorcia Tschierva, la neige manque encore, et le versant dans lequel nous basculons, sur l'imposant Vadret Tschierva, est immense et minéral. Comme repéré la veille au soir sur les images satellite, nous allons devoir franchir la moraine à pied. Des pentes instables, certes raides, mais si simples à descendre avec les skis aux pieds, deviennent rapidement un calvaire en chaussures de ski.",
          "Je change de mode d'action. À présent, nous allons concevoir la suite du programme problème après problème, en tentant de poser sur la table toutes les options possibles. Après avoir un peu tourné pour trouver l'entrée d'une petite écharpe, je jubile de voir que le passage fonctionne, et de savoir que le bout de ce « tunnel morainique » est proche. Pour moi, mais surtout pour mes compagnons, qui lâchent du jus dans ces passages.",
        ],
      },
    ],
    /* Sélection éditoriale organisée selon les 4 jours réels de l'itinéraire,
       dans l'ordre de numérotation d'origine des fichiers WordPress — seule
       donnée chronologique réellement disponible (voir item 20). 3 photos/jour
       avec un ratio 4:3 (au lieu du 4:5 initial) : la colonne finit alors
       sensiblement à la hauteur du dernier paragraphe du récit. */
    dayPhotos: [
      { dayNum: "J1", photos: [photos.p06, photos.p08, photos.p12] },
      { dayNum: "J2", photos: [photos.p13, photos.p14, photos.p10] },
      { dayNum: "J3", photos: [photos.p17, photos.p22, photos.p25] },
      { dayNum: "J4", photos: [photos.p20, photos.p28, photos.p34] },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "Bernina · Tour du massif",
    meta: "Fin avril – début mai 2026 · Itinérance à ski entre glaciers, refuges et bivouacs · Photos : Yann Borgnet",
    photos: [
      photos.p02, photos.p03, photos.p04, photos.p07, photos.p09, photos.p11,
      photos.p15, photos.p16, photos.p18, photos.p19, photos.p21, photos.p23,
      photos.p24, photos.p26, photos.p27, photos.p29, photos.p30, photos.p31,
      photos.p32, photos.p33,
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};
