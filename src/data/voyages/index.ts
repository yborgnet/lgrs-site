import type { Voyage } from "./types";
import { georgie } from "./georgie";
import { ouzbekistan } from "./ouzbekistan";
import { armenie } from "./armenie";
import { mediterraneen } from "./mediterraneen";
import { tadjikistan } from "./tadjikistan";

/**
 * Source unique pour la page générale /prochains-voyages/ : chaque entrée
 * dérive dates/durée/pays/massif/année du `Voyage` complet (son bloc
 * `info.fields`), jamais retapés en dur ici — seuls `excerpt`, `cover`,
 * `order` et `zones` restent des choix éditoriaux propres à cette page (pas
 * forcément les mêmes que la homepage), déclarés à la main, exactement comme
 * `toSummary()` dans src/data/carnets/index.ts.
 *
 * Pour ajouter un voyage : créer son fichier de données (voir georgie.ts),
 * l'importer ci-dessous et ajouter une entrée — la page générale se met à
 * jour automatiquement.
 */

export type VoyagePhoto = {
  src: string;
  alt: string;
  /** object-position CSS — même règle que CarnetPhoto : ne pas couper les
   *  sommets, garder les skieurs lisibles, jamais un centrage mécanique. */
  position?: string;
  /** true = pas encore de photo associée à ce voyage côté source (voir
   *  fichiers ouzbekistan.ts/tadjikistan.ts) — bloc placeholder sobre plutôt
   *  qu'une image cassée, jamais une photo choisie au hasard pour combler. */
  placeholder?: boolean;
};

export type VoyageSummary = {
  slug: string;
  title: string;
  /** massif/zone du voyage (masthead.meta[0]) — absent pour un voyage sans
   *  destination fixe (Raid méditerranéen, voir masthead.meta = ["2027"]). */
  subtitle?: string;
  /** Format court "17 — 26 JAN" ou "20 FÉV — 1 MAR", dérivé de
   *  info.fields["Dates"] — jamais retapé à la main (voir formatDateRange). */
  dateLabel: string;
  /** "10 jours", dérivé de info.fields["Durée"]. */
  duration?: string;
  /** Absent pour le Raid méditerranéen (destination non fixée — voir
   *  info.fields["Destination"] au lieu de "Pays"). */
  country?: string;
  massif?: string;
  excerpt: string;
  cover: VoyagePhoto;
  year: number | null;
  /** Ordre chronologique de départ (1 = premier départ de la saison) — sert
   *  à la fois au tri et à la numérotation "VOYAGE 0N", jamais recalculé
   *  depuis un filtre. */
  order: number;
  /** Réservé : aucun statut (complet/places disponibles/...) n'existe dans
   *  les données sources actuelles — jamais inventé. */
  status?: string;
  /** Réservé pour un filtrage futur par grande zone — vide pour l'instant,
   *  5 voyages ne justifient pas un filtre (voir brief). */
  zones: string[];
  published: boolean;
};

function getField(fields: { label: string; value: string }[], label: string): string | undefined {
  return fields.find((f) => f.label === label)?.value;
}

function titleText(title: Voyage["masthead"]["title"]): string {
  return typeof title === "string" ? title : title.desktop;
}

/** Année extraite de masthead.meta (ex. ["PETIT CAUCASE", "2027"]) — jamais
 *  retapée en dur, même logique que extractYear dans carnets/index.ts. */
function extractYear(meta: string[]): number | null {
  const match = meta.join(" ").match(/\d{4}/);
  return match ? Number(match[0]) : null;
}

const MONTHS: Record<string, string> = {
  janvier: "JAN", février: "FÉV", mars: "MAR", avril: "AVR",
  mai: "MAI", juin: "JUIN", juillet: "JUIL", août: "AOÛT",
  septembre: "SEPT", octobre: "OCT", novembre: "NOV", décembre: "DÉC",
};

/** "du dimanche 17 au mardi 26 janvier 2027" -> "17 — 26 JAN"
 *  "du samedi 20 février au lundi 1er mars 2027" -> "20 FÉV — 1 MAR"
 *  Seule source : info.fields["Dates"], jamais une date retapée à la main. */
