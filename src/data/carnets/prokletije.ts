import type { Carnet } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/traversee-prokletije-ski-montenegro/
 * (masthead WordPress : "MONTÉNÉGRO 2026" — le massif traversé, à cheval sur
 * trois pays, est le Prokletije).
 *
 * PHOTOS : passe photo pas encore faite — openingPhoto/intro.photo sont des
 * placeholders, portfolio vide. Aucune image WordPress
 * référencée (voir mémoire project_wordpress_migration).
 *
 * GPX : pas de GPX original téléchargeable sur WordPress — tracé lat/lon de
 * la carte interactive récupéré tel quel et resérialisé en `.gpx` minimal
 * (sans altitude ni horodatage, voir public/gpx/prokletije-montenegro-2026.gpx).
 * Les distances/D+/D- par jour, elles, SONT publiées par WordPress dans le
 * bloc Itinéraire (pas issues d'une analyse GPX) — reprises telles quelles
 * ci-dessous.
 */

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "8 jours. Une traversée des Prokletije.",
  intro:
    "De Vermosh au col de Čakor, une ligne à ski entre Albanie, Monténégro et Kosovo, à travers forêts, cols, villages et grandes combes.",
  days: [
    {
      dayNum: "J1",
      title: "Vermosh → Lëpushë",
      text: "Première entrée à ski dans les Prokletije, entre crêtes boisées et pentes du Maja e Grebenit.",
      distanceKm: 18.3,
      ascentM: 1010,
      descentM: 760,
    },
    {
      dayNum: "J2",
      title: "Lëpushë → Škala",
      text: "Passage par le Maja e Vajushë, puis recherche d'itinéraire à travers les forêts albanaises jusqu'au village de Škala.",
      distanceKm: 14.8,
      ascentM: 1120,
      descentM: 1260,
    },
    {
      dayNum: "J3",
      title: "Škala → Vusanje",
      text: "Cols, couloirs et forêts avant de basculer vers Vusanje et de retrouver le Monténégro.",
      distanceKm: 29.0,
      ascentM: 1240,
      descentM: 1330,
    },
    {
      dayNum: "J4",
      title: "Vusanje → Valbonë",
      text: "Traversée vers l'Albanie par le Maja e Rosit, à 2 522 m, puis longue descente vers Valbonë.",
      distanceKm: 25.9,
      ascentM: 1750,
      descentM: 1700,
    },
    {
      dayNum: "J5",
      title: "Valbonë → Çerem",
      text: "Entre combes ouvertes, pistes forestières et villages reculés du nord albanais.",
      distanceKm: 25.6,
      ascentM: 1650,
      descentM: 1570,
    },
    {
      dayNum: "J6",
      title: "Çerem → Gacaferi",
      text: "Longue étape sur la crête frontière jusqu'au refuge de Gacaferi, côté kosovar.",
      distanceKm: 28.8,
      ascentM: 1920,
      descentM: 1230,
    },
    {
      dayNum: "J7",
      title: "Gacaferi → Babino Polje",
      text: "Grands vallons et retour vers le Monténégro jusqu'au hameau isolé de Babino Polje.",
      distanceKm: 21.6,
      ascentM: 1380,
      descentM: 1780,
    },
    {
      dayNum: "J8",
      title: "Babino Polje → Čakor",
      text: "Passage par le Starac puis descente vers la route du col de Čakor, terme de la traversée.",
      distanceKm: 18.2,
      ascentM: 1210,
      descentM: 1230,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré (données publiées par
// WordPress jour par jour) — jamais recopiés en dur, voir totals.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Début mars 2026"; // "10 jours, dont 8 jours de ski, début mars 2026" (WordPress)

export const prokletije: Carnet = {
  slug: "traversee-prokletije-ski-montenegro",
  seo: {
    title: "Ski dans les Prokletije : Albanie, Monténégro et Kosovo",
    description:
      "Traversée à ski des Prokletije entre Albanie, Monténégro et Kosovo : forêts, villages isolés et itinérance de frontière en frontière.",
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "MONTÉNÉGRO",
    subtitle: "Une traversée des Prokletije",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: {
    src: "",
    alt: "Skieurs en traversée dans les Prokletije, entre Albanie, Monténégro et Kosovo",
    placeholder: true,
  },
  intro: {
    heading: "Les forêts des Prokletije",
    paragraphs: [
      "Nous entrons dans de profondes gorges, celles de la Cijevna, ou vallée du Cem. Au fond de celles-ci se trouvent les deux premiers villages de notre traversée des Prokletije : Lëpushë et Vermosh, à quelques encablures de la frontière monténégrine. Dans la nuit noire albanaise, tous les indices sont bons à prendre pour deviner la limite d'enneigement.",
      "Premiers contacts avec la forêt albanaise, identifiée dès la préparation comme l'une des grandes incertitudes de l'itinéraire. Au fil des jours, les Prokletije révèlent leurs contrastes : vallées encaissées, forêts parfois impénétrables, combes ouvertes, villages isolés et frontières que l'on franchit à ski.",
      "Entre Albanie, Monténégro et Kosovo, cette traversée est une ligne d'adaptation permanente, où l'itinéraire se construit autant sur la carte que sur le terrain.",
    ],
    photo: {
      src: "",
      alt: "Forêts et villages isolés des Prokletije, entre Albanie et Monténégro",
      placeholder: true,
    },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Albanie, Monténégro et Kosovo" },
      { label: "Massif", value: "Prokletije" },
      { label: "Départ", value: "Vermosh" },
      { label: "Arrivée", value: "Čakor" },
      { label: "Forme du raid", value: "Traversée de massif" },
      { label: "Hébergements", value: "Guest-houses" },
      { label: "Durée", value: formatDaysLabel(totals.days) },
      { label: "Distance", value: formatDistanceKm(totals.distanceKm) },
      { label: "D+", value: formatMeters(totals.ascentM) },
      { label: "D−", value: formatMeters(totals.descentM) },
    ],
  },
  map: {
    eyebrow: "La trace",
    title: "Vermosh → Čakor",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/prokletije-montenegro-2026.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    sections: [
      {
        heading: "D'Igoumenitsa aux Prokletije",
        paragraphs: [
          "On peut dire que ce nouveau voyage, enchaîné à la suite de la Grèce, a commencé à Igoumenitsa. Avec Aurélien, nous gagnons Saranda, Tirana puis Shkodër avant de traverser l'Albanie jusqu'aux profondes gorges de la Cijevna. Au fond de celles-ci se trouvent Lëpushë et Vermosh, les deux premiers villages de notre traversée des Prokletije.",
          "Dans la nuit albanaise, j'essaie de percevoir la limite d'enneigement. Plus nous montons, plus la neige apparaît sur les bas-côtés. Bonne nouvelle : elle est bien plus basse qu'en Grèce.",
        ],
      },
      {
        heading: "Vermosh et les forêts albanaises",
        paragraphs: [
          "À Vermosh, les maisons sont dispersées dans un large fond de vallée. Je craignais que les forêts soient trop denses pour skier. C'est en partie le cas. Nous nous déportons vers les pentes du Maja e Grebenit, dont la descente suit une crête plus ouverte. La neige, juste décaillée, est excellente.",
          "Le lendemain, depuis Lëpushë, nous montons au Maja e Vajushë. La pente sud nous attire et nous modifions l'itinéraire. Plus bas, les forêts nous rappellent rapidement qu'ici la carte ne suffit jamais : couloirs, barres, hêtres serrés et passages où il faut déchausser.",
        ],
      },
      {
        heading: "Škala, Vusanje et le Maja e Rosit",
        paragraphs: [
          "Depuis Škala, nous retrouvons les cols et les grands couloirs qui permettent de basculer vers Vusanje, au Monténégro. La vallée est plus ouverte et le printemps y est déjà installé. Puis nous repartons avant l'aurore vers le Maja e Rosit, à 2 522 m.",
          "Un orage éclate alors que nous remontons. La visibilité revient ensuite, et une excellente neige de printemps nous accompagne vers Valbonë. Le potentiel de ski de randonnée est immense dans ces montagnes.",
        ],
      },
      {
        heading: "Valbonë, Çerem et Gacaferi",
        paragraphs: [
          "De Valbonë à Çerem, puis jusqu'à Gacaferi, l'itinérance alterne grandes combes, forêts parfois infranchissables et villages isolés. À Gacaferi, côté kosovar, le refuge marque une nouvelle étape de cette ligne qui joue sans cesse avec les frontières.",
        ],
      },
      {
        heading: "Babino Polje et Čakor",
        paragraphs: [
          "La longue vallée de Babino Polje nous ramène vers le Monténégro. Le dernier jour, nous gagnons le Starac puis descendons vers la route du col de Čakor, point de départ historique de grands raids à ski dans les Balkans.",
          "Une chute provoque une luxation d'épaule à Damien et la fin du voyage se transforme une dernière fois en adaptation. Police, taxi, Durrës, ferry, Italie : la traversée se referme comme elle avait commencé, par une longue chaîne logistique.",
        ],
      },
    ],
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};
