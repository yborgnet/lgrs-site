/** Formulaire de renseignements personnels intégré au site (/renseignements/).
 *  Les réponses sont envoyées au formulaire Google existant de Yann
 *  (« Formulaire de renseignements personnels »), donc dans la même feuille de
 *  réponses Drive : « Fiche renseignements raids à ski (réponses) ».
 *  Identifiants entry.* relevés le 23/11/2026 dans FB_PUBLIC_LOAD_DATA_ :
 *  si une question est modifiée dans Google Forms, revérifier ces numéros. */
import { georgie } from "./voyages/georgie";
import { ouzbekistan } from "./voyages/ouzbekistan";
import { armenie } from "./voyages/armenie";
import { mediterraneen } from "./voyages/mediterraneen";
import { tadjikistan } from "./voyages/tadjikistan";
import type { Voyage } from "./voyages/types";

export const GOOGLE_FORM_ACTION =
  "https://docs.google.com/forms/d/e/1FAIpQLSfcJu82Wp1a2DYcRee5pPjwCLxwYU7H0B6MO-birxHYcVZfQw/formResponse";

export const ENTRY = {
  date: "entry.932221906",
  nom: "entry.610398788",
  email: "entry.642724134",
  tel: "entry.168882905",
  urgence: "entry.1837811221",
  assurance: "entry.898084865",
  intolerances: "entry.1403307281",
  location: "entry.2021211768",
  taille: "entry.758884947",
  arva: "entry.1215489576",
  seatosummit: "entry.2059492498",
  camp: "entry.169468179",
  pyrenex: "entry.1570376875",
} as const;

/** Libellés exacts des options côté Google (ne pas modifier sans modifier le formulaire Google). */
export const OPTIONS = {
  assurance: ["Je suis assuré", "Je ne suis pas assuré mais j'ai pris note"],
  location: ["Oui", "Non"],
  taille: ["Jusqu'à 165 cm", "170 cm", "175 cm", "180 cm et plus"],
  arva: ["DVA-ARVA evo 4 (3 dispos)", "Pelle-Sonde (5 dispos)", "Sac airbag Tour 40 switch (1 dispo)", "Sacs à dos 40L non airbag (2 dispos)"],
  seatosummit: ["Bols pliants/Cuillères (4 dispos)"],
  camp: ["Casques (6 dispos)", "Crampons (4 dispos)", "Sac à dos 50 L (1 dispos)", "Sacs à dos 40L (2 dispos)"],
  pyrenex: ["Sacs de couchage Nepal 800 (4 dispos)"],
};

const MOIS: Record<string, number> = { janvier: 1, février: 2, mars: 3, avril: 4, mai: 5, juin: 6, juillet: 7, août: 8, septembre: 9, octobre: 10, novembre: 11, décembre: 12 };

/** Premier jour d'un voyage, lu dans info.fields["Dates"] ("du dimanche 17 au mardi 26 janvier 2027"). */
function startDate(v: Voyage): string | null {
  const txt = v.info.fields.find((f) => f.label === "Dates")?.value ?? "";
  const m = [...txt.matchAll(/(\d{1,2})(?:er)?(?:\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre))?/gi)];
  const year = txt.match(/\b(20\d\d)\b/)?.[1];
  if (m.length < 2 || !year) return null;
  const day = Number(m[0][1]);
  const month = MOIS[(m[0][2] ?? m[1][2] ?? "").toLowerCase()];
  if (!month) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const titre = (v: Voyage) => (typeof v.masthead.title === "string" ? v.masthead.title : v.masthead.title.desktop);

export const voyagesFormulaire = [georgie, ouzbekistan, armenie, mediterraneen, tadjikistan]
  .map((v) => ({ slug: v.slug, label: titre(v), date: startDate(v), dates: v.info.fields.find((f) => f.label === "Dates")?.value ?? "" }))
  .filter((v) => v.date);
