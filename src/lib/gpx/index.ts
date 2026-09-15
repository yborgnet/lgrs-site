/**
 * Outillage GPX commun (carnets ET voyages) — voir docs/gpx-methodology.md.
 *
 * Lit un GPX original, préserve sa structure (trk/trkseg/timestamps/waypoints),
 * détecte les journées quand les données le permettent (avec priorité absolue aux
 * limites validées manuellement), calcule distance/D+/D- (bruts et lissés), et
 * exporte une trace simplifiée pour l'affichage web. Ne modifie et n'écrit jamais
 * le fichier source original.
 */
export { parseGpx } from "./parse.ts";
export { haversineMeters, distanceKm, movingAverage, elevationGainLoss, computeElevation } from "./geo.ts";
export { detectGaps, suggestDayBoundaries } from "./gaps.ts";
export { segmentDays } from "./segment.ts";
export { computeDayStats, computeGlobalStats, toCarnetDayStats, roundTo10 } from "./stats.ts";
export { rdpSimplify, rdpSimplifyByDay, toGpxXml } from "./simplify.ts";
export type {
  GpxPoint,
  GpxTrack,
  GpxWaypoint,
  GpxData,
  TimeGap,
  DaySegment,
  SmoothingOptions,
  DayStats,
  GlobalStats,
  ManualDayBoundary,
} from "./types.ts";
