import type { Carnet, CarnetPhoto } from "./types";
import { computeItineraryTotals, formatAscent, formatDescent, formatDistanceKm, formatDaysLabel, formatMeters } from "../../lib/carnet/itinerary-totals";
import { grecePhotos } from "../photos/grece-2026";

/**
 * Contenu repris tel quel de la page WordPress live :
 * https://lesgrandsraidsaski.com/raid-ski-grece-tzoumerka-pinde/
 *
 * PHOTOS (19/09/2026) : les 65 photos d'origine (18/09/2026, non retouchées,
 * localisation quasi entièrement incertaine) ont été remplacées par les 65
 * photos retouchées fournies par Yann dans
 * public/photos/Grèce Tzoumerka Pindes/, avec un nouveau manifeste
 * (manifeste-SEO-photos-retouchees-grece.json/.csv) qui donne cette fois une
 * latitude/longitude/altitude et un toponyme de secteur pour les 65 photos
 * (les 5 secteurs de la traversée), plus un niveau de confiance
 * "forte"/"moyenne" — voir src/data/photos/grece-2026.ts pour le détail du
 * schéma. L'ancien dossier public/photos/Grèce/ (non retouché) est retiré.
 * Pas de storyDays (rail photo jour par jour) : les secteurs ne se
 * superposent pas exactement aux 7 jours de l'itinéraire (plusieurs jours
 * peuvent traverser le même secteur), donc pas d'attribution jour par jour
 * sans l'inventer — la mosaïque du portfolio ci-dessous reste groupée par
 * ordre du manifeste (proche de l'ordre chronologique du séjour), jamais par
 * jour supposé.
 *
 * GPX ORIGINAL fourni par l'utilisateur le 16/09/2026 (AlpineQuest 2.4.0d,
 * 28674 points horodatés, 22-28/02/2026) — voir
 * data/gpx-sources/grece-tzoumerka-pinde-2026.original.gpx. Découpage en 7
 * jours basé sur les 6 seules coupures temporelles > 3h de toute la trace
 * (13.6 à 16.6h, confiance CONFIRMÉ), qui tombent exactement sur les 7 jours
 * de ski annoncés par WordPress. D+/D- lissés (fenêtre 9 points, seuil 2 m)
 * sur les altitudes <ele> réelles du GPX ; distance géodésique point à
 * point. Les totaux recalculés (162 km, D+ ~11 460 m) recoupent presque
 * exactement l'agrégat déjà publié par WordPress ("162 km et 11 400 m de
 * D+"), qui n'était pas détaillé jour par jour — c'est cette correspondance
 * qui valide le découpage. L'altitude max de J7 (2637 m) correspond
 * exactement à l'altitude réelle du sommet du Smolikas, autre recoupement
 * fort.
 *
 * Toponymie (hors Alpes, donc pas de croisement Camptocamp/Skitour — voir
 * docs/gpx-methodology.md) : les noms d'étape ci-dessous restent ceux déjà
 * publiés par WordPress/le récit (source prioritaire sur un géocodage
 * inversé). Un contrôle ponctuel via OSM/Nominatim confirme sans ambiguïté
 * les points de J1 (Nereda), Kalarites, Anthochori et Périvoli. Le point où
 * la trace GPX marque la coupure J2/J3 (vers 39.683°N 21.191°E, "Chaliki"
 * selon OSM) ne correspond pas précisément aux coordonnées connues de
 * "Matsouki" — le récit publié mentionne pourtant Matsouki comme lieu de
 * passage dès le J1 ET comme étape J2/J3, ce qui suggère un lieu-dit mal
 * référencé sur OSM plutôt qu'une erreur d'étape. À VALIDER si besoin d'une
 * précision totale sur ce point ; n'affecte pas les distances/dénivelés
 * (calculés sur la géométrie réelle de la trace, indépendamment du nom).
 */

const IMG = "/photos/Grèce Tzoumerka Pindes/";

const photo = (file: string): CarnetPhoto => {
  const meta = grecePhotos[file];
  return { src: `${IMG}${file}`, alt: meta.texteAlternatif, width: meta.width, height: meta.height };
};

// Photo de couverture du listing fournie par Yann le 22/09/2026, en dehors
// des 65 photos retouchées du manifeste (pas d'entrée dans
// src/data/photos/grece-2026.ts) — dimensions lues directement sur le
// fichier (1448×1086).
const couverturePinsCoucherDeSoleil: CarnetPhoto = {
  src: `${IMG}grece-pindes-ski-randonnee-coucher-soleil-pins.png`,
  alt: "Pins au coucher du soleil dans le massif des Pindes, lors d'une itinérance à ski en Grèce.",
  width: 1448,
  height: 1086,
};

// Photo d'ouverture de la page carnet, fournie par Yann le 22/09/2026 en
// même temps que la photo de couverture ci-dessus — même remarque : hors du
// manifeste des 65 photos.
const ouvertureTraverseeCretesEnneigees: CarnetPhoto = {
  src: `${IMG}grece-pindes-traversee-ski-randonnee-cretes-enneigees.png`,
  alt: "Deux skieurs de randonnée sur une crête enneigée, grand paysage de montagnes, lors d'une itinérance à ski en Grèce.",
  width: 1448,
  height: 1086,
};

