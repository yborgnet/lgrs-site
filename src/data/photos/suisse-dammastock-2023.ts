/**
 * Métadonnées éditoriales des 56 photos uniques de la traversée du Dammastock
 * (3-7 avril 2023), dérivées de public/photos/Dammastock 2023/
 * manifest-seo-dammastock.csv (original, date XMP, confiance du recoupement
 * avec la trace GPX). ALT et légendes rédigés d'après le contenu visible des
 * images : aucun lieu n'est nommé sans certitude. Toutes les dates XMP vont du
 * 04/04/2023 au 07/04/2023 (aucune photo du raid 2025).
 *
 * `jour` : journée du carnet d'après la date de prise de vue (J2 = 4 avril …
 * J5 = 7 avril ; aucune photo du 3 avril, J1 sous le brouillard). `null` pour
 * trois fichiers dont le contenu est identique à celui d'un autre fichier
 * alors que les deux originaux du manifeste sont différents (DSC05808 /
 * DSC07805, DSC05936 / DSC06480_1, DSC06040 / DSC07722) : bug d'export. On ne
 * sait pas à quelle prise de vue correspond le contenu ; ils ne figurent
 * qu'au portfolio, sans rattachement à une journée, et les trois copies en
 * "-dsc0xxxx" ne sont pas utilisées.
 *
 * width/height : dimensions réelles des JPEG (1616 × 1080, comme Bernina).
 */
export type DammastockPhotoMeta = {
  jour: "J2" | "J3" | "J4" | "J5" | null;
  alt: string;
  legende: string;
  width: number;
  height: number;
  /** Fichier original (nom d'appareil) et date de prise de vue XMP. */
  original: string;
  capture: string;
  /** Qualité du recoupement horodatage photo / trace GPX (manifeste). */
  confiance: string;
};

