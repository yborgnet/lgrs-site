// Contenu de la section « raids possibles » de la page Raid à ski méditerranéen.
// Source : brief éditorial — itinéraires indicatifs, aucune ouverture hivernale garantie.
// Photos volontairement absentes : à ajouter plus tard via `photo`.

export type MediterraneenRaidDay = {
  /** « J1 », « J2 »… */
  num: string;
  /** Nom de l'étape, ex. « Azib Likemt → Tacheddirt » — élément le plus visible. */
  title: string;
  /** Ex. « 10 km · +1 170 m / −1 410 m » — volontairement discret. */
  stats?: string;
  text?: string;
  /** Point d'attention affiché sous l'étape (ex. hébergement à confirmer). */
  alert?: string;
  /** Libellé devant l'hébergement, « Nuit » par défaut. */
  nightLabel?: string;
  night: string;
  /** Titre de partie affiché avant cette étape (ex. massif du Rila). */
  part?: string;
  /** Ligne de liaison affichée après cette étape. */
  link?: string;
};

export type MediterraneenRaid = {
  id: string;
  country: string;
  name: string;
  intro: string;
  /** Ligne synthétique : jours · distance · dénivelé · itinérance. */
  keyline: string;
  /** Informations complémentaires (point culminant, hébergement). */
  keyExtra: string[];
  axis: string;
  days: MediterraneenRaidDay[];
  lodgingLabel: string;
  lodging: string;
  photo?: { src: string; alt: string };
};

export const raidsSection = {
  eyebrow: "Les raids",
  title: "Traverser les montagnes du Sud",
  intro:
    "Traverser à ski les montagnes du Sud, loin des grands raids alpins classiques, avec autant d’importance donnée au voyage, aux villages, aux refuges et aux rencontres qu’au ski. De vraies itinérances, généralement de 6 à 9 jours, et non des séjours en étoile.",
  disclaimer:
    "Itinéraire indicatif. Le déroulement des étapes peut évoluer selon l’enneigement, les conditions nivologiques et météorologiques et l’ouverture des hébergements.",
};

