/**
 * Produit les traces dérivées pour la carte web (public/gpx/argentera-202X.gpx,
 * simplifiées RDP) à partir des GPX originaux archivés dans data/gpx-sources/,
 * suivant strictement docs/gpx-methodology.md (jamais de recalcul de distance/
 * D+/D- sur la version simplifiée — seulement l'affichage carte).
 * `node scripts/gpx-derive-argentera.ts`
 */
import fs from "node:fs";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { rdpSimplifyByDay, toGpxXml } from "../src/lib/gpx/simplify.ts";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const EPSILON_M = 4;

for (const [label, name] of [
  ["2024", "argentera-2024"],
  ["2025", "argentera-2025"],
]) {
  const srcPath = path.join(ROOT, `data/gpx-sources/${name}.original.gpx`);
  const xml = fs.readFileSync(srcPath, "utf8");
  const data = parseGpx(xml);
  const { days } = segmentDays(data.points, { minHours: 3 });
  const daysPoints = days.map((d) => d.points);
  const simplified = rdpSimplifyByDay(daysPoints, EPSILON_M);
  const outXml = toGpxXml(simplified, {
    name: `Argentera ${label}`,
    desc: `Trace dérivée (simplifiée RDP epsilon=${EPSILON_M}m) — voir data/gpx-sources/${name}.original.gpx pour la trace complète`,
    creator: "lesgrandsraidsaski.com",
  });
  const outPath = path.join(ROOT, `public/gpx/${name}.gpx`);
  fs.writeFileSync(outPath, outXml);
  console.log(`${name}: ${data.points.length} pts -> ${simplified.length} pts simplifiés, écrit dans ${path.relative(ROOT, outPath)}`);
}
