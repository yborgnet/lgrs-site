import type { GpxPoint, TimeGap } from "./types.ts";

/**
 * Repère tous les écarts temporels entre points consécutifs au-delà de `minGapMinutes`,
 * triés du plus long au plus court. Étape 1 du découpage en journées d'un carnet (voir
 * docs/gpx-methodology.md) : ces candidats doivent ensuite être examinés (durée très
 * supérieure aux pauses normales de la journée, cohérence avec le récit/les refuges)
 * avant d'être retenus comme coupures de nuit — cette fonction liste, elle ne décide pas.
 */
export function detectGaps(points: GpxPoint[], minGapMinutes = 15): TimeGap[] {
  const gaps: TimeGap[] = [];
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    if (prev.t === undefined || curr.t === undefined) continue;
    const durationMin = (curr.t - prev.t) / 60000;
    if (durationMin <= minGapMinutes) continue;
    gaps.push({
      afterIndex: i,
      fromTime: prev.time ?? new Date(prev.t).toISOString(),
      toTime: curr.time ?? new Date(curr.t).toISOString(),
      durationMin: Math.round(durationMin),
      atSegBoundary: prev.segIndex !== curr.segIndex,
      lat: prev.lat,
      lon: prev.lon,
      ele: prev.ele,
    });
  }
  return gaps.sort((a, b) => b.durationMin - a.durationMin);
}

/**
 * Suggère des coupures de journée à partir des plus longs écarts, quand ils se
 * détachent nettement du reste (repos/nuit vs pauses normales de la journée) :
 * ne retient un gap que s'il dépasse `minHours` ET au moins `dominanceFactor` fois
 * le gap suivant par ordre de durée — sinon la limite entre "pause" et "nuit" est
 * ambiguë et doit être tranchée à la main (voir "À VALIDER" dans la méthodologie).
 *
 * Une suggestion automatique n'est jamais appliquée aveuglément : elle doit être
 * confirmée par au moins une source indépendante (récit, refuge cité, photo) avant
 * de devenir un découpage retenu — voir docs/gpx-methodology.md.
 */
export function suggestDayBoundaries(
  points: GpxPoint[],
  options: { minHours?: number; dominanceFactor?: number } = {}
): { boundaries: TimeGap[]; confident: boolean } {
  const { minHours = 4, dominanceFactor = 2 } = options;
  const candidates = detectGaps(points, minHours * 60);
  if (candidates.length === 0) return { boundaries: [], confident: false };

  // Combien de gaps se détachent nettement des pauses "normales" ? On compare chaque
  // gap retenu au plus long gap NON retenu (ou au minimum absolu s'il n'y en a pas).
  // Comparaison par `afterIndex` (identifiant stable d'un gap dans la trace) plutôt
  // que par identité d'objet : detectGaps() est appelée deux fois ici, avec deux
  // tableaux d'instances distinctes.
  const candidateIndices = new Set(candidates.map((g) => g.afterIndex));
  const allGaps = detectGaps(points, 15);
  const nonNightDurations = allGaps
    .filter((g) => !candidateIndices.has(g.afterIndex))
    .map((g) => g.durationMin);
  const longestNonNight = nonNightDurations.length > 0 ? Math.max(...nonNightDurations) : 0;

  const confident =
    longestNonNight === 0 || candidates[candidates.length - 1].durationMin >= longestNonNight * dominanceFactor;

  return {
    boundaries: [...candidates].sort((a, b) => a.afterIndex - b.afterIndex),
    confident,
  };
}
