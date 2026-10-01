/**
 * Produit la trace dérivée pour la carte web (public/gpx/dammastock-2023.gpx,
 * simplifiée RDP, un <trkseg> par journée) à partir du GPX original archivé
 * dans data/gpx-sources/suisse-dammastock-2023.original.gpx — voir
 * docs/gpx-methodology.md. Ne sert qu'à l'affichage : distances et dénivelés
 * se calculent toujours sur l'original (scripts/gpx-report-dammastock-2023.ts).
 * `node --experimental-strip-types scripts/gpx-derive-dammastock-2023.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { rdpSimplify } from "../src/lib/gpx/simplify.ts";

const ROOT = path.resolve(dirname(fileURLToPath(import.meta.url)), "..");
const EPSILON_M = 6;

const data = parseGpx(fs.readFileSync(path.join(ROOT, "data/gpx-sources/suisse-dammastock-2023.original.gpx"), "utf8"));
const { days } = segmentDays(data.points, { minHours: 4, dominanceFactor: 2 });
const segs = days.map((d) => rdpSimplify(d.points, EPSILON_M));
const body = segs
  .map(
    (pts) =>
      `    <trkseg>\n${pts
        .map((p) => `      <trkpt lat="${p.lat}" lon="${p.lon}"><ele>${p.ele?.toFixed(1)}</ele></trkpt>`)
        .join("\n")}\n    </trkseg>`
  )
  .join("\n");
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="lesgrandsraidsaski.com" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <desc>Trace dérivée (simplifiée RDP epsilon=${EPSILON_M}m, une journée par segment) — voir data/gpx-sources/suisse-dammastock-2023.original.gpx pour la trace originale.</desc>
  </metadata>
  <trk>
    <name>Dammastock, traversée du massif (2023)</name>
${body}
  </trk>
</gpx>
`;
fs.writeFileSync(path.join(ROOT, "public/gpx/dammastock-2023.gpx"), xml);
console.log(segs.map((s) => s.length).join(" + "), "pts ->", Math.round(xml.length / 1000), "KB");
