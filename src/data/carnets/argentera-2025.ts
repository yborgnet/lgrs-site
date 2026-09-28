import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { argentera2025Photos } from "../photos/argentera-2025";

/**
 * Segment 3 de la "Traversée des Alpes" (voir src/data/carnets/
 * alpesLigures.ts pour le segment 1, argentera-2024.ts pour le segment 2).
 * Confirmé par recoupement GPX : cette trace part de Roviera (Vinadio,
 * 44.2766,7.1389 — à 0,6 km du point d'arrivée du segment 2, continuité
 * quasi exacte d'une année sur l'autre) et se termine à Pontechianale,
 * dans le Val Varaita (44.6458,7.0008).
 *
 * PHOTOS (28/09/2026) : 37 JPEG + 1 GPX fournis par l'utilisateur dans
 * public/photos/Argentera-2025/ (dossier renommé depuis "TravAlpes#3", même
 * raison que le segment 2). Aucun EXIF ; seules 4/37 photos sont datables
 * par le nom de fichier — voir src/data/photos/argentera-2025.ts, avec en
 * particulier un piège signalé : 7 fichiers DSC portent un suffixe
 * "-2025-04-19t14-33-xx" qui est un horodatage d'export, pas de prise de
 * vue. 3 photos étaient pivotées à 90° (flag EXIF perdu) : corrigées en
 * place après vérification visuelle et confirmation explicite de
 * l'utilisateur.
 *
 * GPX ORIGINAL fourni par l'utilisateur (34354 points horodatés,
 * 7-11/04/2025) — archivé tel quel dans
 * data/gpx-sources/argentera-2025.original.gpx (copie identique conservée
 * dans public/photos/Argentera-2025/trace-gpx-originale.gpx, telle que
 * livrée). La trace affichée sur la carte (/gpx/argentera-2025.gpx) est une
 * version dérivée simplifiée (RDP, voir scripts/gpx-derive-argentera.ts),
 * jamais utilisée pour les calculs de distance/D+/D- ci-dessous. Découpage en 5
 * jours par coupures temporelles nettes (`segmentDays`, minHours=3,
 * confident=true), D+/D- lissés (fenêtre 9, seuil 2 m). Étapes nommées par
 * les hameaux confirmés à chaque jonction de jour (reverse-géocodage OSM,
 * écart <1 km) : Roviera, San Bernolfo, Gias del Piz (Pietraporzio),
 * Malboisset (Val-d'Oronaye, France), Maljasset (Saint-Paul-sur-Ubaye,
 * France), Pontechianale (Val Varaita, Italie).
 *
 * TOPONYMIE — aucun col précis confirmé par point GPX exact sur ce segment
 * (contrairement au segment 2, où Bassa del Claus et Colle Aver étaient
 * vérifiés) : croisement Camptocamp/Skitour col par col non fait dans
 * cette passe (zone alpine, requis par docs/gpx-methodology.md). Le texte
 * de chaque jour reste volontairement général sur les passages
 * intermédiaires plutôt que de nommer un col non confirmé — À VALIDER.
 *
 * RÉCIT : comme pour le segment 2, aucun texte narratif personnel de Yann
 * n'est disponible pour ce voyage — texte ci-dessous factuel uniquement,
 * sans anecdote inventée.
 */

const IMG = "/photos/Argentera-2025/";

const photo = (file: string): CarnetPhoto => {
  const meta = argentera2025Photos[file];
  return { src: `${IMG}${file}`, alt: meta.alt, width: meta.width, height: meta.height, caption: meta.caption };
};

