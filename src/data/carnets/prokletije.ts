import type { Carnet } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { montenegroPhotos } from "../photos/prokletije-montenegro-2026";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/traversee-prokletije-ski-montenegro/
 * (masthead WordPress : "MONTÉNÉGRO 2026" — le massif traversé, à cheval sur
 * trois pays, est le Prokletije).
 *
 * PHOTOS : passe photo faite à partir des 44 photos du bloc Portfolio de la
 * page WordPress live, téléchargées et déposées localement dans
 * public/photos/Montenegro/ (voir mémoire migration OVH/WordPress — plus
 * aucune dépendance à wp-content). Métadonnées dans
 * src/data/photos/prokletije-montenegro-2026.ts, elles-mêmes dérivées de
 * public/photos/Montenegro/manifeste-photos-wordpress-montenegro.json.
 * openingPhoto et intro.photo reprennent les choix déjà faits côté WordPress
 * (même photo de couverture et même photo de prologue/arrivée à Lepushë),
 * jamais choisies au hasard. Contrairement au Kazakhstan/Géorgie, aucun EXIF
 * ni GPX horodaté n'a permis de corréler les photos aux jours de
 * l'itinéraire : seules les photos au lieu explicite (Vusanje, Valbonë) sont placées en regard du récit ; le portfolio reprend
 * tel quel l'ordre éditorial déjà choisi par WordPress.
 *
 * GPX : pas de GPX original téléchargeable sur WordPress — tracé lat/lon de
 * la carte interactive récupéré tel quel et resérialisé en `.gpx` minimal
 * (sans altitude ni horodatage, voir public/gpx/prokletije-montenegro-2026.gpx).
 * Les distances/D+/D- par jour, elles, SONT publiées par WordPress dans le
 * bloc Itinéraire (pas issues d'une analyse GPX) — reprises telles quelles
 * ci-dessous.
 */

const IMG = "/photos/Montenegro/";

const photo = (file: string) => {
  const meta = montenegroPhotos[file];
  return { src: `${IMG}${file}`, alt: meta.alt, width: meta.width, height: meta.height };
};

const photos = {
  p001: photo("prokletije-montenegro-ski-randonnee-ouverture-traversee-prokletije-001.jpg"),
  p002: photo("prokletije-montenegro-ski-randonnee-002.jpg"),
  p003: photo("prokletije-montenegro-ski-randonnee-003.jpg"),
  p004: photo("prokletije-montenegro-ski-randonnee-arrivee-ski-village-lepushe-004.jpg"),
  p005: photo("prokletije-montenegro-ski-randonnee-005.jpg"),
  p006: photo("prokletije-montenegro-ski-randonnee-mosquee-village-vusanje-006.jpg"),
  p007: photo("prokletije-montenegro-ski-randonnee-007.jpg"),
  p008: photo("prokletije-montenegro-ski-randonnee-008.jpg"),
  p009: photo("prokletije-montenegro-ski-randonnee-009.jpg"),
  p010: photo("prokletije-montenegro-ski-randonnee-010.jpg"),
  p011: photo("prokletije-montenegro-ski-randonnee-011.jpg"),
  p012: photo("prokletije-montenegro-ski-randonnee-012.jpg"),
  p013: photo("prokletije-montenegro-ski-randonnee-013.jpg"),
  p014: photo("prokletije-montenegro-ski-randonnee-014.jpg"),
  p015: photo("prokletije-montenegro-ski-randonnee-015.jpg"),
  p016: photo("prokletije-montenegro-ski-randonnee-016.jpg"),
  p017: photo("prokletije-montenegro-ski-randonnee-017.jpg"),
  p018: photo("prokletije-montenegro-ski-randonnee-018.jpg"),
  p019: photo("prokletije-montenegro-ski-randonnee-019.jpg"),
  p020: photo("prokletije-montenegro-ski-randonnee-020.jpg"),
  p021: photo("prokletije-montenegro-ski-randonnee-021.jpg"),
  p022: photo("prokletije-montenegro-ski-randonnee-022.jpg"),
  p023: photo("prokletije-montenegro-ski-randonnee-023.jpg"),
  p024: photo("prokletije-montenegro-ski-randonnee-024.jpg"),
  p025: photo("prokletije-montenegro-ski-randonnee-025.jpg"),
  p026: photo("prokletije-montenegro-ski-randonnee-026.jpg"),
  p027: photo("prokletije-montenegro-ski-randonnee-rencontre-habitant-valbone-027.jpg"),
  p028: photo("prokletije-montenegro-ski-randonnee-028.jpg"),
  p029: photo("prokletije-montenegro-ski-randonnee-029.jpg"),
  p030: photo("prokletije-montenegro-ski-randonnee-030.jpg"),
  p031: photo("prokletije-montenegro-ski-randonnee-031.jpg"),
  p032: photo("prokletije-montenegro-ski-randonnee-032.jpg"),
  p033: photo("prokletije-montenegro-ski-randonnee-033.jpg"),
  p034: photo("prokletije-montenegro-ski-randonnee-034.jpg"),
  p035: photo("prokletije-montenegro-ski-randonnee-035.jpg"),
  p036: photo("prokletije-montenegro-ski-randonnee-036.jpg"),
  p037: photo("prokletije-montenegro-ski-randonnee-037.jpg"),
  p038: photo("prokletije-montenegro-ski-randonnee-038.jpg"),
  p039: photo("prokletije-montenegro-ski-randonnee-039.jpg"),
  p040: photo("prokletije-montenegro-ski-randonnee-040.jpg"),
  p041: photo("prokletije-montenegro-ski-randonnee-041.jpg"),
  p042: photo("prokletije-montenegro-ski-randonnee-au-dessus-de-skala-042.jpg"),
  p043: photo("prokletije-montenegro-ski-randonnee-cuisson-pain-babino-polje-043.jpg"),
  p044: photo("prokletije-montenegro-ski-randonnee-044.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "8 jours. Une traversée des Prokletije.",
  intro:
    "De Vermosh au col de Čakor, une ligne à ski entre Albanie, Monténégro et Kosovo, à travers forêts, cols, villages et grandes combes.",
  days: [
    {
      dayNum: "J1",
      title: "Vermosh → Lëpushë",
      text: "Première entrée à ski dans les Prokletije, entre crêtes boisées et pentes du Maja e Grebenit.",
      distanceKm: 18.3,
      ascentM: 1010,
      descentM: 760,
    },
    {
      dayNum: "J2",
      title: "Lëpushë → Škala",
      text: "Passage par le Maja e Vajushë, puis recherche d'itinéraire à travers les forêts albanaises jusqu'au village de Škala.",
      distanceKm: 14.8,
      ascentM: 1120,
      descentM: 1260,
    },
    {
      dayNum: "J3",
      title: "Škala → Vusanje",
      text: "Cols, couloirs et forêts avant de basculer vers Vusanje et de retrouver le Monténégro.",
      distanceKm: 29.0,
      ascentM: 1240,
      descentM: 1330,
    },
    {
      dayNum: "J4",
      title: "Vusanje → Valbonë",
      text: "Traversée vers l'Albanie par le Maja e Rosit, à 2 522 m, puis longue descente vers Valbonë.",
      distanceKm: 25.9,
      ascentM: 1750,
      descentM: 1700,
    },
    {
      dayNum: "J5",
      title: "Valbonë → Çerem",
      text: "Entre combes ouvertes, pistes forestières et villages reculés du nord albanais.",
      distanceKm: 25.6,
      ascentM: 1650,
      descentM: 1570,
    },
    {
      dayNum: "J6",
      title: "Çerem → Gacaferi",
      text: "Longue étape sur la crête frontière jusqu'au refuge de Gacaferi, côté kosovar.",
      distanceKm: 28.8,
      ascentM: 1920,
      descentM: 1230,
    },
    {
      dayNum: "J7",
      title: "Gacaferi → Babino Polje",
      text: "Grands vallons et retour vers le Monténégro jusqu'au hameau isolé de Babino Polje.",
      distanceKm: 21.6,
      ascentM: 1380,
      descentM: 1780,
    },
    {
      dayNum: "J8",
      title: "Babino Polje → Čakor",
      text: "Passage par le Starac puis descente vers la route du col de Čakor, terme de la traversée.",
      distanceKm: 18.2,
      ascentM: 1210,
      descentM: 1230,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données publiées par
// WordPress jour par jour) — jamais recopiés en dur, voir totals.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Début mars 2026"; // "10 jours, dont 8 jours de ski, début mars 2026" (WordPress)

export const prokletije: Carnet = {
  slug: "traversee-prokletije-ski-montenegro",
  seo: {
    title: "Ski dans les Prokletije : Albanie, Monténégro et Kosovo",
    description:
      "Traversée à ski des Prokletije entre Albanie, Monténégro et Kosovo : forêts, villages isolés et itinérance de frontière en frontière.",
    ogImage: photos.p001.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "MONTÉNÉGRO",
    subtitle: "Une traversée des Prokletije",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  // Même photo de couverture que la page WordPress live.
  openingPhoto: photos.p001,
  intro: {
    heading: "Les forêts des Prokletije",
    paragraphs: [
      "Nous entrons dans de profondes gorges, celles de la Cijevna, ou vallée du Cem. Au fond de celles-ci se trouvent les deux premiers villages de notre traversée des Prokletije : Lëpushë et Vermosh, à quelques encablures de la frontière monténégrine. Dans la nuit noire albanaise, tous les indices sont bons à prendre pour deviner la limite d'enneigement.",
      "Premiers contacts avec la forêt albanaise, identifiée dès la préparation comme l'une des grandes incertitudes de l'itinéraire. Au fil des jours, les Prokletije révèlent leurs contrastes : vallées encaissées, forêts parfois impénétrables, combes ouvertes, villages isolés et frontières que l'on franchit à ski.",
      "Entre Albanie, Monténégro et Kosovo, cette traversée est une ligne d'adaptation permanente, où l'itinéraire se construit autant sur la carte que sur le terrain.",
    ],
    // Même photo que la colonne "prologue" de la page WordPress live
    // (arrivée à ski à Lëpushë).
    photo: photos.p004,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Albanie, Monténégro et Kosovo" },
      { label: "Massif", value: "Prokletije" },
      { label: "Départ", value: "Vermosh" },
      { label: "Arrivée", value: "Čakor" },
      { label: "Forme du raid", value: "Traversée de massif" },
      { label: "Hébergements", value: "Guest-houses" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Vermosh → Čakor",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/prokletije-montenegro-2026.gpx",
    // Seuls départ et arrivée : les distances publiées par jour ne correspondent pas au GPX, les fins d'étape intermédiaires ne sont donc pas placées.
    markers: [
      { name: "Vermosh", lat: 42.528973, lon: 19.726449, direction: "left" },
      { name: "Čakor", lat: 42.673974, lon: 19.998908 },
    ],
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        paragraphs: [
          "On peut dire que ce nouveau voyage, enchaîné à la suite de la Grèce, a commencé à Igoumenitsa. D'ici, avec Aurélien, qui poursuit avec moi, nous avions plusieurs options. Ma préférée, plus cavalière, consiste à passer la frontière via l'île de Corfu, en prenant le ferry pour Corfù dès ce soir, puis à reprendre un second ferry pour Sarenda tôt le lendemain. Mais nous n'avons pas le courage, et préférons tenir compagnie à Iris, qui reprend son ferry tard dans la soirée.",
          "L'autre solution consiste à prendre un bus d'Igoumenitsa à Saranda. Il y a justement une option avec un bus passant tôt le matin pour nous déposer.",
          "Ainsi, dès 4h30, nous nous tenons au point indiqué par la compagnie de bus. Le chauffeur m'a envoyé sa position en direct et je ne comprends pas vraiment pourquoi il s'est arrêté au centre d'Igoumenitsa, à quelques encablures du point où nous attendons. Sans trop comprendre, je comprendrai cette attente un peu plus tard, lorsque nous arriverons à la frontière gréco-albanaise.",
          "La barrière est fermée. La frontière est fermée la nuit et n'ouvre qu'à 8h. Une frontière fermée. En tant qu'Européens, membres de l'espace Schengen et de l'Union européenne, cela nous paraît étrange, un tel contrôle pour passer d'un pays à l'autre. Mais en passant de la Grèce à l'Albanie, nous sortons effectivement de l'UE. Les contrôles sont donc plus stricts que chez nous.",
          "Il nous faut sortir du bus et montrer nos passeports. Deux fois plutôt qu'une : une première fois côté grec, puis une seconde fois côté albanais.",
          "Je vois le timing avancer. Je pensais pourtant avoir une marge considérable : départ à 4h30, plus ou moins 1h30 de route. Dans le meilleur des cas, nous devions être à Saranda vers 6h. Je m'étais donc dit qu'avec 2h30 de marge, je pouvais réserver un bus à 8h30 pour rejoindre Tirana. Mais à mesure que nous nous approchons de Saranda, je vois cette marge fondre à vue d'œil. Le passage de la frontière l'a fait disparaître comme neige au soleil.",
          "À présent, je regarde frénétiquement le GPS et je sens que notre seconde correspondance va nous passer sous le nez. Je vais donc voir le chauffeur pour lui exposer mon problème. Pour lui, il n'y a pas de problème : il appelle le bureau de la compagnie pour retenir notre bus suivant. Mais celui-ci vient tout juste de partir.",
          "En arrivant à Saranda, nous patientons quelques minutes, puis une solution est toute trouvée. Ici, il n'y a jamais de problème. Nous montons dans un taxi et rejoignons le bus que nous devions prendre, qui nous attend quelques kilomètres plus loin. Bon, le chauffeur n'a pas l'air très content de la situation.",
          "Il nous faudra un peu plus de trois heures pour rejoindre Tirana et retrouver le reste de l'équipe. Je réserve notre troisième bus de la journée pour la ville de Shkoder, tout au nord de l'Albanie. Là-bas, Pedro nous attend avec son gros bus Mercedes, et c'est avec lui que nous finirons cette longue traversée de l'Albanie.",
          "Nous entrons dans de profondes gorges, celles de la Cijevna, ou vallée du Cem. Au fond de celles-ci se trouvent les deux premiers villages de notre traversée des Prokletije : Lepushë et Vermosh, tout au fond de la vallée, à quelques encablures de la frontière monténégrine.",
          "Lorsque nous passons à Lepushë, dans la nuit noire albanaise, j'essaie de percevoir la limite d'enneigement. Tous les indices sont bons à prendre, notamment les restes du déneigement sur le bas-côté de la route. Plus nous montons, plus cette neige est présente. Il me semble que nous pourrons skier jusqu'au village. Voilà une bonne nouvelle : la limite d'enneigement est bien plus basse qu'en Grèce.",
          "Ce soir, nous dormons à Vermosh. Mère et fille nous accueillent dans une guest house que nous pourrions, chez nous, décrire comme un agriturismo. Ici, il y a des poules dehors et des moutons dans l'étable. Et la viande que nous mangeons ce soir a probablement été produite ici, par leurs soins.",
          "Ce matin, c'est la jeune fille qui s'occupe de notre petit déjeuner. C'est d'ailleurs elle qui parle français. Elle nous sert une sorte de pancake frit, avec un petit goût de reviens-y. Lorsqu'on lui demande son âge, nous sommes tous surpris : elle n'a que 14 ans et déjà une maturité qui laisse pantois. Son anglais est très bon, avec un accent américain qui laisse imaginer qu'elle l'a appris en regardant des séries.",
          "Vermosh ne compte pas de centre-bourg. Les maisons sont dispersées dans un fond de vallée, à présent complètement déneigé. Ce matin, il va nous falloir marcher un peu avant de pouvoir chausser les skis. Heureusement, la présence d'une piste forestière va nous permettre de chausser plus bas que la réelle limite d'enneigement continu.",
          "Je craignais que les forêts soient trop denses pour pouvoir skier. C'est en partie le cas, et certaines forêts sont skiables, mais il est très difficile d'en apprécier la densité à la seule observation des images aériennes.",
          "Nous remontons une crête, mais je me rends bien compte que le sommet qu'elle permet d'atteindre ne nous offrira pas une descente évidente. En effet, le versant opposé est couvert d'une forêt dont je redoute la densité.",
          "Alors nous nous déportons pour une longue traversée vers l'ouest. Ainsi, nous rejoignons les pentes de Maja e Grebenit (1841 m), depuis lequel la descente semble beaucoup plus évidente.",
          "Elle s'étire le long d'une crête dégarnie, mais où la forêt tente de coloniser de part et d'autre. La neige, juste décaillée, est excellente.",
          "Étonnement, Aurélien n'est plus dans mes skis. Les secondes passent, et bientôt Damien arrive. Aurélien s'en est mis une bonne mais à priori tout va bien, car il avait le sourire. Mais Aurélien l'a en toute circonstance, le sourire, et la nouvelle que je redoute tout le temps arrive avec lui : il s'est fait un claquage au mollet…",
          "J'ai déjà eu le cas parmi mes clients, et la cliente avait dû être évacuée en hélicoptère, malgré toute sa volonté de poursuivre à ski. Je crains le pire pour la suite. Aurel garde tout de même le sourire, et il parvient à skier. Un ski ponctué de « je suis con ! ».",
          "Contre toute attente, nous skions jusqu'au portail de la Guest House.",
          "Paolo nous accueille. Un grand gaillard qui doit avoir une trentaine bien tassée, les cheveux taillés courts. Il m'a bien aidé pour organiser ce voyage, notamment pour gérer le taxi. Sa Guest House semble très récente, et pourtant, cela fait une quinzaine d'années qu'il la gère avec sa femme. Il habite Shkodër, et passe l'été ici, ou vient dès qu'il y a des réservations. Privilège de l'organisateur, j'ai une chambre seul !",
          "Bientôt, il semble que la musique sort de partout. Des haut-parleurs, dehors, qui émettent des sons rnb modifiés à la sauce contemporaine, un régal. Et à l'intérieur, le même son depuis l'ordinateur, avec l'image, des clips genrés, qui mettent en valeur le corps des femmes, souvent dénudés et qui véhiculent tous les clichés bien sentis liés au patriarcat",
          "Le repas qu'il nous propose est excellent, largement inspiré de la cuisine grecque. Mention spéciale aux aubergines cuites au four.",
        ],
      },
      {
        heading: "J2 : Lëpushë-Skala",
        paragraphs: [
          "Ce matin, les nouvelles ne sont pas bonnes. Aurélien jette l'éponge, au moins pour aujourd'hui. Son mollet est douloureux et il n'envisage pas de pouvoir skier. Ça m'attriste de le voir ainsi, résigné à l'idée de ne pas pouvoir skier. Je dois organiser son transfert à Škala, notre halte pour ce soir, ainsi que son accueil là-bas.",
          "Paolo l'amènera dans la matinée.",
          "Nous prenons le chemin du Maja e Vajushë, un sommet qui semble classique à ski à la vue des nombreuses traces de montée, et surtout de descente. Des traces pour la plupart hésitantes, témoignant d'une mauvaise neige ou d'un ski peu sûr.",
          "Du sommet, la vue est fantastique. Nous sommes au cœur de ce massif si impressionnant que sont les Prokletije. Devant nous se dresse une imposante muraille calcaire. J'essaye de trouver des passages possibles pour l'itinéraire du lendemain, que j'ai pour le moment plutôt tracé dans les contreforts du massif, qui semblent d'ici assez peu enneigés.",
          "La pente sud, raide et continue, semble délicieuse. Changement de plan, nous allons en profiter et nous aviserons d'une extension éventuelle de la journée à sa base. D'ici, je ne vois rien de très évident, mais nous aviserons.",
          "En bas de la pente, nous rejoignons un petit plateau. Les versants alentour nous écrasent. L'une des options imaginée ne m'inspire pas, un collecteur d'avalanches de neige humide, qui n'attendra probablement pas le lendemain pour recevoir de nouvelles coulées.",
          "Reste le versant d'en face, où les ressauts, raides, semblent pouvoir être franchis à ski.",
          "En lisant la carte, j'ai l'impression que l'on pourrait remonter quelques centaines de mètres et redescendre plein nord, afin d'optimiser la limite d'enneigement. Mais au bout de 200m de dénivelé, nous arrivons au niveau d'une arête, surmonté d'un imposant monolithe. De l'autre côté, un versant abrupt dont on ne voit même pas le bas, et qui nous procure tous, à chacun notre tour, quelques frissons ! Nous rebroussons chemin pour le début de la descente, mais j'ai tout de même envie de tenter de couper à droite avant de rejoindre le plateau, pour profiter d'un meilleur enneigement. La skiabilité de ce passage est hautement improbable, mais j'aime ces incertitudes, et au pire, nous remettrons les peaux !",
          "Je tente une franche traversée, mais celle-ci me semble trop exposée pour le groupe. Je rebrousse chemin et tente juste en dessous. Il n'y a rien d'évident sur la carte, mais j'ai comme le sentiment que cela peut passer. Je traverse une petite forêt malcommode et me retrouve dans un couloir, encore au-dessus d'une barre rocheuse. À gauche, elle est encore plus haute. Dernière chance en traversant à droite. Le passage est un peu osé, mais nous avons une corde et il n'y a que 2 m de dry skiing. Ça me permettra de tester le groupe, dont une partie que je ne connais pas. Et dans tous les cas, je n'ai guère envie de remonter.",
          "En bas du pierrier, la forêt de hêtres est tellement dense que nous sommes contraints de déchausser. Premiers contacts avec la forêt albanaise, que j'avais d'emblée identifiée comme un point critique et incertain quand j'avais conçu l'itinéraire.",
          "Nous arrivons à ski au petit village de Škala, où nous retrouvons Aurélien. Il a pris ses marques dans une sorte de petite cabane à deux pans, dont le toit constitue également le mur. Il a l'air un peu dépité, et nous ne pouvons lui cacher que la journée était belle là-haut. Si nous ne lui avions pas dit, il l'aurait senti.",
          "Une femme et un homme, plus âgé qu'elle, viennent nous accueillir. Aucun des deux ne parle anglais, et nous communiquons avec les mains. Le dîner est commandé pour 18h30, c'est l'essentiel. Nous sommes affamés. En attendant, le frigo est rempli de bières…",
          "L'équipe rit. Elle rit car après avoir fait couler longuement l'eau de la douche, inspecté le chauffe-eau et testé le robinet du lavabo, j'ai décrété qu'il n'y avait pas d'eau chaude. J'avais tout testé, tout sauf d'inverser le sens du robinet. L'eau est devenue instantanément brûlante !",
          "Pour prendre notre dîner, nous pénétrons dans un autre petit chalet, en contrebas. Nous pensions entrer chez nos hôtes, mais ces derniers habitent Plav, la ville un peu plus importante à une demi-heure de route.",
          "La table se remplit de mets, dont un certain nombre pour lesquels nous sommes déjà coutumiers, comme la salade tomate concombre, et la viande. Mais il y a également une sorte de tourte aux épinards et à la viande. Une spécialité locale, a priori, car nous la retrouverons sur le versant albanais du massif deux jours plus tard, en version végétarienne.",
        ],
      },
      {
        heading: "Jour 3 : Škala - Vusanje le retour d'Aurélien",
        paragraphs: [
          "Nous avons réussi à négocier un petit déjeuner à 6h30. Mais comme à chaque fois, nos hôtes hallucinent de ces horaires matinaux, dont ils ne sont pas habitués avec leurs touristes habituels.",
          "Il y a dans le regard un brin rieur du vieil homme beaucoup d'humanité. Nous ne pouvons pas vraiment communiquer avec des mots, mais les regards suffisent. Ils disent beaucoup du respect mutuel.",
          "J'avais le choix entre une piste forestière probablement déneigée dans le bas mais sans incertitude et une montée « arc en ciel », comme Anne-Laure aime si bien qualifier ces pentes colorées sur la carte des pentes, mais où l'enneigement part du village.",
          "Évidemment, nous optons pour cette dernière option. Encore une fois, la forêt devient trop dense. Il nous faut déchausser, pousser les branches sur le côté, tant bien que mal. La zone d'éboulis que nous rejoignons est dominée par un ressaut rocheux. Sur ma carte, un sentier semblait le franchir. Coup d'œil de contrôle : le sentier est en fait plus à droite. Tant pis, allons voir au-dessus.",
          "Il ne fallait pas moins de neige pour passer le passage, et même en crampons, c'est limite. Je pose le brin de corde pour que mes compagnons puissent s'aider. Je ne pensais pas que les trois chiens qui nous suivent depuis ce matin pourraient le franchir. Aucune difficulté pour les quadrupèdes ! Nous sortons bientôt de la forêt, et je ne suis pas mécontent de ne plus calibrer mes conversations à la présence des arbres, mais enfin de pouvoir parcourir la pente de part en part sans contrainte.",
          "En regardant la carte, une fois encore, j'ai l'impression que l'on va pouvoir « traverser l'arc-en-ciel » et effectuer l'ascension du Karanfili i Ljuljaševića (2224 m) en traversée. C'était sans compter sur la muraille qui se dresse devant nous, où j'ai bien du mal à identifier les points de faiblesse que semble indiquer la carte. Mon plan B consiste à suivre le sentier d'été, qui constitue souvent une valeur sûre, et à effectuer l'ascension en aller retour. Là encore, ce sommet semblait très accessible depuis le col, mais une raide pente de neige dominée par une imposante corniche se dresse devant nous. Elle me fait trop peur, cette corniche, et je préfère éviter de passer dessous. Un seul chien nous suit jusqu'en haut, le plus téméraire, qui est aussi celui qui quémande le moins de nourriture. Nous grimpons sur les sommets pour apprécier la vue, et nous sommes gâtés !",
          "Du col, un grand couloir, large et raide, permet de basculer sur Vusanje. Il me semble qu'il passe jusqu'en bas, sans en avoir la certitude absolue. La neige est déjà bien transformée, nous y sommes un peu tard. Je suis vigilant sur le moindre bruit de coulée, et prends bien garde à trouver des points de regroupement les plus protégés possible. Tout à coup, je vois de mes yeux ce que je n'aime pas voir : un morceau de corniche, heureusement pas très gros, se détache de la crête. Il ne viendra pas jusqu'à nous.",
          "Je suis plutôt soulagé de rejoindre la zone boisée, même si celle-ci est dense et mal commode. Le sentier indiqué sur la carte n'est pas, mais nous commençons à nous y habituer. Plusieurs cratères circulaires successifs au cœur de la forêt nous interpellent. D'abord, nous pensons à un phénomène naturel. Le massif des Prokletije est en grande partie calcaire et les dolines ne sont pas rares. Mais leur forme très régulière et leur disposition, presque en série, nous font rapidement douter.",
          "Ces trous pourraient bien être les vestiges d'un épisode beaucoup plus récent de l'histoire des Balkans.",
          "Au printemps 1999, pendant la guerre du Kosovo, ces montagnes des Prokletije ont vu passer des milliers de civils kosovars fuyant les combats. Des familles entières ont traversé ces reliefs à pied pour rejoindre l'Albanie. Beaucoup marchaient de nuit, guidées par des habitants des vallées, franchissant des cols à plus de 2000 mètres dans la neige de fin d'hiver. Dans le même temps, l'armée yougoslave tentait de contrôler ces passages, et certaines positions dans ces montagnes ont été bombardées.",
          "La vallée qui accueille le village de Vusanje est ouverte et moins austère que Škala. Un peu plus basse en altitude, le printemps s'y est durablement installé. Une belle rivière à truite y coule. Ça fait du bien de retrouver aussi cette ambiance moins austère, et parfois pesante des versants abruptes des Prokletije. La petite chapelle et le cimetière, un vaste champ avec quelques tombes éparpillées, me font douter de la religion dominante ici. En regardant attentivement le clocher, un croissant en partie effacé y est peint. Ce que confirment nos hôtes du soir. Dans le village, les habitants sont majoritairement sunnites.",
          "Lorsque j'arrive devant la Guest House, il n'y a pas de signe de vie. Je vois alors une vieille dame sortir la tête de l'entrebaillement de la porte d'un petit cabanon, puis, au moment de me voir, rebrousser chemin, comme si elle cherchait à se cacher. Étrange. Je toque à la porte, et quelqu'un vient effectivement m'ouvrir. Un grand gaillard d'une quarantaine d'année, cheveux ras, pas très prolixe, peut être à cause de son piètre anglais. Son père est plus loquace, et parle plutôt bien anglais pour sa génération. Et au-delà, on retrouve chez lui la même humanité que chez nos hôtes précédents.",
          "Le repas est servi sur la table, disposée entre la cuisine et le coin télé. Une chaîne d'info en continue diffuse des images terribles de la guerre au Moyen-Orient. La matérialité du conflit nous apparait en pleine face, avec le concours de ces images animées d'une violence inouïe.",
        ],
        photos: [photos.p006],
      },
      {
        heading: "J4 : Vusanje - Valbonë",
        paragraphs: [
          "Ils ont été surpris de notre réponse, lorsqu'il nous a demandé l'heure du petit déjeuner et que nous lui avons répondu 6h. Ils n'ont pas l'habitude de se lever si tôt, a priori. Depuis la veille, il y a ce pot de pâte à tartiner qui traîne sur le plan de travail, et que le patriarche voulait nous faire goûter à toutes les sauces hier soir. Il en a rempli un grand bol ce matin, et on s'en est donné à cœur joie !",
          "J'aime les matins avant l'aurore. Tout se passe à ce moment-là, lorsque le calme de la nuit procure une clairvoyance aiguë. Je descends dans le salon, où notre hôte est déjà occupé à préparer le petit déjeuner. Il lit dans mes pensées et me propose un café. C'est elle qui me le prépare, sur un petit bleuet posé sur la table basse, devant la télé déjà allumée en cette heure matinale. J'écris et j'observe. Le petit déjeuner se prépare par coups de boutoirs successifs, entrecoupés de longues pauses, où parfois nous échangeons quelques paroles. C'est plutôt lui qui s'y affaire mais elle n'est jamais très loin. Ces gens sont attendrissants, au sens positif du terme.",
          "Nous repartons de Vusanje par une route carrossable, mais bientôt, nous devons renouer avec la forêt Monténégrine. Elles sont belles, ces forêts de hêtres, mais on aime en sortir… Le terrain est toujours aussi complexe, avec des micro relief non documentés sur la carte. La météo du jour n'a eu de cesse de changer. Elle annonçait un créneau le matin la veille, puis un créneau dans la matinée au réveil ce matin. Il a plu cette nuit, et le ciel s'est à présent assombri. Un premier grondement, au loin, m'interpelle, et lorsqu'une forte détonation et qu'un éclair frappe juste au-dessus de la pente que nous sommes en train de remonter, je comprends qu'un orage éclate. Début mars, je ne m'y attendais pas ! Ce sera le seul coup de semonce. Le grésil qui tombe depuis une bonne demi-heure maintenant a posé quelques centimètres qui devraient égayer nos descentes, et heureusement, le ciel se déchire et la visibilité s'ouvre à nouveau. Ce qui n'est pas une mauvaise chose pour composer avec ce relief complexe.",
          "À présent, nous remontons une vaste combe peu raide, jusqu'au col Čafa e Furumit. Anne-Laure et Aurel préfèrent préserver leurs bobos respectifs, et nous montons rapidement au Maja e Rosit (2522m) le temps qu'Arnaud et Damien ne nous rejoignent au col. Une délicieuse neige de printemps agrémente cette nouvelle descente, puis vient le temps où il faut optimiser l'enneigement. Le versant que nous traversons est ravagé par les avalanches de neige humide. C'est toujours un plaisir incertain que d'évoluer dans ces boules, heureusement un peu ramollies.",
          "Il nous faudra une petite demi-heure de marche pour rejoindre Kucaj, un petit hameau où vivent deux familles juste au-dessus de Valbonë, lieu incontournable pour le ski de rando en Albanie. Nous sommes accueillis par une jeune femme qui parle bien anglais, comme l'ensemble des albanais de cette génération que nous avons croisé depuis le début de notre périple. Le tourisme est devenu l'unique activité économique de ces villages reculés. Mais à Kucaj, nous sommes les premiers de l'hiver, et probablement les seuls. Le potentiel de ski de rando est énorme ici, davantage que dans les autres vallées visitées.",
          "Comme les deux nuits précédentes, nous mangeons dans leur salon, sur la table basse, servis par une mère et sa fille. Un festin, encore. Notamment cette sorte de tourte aux brocolis. Comme à l'usage, l'énorme écran plat, disproportionné par rapport à la taille de la pièce, diffuse des clips. Cette fois-ci de musique traditionnelle.",
        ],
      },
      {
        heading: "J5 : Valbonë - Cerem",
        paragraphs: [
          "Ce matin, en ouvrant la porte d'entrée, l'odeur fraîche du tabac m'agresse les sens encore endormis. Un homme d'une cinquantaine d'années, probablement le père, est installé sur le canapé. Il tire frénétiquement sur sa clope indus. La télé est encore allumée, mais cette fois elle diffuse d'autres types de clip, où le corps des femmes est mis en exergue.",
          "Il est né là, dans cette maison construite au début du XXe siècle. Il me dessine dans le creux de la main « 1911 ». Puis il nous fait visiter les nouveautés : de nouvelles chambres avec lits doubles et matelas épais, qui tranchent avec notre dortoir et ses matelas à ressorts surmontés d'une mousse molle, témoignant d'une réelle montée en gamme de ces hébergements touristiques, probablement corrélée avec une demande en ce sens. Pas la nôtre en tout cas. Il semble bien content de nous voir, petite variation d'un quotidien sûrement assez solitaire l'hiver dans ces montagnes reculées.",
          "Nous repartons en basket. Trop fatigué pour poursuivre à ce rythme, Arnaud préfère prendre une pause. Changeant de pays presque chaque jour, de part et d'autre de cette crête frontalière, ce n'est pas aussi simple que serait un trip en étoile. Je lui propose donc plusieurs options, et celle retenue consiste à le raccompagner à Vusanje, où il passera les deux prochaines nuits. Il nous rejoindra à Babino Polje en taxi pour finir la dernière étape ensemble. L'écobuage est ici une pratique très répandue, et jusqu'à des altitudes élevées, les champs ont été brûlés, laissant une odeur tenace de soufre. Nous remontons une large combe jusqu'au Qafa Prosllopit, permettant de basculer à nouveau dans la vallée de Vusanje quittée la veille. Après avoir accompagné Arnaud en bas de la neige, je rejoins l'autre partie du groupe au sommet du Maja e Fazlis (2194m), où commence le chemin incertain qui doit nous mener à Cerem. Comme souvent lors de cette traversée, la forêt s'avère être le point problématique, d'autant plus à la descente. Une première zone à peine colorisée sur ma carte s'avère déjà raide et passe tout juste entre les ressauts. Je crains pour le crux suivant, teinté d'un jaune légèrement plus foncé. Surtout, j'hésite entre deux petits vallons parallèles. La carte ne m'aide pas à prendre une option plutôt qu'une autre, mais l'image aérienne me convainc plutôt l'option de gauche, celle de droite semblant plus rocailleuse. Après quelques acrobaties pour traverser une zone de végétation dense, nous nous retrouvons au-dessus d'un ressaut infranchissable. Échec. Nous rebroussons chemin, et l'autre option s'avère bien plus commode. Les rochers qui apparaissaient sur l'image aérienne n'étaient en fait qu'un vaste pierrier, rien à voir avec l'escarpement que j'imaginais alors. Non sans mal, nous arrivons à nous jouer des incertitudes du couvert végétal et rejoignons une piste forestière, enneigée jusqu'au village de Cerem. Je viens de marquer un bon point pour Anne-Laure, qui DETESTE mettre les skis ET les chaussures sur le sac à dos.",
          "Nous sommes accueillis devant un grand bâtiment aux volets jaunes poussin. Un guest house « diffuse » où chaque petite construction a sa fonction : cuisine d'un côté, salon dans un autre, espace repas et couchage dans le grand bâtiment. Le salon est une petite cabane en bois dont le plancher penche légèrement, chauffée par un petit poêle à bois d'une efficacité redoutable. Au-dessus de la tringle à rideaux, dans le lambris sombre de la pièce, trônait un grand portrait improbable. Une femme aux cheveux volumineux, maquillée à la mode des années quatre-vingt, nous regardait avec un sourire figé. Drapée dans un tissu violet brillant, elle semblait sortir d'un vieux magazine de glamour. Sa présence avait quelque chose de délicieusement incongru. Le repas est gargantuesque : une petite dizaine de convives pourrait s'y attabler sans que personne ne manque de rien, indice parmi d'autres de cette générosité dans l'accueil. Après le dîner, nous retournons dans la petite maisonnette salon pour notre désormais traditionnel tournoi de belote digestive. Nos hôtes s'installent avec nous autour de la petite table basse, et nous échangeons des regards et le fait d'être réunis, bien plus que des paroles, rares et traduites en gestes et mimes. Cette présence chaleureuse est agréable. Demain, ce sera le jour le plus long. Une trentaine de kilomètres et pas loin de 2000m de dénivelé positif.",
        ],
        photos: [photos.p027],
      },
      {
        heading: "J6 : Cerem - Gacaferi",
        paragraphs: [
          "J'aime ces journées où le relief se développe longtemps sous nos pieds. Ces journées où nous franchissons des cols et des crêtes, où le terrain change à mesure de notre progression. Ces journées où il faut ruser pour couvrir le plus possible la distance à la descente. Ces journées qui commencent tôt et qui finissent tard, et où l'apéro consacre une forme d'accomplissement.",
          "Une première montée nous mène au sommet du B24, non sans rappeler à Damien un des groupes de musique qui a bercé ses jeunes années, et à Aurélien l'utilité des couteaux qu'il n'a pas emmenés. Une belle descente nous dépose ensuite à l'origine d'une longue crête arborée, chevauchée des prochaines heures à cheval entre le Monténégro et l'Albanie. Du sommet du « B26 », la vue s'ouvre sur le vaste vallon peu raide de Doberdoll, qui a été un temps une option de halte. Je lui avais préféré Gacaferi, derrière la crête frontalière, versant kosovard, car le refuge avait l'air génial, et j'avais envie de mêler les trois pays frontaliers à cette traversée des Prokletije. Ces prokletijes, si raides dans la première partie du périple, changeaient à présent complètement de relief pour proposer des sommets plus arrondis et cette vaste combe peu raide de Doberdoll. Un terrain de jeu idéal pour les motoneiges, qui règnent en maître, nous offrant le plaisir du bruit et de l'odeur, et la furieuse envie de fuir ! L'un d'eux vient à ce moment-là à notre rencontre, le genou posé sur le siège de sa motoneige, comme pour surveiller les visiteurs du lieu qui ne seraient pas aussi bruyants qu'eux. Nous remontons sous une chaleur moite la raide pente sud qui nous surplombe, donnant accès à cette nouvelle frontière, matérialisée comme depuis le début de la journée par une ligne géographique de partage des eaux.",
          "Gacaferi est un petit hameau de montagne, où le drapeau kosovard flotte au vent. Pour la première fois depuis le début de cette traversée, nous ne sommes pas les seuls skieurs : deux autres groupes de jeunes anglais sont bientôt rejoints par le couple que nous avons croisé par hasard à Vusanje deux jours plus tôt. Elle est chinoise et a habité neuf ans à Pau avant de déménager dans le Trentin-Haut-Adige pour le rejoindre, lui, jeune guide de haute montagne italien qui ne parle presque pas un mot de la langue de Dante et de Pétrarque.",
          "Nous sommes frappés de la qualité de l'accueil. Alors certes, il n'y a pas le charme de l'accueil « chez l'habitant » que nous avons vécu les soirées précédentes dans tous ces villages traversés, mais ici, rien n'est laissé au hasard dans l'attention portée au confort du visiteur. Le bar est en libre service, chacun consignant ses consommations dans un petit carnet. Un espace salon est doté de plusieurs canapés confortables, disposés en cercles et face à une large ouverture sur les montagnes, et le dîner, préparé notamment par la maman d'Adriatik, le gardien, est sans équivoque le meilleur depuis le début de notre traversée. Le buffet est une belle épreuve de self-control, et se termine très souvent par le même constat : « bon ba on va dormir sur le dos ce soir..! ». Il y a une telle diversité et c'est si bien cuisiné que ce n'est pas facile de ne pas tester chaque plat. Même notre chien n'aura jamais été aussi nourri, et c'est probablement ce qui va le conduire à nous abandonner.",
        ],
      },
      {
        heading: "J7 : Gacaferi - Babino Polje",
        paragraphs: [
          "Le refuge de Gacaferi n'a que des qualités, sauf celle de nous imposer un petit déjeuner à partir de 8h du matin. Trop tard pour les conditions printanières, et trop tard pour les prévisions météorologiques du jour, dont les conditions devraient se dégrader à partir de la mi-journée. Malgré tout, je ne change pas les ambitions du jour, projetant les ascensions du Maja e Ropes (2502m) et du Maja e Qenit (2405m). Alors que nous plongeons la belle crête du premier sommet, des cumulus gris se forment à une vitesse impressionnante. Nous basculons en versant Est pour une belle descente qui nous éloigne de notre cap, mais une piste forestière nous permet de contourner la montagne à moindre frais pour rejoindre un petit hameau d'alpage où de nombreuses constructions sont récentes, témoignant d'un intérêt marqué pour ces espaces montagnards. À l'entrée du village, une vieille Renault R5 a été modifiée pour l'équiper de chenillettes. La météo semble hésiter, entre nuages et éclaircies, grésil et temps sec. Du sommet se déploie sous nos skis la longue vallée de Babino Polje. Un hameau que Michel Parmentier évoque dans son récit. La descente est délicieuse, en neige transformée. Par contre, une ceinture de sapins continue barre l'accès au fond de vallon. Ce ne sont pas des épicéas aux branches hautes, mais des cônes parfaits dont les branches basses touchent le sol, et bien souvent, celles du voisin. C'est un ski de précision qu'il faut déployer et ruser pour trouver le cheminement dans ce labyrinthe. Heureusement, la ceinture n'est pas large, et nous rejoignons le fond de la vallée et sa piste, damée en son centre par les passages successifs de Lada, dont le bas de caisse touche au fur et à mesure que les ornières des roues se creusent.",
          "Nous retrouvons Arnaud, venu à notre rencontre sur cette piste. Le hameau de Babino Polje compte 4 ou 5 maisons, de l'autre côté de la rivière, et une quinzaine d'autres sont construites en bordure de la piste, dont notre guest house. Un ensemble qui nous apparaît massif, composé de plusieurs petites maisons à étages accolées, et d'un building de 4 ou 5 étages, immense, disproportionné au regard des autres bâtis de la vallée. Elle me fait penser à des bâtisses asiatiques, avec ses trois toits à quatre pans successifs, entrecoupant les trois derniers étages. Sa construction n'est pas achevée, elle semble même loin de l'être. De façon étonnante, une partie du toit manque sur sa partie avant, renforçant encore ce sentiment d'inachèvement. Nous sommes accueillis par un couple de jeunes. Elle est enceinte, au terme, de leur quatrième enfant.",
          "Contrairement aux autres hébergements, où ce sont souvent des personnes âgées ou très jeunes qui se sont occupés de nous, ici le rythme semble beaucoup plus soutenu. Ils n'ont pas l'air de s'ennuyer. Trois enfants, et bientôt quatre, un immense chantier de construction que le mari mène seul, et une guest house à gérer toute l'année : tout cela ne laisse guère de répit. D'ailleurs, nous les sentons un peu débordés. Tout semble ici fait à la va-vite, et cela me pose question.",
          "Dans notre petit dortoir, la douche a été démontée. Le mari tente de la remonter pour nous, mais finalement, il n'y aura que de l'eau chaude — trop chaude. Nous irons donc nous doucher dans la douche commune. Et là encore, il ne faut pas être trop tatillon sur les détails de construction : le carrelage n'est pas très bien posé, la douche, avec option pluie, ne fonctionne pas, il n'y a aucun système d'évacuation de l'humidité…",
          "Dans la pièce qui sert de réfectoire, un chauffage à gaz de type parapluie tente de réchauffer l'espace, sans grand succès. Là encore, le sol est en pente — et quelle pente.",
          "Tous ces petits éléments nous donnent le sentiment d'une vie menée à un rythme effréné. Peut-être qu'en reliant certains détails, une forme de cohérence apparaît : le gros Q7, ancienne génération, garé dans la cour, le polo Moncler, le Samsung Ultra de dernière génération, et puis cette construction démesurée.",
          "Tout cela semble converger vers un même horizon : une quête de grandeur, sans doute d'abondance ou de richesse. Mais parfois, peut-être, vaut-il mieux garder une autre mesure, au risque sinon de tomber dans une démesure approximative.",
          "Quand bien même, nous sommes bien reçus, très bien même. Après la douche, nous sommes invités à prendre un thé ou un café dans le petit espace qui sert également de cuisine et de chambre à coucher pour toute la famille. Il s'agit du rez-de-chaussée d'une des petites maisonnettes.",
          "La porte d'entrée frotte sur le linoléum. Il faut la soulever légèrement pour parvenir à l'ouvrir. Là, on entre dans une pièce qui, d'un côté, est équipée pour cuisiner, et de l'autre où des canapés se transformeront, le soir venu, en un grand lit pour toute la famille.",
          "Au fond, une petite véranda vitrée accueille une table et deux bancs. C'est dans ce petit espace que nous passerons l'après-midi à jouer aux cartes, agréablement réchauffés par le poêle à bois et par un petit four circulaire disposé au sol, dans lequel notre hôte fait cuire ses petits pains.",
          "Je laisse le groupe pour aller effectuer un petit repérage. Demain, nous n'aurons pas le temps de tester : il faudra aller au plus efficace, car la journée est timée. Quelques heures de ski le matin, puis, vers 13 ou 14 heures au plus tard, le taxi doit venir nous récupérer pour nous ramener à Durrës, d'où nous embarquons sur le ferry le soir même.",
          "Plusieurs options sont possibles. J'ai choisi la plus simple, la moins incertaine — peut-être pas la ligne la plus belle ni la plus évidente — mais celle dont je suis sûr qu'elle ne livrera pas de surprises. D'autant que la météo du lendemain est incertaine, et ce sera probablement la moins belle journée depuis le début de la traversée.",
        ],
      },
      {
        paragraphs: [
          "Lorsqu'il est 6h du matin, nous pénétrons à nouveau dans l'espace de vie de la famille. Les canapés ont été déployés et tout le monde dort sur ce large plan de couchage. Tout le monde, sauf la mère, qui a gentiment accepté de nous servir le petit déjeuner aussitôt. Elle nous a même préparé des crêpes encore fumantes, posées sur l'assiette au milieu de la table.",
          "Avant de partir, on nous remet ce qui s'avérera être un précieux sésame : le papier qui nous autorise à entrer au Monténégro depuis l'Albanie sans passer par l'un des postes-frontières officiels. À ma demande, le mari était allé nous le chercher hier soir à Plav.",
          "Pour monter au sommet du Starac, j'avais donc deux options. L'une consistait à passer par l'est et à traverser une zone de forêt dense qui me paraissait très raide sur la carte. L'autre, en contournant par l'ouest, consistait à remonter des pentes douces jusqu'au Javorsko Brdo, puis à suivre une large épaule jusqu'au sommet. C'est cette option, plus simple, qui a eu ma faveur.",
          "Du sommet, nous basculons en versant nord pour skier une délicieuse petite couche de poudreuse sur fond dur. Puis nous traversons franchement vers l'ouest, en tentant d'éviter autant que possible les zones trop fortement boisées. À ce jeu-là, les traces de motoneige se révèlent être de précieux indices, me permettant de connecter les espaces ouverts également repérés sur mes images satellites.",
          "Nous remettons une dernière fois les peaux pour monter au sommet du Djevojački krš. D'ici, nous avons une magnifique vue sur toute cette large vallée qui borde les Prokletije. Au milieu de celle-ci, il y a le magnifique lac de Plav. Et tout au fond, notre point de départ d'il y a huit jours, un peu masqué par les nombreux nuages qui s'amoncellent progressivement sur les sommets.",
          "Nous commençons à descendre une large arête en neige transformée et, rapidement, je me rends compte que ce n'est pas celle que je voulais suivre. L'autre est masquée par le brouillard qui envahit progressivement tous les sommets. Alors nous bifurquons et pénétrons dans une forêt de sapins, encore une. Mais dans celle-ci, les arbres sont relativement espacés et le ski y est plutôt aisé.",
          "Damien vient de se prendre un beau vol. Il n'avait pas vu une petite rupture de pente causée par l'effet du vent. Il s'est déboîté l'épaule. Il se la remet instantanément. Damien a l'air dur au mal : il n'exprime presque rien, mais je sens qu'il a mal.",
          "Je ralentis le rythme pour finir ce passage pas si facile à skier. En bas de la forêt, nous rejoignons une piste, puis, de la piste, la route du col de Čakor, point de départ de Michel et Périllat lors de leur grand raid à skis des années 80. Inspiration originelle de ce projet de voyage. J'y pense et cela ne me laisse pas indifférent.",
          "À présent, nous descendons sur les bas-côtés de cette route, en partie déneigée. Bientôt, après un virage, il me semble qu'une voiture est garée au milieu de la route. Étrange pour une route qui paraît praticable. Et en m'approchant, je comprends.",
          "Dessus, il est écrit « policija ». Sur les deux sièges avant, deux policiers semblent nous attendre. Lorsqu'ils nous voient, le passager de la voiture sort, et je sais très bien ce qu'il va me demander. Avant même qu'il ne le fasse, je sors mon passeport et demande à mes compagnons de faire de même.",
          "Et puis je lui tends aussi ce précieux sésame, que je suis content d'avoir eu la clairvoyance de demander — un peu aidé par la discussion que j'avais eue avec notre hôte de Skala le troisième soir. Sans lui, je n'y aurais peut-être pas pensé, car l'an passé nous étions passés de l'Albanie à la Macédoine, puis de la Macédoine au Kosovo, sans passer par les postes frontières officiels, et nous étions pourtant repartis par Pristina alors que nous étions arrivés par Tirana.",
          "Les deux policiers emportent nos passeports dans la voiture et, après quelques minutes, ils nous les rendent. A priori, nous passons ce contrôle sans encombre.",
          "Je leur demande confirmation — non sans mal et grâce à Google Translate — que le taxi pourra venir nous chercher au bout de la route déneigée. Je ne comprends pas très bien la réponse, mais il me semble qu'elle est plutôt positive, alors qu'ils étaient assez austères au moment de nous aborder.",
          "Ils se sont bien détendus en voyant que nous étions en règle et esquissent même un sourire lorsque je me trompe dans les boutons de Google Translate et que je lui fais répéter sa réponse.",
          "Alors que nous attendons le taxi, un gros pick-up tirant une remorque sur laquelle est posé un buggy s'arrête à notre hauteur. À l'intérieur, deux hommes en treillis militaires, plutôt souriants. Ils se présentent comme des garde-frontières. Ils sont déjà au courant de notre présence ici et nous demandent si c'est bien là que nous attendons le taxi.",
          "Il est midi et demi pile lorsque nous arrivons, exactement l'horaire que j'avais envoyé ce matin à notre chauffeur de taxi.",
          "Le chauffeur de taxi ne parle pas un mot d'anglais. Il me demande seulement : « Where are you from ? » Je lui explique que nous devons nous arrêter en chemin, à Lepushë, pour récupérer tous nos bagages. Je tente de lui écrire cela sur Google Translate, mais, peu sûr d'avoir bien compris ma demande, il passe un coup de fil à un ami — un guide local de ski de randonnée habitant à Plav, qui parle un anglais parfait.",
          "J'explique donc à notre interprète improvisé que nous devons simplement faire une halte à Lepushë pour récupérer nos affaires.",
          "Notre chauffeur a une fâcheuse tendance à regarder son téléphone et, à un moment, cela ne pouvait pas manquer. Il ne voit pas la voiture arrêtée devant nous. Heureusement que j'esquisse un mouvement de la main pour empoigner le volant et donner un coup à droite pour qu'il réagisse enfin. Il était temps.",
          "En arrivant au port, il semble complètement perdu. Je lui renvoie un lien Google Maps et, semble-t-il, c'est la première fois qu'il se sert de cette application. D'ailleurs, lorsqu'il parvient enfin à nous déposer plus ou moins à l'endroit voulu, il me demande de lui renvoyer un lien pour sortir du port et rentrer chez lui. Il ne savait visiblement pas comment se servir de Google Maps. Pour un chauffeur de taxi, c'est tout de même un comble.",
          "Le taxi va nous mener au ferry à Durrës, où nous aurons juste le temps d'acheter à manger avant d'embarquer. Le ferry nous débarquera à Bari, au sud de l'Italie, et nous aurons à peine le temps, après le passage de la douane, de prendre un bus pour la gare centrale. Là encore, nous aurons juste le temps d'acheter de quoi manger avant de monter dans le train qui nous mènera jusqu'à Milan.",
          "À Milan, nous aurons tout juste le temps de changer de quai pour prendre un dernier train de la compagnie Trenord qui nous conduira à Novara. C'est là qu'il pourrait y avoir le seul petit grain de sable. En effet, lors du départ pour le ferry, j'ai voulu déplacer ma voiture pour ne pas la laisser deux semaines sur la même place. Elle a fait un bruit bizarre, puis elle a calé. Elle m'a dit : « C'est sûrement la batterie », mais j'avais quand même un doute, puisque la voiture avait démarré avant de s'arrêter.",
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "MONTÉNÉGRO",
    subtitle: "Une traversée des Prokletije",
    meta: "Mars 2026 · 8 jours de traversée à ski entre Albanie, Monténégro et Kosovo · Photos : Yann Borgnet",
    // Les 44 photos du portfolio WordPress, dans l'ordre éditorial déjà
    // choisi côté WordPress (voir la note en tête de fichier — aucune
    // corrélation jour par jour possible faute d'EXIF/GPX horodaté, jamais
    // reclassé à la main). Les 15 premières forment la mosaïque visible au
    // chargement, le reste se déplie au clic (CarnetGallery).
    photos: [
      photos.p001, photos.p002, photos.p003, photos.p004, photos.p005,
      photos.p006, photos.p007, photos.p008, photos.p009, photos.p010,
      photos.p011, photos.p012, photos.p013, photos.p014, photos.p015,
      photos.p016, photos.p017, photos.p018, photos.p019, photos.p020,
      photos.p021, photos.p022, photos.p023, photos.p024, photos.p025,
      photos.p026, photos.p027, photos.p028, photos.p029, photos.p030,
      photos.p031, photos.p032, photos.p033, photos.p034, photos.p035,
      photos.p036, photos.p037, photos.p038, photos.p039, photos.p040,
      photos.p041, photos.p042, photos.p043, photos.p044,
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera/Géorgie/
 *  Kazakhstan, jamais une photo retapée séparément. */
export const indexCover = photos.p001;
