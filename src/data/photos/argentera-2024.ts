/**
 * Métadonnées éditoriales des 46 photos "Argentera 2024" (traversée à ski,
 * Limone Piemonte → Vinadio, 18-22 mars 2024 — segment 2 du projet
 * "Traversée des Alpes", voir docs/gpx-methodology.md et
 * src/data/carnets/argentera-2024.ts pour le contexte complet).
 *
 * Source : 46 JPEG + 1 GPX fournis dans public/photos/Argentera-2024/
 * (dossier renommé depuis "TravAlpes#2" — le "#" casse le chargement des
 * images, voir la note dans alpesLigures.ts). AUCUN EXIF dans ces fichiers
 * (export "SEO web" strippé) : seules 11 des 46 photos portent un
 * horodatage exploitable dans leur NOM de fichier (format téléphone
 * YYYYMMDD-HHMMSS) et peuvent donc être rattachées à un jour précis (champ
 * `day`) en le comparant aux plages horaires de chaque jour du GPX
 * (voir découpage dans argentera-2024.ts). Les 35 autres (fichiers DSCxxxxx,
 * caméra dédiée) n'ont aucun indice de date fiable : `day: null`, jamais
 * forcées sur une journée — direction portfolio uniquement, conformément à
 * la consigne "ne jamais inventer un rattachement".
 *
 * 8 fichiers horodatés étaient enregistrés pivotés à 90° (flag de rotation
 * EXIF perdu à l'export) : rotation corrigée en place (même qualité JPEG
 * 90) après vérification visuelle du sens correct pour chacun, avec
 * confirmation explicite de l'utilisateur avant d'écraser les fichiers.
 *
 * ALT/caption écrits à partir d'une inspection visuelle directe de chaque
 * photo (pas d'EXIF ni de CSV fournis pour ce lot, contrairement à Alpes
 * Ligures) — descriptions volontairement générales quand le lieu exact
 * n'est pas prouvé par le GPX (voir consigne SEO photo du brief).
 */

export type ArgenteraPhotoMeta = {
  alt: string;
  caption: string;
  day: string | null;
  width: number;
  height: number;
};

