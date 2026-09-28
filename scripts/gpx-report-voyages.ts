/**
 * Aperçu rapide (lecture seule) des segments GPX natifs pour les voyages qui ont déjà
 * un `gpx` câblé : nombre de segments, distance/D+/D- par segment (hystérésis légère,
 * cohérente avec l'analyse Arménie — traces planifiées échantillonnées sur MNT, pas des
 * enregistrements GPS/baro denses), et écarts entre segments (candidats "transfert").
 * `node scripts/gpx-report-voyages.ts <fichier.gpx>`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { computeDayStats, toCarnetDayStats } from "../src/lib/gpx/stats.ts";
import { haversineMeters } from "../src/lib/gpx/geo.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const LIGHT_SMOOTHING = { window: 1, noiseThresholdM: 3 };

const file = process.argv[2];
if (!file) {
  console.error("usage: node scripts/gpx-report-voyages.ts <public/gpx/xxx.gpx>");
  process.exit(1);
}

const xml = fs.readFileSync(path.join(ROOT, file), "utf8");
const data = parseGpx(xml);

data.tracks.forEach((track, ti) => {
  console.log(`\nTrack ${ti + 1}: ${track.name ?? "(sans nom)"} — ${track.segments.length} segments`);
  track.segments.forEach((seg, i) => {
    const light = computeDayStats(seg, LIGHT_SMOOTHING);
    const rounded = toCarnetDayStats(light);
    const first = seg[0];
    const last = seg[seg.length - 1];
    console.log(
      `  seg${i + 1}: ${seg.length} pts  ${rounded.distanceKm.toFixed(1)} km  D+ ${rounded.ascentM} m  D- ${rounded.descentM} m  start=(${first.lat.toFixed(4)},${first.lon.toFixed(4)}) end=(${last.lat.toFixed(4)},${last.lon.toFixed(4)})`
    );
    if (i > 0) {
      const prevEnd = track.segments[i - 1][track.segments[i - 1].length - 1];
      const gapM = haversineMeters(prevEnd, first);
      console.log(`     écart avec segment précédent: ${(gapM / 1000).toFixed(2)} km`);
    }
  });
});
