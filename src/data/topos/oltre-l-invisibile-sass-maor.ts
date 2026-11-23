/**
 * Topo n° 4 — Oltre l'invisibile · Sass Maor, face Est (Pale di San Martino).
 * Ouverture du 15 au 17 septembre 2023 par Yann Borgnet et Antoine Bouqueret, sans spit.
 *
 * Source : topo des ouvreurs (Google Doc « Sass Maor - Oltre l'invisibile - version
 * courte », septembre 2023). Altitude du sommet : 2 814 m. Hauteur : somme des
 * longueurs du topo (≈ 1 000 m, 23 longueurs). Photos : Yann Borgnet, 2023.
 */
import type { VoieTopo } from "./types";

const P = "/photos/Sass Maor 2023/sass-maor-oltre-l-invisibile-";
const cap = { fr: "Oltre l'invisibile · ouverture, septembre 2023", en: "Oltre l'invisibile · first ascent, September 2023", it: "Oltre l'invisibile · apertura, settembre 2023" };

export const oltre: VoieTopo = {
  type: "voie",
  slug: "oltre-l-invisibile-sass-maor",
  updated: "2026-11-23",
  photoHero: {
    src: `${P}dsc02034.jpg`,
    alt: {
      fr: "Grimpeur au relais sur une dalle grise, la vallée et les forêts mille mètres plus bas, face Est du Sass Maor",
      en: "Climber at a belay on a grey slab, the valley and forests a thousand metres below, Sass Maor east face",
      it: "Alpinista in sosta su una placca grigia, la valle e i boschi mille metri più in basso, parete est del Sass Maor",
    },
    caption: { fr: "", en: "", it: "" },
    width: 1616,
    height: 1077,
  },
  name: { fr: "Oltre l'invisibile", en: "Oltre l'invisibile", it: "Oltre l'invisibile" },
  subtitle: {
    fr: "Mille mètres de dalles en face Est du Sass Maor, ouverts sans spit",
    en: "A thousand metres of slabs on the Sass Maor east face, opened without bolts",
    it: "Mille metri di placche sulla parete est del Sass Maor, aperti senza spit",
  },
  country: { fr: "Italie", en: "Italy", it: "Italia" },
  massif: { fr: "Dolomites, Pale di San Martino", en: "Dolomites, Pale di San Martino", it: "Dolomiti, Pale di San Martino" },
  seo: {
    title: {
      fr: "Topo Oltre l'invisibile, face Est du Sass Maor (Dolomites) | Les Grands Raids à Ski",
      en: "Oltre l'invisibile topo, Sass Maor east face (Dolomites) | Les Grands Raids à Ski",
      it: "Topo Oltre l'invisibile, parete est del Sass Maor (Dolomiti) | Les Grands Raids à Ski",
    },
    description: {
      fr: "Topo d'Oltre l'invisibile, voie ouverte en 2023 en face Est du Sass Maor (Pale di San Martino) : 1 000 m, 23 longueurs, VIII max, VII obligatoire, sans spit. Longueur par longueur.",
      en: "Topo of Oltre l'invisibile, opened in 2023 on the Sass Maor east face (Pale di San Martino): 1,000 m, 23 pitches, VIII max, VII obligatory, no bolts. Pitch by pitch.",
      it: "Topo di Oltre l'invisibile, via aperta nel 2023 sulla parete est del Sass Maor (Pale di San Martino): 1.000 m, 23 tiri, VIII max, VII obbligatorio, senza spit. Tiro per tiro.",
    },
  },
  summit: { name: "Sass Maor", ele: 2814 },
  lengthM: 1000,
  maxGrade: "VIII · VII obl.",
  openedYear: 2023,
  facts: [
    { label: { fr: "Pays", en: "Country", it: "Paese" }, value: { fr: "Italie (Trentin)", en: "Italy (Trentino)", it: "Italia (Trentino)" } },
    { label: { fr: "Massif", en: "Range", it: "Massiccio" }, value: { fr: "Dolomites, Pale di San Martino", en: "Dolomites, Pale di San Martino", it: "Dolomiti, Pale di San Martino" } },
    { label: { fr: "Sommet", en: "Summit", it: "Cima" }, value: { fr: "Sass Maor, 2 814 m, face Est", en: "Sass Maor, 2,814 m, east face", it: "Sass Maor, 2.814 m, parete est" } },
    { label: { fr: "Type", en: "Type", it: "Tipo" }, value: { fr: "Grande voie en terrain d'aventure, calcaire, principalement en dalle", en: "Traditional big wall on limestone, mostly slab climbing", it: "Grande via d'avventura su calcare, soprattutto in placca" } },
    {
      label: { fr: "Ouverture", en: "First ascent", it: "Apertura" },
      value: { fr: "15 au 17 septembre 2023, Yann Borgnet et Antoine Bouqueret, sans spit", en: "15–17 September 2023, Yann Borgnet and Antoine Bouqueret, no bolts", it: "15–17 settembre 2023, Yann Borgnet e Antoine Bouqueret, senza spit" },
    },
    { label: { fr: "Hauteur", en: "Length", it: "Sviluppo" }, value: { fr: "1 000 m, 23 longueurs", en: "1,000 m, 23 pitches", it: "1.000 m, 23 tiri" } },
    { label: { fr: "Difficultés", en: "Difficulty", it: "Difficoltà" }, value: { fr: "VIII max, VII obligatoire", en: "VIII max, VII obligatory", it: "VIII max, VII obbligatorio" } },
    {
      label: { fr: "Protection", en: "Protection", it: "Protezioni" },
      value: {
        fr: "Lunules (cordelette kevlar), friends et pitons ; quelques pitons et deux tricams laissés en place",
        en: "Threads (kevlar cord), cams and pegs; a few pegs and two tricams left in place",
        it: "Clessidre (cordino in kevlar), friend e chiodi; alcuni chiodi e due tricam lasciati in posto",
      },
    },
    {
      label: { fr: "Matériel à l'ouverture", en: "Gear used on the first ascent", it: "Materiale in apertura" },
      value: {
        fr: "Deux jeux de Totem cams, un jeu d'Aliens, une trentaine de pitons, crochets goutte d'eau, une vingtaine de mètres de cordelette pour les lunules",
        en: "Two sets of Totem cams, a set of Aliens, about thirty pegs, skyhooks, some twenty metres of cord for threads",
        it: "Due serie di Totem cam, una serie di Alien, una trentina di chiodi, cliff, una ventina di metri di cordino per le clessidre",
      },
    },
    {
      label: { fr: "Voies voisines", en: "Neighbouring routes", it: "Vie vicine" },
      value: {
        fr: "L1 à L3 communes avec Supermatita ; la partie haute croise la voie Solleder",
        en: "P1 to P3 shared with Supermatita; the upper part crosses the Solleder route",
        it: "Tiri 1-3 in comune con Supermatita; la parte alta incrocia la via Solleder",
      },
    },
  ],
  pitches: [
    { n: 1, grade: "IV+", lengthM: 45, text: { fr: "Partir dans le dièdre-cheminée caractéristique. Relais sur une terrasse, gros becquet (sangle de 180 cm minimum).", en: "Start up the obvious corner-chimney. Belay on a terrace, big flake (sling of at least 180 cm).", it: "Partire nel caratteristico diedro-camino. Sosta su un terrazzino, grosso spuntone (fettuccia di almeno 180 cm)." } },
    { n: 2, grade: "V", lengthM: 40, text: { fr: "Tout droit dans la dalle juste à droite du grand dièdre, un piton en fin de dalle. Relais sur la vire à gauche, 2 pitons.", en: "Straight up the slab just right of the big corner, a peg at the end of the slab. Belay on the ledge to the left, 2 pegs.", it: "Dritti nella placca appena a destra del grande diedro, un chiodo alla fine della placca. Sosta sulla cengia a sinistra, 2 chiodi." } },
    { n: 3, grade: "IV+", lengthM: 50, text: { fr: "Tout droit entre le dièdre et la dalle jusqu'à une vire sous le grand toit (2 pitons). Relais sur un piton et un friend.", en: "Straight up between the corner and the slab to a ledge below the big roof (2 pegs). Belay on a peg and a cam.", it: "Dritti tra il diedro e la placca fino a una cengia sotto il grande tetto (2 chiodi). Sosta su un chiodo e un friend." } },
    { n: 4, grade: "VI+/VII", lengthM: 45, text: { fr: "Franchir le toit (rocher médiocre), traverser à l'horizontale dans la dalle gris foncé (4 pitons), passer un petit pilier et grimper tout droit sur son flanc droit. Relais sur un piton et une lunule, sous une rampe-surplomb caractéristique.", en: "Pull over the roof (poor rock), traverse horizontally across the dark grey slab (4 pegs), pass a small pillar and climb straight up its right side. Belay on a peg and a thread below an obvious overhanging ramp.", it: "Superare il tetto (roccia mediocre), traversare in orizzontale nella placca grigio scuro (4 chiodi), passare un piccolo pilastro e salire dritti sul suo fianco destro. Sosta su un chiodo e una clessidra sotto una caratteristica rampa strapiombante." } },
    { n: 5, grade: "V+/VI", lengthM: 50, text: { fr: "Viser le bord droit d'un petit surplomb (2 pitons), rejoindre le sommet de la rampe-surplomb, puis un beau mur à trous en ascendance à droite. Relais sous un petit surplomb, lunule et piton.", en: "Aim for the right edge of a small overhang (2 pegs), reach the top of the overhanging ramp, then a fine pocketed wall rightwards. Belay below a small overhang, thread and peg.", it: "Puntare al bordo destro di un piccolo strapiombo (2 chiodi), raggiungere la cima della rampa strapiombante, poi un bel muro a buchi verso destra. Sosta sotto un piccolo strapiombo, clessidra e chiodo." } },
    { n: 6, grade: "V+/VI", lengthM: 48, text: { fr: "Rampe à gauche sous le surplomb (lunule), terrain plus facile, puis la coulée gris clair (un piton). Relais dans un petit dièdre, 2 lunules.", en: "Ramp left below the overhang (thread), easier ground, then the light grey streak (one peg). Belay in a small corner, 2 threads.", it: "Rampa a sinistra sotto lo strapiombo (clessidra), terreno più facile, poi la colata grigio chiaro (un chiodo). Sosta in un piccolo diedro, 2 clessidre." } },
    { n: 7, grade: "VII", lengthM: 38, text: { fr: "En ascendance à droite dans la coulée gris clair (lunule, un tricam noir en place), jusqu'à un petit surplomb. Relais sur friends (Totem vert et orange) sous l'écaille.", en: "Up rightwards in the light grey streak (thread, a black tricam in place) to a small overhang. Belay on cams (green and orange Totem) below the flake.", it: "In diagonale a destra nella colata grigio chiaro (clessidra, un tricam nero in posto) fino a un piccolo strapiombo. Sosta su friend (Totem verde e arancione) sotto la scaglia." } },
    { n: 8, grade: "VII", lengthM: 50, text: { fr: "Traverser légèrement à droite (lunule), puis tout droit jusqu'à un dièdre (3 lunules). Plus facile ensuite jusqu'au relais sur une grosse lunule.", en: "Traverse slightly right (thread), then straight up to a corner (3 threads). Easier above to the belay on a big thread.", it: "Traversare leggermente a destra (clessidra), poi dritti fino a un diedro (3 clessidre). Più facile poi fino alla sosta su una grossa clessidra." } },
    { n: 9, grade: "VI+", lengthM: 50, text: { fr: "Rejoindre la grande traînée gris clair entre les deux résurgences gris foncé (5 lunules). Relais sur la vire, grosse lunule et Totem rouge.", en: "Reach the long light grey streak between the two dark grey seeps (5 threads). Belay on the ledge, big thread and red Totem.", it: "Raggiungere la grande striscia grigio chiaro tra le due colate grigio scuro (5 clessidre). Sosta sulla cengia, grossa clessidra e Totem rosso." } },
    { n: 10, grade: "VI+", lengthM: 50, text: { fr: "Tout droit (4 lunules). Relais sur lunule et friends (Totem vert et jaune).", en: "Straight up (4 threads). Belay on a thread and cams (green and yellow Totem).", it: "Dritti (4 clessidre). Sosta su clessidra e friend (Totem verde e giallo)." } },
    { n: 11, grade: "V+/VI", lengthM: 40, text: { fr: "Tout droit, passer la seconde vire, franchir un petit surplomb (lunules). Relais suspendu sur deux grosses lunules.", en: "Straight up past the second ledge, over a small overhang (threads). Hanging belay on two big threads.", it: "Dritti, superare la seconda cengia e un piccolo strapiombo (clessidre). Sosta appesa su due grosse clessidre." } },
    { n: 12, grade: "V", lengthM: 45, text: { fr: "Légèrement à gauche puis tout droit (2 lunules), traverser à droite jusqu'à une marche. Relais sur 2 pitons, 5 m à droite de la seconde niche.", en: "Slightly left then straight up (2 threads), traverse right to a step. Belay on 2 pegs, 5 m right of the second niche.", it: "Leggermente a sinistra poi dritti (2 clessidre), traversare a destra fino a un gradino. Sosta su 2 chiodi, 5 m a destra della seconda nicchia." } },
    { n: 13, grade: "VI+", lengthM: 50, text: { fr: "Le dièdre (piton) jusqu'à un becquet caractéristique, franchir le surplomb par un crochet à gauche (piton), puis un dièdre herbeux. Relais au sommet du dièdre, piton et lunule.", en: "The corner (peg) to an obvious spike, over the overhang with a hook move left (peg), then a grassy corner. Belay at the top of the corner, peg and thread.", it: "Il diedro (chiodo) fino a uno spuntone caratteristico, superare lo strapiombo con un movimento a sinistra (chiodo), poi un diedro erboso. Sosta in cima al diedro, chiodo e clessidra." } },
    { n: 14, grade: "VI", lengthM: 45, text: { fr: "Viser un toit fissuré jaune : dièdre fissuré puis le toit (un pas de VI). Relais à la première vire, un piton et deux lunules.", en: "Aim for a yellow cracked roof: cracked corner then the roof (one move of VI). Belay at the first ledge, a peg and two threads.", it: "Puntare a un tetto giallo fessurato: diedro fessurato poi il tetto (un passo di VI). Sosta alla prima cengia, un chiodo e due clessidre." } },
    { n: 15, grade: "V+", lengthM: 20, text: { fr: "Légèrement à droite puis tout droit jusqu'à la seconde vire. Relais sur un vieux piton et un friend (Totem vert).", en: "Slightly right then straight up to the second ledge. Belay on an old peg and a cam (green Totem).", it: "Leggermente a destra poi dritti fino alla seconda cengia. Sosta su un vecchio chiodo e un friend (Totem verde)." } },
    { n: 16, grade: "VI+", lengthM: 45, text: { fr: "Traverser 4 m à gauche dans un mur raide (lunule), monter 3-4 m puis revenir à l'aplomb du relais et tout droit (4 lunules). Relais sur 2 pitons, à compléter avec un Totem orange.", en: "Traverse 4 m left on a steep wall (thread), up 3–4 m then back right above the belay and straight up (4 threads). Belay on 2 pegs, back up with an orange Totem.", it: "Traversare 4 m a sinistra su un muro ripido (clessidra), salire 3-4 m poi tornare sulla verticale della sosta e dritti (4 clessidre). Sosta su 2 chiodi, da integrare con un Totem arancione." } },
    { n: 17, grade: "VII", lengthM: 40, text: { fr: "Tout droit dans le mur gris compact, petit dièdre, petit toit par son bord droit (2 lunules), puis une fissure large et facile à gauche. Relais sous le mur jaune, un piton et deux friends.", en: "Straight up the compact grey wall, a small corner, a small roof on its right edge (2 threads), then an easy wide crack leftwards. Belay below the yellow wall, a peg and two cams.", it: "Dritti nel muro grigio compatto, piccolo diedro, piccolo tetto dal suo bordo destro (2 clessidre), poi una fessura larga e facile verso sinistra. Sosta sotto il muro giallo, un chiodo e due friend." } },
    { n: 18, grade: "VIII/+", lengthM: 50, text: { fr: "Mur à trous déversant puis surplomb vers une fissure bouchée jaune (piton), dalles, petite rampe coiffée d'un surplomb (piton). On croise une vire de la Solleder (piton) puis un ressaut fissuré (4 pitons, souvent mouillé, contournable à gauche). Relais sur les 3 pitons de la Solleder.", en: "Overhanging pocketed wall then an overhang towards a choked yellow crack (peg), slabs, a small ramp capped by an overhang (peg). Cross a Solleder ledge (peg) then a cracked step (4 pegs, often wet, can be bypassed on the left). Belay on the 3 Solleder pegs.", it: "Muro a buchi strapiombante poi strapiombo verso una fessura gialla intasata (chiodo), placche, piccola rampa sormontata da uno strapiombo (chiodo). Si incrocia una cengia della Solleder (chiodo) poi un risalto fessurato (4 chiodi, spesso bagnato, aggirabile a sinistra). Sosta sui 3 chiodi della Solleder." } },
    { n: 19, grade: "VI+", lengthM: 40, text: { fr: "Rejoindre une coulée blanche sous un petit toit (lunule), tout droit (2 lunules), puis un mur raide gris excellent par un crochet à gauche (2 lunules). Relais à gauche du toit caractéristique, deux pitons et un Totem violet.", en: "Reach a white streak below a small roof (thread), straight up (2 threads), then a steep wall of excellent grey rock with a move left (2 threads). Belay left of the obvious roof, two pegs and a purple Totem.", it: "Raggiungere una colata bianca sotto un piccolo tetto (clessidra), dritti (2 clessidre), poi un muro ripido di ottima roccia grigia con un movimento a sinistra (2 clessidre). Sosta a sinistra del tetto caratteristico, due chiodi e un Totem viola." } },
    { n: 20, grade: "VII+", lengthM: 45, text: { fr: "Traverser sous le toit puis le franchir (tricam rose en place), niche (lunule), sortir à droite et mur gris tout droit ; traverser à gauche sous le mur orange. Relais sur un piton et une lunule.", en: "Traverse below the roof then pull over it (pink tricam in place), a niche (thread), exit right and up the grey wall; traverse left below the orange wall. Belay on a peg and a thread.", it: "Traversare sotto il tetto poi superarlo (tricam rosa in posto), nicchia (clessidra), uscire a destra e muro grigio dritti; traversare a sinistra sotto il muro arancione. Sosta su un chiodo e una clessidra." } },
    { n: 21, grade: "VIII", lengthM: 45, text: { fr: "Rejoindre une niche à gauche (lunule) puis repartir à droite et grimper une coulure marron 5 m à droite de la coulée noire (piton et lunule). Relais suspendu sur une lunule et un piton.", en: "Reach a niche on the left (thread) then head back right and climb a brown streak 5 m right of the black streak (peg and thread). Hanging belay on a thread and a peg.", it: "Raggiungere una nicchia a sinistra (clessidra) poi ripartire a destra e salire una colatura marrone 5 m a destra della colata nera (chiodo e clessidra). Sosta appesa su una clessidra e un chiodo." } },
    { n: 22, grade: "VI", lengthM: 40, text: { fr: "Finir le mur raide et rejoindre la Solleder : rampe à gauche jusque sous un surplomb, traverser à gauche puis le mur. Relais sur une double lunule, bonne vire.", en: "Finish the steep wall and join the Solleder: ramp left to below an overhang, traverse left then the wall. Belay on a double thread, good ledge.", it: "Finire il muro ripido e raggiungere la Solleder: rampa a sinistra fin sotto uno strapiombo, traversare a sinistra poi il muro. Sosta su doppia clessidra, buona cengia." } },
    { n: 23, grade: "III+", lengthM: 35, text: { fr: "Le petit pilier jusqu'à la fin des difficultés.", en: "The small pillar to the end of the difficulties.", it: "Il piccolo pilastro fino alla fine delle difficoltà." } },
  ],
  descent: [
    {
      fr: "En 2023, descente depuis la rampe médiane en rappels, puis par le sentier câblé des Cacciatori.",
      en: "In 2023, descent from the central ramp by abseil, then down the cabled Cacciatori path.",
      it: "Nel 2023, discesa dalla rampa mediana in doppia, poi per il sentiero attrezzato dei Cacciatori.",
    },
  ],
  gallery: [
    { src: `${P}dsc01963.jpg`, alt: { fr: "Grimpeur en tête dans une dalle grise très sculptée, la paroi dans le brouillard", en: "Climber leading on a heavily sculpted grey slab, the face in the fog", it: "Alpinista da primo su una placca grigia molto lavorata, la parete nella nebbia" }, caption: cap, width: 1616, height: 1077, wide: true },
    { src: `${P}dsc01982.jpg`, alt: { fr: "Grimpeur vu d'en haut sur l'immense bouclier de dalles, dans la brume", en: "Climber seen from above on the huge shield of slabs, in the mist", it: "Alpinista visto dall'alto sull'immenso scudo di placche, nella foschia" }, caption: cap, width: 1616, height: 1077 },
    { src: `${P}dsc02006.jpg`, alt: { fr: "Second de cordée en casque blanc progressant sur une dalle, brouillard épais", en: "Second in a white helmet climbing a slab in thick fog", it: "Secondo di cordata con casco bianco su una placca, nebbia fitta" }, caption: cap, width: 1616, height: 1077 },
    { src: `${P}dsc02061.jpg`, alt: { fr: "Grimpeur dans un mur gris au-dessus d'une mer de nuages, cordes lovées au relais", en: "Climber on a grey wall above a sea of clouds, ropes coiled at the belay", it: "Alpinista su un muro grigio sopra un mare di nuvole, corde raccolte in sosta" }, caption: cap, width: 1077, height: 1616 },
    { src: `${P}dsc02072.jpg`, alt: { fr: "Grimpeur en tête sur un mur à trous, la partie haute de la face dans la brume", en: "Climber leading a pocketed wall, the upper face in the mist", it: "Alpinista da primo su un muro a buchi, la parte alta della parete nella nebbia" }, caption: cap, width: 1616, height: 1077 },
  ],
  sources: [
    {
      href: "https://alpinemag.fr/dolomites-nouvelle-voie-sass-maor-yann-borgnet-antoine-bouqueret/",
      label: { fr: "Alpine Mag : nouvelle voie au Sass Maor", en: "Alpine Mag: new route on Sass Maor (in French)", it: "Alpine Mag: nuova via al Sass Maor (in francese)" },
    },
    {
      href: "https://www.montagnes-magazine.com/actus-dolomites-yann-borgnet-antoine-bouqueret-ouvrent-face-sass-maor",
      label: { fr: "Montagnes Magazine : ouverture en face du Sass Maor", en: "Montagnes Magazine: new route on Sass Maor (in French)", it: "Montagnes Magazine: apertura sul Sass Maor (in francese)" },
    },
  ],
  method: {
    fr: "Topo des ouvreurs. Partie haute ouverte d'abord, depuis la rampe de la Solleder, puis les grandes dalles inférieures. Voie sans spit : protections à placer, lunules à équiper.",
    en: "Topo by the first ascensionists. The upper part was opened first, from the Solleder ramp, then the big lower slabs. No bolts: protection to be placed, threads to be slung.",
    it: "Topo degli apritori. La parte alta è stata aperta per prima, dalla rampa della Solleder, poi le grandi placche inferiori. Via senza spit: protezioni da piazzare, clessidre da attrezzare.",
  },
};
