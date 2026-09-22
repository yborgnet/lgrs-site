/**
 * Analyse en lecture seule du GPX original Titlis-Dammastock
 * (data/gpx-sources/suisse-titlis-dammastock-2025.original.gpx) pour déterminer
 * le découpage en journées (trkseg natifs vs coupures temporelles) et calculer
 * distance/D+/D-/altitudes par journée — voir docs/gpx-methodology.md.
 *
 * Ne modifie rien : `node --experimental-strip-types scripts/gpx-report-titlis.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { detectGaps, suggestDayBoundaries } from "../src/lib/gpx/gaps.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { computeDayStats, computeGlobalStats, toCarnetDayStats } from "../src/lib/gpx/stats.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GPX_PATH = path.join(ROOT, "data/gpx-sources/suisse-titlis-dammastock-2025.original.gpx");

const xml = fs.readFileSync(GPX_PATH, "utf8");
const data = parseGpx(xml);
console.log(`Parsé : ${data.tracks.length} track(s), ${data.points.length} points, ${data.waypoints.length} waypoint(s)`);

const track = data.tracks[0];
console.log(`Segments natifs (trkseg) : ${track.segments.length}`);
track.segments.forEach((pts, i) => {
  console.log(`  seg${i} — ${pts.length} pts — ${pts[0]?.time} → ${pts[pts.length - 1]?.time}`);
});

console.log(`\n--- Écarts temporels (> 15 min), triés par durée ---`);
const allGaps = detectGaps(data.points, 15);
allGaps.slice(0, 20).forEach((g) => {
  console.log(
    `  ${g.durationMin} min — ${g.fromTime} → ${g.toTime} — atSegBoundary=${g.atSegBoundary} — (${g.lat.toFixed(6)}, ${g.lon.toFixed(6)}) ele=${g.ele?.toFixed(0)}`
  );
});

console.log(`\n--- suggestDayBoundaries (minHours=4, dominanceFactor=2) ---`);
const suggestion = suggestDayBoundaries(data.points, { minHours: 4, dominanceFactor: 2 });
console.log(`confident=${suggestion.confident}, ${suggestion.boundaries.length} coupure(s) retenue(s)`);
suggestion.boundaries.forEach((g, i) => {
  console.log(
    `  J${i + 1}→J${i + 2} : ${g.durationMin} min (${(g.durationMin / 60).toFixed(1)}h) — ${g.fromTime} → ${g.toTime} — (${g.lat.toFixed(6)}, ${g.lon.toFixed(6)}) ele=${g.ele?.toFixed(0)}`
  );
});

console.log(`\n--- Journées (segmentDays sur ces coupures) ---`);
const { days, auto, confident } = segmentDays(data.points, { minHours: 4, dominanceFactor: 2 });
console.log(`auto=${auto}, confident=${confident}, ${days.length} jour(s)`);

const daysStats = days.map((d) => computeDayStats(d.points));
days.forEach((d, i) => {
  const s = daysStats[i];
  const rounded = toCarnetDayStats(s);
  const first = d.points[0];
  const last = d.points[d.points.length - 1];
  console.log(
    `J${i + 1} — ${d.points.length} pts — ${s.startTime} → ${s.endTime} (${s.durationHours.toFixed(1)}h)\n` +
      `    start=(${first.lat.toFixed(6)}, ${first.lon.toFixed(6)}) end=(${last.lat.toFixed(6)}, ${last.lon.toFixed(6)})\n` +
      `    distance=${rounded.distanceKm}km  D+=${rounded.ascentM}m  D-=${rounded.descentM}m  ` +
      `alt=[${rounded.elevationMin}..${rounded.elevationMax}]m  (raw D+=${Math.round(s.raw.ascentM)} D-=${Math.round(s.raw.descentM)})`
  );
});

const total = computeGlobalStats(daysStats);
console.log(
  `\nTOTAL — distance=${Math.round(total.distanceKm * 10) / 10}km  D+=${Math.round(total.ascentM / 10) * 10}m  D-=${Math.round(total.descentM / 10) * 10}m  jours=${total.days}`
);
