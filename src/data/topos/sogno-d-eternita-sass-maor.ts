/**
 * Topo n° 5 — Sogno d'eternità · Sass Maor, face Est (Pale di San Martino).
 * Ouverture les 24 et 25 août 2024 par Yann Borgnet et Marco Gianola.
 *
 * Source : topo des ouvreurs (Google Doc « Sass Maor - Sogno d'eternità », août 2024).
 * Hauteur : somme des longueurs L1-L23 (1 100 m) + 150 m d'arête jusqu'au sommet.
 * Pas de photo de cette ouverture dans le dépôt : page sans image.
 */
import type { VoieTopo } from "./types";

export const sogno: VoieTopo = {
  type: "voie",
  slug: "sogno-d-eternita-sass-maor",
  updated: "2026-11-23",
  name: { fr: "Sogno d'eternità", en: "Sogno d'eternità", it: "Sogno d'eternità" },
  subtitle: {
    fr: "Une grande voie de dalle en face Est du Sass Maor",
    en: "A long slab route on the Sass Maor east face",
    it: "Una grande via di placca sulla parete est del Sass Maor",
  },
  country: { fr: "Italie", en: "Italy", it: "Italia" },
  massif: { fr: "Dolomites, Pale di San Martino", en: "Dolomites, Pale di San Martino", it: "Dolomiti, Pale di San Martino" },
  seo: {
    title: {
      fr: "Topo Sogno d'eternità, face Est du Sass Maor (Dolomites) | Les Grands Raids à Ski",
      en: "Sogno d'eternità topo, Sass Maor east face (Dolomites) | Les Grands Raids à Ski",
      it: "Topo Sogno d'eternità, parete est del Sass Maor (Dolomiti) | Les Grands Raids à Ski",
    },
    description: {
      fr: "Topo de Sogno d'eternità, voie ouverte en 2024 en face Est du Sass Maor (Pale di San Martino) : 1 100 m + 150 m jusqu'au sommet, 24 longueurs, VII+/VIII- max, soutenu dans le VI+/VII.",
      en: "Topo of Sogno d'eternità, opened in 2024 on the Sass Maor east face (Pale di San Martino): 1,100 m + 150 m to the summit, 24 pitches, VII+/VIII- max, sustained at VI+/VII.",
      it: "Topo di Sogno d'eternità, via aperta nel 2024 sulla parete est del Sass Maor (Pale di San Martino): 1.100 m + 150 m fino in cima, 24 tiri, VII+/VIII- max, continuo sul VI+/VII.",
    },
  },
  summit: { name: "Sass Maor", ele: 2814 },
  lengthM: 1250,
  maxGrade: "VII+/VIII-",
  openedYear: 2024,
  facts: [
    { label: { fr: "Pays", en: "Country", it: "Paese" }, value: { fr: "Italie (Trentin)", en: "Italy (Trentino)", it: "Italia (Trentino)" } },
    { label: { fr: "Massif", en: "Range", it: "Massiccio" }, value: { fr: "Dolomites, Pale di San Martino", en: "Dolomites, Pale di San Martino", it: "Dolomiti, Pale di San Martino" } },
    { label: { fr: "Sommet", en: "Summit", it: "Cima" }, value: { fr: "Sass Maor, 2 814 m, face Est", en: "Sass Maor, 2,814 m, east face", it: "Sass Maor, 2.814 m, parete est" } },
    { label: { fr: "Type", en: "Type", it: "Tipo" }, value: { fr: "Grande voie engagée, principalement en dalle ; rocher excellent, souvent très sculpté", en: "Committing big route, mostly slab; excellent, often heavily sculpted rock", it: "Grande via impegnativa, soprattutto in placca; roccia ottima, spesso molto lavorata" } },
    {
      label: { fr: "Ouverture", en: "First ascent", it: "Apertura" },
      value: { fr: "24 et 25 août 2024, Yann Borgnet et Marco Gianola", en: "24–25 August 2024, Yann Borgnet and Marco Gianola", it: "24–25 agosto 2024, Yann Borgnet e Marco Gianola" },
    },
    { label: { fr: "Hauteur", en: "Length", it: "Sviluppo" }, value: { fr: "1 100 m en 23 longueurs, puis 150 m jusqu'au sommet", en: "1,100 m in 23 pitches, then 150 m to the summit", it: "1.100 m in 23 tiri, poi 150 m fino in cima" } },
    { label: { fr: "Difficultés", en: "Difficulty", it: "Difficoltà" }, value: { fr: "VII+/VIII- max, soutenu dans le VI+/VII", en: "VII+/VIII- max, sustained at VI+/VII", it: "VII+/VIII- max, continuo sul VI+/VII" } },
    {
      label: { fr: "Matériel", en: "Gear", it: "Materiale" },
      value: {
        fr: "Deux jeux de Totem cams jusqu'à l'orange, un Camalot n° 3, cordes de 55 m, 6 cordelettes kevlar pour les lunules",
        en: "Two sets of Totem cams up to orange, one Camalot #3, 55 m ropes, 6 kevlar cords for threads",
        it: "Due serie di Totem cam fino all'arancione, un Camalot n. 3, corde da 55 m, 6 cordini in kevlar per le clessidre",
      },
    },
    {
      label: { fr: "Voies voisines", en: "Neighbouring routes", it: "Vie vicine" },
      value: {
        fr: "L1 à L4 communes avec Supermatita (rocher moins bon) ; L22 et L23 communes avec « What an incredible day »",
        en: "P1 to P4 shared with Supermatita (poorer rock); P22 and P23 shared with “What an incredible day”",
        it: "Tiri 1-4 in comune con Supermatita (roccia meno buona); tiri 22 e 23 in comune con «What an incredible day»",
      },
    },
    { label: { fr: "Dédicace", en: "Dedication", it: "Dedica" }, value: { fr: "Voie dédiée à Alain Borgnet", en: "Route dedicated to Alain Borgnet", it: "Via dedicata ad Alain Borgnet" } },
  ],
  pitches: [
    { n: 1, grade: "IV+", lengthM: 45, text: { fr: "Partir dans le dièdre-cheminée caractéristique. Relais sur une terrasse, gros becquet (sangle de 180 cm minimum).", en: "Start up the obvious corner-chimney. Belay on a terrace, big flake (sling of at least 180 cm).", it: "Partire nel caratteristico diedro-camino. Sosta su un terrazzino, grosso spuntone (fettuccia di almeno 180 cm)." } },
    { n: 2, grade: "V", lengthM: 40, text: { fr: "Tout droit dans la dalle juste à droite du grand dièdre, un piton en fin de dalle. Relais sur la vire à gauche, 2 pitons.", en: "Straight up the slab just right of the big corner, a peg at the end of the slab. Belay on the ledge to the left, 2 pegs.", it: "Dritti nella placca appena a destra del grande diedro, un chiodo alla fine della placca. Sosta sulla cengia a sinistra, 2 chiodi." } },
    { n: 3, grade: "IV+", lengthM: 50, text: { fr: "Tout droit entre le dièdre et la dalle jusqu'à une vire sous le grand toit (2 pitons). Relais sur un piton et un friend.", en: "Straight up between the corner and the slab to a ledge below the big roof (2 pegs). Belay on a peg and a cam.", it: "Dritti tra il diedro e la placca fino a una cengia sotto il grande tetto (2 chiodi). Sosta su un chiodo e un friend." } },
    { n: 4, grade: "VI+/VII", lengthM: 55, text: { fr: "Franchir le toit (rocher médiocre), traverser à l'horizontale dans la dalle gris foncé (4 pitons), passer un petit pilier et grimper tout droit sur son flanc droit. Relais sur une terrasse sous le dièdre herbeux où s'échappe Supermatita.", en: "Pull over the roof (poor rock), traverse horizontally across the dark grey slab (4 pegs), pass a small pillar and climb straight up its right side. Belay on a terrace below the grassy corner where Supermatita heads off.", it: "Superare il tetto (roccia mediocre), traversare in orizzontale nella placca grigio scuro (4 chiodi), passare un piccolo pilastro e salire dritti sul suo fianco destro. Sosta su un terrazzino sotto il diedro erboso dove esce Supermatita." } },
    { n: 5, grade: "VII", lengthM: 25, text: { fr: "Le dièdre herbeux de Supermatita sur 5 m, puis traverser à droite dans une dalle compacte (1 piton, exposé). Petit dièdre (piton), puis à droite jusqu'à une petite vire sous une écaille. Relais sur friends n° 2 et 3.", en: "Supermatita's grassy corner for 5 m, then traverse right across a compact slab (1 peg, runout). Small corner (peg), then right to a small ledge below a flake. Belay on cams #2 and #3.", it: "Il diedro erboso di Supermatita per 5 m, poi traversare a destra in una placca compatta (1 chiodo, esposto). Piccolo diedro (chiodo), poi a destra fino a una piccola cengia sotto una scaglia. Sosta su friend n. 2 e 3." } },
    { n: 6, grade: "VII", lengthM: 50, text: { fr: "Traverser la vire à droite puis la dalle à gauche pour passer une zone plus raide. Dièdre fissuré sur une vingtaine de mètres, puis la dalle à droite. Relais sur un piton et un friend 0.3.", en: "Traverse the ledge right then the slab left to pass a steeper section. Cracked corner for about twenty metres, then the slab rightwards. Belay on a peg and a 0.3 cam.", it: "Traversare la cengia a destra poi la placca a sinistra per superare un tratto più ripido. Diedro fessurato per una ventina di metri, poi la placca verso destra. Sosta su un chiodo e un friend 0.3." } },
    { n: 7, grade: "VI", lengthM: 50, text: { fr: "Rampe dalleuse vers le dièdre, puis la dalle à gauche à travers une coulée gris foncé et une coulée gris clair (raide mais bien prisu). Dièdre fissuré (bon friend), puis traverser à gauche vers une vire herbeuse. Relais sur 3 lunules.", en: "Slabby ramp to the corner, then the slab leftwards across a dark grey and a light grey streak (steep but good holds). Cracked corner (good cam), then traverse left to a grassy ledge. Belay on 3 threads.", it: "Rampa di placca verso il diedro, poi la placca a sinistra attraverso una colata grigio scuro e una grigio chiaro (ripido ma ben appigliato). Diedro fessurato (buon friend), poi traversare a sinistra verso una cengia erbosa. Sosta su 3 clessidre." } },
    { n: 8, grade: "VI/VI+", lengthM: 35, text: { fr: "Le mur sur une dizaine de mètres jusqu'à une vire (piton et lunule), puis la dalle compacte à gauche jusqu'à une vire herbeuse. Relais sur piton, lunule et friend 0.75.", en: "The wall for about ten metres to a ledge (peg and thread), then the compact slab leftwards to a grassy ledge. Belay on a peg, a thread and a 0.75 cam.", it: "Il muro per una decina di metri fino a una cengia (chiodo e clessidra), poi la placca compatta a sinistra fino a una cengia erbosa. Sosta su chiodo, clessidra e friend 0.75." } },
    { n: 9, grade: "VI/VI+", lengthM: 35, text: { fr: "Droit dans le mur jusqu'à une vire circulaire caractéristique, puis à droite jusque sous le grand bouclier de dalle. Relais sur une lunule et un friend n° 1.", en: "Straight up the wall to an obvious circular ledge, then right to below the big slab shield. Belay on a thread and a #1 cam.", it: "Dritti nel muro fino a una caratteristica cengia circolare, poi a destra fin sotto il grande scudo di placca. Sosta su una clessidra e un friend n. 1." } },
    { n: 10, grade: "VII+/VIII-", lengthM: 55, text: { fr: "Sous deux coulées gris clair (Supermatita passe dans celle de droite) : prendre celle de gauche, contourner un petit toit par la droite, puis une coulée gris foncé (prises parfois mouillées, 4 lunules). Relais sur une bonne vire, 2 lunules.", en: "Below two light grey streaks (Supermatita takes the right one): take the left one, round a small roof on the right, then a dark grey streak (holds sometimes wet, 4 threads). Belay on a good ledge, 2 threads.", it: "Sotto due colate grigio chiaro (Supermatita passa in quella di destra): prendere quella di sinistra, aggirare un piccolo tetto a destra, poi una colata grigio scuro (appigli a volte bagnati, 4 clessidre). Sosta su una buona cengia, 2 clessidre." } },
    { n: 11, grade: "VI+", lengthM: 50, text: { fr: "Tout droit dans le mur (2 lunules). Relais sur une petite vire, 2 lunules.", en: "Straight up the wall (2 threads). Belay on a small ledge, 2 threads.", it: "Dritti nel muro (2 clessidre). Sosta su una piccola cengia, 2 clessidre." } },
    { n: 12, grade: "V+/VI", lengthM: 45, text: { fr: "Tout droit (lunule) jusqu'à une bonne vire, la traverser à gauche et rejoindre une petite vire 2 m au-dessus. Relais sur 2 lunules et un friend.", en: "Straight up (thread) to a good ledge, traverse it left and reach a small ledge 2 m higher. Belay on 2 threads and a cam.", it: "Dritti (clessidra) fino a una buona cengia, traversarla a sinistra e raggiungere una piccola cengia 2 m più in alto. Sosta su 2 clessidre e un friend." } },
    { n: 13, grade: "VI", lengthM: 50, text: { fr: "Le mur en légère ascendance à gauche, puis traverser à droite au niveau d'une petite vire. Relais sur 2 pitons et un friend.", en: "The wall slightly leftwards, then traverse right at a small ledge. Belay on 2 pegs and a cam.", it: "Il muro leggermente verso sinistra, poi traversare a destra all'altezza di una piccola cengia. Sosta su 2 chiodi e un friend." } },
    { n: 14, grade: "VI", lengthM: 55, text: { fr: "Viser le bord droit de la tache jaune coiffée d'un petit toit, grimper le dièdre et sortir sur la vire de la Banca Orba. Relais sur 3 friends sous le petit toit.", en: "Aim for the right edge of the yellow patch capped by a small roof, climb the corner and exit onto the Banca Orba ledge. Belay on 3 cams below the small roof.", it: "Puntare al bordo destro della macchia gialla sormontata da un piccolo tetto, salire il diedro e uscire sulla cengia della Banca Orba. Sosta su 3 friend sotto il piccolo tetto." } },
    {
      n: 15, grade: "VII", lengthM: 55,
      before: { fr: "Liaison : descendre la Banca Orba (50 m de désescalade puis 2 rappels de 45 m) jusqu'à deux blocs coincés, juste avant la selle. La deuxième partie part du bloc coincé du bas.", en: "Link: descend the Banca Orba (50 m of downclimbing then two 45 m abseils) to two jammed blocks just before the saddle. The second part starts from the lower jammed block.", it: "Collegamento: scendere la Banca Orba (50 m in arrampicata poi 2 doppie da 45 m) fino a due blocchi incastrati, poco prima della sella. La seconda parte parte dal blocco incastrato in basso." },
      text: { fr: "Prendre pied sur la dalle et traverser à gauche dans un beau mur gris à trous (ne pas rejoindre le petit dièdre jaune au goujon). Après une vingtaine de mètres, tout droit jusqu'à une vire (5 lunules). Relais sur 2 lunules.", en: "Step onto the slab and traverse left on a fine grey pocketed wall (do not go into the small yellow corner with a bolt). After about twenty metres, straight up to a ledge (5 threads). Belay on 2 threads.", it: "Salire sulla placca e traversare a sinistra in un bel muro grigio a buchi (non raggiungere il piccolo diedro giallo con lo spit). Dopo una ventina di metri, dritti fino a una cengia (5 clessidre). Sosta su 2 clessidre." },
    },
    { n: 16, grade: "VII", lengthM: 45, text: { fr: "Viser un petit toit légèrement à gauche (un goujon visible dans le mur raide à droite) : traverser les coulées noires sous la résurgence, contourner le toit par la droite. Relais sur une vire après un petit dièdre, 2 lunules.", en: "Aim for a small roof slightly left (a bolt visible on the steep wall to the right): cross the black streaks below the seep, round the roof on the right. Belay on a ledge after a small corner, 2 threads.", it: "Puntare a un piccolo tetto leggermente a sinistra (uno spit visibile nel muro ripido a destra): attraversare le colate nere sotto la sorgente, aggirare il tetto a destra. Sosta su una cengia dopo un piccolo diedro, 2 clessidre." } },
    { n: 17, grade: "VI+/VII", lengthM: 50, text: { fr: "Tout droit, puis une dalle compacte (3 lunules) jusqu'à une terrasse ; le mur au-dessus (2 lunules) puis une rampe à droite. Relais sur une petite vire, 2 pitons.", en: "Straight up, then a compact slab (3 threads) to a terrace; the wall above (2 threads) then a ramp rightwards. Belay on a small ledge, 2 pegs.", it: "Dritti, poi una placca compatta (3 clessidre) fino a un terrazzino; il muro sopra (2 clessidre) poi una rampa verso destra. Sosta su una piccola cengia, 2 chiodi." } },
    { n: 18, grade: "VI+/VII", lengthM: 50, text: { fr: "Gradins vers le pied d'un dièdre peu marqué, le remonter une dizaine de mètres puis rejoindre le fil d'un pilier (4 lunules). Relais sur 2 lunules.", en: "Steps up to the foot of a faint corner, climb it for about ten metres then gain the crest of a pillar (4 threads). Belay on 2 threads.", it: "Gradoni verso la base di un diedro poco marcato, salirlo per una decina di metri poi raggiungere il filo di un pilastro (4 clessidre). Sosta su 2 clessidre." } },
    { n: 19, grade: "VI+/VII", lengthM: 55, text: { fr: "La dalle directement jusqu'à de petites vires herbeuses, puis à droite d'un pilier peu marqué (4 lunules). Relais sur 2 friends.", en: "The slab directly to small grassy ledges, then right of a faint pillar (4 threads). Belay on 2 cams.", it: "La placca direttamente fino a piccole cenge erbose, poi a destra di un pilastro poco marcato (4 clessidre). Sosta su 2 friend." } },
    { n: 20, grade: "VII+/VIII-", lengthM: 50, text: { fr: "À droite du fil du pilier, puis sur le fil, un dièdre par son flanc gauche, retour sur le fil puis son flanc droit (3 lunules). VII+/VIII- en restant sur le fil, moins dur en passant plus tôt à droite. Relais sur une petite marche : piton, lunule, friend 0.3.", en: "Right of the pillar crest, then on the crest, a corner by its left side, back to the crest then its right side (3 threads). VII+/VIII- staying on the crest, easier moving right sooner. Belay on a small step: peg, thread, 0.3 cam.", it: "A destra del filo del pilastro, poi sul filo, un diedro dal suo fianco sinistro, di nuovo sul filo poi sul fianco destro (3 clessidre). VII+/VIII- restando sul filo, meno difficile passando prima a destra. Sosta su un piccolo gradino: chiodo, clessidra, friend 0.3." } },
    { n: 21, grade: "VI+", lengthM: 55, text: { fr: "Contourner la niche jaune par la droite (mur raide), puis à gauche jusqu'à un piton ; sortir à droite vers une terrasse et la selle de la voie Castiglioni. Relais sur lunule et friend.", en: "Round the yellow niche on the right (steep wall), then left to a peg; exit right to a terrace and the saddle of the Castiglioni route. Belay on a thread and a cam.", it: "Aggirare la nicchia gialla a destra (muro ripido), poi a sinistra fino a un chiodo; uscire a destra verso un terrazzino e la sella della via Castiglioni. Sosta su clessidra e friend." } },
    { n: 22, grade: "V+", lengthM: 50, text: { fr: "Commune avec « What an incredible day » : la Castiglioni sur 10 m, traverser à droite, puis le mur gris foncé (2 lunules). Relais sur 2 lunules.", en: "Shared with “What an incredible day”: the Castiglioni for 10 m, traverse right, then the dark grey wall (2 threads). Belay on 2 threads.", it: "In comune con «What an incredible day»: la Castiglioni per 10 m, traversare a destra, poi il muro grigio scuro (2 clessidre). Sosta su 2 clessidre." } },
    { n: 23, grade: "VI", lengthM: 50, text: { fr: "Commune avec « What an incredible day » : tout droit dans un mur raide gris foncé (3 lunules). Relais sur 2 lunules.", en: "Shared with “What an incredible day”: straight up a steep dark grey wall (3 threads). Belay on 2 threads.", it: "In comune con «What an incredible day»: dritti in un muro ripido grigio scuro (3 clessidre). Sosta su 2 clessidre." } },
    { n: 24, grade: "II/III", lengthM: 150, text: { fr: "150 m faciles pour rejoindre le sommet.", en: "150 m of easy ground to the summit.", it: "150 m facili fino in cima." } },
  ],
  descent: [],
  sources: [],
  method: {
    fr: "Topo des ouvreurs. Voie en deux parties, reliées par la descente de la Banca Orba. Protections essentiellement sur lunules et friends.",
    en: "Topo by the first ascensionists. A two-part route, linked by a descent of the Banca Orba. Protection mostly on threads and cams.",
    it: "Topo degli apritori. Via in due parti, collegate dalla discesa della Banca Orba. Protezioni soprattutto su clessidre e friend.",
  },
};
