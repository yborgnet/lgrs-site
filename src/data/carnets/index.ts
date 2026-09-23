import type { Carnet, CarnetSummary } from "./types";
import { bernina, indexCover as berninaCover } from "./bernina";
import { argentera, indexCover as argenteraCover } from "./argentera";
import { georgie, indexCover as georgieCover } from "./georgie";
import { grece, indexCover as greceCover } from "./grece";
import { prokletije, indexCover as prokletijeCover } from "./prokletije";
import { maroc } from "./maroc";
import { kazakhstan, indexCover as kazakhstanCover } from "./kazakhstan";
import { kosovo, indexCover as kosovoCover } from "./kosovo";
import { alpesLigures, indexCover as alpesLiguresCover } from "./alpesLigures";
import { otztal, indexCover as otztalCover } from "./otztal";
import { dammastockTitlis, indexCover as titlisCover } from "./dammastock-titlis-traversee-ski-randonnee";
import { verwall, indexCover as verwallCover } from "./verwall";

/**
 * Source unique pour la page listing /carnets-de-voyage-ski/ : chaque entrée
 * dérive son titre/sous-titre/méta du `Carnet` complet (masthead), jamais
 * retapés en dur ici. Résumé, photo de couverture et zones restent des choix
 * éditoriaux propres à la liste (pas forcément les mêmes que la page carnet
 * ou la homepage), volontairement déclarés à la main.
 *
 * Pour ajouter un carnet : créer son fichier de données (voir bernina.ts /
 * argentera.ts), l'importer ci-dessous et ajouter une entrée — pas d'autre
 * changement nécessaire, la page listing (liste + filtres) se met à jour
 * automatiquement. Tant que `published` n'est pas `true`, un carnet
 * n'apparaît pas (évite un lien mort vers une page qui n'existe pas encore,
 * ex. Alpes Ligures).
 */

/** Ajoute automatiquement "hors-alpes" à tout carnet qui n'est pas dans les
 *  Alpes — reprend exactement la logique du filtre "Hors Alpes" du site
 *  WordPress historique (chaque carnet non-alpin y porte systématiquement
 *  ce tag en plus de sa zone précise). Jamais à taper à la main. */
function buildZones(zones: string[]): string[] {
  return zones.includes("alpes") ? zones : [...zones, "hors-alpes"];
}

/** Année extraite de la période affichée (masthead.meta[0], ex. "Fin avril –
 *  début mai 2026" ou "Début avril 2026") — jamais retapée en dur, pour
 *  qu'il n'existe qu'une seule source de vérité entre le hero du carnet et
 *  le filtre "PAR ANNÉE" de la page listing. */
