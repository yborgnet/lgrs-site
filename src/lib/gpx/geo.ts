import type { GpxPoint, SmoothingOptions } from "./types.ts";

const EARTH_RADIUS_M = 6371000;

/** Distance géodésique entre deux points, en mètres (formule haversine). */
export function haversineMeters(a: { lat: number; lon: number }, b: { lat: number; lon: number }): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLon = toRad(b.lon - a.lon);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return 2 * EARTH_RADIUS_M * Math.asin(Math.sqrt(h));
}

/** Distance totale d'une suite de points, en km (somme point à point sur la trace réelle,
 *  jamais sur une version simplifiée — voir docs/gpx-methodology.md). */
export function distanceKm(points: GpxPoint[]): number {
  let meters = 0;
  for (let i = 1; i < points.length; i++) meters += haversineMeters(points[i - 1], points[i]);
  return meters / 1000;
}

/** Moyenne glissante centrée (fenêtre tronquée proprement aux bords). */
export function movingAverage(values: number[], window: number): number[] {
  const half = Math.floor(window / 2);
  return values.map((_, i) => {
    let sum = 0;
    let count = 0;
    for (let j = Math.max(0, i - half); j <= Math.min(values.length - 1, i + half); j++) {
      sum += values[j];
      count++;
    }
    return sum / count;
  });
}

/**
 * Dénivelé cumulé par hystérésis : on ne comptabilise un changement que lorsqu'il
 * s'écarte d'au moins `thresholdM` du dernier point "retenu" (pas juste du point
 * précédent) — ce qui absorbe le bruit capteur sans lisser artificiellement un vrai
 * profil en dents de scie. Même algorithme que l'analyse manuelle validée sur Bernina.
 */
export function elevationGainLoss(elevations: number[], thresholdM: number): { ascentM: number; descentM: number } {
  if (elevations.length === 0) return { ascentM: 0, descentM: 0 };
  let ascent = 0;
  let descent = 0;
  let last = elevations[0];
  for (let i = 1; i < elevations.length; i++) {
    const diff = elevations[i] - last;
    if (Math.abs(diff) >= thresholdM) {
      if (diff > 0) ascent += diff;
      else descent += -diff;
      last = elevations[i];
    }
  }
  return { ascentM: ascent, descentM: descent };
}

const DEFAULT_SMOOTHING: Required<SmoothingOptions> = { window: 9, noiseThresholdM: 2 };

/** D+/D- lissés (voir docs/gpx-methodology.md) + la version brute pour comparaison. */
export function computeElevation(points: GpxPoint[], options: SmoothingOptions = {}) {
  const { window, noiseThresholdM } = { ...DEFAULT_SMOOTHING, ...options };
  const raw = points.map((p) => p.ele).filter((e): e is number => e !== undefined);
  if (raw.length === 0) {
    return { ascentM: 0, descentM: 0, elevationMin: 0, elevationMax: 0, raw: { ascentM: 0, descentM: 0 } };
  }
  const smoothed = movingAverage(raw, window);
  const smoothedGL = elevationGainLoss(smoothed, noiseThresholdM);
  const rawGL = elevationGainLoss(raw, 0.1); // ~aucun seuil : sert uniquement de comparaison diagnostique
  return {
    ascentM: smoothedGL.ascentM,
    descentM: smoothedGL.descentM,
    elevationMin: Math.min(...raw),
    elevationMax: Math.max(...raw),
    raw: { ascentM: rawGL.ascentM, descentM: rawGL.descentM },
  };
}