export const argentera2024Photos: Record<string, ArgenteraPhotoMeta> = {
  "ski-randonnee-traversees-alpes-italie-20240318-091016.jpg": {
    alt: "selfie de groupe dans le minibus au départ de Limone Piemonte",
    caption: "Départ en minibus depuis Limone Piemonte, premier jour de la traversée.",
    day: "J1",
    width: 3200,
    height: 2400,
  },
  "ski-randonnee-traversees-alpes-italie-20240319-112733.jpg": {
    alt: "hélicoptère posé sur la neige près d'un groupe de skieurs de randonnée",
    caption: "Un hélicoptère se pose près du groupe, deuxième jour de traversée.",
    day: "J2",
    width: 3200,
    height: 2400,
  },
  "ski-randonnee-traversees-alpes-italie-20240319-173245.jpg": {
    alt: "entraînement au DVA dans une fosse de neige pendant la traversée à ski de l'Argentera",
    caption: "Séance d'entraînement DVA en fin de journée, dans le massif de l'Argentera.",
    day: "J2",
    width: 3200,
    height: 2400,
  },
  "ski-randonnee-traversees-alpes-italie-20240319-174506.jpg": {
    alt: "recherche DVA dans la neige avec pelle pendant la traversée de l'Argentera",
    caption: "Exercice de recherche de victime d'avalanche, pelle à la main.",
    day: "J2",
    width: 3200,
    height: 2400,
  },
  "ski-randonnee-traversees-alpes-italie-20240320-165749.jpg": {
    alt: "mélèzes dénudés sur fond de montagne enneigée, massif de l'Argentera",
    caption: "Mélèzes et sommets enneigés en fin de journée, troisième étape de la traversée.",
    day: "J3",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20240320-165754.jpg": {
    alt: "sommet enneigé entre les mélèzes en fin de journée, massif de l'Argentera",
    caption: "Un sommet se découpe entre les mélèzes, lumière de fin de journée.",
    day: "J3",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20240320-181555.jpg": {
    alt: "deux skieurs de randonnée détendus dans une pièce de refuge",
    caption: "Moment de détente entre coéquipiers à l'étape du soir.",
    day: "J3",
    width: 2401,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20240320-193035.jpg": {
    alt: "assiette de charcuterie servie au refuge pendant la traversée de l'Argentera",
    caption: "Repas du soir au refuge, troisième jour de traversée.",
    day: "J3",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20240322-112052.jpg": {
    alt: "photo de groupe au sommet avec les skis, massif de l'Argentera-Mercantour",
    caption: "Photo de groupe au sommet, dernière étape de la traversée 2024.",
    day: "J5",
    width: 3200,
    height: 2400,
  },
  "ski-randonnee-traversees-alpes-italie-20240322-134515.jpg": {
    alt: "homme portant des coffrets de vin dans une rue de montagne, Vinadio",
    caption: "Ravitaillement en vin local dans les rues de Vinadio, à l'arrivée.",
    day: "J5",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20240322-135658.jpg": {
    alt: "dîner de fin de traversée avec une coupe de vin blanc, Vinadio",
    caption: "Repas de clôture de la traversée 2024, à Vinadio.",
    day: "J5",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-dsc08964.jpg": {
    alt: "homme au volant d'un véhicule pendant un transfert routier de la traversée",
    caption: "Transfert routier entre deux étapes de la traversée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09001.jpg": {
    alt: "skieur de randonnée solitaire traversant une pente enneigée",
    caption: "Un skieur progresse seul sur une vaste pente, massif de l'Argentera.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09008-2.jpg": {
    alt: "skieur de randonnée en ascension sous un sommet rocheux",
    caption: "Ascension à ski sous un sommet rocheux du massif de l'Argentera.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09097.jpg": {
    alt: "groupe de skieurs de randonnée en file sur une crête enneigée",
    caption: "Le groupe progresse en file sur une crête, traversée de l'Argentera.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09108-1.jpg": {
    alt: "skieur descendant une pente raide, massif de l'Argentera-Mercantour",
    caption: "Descente à ski sur une pente soutenue.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09110-1.jpg": {
    alt: "groupe de skieurs de randonnée progressant vers un col rocheux",
    caption: "Progression du groupe vers un col, traversée de l'Argentera.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09117-1.jpg": {
    alt: "skieurs de randonnée en montée sous une paroi rocheuse enneigée",
    caption: "Montée à ski sous une paroi rocheuse.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09137-1.jpg": {
    alt: "groupe de skieurs de randonnée traversant un large vallon enneigé",
    caption: "Traversée d'un large vallon enneigé en groupe.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09175.jpg": {
    alt: "skieur de randonnée seul au sommet d'une arête enneigée au coucher du soleil",
    caption: "Un skieur atteint une arête sommitale à la lumière du soir.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09218-1.jpg": {
    alt: "panorama sur les sommets enneigés de l'Argentera depuis une crête",
    caption: "Panorama sur les sommets du massif depuis une crête d'altitude.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09220.jpg": {
    alt: "sommet pyramidal isolé se détachant à l'horizon au crépuscule",
    caption: "Un sommet pyramidal isolé se détache à l'horizon, lumière du soir.",
    day: null,
    width: 1458,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09254.jpg": {
    alt: "refuge de montagne éclairé de l'intérieur, veillée à la frontale",
    caption: "Veillée au refuge, éclairage à la frontale.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09327.jpg": {
    alt: "deux skieurs de randonnée en discussion dans la pénombre d'un refuge",
    caption: "Échange en fin de soirée dans la pénombre du refuge.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09339.jpg": {
    alt: "portrait au refuge à la lumière chaude d'une veste rouge",
    caption: "Portrait à l'intérieur du refuge, lumière du soir.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09348.jpg": {
    alt: "skieurs de randonnée arrivant à un refuge de montagne en fin de journée",
    caption: "Arrivée au refuge en fin de journée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09349-1.jpg": {
    alt: "groupe de skieurs de randonnée progressant en file sous un ciel bleu",
    caption: "Progression du groupe sous un grand ciel bleu.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09373.jpg": {
    alt: "skieurs de randonnée montant en conversion sur une pente raide",
    caption: "Montée en conversions sur une pente soutenue.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09421-1.jpg": {
    alt: "skieur de randonnée progressant seul vers un sommet rocheux",
    caption: "Progression solitaire vers un sommet rocheux du massif.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09449-1.jpg": {
    alt: "refuge de montagne en pierre entouré de neige, massif de l'Argentera",
    caption: "Un refuge en pierre au cœur du massif de l'Argentera.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09507.jpg": {
    alt: "deux skieurs de randonnée traversant un vallon enneigé, sacs sur le dos",
    caption: "Deux skieurs traversent un vallon, sacs chargés.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09530.jpg": {
    alt: "panorama sur une chaîne de sommets enneigés du massif de l'Argentera",
    caption: "Panorama sur la chaîne de sommets du massif.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09543-1.jpg": {
    alt: "groupe de skieurs de randonnée progressant sous un ciel nuageux",
    caption: "Progression du groupe sous un ciel changeant.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09548-1.jpg": {
    alt: "traces de conversion sur un glacier, deux skieurs au loin",
    caption: "Traces de montée sur un glacier, skieurs au loin.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09575.jpg": {
    alt: "vallée encaissée du massif de l'Argentera vue depuis les hauteurs",
    caption: "Vue plongeante sur une vallée encaissée du massif.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09618-1.jpg": {
    alt: "grand sommet rocheux dominant un vallon enneigé, massif de l'Argentera",
    caption: "Un grand sommet rocheux domine le vallon.",
    day: null,
    width: 1080,
    height: 1616,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09646-1.jpg": {
    alt: "skieur de randonnée descendant seul une pente ouverte",
    caption: "Descente solitaire sur une pente ouverte.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09720.jpg": {
    alt: "groupe de skieurs de randonnée face à un large cirque enneigé",
    caption: "Le groupe fait face à un large cirque de montagne.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09764-1.jpg": {
    alt: "refuge de montagne isolé sous un ciel bleu intense, massif de l'Argentera",
    caption: "Un refuge isolé sous un ciel bleu intense.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09775.jpg": {
    alt: "deux skieurs de randonnée montant vers un col rocheux",
    caption: "Montée à deux vers un col rocheux.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09845.jpg": {
    alt: "panorama sur les crêtes frontalières entre France et Italie, massif de l'Argentera",
    caption: "Panorama sur les crêtes frontalières franco-italiennes.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09888.jpg": {
    alt: "groupe de skieurs de randonnée progressant sous un grand sommet pointu",
    caption: "Progression du groupe sous un sommet pointu caractéristique.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09899.jpg": {
    alt: "skieur de randonnée seul dans une combe encaissée",
    caption: "Un skieur seul dans une combe encaissée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09901.jpg": {
    alt: "large panorama montagneux sur le massif de l'Argentera-Mercantour",
    caption: "Large panorama sur le massif de l'Argentera-Mercantour.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09916.jpg": {
    alt: "dégustation de vin en soirée au refuge, bouteilles éclairées en rouge",
    caption: "Soirée de dégustation au refuge, lumière rouge tamisée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc09958-1.jpg": {
    alt: "skieur de randonnée descendant un couloir étroit entre les rochers",
    caption: "Descente d'un couloir étroit entre les rochers.",
    day: null,
    width: 1616,
    height: 1080,
  },
};