const photos = {
  tzoumerkaSecteurTheodorianaArriveeDevantUnCafe: photo("tzoumerka-secteur-theodoriana-arrivee-devant-un-cafe-grece-01.jpg"),
  tzoumerkaSecteurTheodorianaFerryEtAvionAuPort: photo("tzoumerka-secteur-theodoriana-ferry-et-avion-au-port-grece-02.jpg"),
  tzoumerkaSecteurTheodorianaPortraitDansUneEpicerie: photo("tzoumerka-secteur-theodoriana-portrait-dans-une-epicerie-grece-03.jpg"),
  tzoumerkaSecteurTheodorianaPortraitAuRefuge: photo("tzoumerka-secteur-theodoriana-portrait-au-refuge-grece-04.jpg"),
  tzoumerkaSecteurTheodorianaDepartAPiedEnForet: photo("tzoumerka-secteur-theodoriana-depart-a-pied-en-foret-grece-05.jpg"),
  tzoumerkaSecteurTheodorianaTraverseeASkiSurNeige: photo("tzoumerka-secteur-theodoriana-traversee-a-ski-sur-neige-grece-06.jpg"),
  tzoumerkaSecteurTheodorianaPentesDePoudreuseSousLesCretes: photo("tzoumerka-secteur-theodoriana-pentes-de-poudreuse-sous-les-cretes-grece-07.jpg"),
  pindePerivoliVasilitsaPinIsoleAuCoucherDuSoleil: photo("pinde-perivoli-vasilitsa-pin-isole-au-coucher-du-soleil-grece-08.jpg"),
  pindeSmolikasPadesSommetEnneige: photo("pinde-smolikas-pades-sommet-enneige-grece-09.jpg"),
  tzoumerkaValleeDeMatsoukiClocherDePierre: photo("tzoumerka-vallee-de-matsouki-clocher-de-pierre-grece-10.jpg"),
  tzoumerkaSecteurTheodorianaVillageDeMontagne: photo("tzoumerka-secteur-theodoriana-village-de-montagne-grece-11.jpg"),
  tzoumerkaSecteurTheodorianaPassageSurEscalierDePierre: photo("tzoumerka-secteur-theodoriana-passage-sur-escalier-de-pierre-grece-12.jpg"),
  tzoumerkaSecteurTheodorianaEgliseDeVillage: photo("tzoumerka-secteur-theodoriana-eglise-de-village-grece-13.jpg"),
  pindeSmolikasPadesCuisinierAuRefuge: photo("pinde-smolikas-pades-cuisinier-au-refuge-grece-14.jpg"),
  pindeSmolikasPadesPinMontagnard: photo("pinde-smolikas-pades-pin-montagnard-grece-15.jpg"),
  pindeVasilitsaSamarinaInterieurDeCabane: photo("pinde-vasilitsa-samarina-interieur-de-cabane-grece-16.jpg"),
  pindePerivoliVasilitsaSkiEnForetDePins: photo("pinde-perivoli-vasilitsa-ski-en-foret-de-pins-grece-17.jpg"),
  pindePerivoliVasilitsaSkisFaceAuPaysage: photo("pinde-perivoli-vasilitsa-skis-face-au-paysage-grece-18.jpg"),
  pindePerivoliVasilitsaPauseEnMontagne: photo("pinde-perivoli-vasilitsa-pause-en-montagne-grece-19.jpg"),
  tzoumerkaValleeDeMatsoukiDinerEnRefuge: photo("tzoumerka-vallee-de-matsouki-diner-en-refuge-grece-20.jpg"),
  tzoumerkaValleeDeMatsoukiGrandePenteDeNeige: photo("tzoumerka-vallee-de-matsouki-grande-pente-de-neige-grece-21.jpg"),
  pindePerivoliVasilitsaVirageSousLesPins: photo("pinde-perivoli-vasilitsa-virage-sous-les-pins-grece-22.jpg"),
  pindePerivoliVasilitsaPinsTorturesDansLaNeige: photo("pinde-perivoli-vasilitsa-pins-tortures-dans-la-neige-grece-23.jpg"),
  pindePerivoliVasilitsaChapelleGivreeAuCrepuscule: photo("pinde-perivoli-vasilitsa-chapelle-givree-au-crepuscule-grece-24.jpg"),
  pindeSmolikasPadesFranchissementDeRiviere: photo("pinde-smolikas-pades-franchissement-de-riviere-grece-25.jpg"),
  pindeSmolikasPadesTableeAuRefuge: photo("pinde-smolikas-pades-tablee-au-refuge-grece-26.jpg"),
  tzoumerkaSecteurTheodorianaSilhouetteALaFenetre: photo("tzoumerka-secteur-theodoriana-silhouette-a-la-fenetre-grece-27.jpg"),
  pindeVasilitsaSamarinaAmbianceUrbaine: photo("pinde-vasilitsa-samarina-ambiance-urbaine-grece-28.jpg"),
  pindeVasilitsaSamarinaMarcheursAuDepart: photo("pinde-vasilitsa-samarina-marcheurs-au-depart-grece-29.jpg"),
  pindeVasilitsaSamarinaPinSurCrete: photo("pinde-vasilitsa-samarina-pin-sur-crete-grece-30.jpg"),
  pindeSmolikasPadesGroupeEnTraversee: photo("pinde-smolikas-pades-groupe-en-traversee-grece-31.jpg"),
  pindePerivoliVasilitsaPenteAuDessusDesPins: photo("pinde-perivoli-vasilitsa-pente-au-dessus-des-pins-grece-32.jpg"),
  pindeVasilitsaSamarinaSkieurDansLaPoudreuse: photo("pinde-vasilitsa-samarina-skieur-dans-la-poudreuse-grece-33.jpg"),
  pindePerivoliVasilitsaVueVersLesVallees: photo("pinde-perivoli-vasilitsa-vue-vers-les-vallees-grece-34.jpg"),
  tzoumerkaValleeDeMatsoukiGrandeTraverseeASki: photo("tzoumerka-vallee-de-matsouki-grande-traversee-a-ski-grece-35.jpg"),
  tzoumerkaValleeDeMatsoukiSkieursAuDessusDuVallon: photo("tzoumerka-vallee-de-matsouki-skieurs-au-dessus-du-vallon-grece-36.jpg"),
  pindePerivoliVasilitsaSceneDeVillage: photo("pinde-perivoli-vasilitsa-scene-de-village-grece-37.jpg"),
  tzoumerkaValleeDeMatsoukiVillageAuCreuxDesMontagnes: photo("tzoumerka-vallee-de-matsouki-village-au-creux-des-montagnes-grece-38.jpg"),
  tzoumerkaValleeDeMatsoukiRefugeEtHospitalite: photo("tzoumerka-vallee-de-matsouki-refuge-et-hospitalite-grece-39.jpg"),
  tzoumerkaValleeDeMatsoukiPenteEnneigeeAuDessusDesVallees: photo("tzoumerka-vallee-de-matsouki-pente-enneigee-au-dessus-des-vallees-grece-40.jpg"),
  pindePerivoliVasilitsaPinsEnNeigeProfonde: photo("pinde-perivoli-vasilitsa-pins-en-neige-profonde-grece-41.jpg"),
  pindePerivoliVasilitsaSkieursSurVersant: photo("pinde-perivoli-vasilitsa-skieurs-sur-versant-grece-42.jpg"),
  tzoumerkaValleeDeMatsoukiTraverseeSurNeigeVierge: photo("tzoumerka-vallee-de-matsouki-traversee-sur-neige-vierge-grece-43.jpg"),
  pindePerivoliVasilitsaCretesDuPinde: photo("pinde-perivoli-vasilitsa-cretes-du-pinde-grece-44.jpg"),
  tzoumerkaValleeDeMatsoukiSceneChezLHabitant: photo("tzoumerka-vallee-de-matsouki-scene-chez-l-habitant-grece-45.jpg"),
  tzoumerkaValleeDeMatsoukiToastApresLaJournee: photo("tzoumerka-vallee-de-matsouki-toast-apres-la-journee-grece-46.jpg"),
  tzoumerkaValleeDeMatsoukiPorteDePierre: photo("tzoumerka-vallee-de-matsouki-porte-de-pierre-grece-47.jpg"),
  tzoumerkaValleeDeMatsoukiPortraitDansLEpicerie: photo("tzoumerka-vallee-de-matsouki-portrait-dans-l-epicerie-grece-48.jpg"),
  tzoumerkaValleeDeMatsoukiRepasPartage: photo("tzoumerka-vallee-de-matsouki-repas-partage-grece-49.jpg"),
  tzoumerkaValleeDeMatsoukiHotesAuRefuge: photo("tzoumerka-vallee-de-matsouki-hotes-au-refuge-grece-50.jpg"),
  tzoumerkaValleeDeMatsoukiGrandePenteAuDessusDuVallon: photo("tzoumerka-vallee-de-matsouki-grande-pente-au-dessus-du-vallon-grece-51.jpg"),
  tzoumerkaValleeDeMatsoukiEpicerieDeVillage: photo("tzoumerka-vallee-de-matsouki-epicerie-de-village-grece-52.jpg"),
  tzoumerkaValleeDeMatsoukiDetailsDUnEscalier: photo("tzoumerka-vallee-de-matsouki-details-d-un-escalier-grece-53.jpg"),
  tzoumerkaSecteurTheodorianaInterieurDeMaison: photo("tzoumerka-secteur-theodoriana-interieur-de-maison-grece-54.jpg"),
  tzoumerkaValleeDeMatsoukiRepasAuVillage: photo("tzoumerka-vallee-de-matsouki-repas-au-village-grece-55.jpg"),
  tzoumerkaSecteurTheodorianaOratoireSurUnArbre: photo("tzoumerka-secteur-theodoriana-oratoire-sur-un-arbre-grece-56.jpg"),
  tzoumerkaSecteurTheodorianaTableeEnCuisine: photo("tzoumerka-secteur-theodoriana-tablee-en-cuisine-grece-57.jpg"),
  tzoumerkaSecteurTheodorianaValleeMontagnarde: photo("tzoumerka-secteur-theodoriana-vallee-montagnarde-grece-58.jpg"),
  tzoumerkaSecteurTheodorianaMaisonDePierre: photo("tzoumerka-secteur-theodoriana-maison-de-pierre-grece-59.jpg"),
  tzoumerkaSecteurTheodorianaSkisEtSacsAuDepart: photo("tzoumerka-secteur-theodoriana-skis-et-sacs-au-depart-grece-60.jpg"),
  tzoumerkaSecteurTheodorianaMarcheSurSentierDeMontagne: photo("tzoumerka-secteur-theodoriana-marche-sur-sentier-de-montagne-grece-61.jpg"),
  tzoumerkaSecteurTheodorianaCoucherDeSoleilSurLesMontagnes: photo("tzoumerka-secteur-theodoriana-coucher-de-soleil-sur-les-montagnes-grece-62.jpg"),
  pindePerivoliVasilitsaCafePartageAuRefuge: photo("pinde-perivoli-vasilitsa-cafe-partage-au-refuge-grece-63.jpg"),
  pindePerivoliVasilitsaRetourEnForet: photo("pinde-perivoli-vasilitsa-retour-en-foret-grece-64.jpg"),
  pindeVasilitsaSamarinaRandonneurParmiLesPins: photo("pinde-vasilitsa-samarina-randonneur-parmi-les-pins-grece-65.jpg"),
};

