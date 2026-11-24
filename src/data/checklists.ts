/** Checklists clients (page /checklist/), reprises des formulaires Google de Yann :
 *  « Checklist raid à ski (actualisée 2023) », « Checklist Alpinisme »,
 *  « Checklist Cascade de glace ». Libellés repris tels quels, coquilles corrigées.
 *  `when` : la section n'apparaît que si l'option correspondante est choisie.
 *  `guide: true` : matériel porté ou géré par le guide (affiché à part, pour info). */

export type Opt = "refuge" | "cabane" | "bivouac" | "glacier" | "tente" | "guesthouse" | "escalade" | "avion" | "train" | "airbag";
export type Section = {
  id: string;
  title: string;
  items: string[];
  guide?: boolean;
  /** Affichée si au moins une de ces options est choisie. */
  when?: Opt[];
  /** Affichée seulement si toutes ces options sont choisies. */
  whenAll?: Opt[];
};
export type Activity = {
  id: string;
  label: string;
  hebergements?: { id: Opt; label: string }[];
  /** Options cochables (ex. itinéraire glaciaire, nuits sous tente). */
  toggles?: { id: Opt; label: string }[];
  sections: Section[];
};

const sacRaid = "Sac à dos (30 L en refuge gardé, 40 L sinon)";
const sacVoyage = "Sac à dos de 40 L pour la journée (aussi utilisable en bagage cabine)";

