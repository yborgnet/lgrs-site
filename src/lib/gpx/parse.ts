import type { GpxData, GpxPoint, GpxTrack, GpxWaypoint } from "./types.ts";

/**
 * Parseur GPX maison (regex), sans dépendance externe — même logique que le parseur
 * client de src/components/GpxMap.astro, mais côté Node/build (lecture de fichier,
 * pas de DOMParser navigateur), et complet : préserve trk/trkseg/timestamps/waypoints
 * au lieu de ne garder que lat/lon. Conçu pour des fichiers GPX 1.1 "standard"
 * (AlpineQuest, la plupart des exports de trace) ; si un fichier utilise une variante
 * exotique, il vaut mieux l'inspecter à la main que d'étendre ce regex à l'aveugle.
 */

const TRK_RE = /<trk\b[^>]*>([\s\S]*?)<\/trk>/g;
const TRK_NAME_RE = /<name>([\s\S]*?)<\/name>/;
const TRKSEG_RE = /<trkseg\b[^>]*>([\s\S]*?)<\/trkseg>/g;
const TRKPT_RE = /<trkpt\s+lat="([\d.\-]+)"\s+lon="([\d.\-]+)"\s*>([\s\S]*?)<\/trkpt>/g;
const WPT_RE = /<wpt\s+lat="([\d.\-]+)"\s+lon="([\d.\-]+)"\s*>([\s\S]*?)<\/wpt>/g;
const ELE_RE = /<ele>([\d.\-]+)<\/ele>/;
const TIME_RE = /<time>([^<]+)<\/time>/;
const NAME_RE = /<name>([\s\S]*?)<\/name>/;
const TYPE_RE = /<type>([\s\S]*?)<\/type>/;

function decodeXmlEntities(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'");
}

function parsePointBody(lat: number, lon: number, body: string, segIndex: number): GpxPoint {
  const eleMatch = ELE_RE.exec(body);
  const timeMatch = TIME_RE.exec(body);
  const time = timeMatch?.[1]?.trim();
  const t = time ? Date.parse(time) : undefined;
  return {
    lat,
    lon,
    ele: eleMatch ? Number(eleMatch[1]) : undefined,
    time,
    t: t !== undefined && Number.isFinite(t) ? t : undefined,
    segIndex,
  };
}

/** Parse le texte brut d'un fichier GPX en structure complète (tracks/segments/points + waypoints). */
export function parseGpx(xmlText: string): GpxData {
  const tracks: GpxTrack[] = [];
  const points: GpxPoint[] = [];

  let trkMatch: RegExpExecArray | null;
  TRK_RE.lastIndex = 0;
  let globalSegIndex = 0;

  while ((trkMatch = TRK_RE.exec(xmlText))) {
    const trkBody = trkMatch[1];
    const nameMatch = TRK_NAME_RE.exec(trkBody);
    const segments: GpxPoint[][] = [];

    let segMatch: RegExpExecArray | null;
    TRKSEG_RE.lastIndex = 0;
    while ((segMatch = TRKSEG_RE.exec(trkBody))) {
      const segBody = segMatch[1];
      const segPoints: GpxPoint[] = [];

      let ptMatch: RegExpExecArray | null;
      TRKPT_RE.lastIndex = 0;
      while ((ptMatch = TRKPT_RE.exec(segBody))) {
        const lat = Number(ptMatch[1]);
        const lon = Number(ptMatch[2]);
        if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
        const point = parsePointBody(lat, lon, ptMatch[3], globalSegIndex);
        segPoints.push(point);
        points.push(point);
      }

      segments.push(segPoints);
      globalSegIndex++;
    }

    tracks.push({ name: nameMatch ? decodeXmlEntities(nameMatch[1].trim()) : undefined, segments });
  }

  const waypoints: GpxWaypoint[] = [];
  let wptMatch: RegExpExecArray | null;
  WPT_RE.lastIndex = 0;
  while ((wptMatch = WPT_RE.exec(xmlText))) {
    const lat = Number(wptMatch[1]);
    const lon = Number(wptMatch[2]);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) continue;
    const body = wptMatch[3];
    const eleMatch = ELE_RE.exec(body);
    const nameMatch = NAME_RE.exec(body);
    const typeMatch = TYPE_RE.exec(body);
    waypoints.push({
      lat,
      lon,
      ele: eleMatch ? Number(eleMatch[1]) : undefined,
      name: nameMatch ? decodeXmlEntities(nameMatch[1].trim()) : undefined,
      type: typeMatch ? decodeXmlEntities(typeMatch[1].trim()) : undefined,
    });
  }

  return { tracks, waypoints, points };
}
