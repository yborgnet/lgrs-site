/** Checklists clients (page /checklist/), reprises des formulaires Google de Yann :
 *  « Checklist raid à ski (actualisée 2023) », « Checklist Alpinisme »,
 *  « Checklist Cascade de glace ». Libellés repris tels quels, coquilles corrigées.
 *  `when` : la section n'apparaît que si l'option correspondante est choisie.
 *  `guide: true` : matériel porté ou géré par le guide (affiché à part, pour info). */

export type Opt = "refuge" | "cabane" | "bivouac" | "glacier";
export type Section = { id: string; title: string; items: string[]; guide?: boolean; when?: Opt[] };
export type Activity = {
  id: string;
  label: string;
  hebergements?: { id: Opt; label: string }[];
  glacier?: boolean;
  sections: Section[];
};

const sacRaid = "Sac à dos (30 L en refuge gardé, 40 L sinon)";

export const activities: Activity[] = [
  {
    id: "raid",
    label: "Raid à ski / ski de randonnée",
    hebergements: [
      { id: "refuge", label: "Refuge gardé" },
      { id: "cabane", label: "Cabane non gardée" },
    ],
    glacier: true,
    sections: [
      { id: "base", title: "Base ski", items: ["Skis", "Bâtons", "Peaux", "Chaussures de ski", "DVA (ARVA) – pelle – sonde", "Couteaux", sacRaid, "Casque"] },
      { id: "vetements", title: "Vêtements", items: ["Bonnet", "Buff", "Lunettes catégorie 3 minimum", "Masque de ski", "Crème solaire indice 30 minimum", "1 paire de gants fins", "1 paire de gants épais", "Première couche mérinos manches longues", "Polaire fine ou softshell", "Doudoune", "Veste imperméable", "Collant", "Pantalon imperméable / de ski", "Chaussettes de ski"] },
      { id: "vivres", title: "Vivres de course", items: ["Thermos / gourde", "Clémentines", "Barres de céréales / biscuits", "Fruits secs", "Pain au levain bio", "Fromage et saucisson locaux", "Chocolat artisanal"] },
      { id: "glacier", title: "Glacier / alpinisme", when: ["glacier"], items: ["Baudrier", "Sangle 120 cm", "2 mousquetons à vis", "Crampons", "Piolet"] },
      { id: "refuge", title: "Refuge gardé", when: ["refuge"], items: ["Drap de soie", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles"] },
      { id: "cabane", title: "Cabane non gardée", when: ["cabane"], items: ["Duvet", "Drap de soie", "Bol et cuillère", "Opinel", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles", "Mouchoirs"] },
      { id: "autres", title: "Autres", items: ["Lampe frontale", "Brosse à dents", "Lingettes nettoyantes", "Gel désinfectant", "Piles de rechange pour le DVA", "Carte d’identité (passage de frontière)", "Badge tunnel du Mont-Blanc / Fréjus", "Sacs poubelle 30 L", "Crème anti-frottements type NOK", "Compeed"] },
      { id: "g-secu", title: "Sécurité", guide: true, items: ["Radio avec canal E", "Trousse de pharmacie complète", "Cartes / GPS / boussole", "Pique-niques"] },
      { id: "g-glacier", title: "Glacier / alpinisme", guide: true, when: ["glacier"], items: ["Corde 50 m", "5 mousquetons à vis", "Micro Traxion", "Cordelette 5 mm, 5 m", "2 broches à glace", "2 sangles 120 cm", "Escaper"] },
      { id: "g-cabane", title: "Communs cabane non gardée", guide: true, when: ["cabane"], items: ["Réchaud, gaz et briquet", "Soupes type Knorr (1 sachet pour 2 à 3)", "Pâtes fraîches", "Chocolat", "Biscuits pour le petit-déjeuner", "Sacs poubelle"] },
    ],
  },
  {
    id: "alpinisme",
    label: "Alpinisme",
    hebergements: [
      { id: "refuge", label: "Refuge gardé" },
      { id: "cabane", label: "Cabane non gardée" },
      { id: "bivouac", label: "Bivouac sous tente / à la belle étoile" },
    ],
    sections: [
      { id: "tech", title: "Matériel technique", items: ["Baudrier (+ mousqueton directionnel, 3 mousquetons à vis, 1 assureur, 1 sangle 120 cm, 1 prussik)", "Piolets", "Crampons", "Chaussures d’alpinisme", "Sac à dos (30 L en refuge gardé, 40 L sinon)", "Bâtons", "Lampe frontale puissante + piles / batterie de rechange", "Casque", "Gants en cuir", "Chaussons d’escalade"] },
      { id: "vetements", title: "Vêtements", items: ["Casquette", "Bonnet", "Buff", "Lunettes catégorie 3 minimum", "Crème solaire indice 30 minimum", "1 paire de gants fins", "1 paire de gants épais", "Première couche mérinos manches longues", "Polaire fine ou softshell", "Doudoune", "Veste imperméable", "Collant", "Pantalon softshell", "Chaussettes"] },
      { id: "refuge", title: "Refuge gardé", when: ["refuge"], items: ["Drap de soie", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles"] },
      { id: "nuit", title: "Bivouac ou cabane non gardée", when: ["cabane", "bivouac"], items: ["Duvet", "Drap de soie", "Bol et cuillère", "Opinel", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles", "Mouchoirs / papier toilette", "Gourde Nalgene (bouillotte)"] },
      { id: "tente", title: "En plus pour un bivouac sous tente / à la belle étoile", when: ["bivouac"], items: ["Tente", "Matelas", "Pelle"] },
      { id: "vivres", title: "Nourriture de la journée", items: ["Thermos / gourde", "Fromage et saucisson", "Pain", "Barres de céréales", "Clémentines", "Fruits secs"] },
      { id: "vivres-nuit", title: "Nourriture bivouac et cabane non gardée", when: ["cabane", "bivouac"], items: ["Semoule (120 g par personne)", "2 soupes chacun", "Chocolat", "Biscuits pour le petit-déjeuner", "Muesli", "Thé et tisane"] },
      { id: "autres", title: "Autres et optionnel", items: ["Lingettes nettoyantes", "Gel désinfectant", "Piles de rechange", "Batterie externe + câbles", "Papier toilette", "Paracétamol", "Compeed", "Badge tunnel du Mont-Blanc"] },
      { id: "g-tech", title: "Matériel technique commun", guide: true, items: ["Corde 50 m", "5 mousquetons à vis", "Micro Traxion", "Cordelette 5 mm, 5 m", "2 broches à glace", "2 sangles 120 cm", "Escaper", "Jeu de friends", "Jeu de coinceurs", "Dégaines", "Pitons", "Cordelette à laisser", "Trousse de secours", "Radio de secours", "Cartes / GPS / boussole"] },
      { id: "g-commun", title: "Communs bivouac ou cabane non gardée", guide: true, when: ["cabane", "bivouac"], items: ["Réchaud, gaz et briquet", "Soupes type Knorr (1 sachet pour 2)", "Petites pâtes (cuisson < 5 min) ou couscous / semoule", "Flocons d’avoine / porridge / fruits secs / biscuits pour le matin", "Sacs poubelle", "Pelle", "Poche à eau (2 L par personne)"] },
    ],
  },
  {
    id: "cascade",
    label: "Cascade de glace",
    sections: [
      { id: "tech", title: "Matériel technique", items: ["Piolets", "Crampons", "Baudrier", "Assureur + mousqueton à vis", "2 mousquetons à vis", "Longe dynamique", "Casque d’alpinisme", "Lampe frontale", "Prussik"] },
      { id: "approche", title: "Matériel d’approche (ski ou raquettes)", items: ["Skis de randonnée", "Chaussures de ski", "Peaux", "Raquettes", "Bâtons"] },
      { id: "vetements", title: "Vêtements", items: ["Bonnet", "Buff", "Lunettes", "1 paire de gants fins", "1 paire de gants épais", "Première couche mérinos manches longues", "Polaire fine ou softshell", "Doudoune", "Veste imperméable", "Collant", "Pantalon étanche", "Guêtres", "Chaussettes chaudes ou chauffantes", "Chaussures semi-automatiques ou automatiques"] },
      { id: "vivres", title: "Nourriture", items: ["Thermos et thé chaud", "Fromage et saucisson", "Pain", "Barres de céréales", "Clémentines"] },
      { id: "g-tech", title: "Matériel technique commun", guide: true, items: ["Corde 2 × 60 m", "5 mousquetons à vis", "10 dégaines dont 4 à rallonge", "10 broches à glace (5 × 13 cm et 5 × 16 cm)", "Crochet Abalakov", "Couteau", "Cordelette à laisser", "Topo", "2 sangles 120 cm"] },
    ],
  },
];

/** Formulaire de renseignements personnels (dates, contacts, assurance, location). */
export const FORM_RENSEIGNEMENTS =
  "https://docs.google.com/forms/d/e/1FAIpQLSfcJu82Wp1a2DYcRee5pPjwCLxwYU7H0B6MO-birxHYcVZfQw/viewform";