export const activities: Activity[] = [
  {
    id: "raid",
    label: "Raid à ski / ski de randonnée",
    hebergements: [
      { id: "refuge", label: "Refuge gardé" },
      { id: "cabane", label: "Cabane non gardée" },
    ],
    toggles: [{ id: "glacier", label: "Itinéraire glaciaire" }],
    sections: [
      { id: "base", title: "Base ski", items: ["Skis", "Bâtons", "Peaux", "Chaussures de ski", "DVA (ARVA) – pelle – sonde", "Couteaux", sacRaid, "Casque"] },
      { id: "vetements", title: "Vêtements", items: ["Bonnet", "Buff", "Lunettes catégorie 3 minimum", "Masque de ski", "Crème solaire indice 30 minimum", "1 paire de gants fins", "1 paire de gants épais", "Première couche mérinos manches longues", "Polaire fine ou softshell", "Doudoune", "Veste imperméable", "Collant", "Pantalon imperméable / de ski", "Chaussettes de ski"] },
      { id: "vivres", title: "Vivres de course", items: ["Thermos / gourde", "Clémentines", "Barres de céréales / biscuits", "Fruits secs"] },
      { id: "glacier", title: "Glacier / alpinisme", when: ["glacier"], items: ["Baudrier", "Sangle 120 cm", "2 mousquetons à vis", "Crampons", "Piolet"] },
      { id: "nuits", title: "Pour les nuits", when: ["refuge", "cabane"], items: ["Drap de soie (refuge gardé, ou cabane avec couvertures)", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles"] },
      { id: "cabane", title: "En plus en cabane non gardée", when: ["cabane"], items: ["Duvet (s’il n’y a pas de couvertures)", "Bol et cuillère", "Opinel", "Mouchoirs"] },
      { id: "autres", title: "Autres", items: ["Lampe frontale", "Brosse à dents", "Lingettes nettoyantes", "Gel désinfectant", "Piles de rechange pour le DVA", "Carte d’identité (passage de frontière)", "Badge tunnel du Mont-Blanc / Fréjus", "Sacs poubelle 50 L", "Crème anti-frottements type NOK", "Compeed"] },
      { id: "g-secu", title: "Sécurité", guide: true, items: ["Radio avec canal E", "Trousse de pharmacie complète", "Cartes / GPS / boussole", "Pique-niques"] },
      { id: "g-glacier", title: "Glacier / alpinisme", guide: true, when: ["glacier"], items: ["Corde 50 m", "5 mousquetons à vis", "Micro Traxion", "Cordelette 5 mm, 5 m", "2 broches à glace", "2 sangles 120 cm", "Escaper"] },
      { id: "g-cabane", title: "Communs cabane non gardée", guide: true, when: ["cabane"], items: ["Réchaud, gaz et briquet", "Soupes type Knorr (1 sachet pour 2 à 3)", "Pâtes fraîches", "Chocolat", "Biscuits pour le petit-déjeuner"] },
    ],
  },
  {
    id: "voyage",
    label: "Voyage à ski à l’étranger",
    toggles: [
      { id: "avion", label: "Voyage en avion" },
      { id: "train", label: "Voyage en train" },
      { id: "airbag", label: "Sac airbag" },
      { id: "cabane", label: "Nuits en cabane non gardée" },
      { id: "tente", label: "Nuits sous tente" },
      { id: "glacier", label: "Itinéraire glaciaire" },
    ],
    sections: [
      { id: "docs", title: "Papiers et argent", items: ["Passeport valide (vérifier la durée de validité exigée par le pays)", "Visa ou autorisation d’entrée si le pays l’exige", "Attestation d’assurance couvrant les secours et le rapatriement", "Photocopie ou photo des papiers, rangée à part", "Carte bancaire et espèces en petites coupures", "Numéros utiles (assurance, banque, personne à prévenir)"] },
      { id: "bagages", title: "Bagages", items: ["Sac de voyage souple (vêtements, affaires du soir)", sacVoyage] },
      { id: "avion", title: "En avion", when: ["avion"], items: ["Billets d’avion et bagage de soute « équipement de ski » réservé", "Housse à skis rembourrée, qui sert de bagage de soute pour le matériel : skis, bâtons, peaux, pelle, sonde, casque (et crampons, piolet si glacier)", "Vêtements glissés dans la housse pour caler et protéger les skis", "Chaussures de ski en cabine ou aux pieds", "DVA en cabine, piles neuves", "Pas de cartouche de gaz pour réchaud dans l’avion (achetée sur place par le guide)"] },
      { id: "train", title: "En train", when: ["train"], items: ["Billets de train, avec réservation d’un emplacement à bagages si la compagnie le propose", "Housse à skis légère, qui regroupe skis, bâtons, pelle et sonde (plus facile à porter et à ranger)", "Chaussures de ski aux pieds ou dans le sac de voyage"] },
      { id: "airbag-avion", title: "Sac airbag en avion (procédure ARVA Reactor)", whenAll: ["airbag", "avion"], items: ["Avant de réserver, contacter la compagnie avec la fiche technique de la cartouche et l’extrait IATA 2.3.A", "Demander si l’airbag voyage en soute ou en cabine (variable selon les compagnies) et obtenir l’accord par écrit", "Dévisser la cartouche du système et la fermer avec son bouchon de sécurité", "Imprimer la fiche technique et l’extrait IATA en 3 exemplaires : un fixé sur la cartouche, un sur soi, un pour le retour", "Vol vers, depuis ou via les États-Unis : cartouche pleine interdite, partir sans et en louer une sur place", "Autre solution : partir sans cartouche et en louer une chez un revendeur Reactor sur place"] },
      { id: "airbag-train", title: "Sac airbag en train", whenAll: ["airbag", "train"], items: ["Poignée verrouillée contre le déclenchement si la cartouche est montée, ou cartouche dévissée avec son bouchon de sécurité", "Ne pas exposer la cartouche à plus de 50 °C"] },
      { id: "base", title: "Base ski", items: ["Skis", "Bâtons", "Peaux", "Chaussures de ski", "DVA (ARVA) – pelle – sonde", "Couteaux", "Casque"] },
      { id: "vetements", title: "Vêtements", items: ["Bonnet", "Buff", "Lunettes catégorie 3 minimum", "Masque de ski", "Crème solaire indice 30 minimum", "1 paire de gants fins", "1 paire de gants épais", "Première couche mérinos manches longues", "Polaire fine ou softshell", "Doudoune", "Veste imperméable", "Collant", "Pantalon imperméable / de ski", "Chaussettes de ski", "Tenue de rechange pour les soirées et le voyage"] },
      { id: "gh", title: "Nuits en guest-house", items: ["Drap de soie", "Chaussons ou sandales légères", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles", "Serviette microfibre"] },
      { id: "nuit", title: "Nuits en cabane non gardée ou sous tente", when: ["cabane", "tente"], items: ["Sac de couchage chaud (en cabane : s’il n’y a pas de couvertures)", "Bol et cuillère", "Opinel", "Gourde Nalgene (bouillotte)", "Mouchoirs / papier toilette"] },
      { id: "tente", title: "En plus sous tente", when: ["tente"], items: ["Matelas"] },
      { id: "glacier", title: "Glacier / alpinisme", when: ["glacier"], items: ["Baudrier", "Sangle 120 cm", "2 mousquetons à vis", "Crampons", "Piolet"] },
      { id: "vivres", title: "Vivres de course", items: ["Thermos / gourde", "Barres de céréales / biscuits", "Fruits secs", "Chocolat"] },
      { id: "sante", title: "Santé et hygiène", items: ["Traitement personnel habituel, en quantité suffisante", "Paracétamol", "Compeed", "Crème anti-frottements type NOK", "Gel désinfectant", "Lingettes nettoyantes", "Brosse à dents"] },
      { id: "autres", title: "Autres", items: ["Lampe frontale", "Piles de rechange pour le DVA", "Batterie externe + câbles", "Sacs poubelle 50 L"] },
      { id: "g-secu", title: "Sécurité", guide: true, items: ["Moyens de communication adaptés au pays", "Trousse de pharmacie complète", "Cartes / GPS / boussole", "Pique-niques"] },
      { id: "g-glacier", title: "Glacier / alpinisme", guide: true, when: ["glacier"], items: ["Corde 50 m", "5 mousquetons à vis", "Micro Traxion", "Cordelette 5 mm, 5 m", "2 broches à glace", "2 sangles 120 cm", "Escaper"] },
      { id: "g-nuit", title: "Communs cabane non gardée ou bivouac", guide: true, when: ["cabane", "tente"], items: ["Réchaud, gaz (acheté sur place) et briquet", "Repas du soir et petits-déjeuners"] },
      { id: "g-tente", title: "Bivouac sous tente", guide: true, when: ["tente"], items: ["Tentes"] },
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
    toggles: [{ id: "escalade", label: "Passages d’escalade" }],
    sections: [
      { id: "tech", title: "Matériel technique", items: ["Baudrier (+ mousqueton directionnel, 3 mousquetons à vis, 1 assureur, 1 sangle 120 cm, 1 prussik)", "Piolets", "Crampons", "Chaussures d’alpinisme", "Sac à dos (30 L en refuge gardé, 40 L sinon)", "Bâtons", "Lampe frontale puissante + piles / batterie de rechange", "Casque", "Gants en cuir"] },
      { id: "escalade", title: "Escalade", when: ["escalade"], items: ["Chaussons d’escalade"] },
      { id: "vetements", title: "Vêtements", items: ["Casquette", "Bonnet", "Buff", "Lunettes catégorie 3 minimum", "Crème solaire indice 30 minimum", "1 paire de gants fins", "1 paire de gants épais", "Première couche mérinos manches longues", "Polaire fine ou softshell", "Doudoune", "Veste imperméable", "Collant", "Pantalon softshell", "Chaussettes"] },
      { id: "nuits", title: "Pour les nuits", when: ["refuge", "cabane", "bivouac"], items: ["Drap de soie (refuge gardé, ou cabane avec couvertures)", "Collant / haut manches longues de rechange", "Chaussettes de rechange", "Bouchons d’oreilles"] },
      { id: "nuit", title: "En plus en bivouac ou cabane non gardée", when: ["cabane", "bivouac"], items: ["Duvet (s’il n’y a pas de couvertures)", "Bol et cuillère", "Opinel", "Mouchoirs", "Gourde Nalgene (bouillotte)"] },
      { id: "tente", title: "En plus pour un bivouac sous tente / à la belle étoile", when: ["bivouac"], items: ["Tente", "Matelas"] },
      { id: "vivres", title: "Nourriture de la journée", items: ["Thermos / gourde", "Fromage et saucisson", "Pain", "Barres de céréales", "Clémentines", "Fruits secs"] },
      { id: "autres", title: "Autres et optionnel", items: ["Lingettes nettoyantes", "Gel désinfectant", "Batterie externe + câbles", "Papier toilette", "Paracétamol", "Compeed", "Badge tunnel du Mont-Blanc", "Sacs poubelle 50 L"] },
      { id: "g-tech", title: "Matériel technique commun", guide: true, items: ["Corde 50 m", "5 mousquetons à vis", "Micro Traxion", "Cordelette 5 mm, 5 m", "2 broches à glace", "2 sangles 120 cm", "Escaper", "Jeu de friends", "Jeu de coinceurs", "Dégaines", "Pitons", "Cordelette à laisser", "Trousse de secours", "Radio de secours", "Cartes / GPS / boussole"] },
      { id: "g-commun", title: "Communs bivouac ou cabane non gardée", guide: true, when: ["cabane", "bivouac"], items: ["Réchaud, gaz et briquet", "Soupes type Knorr (1 sachet pour 2)", "Petites pâtes (cuisson < 5 min) ou semoule (120 g par personne)", "Muesli / flocons d’avoine / biscuits pour le petit-déjeuner", "Chocolat", "Thé et tisane", "Pelle", "Poche à eau (2 L par personne)"] },
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
