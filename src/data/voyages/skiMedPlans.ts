// Page Raid / Ski méditerranéen : les cinq plans d’un même départ (un seul voyage,
// destination définitive choisie selon la neige, la météo et la logistique).
// Ordre : A Maroc · B Bulgarie · C Turquie · D Corse · E Pyrénées orientales.
//
// Sources : Bulgarie = brief du 05/10/2026 (chiffres GPX « SKI MED Bulgarie 7j.gpx »,
// à vérifier contre le fichier dès qu’il est dans le dépôt) ; Corse, Pyrénées et
// Maroc = contenu de l’ancienne section « raids » (itinéraires indicatifs).
// Aucun chiffre n’est inventé : un champ absent n’est pas affiché.

export type PlanDay = {
  num: string;
  title: string;
  /** Lieux / cols importants, sous le titre. */
  via?: string[];
  text?: string;
  /** Distance en km. Absent = pas de chiffre fiable. */
  km?: number;
  up?: number;
  down?: number;
  peak?: number;
  /** Valeur arrondie / « environ » dans la source. */
  approx?: boolean;
  nightLabel?: string;
  night?: string;
  alert?: string;
  /** Titre de partie avant l’étape (ex. massif). */
  part?: string;
  /** Ligne de liaison après l’étape (transfert). */
  link?: string;
};

export type PlanLine = {
  /** Phrase éditoriale courte sous le titre. */
  pitch: string;
  photo?: { src: string; alt: string; position?: string };
  info: { label: string; value: string }[];
  /** GPX de référence (public/). La carte n’est rendue que si le fichier existe. */
  map?: { gpx: string; title: string };
  itinerary?: { title: string; intro?: string; days: PlanDay[]; note?: string };
  /** Message quand l’itinéraire n’est pas encore arrêté. */
  pending?: string;
};

export type Plan = {
  id: string;
  letter: string;
  country: string;
  /** Sous-titre sous le pays (massif). */
  massif: string;
  line?: PlanLine;
  /** Variantes du plan (ex. Maroc : M’Goun / Toubkal). */
  variants?: { id: string; label: string; line: PlanLine }[];
  /** Variante affichée par défaut (id) — la première si absent. */
  defaultVariant?: string;
};

export const plansSection = {
  eyebrow: "Les plans",
  title: "Cinq lignes sont préparées. Une seule sera skiée.",
  intro:
    "Du Haut Atlas aux Balkans, des Taurus à la Corse et aux Pyrénées orientales, chaque ligne est travaillée en amont. Quelques jours avant le départ, la neige et la météo décideront de celle qui sera skiée.",
  tabsLabel: "Choisir un plan",
  disclaimer:
    "Itinéraires indicatifs. Le déroulement des étapes peut évoluer selon l’enneigement, les conditions nivologiques et météorologiques et l’ouverture des hébergements.",
};