function extractYear(periodLabel: string | undefined): number | null {
  const match = periodLabel?.match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

function toSummary(
  carnet: Carnet,
  opts: {
    excerpt: string;
    cover: CarnetSummary["cover"];
    zones: string[];
    /** false = carnet préparé (contenu/itinéraire/récit) mais pas encore
     *  validé pour publication — le plus souvent parce que la passe photo
     *  reste à faire (voir CarnetPhoto["placeholder"]). Défaut : true, pour
     *  ne rien changer aux carnets déjà validés (Bernina, Argentera). */
    published?: boolean;
  }
): CarnetSummary {
  return {
    slug: carnet.slug,
    title: carnet.masthead.title,
    subtitle: carnet.masthead.subtitle,
    meta: carnet.masthead.meta ?? [],
    excerpt: opts.excerpt,
    cover: opts.cover,
    zones: buildZones(opts.zones),
    year: extractYear(carnet.masthead.meta?.[0]),
    published: opts.published ?? true,
  };
}

export const carnets: CarnetSummary[] = [
  toSummary(bernina, {
    // Même résumé validé que la section Carnets de la homepage.
    excerpt:
      "Tour du massif de la Bernina à ski de randonnée, entre glaciers, moraines, refuges et bivouacs d'altitude.",
    cover: { ...berninaCover, position: "center 40%" },
    zones: ["alpes"],
  }),
  toSummary(argentera, {
    // Même résumé validé que la section Carnets de la homepage.
    excerpt:
      "Une traversée transalpine sous le signe du vent, des loups et de l'itinérance.",
    cover: { ...argenteraCover, position: "center 45%" },
    // Reprend exactement data-zones="alpes mediterranee" du carnet
    // équivalent sur le site WordPress historique (même massif, la
    // Méditerranée est visible depuis plusieurs étapes du récit).
    zones: ["alpes", "mediterranee"],
  }),
  toSummary(georgie, {
    excerpt: "Une ligne continue sous le Chkhara, le Tetnuldi et l'Ushba. Sept jours entre glaciers, cols, cabanes d'alpage et villages.",
    cover: { ...georgieCover, position: "center 62%" },
    zones: ["caucase"],
  }),
  // Carnets du listing WordPress live (/carnets-de-voyage-ski/), contenu/
  // itinéraire/récit repris tel quel (voir chaque fichier de données).
  // Publiés (validés par l'utilisateur le 16/09/2026) malgré la passe photo
  // pas encore faite : openingPhoto/intro.photo/cover restent en placeholder
  // (voir CarnetPhoto["placeholder"]) jusqu'à ce que les vraies photos soient
  // choisies — jamais de photo générée ni choisie au hasard pour combler.
  toSummary(grece, {
    excerpt:
      "Skier la Grèce de village en village, entre reliefs calcaires, pins centenaires, chapelles sommitales et fêtes des Apokries.",
    cover: { ...greceCover, position: "center 45%" },
    zones: ["mediterranee"],
  }),
  toSummary(prokletije, {
    excerpt: "Huit jours de traversée entre forêts serrées, villages reculés et crêtes frontières.",
    cover: prokletijeCover,
    zones: ["balkans"],
  }),
  toSummary(maroc, {
    excerpt: "Une traversée faite d'incertitudes, de hauts plateaux, de villages suspendus et de neige capricieuse.",
    cover: { src: "", alt: maroc.openingPhoto.alt, placeholder: true },
    zones: [],
  }),
  toSummary(kazakhstan, {
    excerpt:
      "Glaciers immenses, bivouacs sommaires, vestiges soviétiques et isolement total : six jours de raid dans les monts Ile Alatau.",
    cover: kazakhstanCover,
    zones: ["asie-centrale"],
  }),
  toSummary(kosovo, {
    excerpt: "Du Korab aux montagnes de Šar, une traversée au long cours entre Albanie, Macédoine du Nord et Kosovo.",
    cover: kosovoCover,
    zones: ["balkans"],
  }),
  toSummary(alpesLigures, {
    excerpt: "Cinq jours de traversée aux confins des Alpes, de la plaine du Pô à la Méditerranée, entre cabanes non gardées et solitude retrouvée.",
    cover: { ...alpesLiguresCover, position: "center 45%" },
    zones: ["alpes"],
  }),
  toSummary(otztal, {
    excerpt: "Cinq jours de traversée à ski de refuge en refuge dans l'Ötztal, en Autriche, entre glaciers et sommets tyroliens de plus de 3 300 m.",
    cover: { ...otztalCover, position: "center 55%" },
    zones: ["alpes"],
    // Récit source retrouvé et intégré le 18/09/2026 (Google Doc "Récits
    // hiver 2024" de Yann) — voir note en tête de src/data/carnets/otztal.ts.
    // Publié.
  }),
  toSummary(dammastockTitlis, {
    excerpt: "Cinq jours de boucle à ski entre les massifs du Dammastock et du Titlis, entre refuges, hôtel de montagne et bivouac d'altitude.",
    cover: { ...titlisCover, position: "center 55%" },
    zones: ["alpes"],
    // Passe photo faite (41 photos), aucun récit source retrouvé (ni
    // WordPress, ni repo) — voir note en tête de src/data/carnets/
    // dammastock-titlis-traversee-ski-randonnee.ts. Publié quand même sans
    // récit complet (décision de Yann le 18/09/2026, valable pour tous les
    // carnets prêts mais sans récit) : itinéraire + portfolio suffisent,
    // récit à ajouter plus tard si retrouvé/rédigé.
  }),
  toSummary(verwall, {
    excerpt: "Quatre jours de tour à ski du massif du Verwall, entre Tyrol et Vorarlberg, de refuge en refuge.",
    cover: { ...verwallCover, position: "center 55%" },
    zones: ["alpes"],
    // Passe photo faite (20 photos), aucun récit source retrouvé (ni
    // WordPress, ni repo) — voir note en tête de src/data/carnets/verwall.ts.
    // Publié quand même sans récit complet (même décision que le
    // Dammastock-Titlis, 18/09/2026).
  }),
].filter((c) => c.published);

/** Années réellement représentées parmi les carnets publiés, triées
 *  décroissant — jamais une liste fixe (2024/2025/2026) tapée en dur. */
export const carnetYears: number[] = [
  ...new Set(carnets.map((c) => c.year).filter((y): y is number => y !== null)),
].sort((a, b) => b - a);

/** Libellés d'affichage pour les zones — reprend exactement les intitulés du
 *  filtre "PAR GRANDE ZONE" du site WordPress historique. Une zone n'est
 *  listée dans `carnetZones` (donc affichée comme filtre) que si au moins un
 *  carnet publié la porte — jamais de filtre qui ne mène à aucun résultat. */
const ZONE_LABELS: Record<string, string> = {
  alpes: "Alpes",
  "hors-alpes": "Hors Alpes",
  balkans: "Balkans",
  caucase: "Caucase",
  mediterranee: "Méditerranée",
  "asie-centrale": "Asie centrale",
};

// Ordre fixe (celui du site historique), filtré aux zones réellement présentes.
export const carnetZones: { slug: string; label: string }[] = Object.keys(ZONE_LABELS)
  .filter((slug) => carnets.some((c) => c.zones.includes(slug)))
  .map((slug) => ({ slug, label: ZONE_LABELS[slug] }));
