/**
 * Types partagés par l'outillage GPX (src/lib/gpx/*). Voir docs/gpx-methodology.md
 * pour la méthodologie complète (hiérarchie des sources, découpage en journées,
 * lissage du dénivelé, croisement Camptocamp/Skitour dans les Alpes).
 */

export type GpxPoint = {
  lat: number;
  lon: number;
  /** Altitude en mètres, quand fournie par le GPX. */
  ele?: number;
  /** Timestamp ISO, quand fourni par le GPX. */
  time?: string;
  /** Époque en ms (dérivée de `time`), pratique pour les calculs de durée/écarts. */
  t?: number;
  /** Index du `<trkseg>` d'origine auquel appartient ce point (préserve la structure native). */
  segIndex: number;
};

export type GpxTrack = {
  name?: string;
  /** Un tableau de points par `<trkseg>` — la segmentation native du fichier est préservée. */
  segments: GpxPoint[][];
};

export type GpxWaypoint = {
  lat: number;
  lon: number;
  ele?: number;
  name?: string;
  /** Type WordPress/GPX libre (ex. "refuge", "sommet"), quand présent. */
  type?: string;
};

export type GpxData = {
  tracks: GpxTrack[];
  waypoints: GpxWaypoint[];
  /** Tous les points de tous les tracks/segments, aplatis et triés par ordre d'origine
   *  (pas par timestamp — l'ordre du fichier fait foi). Vue pratique pour l'analyse
   *  jour par jour quand un GPX n'a qu'un seul `<trk>`, cas de tous nos carnets à date. */
  points: GpxPoint[];
};

export type TimeGap = {
  /** Index dans `points` du point qui SUIT la coupure. */
  afterIndex: number;
  fromTime: string;
  toTime: string;
  durationMin: number;
  /** true si la coupure coïncide avec une frontière `<trkseg>` native du GPX. */
  atSegBoundary: boolean;
  lat: number;
  lon: number;
  ele?: number;
};

export type DaySegment = {
  points: GpxPoint[];
  /** D'où vient la coupure de début de journée (absente pour le tout premier jour). */
  startedBy?: "trkseg" | "gap" | "manual";
};

export type SmoothingOptions = {
  /** Fenêtre de la moyenne glissante (nombre de points), centrée. Défaut : 9
   *  (valeur validée sur la trace Bernina, dense — ~5 à 20 s entre points). */
  window?: number;
  /** Seuil de bruit en mètres pour le calcul de dénivelé par hystérésis. Défaut : 2. */
  noiseThresholdM?: number;
};

export type DayStats = {
  distanceKm: number;
  ascentM: number;
  descentM: number;
  elevationMin: number;
  elevationMax: number;
  durationHours: number;
  startTime?: string;
  endTime?: string;
  pointCount: number;
  /** Mêmes stats calculées SANS lissage (seuil quasi nul) — à comparer au résultat
   *  lissé pendant l'analyse, jamais affiché tel quel (voir docs/gpx-methodology.md). */
  raw: { ascentM: number; descentM: number };
};

export type GlobalStats = {
  distanceKm: number;
  ascentM: number;
  descentM: number;
  days: number;
};

/** Coupure de journée imposée manuellement — prioritaire sur toute détection
 *  automatique (voir docs/gpx-methodology.md, "toponymes validés manuellement"). */
export type ManualDayBoundary = { afterIndex: number } | { beforeTime: string };
