import type { Carnet, CarnetPhoto } from "./types";
import {
  computeItineraryTotals,
  formatAscent,
  formatDescent,
  formatDistanceKm,
  formatDaysLabel,
  formatMeters,
} from "../../lib/carnet/itinerary-totals";
import { berninaPhotos } from "../photos/bernina-2026";

/**
 * PHOTOS : passe photo faite à partir des 34 JPEG fournis par Yann (noms SEO
 * définitifs, EXIF + trace GPX croisés), déposés dans public/photos/Bernina/.
 * Métadonnées (ALT, légende, toponyme, certitude GPX) dérivées telles quelles
 * de src/data/photos/bernina-2026.ts — lui-même généré depuis
 * public/photos/Bernina/manifeste-SEO-Bernina-GPX.json (source documentaire
 * de référence). Ce carnet ne dépend donc plus de WordPress/OVH pour ses
 * images (voir mémoire project_wordpress_migration) : remplace l'ancien
 * hotlink lesgrandsraidsaski.com/wp-content/uploads/...
 *
 * Répartition par jour déduite des horodatages EXIF réels de chaque photo
 * (voir dateTimeOriginal dans bernina-2026.ts), recoupés avec les 4 journées
 * de l'itinéraire ci-dessous (elles-mêmes issues du découpage GPX confirmé) :
 * 9 photos le 30/04 (J1), 8 le 01/05 (J2), 8 le 02/05 (J3), 9 le 03/05 (J4).
 * Numérotées p01→p34 dans cet ordre chronologique.
 *
 * RÉCIT : le texte publié sur WordPress ne couvrait que le J1 et le début du
 * J2 (jusqu'à la traversée de moraine du Vadret Tschierva). La suite
 * (fin du J2, J3 — sommet du Piz Bernina — et J4 — traversée du Piz Palü et
 * retour à Diavolezza) a été rédigée ici à partir de l'itinéraire structuré
 * (lui-même tiré du GPX réel) et des légendes/toponymes du manifeste photo,
 * dans la continuité de voix du texte existant — faute de prose WordPress
 * d'origine pour ces journées.
 */

const IMG = "/photos/Bernina/";

const photo = (file: string, alt?: string): CarnetPhoto => {
  const meta = berninaPhotos[file];
  return { src: `${IMG}${file}`, alt: alt ?? meta.texteAlternatif, width: meta.width, height: meta.height };
};

const photos = {
  // --- J1 (30/04) : Diavolezza → Chamanna da Boval ---
  p01: photo("bernina-piz-palu-glacier-morteratsch-panorama.jpg"),
  p02: photo("bernina-piz-palu-montee-glacier-morteratsch.jpg"),
  p03: photo("bernina-piz-palu-alpinistes-sous-seracs.jpg"),
  p04: photo("bernina-piz-palu-cordee-glacier.jpg"),
  p05: photo("bernina-morteratsch-moraine-approche-boval.jpg"),
  p06: photo("bernina-refuge-boval-dans-la-moraine.jpg"),
  p07: photo("bernina-refuge-boval-cuisine.jpg"),
  p08: photo("bernina-refuge-boval-depart-a-skis.jpg"),
  p09: photo("bernina-piz-palu-depuis-boval.jpg"),

  // --- J2 (01/05) : Chamanna da Boval → Bivacco Agostino Parravicini ---
  p10: photo("bernina-morteratsch-descente-glacier.jpg"),
  p11: photo("bernina-piz-palu-et-glacier-de-morteratsch.jpg"),
  p12: photo("bernina-boval-abri-de-montagne.jpg"),
  p13: photo("bernina-seracs-glacier-morteratsch.jpg"),
  p14: photo("bernina-traversee-glacier-morteratsch.jpg"),
  p15: photo("bernina-grande-combe-glaciaire-bernina.jpg"),
  p16: photo("bernina-skieurs-sur-glacier-bernina.jpg"),
  p17: photo("bernina-bivouac-fuorcla-crast-aguzza.jpg"),

  // --- J3 (02/05) : Bivacco Parravicini → Bivacco Pansera, via le Piz Bernina ---
  p18: photo("bernina-interieur-bivouac-crast-aguzza.jpg"),
  p19: photo("bernina-rechaud-bivouac-crast-aguzza.jpg"),
  p20: photo("bernina-depart-bivouac-haute-montagne.jpg"),
  p21: photo("bernina-montee-vers-bivouac-crast-aguzza.jpg"),
  p22: photo("bernina-ski-alpinisme-arete-piz-bernina.jpg"),
  p23: photo("bernina-piz-bernina-panorama-sommet.jpg"),
  p24: photo("bernina-piz-bernina-vue-sur-les-alpes.jpg"),
  p25: photo("bernina-repas-au-bivouac-crast-aguzza.jpg"),

  // --- J4 (03/05) : Bivacco Pansera → Bernina Diavolezza, via le Piz Palü ---
  p26: photo("bernina-ski-nocturne-sous-la-lune.jpg"),
  p27: photo("bernina-frontales-lune-haute-montagne.jpg"),
  p28: photo("bernina-aube-sur-le-glacier-bernina.jpg"),
  p29: photo("bernina-lune-sur-piz-palu.jpg"),
  p30: photo("bernina-piz-palu-lever-du-jour.jpg"),
  p31: photo("bernina-piz-palu-cretes-au-lever-du-jour.jpg"),
  p32: photo("bernina-piz-palu-panorama-aube.jpg"),
  p33: photo("bernina-piz-palu-sommets-glaces.jpg"),
  p34: photo("bernina-piz-palu-arete-sommitale.jpg"),
};

