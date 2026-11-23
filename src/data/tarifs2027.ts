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

/** Supplément par client au-delà du premier : +50 € du 2e au 6e client (6 clients maximum). */
export function supplement(clients: number): number {
  return Math.max(0, clients - 1) * 50;
}

export function dayRate(base: number, clients: number): number {
  return base + supplement(clients);
}

export const MAX_CLIENTS = 6;
export const clientCounts = Array.from({ length: MAX_CLIENTS }, (_, i) => i + 1);

/** Formats : 1 250 € (espace insécable fine, comme le reste du site). */
export const eur = (n: number) => `${n.toLocaleString("fr-FR").replace(/ | /g, " ")} €`;

/* ---- Exemples de budgets ----
 * Le forfait cabane non gardée est un forfait d'honoraires, nourriture
 * comprise : 50 € par nuit et par client, + 40 € par nuit pour le guide,
 * réparti entre les clients. Pique-niques : 15 € par jour et par client.
 * Refuges gardés : hypothèse de 120 € par nuit et par client en demi-pension,
 * 60 € par nuit pour le guide. Transport non compris. */

export const PIQUE_NIQUE = 15;
export const CABANE = { client: 50, guide: 40 };
export const REFUGE = { client: 120, guide: 60 };

export type Scenario = {
  id: string;
  title: string;
  categorie: string;
  tarifGuide: number;
  jours: number;
  nuits: number;
  clients: number[];
  note?: string;
};

export const scenarios: Scenario[] = [
  {
    id: "glaciaire-5j",
    title: "Raid glaciaire, 5 jours",
    categorie: "raid glaciaire",
    tarifGuide: 650,
    jours: 5,
    nuits: 4,
    clients: [5, 6],
  },
  {
    id: "alpes-7j",
    title: "Traversée des Alpes non glaciaire, 7 jours",
    categorie: "itinérance / raid à ski",
    tarifGuide: 600,
    jours: 7,
    nuits: 6,
    clients: [5, 6],
  },
];

export function budget(sc: Scenario, clients: number, formule: "cabane" | "refuge") {
  const honoraires = dayRate(sc.tarifGuide, clients) * sc.jours;
  const hebClients = (formule === "cabane" ? CABANE.client : REFUGE.client) * sc.nuits * clients;
  const hebGuide = (formule === "cabane" ? CABANE.guide : REFUGE.guide) * sc.nuits;
  const piqueNiques = PIQUE_NIQUE * sc.jours * clients;
  const total = honoraires + hebClients + hebGuide + piqueNiques;
  return { honoraires, hebClients, hebGuide, piqueNiques, total, parClient: total / clients };
}

/* ---- Vérification (montants recalculés à la main) ---- */
const attendu: Record<string, [number, number, number, number, number]> = {
  "glaciaire-5j/5/cabane": [4250, 1000, 160, 375, 5785],
  "glaciaire-5j/5/refuge": [4250, 2400, 240, 375, 7265],
  "glaciaire-5j/6/cabane": [4500, 1200, 160, 450, 6310],
  "glaciaire-5j/6/refuge": [4500, 2880, 240, 450, 8070],
  "alpes-7j/5/cabane": [5600, 1500, 240, 525, 7865],
  "alpes-7j/6/cabane": [5950, 1800, 240, 630, 8620],
  "alpes-7j/5/refuge": [5600, 3600, 360, 525, 10085],
  "alpes-7j/6/refuge": [5950, 4320, 360, 630, 11260],
};
for (const sc of scenarios)
  for (const n of sc.clients)
    for (const f of ["cabane", "refuge"] as const) {
      const b = budget(sc, n, f);
      const got = [b.honoraires, b.hebClients, b.hebGuide, b.piqueNiques, b.total];
      const exp = attendu[`${sc.id}/${n}/${f}`];
      if (JSON.stringify(got) !== JSON.stringify(exp)) throw new Error(`Tarifs 2027 : ${sc.id} ${n} ${f} ${got} ≠ ${exp}`);
    }

/* ---- Simulateur ----
 * Demi-pension indicative par nuit (vérifiée en ligne, nov. 2026) :
 *  - refuges français / italiens : 60 € client (FFCAM ~55 € public en 2026,
 *    CAI non-membre ~60 €) ;
 *  - refuges suisses : 100 € client (SAC non-membre CHF 70 à 100 ; + CHF 5
 *    non-membre et CHF 10 de réservation à partir de 2027).
 * Part du guide : la moitié du tarif client par défaut, modifiable. */
export const simulateur = {
  activites: [
    { id: "classique", label: "Journée classique", base: 550, max: 6 },
    { id: "itinerance", label: "Itinérance / raid à ski", base: 600, max: 6 },
    { id: "glaciaire", label: "Raid glaciaire / journée XL", base: 650, max: 6 },
    { id: "skialpi", label: "Ski-alpinisme / alpinisme", base: 650, max: 3 },
  ],
  hebergements: [
    { id: "cabane", label: "Cabane non gardée (forfait nourriture comprise)", client: CABANE.client, guide: CABANE.guide },
    { id: "frit", label: "Refuge gardé français ou italien (demi-pension)", client: 60, guide: 30 },
    { id: "ch", label: "Refuge gardé suisse (demi-pension)", client: 100, guide: 50 },
  ],
  piqueNique: PIQUE_NIQUE,
  supplementParClient: 50,
  maxClients: MAX_CLIENTS,
};
