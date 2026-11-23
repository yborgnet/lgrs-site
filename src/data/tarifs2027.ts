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
    clients: [5],
    note: "Raid glaciaire : 5 participants maximum, l’exemple n’est donc donné que pour 5 clients.",
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
