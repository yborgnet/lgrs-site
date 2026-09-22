/**
 * Analyse en lecture seule du GPX original Kosovo (data/gpx-sources/kosovo-montagnes-sar-2025.original.gpx)
 * pour recalculer distance/D+/D-/altitudes par journée à partir des 9 <trkseg> natifs
 * (un par jour, cf. AlpineQuest) — voir docs/gpx-methodology.md.
 *
 * Ne modifie rien : `node --experimental-strip-types scripts/gpx-report-kosovo.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { computeDayStats, computeGlobalStats, toCarnetDayStats } from "../src/lib/gpx/stats.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GPX_PATH = path.join(ROOT, "data/gpx-sources/kosovo-montagnes-sar-2025.original.gpx");

const xml = fs.readFileSync(GPX_PATH, "utf8");
const data = parseGpx(xml);
console.log(`Parsé : ${data.tracks.length} track(s), ${data.points.length} points, ${data.waypoints.length} waypoint(s)`);

const track = data.tracks[0];
console.log(`Segments natifs (trkseg) : ${track.segments.length}\n`);

const daysStats = track.segments.map((pts) => computeDayStats(pts));

track.segments.forEach((pts, i) => {
  const s = daysStats[i];
  const rounded = toCarnetDayStats(s);
  console.log(
    `J${i + 1} — ${pts.length} pts — ${s.startTime} → ${s.endTime} (${s.durationHours.toFixed(1)}h)\n` +
      `    distance=${rounded.distanceKm}km  D+=${rounded.ascentM}m  D-=${rounded.descentM}m  ` +
      `alt=[${rounded.elevationMin}..${rounded.elevationMax}]m  (raw D+=${Math.round(s.raw.ascentM)} D-=${Math.round(s.raw.descentM)})`
  );
});

const total = computeGlobalStats(daysStats);
console.log(
  `\nTOTAL — distance=${(Math.round(total.distanceKm * 10) / 10)}km  D+=${Math.round(total.ascentM / 10) * 10}m  D-=${Math.round(total.descentM / 10) * 10}m  jours=${total.days}`
);
