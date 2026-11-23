/**
 * Topo n° 3 — Last chance tourism · goulotte ouverte en 2024 à la Pointe de la Noire
 * (massif du Mont-Blanc), par Yann Borgnet et Grégoire Laverty.
 *
 * Sources : topo rédigé par Yann (Google Doc « Last Chance Tourism », février 2024)
 * et article Alpine Mag du 16 février 2024 (altitude, cordée, retour par le
 * Montenvers). Aucune photo publiable dans le dépôt : page sans image.
 * Hauteur = somme des longueurs du topo (440 m).
 */
import type { VoieTopo } from "./types";

export const lastChance: VoieTopo = {
  type: "voie",
  slug: "last-chance-tourism-pointe-de-la-noire",
  updated: "2026-11-23",
  name: { fr: "Last chance tourism", en: "Last chance tourism", it: "Last chance tourism" },
  subtitle: {
    fr: "Une goulotte ouverte en 2024 à la Pointe de la Noire",
    en: "An ice gully first climbed in 2024 on the Pointe de la Noire",
    it: "Una goulotte aperta nel 2024 alla Pointe de la Noire",
  },
  country: { fr: "France", en: "France", it: "Francia" },
  massif: { fr: "Massif du Mont-Blanc", en: "Mont Blanc massif", it: "Massiccio del Monte Bianco" },
  seo: {
    title: {
      fr: "Topo goulotte Last chance tourism, Pointe de la Noire (Mont-Blanc) | Les Grands Raids à Ski",
      en: "Last chance tourism ice gully topo, Pointe de la Noire (Mont Blanc) | Les Grands Raids à Ski",
      it: "Topo goulotte Last chance tourism, Pointe de la Noire (Monte Bianco) | Les Grands Raids à Ski",
    },
    description: {
      fr: "Topo de Last chance tourism, goulotte ouverte en 2024 à la Pointe de la Noire (3 386 m), massif du Mont-Blanc : 9 longueurs, 440 m, glace jusqu'à 6 et mixte jusqu'à M6, descente en rappel.",
      en: "Topo of Last chance tourism, an ice gully first climbed in 2024 on the Pointe de la Noire (3,386 m), Mont Blanc massif: 9 pitches, 440 m, ice up to 6 and mixed up to M6, abseil descent.",
      it: "Topo di Last chance tourism, goulotte aperta nel 2024 alla Pointe de la Noire (3.386 m), massiccio del Monte Bianco: 9 tiri, 440 m, ghiaccio fino a 6 e misto fino a M6, discesa in doppia.",
    },
  },
  summit: { name: "Pointe de la Noire", ele: 3386 },
  lengthM: 440,
  maxGrade: "6 · M6",
  openedYear: 2024,
  facts: [
    { label: { fr: "Pays", en: "Country", it: "Paese" }, value: { fr: "France", en: "France", it: "Francia" } },
    {
      label: { fr: "Massif", en: "Range", it: "Massiccio" },
      value: { fr: "Mont-Blanc, au-dessus de la Vallée Blanche", en: "Mont Blanc, above the Vallée Blanche", it: "Monte Bianco, sopra la Vallée Blanche" },
    },
    { label: { fr: "Sommet", en: "Summit", it: "Cima" }, value: { fr: "Pointe de la Noire, 3 386 m", en: "Pointe de la Noire, 3,386 m", it: "Pointe de la Noire, 3.386 m" } },
    { label: { fr: "Type", en: "Type", it: "Tipo" }, value: { fr: "Goulotte de glace, sortie en mixte", en: "Ice gully with a mixed finish", it: "Goulotte di ghiaccio, uscita in misto" } },
    {
      label: { fr: "Ouverture", en: "First ascent", it: "Apertura" },
      value: { fr: "2024, Yann Borgnet et Grégoire Laverty", en: "2024, Yann Borgnet and Grégoire Laverty", it: "2024, Yann Borgnet e Grégoire Laverty" },
    },
    { label: { fr: "Hauteur", en: "Length", it: "Sviluppo" }, value: { fr: "440 m, 9 longueurs", en: "440 m, 9 pitches", it: "440 m, 9 tiri" } },
    {
      label: { fr: "Difficultés", en: "Difficulty", it: "Difficoltà" },
      value: { fr: "Glace jusqu'à 6, mixte jusqu'à M6", en: "Ice up to WI6, mixed up to M6", it: "Ghiaccio fino a 6, misto fino a M6" },
    },
    {
      label: { fr: "Équipement en place", en: "Fixed gear", it: "Materiale in posto" },
      value: {
        fr: "Deux pitons dans L4, un piton au relais de L3, un piton et un coinceur vers L7 ; relais de descente équipés",
        en: "Two pegs in P4, one peg at the P3 belay, a peg and a nut around P7; abseil anchors in place",
        it: "Due chiodi nel tiro 4, un chiodo alla sosta del tiro 3, un chiodo e un nut verso il tiro 7; soste di discesa attrezzate",
      },
    },
    {
      label: { fr: "Relais", en: "Belays", it: "Soste" },
      value: { fr: "Majoritairement sur becquets de glace", en: "Mostly on ice threads", it: "Per lo più su clessidre di ghiaccio" },
    },
  ],
  pitches: [
    { n: 1, grade: "3", lengthM: 70, text: { fr: "Attaquer par la ligne de goulotte à gauche de l'axe.", en: "Start up the gully line left of the main axis.", it: "Attaccare dalla linea di goulotte a sinistra dell'asse." } },
    { n: 2, grade: "60°", lengthM: 60, text: null },
    { n: 3, grade: "5", lengthM: 60, text: { fr: "Glace avec deux petits ressauts plus raides. Relais sur becquet, un piton laissé.", en: "Ice with two short steeper steps. Belay on an ice thread, one peg left.", it: "Ghiaccio con due brevi risalti più ripidi. Sosta su clessidra, un chiodo lasciato." } },
    { n: 4, grade: "6", lengthM: 60, text: { fr: "Longueur clé : section raide en glace hétérogène et ressaut déversant. Deux pitons laissés, dont un dans la niche sous le ressaut. Relais sur becquet.", en: "Crux pitch: steep section on uneven ice and an overhanging step. Two pegs left, one in the niche below the step. Belay on an ice thread.", it: "Tiro chiave: tratto ripido su ghiaccio eterogeneo e risalto strapiombante. Due chiodi lasciati, uno nella nicchia sotto il risalto. Sosta su clessidra." } },
    { n: 5, grade: "4", lengthM: 25, text: { fr: "Relais sur becquet, sur la gauche.", en: "Belay on an ice thread, on the left.", it: "Sosta su clessidra, a sinistra." } },
    { n: 6, grade: "5+", lengthM: 60, text: { fr: "Magnifique longueur de glace. Relais sur la gauche (becquet).", en: "Superb ice pitch. Belay on the left (ice thread).", it: "Splendido tiro di ghiaccio. Sosta a sinistra (clessidra)." } },
    { n: 7, grade: "M4", lengthM: 40, text: { fr: "Mixte facile : poursuivre la goulotte, monter en ascendance à gauche puis revenir à droite. Un piton au pied du dièdre, mais mieux vaut relayer à gauche, hors de l'axe (becquet, un coinceur laissé).", en: "Easy mixed: follow the gully, climb up leftwards then back right. A peg at the foot of the corner, but it is better to belay on the left, off the axis (ice thread, one nut left).", it: "Misto facile: seguire la goulotte, salire in diagonale a sinistra poi tornare a destra. Un chiodo alla base del diedro, ma conviene fare sosta a sinistra, fuori asse (clessidra, un nut lasciato)." } },
    { n: 8, grade: "M5+", lengthM: 40, text: { fr: "Gravir le dièdre évident puis la pente de neige et glace. Suivre le couloir, au rocher parfois moyen, jusqu'à une rampe évidente à droite, juste avant que la paroi ne se redresse. Relais sur becquet.", en: "Climb the obvious corner then the snow and ice slope. Follow the couloir, on sometimes poor rock, to an obvious ramp on the right just before the wall steepens. Belay on an ice thread.", it: "Salire il diedro evidente poi il pendio di neve e ghiaccio. Seguire il canale, su roccia a volte mediocre, fino a una rampa evidente a destra, poco prima che la parete si raddrizzi. Sosta su clessidra." } },
    { n: 9, grade: "M6", lengthM: 25, text: { fr: "Traverser 4 m à droite en passant un angle, puis gravir les fissures jusqu'à la crête. Relais sur becquet.", en: "Traverse 4 m right round an edge, then climb the cracks to the ridge. Belay on an ice thread.", it: "Traversare 4 m a destra superando uno spigolo, poi salire le fessure fino alla cresta. Sosta su clessidra." } },
  ],
  descent: [
    {
      fr: "En rappel dans la voie, sauf pour les deux derniers relais, hors de l'axe de la goulotte.",
      en: "Abseil down the route, except for the last two belays, which are off the gully axis.",
      it: "In doppia lungo la via, tranne le ultime due soste, fuori dall'asse della goulotte.",
    },
    {
      fr: "Retour par la Vallée Blanche jusqu'au Montenvers.",
      en: "Return down the Vallée Blanche to Montenvers.",
      it: "Rientro per la Vallée Blanche fino al Montenvers.",
    },
  ],
  sources: [
    {
      href: "https://alpinemag.fr/nouvelle-goulotte-reflexion-alpinisme-derniere-chance-montenvers-yann-borgnet/",
      label: {
        fr: "Alpine Mag, 16 février 2024 : « Last chance tourism : alpinisme opportuniste et tourisme de masse à la Mer de Glace »",
        en: "Alpine Mag, 16 February 2024: “Last chance tourism: alpinisme opportuniste et tourisme de masse à la Mer de Glace” (in French)",
        it: "Alpine Mag, 16 febbraio 2024: «Last chance tourism: alpinisme opportuniste et tourisme de masse à la Mer de Glace» (in francese)",
      },
    },
  ],
  method: {
    fr: "Topo des ouvreurs. Le « tourisme de la dernière chance » désigne ceux qui viennent voir les derniers restes de la Mer de Glace, et les alpinistes qui se pressent sur les dernières lignes vierges. État de la glace très variable d'une saison à l'autre.",
    en: "Topo by the first ascensionists. “Last chance tourism” refers to visitors who come to see the last remnants of the Mer de Glace, and to climbers rushing for the last unclimbed lines. Ice conditions vary greatly from one season to the next.",
    it: "Topo degli apritori. Il «turismo dell'ultima occasione» indica chi viene a vedere gli ultimi resti della Mer de Glace, e gli alpinisti che si affrettano sulle ultime linee vergini. Condizioni del ghiaccio molto variabili da una stagione all'altra.",
  },
};
