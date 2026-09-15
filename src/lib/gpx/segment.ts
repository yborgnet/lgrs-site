import { suggestDayBoundaries } from "./gaps.ts";
import type { DaySegment, GpxPoint, ManualDayBoundary } from "./types.ts";

function resolveManualIndex(points: GpxPoint[], boundary: ManualDayBoundary): number | undefined {
  if ("afterIndex" in boundary) return boundary.afterIndex;
  const target = Date.parse(boundary.beforeTime);
  if (!Number.isFinite(target)) return undefined;
  const idx = points.findIndex((p) => p.t !== undefined && p.t >= target);
  return idx === -1 ? undefined : idx;
}

/**
 * Découpe une trace en journées. Priorité (voir docs/gpx-methodology.md) :
 *
 * 1. `manualBoundaries` explicites — toujours prioritaires, jamais écrasés par la
 *    détection automatique (toponymes/étapes déjà validés à la main pour ce carnet).
 * 2. Sinon, coupures temporelles suggérées automatiquement (`suggestDayBoundaries`),
 *    UNIQUEMENT si elles se détachent nettement des pauses normales (`confident`).
 * 3. Sinon, la trace n'est PAS découpée automatiquement : elle revient en un seul
 *    "jour" et doit être segmentée à la main (clusters géographiques, refuges cités
 *    dans le récit, photos) — cette fonction ne devine jamais un découpage arbitraire.
 */
export function segmentDays(
  points: GpxPoint[],
  options: { manualBoundaries?: ManualDayBoundary[]; minHours?: number; dominanceFactor?: number } = {}
): { days: DaySegment[]; auto: boolean; confident: boolean } {
  if (points.length === 0) return { days: [], auto: false, confident: true };

  if (options.manualBoundaries && options.manualBoundaries.length > 0) {
    const indices = options.manualBoundaries
      .map((b) => resolveManualIndex(points, b))
      .filter((i): i is number => i !== undefined)
      .sort((a, b) => a - b);

    const days: DaySegment[] = [];
    let start = 0;
    for (const idx of indices) {
      if (idx <= start || idx >= points.length) continue;
      days.push({ points: points.slice(start, idx), startedBy: days.length === 0 ? undefined : "manual" });
      start = idx;
    }
    days.push({ points: points.slice(start), startedBy: days.length === 0 ? undefined : "manual" });
    return { days, auto: false, confident: true };
  }

  const { boundaries, confident } = suggestDayBoundaries(points, options);
  if (!confident || boundaries.length === 0) {
    return { days: [{ points }], auto: false, confident };
  }

  const days: DaySegment[] = [];
  let start = 0;
  for (const gap of boundaries) {
    days.push({ points: points.slice(start, gap.afterIndex), startedBy: days.length === 0 ? undefined : "gap" });
    start = gap.afterIndex;
  }
  days.push({ points: points.slice(start), startedBy: "gap" });
  return { days, auto: true, confident: true };
}
