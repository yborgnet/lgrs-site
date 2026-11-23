/**
 * Topo Chateleysine (Vallée d'Aoste) : 4 journées du GPX original
 * data/gpx-sources/italie-chateleysine-2024.original.gpx (29/01–01/02/2024),
 * découpées par segmentDays (méthode docs/gpx-methodology.md). Écrit la trace
 * dérivée public/gpx/topo-chateleysine-vallee-aoste.gpx et le profil
 * src/data/topos/chateleysine-vallee-aoste.profile.json.
 * `node --experimental-strip-types scripts/gpx-topo-chateleysine.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { computeDayStats, toCarnetDayStats, computeGlobalStats } from "../src/lib/gpx/stats.ts";
import { rdpSimplify } from "../src/lib/gpx/simplify.ts";
import { haversineMeters } from "../src/lib/gpx/geo.ts";

const ROOT = path.resolve(dirname(fileURLToPath(import.meta.url)), "..");
const d = parseGpx(fs.readFileSync(path.join(ROOT, "data/gpx-sources/italie-chateleysine-2024.original.gpx"), "utf8"));
const days = segmentDays(d.points, { minHours: 4, dominanceFactor: 2 }).days.map((x) => x.points);
const stats = days.map((p) => computeDayStats(p));
stats.forEach((s, i) => console.log(`J${i + 1}`, toCarnetDayStats(s), s.startTime, "→", s.endTime));
const g = computeGlobalStats(stats);
console.log("TOTAL", g.distanceKm.toFixed(2), g.ascentM.toFixed(0), g.descentM.toFixed(0));
const all = days.flat();
console.log("max", all.reduce((m, p) => ((p.ele ?? 0) > (m.ele ?? 0) ? p : m)));
const names = ["J1 → bivouac Penne Nere", "J2 Penne Nere → bivouac La Lliée", "J3 La Lliée → bivouac Rosaire et Clermont", "J4 Rosaire et Clermont → vallée de Saint-Barthélemy"];
const segs = days.map((p) => rdpSimplify(p, 5));
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="lesgrandsraidsaski.com" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Topo Chateleysine · traversée à ski, Vallée d'Aoste</name>
    <desc>Trace enregistrée du 29 janvier au 1er février 2024, simplifiée (RDP 5 m), une journée par trk. Informations indicatives — lesgrandsraidsaski.com/topos/chateleysine-vallee-aoste/</desc>
  </metadata>
${segs.map((pts, i) => `  <trk>
    <name>${names[i]}</name>
    <trkseg>
${pts.map((p) => `      <trkpt lat="${p.lat.toFixed(6)}" lon="${p.lon.toFixed(6)}"><ele>${p.ele?.toFixed(1)}</ele></trkpt>`).join("\n")}
    </trkseg>
  </trk>`).join("\n")}
</gpx>
`;
fs.writeFileSync(path.join(ROOT, "public/gpx/topo-chateleysine-vallee-aoste.gpx"), xml);
const prof: [number, number, number][] = [];
let km = 0;
days.forEach((dd, i) => {
  let last: any = null, acc = 1e9;
  dd.forEach((p, j) => {
    if (last) { const x = haversineMeters(last, p) / 1000; km += x; acc += x; }
    last = p;
    if (acc >= 0.08 || j === dd.length - 1) { prof.push([+km.toFixed(2), Math.round(p.ele ?? 0), i]); acc = 0; }
  });
});
fs.writeFileSync(path.join(ROOT, "src/data/topos/chateleysine-vallee-aoste.profile.json"), JSON.stringify(prof));
console.log(segs.map((s) => s.length).join("+"), Math.round(xml.length / 1000), "KB", prof.length, "pts profil");
