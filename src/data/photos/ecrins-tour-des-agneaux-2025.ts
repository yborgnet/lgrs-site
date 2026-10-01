/**
 * Métadonnées éditoriales des 42 photos du Tour des Agneaux (27 février –
 * 1er mars 2025), dérivées de public/photos/Agneaux 2025/manifest-seo-tour-des-agneaux.csv
 * (date de prise de vue, confiance du recoupement avec la trace GPX).
 *
 * `jour` : journée du carnet d'après la date de prise de vue (J1 = 27 février,
 * J2 = 28 février, J3 = 1er mars) ; toutes les dates du manifeste tombent dans
 * ces trois jours. ALT et légendes rédigés d'après le contenu visible des
 * images ; aucun sommet ni passage n'est nommé sans certitude. Seuls sont
 * nommés : le refuge du Glacier Blanc (DSC07489, photo prise à l'emplacement
 * du début de la J2 sur la trace, bâtiment en pierre), l'Alpe de Villar-d'Arêne
 * (DSC07822, à ~300 m de l'arrivée de la J2 sur la trace) et un passage « au
 * point haut de la journée » (DSC07631, 3 511 m = point haut de la J2).
 * Les légendes vides ne s'affichent pas.
 *
 * width/height : dimensions réelles des JPEG.
 */
export type AgneauxPhotoMeta = {
  jour: "J1" | "J2" | "J3";
  alt: string;
  legende: string;
  width: number;
  height: number;
  /** Date de prise de vue (manifeste) et qualité du recoupement avec la trace. */
  capture: string;
  confiance: string;
};