const photos = {
  petitDejeunerAvantDepart: photo("ski-randonnee-traversees-alpes-italie-20250407-090516.jpg"),
  motManuscritRefuge: photo("ski-randonnee-traversees-alpes-italie-20250407-224816.jpg"),
  portraitDeuxCoequipiers: photo("ski-randonnee-traversees-alpes-italie-20250409-131918.jpg"),
  devantBarVillageArrivee: photo("ski-randonnee-traversees-alpes-italie-20250411-165811.jpg"),
  portraitPendantTransfert: photo("ski-randonnee-traversees-alpes-italie-dsc00096.jpg"),
  clairiereSousMelezes: photo("ski-randonnee-traversees-alpes-italie-dsc00132.jpg"),
  skieurSeulSurPente: photo("ski-randonnee-traversees-alpes-italie-dsc00151.jpg"),
  groupeCreteDegagee: photo("ski-randonnee-traversees-alpes-italie-dsc00166.jpg"),
  ascensionDeuxVersSommet: photo("ski-randonnee-traversees-alpes-italie-dsc00179.jpg"),
  progressionCielNuageux: photo("ski-randonnee-traversees-alpes-italie-dsc00202.jpg"),
  repasConvivialRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc00239.jpg"),
  monteePenteReguliere: photo("ski-randonnee-traversees-alpes-italie-dsc00275-2025-04-19t14-33-31-658.jpg"),
  progressionSurGlacier: photo("ski-randonnee-traversees-alpes-italie-dsc00299.jpg"),
  skisLevesAuSommet: photo("ski-randonnee-traversees-alpes-italie-dsc00323.jpg"),
  progressionCreteLointaine: photo("ski-randonnee-traversees-alpes-italie-dsc00416.jpg"),
  groupePlateauAltitude: photo("ski-randonnee-traversees-alpes-italie-dsc00444.jpg"),
  panoramaSousCielNuageux: photo("ski-randonnee-traversees-alpes-italie-dsc00482.jpg"),
  monteeSommetFrontalier: photo("ski-randonnee-traversees-alpes-italie-dsc00490-2025-04-19t14-33-36-238.jpg"),
  petitDejeunerRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc00505.jpg"),
  leverSoleilVallee: photo("ski-randonnee-traversees-alpes-italie-dsc00532.jpg"),
  tracesMonteeGlacier: photo("ski-randonnee-traversees-alpes-italie-dsc00588.jpg"),
  creteEffileeCielChangeant: photo("ski-randonnee-traversees-alpes-italie-dsc00594.jpg"),
  groupeLargeVallon: photo("ski-randonnee-traversees-alpes-italie-dsc00702-2025-04-19t14-33-36-066.jpg"),
  progressionMatinaleSommet: photo("ski-randonnee-traversees-alpes-italie-dsc00740.jpg"),
  panoramaSommetsFrontaliers: photo("ski-randonnee-traversees-alpes-italie-dsc00794.jpg"),
  pauseAvantDescente: photo("ski-randonnee-traversees-alpes-italie-dsc00820.jpg"),
  franchissementCol: photo("ski-randonnee-traversees-alpes-italie-dsc00825-2025-04-19t14-33-31-315.jpg"),
  panoramaValVaraita: photo("ski-randonnee-traversees-alpes-italie-dsc00844-2025-04-19t14-33-34-479.jpg"),
  descenteSurPenteEnsoleillee: photo("ski-randonnee-traversees-alpes-italie-dsc00853.jpg"),
  vallonEncadreSommets: photo("ski-randonnee-traversees-alpes-italie-dsc00881.jpg"),
  auPiedSommetPointu: photo("ski-randonnee-traversees-alpes-italie-dsc00890.jpg"),
  ravitaillementDevantRefuge: photo("ski-randonnee-traversees-alpes-italie-dsc00924.jpg"),
  traverseeTorrent: photo("ski-randonnee-traversees-alpes-italie-dsc00927.jpg"),
  reliefsHerbeEtNeige: photo("ski-randonnee-traversees-alpes-italie-dsc00952.jpg"),
  panoramaValVaraita2: photo("ski-randonnee-traversees-alpes-italie-dsc00961-2025-04-19t14-33-33-229.jpg"),
  sommetEffileDominantVallon: photo("ski-randonnee-traversees-alpes-italie-dsc00977.jpg"),
  derniereDescenteVersVillage: photo("ski-randonnee-traversees-alpes-italie-dsc00990-2025-04-19t14-33-39-147.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "5 jours. De Vinadio à Pontechianale.",
  intro:
    "Troisième segment de la traversée des Alpes en plusieurs étapes : de Vinadio, en Argentera, jusqu'au Val Varaita, en passant par le Val d'Oronaye et l'Ubaye, côté français.",
  days: [
    {
      dayNum: "J1",
      title: "Vinadio → San Bernolfo",
      text: "Départ de Roviera, sur la commune de Vinadio, vers le hameau de San Bernolfo.",
      distanceKm: 13.8,
      ascentM: 1440,
      descentM: 1070,
      elevationMin: 1280,
      elevationMax: 2470,
    },
    {
      dayNum: "J2",
      title: "San Bernolfo → Pietraporzio",
      text: "Traversée jusqu'au secteur de Gias del Piz, sur la commune de Pietraporzio, avec la journée la plus haute en altitude de ce segment.",
      distanceKm: 13.5,
      ascentM: 1730,
      descentM: 1240,
      elevationMin: 1640,
      elevationMax: 3000,
    },
    {
      dayNum: "J3",
      title: "Pietraporzio → Val-d'Oronaye",
      text: "Longue étape qui bascule côté français, jusqu'au hameau de Malboisset, sur la commune de Val-d'Oronaye.",
      distanceKm: 30.8,
      ascentM: 2030,
      descentM: 2510,
      elevationMin: 1680,
      elevationMax: 2810,
    },
    {
      dayNum: "J4",
      title: "Val-d'Oronaye → Maljasset",
      text: "Traversée dans la haute vallée de l'Ubaye jusqu'au hameau de Maljasset, sur la commune de Saint-Paul-sur-Ubaye.",
      distanceKm: 22.3,
      ascentM: 1940,
      descentM: 1710,
      elevationMin: 1680,
      elevationMax: 3130,
    },
    {
      dayNum: "J5",
      title: "Maljasset → Pontechianale",
      text: "Dernière étape, qui rebascule côté italien pour rejoindre le Val Varaita et le village de Pontechianale, où se termine ce troisième segment.",
      distanceKm: 22.0,
      ascentM: 1580,
      descentM: 1710,
      elevationMin: 1780,
      elevationMax: 3350,
    },
  ],
};

const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Du 7 au 11 avril 2025";

export const argentera2025: Carnet = {
  slug: "argentera-2025-traversee-ski-randonnee",
  seo: {
    title: "Argentera à ski 2025 : traversée de Vinadio à Pontechianale",
    description:
      "Cinq jours de traversée à ski entre le massif de l'Argentera et le Val Varaita, de Vinadio à Pontechianale — troisième segment de la traversée des Alpes en plusieurs étapes.",
    ogImage: photos.skisLevesAuSommet.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "GRANDE TRAVERSÉE DES ALPES À SKI",
    subtitle: "Segment #3 (Argentera & Ubaye)",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: photos.skisLevesAuSommet,
  intro: {
    heading: "Troisième segment de la traversée des Alpes",
    paragraphs: [
      "Un an après le segment 2, retour sur les mêmes lieux pour repartir de Roviera, exactement là où la traversée 2024 s'était arrêtée, et continuer vers le nord.",
      "Cinq jours de ski entre le massif de l'Argentera et le Val Varaita, avec une incursion côté français par le Val d'Oronaye et la haute vallée de l'Ubaye.",
    ],
    photo: photos.sommetEffileDominantVallon,
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Projet", value: "Traversée des Alpes — segment 3" },
      { label: "Pays", value: "Italie, France" },
      { label: "Massif", value: "Argentera, Ubaye, Val Varaita" },
      { label: "Départ", value: "Vinadio" },
      { label: "Arrivée", value: "Pontechianale" },
      { label: "Forme du raid", value: "Traversée de massif — voyage à ski en itinérance" },
      { label: "Hébergements", value: "Refuges et hameaux d'altitude" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Vinadio → Pontechianale",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/argentera-2025.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "Le troisième segment",
        paragraphs: [
          "Un an après l'Argentera 2024, la traversée des Alpes en segments reprend exactement là où elle s'était arrêtée : Roviera, sur la commune de Vinadio. Cinq nouveaux jours de ski, entre le massif de l'Argentera, une incursion côté français par l'Ubaye, et l'arrivée dans le Val Varaita, à Pontechianale.",
        ],
      },
    ],
    storyDays: [
      { day: "J1", route: itinerary.days[0].title, photos: [photos.petitDejeunerAvantDepart, photos.motManuscritRefuge] },
      { day: "J3", route: itinerary.days[2].title, photos: [photos.portraitDeuxCoequipiers] },
      { day: "J5", route: itinerary.days[4].title, photos: [photos.derniereDescenteVersVillage, photos.devantBarVillageArrivee] },
    ],
    closingLinks: [
      { label: "← Étape 2 de la traversée des Alpes en segments : l'Argentera, de Limone Piemonte à Vinadio", href: "/argentera-2024-traversee-ski-randonnee/" },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "GRANDE TRAVERSÉE DES ALPES À SKI",
    subtitle: "Segment #3 (Argentera & Ubaye)",
    meta: "Du 7 au 11 avril 2025 · 5 jours de traversée à ski, de Vinadio à Pontechianale · Photos : Yann Borgnet",
    photos: [
      // --- visibles au chargement ---
      photos.skisLevesAuSommet,
      photos.sommetEffileDominantVallon,
      photos.creteEffileeCielChangeant,
      photos.panoramaSommetsFrontaliers,
      photos.panoramaValVaraita,
      photos.leverSoleilVallee,
      photos.auPiedSommetPointu,
      photos.devantBarVillageArrivee,
      photos.groupePlateauAltitude,
      photos.franchissementCol,
      photos.ravitaillementDevantRefuge,
      photos.traverseeTorrent,
      photos.derniereDescenteVersVillage,
      photos.motManuscritRefuge,
      photos.portraitDeuxCoequipiers,
      photos.repasConvivialRefuge,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.petitDejeunerAvantDepart,
      photos.portraitPendantTransfert,
      photos.clairiereSousMelezes,
      photos.skieurSeulSurPente,
      photos.groupeCreteDegagee,
      photos.ascensionDeuxVersSommet,
      photos.progressionCielNuageux,
      photos.monteePenteReguliere,
      photos.progressionSurGlacier,
      photos.progressionCreteLointaine,
      photos.panoramaSousCielNuageux,
      photos.monteeSommetFrontalier,
      photos.petitDejeunerRefuge,
      photos.tracesMonteeGlacier,
      photos.groupeLargeVallon,
      photos.progressionMatinaleSommet,
      photos.pauseAvantDescente,
      photos.panoramaValVaraita2,
      photos.descenteSurPenteEnsoleillee,
      photos.vallonEncadreSommets,
      photos.reliefsHerbeEtNeige,
    ],
    initialPortfolioCount: 16,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

export const indexCover = photos.skisLevesAuSommet;