export const plans: Plan[] = [
  {
    id: "maroc",
    letter: "A",
    country: "Maroc",
    massif: "Haut Atlas",
    defaultVariant: "toubkal",
    variants: [
      {
        id: "mgoun",
        label: "M’Goun",
        line: {
          pitch: "Une ligne dans le Haut Atlas central, autour du M’Goun.",
          info: [
            { label: "Pays", value: "Maroc" },
            { label: "Massif", value: "Haut Atlas — M’Goun" },
          ],
          pending: "Itinéraire en cours de préparation : étapes, distances et trace seront publiés dès qu’ils seront validés.",
        },
      },
      {
        id: "toubkal",
        label: "Toubkal",
        line: {
          pitch:
            "Une traversée originale du Haut Atlas, qui évite volontairement l’itinéraire classique du Toubkal : hautes vallées, grands cols, villages berbères et une seule nuit en bivouac.",
          photo: {
            src: "/photos/Maroc/maroc-haut-atlas-toubkal-ski-de-randonnee-et-paysage-d-altitude-06386.jpg",
            alt: "Crêtes enneigées du Haut Atlas dominant la plaine au loin, Maroc",
            position: "center 40%",
          },
          info: [
            { label: "Pays", value: "Maroc" },
            { label: "Massif", value: "Haut Atlas — massif du Toubkal" },
            { label: "Départ", value: "Amsouzart / Aït Igrane" },
            { label: "Arrivée", value: "Oukaïmeden" },
            { label: "Forme du raid", value: "Traversée à ski en itinérance" },
            { label: "Hébergements", value: "Gîtes chez l’habitant, guesthouses et une seule nuit en bivouac" },
            { label: "Durée", value: "6 à 7 jours de ski" },
            { label: "Distance", value: "environ 63 km" },
            { label: "D+", value: "environ 8 100 m" },
            { label: "Altitude maximale", value: "environ 3 980 m" },
          ],
          itinerary: {
            title: "6 à 7 jours. Du lac d’Ifni à l’Oukaïmeden.",
            days: [
        {"num": "J1", "title": "Amsouzart / Aït Igrane → lac d’Ifni", "km": 5.6, "up": 1025, "down": 1025, "text": "Entrée dans le massif par son versant sud et montée vers le lac d’Ifni.", "night": "hébergement local / organisation selon conditions."},
        {"num": "J2", "title": "Lac d’Ifni → haute vallée / azibs", "km": 10.1, "up": 1380, "down": 1345, "text": "Premier grand franchissement vers le nord.", "night": "bivouac — la seule nuit de bivouac de tout le raid."},
        {"num": "J3", "title": "Haute vallée → Azib Likemt", "km": 14.4, "up": 2090, "down": 1520, "peak": 3976, "text": "Une courte liaison intermédiaire d’environ 2 km, puis une grande traversée.", "night": "hébergement rustique / azib ou solution locale organisée."},
        {"num": "J4", "title": "Azib Likemt → Tacheddirt", "km": 10.0, "up": 1170, "down": 1410, "approx": true, "text": "Franchissement d’un haut col puis descente vers l’un des plus hauts villages du massif.", "night": "gîte chez l’habitant à Tacheddirt."},
        {"num": "J5", "title": "Tacheddirt → Timichi", "km": 9.2, "up": 880, "down": 1320, "text": "Nouvelle traversée de vallée à vallée par un col d’altitude.", "night": "gîte / guesthouse chez l’habitant à Timichi."},
        {"num": "J6", "title": "Timichi → Oukaïmeden", "km": 11.5, "up": 1460, "down": 800, "text": "Dernier franchissement avant de rejoindre le plateau d’Oukaïmeden.", "nightLabel": "Fin du raid", "night": "ou nuit en gîte / auberge / guesthouse à Oukaïmeden."},
            ],
          },
        },
      },
    ],
  },
  {
    id: "bulgarie",
    letter: "B",
    country: "Bulgarie",
    massif: "Rila & Pirin",
    line: {
      pitch:
        "Deux massifs, une seule ligne. Des hauts plateaux du Rila aux reliefs plus acérés du Pirin, une traversée à ski en itinérance, entre refuges d’altitude, monastère orthodoxe et grands vallons balkaniques.",
      info: [
        { label: "Pays", value: "Bulgarie" },
        { label: "Massifs", value: "Rila & Pirin" },
        { label: "Départ", value: "Seven Rila Lakes (haut du télésiège, vers 2 100 m)" },
        { label: "Arrivée", value: "Gotse Delchev Hut / station basse du secteur Bezbog" },
        { label: "Forme du raid", value: "Traversée à ski en itinérance" },
        { label: "Hébergements", value: "Refuges de montagne et hébergements locaux, avec une liaison routière entre le Rila et le Pirin. La logistique exacte de certaines nuits est encore en cours de consolidation." },
        { label: "Durée", value: "7 jours de ski" },
        { label: "Distance", value: "environ 93,1 km" },
        { label: "D+", value: "environ 9 660 m" },
        { label: "D−", value: "environ 9 690 m" },
        { label: "Altitude maximale", value: "environ 2 790 m" },
      ],
      map: { gpx: "/gpx/ski-med-bulgarie-7j.gpx", title: "Carte de la traversée Rila et Pirin, Bulgarie" },
      itinerary: {
        title: "7 jours. Du Rila au Pirin.",
        days: [
        {"num": "J1", "title": "Seven Rila Lakes → Malyovitsa", "via": ["Haut du télésiège des Sept Lacs, vers 2 100 m"], "text": "Départ depuis l’arrivée haute du télésiège des Sept Lacs de Rila. Première traversée d’altitude vers Malyovitsa.", "km": 9.5, "up": 1020, "down": 1140, "peak": 2575, "nightLabel": "Nuit", "night": "secteur du refuge Malyovitsa.", "part": "Rila"},
        {"num": "J2", "title": "Malyovitsa → monastère de Rila", "via": ["Du cœur du Rila à la vallée du monastère"], "text": "Grande bascule depuis le cœur du Rila vers la vallée du monastère : le contraste entre la haute montagne et le monastère orthodoxe est l’un des points forts de cette traversée.", "km": 11.1, "up": 1140, "down": 1965, "peak": 2710, "nightLabel": "Nuit", "night": "dans le secteur du monastère de Rila — hébergement en cours de sélection."},
        {"num": "J3", "title": "Monastère de Rila → Ribni Ezera", "via": ["Ribni Ezera / Fish Lakes"], "text": "Remontée dans le Rila depuis la vallée du monastère vers le refuge de Ribni Ezera.", "km": 17.9, "up": 2090, "down": 1030, "peak": 2690, "nightLabel": "Nuit", "night": "refuge de Ribni Ezera / Fish Lakes."},
        {"num": "J4", "title": "Ribni Ezera → Semkovo", "via": ["Dernière traversée du Rila"], "text": "Dernière traversée du Rila avant la descente sur Semkovo. Liaison routière entre le Rila et le Pirin.", "km": 10.0, "up": 550, "down": 1080, "peak": 2665, "nightLabel": "Nuit", "night": "organisation de la nuit et du transfert encore à préciser.", "link": "Liaison routière entre le Rila et le Pirin"},
        {"num": "J5", "title": "Entrée dans le Pirin → Yavorov → secteur Koncheto → Spano Pole", "via": ["Yavorov", "Koncheto (passage, sans nuit)", "Spano Pole"], "text": "La grande journée de la traversée : approche de Yavorov puis traversée vers Spano Pole, par le secteur de Koncheto, franchi sans y dormir.", "km": 19.3, "up": 2535, "down": 1625, "peak": 2790, "nightLabel": "Nuit", "night": "Spano Pole (nuit actuellement envisagée).", "alert": "Plusieurs variantes de nuit sont encore à l’étude dans le Pirin.", "part": "Pirin"},
        {"num": "J6", "title": "Spano Pole → Tevno Ezero", "via": ["Cœur du Pirin"], "text": "Traversée du cœur du Pirin vers Tevno Ezero.", "km": 9.4, "up": 1155, "down": 650, "peak": 2620, "nightLabel": "Nuit", "night": "Tevno Ezero."},
        {"num": "J7", "title": "Tevno Ezero → Gotse Delchev", "via": ["Pied du secteur de Bezbog"], "text": "Dernière traversée du Pirin puis longue descente vers Gotse Delchev, au pied du secteur de Bezbog. La traversée se termine à Gotse Delchev Hut / station basse ; un transfert routier peut ensuite rejoindre la vallée.", "km": 15.8, "up": 1165, "down": 2200, "peak": 2645, "nightLabel": "Fin de la traversée", "night": "Gotse Delchev Hut / station basse."},
        ],
        note: "Le Rila et le Pirin sont reliés par un transfert routier : aucune liaison à ski entre Semkovo et le Pirin.",
      },
    },
  },
  {
    id: "turquie",
    letter: "C",
    country: "Turquie",
    massif: "Massifs méditerranéens · Taurus",
    line: {
      pitch: "Les montagnes méditerranéennes de Turquie, entre Taurus et littoral.",
      info: [{ label: "Pays", value: "Turquie" }, { label: "Massif", value: "Massifs méditerranéens — Taurus" }],
      pending: "Itinéraire en cours de préparation : étapes, distances et trace seront publiés dès qu’ils seront validés.",
    },
  },
  {
    id: "corse",
    letter: "D",
    country: "Corse",
    massif: "Alta Strada",
    line: {
      pitch: "Une grande traversée hivernale de la montagne corse, du sud vers le nord, suivant l’épine dorsale de l’île. Une itinérance sauvage où alternent hauts plateaux, lacs gelés, forêts de pins laricio et grands reliefs granitiques. En hiver, la montagne retrouve une solitude presque totale : une partie des nuits se passe dans les refuges du GR20 devenus refuges non gardés, entrecoupée de nuits plus confortables dans les rares auberges accessibles par les vallées.",
      info: [
        { label: "Pays", value: "France — Corse" },
        { label: "Massif", value: "Alta Strada, du Renoso au Cinto" },
        { label: "Départ", value: "Val d’Ese" },
        { label: "Arrivée", value: "Haut-Asco" },
        { label: "Forme du raid", value: "Traversée à ski en itinérance" },
        { label: "Hébergements", value: "Refuges non gardés en altitude + auberges/hôtels lors des passages en vallée." },
        { label: "Durée", value: "8 jours de ski" },
        { label: "Distance", value: "environ 105 km" },
        { label: "D+", value: "environ 9 820 m" },
        { label: "D−", value: "environ 10 020 m" },
      ],
      map: { gpx: "/gpx/corse-alta-strada-2027.gpx", title: "Carte de l’Alta Strada en Corse" },
      itinerary: {
        title: "8 jours. Du Val d’Ese à Haut-Asco.",
        days: [
        {"num": "J1", "title": "Val d’Ese → Capannelle", "km": 14.2, "up": 1394, "down": 1332, "text": "Traversée depuis le plateau d’Ese vers le massif du Renoso et Capannelle.", "night": "gîte/auberge ou hébergement de montagne dans le secteur de Capannelle selon ouverture."},
        {"num": "J2", "title": "Capannelle → Vizzavona", "km": 14.3, "up": 1073, "down": 1789, "text": "Traversée vers le col de Vizzavona et retour temporaire dans une vallée habitée.", "night": "hôtel, gîte ou auberge à Vizzavona."},
        {"num": "J3", "title": "Vizzavona → refuge de l’Onda", "km": 12.5, "up": 1522, "down": 1007, "text": "Retour immédiat en haute montagne et entrée dans la partie centrale de l’Alta Strada.", "night": "refuge de l’Onda, non gardé en hiver."},
        {"num": "J4", "title": "Onda → Petra Piana", "km": 7.7, "up": 955, "down": 583, "night": "refuge de Petra Piana, non gardé en hiver."},
        {"num": "J5", "title": "Petra Piana → Manganu", "km": 9.4, "up": 871, "down": 1128, "text": "Traversée du cœur granitique de l’île, dans le secteur des grands lacs.", "night": "refuge de Manganu, non gardé en hiver."},
        {"num": "J6", "title": "Manganu → Castel de Vergio", "km": 15.2, "up": 702, "down": 898, "text": "Descente vers le col de Vergio permettant de retrouver un hébergement accessible par la route.", "night": "hôtel/auberge à Castel de Vergio selon ouverture hivernale."},
        {"num": "J7", "title": "Castel de Vergio → Tighiettu, par Ciottulu di i Mori", "km": 16.7, "up": 1328, "down": 1093, "text": "Retour dans la haute montagne et traversée du secteur de la Paglia Orba.", "night": "refuge non gardé de Tighiettu."},
        {"num": "J8", "title": "Tighiettu → Haut-Asco", "km": 14.9, "up": 1977, "down": 2189, "text": "Dernière grande journée dans le massif du Cinto avant la descente vers Asco.", "nightLabel": "Fin du raid", "night": "hébergement accessible par la route à Haut-Asco."},
        ],
      },
    },
  },
  {
    id: "pyrenees-orientales",
    letter: "E",
    country: "Pyrénées orientales",
    massif: "Du Canigou à l’Ariège",
    line: {
      pitch: "Une traversée d’est en ouest des Pyrénées orientales, depuis les contreforts méditerranéens du Canigou jusqu’aux portes de l’Ariège. L’itinéraire traverse successivement le Canigou, les hauts plateaux du Pla Guillem, le secteur de Vallter, la Cerdagne puis les paysages granitiques du Carlit et des Bésines. Une véritable ligne à travers les Pyrénées catalanes, alternant refuges d’hiver et passages dans les vallées habitées.",
      info: [
        { label: "Pays", value: "France — Pyrénées orientales" },
        { label: "Massif", value: "Canigou, Pla Guillem, Cerdagne, Carlit et Bésines" },
        { label: "Départ", value: "Batère" },
        { label: "Arrivée", value: "L’Hospitalet-près-l’Andorre" },
        { label: "Forme du raid", value: "Traversée à ski en itinérance" },
        { label: "Hébergements", value: "Refuges d’hiver rustiques + refuge gardé lorsqu’il est ouvert + une nuit confortable en Cerdagne." },
        { label: "Durée", value: "6 jours de ski" },
        { label: "Distance", value: "environ 106 km" },
        { label: "D+", value: "environ 6 220 m" },
        { label: "Altitude maximale", value: "environ 2 850 m" },
      ],
      itinerary: {
        title: "6 jours. Du Canigou à l’Ariège.",
        days: [
        {"num": "J1", "title": "Batère → Cortalets", "km": 15.7, "up": 1470, "down": 710, "text": "Traversée des contreforts orientaux du Canigou vers son versant nord.", "alert": "Hébergement à confirmer : pour l’hiver 2026-2027, l’annexe hivernale des Cortalets est annoncée fermée en raison des travaux. La solution exacte devra être adaptée.", "night": "secteur des Cortalets."},
        {"num": "J2", "title": "Cortalets → Pla Guillem, par le Canigou", "km": 12.6, "up": 1210, "down": 1090, "peak": 2770, "text": "Grande traversée du massif du Canigou.", "night": "refuge non gardé de Pla Guillem, d’environ 20 places avec poêle à bois."},
        {"num": "J3", "title": "Pla Guillem → Ulldeter", "km": 16.5, "up": 720, "down": 780, "text": "Traversée des hauts plateaux puis passage de la frontière vers le haut bassin du Ter.", "night": "refuge d’Ulldeter, gardé avec restauration lorsqu’il est ouvert. Hors gardiennage, un petit local d’urgence est disponible."},
        {"num": "J4", "title": "Ulldeter → Cerdagne / Font-Romeu–Odeillo", "km": 25.8, "up": 970, "down": 1550, "peak": 2850, "text": "Longue traversée des crêtes frontalières puis descente en Cerdagne.", "night": "hôtel, gîte ou auberge en vallée."},
        {"num": "J5", "title": "Cerdagne → refuge des Bésines", "km": 28.7, "up": 1660, "down": 1230, "text": "Longue journée permettant de quitter les villages pour retrouver progressivement la haute montagne.", "night": "refuge d’hiver des Bésines, avec espace hiver : couchages, couvertures, eau, équipement de cuisson et chauffage."},
        {"num": "J6", "title": "Bésines → L’Hospitalet-près-l’Andorre", "km": 6.5, "up": 190, "down": 710, "text": "Dernière descente jusqu’à la vallée de l’Ariège.", "nightLabel": "Fin du raid", "night": "L’Hospitalet-près-l’Andorre, avec gare ferroviaire."},
        ],
      },
    },
  },
];