const itinerary: Carnet["itinerary"] = {
  eyebrow: "Itinéraire",
  title: "7 jours. Du Tzoumerka au Smolikas.",
  intro:
    "Une traversée des montagnes de l'Épire, des reliefs minéraux du Tzoumerka aux longues crêtes boisées des Pindes, jusqu'au deuxième sommet de Grèce.",
  days: [
    {
      dayNum: "J1",
      title: "Refuge Stavros → Kalarites",
      text: "Passage par Nereda et Matsouki avant de rejoindre à pied le village de Kalarites.",
      distanceKm: 28.7,
      ascentM: 1840,
      descentM: 1740,
      elevationMin: 740,
      elevationMax: 2150,
    },
    {
      dayNum: "J2",
      title: "Kalarites → Matsouki",
      text: "Col Baros, sommet du Kalogiros puis Souflomiti SE, avant la descente vers Matsouki.",
      distanceKm: 24.5,
      ascentM: 1820,
      descentM: 1810,
      elevationMin: 1110,
      elevationMax: 2110,
    },
    {
      dayNum: "J3",
      title: "Matsouki → Anthochori",
      text: "Traversée par le lac Noss et le massif de Balcaz, puis longue descente jusqu'à Anthochori.",
      distanceKm: 20.3,
      ascentM: 1390,
      descentM: 1500,
      elevationMin: 1040,
      elevationMax: 2300,
    },
    {
      dayNum: "J4",
      title: "Anthochori → Périvoli",
      text: "Entrée dans les Pindes par les longues crêtes de la Valia Kalda, entre forêts de hêtres, pins centenaires et sommets arrondis.",
      distanceKm: 30.6,
      ascentM: 1880,
      descentM: 2110,
      elevationMin: 1290,
      elevationMax: 2180,
    },
    {
      dayNum: "J5",
      title: "Périvoli → Vasilitsa",
      text: "Longue traversée de crêtes jusqu'à la station de Vasilitsa, en suivant les secteurs encore enneigés.",
      distanceKm: 18.7,
      ascentM: 1520,
      descentM: 1010,
      elevationMin: 1300,
      elevationMax: 2260,
    },
    {
      dayNum: "J6",
      title: "Vasilitsa → Samarina",
      text: "Crêtes sommitales, chapelles orthodoxes et longues descentes entre les pins avant de rejoindre Samarina.",
      distanceKm: 16.7,
      ascentM: 1190,
      descentM: 1630,
      elevationMin: 1120,
      elevationMax: 2140,
    },
    {
      dayNum: "J7",
      title: "Samarina → Smolikas → Pades",
      text: "Ascension du Smolikas, deuxième sommet de Grèce, puis dernière descente vers Pades pour achever la traversée.",
      distanceKm: 22.4,
      ascentM: 1820,
      descentM: 2080,
      elevationMin: 1150,
      elevationMax: 2640,
    },
  ],
};

// Totaux calculés depuis l'itinéraire structuré ci-dessus (analyse GPX
// réelle) — jamais une valeur en dur, voir totals.
const totals = computeItineraryTotals(itinerary.days);
const PERIOD_LABEL = "Fin février 2026"; // "10 jours, dont 7 jours de ski, fin février 2026" (WordPress)