/* Itinéraire reconstruit à partir du GPX ORIGINAL enregistré (AlpineQuest,
   12366 points horodatés, 30/04–03/05/2026) — voir data/gpx-sources/
   bernina-tour-massif-2026.original.gpx. Découpage en 4 jours basé sur les
   3 seules coupures temporelles > 9h de toute la trace (14.3h / 12.7h / 9.9h,
   confiance CONFIRMÉ), chacune ancrée sur un lieu réel identifié par
   géocodage inverse OSM directement sur les points de la trace (pas par
   simple proximité). D+/D- lissés (fenêtre 9 points, seuil 2 m) sur les
   altitudes <ele> réelles du GPX ; distance géodésique point à point.
   Reproductibilité vérifiée par scripts/gpx-report-bernina.ts (outillage
   générique src/lib/gpx). Extrait en `const` (avant l'objet `bernina`) pour
   que le hero puisse calculer sa ligne de métadonnées à partir de CES MÊMES
   données — une seule source de vérité entre la carte, les étapes et le hero. */
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

// Photo de couverture pour la page listing des carnets (/carnets-de-voyage-ski/)
// — distincte de openingPhoto (déjà utilisée sur la homepage) pour ne pas
// répéter deux fois la même image entre la homepage et la nouvelle page.
export const indexCover = photos.p11;

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
  openingPhoto: { ...photos.p01, position: "center 30%" },
  intro: {
    heading: "Un tour glaciaire entre Engadine et Italie",
    paragraphs: [
      "Depuis plusieurs hivers, le massif de la Bernina me donnait des envies d'exploration à ski. Pour ce dernier grand raid de la saison 2026, une fenêtre météo de quatre jours a enfin permis de partir : Diavolezza, la Fortezza, Boval, les glaciers suspendus, les moraines et les bivouacs d'altitude.",
    ],
    photo: { ...photos.p03, position: "center 65%" },
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
      {
        heading: "Le bivouac Parravicini, suspendu au-dessus de l'Italie",
        paragraphs: [
          "De l'autre côté de la moraine, les skis reprennent enfin leurs droits. Le glacier de Roseg nous absorbe dans une neige de printemps déjà lourde ; nous filons plein sud, sous des faces nord qui n'ont pas vu le soleil depuis des mois, avant de remonter les dernières pentes vers la Fuorcla da la Sella. Au col, à plus de 3 250 m, la Suisse se referme derrière nous : de l'autre côté commence l'Italie, et la Vedretta di Scerscen Superiore, où plus aucun refuge gardé ne nous attend avant deux jours.",
          "Le bivouac Parravicini apparaît enfin, minuscule capsule rouge posée sur un éperon rocheux à plus de 3 180 m, au-dessus de ce vaste plateau glaciaire italien. Nous y arrivons vidés par cette deuxième journée — plus de 2 200 m de dénivelé positif, la moraine en prime. Le confort y est sommaire, mais la vue ne l'est pas : le couchant embrase les faces est du massif, et l'Italie s'étend, immense, sous nos pieds. Nous refaisons le monde et la suite du programme, frontale entre les dents, avant de nous glisser dans les duvets.",
        ],
      },
      {
        heading: "Le Piz Bernina, point culminant du raid",
        paragraphs: [
          "Nous quittons le bivouac avant huit heures, ragaillardis par une nuit finalement reposante. Devant nous s'étend la Vedretta di Scerscen Superiore, un vaste plateau glaciaire à traverser presque à plat avant de remonter au Passo Marinelli Occidentale. La lumière reste franche, sans un souffle de vent, et la neige, encore dure du gel nocturne, porte parfaitement les skis.",
          "Depuis le Passo Marinelli, nous entamons une grande boucle par le secteur du Bivacco Pansera, atteint une première fois en milieu de matinée sans nous y arrêter — il faudra y revenir ce soir, mais loin encore. La montée se poursuit vers le Pass dal Zupò, puis longe le fil de la Cresta Guzza, où les jumeaux, davantage alpinistes que skieurs dans l'âme, retrouvent leur élément : crampons, corde tendue, quelques pas d'escalade facile entre rochers et neige. Vers midi, nous rejoignons l'épaule italienne de La Spedla, à 4 020 m, porte d'entrée de la voie normale du Bernina.",
          "Il reste alors un dernier ressaut, étroit et exposé, pour atteindre le point culminant du raid : le Piz Bernina, 4 048 m, sommet le plus élevé des Alpes orientales. Le vent s'est levé sur l'arête sommitale et nous ne nous attardons pas, mais la vue mérite chaque pas : les Alpes suisses et italiennes se déploient à 360 degrés.",
          "Redescendre prend presque aussi longtemps que monter. Nous repassons par la Fuorcla Bellavista, sur le haut massif, avant de rejoindre enfin le Bivacco Pansera à la nuit tombante, cette fois pour y dormir. Le réchaud tourne, la soupe fume, et personne ne parle beaucoup : la journée a été longue — plus de 2 600 m de dénivelé positif — et le sommeil arrive vite.",
        ],
      },
      {
        heading: "Le Piz Palü, dans la lumière de l'aube",
        paragraphs: [
          "Départ avant l'aube, frontales allumées, pour la dernière journée. Nous remontons vers la crête occidentale du massif du Palü sous une pleine lune qui découpe nettement les reliefs — l'ambiance est presque irréelle, entre le froid sec et le silence complet. Puis le ciel commence à rosir à l'est, juste au moment où nous atteignons l'arête, vers le secteur du Piz Spinas.",
          "La traversée du Piz Palü qui suit restera l'un des grands moments du voyage : une arête de neige filant plein est, avec le lever du soleil qui embrase progressivement le massif. Nous passons par le sommet central, à un peu moins de 3 900 m, puis poursuivons jusqu'au sommet oriental, dans une lumière qui n'aura duré qu'une petite heure, mais que personne n'oubliera.",
          "Il reste ensuite la plus longue descente du séjour : près de 2 200 m de dénivelé négatif, par le système glaciaire du Vadret Pers, jusqu'à Bernina Diavolezza, dans la vallée. La neige, remontée en température depuis le début du raid, s'est transformée en une bonne poudreuse de printemps sur les premiers hectomètres, avant de laisser place à une neige plus lourde dans le bas. Peu importe : après quatre jours autour de ce massif qui m'attendait depuis trois hivers, la descente a un goût de victoire tranquille, partagée avec les deux frères — quarante ans tout neufs, et une traversée glaciaire à travers les Alpes en guise de cadeau d'anniversaire.",
        ],
      },
    ],
    // Rail jour par jour : 4 photos par journée (rythme régulier, chaque jour
    // du raid étant désormais couvert par le texte, voir sections ci-dessus).
    // `route` reprend exactement le titre de l'étape dans `itinerary.days`,
    // jamais retapé.
    storyDays: itinerary.days.map((d, i) => ({
      day: d.dayNum,
      route: d.title,
      photos: [
        [photos.p02, photos.p06, photos.p07, photos.p09],
        [photos.p13, photos.p14, photos.p15, photos.p17],
        [photos.p20, photos.p22, photos.p24, photos.p25],
        [photos.p26, photos.p30, photos.p32, photos.p34],
      ][i],
    })),
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "BERNINA",
    subtitle: "Tour du massif de la Bernina",
    meta: "Fin avril – début mai 2026 · Itinérance à ski entre glaciers, refuges et bivouacs · Photos : Yann Borgnet",
    // Le portfolio complet réunit toutes les photos du voyage (best of en
    // tête) : les 15 premières forment la mosaïque visible au chargement ; le
    // reste (dont plusieurs photos déjà utilisées dans le rail jour par jour
    // — la duplication est normale, voir convention Géorgie) se déplie
    // derrière "Voir la suite du portfolio".
    photos: [
      // --- 15 visibles au chargement ---
      photos.p01, photos.p04, photos.p05, photos.p08, photos.p10,
      photos.p11, photos.p12, photos.p16, photos.p18, photos.p19,
      photos.p21, photos.p23, photos.p27, photos.p28, photos.p29,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.p31, photos.p33,
      photos.p02, photos.p03, photos.p06, photos.p07, photos.p09,
      photos.p13, photos.p14, photos.p15, photos.p17,
      photos.p20, photos.p22, photos.p24, photos.p25,
      photos.p26, photos.p30, photos.p32, photos.p34,
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};
