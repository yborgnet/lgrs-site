import { computeElevation, distanceKm } from "./geo.ts";
import type { DayStats, GlobalStats, GpxPoint, SmoothingOptions } from "./types.ts";

export function computeDayStats(points: GpxPoint[], smoothing: SmoothingOptions = {}): DayStats {
  const elevation = computeElevation(points, smoothing);
  const first = points[0];
  const last = points[points.length - 1];
  const durationHours = first?.t !== undefined && last?.t !== undefined ? (last.t - first.t) / 3600000 : 0;

  return {
    distanceKm: distanceKm(points),
    ascentM: elevation.ascentM,
    descentM: elevation.descentM,
    elevationMin: elevation.elevationMin,
    elevationMax: elevation.elevationMax,
    durationHours,
    startTime: first?.time,
    endTime: last?.time,
    pointCount: points.length,
    raw: elevation.raw,
  };
}

export function computeGlobalStats(daysStats: DayStats[]): GlobalStats {
  return {
    distanceKm: daysStats.reduce((sum, d) => sum + d.distanceKm, 0),
    ascentM: daysStats.reduce((sum, d) => sum + d.ascentM, 0),
    descentM: daysStats.reduce((sum, d) => sum + d.descentM, 0),
    days: daysStats.length,
  };
}

/** Arrondi au multiple de 10 m le plus proche — même convention que
 *  src/lib/carnet/itinerary-totals.ts (formatAscent/formatDescent), pour que les
 *  valeurs calculées ici s'alignent avec ce qui est affiché sur le site. */
export function roundTo10(m: number): number {
  return Math.round(m / 10) * 10;
}

/** Formate les stats d'une journée dans la forme consommée par CarnetDayCard
 *  (src/data/carnets/types.ts) — arrondis, prêt à copier dans un fichier de données
 *  après validation. Ne rien de plus qu'un formatage : ce n'est PAS une écriture
 *  automatique dans les fichiers de données (voir docs/gpx-methodology.md). */
export function toCarnetDayStats(stats: DayStats) {
  return {
    distanceKm: Math.round(stats.distanceKm * 10) / 10,
    ascentM: roundTo10(stats.ascentM),
    descentM: roundTo10(stats.descentM),
    elevationMin: Math.round(stats.elevationMin / 10) * 10,
    elevationMax: Math.round(stats.elevationMax / 10) * 10,
  };
}
