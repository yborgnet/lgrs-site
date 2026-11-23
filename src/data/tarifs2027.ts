/** Grille tarifaire 2027 du guide (brief « Mise à jour des tarifs 2027 »).
 *  Tous les montants affichés sur /tarifs/ sont CALCULÉS ici à partir des
 *  paramètres ci-dessous, puis vérifiés contre les montants du brief
 *  (assertions en bas de fichier : le build échoue en cas d'écart). */

export const categories = [
  { id: "classique", label: "Journée classique", base: 550, prefix: "" },
  { id: "itinerance", label: "Journée itinérance / raid à ski", base: 600, prefix: "" },
  {
    id: "xl",
    label: "Journée XL (+ 1 700 m D+), ski-alpinisme, alpinisme, raid glaciaire ou course tarifée",
    shortLabel: "XL, ski-alpinisme, alpinisme, raid glaciaire",
    base: 650,
    prefix: "à partir de ",
  },
] as const;

/** Supplément par client au-delà du premier : +50 € du 2e au 6e, +100 € pour les 7e et 8e. */
export function supplement(clients: number): number {
  let s = 0;
  for (let n = 2; n <= clients; n++) s += n <= 6 ? 50 : 100;
  return s;
}

export function dayRate(base: number, clients: number): number {
  return base + supplement(clients);
}

export const MAX_CLIENTS = 8;
export const clientCounts = Array.from({ length: MAX_CLIENTS }, (_, i) => i + 1);

/** Formats : 1 250 € (espace insécable fine, comme le reste du site). */
export const eur = (n: number) => `${n.toLocaleString("fr-FR").replace(/ | /g, " ")} €`;

/* ---- Exemples : raid glaciaire de 4 jours ---- */

export const exemple = {
  jours: 4,
  nuits: 3,
  tarifGuide: 650,
  piqueNique: 15,
  cabane: { nourritureClient: 50, nourritureGuide: 40 },
  refuge: { client: 120, guide: 60 },
};

export function budgetCabane(clients: number) {
  const honoraires = dayRate(exemple.tarifGuide, clients) * exemple.jours;
  const nourritureClients = exemple.cabane.nourritureClient * exemple.nuits * clients;
  const nourritureGuide = exemple.cabane.nourritureGuide * exemple.nuits;
  const piqueNiques = exemple.piqueNique * exemple.jours * clients;
  const total = honoraires + nourritureClients + nourritureGuide + piqueNiques;
  return { honoraires, nourritureClients, nourritureGuide, piqueNiques, total, parClient: total / clients };
}

export function budgetRefuge(clients: number) {
  const honoraires = dayRate(exemple.tarifGuide, clients) * exemple.jours;
  const refugesClients = exemple.refuge.client * exemple.nuits * clients;
  const refugesGuide = exemple.refuge.guide * exemple.nuits;
  const piqueNiques = exemple.piqueNique * exemple.jours * clients;
  const total = honoraires + refugesClients + refugesGuide + piqueNiques;
  return { honoraires, refugesClients, refugesGuide, piqueNiques, total, parClient: total / clients };
}

/* ---- Vérification contre les montants du brief ---- */

const attendu = {
  cabane: {
    3: [3000, 450, 120, 180, 3750, 1250],
    4: [3200, 600, 120, 240, 4160, 1040],
  },
  refuge: {
    3: [3000, 1080, 180, 180, 4440, 1480],
    4: [3200, 1440, 180, 240, 5060, 1265],
  },
} as const;

for (const n of [3, 4] as const) {
  const c = Object.values(budgetCabane(n));
  const r = Object.values(budgetRefuge(n));
  if (JSON.stringify(c) !== JSON.stringify(attendu.cabane[n]))
    throw new Error(`Tarifs 2027 : budget cabane ${n} clients ${c} ≠ ${attendu.cabane[n]}`);
  if (JSON.stringify(r) !== JSON.stringify(attendu.refuge[n]))
    throw new Error(`Tarifs 2027 : budget refuge ${n} clients ${r} ≠ ${attendu.refuge[n]}`);
}
