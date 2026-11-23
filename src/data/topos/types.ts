/** Section Topos — fiches factuelles d'itinéraires (aucun récit).
 *  Chaque texte affiché est un `L` : une valeur par langue, le français fait foi.
 *  Un champ absent ou `null` s'affiche « à compléter » : on n'invente jamais
 *  une cotation, un horaire, un chiffre ou un contact. */
import type { Lang } from "../../i18n/ui";

export type L = Record<Lang, string>;

export type TopoPhoto = {
  src: string;
  alt: L;
  caption: L;
  width: number;
  height: number;
  /** Plan large : affiché en tête de galerie. */
  wide?: boolean;
};

export type TopoPoint = {
  id: string;
  kind: "depart" | "arrivee" | "refuge" | "hotel" | "bivouac" | "sommet";
  name: string;
  lat: number;
  lon: number;
  ele?: number;
};

export type TopoStage = {
  day: number;
  from: string;
  to: string;
  /** Année du raid dont provient la trace de l'étape. */
  source: string;
  distanceKm: number;
  ascentM: number;
  descentM: number;
  /** Durée réellement enregistrée par la trace, pauses comprises (minutes). */
  recordedMin?: number;
  waypoints: string[];
  keyPassages: L[];
  /** id de l'hébergement de fin d'étape (bloc Hébergements), si nuit. */
  nightId?: string;
};

export type TopoHut = {
  id: string;
  name: string;
  ele: number | null;
  kind: L;
  section?: string;
  places: L | null;
  season: L | null;
  winterRoom: L | null;
  booking: L | null;
  phones: { label: L; value: string }[];
  email: string | null;
  website: string | null;
  lat: number;
  lon: number;
  notes: L[];
  verified: string;
};

export type Topo = {
  slug: string;
  updated: string;
  photoHero: TopoPhoto;
  name: L;
  subtitle: L;
  country: L;
  massif: L;
  seo: { title: L; description: L };
  stats: { days: number; distanceKm: number; ascentM: number; descentM: number; highPoint: { name: string; ele: number } };
  facts: { label: L; value: L | null; /** Lien interne (chemin du site, sans base). */ href?: string }[];
  gpx: string;
  points: TopoPoint[];
  profile: [number, number, number][];
  stages: TopoStage[];
  huts: TopoHut[];
  variants: L[];
  gallery: TopoPhoto[];
  recits: { href: string; title: L; meta: L; photo: string }[];
  /** Notes de méthode affichées sous la fiche technique. */
  method: L;
};
