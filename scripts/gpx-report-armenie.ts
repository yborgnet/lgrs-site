/**
 * Calcule distance/D+/D- exacts par segment GPX natif pour le voyage Arménie.
 *
 * Chaque <trkseg> du fichier = une portion réellement skiée (confirmé avec Yann :
 * les trous entre segments sont des transferts taxi/véhicule, jamais à combler —
 * voir docs/gpx-methodology.md). Pas de détection automatique de coupures ici :
 * on utilise directement les 7 <trkseg> natifs du fichier.
 *
 * Lecture seule : n'écrit rien. `node scripts/gpx-report-armenie.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { computeDayStats, toCarnetDayStats } from "../src/lib/gpx/stats.ts";
import { haversineMeters } from "../src/lib/gpx/geo.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const GPX_PATH = path.join(ROOT, "public/gpx/armenie-sevan-aragats-2027.gpx");

const xml = fs.readFileSync(GPX_PATH, "utf8");
const data = parseGpx(xml);
const track = data.tracks[0];

console.log(`Track: ${track.name} — ${track.segments.length} segments, ${data.points.length} points\n`);

// Trace planifiée AlpineQuest (élévation échantillonnée sur un MNT le long du tracé
// dessiné), PAS un enregistrement GPS/baro dense : espacement moyen ~130 m entre
// points (vs quelques mètres sur les carnets enregistrés type Bernina). Le lissage
// par défaut (fenêtre 9 pts ≈ ~1 km) gommerait du vrai relief, pas du bruit capteur
// (voir écart raw/lissé ci-dessous, jusqu'à 35-40%). On applique donc un seuil léger
// (pas de moyenne glissante, hystérésis 3 m) pour n'ignorer que la quantification du
// MNT, sans aplatir le relief réel — choix documenté ici, voir docs/gpx-methodology.md.
const LIGHT_SMOOTHING = { window: 1, noiseThresholdM: 3 };

track.segments.forEach((seg, i) => {
  const stats = computeDayStats(seg);
  const light = computeDayStats(seg, LIGHT_SMOOTHING);
  const rounded = toCarnetDayStats(light);
  console.log(
    `seg${i + 1}: ${seg.length} pts  ${rounded.distanceKm.toFixed(1)} km  D+ ${rounded.ascentM} m  D- ${rounded.descentM} m  alt [${rounded.elevationMin}-${rounded.elevationMax}]  (lissage défaut D+${Math.round(stats.ascentM)}/D-${Math.round(stats.descentM)}, raw D+${Math.round(stats.raw.ascentM)}/D-${Math.round(stats.raw.descentM)})`
  );
  const first = seg[0];
  const last = seg[seg.length - 1];
  console.log(`   start=(${first.lat.toFixed(4)},${first.lon.toFixed(4)})  end=(${last.lat.toFixed(4)},${last.lon.toFixed(4)})`);
});

console.log("\n--- écarts (transferts) entre segments ---");
for (let i = 1; i < track.segments.length; i++) {
  const prevEnd = track.segments[i - 1][track.segments[i - 1].length - 1];
  const nextStart = track.segments[i][0];
  const gapM = haversineMeters(prevEnd, nextStart);
  console.log(`  seg${i} -> seg${i + 1}: ${(gapM / 1000).toFixed(2)} km`);
}

const totalDistance = track.segments.reduce((sum, seg) => sum + computeDayStats(seg).distanceKm, 0);
const totalAscent = track.segments.reduce((sum, seg) => sum + computeDayStats(seg, LIGHT_SMOOTHING).ascentM, 0);
const totalDescent = track.segments.reduce((sum, seg) => sum + computeDayStats(seg, LIGHT_SMOOTHING).descentM, 0);
console.log(`\nTotal ski (7 segments) : ${totalDistance.toFixed(1)} km  D+ ${Math.round(totalAscent)} m  D- ${Math.round(totalDescent)} m`);
