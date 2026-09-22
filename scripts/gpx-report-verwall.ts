/**
 * Analyse en lecture seule du GPX original Verwall
 * (data/gpx-sources/autriche-verwall-2024.original.gpx) pour recalculer
 * distance/D+/D-/altitudes par journée à partir des coupures temporelles
 * (segmentDays, confident=true) — voir docs/gpx-methodology.md.
 *
 * Ne modifie rien : `node --experimental-strip-types scripts/gpx-report-verwall.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { detectGaps } from "../src/lib/gpx/gaps.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { computeDayStats, computeGlobalStats, toCarnetDayStats } from "../src/lib/gpx/stats.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GPX_PATH = path.join(ROOT, "data/gpx-sources/autriche-verwall-2024.original.gpx");

const xml = fs.readFileSync(GPX_PATH, "utf8");
const data = parseGpx(xml);
const pts = data.tracks[0].segments.flat();
console.log(`Parsé : ${pts.length} points, premier=${pts[0].time}, dernier=${pts[pts.length - 1].time}`);
console.log(`Segments natifs (trkseg) : ${data.tracks[0].segments.length}`);

const gaps = detectGaps(pts, 15);
console.log("\n--- Écarts temporels (> 15 min), triés par durée ---");
for (const g of gaps.slice(0, 10)) {
  console.log(`  ${g.durationMin}min — ${g.fromTime} → ${g.toTime} — (${g.lat.toFixed(6)}, ${g.lon.toFixed(6)}) ele=${g.ele?.toFixed(0)} atSegBoundary=${g.atSegBoundary}`);
}

const { days, auto, confident } = segmentDays(pts, { minHours: 4, dominanceFactor: 2 });
console.log(`\n--- segmentDays --- auto=${auto}, confident=${confident}, ${days.length} jour(s)`);
const daysStats = days.map((d) => computeDayStats(d.points));
days.forEach((d, i) => {
  const pts2 = d.points;
  const s = daysStats[i];
  const r = toCarnetDayStats(s);
  console.log(
    `J${i + 1} — ${pts2.length} pts — ${s.startTime} → ${s.endTime} (${s.durationHours.toFixed(1)}h)\n` +
      `    start=(${pts2[0].lat.toFixed(6)}, ${pts2[0].lon.toFixed(6)})  end=(${pts2[pts2.length - 1].lat.toFixed(6)}, ${pts2[pts2.length - 1].lon.toFixed(6)})\n` +
      `    distance=${r.distanceKm}km  D+=${r.ascentM}m  D-=${r.descentM}m  alt=[${r.elevationMin}..${r.elevationMax}]m`
  );
});

const total = computeGlobalStats(daysStats);
console.log(`\nTOTAL — distance=${Math.round(total.distanceKm * 10) / 10}km  D+=${Math.round(total.ascentM / 10) * 10}m  D-=${Math.round(total.descentM / 10) * 10}m  jours=${total.days}`);
