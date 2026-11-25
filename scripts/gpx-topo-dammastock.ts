/**
 * Topo Dammastock : trace fusionnée fournie par Yann (nov. 2026),
 * data/gpx-sources/suisse-dammastock-2023-2025-fusion.original.gpx
 * (« Dammastock 2023 → Grassenbiwak → Engelberg 2025 » : J1–J4 trace 2023,
 * J5–J6 trace 2025). Découpage en journées, stats par étape (méthode
 * docs/gpx-methodology.md). J6 coupée à la fin du parcours à ski : la fin de la
 * trace est un trajet motorisé (> 25 km/h à ~1 060 m, à ~4 km d'Engelberg).
 * Écrit public/gpx/topo-dammastock-alpes-uranaises.gpx et le profil
 * src/data/topos/dammastock-alpes-uranaises.profile.json.
 * `node --experimental-strip-types scripts/gpx-topo-dammastock.ts`
 */
import fs from "node:fs";
import { parseGpx } from "../src/lib/gpx/parse.ts";
import { segmentDays } from "../src/lib/gpx/segment.ts";
import { computeDayStats, toCarnetDayStats, computeGlobalStats } from "../src/lib/gpx/stats.ts";
import { rdpSimplify } from "../src/lib/gpx/simplify.ts";
import { haversineMeters } from "../src/lib/gpx/geo.ts";
import path, { dirname } from "node:path";
import { fileURLToPath } from "node:url";
const ROOT = path.resolve(dirname(fileURLToPath(import.meta.url)), "..");
const R = path.join(ROOT, "data/gpx-sources/");
const all0=parseGpx(fs.readFileSync(R+"suisse-dammastock-2023-2025-fusion.original.gpx","utf8")).points;
const d=segmentDays(all0,{minHours:4,dominanceFactor:2}).days.map(x=>x.points);
// fin du ski : premier point de J6 après lequel la vitesse moyenne sur 10 points dépasse 20 km/h sous 1 100 m
const j6=d[5]; let END=j6.length-1;
for(let i=0;i+10<j6.length;i++){const v=haversineMeters(j6[i],j6[i+10])/Math.max((j6[i+10].t-j6[i].t)/1000,1)*3.6; if((j6[i].ele??9999)<1100&&v>20){END=i;break;}}
const days=[d[0],d[1],d[2],d[3],d[4],j6.slice(0,END+1)];
const stats=days.map(p=>computeDayStats(p));
stats.forEach((s,i)=>{const r=toCarnetDayStats(s);console.log(`J${i+1}`,r, s.startTime,"→",s.endTime);});
const g=computeGlobalStats(stats); console.log("TOTAL",g.distanceKm.toFixed(2),g.ascentM.toFixed(0),g.descentM.toFixed(0));
const all=days.flat(); const hi=all.reduce((m,p)=>(p.ele??0)>(m.ele??0)?p:m); console.log("max",hi);
console.log("end",days[5].at(-1));
// derived gpx (download + map), eps 5m
const segs=days.map(d=>rdpSimplify(d,5));
const names=["J1 Abfrutt → Salbithütte (2023)","J2 Salbithütte → Voralphütte (2023)","J3 Voralphütte → Steingletscher (2023)","J4 Steingletscher → Grassenbiwak (2023)","J5 Grassenbiwak → Spannorthütte (2025)","J6 Spannorthütte → Engelberg (2025)"];
const xml=`<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="lesgrandsraidsaski.com" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Topo Dammastock · Une grande traversée des Alpes uranaises</name>
    <desc>Trace assemblée à partir de deux raids réels (avril 2023 : J1–J4 ; mars 2025 : J5–J6), simplifiée (RDP 5 m), une journée par trkseg. Source : data/gpx-sources/suisse-dammastock-2023-2025-fusion.original.gpx. Informations indicatives — lesgrandsraidsaski.com/topos/dammastock-alpes-uranaises/</desc>
    <link href="https://lesgrandsraidsaski.com/topos/dammastock-alpes-uranaises/"><text>Les Grands Raids à Ski</text></link>
  </metadata>
${segs.map((pts,i)=>`  <trk>
    <name>${names[i]}</name>
    <trkseg>
${pts.map(p=>`      <trkpt lat="${p.lat.toFixed(6)}" lon="${p.lon.toFixed(6)}"><ele>${p.ele?.toFixed(1)}</ele></trkpt>`).join("\n")}
    </trkseg>
  </trk>`).join("\n")}
</gpx>
`;
fs.writeFileSync(path.join(ROOT, "public/gpx/topo-dammastock-alpes-uranaises.gpx"),xml);
console.log(segs.map(s=>s.length).join("+"), Math.round(xml.length/1000),"KB");
// profile data: cumulative km, ele, sampled ~ every 100m
const prof:any[]=[]; let km=0; days.forEach((d,i)=>{ let last:any=null; let acc=1e9; d.forEach((p,j)=>{ if(last) {const dd=haversineMeters(last,p)/1000; km+=dd; acc+=dd;} last=p; if(acc>=0.1||j===d.length-1){prof.push([+km.toFixed(2),Math.round(p.ele??0),i]); acc=0;} }); });
fs.writeFileSync(path.join(ROOT, "src/data/topos/dammastock-alpes-uranaises.profile.json"),JSON.stringify(prof)); console.log("profile pts",prof.length, km.toFixed(2));