export const dammastock2023Photos: Record<string, DammastockPhotoMeta> = {
  "dammastock-suisse-ski-randonnee-cretes.jpg": {
    "jour": "J2",
    "alt": "Skieur de randonnée en montée sur une crête enneigée, entre nappes de nuages et éclaircies bleues, traversée du Dammastock (Suisse)",
    "legende": "Entre soleil et nappes de nuages",
    "width": 1616,
    "height": 1080,
    "original": "DSC05769.jpg",
    "capture": "2023-04-04T08:14:14.098+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-groupe-ski-randonnee.jpg": {
    "jour": null,
    "alt": "Cinq skieurs de randonnée en file sur une longue crête enneigée, traversée du Dammastock (Suisse)",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC05808.jpg",
    "capture": "2023-04-04T08:31:45.611+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-montee-ski-neige.jpg": {
    "jour": "J2",
    "alt": "Deux skieurs de randonnée en montée dans la neige, au milieu des nuages, traversée du Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC05843_1.jpg",
    "capture": "2023-04-04T08:55:42.688+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-passage-neige-ski-alpinisme.jpg": {
    "jour": "J2",
    "alt": "Skieurs montant à pied un couloir enneigé étroit, skis sur le sac, traversée du Dammastock",
    "legende": "Montée en couloir, skis sur le sac",
    "width": 1616,
    "height": 1080,
    "original": "DSC05860.jpg",
    "capture": "2023-04-04T09:54:05.852+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-couloir-neige-montagne.jpg": {
    "jour": "J2",
    "alt": "Montée à pied dans un couloir de neige étroit bordé de rochers, skis sur le sac, cordée en contrebas",
    "legende": "Le couloir, skis sur le sac",
    "width": 1616,
    "height": 1080,
    "original": "DSC05875.jpg",
    "capture": "2023-04-04T09:56:41.681+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-groupe-ski-glacier.jpg": {
    "jour": null,
    "alt": "Petite cordée de skieurs sur un glacier au pied de grandes parois rocheuses sombres, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC05936.jpg",
    "capture": "2023-04-04T10:09:51.02+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-montee-ski-panoramique.jpg": {
    "jour": "J2",
    "alt": "Skieur en montée sur une crête de neige, mer de nuages et sommets en arrière-plan, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC05941.jpg",
    "capture": "2023-04-04T10:09:59.14+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-mer-nuages-sommets.jpg": {
    "jour": "J2",
    "alt": "Mer de nuages et sommets enneigés sous un ciel bleu, vus depuis l'itinéraire du Dammastock",
    "legende": "Au-dessus de la mer de nuages",
    "width": 1616,
    "height": 1080,
    "original": "DSC05953.jpg",
    "capture": "2023-04-04T10:11:45.348+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-haute-montagne-groupe.jpg": {
    "jour": "J2",
    "alt": "Skieurs de randonnée sur un plateau glaciaire au-dessus d'une mer de nuages, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC05984_1.jpg",
    "capture": "2023-04-04T10:26:46.561+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-groupe-montee-ski.jpg": {
    "jour": "J2",
    "alt": "Groupe de skieurs en montée sur un glacier sous un ciel bleu, traversée du Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06024_1.jpg",
    "capture": "2023-04-04T10:43:22.261+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-randonnee-sommets.jpg": {
    "jour": null,
    "alt": "Groupe de skieurs de randonnée sur un glacier face à de hautes parois rocheuses, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06040.jpg",
    "capture": "2023-04-04T10:48:41.805+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-glacier-neige-haute-montagne.jpg": {
    "jour": "J2",
    "alt": "Quatre skieurs de randonnée traversant un vaste glacier sous un mur rocheux, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06109_1.jpg",
    "capture": "2023-04-04T11:13:03.067+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-alpinisme-neige.jpg": {
    "jour": "J2",
    "alt": "Skieur casqué grimpant une pente de neige, skis sur le sac, traversée du Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06139.jpg",
    "capture": "2023-04-04T12:10:57.955+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-arete-glacier-ski-alpinisme.jpg": {
    "jour": "J2",
    "alt": "Skieur franchissant une arête rocheuse enneigée, skis sur le sac, face à un sommet déchiqueté et à des glaciers, Dammastock",
    "legende": "Sur l'arête, skis sur le sac",
    "width": 1616,
    "height": 1080,
    "original": "DSC06144.jpg",
    "capture": "2023-04-04T13:02:10.823+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-passage-arete-ski.jpg": {
    "jour": "J2",
    "alt": "Skieur escaladant une arête rocheuse enneigée, skis rouges fixés au sac, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06150_1.jpg",
    "capture": "2023-04-04T13:05:08.062+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-couloir-neige-ski.jpg": {
    "jour": "J2",
    "alt": "Passage dans un couloir encaissé aux parois de neige et de roche, vu d'en haut, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06156.jpg",
    "capture": "2023-04-04T13:20:02.729+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-traces-ski-poudreuse.jpg": {
    "jour": "J2",
    "alt": "Traces de virages dans une vaste pente de poudreuse vierge, un skieur en bas, Dammastock",
    "legende": "Pente vierge, tout en poudre",
    "width": 1616,
    "height": 1080,
    "original": "DSC06254_1.jpg",
    "capture": "2023-04-04T13:42:31.781+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-descente-poudreuse.jpg": {
    "jour": "J2",
    "alt": "Skieur en pleine descente dans la poudreuse, traces sinueuses derrière lui, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06284.jpg",
    "capture": "2023-04-04T13:43:45.241+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-descente-neige-vierge.jpg": {
    "jour": "J2",
    "alt": "Traces de ski dans une grande pente de neige vierge au pied de barres rocheuses, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06319.jpg",
    "capture": "2023-04-04T13:47:38.515+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-ski-neige-pentes.jpg": {
    "jour": "J2",
    "alt": "Skieur soulevant un nuage de poudreuse dans une grande pente enneigée, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06399.jpg",
    "capture": "2023-04-04T13:51:19.241+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-alpinisme-pente.jpg": {
    "jour": "J2",
    "alt": "Skieur dans une pente raide sous une paroi rocheuse sombre, traces dans la neige, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06421.jpg",
    "capture": "2023-04-04T13:55:02.552+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-ski-randonnee-col.jpg": {
    "jour": "J2",
    "alt": "Skieur sur un plateau enneigé face à un sommet rocheux, ciel bleu profond, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06466_1.jpg",
    "capture": "2023-04-04T14:25:05.541+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-paysage-alpin-neige.jpg": {
    "jour": "J2",
    "alt": "Skieur en montée sur une longue trace, cordée au loin sur un grand versant de neige, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06500.jpg",
    "capture": "2023-04-04T14:37:27.835+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-groupe-ski-neige.jpg": {
    "jour": "J2",
    "alt": "Skieurs sur un plateau de neige dominant une vallée profonde et des nuages, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06508.jpg",
    "capture": "2023-04-04T14:49:49.966+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-pente-neige.jpg": {
    "jour": "J2",
    "alt": "Skieur descendant une pente de neige vers un col rocheux, le reste du groupe en haut, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06529_1.jpg",
    "capture": "2023-04-04T16:12:10.595+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-descente-ski-pente.jpg": {
    "jour": "J3",
    "alt": "Deux skieurs dans un vallon enneigé au pied de parois rocheuses, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06564.jpg",
    "capture": "2023-04-05T07:33:07.189+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-ski-randonnee-vallon.jpg": {
    "jour": "J3",
    "alt": "Trois skieurs de randonnée en montée dans un vallon enneigé, sommet rocheux en arrière-plan",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06567.jpg",
    "capture": "2023-04-05T07:42:18.331+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-montee-ski-couloir.jpg": {
    "jour": "J3",
    "alt": "Deux skieurs en montée dans un vallon, vue plongeante sur une vallée glaciaire et des sommets, Dammastock",
    "legende": "",
    "width": 1080,
    "height": 1616,
    "original": "DSC06597.jpg",
    "capture": "2023-04-05T08:40:31.422+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-panorama-sommets-hiver.jpg": {
    "jour": "J3",
    "alt": "Sommets enneigés sous un ciel strié de nuages, massif du Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06603.jpg",
    "capture": "2023-04-05T09:01:09.543+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-ski-alpinisme-vallon.jpg": {
    "jour": "J3",
    "alt": "Skieur remontant un glacier face à une chaîne de sommets déchiquetés, ciel de cirrus, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06622.jpg",
    "capture": "2023-04-05T09:24:43.761+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-randonnee-paysage.jpg": {
    "jour": "J3",
    "alt": "Skieur en montée sur un glacier, longue trace dans la neige, crêtes enneigées au fond, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06624.jpg",
    "capture": "2023-04-05T09:24:44.8+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-groupe-montee-neige.jpg": {
    "jour": "J3",
    "alt": "Skieur au sac orange longeant une crevasse sur un glacier, vaste vallée en contrebas, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06719.jpg",
    "capture": "2023-04-05T10:03:59.461+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-montees-ski-haute-montagne.jpg": {
    "jour": "J3",
    "alt": "Deux skieurs grimpant à pied un couloir raide, skis sur le sac, au-dessus d'une vallée glaciaire, Dammastock",
    "legende": "Montée à pied, skis sur le sac",
    "width": 1616,
    "height": 1080,
    "original": "DSC06793.jpg",
    "capture": "2023-04-05T11:00:43.88+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-couloir-haute-montagne.jpg": {
    "jour": "J3",
    "alt": "Montée à pied dans une pente raide de neige et de roche, vallée glaciaire en contrebas, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06801.jpg",
    "capture": "2023-04-05T11:01:26.4+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-couloir-arete-ski.jpg": {
    "jour": "J3",
    "alt": "Skieurs réunis sur un col rocheux face à un panorama de montagnes et de nuages, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06823.jpg",
    "capture": "2023-04-05T11:51:51.983+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-groupe-ski-souvenir.jpg": {
    "jour": "J3",
    "alt": "Photo de groupe souriante à travers un cadre en bois givré, casques et lunettes de soleil",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06841.jpg",
    "capture": "2023-04-05T12:34:48.163+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-groupe-ski-haute-montagne.jpg": {
    "jour": "J3",
    "alt": "Skieur descendant une pente raide de neige froide sous des rochers, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC06939.jpg",
    "capture": "2023-04-05T12:53:49.881+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-poudreuse-descente.jpg": {
    "jour": "J3",
    "alt": "Skieur dans un nuage de poudreuse sur un large plateau glaciaire, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07090.jpg",
    "capture": "2023-04-05T13:03:38.262+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-descente-ski-neige.jpg": {
    "jour": "J3",
    "alt": "Traces de ski sous une grotte de glace ouverte dans un front de glacier, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07122.jpg",
    "capture": "2023-04-05T13:05:53.51+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-seracs-glacier.jpg": {
    "jour": "J3",
    "alt": "Skieur devant un imposant mur de séracs bleutés sur un glacier, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07335_1.jpg",
    "capture": "2023-04-05T13:19:52.988+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-village-montagne-hiver.jpg": {
    "jour": "J4",
    "alt": "Bâtiments de montagne enneigés au départ de la journée, un skieur au premier plan",
    "legende": "Le départ de la J4, à Steinalp",
    "width": 1616,
    "height": 1080,
    "original": "DSC07367.jpg",
    "capture": "2023-04-06T07:11:53.853+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-groupe-ski-montee.jpg": {
    "jour": "J4",
    "alt": "Quatre skieurs de randonnée en montée dans la lumière du matin, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07381_1.jpg",
    "capture": "2023-04-06T07:39:10.383+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-ski-randonnee-groupe.jpg": {
    "jour": "J4",
    "alt": "Groupe de quatre skieurs en montée dans la lumière du matin, face à un sommet rocheux, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07384_1.jpg",
    "capture": "2023-04-06T07:39:17.509+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-descente-ski-couloir.jpg": {
    "jour": "J4",
    "alt": "Skieur descendant une pente raide sous une grande paroi rocheuse, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07415.jpg",
    "capture": "2023-04-06T10:20:46.556+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-neige-soleil.jpg": {
    "jour": "J4",
    "alt": "Skieur sous une falaise, ciel bleu intense, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07429.jpg",
    "capture": "2023-04-06T10:22:28.932+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-soleil-pente-neige.jpg": {
    "jour": "J4",
    "alt": "Skieur dans une pente de neige, soleil en étoile au-dessus d'une crête rocheuse, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07455.jpg",
    "capture": "2023-04-06T10:26:32.93+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-soleil-poudreuse.jpg": {
    "jour": "J4",
    "alt": "Skieur soulevant la poudreuse à contre-jour, soleil en étoile au-dessus d'une arête, Dammastock",
    "legende": "Du raide, puis de la poudre",
    "width": 1616,
    "height": 1080,
    "original": "DSC07476.jpg",
    "capture": "2023-04-06T10:31:31.93+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-glacier-seracs-hiver.jpg": {
    "jour": "J4",
    "alt": "Cordée de skieurs franchissant un glacier crevassé, vue plongeante, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07527.jpg",
    "capture": "2023-04-06T10:55:52.355+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-glacier-passage-ski.jpg": {
    "jour": "J4",
    "alt": "File de skieurs sous une paroi rocheuse, glacier et vallée au fond, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07542_1.jpg",
    "capture": "2023-04-06T10:56:20.034+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-refuge-ski-haute-montagne.jpg": {
    "jour": "J4",
    "alt": "Petite cabane de bivouac sous une tour rocheuse, skieurs en approche, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07621.jpg",
    "capture": "2023-04-06T11:41:59.162+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-refuge-vie-groupe.jpg": {
    "jour": "J4",
    "alt": "Repas de groupe dans une cabane de bois, thermos et collations sur la table",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07664.jpg",
    "capture": "2023-04-06T11:58:52.32+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-descente-ski-poudreuse.jpg": {
    "jour": "J4",
    "alt": "Skieur au sac orange dans la poudreuse d'une large pente ensoleillée, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07691.jpg",
    "capture": "2023-04-06T12:45:36.52+02:00",
    "confiance": "high"
  },
  "dammastock-suisse-ski-neige-glacier.jpg": {
    "jour": "J4",
    "alt": "Skieurs sur un glacier face à un sommet rocheux massif, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07763.jpg",
    "capture": "2023-04-06T13:32:01.137+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-ski-randonnee-arete.jpg": {
    "jour": "J4",
    "alt": "File de skieurs sur un glacier face à un sommet rocheux, ciel bleu, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07812.jpg",
    "capture": "2023-04-06T14:39:04.243+02:00",
    "confiance": "medium"
  },
  "dammastock-suisse-groupe-ski-montagne.jpg": {
    "jour": "J5",
    "alt": "File de skieurs en montée sur un versant rocheux et enneigé, Dammastock",
    "legende": "",
    "width": 1616,
    "height": 1080,
    "original": "DSC07835.jpg",
    "capture": "2023-04-07T06:52:43.968+02:00",
    "confiance": "low"
  },
  "dammastock-suisse-passage-rocheux-ski-alpinisme.jpg": {
    "jour": "J5",
    "alt": "Skieur franchissant un passage rocheux raide assuré par une corde, skis sur le sac, Dammastock",
    "legende": "Un passage rocheux, corde en main",
    "width": 1616,
    "height": 1080,
    "original": "DSC07868.jpg",
    "capture": "2023-04-07T08:50:39.465+02:00",
    "confiance": "high"
  }
};
