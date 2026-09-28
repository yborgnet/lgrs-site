/**
 * Métadonnées éditoriales des 37 photos "Argentera 2025" (traversée à ski,
 * Vinadio → Pontechianale/Val Varaita, 7-11 avril 2025 — segment 3 du
 * projet "Traversée des Alpes", voir docs/gpx-methodology.md et
 * src/data/carnets/argentera-2025.ts).
 *
 * Source : 37 JPEG + 1 GPX fournis dans public/photos/Argentera-2025/
 * (dossier renommé depuis "TravAlpes#3", même raison que Argentera-2024).
 * Même situation qu'Argentera 2024 : aucun EXIF, seules 4 photos sur 37 ont
 * un horodatage exploitable dans leur nom de fichier (`day` renseigné pour
 * elles uniquement) ; les 33 fichiers DSCxxxxx restants n'ont aucun indice
 * de date fiable (`day: null`, portfolio uniquement). Attention : 7 fichiers
 * DSC de ce lot portent un suffixe "-2025-04-19t14-33-xx" qui est un
 * horodatage d'EXPORT/TRAITEMENT (toutes le même jour, à quelques secondes
 * d'écart) — PAS la date de prise de vue : jamais utilisé pour dater.
 *
 * 3 fichiers horodatés étaient enregistrés pivotés à 90° (même cause que
 * 2024) : rotation corrigée en place après vérification visuelle et
 * confirmation explicite de l'utilisateur.
 *
 * ALT/caption écrits à partir d'une inspection visuelle directe de chaque
 * photo, descriptions générales quand le lieu exact n'est pas prouvé par
 * le GPX.
 */

import type { ArgenteraPhotoMeta } from "./argentera-2024";

