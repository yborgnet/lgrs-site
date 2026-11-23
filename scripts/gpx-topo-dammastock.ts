/**
 * Topo Dammastock : assemble les étapes des deux GPX originaux (2023 J1–J3,
 * 2025 J3–J4, 2025 J5 coupée à la fin du ski, point 6205), calcule les stats
 * par étape (méthode docs/gpx-methodology.md), écrit la trace dérivée
 * public/gpx/topo-dammastock-alpes-uranaises.gpx et le profil altimétrique
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
const load=(f:string)=>segmentDays(parseGpx(fs.readFileSync(R+f,"utf8")).points,{minHours:4,dominanceFactor:2}).days.map(d=>d.points);
const a=load("suisse-dammastock-2023.original.gpx"), b=load("suisse-titlis-dammastock-2025.original.gpx");
const END=6205;
const days=[a[0],a[1],a[2],b[2],b[3],b[4].slice(0,END+1)];
const stats=days.map(p=>computeDayStats(p));
stats.forEach((s,i)=>{const r=toCarnetDayStats(s);console.log(`J${i+1}`,r, s.startTime,"→",s.endTime);});
const g=computeGlobalStats(stats); console.log("TOTAL",g.distanceKm.toFixed(2),g.ascentM.toFixed(0),g.descentM.toFixed(0));
const all=days.flat(); const hi=all.reduce((m,p)=>(p.ele??0)>(m.ele??0)?p:m); console.log("max",hi);
console.log("end",days[5].at(-1));
// derived gpx (download + map), eps 5m
const segs=days.map(d=>rdpSimplify(d,5));
const names=["J1 Abfrutt → Salbithütte (2023)","J2 Salbithütte → Voralphütte (2023)","J3 Voralphütte → Steingletscher (2023)","J4 Steingletscher → Grassenbiwak (2025)","J5 Grassenbiwak → Spannorthütte (2025)","J6 Spannorthütte → Engelberg (2025)"];
const xml=`<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="lesgrandsraidsaski.com" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>Topo Dammastock · Une grande traversée des Alpes uranaises</name>
    <desc>Trace assemblée à partir de deux raids réels (avril 2023 : J1–J3 ; mars 2025 : J4–J6), simplifiée (RDP 5 m), une journée par trkseg. Sources : data/gpx-sources/suisse-dammastock-2023.original.gpx et suisse-titlis-dammastock-2025.original.gpx. Informations indicatives — lesgrandsraidsaski.com/topos/dammastock-alpes-uranaises/</desc>
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
