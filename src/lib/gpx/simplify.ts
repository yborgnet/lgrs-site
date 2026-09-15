import type { GpxPoint } from "./types.ts";

/**
 * Simplification Ramer–Douglas–Peucker (projection équirectangulaire locale — approximation
 * suffisante à l'échelle d'un massif). Sert uniquement à produire la trace AFFICHÉE sur la
 * carte web (`public/gpx/*.gpx`) : les calculs de distance/D+/D- se font toujours sur la
 * trace ORIGINALE, jamais sur cette version simplifiée (voir docs/gpx-methodology.md).
 */
function toLocalXY(p: { lat: number; lon: number }, lat0: number): [number, number] {
  const R = 6371000;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const x = R * toRad(p.lon) * Math.cos(toRad(lat0));
  const y = R * toRad(p.lat);
  return [x, y];
}

function perpendicularDistance(pt: [number, number], a: [number, number], b: [number, number]): number {
  const [x, y] = pt;
  const [x1, y1] = a;
  const [x2, y2] = b;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(x - x1, y - y1);
  let t = ((x - x1) * dx + (y - y1) * dy) / len2;
  t = Math.max(0, Math.min(1, t));
  const px = x1 + t * dx;
  const py = y1 + t * dy;
  return Math.hypot(x - px, y - py);
}

export function rdpSimplify(points: GpxPoint[], epsilonMeters: number): GpxPoint[] {
  if (points.length < 3) return points;
  const lat0 = points[0].lat;
  const xy = points.map((p) => toLocalXY(p, lat0));

  function simplifySection(start: number, end: number): number[] {
    let maxDist = 0;
    let idx = -1;
    for (let i = start + 1; i < end; i++) {
      const d = perpendicularDistance(xy[i], xy[start], xy[end]);
      if (d > maxDist) {
        maxDist = d;
        idx = i;
      }
    }
    if (maxDist > epsilonMeters && idx !== -1) {
      const left = simplifySection(start, idx);
      const right = simplifySection(idx, end);
      return [...left.slice(0, -1), ...right];
    }
    return [start, end];
  }

  return simplifySection(0, points.length - 1).map((i) => points[i]);
}

/** Simplifie chaque journée séparément avant de réassembler — préserve les points de
 *  coupure jour/jour exacts (jamais lissés entre deux journées adjacentes). */
export function rdpSimplifyByDay(daysPoints: GpxPoint[][], epsilonMeters: number): GpxPoint[] {
  return daysPoints.flatMap((day) => rdpSimplify(day, epsilonMeters));
}

/** Exporte un tableau de points en GPX 1.1 minimal (un seul trk/trkseg). */
export function toGpxXml(points: GpxPoint[], meta: { name: string; desc: string; creator: string }): string {
  const trkpts = points
    .map((p) => {
      const ele = p.ele !== undefined ? `<ele>${p.ele.toFixed(1)}</ele>` : "";
      const time = p.time ? `<time>${p.time}</time>` : "";
      return `      <trkpt lat="${p.lat}" lon="${p.lon}">${ele}${time}</trkpt>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="${meta.creator}" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <desc>${meta.desc}</desc>
  </metadata>
  <trk>
    <name>${meta.name}</name>
    <trkseg>
${trkpts}
    </trkseg>
  </trk>
</gpx>
`;
}