export const agneaux2025Photos: Record<string, AgneauxPhotoMeta> = {
  "tour-des-agneaux-ecrins-ski-alpinisme-20250227_120348.jpg": { jour: "J1", alt: "Deux skieurs de randonnée en montée sur une pente enneigée, premier jour du Tour des Agneaux (Écrins)", legende: "Montée du premier jour", width: 2400, height: 3200, capture: "2025-02-27T12:03:48+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-20250228_133803.jpg": { jour: "J2", alt: "Sommet rocheux aux arêtes déchiquetées, couvert de neige, vu pendant le Tour des Agneaux (Écrins)", legende: "", width: 2400, height: 3200, capture: "2025-02-28T13:38:03+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-20250228_143151.jpg": { jour: "J2", alt: "Grande face rocheuse striée de neige sous un ciel clair, vue depuis la descente du deuxième jour du Tour des Agneaux (Écrins)", legende: "", width: 2400, height: 3200, capture: "2025-02-28T14:31:51+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07360.jpg": { jour: "J1", alt: "Skieur de randonnée en montée sur une crête enneigée, au premier jour du Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T11:52:39.7+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07372.jpg": { jour: "J1", alt: "Skieur de randonnée sur une crête enneigée, devant un sommet rocheux sous un ciel bleu, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T11:55:00+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07382.jpg": { jour: "J1", alt: "Deux skieurs de randonnée en montée sur un large glacier enneigé, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T12:55:26.7+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07391.jpg": { jour: "J1", alt: "Deux skieurs de randonnée remontant un glacier, avec un vallon enneigé en contrebas, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T12:58:15.78+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07415.jpg": { jour: "J1", alt: "Skieur skis sur le sac, en progression sur une crête enneigée au-dessus d'un vallon glaciaire, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T17:09:52.085+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07420.jpg": { jour: "J1", alt: "Panorama sur un massif de sommets rocheux et glaciaires en fin de journée, Tour des Agneaux (Écrins)", legende: "Fin de premier jour sur les crêtes", width: 1616, height: 1080, capture: "2025-02-27T17:15:02.636+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07425.jpg": { jour: "J1", alt: "Skieur à pied au pied d'une aiguille rocheuse ocre sur une arête enneigée, Tour des Agneaux (Écrins)", legende: "", width: 1080, height: 1616, capture: "2025-02-27T17:17:28.345+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07434.jpg": { jour: "J1", alt: "Skieurs franchissant un passage entre des rochers, une aiguille rocheuse en arrière-plan, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T17:20:01+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07449.jpg": { jour: "J1", alt: "Skieur descendant un étroit passage rocheux enneigé, skis aux pieds, Tour des Agneaux (Écrins)", legende: "", width: 1080, height: 1616, capture: "2025-02-27T17:25:23.345+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07473.jpg": { jour: "J1", alt: "Skieur descendant une pente de neige poudreuse devant un massif de sommets glaciaires, Tour des Agneaux (Écrins)", legende: "Descente en fin de premier jour", width: 1616, height: 1080, capture: "2025-02-27T17:30:47.063+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07477.jpg": { jour: "J1", alt: "Skieur isolé dans une pente de neige, face à une chaîne de sommets rocheux éclairés par le soleil, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-27T17:30:48.363+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07489.jpg": { jour: "J2", alt: "Skieurs devant un grand refuge en pierre, avec un sommet glaciaire en arrière-plan, Tour des Agneaux (Écrins)", legende: "Le refuge du Glacier Blanc", width: 1616, height: 1080, capture: "2025-02-28T08:26:15.982+01:00", confiance: "low" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07515.jpg": { jour: "J2", alt: "Deux skieurs de randonnée sur un vaste glacier enneigé, dominé par un massif rocheux, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T08:52:04.961+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07538.jpg": { jour: "J2", alt: "Skieurs de randonnée sur un plateau glaciaire, face à des sommets enneigés sous un ciel bleu profond, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T10:16:34.26+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07574.jpg": { jour: "J2", alt: "Deux skieurs de randonnée en montée sur un glacier, avec une vallée visible au loin, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T11:22:02.72+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07597.jpg": { jour: "J2", alt: "Skieuse en montée sur un glacier face à une crête rocheuse, un autre skieur plus haut, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T11:33:23+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07606.jpg": { jour: "J2", alt: "Deux skieurs de randonnée en montée sur une pente enneigée, avec une vallée en arrière-plan, Tour des Agneaux (Écrins)", legende: "", width: 1080, height: 1616, capture: "2025-02-28T12:31:52.12+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07631.jpg": { jour: "J2", alt: "Skieur skis sur le sac en train de franchir un passage rocheux, au point haut de la deuxième journée du Tour des Agneaux (Écrins)", legende: "Passage rocheux au point haut de la journée", width: 1616, height: 1080, capture: "2025-02-28T12:42:45.901+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07679.jpg": { jour: "J2", alt: "Skieur en descente sur une pente de neige, une crête rocheuse sur la droite, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T13:23:07.221+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07686.jpg": { jour: "J2", alt: "Skieur descendant une grande pente de neige face à un massif de sommets rocheux, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T13:23:09.68+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07707.jpg": { jour: "J2", alt: "Deux skieurs descendant un vaste vallon glaciaire face à une chaîne de sommets, Tour des Agneaux (Écrins)", legende: "Descente dans un vallon glaciaire", width: 1616, height: 1080, capture: "2025-02-28T13:26:12.321+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07712.jpg": { jour: "J2", alt: "Skieur en descente sur une pente enneigée, au loin une crête rocheuse, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T13:29:51.041+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07734.jpg": { jour: "J2", alt: "Skieur dans un nuage de poudreuse sur une pente raide, face à une paroi rocheuse, Tour des Agneaux (Écrins)", legende: "", width: 1273, height: 888, capture: "2025-02-28T13:30:27.801+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07737.jpg": { jour: "J2", alt: "Skieur en descente dans la poudreuse devant une grande face rocheuse enneigée, Tour des Agneaux (Écrins)", legende: "", width: 1311, height: 827, capture: "2025-02-28T13:30:28.621+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07750.jpg": { jour: "J2", alt: "Skieur en descente sur une longue pente de neige, ombre portée sur le manteau neigeux, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T13:31:51.062+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07790.jpg": { jour: "J2", alt: "Skieur en descente sur une pente, face à une grande paroi rocheuse enneigée, Tour des Agneaux (Écrins)", legende: "", width: 1275, height: 808, capture: "2025-02-28T13:32:27.062+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07795.jpg": { jour: "J2", alt: "Skieur en descente près d'une barre rocheuse, ciel bleu, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-02-28T13:38:56.602+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07804.jpg": { jour: "J2", alt: "Skieur isolé en contrebas d'une grande paroi enneigée, au fond d'un vallon des Écrins, Tour des Agneaux", legende: "Dans les Écrins, au fond du vallon", width: 1616, height: 1080, capture: "2025-02-28T14:14:13.702+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07822.jpg": { jour: "J2", alt: "Skieur devant un chalet de montagne et une petite cabane, près de l'Alpe de Villar-d'Arêne (Tour des Agneaux, Écrins)", legende: "Arrivée à l'Alpe de Villar-d'Arêne", width: 1616, height: 1080, capture: "2025-02-28T15:04:00+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07831.jpg": { jour: "J2", alt: "Trois personnes attablées dans un refuge, éclairées par la lumière rouge de frontales, Tour des Agneaux (Écrins)", legende: "Soirée au refuge", width: 1616, height: 1080, capture: "2025-02-28T18:15:41.403+01:00", confiance: "low" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07851.jpg": { jour: "J3", alt: "Sommets enneigés éclairés par les premières lueurs orangées du matin, sous un ciel bleu strié de nuages, Tour des Agneaux (Écrins)", legende: "Premières lueurs du troisième jour", width: 1616, height: 1080, capture: "2025-03-01T06:58:09.612+01:00", confiance: "medium" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07855.jpg": { jour: "J3", alt: "Crêtes enneigées éclairées par la lumière du matin, sous un ciel strié de nuages, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-03-01T07:02:09.428+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07863.jpg": { jour: "J3", alt: "Deux skieurs au loin sur un grand plateau enneigé, au pied de sommets glaciaires, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-03-01T07:56:15.401+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07882.jpg": { jour: "J3", alt: "Skieurs sur une crête enneigée, devant une aiguille rocheuse dans la brume, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-03-01T11:25:31.081+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07893.jpg": { jour: "J3", alt: "Skieuse descendant à pied un passage rocheux enneigé, skis en main, dans la brume, Tour des Agneaux (Écrins)", legende: "", width: 1080, height: 1616, capture: "2025-03-01T12:50:34.341+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07904.jpg": { jour: "J3", alt: "Skieur franchissant un passage rocheux raide, skis aux pieds, dans la brume, Tour des Agneaux (Écrins)", legende: "", width: 1080, height: 1616, capture: "2025-03-01T13:05:54.217+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07909.jpg": { jour: "J3", alt: "Skieuse assise dans une pente raide, skis sur la neige, au pied d'une barre rocheuse dans la brume, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-03-01T13:26:49.361+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07917.jpg": { jour: "J3", alt: "Skieur dans un couloir raide enneigé, un second skieur plus bas, dans la brume, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-03-01T13:32:19.942+01:00", confiance: "high" },
  "tour-des-agneaux-ecrins-ski-alpinisme-dsc07960.jpg": { jour: "J3", alt: "Skieur dans un couloir enneigé étroit bordé de rochers, un autre skieur plus bas, dans la brume, Tour des Agneaux (Écrins)", legende: "", width: 1616, height: 1080, capture: "2025-03-01T13:43:45.921+01:00", confiance: "high" },
};