export const grece: Carnet = {
  slug: "raid-ski-grece-tzoumerka-pinde",
  seo: {
    title: "Ski en Grèce : traversée du Tzoumerka et des Pindes",
    description:
      "Sept jours de traversée à ski en Grèce, du Tzoumerka aux Pindes : villages de pierre, pins centenaires et sommet du Smolikas.",
    ogImage: ouvertureTraverseeCretesEnneigees.src,
  },
  masthead: {
    eyebrow: "Carnet de voyage",
    title: "GRÈCE",
    subtitle: "Du Tzoumerka au Smolikas",
    meta: [
      PERIOD_LABEL,
      formatDaysLabel(totals.days),
      formatDistanceKm(totals.distanceKm),
      formatAscent(totals.ascentM),
      formatDescent(totals.descentM),
    ],
  },
  openingPhoto: ouvertureTraverseeCretesEnneigees,
  intro: {
    heading: "LES PINS CENTENAIRES",
    paragraphs: [
      "Skier en Grèce. Dans l'imaginaire collectif, ce n'est ni un pays de neige, ni un pays de ski. C'est justement pour cela que j'avais envie d'y aller : pour l'improbable, l'inattendu et les doutes.",
      "Nous avons choisi de rejoindre l'Épire sans avion, par le train puis le ferry. Ensuite viennent le Tzoumerka, raide et minéral, ses villages de pierre et ses monastères suspendus, puis les Pindes, plus douces, avec leurs longues crêtes et leurs pins centenaires. Sept jours de traversée jusqu'au Smolikas, deuxième sommet de Grèce, pour un voyage dont, quelques jours avant le départ encore, je n'étais sûr de presque rien.",
    ],
    photo: { ...photos.pindeSmolikasPadesGroupeEnTraversee, position: "75% center" },
  },
  info: {
    label: "Informations",
    fields: [
      { label: "Pays", value: "Grèce" },
      { label: "Massif", value: "Tzoumerka & Pindes" },
      { label: "Départ", value: "Refuge Stavros" },
      { label: "Arrivée", value: "Pades" },
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
    title: "Theodoriana → Agia Paraskevi",
    note: "Carte interactive — zoom volontairement limité.",
    gpx: "/gpx/grece-tzoumerka-pinde-2026.gpx",
  },
  itinerary,
  story: {
    eyebrow: "Le récit",
    toggleLabel: "Le récit complet",
    // Texte source fourni par Yann le 18/09/2026, édité a minima (orthographe,
    // accords, coquilles, découpage en paragraphes/intertitres pour la
    // lecture web — voir liste des corrections en tête de fichier). Deux
    // écarts signalés et traités sans trancher en silence : (1) la phrase
    // "Ainsi se termine notre traversée..." apparaissait au milieu du texte
    // source, avant 4 paragraphes de récit supplémentaires (Samarina,
    // Smolikas, Ioannina) — visiblement une conclusion d'un brouillon
    // antérieur restée collée par erreur, retirée ; (2) la note "Description
    // à compléter" (à la suite du passage sur Christos et sa radio) était une
    // note de Yann à lui-même, retirée de la version publiée. Une version
    // "Facebook" plus courte du même voyage a aussi été fournie par Yann mais
    // n'est pas utilisée ici : elle recoupe le texte long sans rien y
    // ajouter, et ce dernier est toujours plus fidèle/détaillé.
    sections: [
      {
        heading: "Le voyage commence avant les skis",
        paragraphs: [
          "4h, le réveil sonne. Je sais que la journée va être longue parce que pour nous rendre jusqu'en Grèce, nous avons choisi de ne pas prendre l'avion. Ne pas prendre l'avion, ça implique d'enchaîner plusieurs modes de transport. D'abord se rendre jusqu'à Novara en voiture, et laisser la voiture là-bas pour prendre un premier train puis un deuxième train jusqu'à Brindisi, dans les Pouilles, tout au sud de l'Italie. Ensuite, si tout se passe bien, nous embarquerons sur un ferry qui, dans la nuit, va nous conduire jusqu'à Igoumenitsa, un port grec situé dans le nord-ouest, dans la région de l'Épire.",
          "De là, encore quelques heures de taxi, et nous pourrons enfin chausser les skis, dans le sud du massif du Tzoumerka, situé au sud du massif des Pindes.",
          "Évidemment, tout ne se passe pas comme prévu. Nous avions prévu de partir avec la voiture d'Aurélien, un vieux Scénic du début des années 2000. Mais au bout de quelques kilomètres, celui-ci se met en défaut. Nous récupérons Aurélien, laissons sa voiture là, et partons finalement avec celle d'Osman.",
          "À quelques kilomètres du Tunnel du Mont-Blanc, un panneau d'affichage indique : « Route d'accès au tunnel fermée, tir d'avalanche ». Il a neigé cette nuit, une fois de plus, et le risque d'avalanche dans les Alpes françaises est maximal. Nouvelle sueur froide à l'idée de ne pas tenir les horaires. Après quelques minutes d'attente, la file de voitures se remet en mouvement. Les barrières se lèvent, le trafic reprend, et nous passons sans encombre.",
          "À Novara, le petit parking que j'utilise habituellement est plein. Encore une incertitude. Nous finissons par trouver une place pour laisser la voiture. Train régional pour Milan. Trois pizzas à emporter dans une mauvaise pizzeria près de la Gare centrale de Milan. Puis nous levons les yeux vers le bâtiment, massif, monumental, presque écrasant. Une architecture de pierre qui impose plus qu'elle n'accueille.",
          "Sept heures de train jusqu'au sud de l'Italie. Je jubile. J'aime cette manière lente de voyager.",
          "À Rimini, le train s'arrête. Longtemps. Puis un message : pour des raisons d'enquête judiciaire, le trafic est interrompu pour deux heures. Quelqu'un s'est jeté sous le train précédent — paix à son âme — mais, pour nous, ça complique tout. Calcul rapide : ça va être serré.",
          "Le train repart. J'espère encore. Un appel à la compagnie de ferry met fin à l'illusion : il faut être là au moins une heure avant le départ. Avec notre retard, c'est impossible.",
          "Je réserve un hôtel à Brindisi. Je réorganise. J'informe le groupe. Je leur réserve un taxi pour qu'ils puissent rejoindre le départ de la première étape sans nous.",
          "Le lendemain matin, nous profitons de cette escale forcée pour visiter un peu Brindisi. Puis direction le port, après avoir acheté quelques rusticos et pasticciotti. La traversée se fait sur une mer agitée. Vu l'heure d'arrivée prévue et les trois heures de route vers le Tzoumerka, je décide de dormir à Igoumenitsa.",
        ],
      },
      {
        heading: "Premiers virages dans le Tzoumerka",
        paragraphs: [
          "Départ avant l'aube le lendemain pour rejoindre les clients et attaquer la première étape de notre traversée du Tzoumerka. Plus de 2000 mètres de dénivelé. Objectif : Matsouki, puis à pied, skis sur le dos, Kalarites.",
          "Depuis plusieurs jours, je doute de l'enneigement. Impossible de lire clairement la limite sur les images satellites. Cette première étape est décisive. Je n'ai réservé que cette première partie ; la suite reste conditionnelle.",
          "7 h. Refuge Stavros. Petite cahute perchée, vue plongeante sur la vallée. Retrouvailles avec le groupe.",
          "À Nereda, aucune âme qui vive. Vers 1500 mètres, plein sud, nous chaussons les skis. Bon signe.",
          "Le ciel annoncé dégagé se referme rapidement. Brouillard. Premier col, puis second, sans visibilité, à peine le bout des spatules. Puis les nuages se déchirent. Lumière. Neige facile. Grandes courbes. À 1500 mètres, fin de la neige, aussi bien en nord qu'en sud. Étrange.",
          "Longue marche jusqu'à Matsouki. Un ancien nous salue. Sur la place, un grand feu : c'est la période des Apokries, le carnaval grec précédant le Carême. Déguisements, musique, feu devant la chapelle.",
          "Sentier pavé, monastère suspendu au-dessus de la vallée. Puis descente vers Kalarites.",
          "19 h. Première bière. Quatre heures de marche avec les skis sur le dos.",
        ],
      },
      {
        heading: "Chez Napoléon, à Kalarites",
        paragraphs: [
          "Nous dormons chez Napoléon Zaglis. Un homme qui doit probablement être dans sa septième décennie, à la silhouette trapue, avec son regard rieur et sa moustache épaisse qui marque son visage. Avec sa femme, ils tiennent un restaurant-épicerie et quelques chambres. D'emblée, nous ressentons un accueil chaleureux, chez eux et chez leur employé, au regard rieur, lui aussi. Lorsque Thomas lui demande du vin « Isabella », un vin marketé et de production conventionnelle, sa réaction est immédiate : « we don't have this wine, it's illegal to serve that! ». Tout ça pour dire que chez Napoléon, seuls entrent les bons produits !",
          "Les plats s'enchaînent, et la table est bientôt recouverte d'assiettes garnies : salade grecque, salade de saison, viandes de toutes sortes, fromage.",
          "Sur la place, la fête continue. Un immense brasier, le nom du village découpé en grandes lettres devant les flammes. La musique traditionnelle s'élève : des sonorités presque orientales, entraînantes, hypnotiques. Des Grecs nous tendent la main et nous formons bientôt une ronde. Nous sommes happés dans la danse. Main dans la main, nous tournons autour du feu. On nous tend un verre, une assiette. Impossible de refuser.",
          "Décidément, ces Grecs ont l'âme généreuse.",
          "La chambre est dominée par de vieilles boiseries sombres, patinées par le temps. Le bois encadre les fenêtres, habille les murs, compose la tête de lit. Une odeur légère de résine flotte encore. Mobilier simple, massif. Rien de superflu. On sent la montagne et les hivers passés.",
          "Ce matin, c'est la femme de Napoléon qui nous sert le petit déjeuner, et lorsque son mari arrive dans la salle, nous sentons que chez eux, l'amour ne s'érode pas avec les années.",
        ],
      },
      {
        heading: "Col Baros et le Kalogiros",
        paragraphs: [
          "Nous repartons sur la route goudronnée qui monte au col Baros, puis nous la quittons pour un sentier qui bientôt se perd dans les broussailles. Le raccourci ne nous fait pas gagner de temps ce matin. Nous débouchons sur un petit promontoire, où une chapelle domine toute la vallée. Nous sonnons la cloche ! Comme la veille, nous chaussons à 1500 m, puis remontons une crête arrondie jusqu'au sommet du Kalogiros (2088 m).",
          "Aujourd'hui, nous avons peu de distance effective, alors nous en profitons pour faire un peu de ski. La neige est particulièrement bonne, une petite couche de poudreuse au-dessus d'un fond dur. Et safe !",
          "Nous redescendons la grande pente Est du Kalogiros, puis remontons au Souflomiti SE. Les deux combes suivantes, plein nord, nous régalent. J'avais peur que la neige ait commencé à se transformer en nord, mais que cette transformation soit partielle et que l'on skie de la mauvaise neige croûtée. Mais il y a eu deux jours de beau temps la semaine précédente, puis une nouvelle petite chute de neige la veille de notre arrivée, stabilisant les conditions nivologiques et rendant le ski plaisant ! Et malgré la chaleur, cette poudreuse ne bouge pas, étonnamment !",
          "Après avoir pas mal porté les skis les deux jours précédents, cette fois-ci nous descendons et remontons à pied dans le même vallon. Nous vidons donc nos sacs, au sens propre, et filons par une piste forestière jusqu'au village de Matsouki, atteint alors que l'éclairage public commence à illuminer les ruelles en pierre. Un panneau indique « La Verliga, radio ». Christos Zacharis, le tenancier du bar-restaurant homonyme, est également journaliste et animateur de cette web radio, en langue aspropotame et valaque.",
        ],
      },
      {
        heading: "Dormir chez Christos",
        paragraphs: [
          "Nous pénétrons dans une pièce sombre, éclairée par des guirlandes lumineuses, et au sol en dalle de pierre. Un gros chien blanc y trône, au milieu des tables. Les banquettes sont recouvertes de tissus à poils longs, coutumiers de ces lieux. Aux bières succèdent de nombreux mets, toujours très salés (comme souvent ici !) : salade de tomate, boulettes de viande, bœuf et porc, des morceaux d'agneaux, fromage…",
          "Puis arrive le moment d'aller au lit. Thomas, qui avait discuté avec Christos, semble dire que nous allons dormir dans différentes maisons du village.",
          "Aux questions pressantes et un brin inquiètes d'Amélie, Christos nous montre les différentes banquettes qui couvrent l'intégralité des murs de son restaurant. Des banquettes d'une trentaine de centimètres de large, sur lesquelles sont posées de petites mousses et ces fameuses couvertures à poil long. Nous pensons qu'il plaisante. Mais rapidement, nous comprenons que nous devrons dormir dans cette pièce.",
          "Chacun à notre tour, nous testons les banquettes. Elles sont vraiment étroites et la petite mousse est très fine ; elle n'absorbe pas complètement la dureté des bancs en bois. Alors nous réorganisons la salle du restaurant. Nous poussons les tables et installons ces petites mousses à terre, une couche de mousse à même les pierres qui constituent le pavement du sol, et la couverture à poil long par-dessus. Quatre petites mousses en largeur, soit environ 1,20 m, constituent ainsi un lit double.",
          "Nous nous installons tout autour du poêle et Thomas et Mathieu s'affaireront toute la nuit à le charger afin qu'il continue à nous chauffer.",
          "La nuit n'a pas été si mauvaise, enfin peut-être pas pour tout le monde. Le grand chien blanc de Christos a dormi avec nous et, tout excité au petit matin, il se frotte à chacun de nous en guise de salut matinal.",
        ],
      },
      {
        heading: "Le chien de Christos et le lac Noss",
        paragraphs: [
          "Nous remontons jusqu'au petit col, mais arrivé là-haut, Aurélien a disparu. Il me suivait pourtant. Le groupe s'était un peu étiré, chacun marchant à son rythme sur cette piste parcourue la veille. Les minutes passent et Aurélien ne pointe pas le bout de son nez. Étonnant sans l'être vraiment. Nous connaissons Aurélien, prompt à perdre ses affaires et parfois à se perdre lui-même. C'est Aurèle, il est comme ça, et on l'adore comme ça.",
          "Au bout d'une demi-heure, je me résous à l'appeler. Il est déjà monté deux fois jusqu'à la neige sans nous trouver. Je lui envoie ma position sur WhatsApp, je lui dis d'allumer Google Maps, et bientôt le voilà remis sur le bon chemin.",
          "Le chien de Christos nous a suivis. Il semble heureux dans la neige, parcourant trois fois la distance que nous couvrons. Mais les bourrasques de vent lui piquent les yeux et lui fouettent les moustaches.",
          "Du col, nous basculons par une combe un peu raide puis remontons vers le sommet du lac Noss, point culminant au nord du massif de Balcaz. Quelques passages raides compliquent la progression du chien. Je préférerais qu'il rentre au village plutôt qu'il ne bascule avec nous. Une traversée trop raide aura raison de ses capacités sur la neige gelée. Nous le perdons ici, en espérant qu'il redescende vers son maître.",
          "De l'autre côté, une belle combe nous offre une neige délicieuse à skier. Mais vers 1500 mètres, il faut déjà renfiler les baskets. Un sentier non indiqué sur la carte nous ramène à Anthochori, dernière halte dans ce massif sauvage et idéal pour le ski. En trois jours, nous n'avons croisé personne, seulement une trace de raquette.",
          "Hélène nous accueille chaleureusement. Trois chambres : deux pour les couples, une pour les célibataires. Elle n'a normalement pas le droit de cuisiner pour les clients, mais faute de restaurant accessible, elle nous prépare un repas en nous demandant de rester discrets. Elle semble heureuse de nous faire goûter une spécialité locale.",
          "Plus tard, nous traversons la route pour aller boire un verre. Un poêle trône au milieu de la pièce avec un long tubage horizontal et des coudes à 90 degrés qui feraient vaciller les normes françaises. Ici, on garde la chaleur dedans. Derrière nous, des anciens fument. À notre retour, nos vêtements sentent fortement la cigarette.",
          "Un message à Christos : son chien n'est toujours pas rentré. Cela nous inquiète. Avions-nous fait le bon choix ?",
        ],
      },
      {
        heading: "Vers les Pindes",
        paragraphs: [
          "Le lendemain, nous partons vers les Pindes. Le relief est plus doux que dans le Tzoumerka : montagnes arrondies, crêtes interminables. Les images satellites Copernicus me font modifier l'itinéraire pour éviter une zone sans neige. Nous avançons de crête en crête.",
          "Les hêtres dominent d'abord, puis plus haut apparaissent les pins torturés. La plupart sont étêtés, ils ont perdu leur tête, sculptés par les tempêtes. Ces pins sont majestueux.",
          "Après près de 2000 mètres de dénivelé, le soleil décline. Nous décidons de monter au sommet pour le coucher. Là-haut, une petite chapelle blanche et, à perte de vue, les montagnes grecques baignées de lumière orangée. Il fait froid mais la beauté du moment nous le fait oublier.",
          "La descente est incroyable : quelques centimètres de poudreuse sur fond dur, relief lisse, puis une forêt de hêtres dense.",
          "Nous sommes récupérés au col pour éviter la longue route goudronnée vers Périvoli. Descente en courant, de nuit, avec les lumières du village en toile de fond.",
          "Dans la grande salle vitrée du restaurant, deux poêles chauffent la pièce. Encore des chiens. Le repas arrive : tzatziki, salades grecques, viande en sauce avec du riz. Peut-être la meilleure cuisine du séjour.",
          "La tenancière nous raconte leur vie ici, sept mois par an au village. Tout a été construit par elle et son mari. Leur passion est devenue leur travail. Elle parle avec fierté de la Valia Kalda et de son attachement au territoire.",
        ],
      },
      {
        heading: "Vasilitsa",
        paragraphs: [
          "Le lendemain, longue crête pour relier Périvoli à Vasilitsa, seul passage encore enneigé. Une petite combe nord nous offre quelques virages avant une interminable montée vers le sommet au-dessus de la station. De là, nous rejoignons facilement le col et la station.",
          "J'avais initialement réservé à Smixi, mais la blessure de Yanis complique la logistique. Finalement, nous dormons à Vasilitsa 1850, hybride entre hôtel de station et refuge, en dortoir.",
          "Le système de restauration est particulier. Il faut bien choisir : excellente soupe de haricots, bon veau sauce tomate-citron, burgers inégaux. Nous étions pourtant plusieurs ravis de retrouver, le temps d'un soir, nos plats occidentaux.",
          "Yanis est très sympa, il a vécu à Chamonix pendant le Covid. Panos paraît bourru, mais nous ne nous arrêterons pas à cette première impression.",
        ],
      },
      {
        heading: "Une journée de transition",
        paragraphs: [
          "Ici, nous sommes loin du refuge de montagnards où les conditions de la montagne guident l'heure du réveil. Ici, nous devons composer avec le rythme de la station de ski, et il n'y a pas de possibilité de petit déjeuner avant 8 h. Et toujours ce système de prise de commande bizarre, à la carte mais où le menu n'est disponible que de la bouche du tenancier. Heureusement que la journée est courte et que nous ne sommes pas trop pressés. Finalement, cette journée de « transition » sera plus longue que prévu !",
          "La première montée se termine sur une magnifique arête cornichée, qui nous permet de rejoindre ces petites chapelles orthodoxes typiques de certains sommets grecs, modestes constructions dédiées à un saint et souvent érigées au point culminant, comme un signe discret du lien entre la montagne et le sacré. La descente, sur une neige transformée à point, se transforme en une épreuve de slalom entre les pins, dont l'implantation est plus ou moins dense. Je comprends à l'excitation de mes compagnons qu'ils en veulent davantage. Nous remontons donc au sommet sous une chaleur de plomb.",
          "De là, deux options s'offraient à moi : soit respecter la ligne tracée la veille, qui semblait être optimisée pour prolonger le plus possible la glisse au regard des derniers clichés satellites du massif, soit se laisser happer par la pente, et aviser ensuite. Évidemment, la deuxième option l'a rapidement emporté, nous plongeant dans un versant peu commode. Un bon bourbier en perspective, à moins de traverser à flanc un versant vallonné et torturé. Le grattage ne suffira pas, et nous devrons repeauter, provoquant quelques protestations au sein du groupe ! Heureusement qu'un spot de pique-nique dominant la vallée nous attendait au sommet !",
          "La suite de la descente n'est pas plus roulante, et rapidement, nous lâchons l'affaire. Troquer les skis contre les baskets ne nous tire pas d'affaire pour autant. Le sentier est en contrebas mais une section de forêt dense et raide nous en sépare. Je ne suis pas mécontent de retrouver les points jaunes, entourés d'un cerclage rouge, qui balisent les chemins ici. Nous rejoignons un sentier à flanc de montagne, tracé au milieu des pins centenaires. Au niveau d'une carrière, l'un d'eux, énorme, se tient même sur deux jambes, résultant peut-être de la fusion de deux pins.",
          "Depuis le début de notre séjour ici, nous constatons avec désolation les conséquences des crues de l'automne, qui ont ravagé l'Épire. Ici, le pont qui devait nous permettre de traverser la rivière a disparu, nous obligeant à tester, au moins pour partie, sa température.",
          "Nous arrivons enfin au monastère, celui-là même qui nous paraissait si proche quelques heures plus tôt. De là, deux équipes se forment : ceux que notre hôte vient récupérer en voiture, et ceux qui marchent, ou courent, délestés de leurs sacs à dos.",
        ],
      },
      {
        heading: "Samarina et les pins centenaires",
        paragraphs: [
          "Nous arrivons à Samarina, village assez gros, où la plupart des maisons ont leurs volets clos. Juste à côté de la Guest House, un grand bâtiment couvert en bac acier rouge semble être une église. Là, sur le toit d'une petite annexe pousse un gros pin, symbole de ce massif où cet arbre pousse en maître. Une vieille photo en noir et blanc, probablement en argentique, montre ce même arbre et des prêtres en soutane. Étonnamment, il ne semble pas avoir tant grossi depuis cette période, révélant peut-être la lenteur de pousse de ces arbres, dont certains doivent être multi-centenaires. Les propriétaires de la Guest House gèrent également un restaurant au centre-ville, où ils nous convient pour le dîner.",
          "Paradoxalement, le centre de Samarina est animé. Plusieurs restaurants entourent la place centrale. Heureusement que Mike vient à notre rencontre, car nous aurions pu assez facilement entrer dans une mauvaise adresse. À l'entrée de sa taverne, un agneau dépecé et pendu par les pattes arrières pose le cadre de ce qui est proposé à la carte ! A priori, on va plutôt manger carné ce soir. Nous donnons carte blanche à Mike, et bientôt, la table se recouvre de nombreux mets, de sorte que la nappe devient invisible. Des tripes, de l'agneau, du bœuf et du porc, et quelques accompagnements, de façon accessoire.",
          "Pour la première fois depuis le début de la traversée, une vraie carte de vin va nous permettre de découvrir cet élément de la culture grecque. Nous confrontons le pinot noir et le Tannat, cépages plutôt répandus en Europe, au Xinomavro, cépage autochtone qui magnifie un vin produit en biodynamie. Un coup de cœur pour l'équipe, et en premier lieu pour notre vigneron exigeant !",
        ],
      },
      {
        heading: "Le Smolikas",
        paragraphs: [
          "Dernier jour, et non des moindres, puisque nous projetons l'ascension du deuxième sommet le plus haut de Grèce, le Smolikas. Pour une fois, nous insistons un petit peu plus qu'à l'accoutumée pour pouvoir prendre un petit déjeuner matinal. J'ai dit à Panagiotis que nous serons à 15 h au point de rendez-vous fixé, soit de l'autre côté du Smolikas.",
          "Samarina est relativement élevé et, à près de 1500 mètres d'altitude, ce village nous offre la possibilité de partir presque skis aux pieds.",
          "Le Smolikas se présente comme une longue arête sommitale, ponctuée de plusieurs cimes successives. Le jeu de la journée va consister à gratter au maximum la neige pour s'éviter de couvrir ces distances à pied. Ainsi, dès que nous rejoignons un point haut et qu'une pente se prête à une très rapide descente, nous nous laissons glisser pour rejoindre le sommet suivant.",
          "À la fin, à quelques encablures du point culminant de la crête, la neige transformée est si bonne que le grattage se mue en une belle descente. Une descente que nous paierons au prix du dénivelé à remonter, mais tel est le jeu du ski de randonnée.",
          "Et voilà, nous sommes tous réunis au sommet, au sommet de cette traversée d'une semaine à travers les monts de l'Épire, une traversée incroyable. Je n'étais sûr de rien lorsque j'ai tracé cet itinéraire, et j'étais encore moins sûr, à quelques jours du départ, lorsque je voyais la limite d'enneigement si haute.",
          "C'est sûrement le voyage qui m'a demandé le plus de préparation, à la fois parce que les Grecs ont cette fâcheuse tendance à ne pas répondre aux messages lorsqu'ils utilisent des messageries cryptées, et parce que, pour beaucoup d'autres, il est presque impossible de les joindre autrement que par téléphone ou par SMS.",
          "D'ici, nous voyons notre point de départ : le Kakarditsa, point culminant du massif du Tzoumerka, au pied duquel nous sommes passés quelques jours plus tôt. Ça paraît loin, immensément loin. Et puis, un peu plus proches, ces monts arrondis qui marquent l'entrée méridionale du massif des Pindes.",
          "Reste la descente, qui encore une fois ne semble pas tout à fait évidente. Le jeu, comme depuis le début de ce voyage, consiste à optimiser au maximum la limite d'enneigement, à gratter la neige là où elle subsiste et à descendre à ski presque coûte que coûte.",
          "Mais à ce jeu-là, nous ne gagnons jamais en dessous de 1500 mètres d'altitude. C'est par un sentier évoluant dans une végétation méridionale que nous terminons cette belle traversée, et retrouvons Panagiotis dans le village de Pades.",
          "Nous déposons nos compagnons du sud-ouest à Ioannina, avec un au revoir expéditif au regard de ces bons moments partagés.",
        ],
      },
    ],
  },
  portfolio: {
    eyebrow: "Portfolio",
    title: "GRÈCE",
    subtitle: "Du Tzoumerka au Smolikas",
    meta: "Fin février 2026 · 7 jours de traversée à ski, du Tzoumerka aux Pindes · Photos : Yann Borgnet",
    // 65 photos disponibles au total (aucune exclue) : 17 visibles au
    // chargement, le reste derrière "Voir la suite du portfolio". Ordre :
    // celui du manifeste (manifeste-SEO-photos-retouchees-grece.json), proche
    // de la chronologie du séjour, sauf les deux premières (photo
    // d'ouverture et photo d'intro) remontées en tête — voir
    // src/data/photos/grece-2026.ts pour le détail des 5 secteurs.
    photos: [
      // --- visibles au chargement ---
      photos.pindePerivoliVasilitsaCretesDuPinde,
      photos.pindeSmolikasPadesGroupeEnTraversee,
      photos.tzoumerkaSecteurTheodorianaArriveeDevantUnCafe,
      photos.tzoumerkaSecteurTheodorianaFerryEtAvionAuPort,
      photos.tzoumerkaSecteurTheodorianaPortraitDansUneEpicerie,
      photos.tzoumerkaSecteurTheodorianaPortraitAuRefuge,
      photos.tzoumerkaSecteurTheodorianaDepartAPiedEnForet,
      photos.tzoumerkaSecteurTheodorianaTraverseeASkiSurNeige,
      photos.tzoumerkaSecteurTheodorianaPentesDePoudreuseSousLesCretes,
      photos.pindePerivoliVasilitsaPinIsoleAuCoucherDuSoleil,
      photos.pindeSmolikasPadesSommetEnneige,
      photos.tzoumerkaValleeDeMatsoukiClocherDePierre,
      photos.tzoumerkaSecteurTheodorianaVillageDeMontagne,
      photos.tzoumerkaSecteurTheodorianaPassageSurEscalierDePierre,
      photos.tzoumerkaSecteurTheodorianaEgliseDeVillage,
      photos.pindeSmolikasPadesCuisinierAuRefuge,
      photos.pindeSmolikasPadesPinMontagnard,
      // --- repliées derrière "Voir la suite du portfolio" ---
      photos.pindeVasilitsaSamarinaInterieurDeCabane,
      photos.pindePerivoliVasilitsaSkiEnForetDePins,
      photos.pindePerivoliVasilitsaSkisFaceAuPaysage,
      photos.pindePerivoliVasilitsaPauseEnMontagne,
      photos.tzoumerkaValleeDeMatsoukiDinerEnRefuge,
      photos.tzoumerkaValleeDeMatsoukiGrandePenteDeNeige,
      photos.pindePerivoliVasilitsaVirageSousLesPins,
      photos.pindePerivoliVasilitsaPinsTorturesDansLaNeige,
      photos.pindePerivoliVasilitsaChapelleGivreeAuCrepuscule,
      photos.pindeSmolikasPadesFranchissementDeRiviere,
      photos.pindeSmolikasPadesTableeAuRefuge,
      photos.tzoumerkaSecteurTheodorianaSilhouetteALaFenetre,
      photos.pindeVasilitsaSamarinaAmbianceUrbaine,
      photos.pindeVasilitsaSamarinaMarcheursAuDepart,
      photos.pindeVasilitsaSamarinaPinSurCrete,
      photos.pindePerivoliVasilitsaPenteAuDessusDesPins,
      photos.pindeVasilitsaSamarinaSkieurDansLaPoudreuse,
      photos.pindePerivoliVasilitsaVueVersLesVallees,
      photos.tzoumerkaValleeDeMatsoukiGrandeTraverseeASki,
      photos.tzoumerkaValleeDeMatsoukiSkieursAuDessusDuVallon,
      photos.pindePerivoliVasilitsaSceneDeVillage,
      photos.tzoumerkaValleeDeMatsoukiVillageAuCreuxDesMontagnes,
      photos.tzoumerkaValleeDeMatsoukiRefugeEtHospitalite,
      photos.tzoumerkaValleeDeMatsoukiPenteEnneigeeAuDessusDesVallees,
      photos.pindePerivoliVasilitsaPinsEnNeigeProfonde,
      photos.pindePerivoliVasilitsaSkieursSurVersant,
      photos.tzoumerkaValleeDeMatsoukiTraverseeSurNeigeVierge,
      photos.tzoumerkaValleeDeMatsoukiSceneChezLHabitant,
      photos.tzoumerkaValleeDeMatsoukiToastApresLaJournee,
      photos.tzoumerkaValleeDeMatsoukiPorteDePierre,
      photos.tzoumerkaValleeDeMatsoukiPortraitDansLEpicerie,
      photos.tzoumerkaValleeDeMatsoukiRepasPartage,
      photos.tzoumerkaValleeDeMatsoukiHotesAuRefuge,
      photos.tzoumerkaValleeDeMatsoukiGrandePenteAuDessusDuVallon,
      photos.tzoumerkaValleeDeMatsoukiEpicerieDeVillage,
      photos.tzoumerkaValleeDeMatsoukiDetailsDUnEscalier,
      photos.tzoumerkaSecteurTheodorianaInterieurDeMaison,
      photos.tzoumerkaValleeDeMatsoukiRepasAuVillage,
      photos.tzoumerkaSecteurTheodorianaOratoireSurUnArbre,
      photos.tzoumerkaSecteurTheodorianaTableeEnCuisine,
      photos.tzoumerkaSecteurTheodorianaValleeMontagnarde,
      photos.tzoumerkaSecteurTheodorianaMaisonDePierre,
      photos.tzoumerkaSecteurTheodorianaSkisEtSacsAuDepart,
      photos.tzoumerkaSecteurTheodorianaMarcheSurSentierDeMontagne,
      photos.tzoumerkaSecteurTheodorianaCoucherDeSoleilSurLesMontagnes,
      photos.pindePerivoliVasilitsaCafePartageAuRefuge,
      photos.pindePerivoliVasilitsaRetourEnForet,
      photos.pindeVasilitsaSamarinaRandonneurParmiLesPins,
    ],
    initialPortfolioCount: 17,
  },
  closing: {
    ctaLabel: "Voir d'autres carnets",
    ctaHref: "/carnets-de-voyage-ski/",
  },
};

/** Photo de couverture pour le listing /carnets-de-voyage-ski/ (voir
 *  src/data/carnets/index.ts) — même mécanisme que Bernina/Argentera. */
export const indexCover = couverturePinsCoucherDeSoleil;
