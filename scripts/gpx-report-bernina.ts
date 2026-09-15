/**
 * Test de non-régression de l'outillage GPX (src/lib/gpx) contre le carnet Bernina,
 * déjà validé visuellement et commité (src/data/carnets/bernina.ts).
 *
 * Objectif : vérifier que l'outil générique, appliqué au GPX ORIGINAL archivé
 * (data/gpx-sources/bernina-tour-massif-2026.original.gpx), reproduit bien :
 *   1. le même découpage en 4 journées (détection automatique des coupures) ;
 *   2. les mêmes distance / D+ / D- par journée et au global.
 *
 * Ce script ne modifie RIEN dans src/data/carnets/bernina.ts ni ailleurs : c'est un
 * contrôle en lecture seule, à lancer avec `node scripts/gpx-report-bernina.ts`.
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { computeDayStats, computeGlobalStats, toCarnetDayStats } from "../src/lib/gpx/stats.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const GPX_PATH = path.join(ROOT, "data/gpx-sources/bernina-tour-massif-2026.original.gpx");

// Valeurs actuellement dans src/data/carnets/bernina.ts (validées visuellement, commit 8e976ae).
const EXPECTED_DAYS = [
  { dayNum: "J1", distanceKm: 10.9, ascentM: 850, descentM: 1330, elevationMin: 2380, elevationMax: 3320 },
  { dayNum: "J2", distanceKm: 21.1, ascentM: 2220, descentM: 1540, elevationMin: 2400, elevationMax: 3360 },
  { dayNum: "J3", distanceKm: 25.4, ascentM: 2600, descentM: 2250, elevationMin: 2880, elevationMax: 4060 },
  { dayNum: "J4", distanceKm: 14.5, ascentM: 730, descentM: 2180, elevationMin: 2090, elevationMax: 3900 },
];
const EXPECTED_TOTAL = { distanceKm: 71.9, ascentM: 6400, descentM: 7300, days: 4 };

function fmt(n: number, digits = 1): string {
  return n.toFixed(digits);
}

function checkRow(label: string, expected: number, actual: number, tolerance: number): boolean {
  const diff = Math.abs(expected - actual);
  const pass = diff <= tolerance;
  console.log(
    `    ${pass ? "OK  " : "ECART"}  ${label.padEnd(14)} attendu=${fmt(expected)}  calculé=${fmt(actual)}  écart=${fmt(diff)}${pass ? "" : "  <-- au-delà de la tolérance ±" + tolerance}`
  );
  return pass;
}

console.log("=== Test outillage GPX générique (src/lib/gpx) sur Bernina ===\n");
console.log(`Lecture : ${path.relative(ROOT, GPX_PATH)}`);

const xml = fs.readFileSync(GPX_PATH, "utf8");
const data = parseGpx(xml);
console.log(`Parsé : ${data.tracks.length} track(s), ${data.points.length} points, ${data.waypoints.length} waypoint(s)\n`);

console.log("--- 1. Découpage automatique en journées ---");
const { days, auto, confident } = segmentDays(data.points, { minHours: 4, dominanceFactor: 2 });
console.log(`Détection auto : ${auto ? "oui" : "non"} | confiance : ${confident ? "oui" : "non"} | jours trouvés : ${days.length}\n`);

let allPass = true;

if (days.length !== EXPECTED_DAYS.length) {
  console.log(`  ECART  nombre de jours attendu=${EXPECTED_DAYS.length} trouvé=${days.length}`);
  allPass = false;
} else {
  console.log(`  OK    nombre de jours = ${days.length} (conforme)`);
}

console.log("\n--- 2. Distance / D+ / D- par journée (lissage défaut : fenêtre 9, seuil 2m) ---\n");

const daysStats = days.map((d) => computeDayStats(d.points));

days.forEach((day, i) => {
  const expected = EXPECTED_DAYS[i];
  if (!expected) return;
  const stats = daysStats[i];
  const rounded = toCarnetDayStats(stats);
  console.log(`  ${expected.dayNum} (${day.points.length} points, ${stats.durationHours.toFixed(1)}h) :`);
  allPass = checkRow("distance (km)", expected.distanceKm, rounded.distanceKm, 0.15) && allPass;
  allPass = checkRow("D+ (m)", expected.ascentM, rounded.ascentM, 40) && allPass;
  allPass = checkRow("D- (m)", expected.descentM, rounded.descentM, 40) && allPass;
  allPass = checkRow("alt. min (m)", expected.elevationMin, rounded.elevationMin, 20) && allPass;
  allPass = checkRow("alt. max (m)", expected.elevationMax, rounded.elevationMax, 20) && allPass;
  console.log();
});

console.log("--- 3. Totaux globaux ---\n");
const total = computeGlobalStats(daysStats);
allPass = checkRow("distance totale (km)", EXPECTED_TOTAL.distanceKm, Math.round(total.distanceKm * 10) / 10, 0.2) && allPass;
allPass = checkRow("D+ total (m)", EXPECTED_TOTAL.ascentM, Math.round(total.ascentM / 10) * 10, 60) && allPass;
allPass = checkRow("D- total (m)", EXPECTED_TOTAL.descentM, Math.round(total.descentM / 10) * 10, 60) && allPass;

console.log(`\n=== Résultat global : ${allPass ? "TOUT CONFORME (dans la tolérance)" : "ÉCARTS À EXAMINER"} ===`);
