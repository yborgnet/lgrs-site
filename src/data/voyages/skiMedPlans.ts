// Page Raid / Ski méditerranéen : les cinq plans d’un même départ (un seul voyage,
// destination définitive choisie selon la neige, la météo et la logistique).
// Ordre : A Maroc · B Bulgarie · C Turquie · D Corse · E Pyrénées orientales.
//
// Sources : Bulgarie = brief du 05/10/2026 (chiffres recoupés avec public/gpx/bulgarie-rila-pirin-2027.gpx :
// distances par segment identiques, D+/D− = sommes brutes des <ele>, J5 = segments 5 + 6) ; Corse, Pyrénées et
// Maroc Toubkal (GPX maroc-toubkal-2027, mêmes chiffres) = contenu de l’ancienne section « raids » (itinéraires indicatifs).
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
  photo?: { src: string; alt: string; position?: string; credit?: string };
  /** Photos complémentaires, affichées en grille sous la photo principale. */
  morePhotos?: { src: string; alt: string; position?: string; credit?: string }[];
  info: { label: string; value: string }[];
  /** GPX de référence (public/). La carte n’est rendue que si le fichier existe. */
  map?: {
    gpx: string;
    title: string;
    /** Repères d'étape (fins de segment du GPX) et libellés de massif (`region`). */
    markers?: { name: string; lat: number; lon: number; direction?: "left" | "right" | "top" | "bottom"; region?: boolean }[];
  };
  itinerary?: { title: string; intro?: string; days: PlanDay[]; note?: string };
  /** Message quand l’itinéraire n’est pas encore arrêté. */
  pending?: string;
  /** Affiche l’emplacement photo « à venir » même sans itinéraire arrêté. */
  photoPlaceholder?: boolean;
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
          pitch:
            "À l’est du Toubkal, le massif du M’Goun offre un autre visage du Haut Atlas. De longues crêtes dépassant 4 000 mètres, des combes d’altitude et des vallées profondément entaillées composent un terrain particulièrement intéressant pour le ski de randonnée. Depuis la vallée des Aït Bougmez, l’itinéraire peut s’organiser autour de plusieurs journées de traversée, entre villages de montagne, bergeries et hauts plateaux. Moins fréquenté que le Toubkal, le M’Goun se prête à un voyage exploratoire, où l’enneigement détermine les passages possibles et où les rencontres dans les villages occupent une place essentielle.",
          photo: {
            src: "/photos/Maroc/maroc-haut-atlas-toubkal-rencontre-habitants-village-montagne.jpg",
            alt: "Rencontre avec des habitants d’un village du Haut Atlas, Maroc",
            position: "center 35%",
          },
          info: [
            { label: "Pays", value: "Maroc" },
            { label: "Massif", value: "Haut Atlas central — M’Goun" },
            { label: "Sommet principal", value: "Ighil M’Goun, environ 4 071 m" },
            { label: "Accès envisagé", value: "vallée des Aït Bougmez (village d’accès : Agouti)" },
            { label: "Forme du raid", value: "Itinérance exploratoire dans le Haut Atlas central" },
            { label: "Hébergements", value: "Gîtes de village et, éventuellement, hébergements rustiques en altitude. Azibs, refuges et possibilités de bivouac à confirmer." },
            { label: "Période envisageable", value: "février à mars, éventuellement début avril selon l’enneigement" },
            { label: "Durée", value: "7 étapes sur la trace de travail" },
            { label: "Distance", value: "environ 115 km (trace brute)" },
            { label: "D+", value: "environ 10 500 m (somme brute, à recalculer)" },
            { label: "Altitude maximale", value: "environ 4 050 m" },
          ],
          map: {
            gpx: "/gpx/maroc-mgoun-2027.gpx",
            title: "Carte de la traversée du M’Goun, Haut Atlas central, Maroc",
            markers: [
              { name: "Départ", lat: 31.3814875, lon: -6.8940021, direction: "right" },
              { name: "Fin étape 1", lat: 31.3800165, lon: -6.8552718, direction: "right" },
              { name: "Fin étape 2", lat: 31.3907841, lon: -6.7911851, direction: "right" },
              { name: "Fin étape 3", lat: 31.4352311, lon: -6.6740301, direction: "right" },
              { name: "Fin étape 4", lat: 31.5309743, lon: -6.5155347, direction: "right" },
              { name: "Fin étape 5", lat: 31.5743505, lon: -6.4755232, direction: "right" },
              { name: "Fin étape 6", lat: 31.6681386, lon: -6.3642222, direction: "right" },
              { name: "Arrivée", lat: 31.7075075, lon: -6.3026383, direction: "right" },
            ],
          },
          itinerary: {
            title: "Une traversée du M’Goun en 7 étapes de travail.",
            note: "Découpage issu des segments de la trace de travail : noms des étapes, villages, azibs, refuges, bivouacs et hébergements restent à préciser et à confirmer avant publication. Distances et dénivelés bruts, non lissés. Une discontinuité d’environ 5 km sépare les étapes 3 et 4 sur la trace (liaison non skiée ou à reprendre) ; elle n’est pas comptée dans les distances.",
            days: [
        {"num": "J1", "title": "Étape 1", "km": 10.4, "up": 1169, "down": 1080, "peak": 2754},
        {"num": "J2", "title": "Étape 2", "km": 12.5, "up": 1135, "down": 1187, "peak": 2834},
        {"num": "J3", "title": "Étape 3", "km": 14.3, "up": 1597, "down": 1387, "peak": 3255},
        {"num": "J4", "title": "Étape 4", "km": 19.0, "up": 1631, "down": 981, "peak": 3594},
        {"num": "J5", "title": "Étape 5", "km": 18.6, "up": 1362, "down": 2023, "peak": 4054},
        {"num": "J6", "title": "Étape 6", "km": 17.6, "up": 1577, "down": 1857, "peak": 3504},
        {"num": "J7", "title": "Étape 7", "km": 22.8, "up": 2046, "down": 1895, "peak": 3740}
            ],
          },
        },
      },
      {
        id: "toubkal",
        label: "Toubkal",
        line: {
          pitch:
            "Au sud du Toubkal, les montagnes du Haut Atlas prennent une autre dimension. Loin des itinéraires les plus fréquentés, cette traversée relie les hautes vallées berbères, le lac d’Ifni et les grands cols du massif. Le ski devient un moyen de voyager d’un village à l’autre, de franchir les lignes de partage des eaux et de découvrir une montagne habitée. Les nuits se passent principalement dans de petits gîtes familiaux, avec une seule nuit en bivouac au cœur de la traversée. Une itinérance où la découverte des habitants et de leur territoire compte autant que les descentes à ski.",
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
          map: {
            gpx: "/gpx/maroc-toubkal-2027.gpx",
            title: "Carte de la traversée du Haut Atlas, Maroc",
            // Fins de segment du GPX, noms repris des titres d’étape.
            markers: [
              { name: "Amsouzart / Aït Igrane", lat: 30.9923, lon: -7.9048, direction: "left" },
              { name: "Lac d’Ifni", lat: 31.0191, lon: -7.866, direction: "left" },
              { name: "Azib Likemt", lat: 31.1071, lon: -7.7905, direction: "right" },
              { name: "Tacheddirt", lat: 31.1553, lon: -7.8415, direction: "left" },
              { name: "Timichi", lat: 31.1942, lon: -7.7685, direction: "right" },
              { name: "Oukaïmeden", lat: 31.2036, lon: -7.8611, direction: "left" },
            ],
          },
          itinerary: {
            title: "6 à 7 jours. Du lac d’Ifni à l’Oukaïmeden.",
            note: "Découpage de travail : les noms de villages et d’azibs restent à vérifier par rapport aux coordonnées exactes de la trace, et les points d’arrivée des étapes sont à confirmer.",
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
      photo: {
        src: "/images/Illustrations ski med/bulgarie-rila-ski-randonnee-gregory-rohart.jpg",
        alt: "Ski de randonnée dans le massif du Rila, Bulgarie.",
        credit: "Grégory Rohart",
      },
      pitch:
        "Skier dans les Balkans est un vieux rêve. Bien sûr pour le ski, mais aussi pour l’ambiance de ces anciens pays du bloc de l’Est. J’ai imaginé ce voyage comme une itinérance en deux temps, à travers les massifs du Rila et du Pirin, au sud de Sofia : le Rila et ses vastes paysages de lacs et de hauts plateaux, puis le Pirin, plus minéral et alpin, avec ses sommets et ses arêtes calcaires. Nous dormirons dans des refuges de montagne, parfois au confort spartiate, des cabanes non gardées et des hébergements locaux. Entre les deux traversées, une halte en vallée permettra de découvrir une autre facette de la Bulgarie.",
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
      map: {
        gpx: "/gpx/bulgarie-rila-pirin-2027.gpx",
        title: "Carte de la traversée Rila et Pirin, Bulgarie",
        // Fins de segment du GPX (J1→J7) ; transfert routier Rila → Pirin tracé en pointillé par la carte.
        markers: [
          { name: "RILA", lat: 42.275, lon: 23.4, region: true },
          { name: "PIRIN", lat: 41.625, lon: 23.45, region: true },
          { name: "Seven Rila Lakes", lat: 42.2193036, lon: 23.3216414, direction: "left" },
          { name: "Malyovitsa", lat: 42.1886, lon: 23.3747, direction: "right" },
          { name: "Monastère de Rila", lat: 42.1338, lon: 23.3402, direction: "left" },
          { name: "Ribni Ezera", lat: 42.1113, lon: 23.4932, direction: "right" },
          { name: "Semkovo", lat: 42.0469, lon: 23.5306, direction: "right" },
          { name: "Spano Pole", lat: 41.7112, lon: 23.4016, direction: "left" },
          { name: "Tevno Ezero", lat: 41.6981, lon: 23.482, direction: "bottom" },
          { name: "Gotse Delchev", lat: 41.7593, lon: 23.5466, direction: "right" },
        ],
      },
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
      photo: {
        src: "/images/Illustrations ski med/monte-cinto-corse-panorama-mer-alpine-line-ski-randonnee.webp",
        alt: "Panorama des montagnes enneigées du Monte Cinto, avec la mer à l’horizon, pendant l’Alpine Line en Corse.",
      },
      morePhotos: [
        { src: "/images/Illustrations ski med/monte-cinto-corse-ascension-ski-randonnee-alpine-line.webp", alt: "Skieur sur une crête enneigée pendant l’ascension du Monte Cinto à ski de randonnée, lors de l’Alpine Line en Corse." },
        { src: "/images/Illustrations ski med/monte-cinto-corse-aretes-enneigees-alpine-line.webp", alt: "Arêtes rocheuses et reliefs enneigés pendant l’ascension du Monte Cinto à ski de randonnée, en Corse." },
      ],
      pitch: "Une grande traversée hivernale de la montagne corse, du sud vers le nord, suivant l’épine dorsale de l’île. Une itinérance sauvage où alternent hauts plateaux, lacs gelés, forêts de pins laricio et grands reliefs granitiques. En hiver, la montagne retrouve une solitude presque totale. Une partie des nuits se passe dans les refuges du GR20, non gardés à cette période, entrecoupée de nuits plus confortables dans les auberges accessibles par les vallées. Une traversée exigeante, à la découverte d’une montagne insulaire au caractère unique.",
      info: [
        { label: "Pays", value: "France — Corse" },
        { label: "Massif", value: "Alta Strada, du Renoso au Cinto" },
        { label: "Départ", value: "Val d’Ese" },
        { label: "Arrivée", value: "Haut-Asco" },
        { label: "Forme du raid", value: "Traversée à ski en itinérance" },
        { label: "Hébergements", value: "Refuges non gardés du GR20 en altitude et auberges lors des passages en vallée (ouverture hivernale à vérifier)." },
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
      photo: {
        src: "/images/Illustrations ski med/canigou-madres-pin-isole-pyrenees-enneigees.webp",
        alt: "Pin isolé et montagnes enneigées du Canigou et du Madres, Pyrénées orientales.",
      },
      pitch: "Ce raid à ski est le premier segment d’un projet de traversée intégrale des Pyrénées, de la Méditerranée à l’Atlantique, au plus près de la ligne de partage des eaux, à raison d’un tronçon par hiver et sur plusieurs années. Ce premier volet relie les versants catalans du Canigou aux hautes vallées enneigées de la Cerdagne et de l’Ariège, marquant la transition entre mer et montagnes intérieures. Le parcours alterne ski de montagne, immersion culturelle et observation des paysages : forêts méditerranéennes, vastes plateaux d’altitude, crêtes frontalières, lacs gelés et refuges isolés.",
      info: [
        { label: "Pays", value: "France — Pyrénées orientales" },
        { label: "Massif", value: "Canigou, Pla Guillem, Cerdagne, Carlit et Bésines" },
        { label: "Départ", value: "Batère" },
        { label: "Arrivée", value: "L’Hospitalet-près-l’Andorre" },
        { label: "Forme du raid", value: "Traversée à ski en itinérance — premier segment de la traversée intégrale des Pyrénées" },
        { label: "Niveau", value: "skieurs de randonnée ayant déjà une expérience de l’itinérance ; pentes généralement de 30 à 35°, passages à 40° possibles" },
        { label: "Hébergements", value: "Refuges gardés ou non gardés selon les étapes et leur ouverture, hôtels ou gîtes en vallée." },
        { label: "Durée", value: "6 jours de ski" },
        { label: "Distance", value: "environ 106 km" },
        { label: "D+", value: "environ 6 220 m" },
        { label: "Altitude maximale", value: "environ 2 850 m" },
      ],
      map: {
        gpx: "/gpx/pyrenees-orientales-transpyr-2027.gpx",
        title: "Carte de la traversée du Canigou à l’Ariège, Pyrénées orientales",
        // Fins de segment du GPX (J1→J6).
        markers: [
          { name: "Batère", lat: 42.5016, lon: 2.5563, direction: "right" },
          { name: "Cortalets", lat: 42.5342, lon: 2.4653, direction: "top" },
          { name: "Pla Guillem", lat: 42.476, lon: 2.4126, direction: "right" },
          { name: "Ulldeter", lat: 42.419, lon: 2.2584, direction: "bottom" },
          { name: "Font-Romeu", lat: 42.5, lon: 2.0358, direction: "bottom" },
          { name: "Bésines", lat: 42.6032, lon: 1.8674, direction: "top" },
          { name: "L’Hospitalet-près-l’Andorre", lat: 42.5879, lon: 1.8035, direction: "left" },
        ],
      },
      itinerary: {
        title: "6 jours. Du Canigou à l’Ariège.",
        note: "Les prochains segments de la traversée intégrale (Cerdagne, Encantats, Maladeta, Ossau, Pays basque) sont à l’état de notes de préparation : aucun n’est arrêté.",
        days: [
        {"num": "J0", "title": "Arrivée à Arles-sur-Tech", "text": "Rendez-vous dans le Vallespir, au pied du Canigou, et préparation du matériel.", "night": "hôtel ou gîte à Arles-sur-Tech."},
        {"num": "J1", "title": "Batère → Cortalets", "km": 15.7, "up": 1470, "down": 710, "text": "Transfert jusqu’au refuge de Batère, puis montée par le col de la Cirera et traversée du Ras de Prat Cabrera : forêts, pentes du Canigou et vues sur la Méditerranée.", "alert": "Hébergement à confirmer : pour l’hiver 2026-2027, l’annexe hivernale des Cortalets est annoncée fermée en raison des travaux. La solution exacte devra être adaptée.", "night": "secteur des Cortalets."},
        {"num": "J2", "title": "Cortalets → Pla Guillem, par le Canigou", "km": 12.6, "up": 1210, "down": 1090, "peak": 2770, "text": "Pic Joffre, Canigou (2 784 m), refuge Arago et Puig Roja : la grande traversée du massif.", "night": "refuge non gardé de Pla Guillem, d’environ 20 places avec poêle à bois."},
        {"num": "J3", "title": "Pla Guillem → Ulldeter", "km": 16.5, "up": 720, "down": 780, "text": "Roca Colom, Portella de Mantet, puis descente vers la Catalogne espagnole. Ascension du Costabona possible selon les conditions.", "night": "refuge d’Ulldeter, gardé avec restauration lorsqu’il est ouvert. Hors gardiennage, un petit local d’urgence est disponible."},
        {"num": "J4", "title": "Ulldeter → Cerdagne / Font-Romeu–Odeillo", "km": 25.8, "up": 970, "down": 1550, "peak": 2850, "text": "Crêtes frontalières par les Pics de la Vaca et le secteur du Pic de les Nou Fonts, puis descente par le vallon d’Eyne vers la Cerdagne.", "night": "hôtel, gîte ou auberge en vallée."},
        {"num": "J5", "title": "Cerdagne → refuge des Bésines", "km": 28.7, "up": 1660, "down": 1230, "text": "Hauts plateaux du Capcir par les Bouillouses, puis passage au Coll de Coma d’Anyell : grande étape de haute montagne entre Cerdagne et Ariège.", "night": "refuge d’hiver des Bésines, avec espace hiver : couchages, couvertures, eau, équipement de cuisson et chauffage."},
        {"num": "J6", "title": "Bésines → L’Hospitalet-près-l’Andorre", "km": 6.5, "up": 190, "down": 710, "text": "Dernière descente jusqu’à la vallée de l’Ariège.", "nightLabel": "Fin du raid", "night": "L’Hospitalet-près-l’Andorre, avec gare ferroviaire."},
        ],
      },
    },
  },
];