export const mediterraneenRaids: MediterraneenRaid[] = [
  {
    id: "corse",
    country: "🇫🇷 Corse",
    name: "Alta Strada — la haute route corse à ski",
    intro:
      "Une grande traversée hivernale de la montagne corse, du sud vers le nord, suivant l’épine dorsale de l’île. Une itinérance sauvage où alternent hauts plateaux, lacs gelés, forêts de pins laricio et grands reliefs granitiques. En hiver, la montagne retrouve une solitude presque totale : une partie des nuits se passe dans les refuges du GR20 devenus refuges non gardés, entrecoupée de nuits plus confortables dans les rares auberges accessibles par les vallées.",
    keyline: "8 jours de ski · 105 km · +9 820 m / −10 020 m environ",
    keyExtra: ["Itinérance refuge / auberge / refuge non gardé"],
    axis: "Val d’Ese → Capannelle → Vizzavona → Onda → Petra Piana → Manganu → Castel de Vergio → Ciottulu / Tighiettu → Haut-Asco",
    days: [
      {
        num: "J1",
        title: "Val d’Ese → Capannelle",
        stats: "14,2 km · +1 394 m / −1 332 m",
        text: "Traversée depuis le plateau d’Ese vers le massif du Renoso et Capannelle.",
        night: "gîte/auberge ou hébergement de montagne dans le secteur de Capannelle selon ouverture.",
      },
      {
        num: "J2",
        title: "Capannelle → Vizzavona",
        stats: "14,3 km · +1 073 m / −1 789 m",
        text: "Traversée vers le col de Vizzavona et retour temporaire dans une vallée habitée.",
        night: "hôtel, gîte ou auberge à Vizzavona.",
      },
      {
        num: "J3",
        title: "Vizzavona → refuge de l’Onda",
        stats: "12,5 km · +1 522 m / −1 007 m",
        text: "Retour immédiat en haute montagne et entrée dans la partie centrale de l’Alta Strada.",
        night: "refuge de l’Onda, non gardé en hiver.",
      },
      {
        num: "J4",
        title: "Onda → Petra Piana",
        stats: "7,7 km · +955 m / −583 m",
        night: "refuge de Petra Piana, non gardé en hiver.",
      },
      {
        num: "J5",
        title: "Petra Piana → Manganu",
        stats: "9,4 km · +871 m / −1 128 m",
        text: "Traversée du cœur granitique de l’île, dans le secteur des grands lacs.",
        night: "refuge de Manganu, non gardé en hiver.",
      },
      {
        num: "J6",
        title: "Manganu → Castel de Vergio",
        stats: "15,2 km · +702 m / −898 m",
        text: "Descente vers le col de Vergio permettant de retrouver un hébergement accessible par la route.",
        night: "hôtel/auberge à Castel de Vergio selon ouverture hivernale.",
      },
      {
        num: "J7",
        title: "Castel de Vergio → Tighiettu, par Ciottulu di i Mori",
        stats: "16,7 km · +1 328 m / −1 093 m",
        text: "Retour dans la haute montagne et traversée du secteur de la Paglia Orba.",
        night: "refuge non gardé de Tighiettu.",
      },
      {
        num: "J8",
        title: "Tighiettu → Haut-Asco",
        stats: "14,9 km · +1 977 m / −2 189 m",
        text: "Dernière grande journée dans le massif du Cinto avant la descente vers Asco.",
        nightLabel: "Fin du raid",
        night: "hébergement accessible par la route à Haut-Asco.",
      },
    ],
    lodgingLabel: "Hébergements",
    lodging: "Refuges non gardés en altitude + auberges/hôtels lors des passages en vallée.",
  },
  {
    id: "pyrenees",
    country: "🇫🇷 Pyrénées",
    name: "Du Canigou à l’Ariège",
    intro:
      "Une traversée d’est en ouest des Pyrénées orientales, depuis les contreforts méditerranéens du Canigou jusqu’aux portes de l’Ariège. L’itinéraire traverse successivement le Canigou, les hauts plateaux du Pla Guillem, le secteur de Vallter, la Cerdagne puis les paysages granitiques du Carlit et des Bésines. Une véritable ligne à travers les Pyrénées catalanes, alternant refuges d’hiver et passages dans les vallées habitées.",
    keyline: "6 jours de ski · 106 km environ · +6 220 m environ",
    keyExtra: [
      "Point culminant : environ 2 850 m",
      "Refuges d’hiver / refuge gardé selon ouverture / hébergement en vallée",
    ],
    axis: "Batère → Cortalets → Pla Guillem → Ulldeter → Font-Romeu / Odeillo → Bésines → L’Hospitalet-près-l’Andorre",
    days: [
      {
        num: "J1",
        title: "Batère → Cortalets",
        stats: "15,7 km · +1 470 m / −710 m",
        text: "Traversée des contreforts orientaux du Canigou vers son versant nord.",
        night: "secteur des Cortalets.",
        alert:
          "Hébergement à confirmer : pour l’hiver 2026-2027, l’annexe hivernale des Cortalets est annoncée fermée en raison des travaux. La solution exacte devra être adaptée.",
      },
      {
        num: "J2",
        title: "Cortalets → Pla Guillem, par le Canigou",
        stats: "12,6 km · +1 210 m / −1 090 m · point haut environ 2 770 m",
        text: "Grande traversée du massif du Canigou.",
        night: "refuge non gardé de Pla Guillem, d’environ 20 places avec poêle à bois.",
      },
      {
        num: "J3",
        title: "Pla Guillem → Ulldeter",
        stats: "16,5 km · +720 m / −780 m",
        text: "Traversée des hauts plateaux puis passage de la frontière vers le haut bassin du Ter.",
        night: "refuge d’Ulldeter, gardé avec restauration lorsqu’il est ouvert. Hors gardiennage, un petit local d’urgence est disponible.",
      },
      {
        num: "J4",
        title: "Ulldeter → Cerdagne / Font-Romeu–Odeillo",
        stats: "25,8 km · +970 m / −1 550 m · point haut environ 2 850 m",
        text: "Longue traversée des crêtes frontalières puis descente en Cerdagne.",
        night: "hôtel, gîte ou auberge en vallée.",
      },
      {
        num: "J5",
        title: "Cerdagne → refuge des Bésines",
        stats: "28,7 km · +1 660 m / −1 230 m",
        text: "Longue journée permettant de quitter les villages pour retrouver progressivement la haute montagne.",
        night: "refuge d’hiver des Bésines, avec espace hiver : couchages, couvertures, eau, équipement de cuisson et chauffage.",
      },
      {
        num: "J6",
        title: "Bésines → L’Hospitalet-près-l’Andorre",
        stats: "6,5 km · +190 m / −710 m",
        text: "Dernière descente jusqu’à la vallée de l’Ariège.",
        nightLabel: "Fin du raid",
        night: "L’Hospitalet-près-l’Andorre, avec gare ferroviaire.",
      },
    ],
    lodgingLabel: "Hébergements",
    lodging: "Refuges d’hiver rustiques + refuge gardé lorsqu’il est ouvert + une nuit confortable en Cerdagne.",
  },
  {
    id: "maroc",
    country: "🇲🇦 Maroc",
    name: "Le Haut Atlas du sud au nord",
    intro:
      "Une traversée originale du Haut Atlas qui évite volontairement l’itinéraire classique du Toubkal. Depuis les vallées du versant sud, la route rejoint le lac d’Ifni puis franchit successivement les hautes vallées et les grands cols du massif pour gagner Azib Likemt, Tacheddirt, Timichi et enfin Oukaïmeden. Le voyage associe haute montagne, villages berbères, gîtes familiaux et une seule nuit en bivouac. Ici, le ski est autant un moyen de traverser un territoire qu’une finalité.",
    keyline: "6 à 7 jours de ski · environ 63 km · environ +8 100 m",
    keyExtra: [
      "Point haut : environ 3 980 m",
      "Gîtes chez l’habitant / guesthouses / 1 bivouac",
    ],
    axis: "Amsouzart / Aït Igrane → lac d’Ifni → haute vallée / azibs → Azib Likemt → Tacheddirt → Timichi → Oukaïmeden",
    days: [
      {
        num: "J1",
        title: "Amsouzart / Aït Igrane → lac d’Ifni",
        stats: "5,6 km · +1 025 m / −1 025 m",
        text: "Entrée dans le massif par son versant sud et montée vers le lac d’Ifni.",
        night: "hébergement local / organisation selon conditions.",
      },
      {
        num: "J2",
        title: "Lac d’Ifni → haute vallée / azibs",
        stats: "10,1 km · +1 380 m / −1 345 m",
        text: "Premier grand franchissement vers le nord.",
        night: "bivouac — la seule nuit de bivouac de tout le raid.",
      },
      {
        num: "J3",
        title: "Haute vallée → Azib Likemt",
        stats: "14,4 km · +2 090 m / −1 520 m · point haut environ 3 976 m",
        text: "Une courte liaison intermédiaire d’environ 2 km, puis une grande traversée.",
        night: "hébergement rustique / azib ou solution locale organisée.",
      },
      {
        num: "J4",
        title: "Azib Likemt → Tacheddirt",
        stats: "environ 10 km · +1 170 m / −1 410 m",
        text: "Franchissement d’un haut col puis descente vers l’un des plus hauts villages du massif.",
        night: "gîte chez l’habitant à Tacheddirt.",
      },
      {
        num: "J5",
        title: "Tacheddirt → Timichi",
        stats: "9,2 km · +880 m / −1 320 m",
        text: "Nouvelle traversée de vallée à vallée par un col d’altitude.",
        night: "gîte / guesthouse chez l’habitant à Timichi.",
      },
      {
        num: "J6",
        title: "Timichi → Oukaïmeden",
        stats: "11,5 km · +1 460 m / −800 m",
        text: "Dernier franchissement avant de rejoindre le plateau d’Oukaïmeden.",
        nightLabel: "Fin du raid",
        night: "ou nuit en gîte / auberge / guesthouse à Oukaïmeden.",
      },
    ],
    lodgingLabel: "Hébergements",
    lodging:
      "Une seule nuit en bivouac, puis essentiellement des gîtes familiaux, guesthouses et hébergements chez l’habitant dans les villages du Haut Atlas.",
  },
  {
    id: "bulgarie",
    country: "🇧🇬 Bulgarie",
    name: "Rila & Pirin — la grande traversée des montagnes bulgares",
    intro:
      "Une traversée des deux grands massifs de Bulgarie. D’abord le Rila, entre les Sept Lacs, Malyovitsa, le monastère de Rila et les grands refuges d’altitude ; puis, après une courte liaison, le Pirin, plus minéral et alpin, dominé par le Vihren et ses grandes arêtes calcaires. Un voyage étonnamment adapté à l’itinérance hivernale grâce au réseau historique de refuges bulgares, alternant refuges gardés, abris plus rustiques et nuits en village.",
    keyline: "9 jours de ski dans la version complète · environ 107 km · environ +10 465 m / −10 695 m",
    keyExtra: [
      "Point culminant : Vihren, environ 2 914 m",
      "Refuges / shelters / guesthouses",
      "Deux massifs séparés par une courte liaison routière",
    ],
    axis: "Rila : Sept Lacs → Malyovitsa → monastère de Rila → Ribni Ezera → Macedonia → Dobarsko · Pirin : Yavorov → Vihren → Spano Pole → Tevno Ezero → Gotse Delchev",
    days: [
      {
        num: "J1",
        part: "Rila",
        title: "Panichishte / Sept Lacs → Malyovitsa",
        stats: "13,4 km · +1 630 m / −1 225 m",
        night: "refuge Malyovitsa, ouvert toute l’année, avec chambres/dortoirs, sanitaires et restauration chaude.",
      },
      {
        num: "J2",
        title: "Malyovitsa → monastère de Rila",
        stats: "8,7 km · +815 m / −1 670 m",
        text: "Grande descente vers le monastère.",
        night: "guesthouse/hôtel dans le secteur du monastère de Rila.",
      },
      {
        num: "J3",
        title: "Monastère de Rila → Ribni Ezera",
        stats: "15,7 km · +1 210 m / −120 m",
        text: "Longue remontée vers le refuge des Lacs aux Poissons.",
        night: "refuge Ribni Ezera. Statut précis de l’ouverture hivernale à confirmer lors de la préparation du voyage.",
      },
      {
        num: "J4",
        title: "Ribni Ezera → Macedonia",
        stats: "8,9 km · +920 m / −990 m",
        night: "refuge Macedonia. Statut précis en hiver à vérifier lors de la réservation.",
      },
      {
        num: "J5",
        title: "Macedonia → Dobarsko",
        stats: "11,5 km · +510 m / −1 610 m",
        text: "Grande descente jusqu’au village.",
        night: "guesthouse à Dobarsko.",
        link: "Puis courte liaison routière vers le pied du Pirin.",
      },
      {
        num: "J6",
        part: "Pirin",
        title: "Razlog / Betolovoto → Yavorov → haute chaîne",
        stats: "11,8 km · +1 890 m / −280 m",
        text: "Montée vers Yavorov puis la haute chaîne du Pirin.",
        night: "organisation à confirmer / adaptation de l’étape.",
      },
      {
        num: "J7",
        title: "Haute chaîne → Vihren → Spano Pole",
        stats: "11,1 km · +1 040 m / −1 750 m · point haut environ 2 900 m",
        text: "Cœur alpin du voyage dans les grands reliefs calcaires du Pirin, secteur du Vihren.",
        night: "Spano Pole, qui fonctionne plutôt en autonomie qu’en refuge gardé classique en hiver.",
      },
      {
        num: "J8",
        title: "Spano Pole → Tevno Ezero",
        stats: "9,1 km · +1 210 m / −750 m",
        text: "Traversée intérieure du Pirin.",
        night: "abri de Tevno Ezero, vers 2 527 m, pouvant accueillir des randonneurs en hiver sur accord préalable.",
      },
      {
        num: "J9",
        title: "Tevno Ezero → Gotse Delchev",
        stats: "16,5 km · +1 240 m / −2 300 m",
        text: "Grande dernière traversée puis longue descente jusqu’au secteur de Gotse Delchev.",
        nightLabel: "Fin du raid",
        night: "ou dernière nuit en refuge/guesthouse selon la logistique.",
      },
    ],
    lodgingLabel: "Hébergements",
    lodging:
      "Un réseau de refuges de montagne, parfois gardés et restaurés, parfois autonomes en hiver, complété par des guesthouses lors des passages dans les villages.",
  },
];