function formatDateRange(text: string | undefined): string {
  if (!text) return "";
  const monthNames = Object.keys(MONTHS).join("|");
  const pattern = new RegExp(`(\\d{1,2})(?:er)?(?:\\s+(${monthNames}))?`, "gi");
  const matches = [...text.matchAll(pattern)].filter((m) => m[1]);
  if (matches.length < 2) return text;
  const [day1, month1] = [matches[0][1], matches[0][2]];
  const [day2, month2] = [matches[1][1], matches[1][2]];
  const month2Abbr = month2 ? MONTHS[month2.toLowerCase()] : "";
  if (month1) {
    const month1Abbr = MONTHS[month1.toLowerCase()];
    return `${day1} ${month1Abbr} — ${day2} ${month2Abbr}`;
  }
  return `${day1} — ${day2} ${month2Abbr}`;
}

/** "10 jours / 9 nuits, environ 7 jours de ski" -> "10 jours" */
function formatDuration(text: string | undefined): string | undefined {
  const match = text?.match(/^\d+\s*jours?/);
  return match?.[0];
}

function toSummary(
  voyage: Voyage,
  opts: { excerpt: string; cover: VoyagePhoto; order: number; zones?: string[]; published?: boolean }
): VoyageSummary {
  const fields = voyage.info.fields;
  return {
    slug: voyage.slug,
    title: titleText(voyage.masthead.title),
    subtitle: voyage.masthead.meta.length > 1 ? voyage.masthead.meta[0] : undefined,
    dateLabel: formatDateRange(getField(fields, "Dates")),
    duration: formatDuration(getField(fields, "Durée")),
    country: getField(fields, "Pays"),
    massif: getField(fields, "Massif") ?? getField(fields, "Massifs"),
    excerpt: opts.excerpt,
    cover: opts.cover,
    year: extractYear(voyage.masthead.meta),
    order: opts.order,
    zones: opts.zones ?? [],
    published: opts.published ?? true,
  };
}

// Couverture Géorgie volontairement distincte de bigPhoto (déjà utilisée
// comme grande photo d'ouverture de cette même page, voir
// src/pages/prochains-voyages/index.astro) pour ne pas répéter deux fois la
// même image sur une seule page.
export const voyages: VoyageSummary[] = [
  toSummary(georgie, {
    order: 1,
    // Repris du texte déjà validé sur l'ancienne page WordPress
    // /prochains-voyages/ (voir méthode, étape 2).
    excerpt:
      "Des volcans du Javakheti aux neiges profondes d'Adjarie et de Gourie, au fil d'une traversée de village en village.",
    cover: {
      src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/georgie-svanetie-2024DSC03959.jpg",
      alt: "Skieur de randonnée sur une arête, massif du Petit Caucase, Géorgie",
      position: "35% 40%",
    },
  }),
  toSummary(ouzbekistan, {
    order: 2,
    excerpt:
      "Exploration du massif du Hissar puis itinérance de village en village, dans un terrain encore peu parcouru à ski.",
    cover: {
      src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/Illustration-FT-Ouzbekistan-1-scaled.jpeg",
      alt: "Panorama sur le massif du Hissar, Ouzbékistan",
      position: "50% 30%",
    },
  }),
  toSummary(armenie, {
    order: 3,
    excerpt:
      "Forêts, hauts plateaux et reliefs volcaniques : une traversée hivernale entre le lac Sevan et le massif de l'Aragats.",
    cover: {
      src: "https://lesgrandsraidsaski.com/wp-content/uploads/2026/09/Armenie-—-Mont-Aragats-depuis-Kari-Lake.jpg",
      alt: "Khachkar de pierre sous le mont Aragats enneigé, Arménie",
      position: "65% 40%",
    },
  }),
  toSummary(mediterraneen, {
    order: 4,
    excerpt: "Un voyage volontairement ouvert : choisir le massif au dernier moment, là où l'hiver aura le mieux travaillé.",
    // Aucune photo associée côté source (voir TODO en tête de mediterraneen.ts) —
    // cohérent avec la destination elle-même, pas encore fixée.
    cover: {
      src: "",
      alt: "Raid à ski méditerranéen — destination choisie selon l'enneigement",
      placeholder: true,
    },
  }),
  toSummary(tadjikistan, {
    order: 5,
    excerpt: "Villages reculés, hauts cols et terrain d'altitude pour la traversée la plus engagée de la saison.",
    // Aucune photo associée côté source (voir TODO en tête de tadjikistan.ts).
    cover: {
      src: "",
      alt: "Traversée à ski des vallées du Zeravshan, Tadjikistan",
      placeholder: true,
    },
  }),
]
  .filter((v) => v.published)
  .sort((a, b) => a.order - b.order);