export const argentera2025Photos: Record<string, ArgenteraPhotoMeta> = {
  "ski-randonnee-traversees-alpes-italie-20250407-090516.jpg": {
    alt: "groupe attablé dans une salle de refuge décorée, petit-déjeuner avant le départ",
    caption: "Petit-déjeuner en groupe avant le départ, premier jour de la traversée 2025.",
    day: "J1",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20250407-224816.jpg": {
    alt: "mot manuscrit humoristique punaisé au mur d'une chambre de refuge",
    caption: "Mot laissé sur le mur de la chambre, ambiance de groupe en refuge.",
    day: "J1",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20250409-131918.jpg": {
    alt: "deux skieurs de randonnée souriant en gros plan, skis sur l'épaule",
    caption: "Portrait complice de deux coéquipiers pendant l'ascension.",
    day: "J3",
    width: 2400,
    height: 3200,
  },
  "ski-randonnee-traversees-alpes-italie-20250411-165811.jpg": {
    alt: "homme debout devant la façade en pierre d'un bar de montagne, Pontechianale",
    caption: "Devant le bar du village à l'arrivée de la traversée 2025, Pontechianale.",
    day: "J5",
    width: 3200,
    height: 2400,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00096.jpg": {
    alt: "homme âgé souriant à l'intérieur d'un véhicule de transfert",
    caption: "Portrait pendant un transfert routier, traversée 2025.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00132.jpg": {
    alt: "skieur de randonnée traversant une clairière enneigée sous les mélèzes",
    caption: "Traversée d'une clairière sous les mélèzes, massif de l'Argentera.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00151.jpg": {
    alt: "skieur de randonnée seul sur une large pente enneigée",
    caption: "Un skieur seul sur une large pente d'altitude.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00166.jpg": {
    alt: "groupe de skieurs de randonnée progressant sur une crête dégagée",
    caption: "Progression du groupe sur une crête dégagée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00179.jpg": {
    alt: "deux skieurs de randonnée en ascension vers un sommet enneigé",
    caption: "Ascension à deux vers un sommet, traversée 2025.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00202.jpg": {
    alt: "skieur de randonnée progressant seul sous un ciel nuageux",
    caption: "Progression solitaire sous un ciel changeant.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00239.jpg": {
    alt: "groupe attablé dans un refuge de montagne, ambiance conviviale",
    caption: "Repas convivial en groupe au refuge.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00275-2025-04-19t14-33-31-658.jpg": {
    alt: "skieur de randonnée en montée sur une pente régulière",
    caption: "Montée régulière sur une large pente.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00299.jpg": {
    alt: "deux skieurs de randonnée progressant sur un glacier",
    caption: "Progression à deux sur un glacier du massif.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00323.jpg": {
    alt: "trois skieurs de randonnée au sommet, skis levés en signe de victoire",
    caption: "Arrivée triomphale au sommet, skis levés.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00416.jpg": {
    alt: "skieur de randonnée seul progressant vers une crête lointaine",
    caption: "Progression solitaire vers une crête lointaine.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00444.jpg": {
    alt: "groupe de skieurs de randonnée en file sur un vaste plateau enneigé",
    caption: "Le groupe traverse un vaste plateau d'altitude.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00482.jpg": {
    alt: "panorama sur une chaîne de montagnes enneigées sous un ciel nuageux",
    caption: "Panorama sur la chaîne de montagnes, ciel changeant.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00490-2025-04-19t14-33-36-238.jpg": {
    alt: "deux skieurs de randonnée montant vers un sommet frontalier",
    caption: "Montée vers un sommet à la frontière franco-italienne.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00505.jpg": {
    alt: "refuge de montagne intérieur, groupe attablé au petit-déjeuner",
    caption: "Petit-déjeuner en groupe à l'intérieur du refuge.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00532.jpg": {
    alt: "lever de soleil sur une vallée encaissée du massif de l'Argentera",
    caption: "Lever de soleil sur une vallée encaissée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00588.jpg": {
    alt: "glacier parcouru par un skieur de randonnée isolé, traces de montée",
    caption: "Traces de montée sur un glacier, skieur isolé.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00594.jpg": {
    alt: "crête effilée sous un ciel changeant, massif entre Argentera et Ubaye",
    caption: "Crête effilée sous un ciel changeant.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00702-2025-04-19t14-33-36-066.jpg": {
    alt: "large vallon enneigé parcouru par un groupe de skieurs de randonnée",
    caption: "Le groupe traverse un large vallon d'altitude.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00740.jpg": {
    alt: "deux skieurs de randonnée progressant vers un sommet dans la lumière du matin",
    caption: "Progression matinale vers un sommet.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00794.jpg": {
    alt: "panorama sur les sommets enneigés de la frontière franco-italienne",
    caption: "Panorama sur les sommets frontaliers.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00820.jpg": {
    alt: "deux skieurs de randonnée équipés, en pause avant une descente",
    caption: "Pause avant une descente, matériel prêt.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00825-2025-04-19t14-33-31-315.jpg": {
    alt: "groupe de skieurs de randonnée franchissant un col rocheux",
    caption: "Franchissement d'un col rocheux en groupe.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00844-2025-04-19t14-33-34-479.jpg": {
    alt: "panorama montagneux sur le secteur du Val Varaita depuis une crête",
    caption: "Panorama sur le secteur du Val Varaita depuis une crête.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00853.jpg": {
    alt: "skieur de randonnée descendant seul une pente exposée au soleil",
    caption: "Descente solitaire sur une pente ensoleillée.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00881.jpg": {
    alt: "vallon d'altitude encadré de sommets rocheux, massif franco-italien",
    caption: "Vallon d'altitude encadré de sommets rocheux.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00890.jpg": {
    alt: "skieur de randonnée solitaire au pied d'un sommet pointu",
    caption: "Un skieur au pied d'un sommet pointu caractéristique.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00924.jpg": {
    alt: "deux skieurs de randonnée devant un refuge de montagne en pierre, ravitaillement",
    caption: "Ravitaillement devant un refuge en pierre.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00927.jpg": {
    alt: "groupe de skieurs de randonnée traversant un torrent au printemps",
    caption: "Traversée d'un torrent de fonte, ambiance de printemps.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00952.jpg": {
    alt: "panorama sur des reliefs herbeux et enneigés en fin de traversée",
    caption: "Reliefs mêlant herbe et neige, fin de traversée printanière.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00961-2025-04-19t14-33-33-229.jpg": {
    alt: "large panorama sur les sommets enneigés du Val Varaita",
    caption: "Large panorama sur les sommets du Val Varaita.",
    day: null,
    width: 1616,
    height: 1080,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00977.jpg": {
    alt: "sommet rocheux effilé dominant un vallon enneigé, secteur du Val Varaita",
    caption: "Un sommet rocheux effilé domine le vallon final.",
    day: null,
    width: 1080,
    height: 1616,
  },
  "ski-randonnee-traversees-alpes-italie-dsc00990-2025-04-19t14-33-39-147.jpg": {
    alt: "skieur de randonnée descendant vers le village de Pontechianale",
    caption: "Dernière descente vers le village de Pontechianale.",
    day: "J5",
    width: 1616,
    height: 1080,
  },
};
