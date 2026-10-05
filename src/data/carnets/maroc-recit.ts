import type { CarnetPhoto, CarnetStorySection } from "./types";
import { marocPhotos } from "../photos/maroc-toubkal-2026";

/**
 * Récit complet de la page Maroc : texte intégral de l'article publié dans
 * Alpine Mag (24 février 2026), repris mot pour mot depuis
 * https://alpinemag.fr/raid-ski-de-rando-maroc-aventure-pays-berbere/
 * — titre, intertitres et ordre narratif d'origine. Seules corrections :
 * espaces doubles / espace avant le point, et trois coquilles manifestes
 * ("Depuis sa fenêtre embuée est entrouverte" → "Depuis sa fenêtre embuée
 * entrouverte", "Le tajine est ou délicieux" → "Le tajine est délicieux").
 * Ne sont pas reprises : les citations d'accroche du magazine (doublons de
 * phrases du texte), le bloc « Lire aussi » et le lien « Infos » vers ce site.
 * *…* = italique (voir CarnetStoryFlow).
 *
 * PHOTOS : les 95 photos exploitables de public/photos/Maroc/ sont réparties
 * en regard des passages. Pas d'EXIF (voir src/data/photos/maroc-toubkal-2026.ts)
 * donc placement thématique et non chronologique, jamais présenté comme tel.
 * 3 fichiers sont tronqués (≈ 90 % de l'image grise : groupe-a-ski-dans-la-
 * vallee-07097 et -07137, route-hivernale-et-vie-locale-07852) : exclus, pour
 * ne montrer aucune image cassée. 4 autres ont une bande grise en bas
 * (CROP_RATIO ci-dessous) : recadrées en CSS, fichier source intact.
 */

const IMG = "/photos/Maroc/";

/** Photos de Julien Bronnert (AJOUT_MANIFESTE_PHOTOS_JULIEN.csv) — toutes les autres : Yann Borgnet. */
const JULIEN = new Set([
  "refuge-montagne-ski-randonnee",
  "vallee-neige-ski-randonnee",
  "alpiniste-pic-rocheux",
  "sommets-neige-vue-panoramique",
  "skieur-porte-refuge",
  "traversee-groupe-a-ski",
  "monteur-ski-couloir-neige",
]);

/** Fichiers tronqués : exclus de toutes les galeries. */
export const MAROC_BROKEN = new Set([
  "groupe-a-ski-dans-la-vallee-07097",
  "groupe-a-ski-dans-la-vallee-07137",
  "route-hivernale-et-vie-locale-07852",
]);

/** Bande grise (JPEG tronqué) en bas de l'image : ratio de la partie saine, avec marge. */
const CROP_RATIO: Record<string, string> = {
  "retour-de-traversee-et-ambiance-du-groupe-07802": "1.95 / 1",
  "traversee-a-ski-et-meteo-montagne-07619": "1.68 / 1",
  "traversee-a-ski-et-meteo-montagne-07649": "1.76 / 1",
  "traversee-a-ski-et-meteo-montagne-07665": "1.82 / 1",
};

/** Photo Maroc à partir du suffixe SEO (sans "maroc-haut-atlas-toubkal-" ni ".jpg") ou du nom de fichier complet. */
export function photo(name: string, opts: { wide?: boolean } = {}): CarnetPhoto {
  const key = name.replace(/^maroc-haut-atlas-toubkal-/, "").replace(/\.jpg$/, "");
  const file = `maroc-haut-atlas-toubkal-${key}.jpg`;
  const meta = marocPhotos[file];
  const credit = JULIEN.has(key) ? "Julien Bronnert" : "Yann Borgnet";
  const crop = CROP_RATIO[key];
  return {
    src: `${IMG}${file}`,
    alt: meta.alt,
    width: meta.width,
    height: meta.height,
    caption: meta.legende ? `${meta.legende} — © ${credit}` : `© ${credit}`,
    ...(crop ? { cropRatio: crop, position: "center top", noZoom: true } : {}),
    ...(opts.wide ? { wide: true } : {}),
  };
}

export const marocRecit: CarnetStorySection[] = [
  {
    paragraphs: [
      "Nous sommes bringuebalés dans une vieille Peugeot 405. Quatre cent vingt mille kilomètres au compteur. À chaque relief du terrain, le bas de caisse racle la piste de terre, mouillée par la pluie qui tombe à verse depuis le milieu de la nuit. Au-dessus de nous, de vastes pans de montagnes et un talus déstabilisé par le terrassement de la route. Mohammed chante, ses mains gantées agrippent le volant. Mohammed prie.",
      "Derrière moi, Julien est pâle. Depuis sa fenêtre embuée entrouverte, il guette la chute de pierres, dans un silence pesant. Sa veste le protège des rafales de vent qui rabattent la pluie à l’intérieur de l’habitacle.",
      "Nous redescendons de Tizgui, un petit village berbère perdu à l’ouest du parc national du Toubkal. Dernière étape d’un périple où le terme d’aventure a pris tout son sens. L’aventure, comme un jeu avec les incertitudes : celles de la montagne, dont nous sommes coutumiers, et celles, plus locales, de l’administration marocaine… et, autant le dire, ces dernières nous ont décontenancés.",
    ],
    photos: [
      photo("route-hivernale-et-vie-locale-07916", { wide: true }),
      photo("route-hivernale-et-vie-locale-07875"),
      photo("route-et-village-sous-la-neige-05489"),
      photo("route-et-village-sous-la-neige-05543"),
      photo("route-et-village-sous-la-neige-05496"),
    ],
  },
  {
    heading: "La neige marocaine comme trouble-fête",
    paragraphs: [
      "D’entrée de jeu, la neige s’est immiscée dans les plans, les rendant irréalistes et nécessitant leur impérieuse recomposition. Cette neige, qui nous a pourtant appelés ici, me pousse dans mes retranchements. Quarante centimètres dans les rues d’Imlil. Événement rare. Nous sommes chanceux.",
      "Depuis hier soir, j’ai changé de *mindset*. Le plan initial est devenu totalement caduc, et il n’est plus temps de planifier quoi que ce soit. Je veux seulement ouvrir le champ des possibles, pouvoir improviser.",
      "Hier, nous sommes venus d’Imlil à ski, après avoir atterri le matin même à Marrakech. Les routes de montagne, au-delà, étaient coupées par la neige. À la va-vite, nous avons préparé nos sacs pour six jours de ski en laissant tout l’excédent à Hassan, notre chauffeur, qui nous les ramènera le dernier jour.",
      "Imlil. Nous chaussons les skis au cœur de la ville. Les habitants s’affairent à déneiger les toits plats, car l’eau s’y infiltre à la fonte de la neige. À chaque coin de ruelle, des Berbères nous proposent de prendre le thé, intrigués par notre attirail. Là, une petite rampe enneigée est le lieu de glissades variées pour les gamins du village : certains en luge, d’autres sur des sacs-poubelle, d’autres encore en ski, parfois chaussés en baskets.",
    ],
    photos: [
      photo("montee-a-ski-dans-la-neige-05753"),
      photo("route-et-village-sous-la-neige-05483"),
      photo("vie-de-village-et-accueil-berbere-05569"),
      photo("vie-de-village-et-accueil-berbere-05655"),
      photo("vie-de-village-et-accueil-berbere-05672"),
    ],
  },
  {
    paragraphs: [
      "Nous rejoignons le Tizi n’Tamatert, d’où apparaissent les faces nord du Likemt et de l’Igounouane, imposantes et chargées de neige. Le passage du col signe un changement net d’ambiance : le vent frais et la poudreuse du versant Tacchdirt remplacent la chaleur étouffante et la neige détrempée du versant Imlil.",
      "Tacchdirt s’illumine doucement, tandis que le muezzin entonne son chant. Nous rejoignons le village au crépuscule. Ibrahim nous accueille avec toute la gratitude que je lui connais, forgée au fil de nos nombreux échanges téléphoniques.",
      "Indécision. L’option Likemt, point de départ d’une possible traversée du Toubkal à ski, s’impose à l’esprit, mais elle est très risquée. Il y a trop d’incertitudes sur les conditions du manteau neigeux. Nos esprits fatigués n’ont plus guère d’énergie pour prendre une bonne décision, de fait remise au lendemain.",
    ],
    photos: [
      photo("montee-a-ski-dans-la-neige-05775"),
      photo("montee-a-ski-dans-la-neige-05813"),
      photo("montee-a-ski-dans-la-neige-05834"),
      photo("montee-a-ski-dans-la-neige-05984"),
      photo("montee-a-ski-dans-la-neige-05844"),
    ],
  },
  {
    heading: "Itinérance vers Timichchi",
    paragraphs: [
      "Au petit matin, la force du collectif aidant, nous décidons de partir explorer la vallée d’Ourika, à l’est de la station d’Oukaimeden. La veille, nous avions repéré des skieurs qui descendaient le Tizi n’Ou Addi, et une longue trace horizontale qui permettait de rejoindre la combe depuis Tacchdirt.",
      "Nous traversons les pentes sud en suivant ces traces de pas. Elles rejoignent le village suspendu de Talate n’Chaoute, et sa mosquée au minaret rose, comme partout ici.",
      "Au sommet de la combe, le Tizi n’Ou Addi donne accès à une belle pente en poudreuse peu touchée par le vent. Le projet initial consistait à aller manger un tajine à Oukaimeden, mais la faible déclivité de la vallée nous décourage rapidement.",
      "Juste au-dessus du Tizi n’Itbir, le col qui permet de faire la jonction entre le plateau d’Oukaimeden et la vallée d’Ourika, nous sommes tentés de rejoindre le petit sommet au nord. Le vent s’est tu et, à perte de vue, s’étend une étendue aride. Quel contraste !",
    ],
    photos: [
      photo("montee-a-ski-dans-la-neige-05712"),
      photo("troupeau-chevres-village-neige"),
      photo("vallee-et-pentes-du-haut-atlas-06045"),
      photo("vallee-et-pentes-du-haut-atlas-06072"),
      photo("vallee-et-pentes-du-haut-atlas-06092"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06206"),
    ],
  },
  {
    paragraphs: [
      "La combe, longue et régulière, est délicieuse à skier. Bientôt, nous arrivons au niveau d’un premier village, Agouns, d’où nous parvient une surprenante agitation, improbable à nos yeux dans un lieu aussi retiré. Partout, les habitants s’affairent à leurs occupations : les femmes sont dans le lit de la rivière, sûrement à la lessive, certains gardent les troupeaux de bovidés, les gamins jouent.",
      "Agouns est un village agro-pastoral perché à environ 2400 m d’altitude, dernier douar de la haute vallée de l’Ourika. Organisé en six petits quartiers au-dessus de terrasses cultivées d’orge, de maïs et de quelques légumes vivriers (navets, haricots, pommes de terre), ponctuées de rares noyers, il n’est accessible l’été que par une piste 4×4. L’hiver, il faut emprunter le sentier à flanc de montagne pour descendre jusqu’à Timichchi, où la route goudronnée permet de rejoindre Sti Fadma, la ville, à plus de dix kilomètres en aval.",
    ],
    photos: [
      photo("cretes-et-descente-en-neige-06434"),
      photo("vallee-et-pentes-du-haut-atlas-06176"),
      photo("vallee-et-pentes-du-haut-atlas-06144"),
      photo("cretes-et-descente-en-neige-06511"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06210"),
    ],
  },
  {
    paragraphs: [
      "Nous pénétrons dans une belle demeure maçonnée. Avec le traditionnel thé d’accueil, Brahim prend le temps de nous raconter la vie de son village. Timichchi, 42 habitants, a été endeuillé par le tremblement de terre de 2023. Il y eut sept victimes et de nombreuses maisons détruites ; certaines ont été reconstruites sur la rive opposée de la rivière avec l’aide du gouvernement.",
      "Ce sont des maisons maçonnées, roses, qui contrastent avec les constructions de pierre historiques. Le tajine est servi avec le chant du muezzin. Brahim s’apprête à aller prier, comme cinq fois par jour. La plupart du temps, il descend à la mosquée, qui fut jadis le lieu social des froides journées d’hiver. Chacun amenait son bois, et un grand feu au milieu de la pièce animait les conversations. Cette sociabilité a disparu, Brahim pointe l’arrivée conjointe de l’électricité et d’internet.",
    ],
    photos: [
      photo("villages-berberes-et-rencontres-06721"),
      photo("vie-de-village-et-accueil-berbere-05614"),
      photo("vie-de-village-et-accueil-berbere-05679"),
      photo("vallee-et-pentes-du-haut-atlas-06136"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06234"),
    ],
  },
  {
    paragraphs: [
      "Le lendemain, nous rejoignons Labassen avec les premiers rayons du soleil.",
      "Labassen est un village d’une vingtaine de maisons, installé dans une petite combe adjacente à la vallée d’Ourika. Un village de montagne, sans accès routier, coupé du monde dès que la neige tombe. Les toits plats des maisons deviennent des terrasses occupées par les habitants, qui s’y installent pour profiter du soleil. Ici, les maisons ne sont pas chauffées.",
      "Depuis l’ouverture d’une terrasse couverte, des enfants s’amusent à nous saluer. Des femmes sont là aussi, peut-être intriguées par notre présence. Les skieurs doivent être rares ici.",
    ],
    photos: [
      photo("villages-berberes-et-rencontres-06830"),
      photo("villages-berberes-et-rencontres-06675"),
      photo("villages-berberes-et-rencontres-06817"),
      photo("villages-berberes-et-rencontres-06889"),
      photo("villages-berberes-et-rencontres-06873"),
    ],
  },
  {
    paragraphs: [
      "Nous rejoignons un vaste vallon aux cades millénaires. Les faces qui nous surplombent sont raides, rayées par de nombreuses cascades de glace. Hier, en regardant la carte, il m’a semblé possible de rejoindre le sommet du Bou Iguenouane en suivant la crête naissant du Tizi Tacherddirt. Contre toute attente, nous rejoignons assez facilement la crête, puis, par une incursion en versant sud, le sommet, dans le vent et le brouillard. Dommage, j’avais si envie de voir Ouarzazate, et le désert. Là où, lorsque j’avais sept ou huit ans, mon père me mena en 504 à travers le Sahara.",
      "Tacchdirt. Lors du conciliabule du soir, nous décidons de tenter la traversée du massif vers son versant méridional, en ayant bien conscience que nous devrons très probablement en sortir par le sud et la ville d’Amsouzart, car il y a peu de chance que la météo du samedi ne nous laisse la possibilité de rentrer à Imlil à ski. Yallah !",
    ],
    photos: [
      photo("groupe-a-ski-dans-la-vallee-06948"),
      photo("groupe-a-ski-dans-la-vallee-06963"),
      photo("groupe-a-ski-dans-la-vallee-07044"),
      photo("groupe-a-ski-dans-la-vallee-07058"),
      photo("groupe-a-ski-dans-la-vallee-07066"),
      photo("groupe-a-ski-dans-la-vallee-07080"),
    ],
  },
  {
    heading: "Quand la police touristique s’en mêle",
    paragraphs: [
      "Ce soir-là, il y a du monde au gîte et, rétrospectivement, chacun semble tenir un rôle bien particulier. D’abord les déneigeurs, enfin arrivés à Tacchdirt pour désenclaver le village. Puis trois Belges flamands, venus rider, guidés par le frère d’Ibrahim. Deux Pyrénéens retraités, opportunistes comme nous, skient sans guide depuis le gîte.",
      "Et Mohammed, frère d’Ibrahim, guide local, coiffé d’un petit bonnet violet, le sourire en coin. Sympathique, mais quelque peu suspect : il nous menace d’appeler la police, car notre projet de traversée contreviendrait aux règles. Mais en rigolant, pense-t-on. De cette scène ubuesque, je comprends que l’hébergeur est responsable des touristes qu’il accueille, et que notre projet de bivouac à l’azib Likemt ne lui plaît guère. Nos échanges s’arrêtent là. Nous sommes bien décidés à maintenir notre projet, les conditions météorologiques et nivologiques étant favorables.",
    ],
    photos: [
      photo("vie-de-village-et-accueil-berbere-05597"),
      photo("portrait-montagnard-berbere"),
      photo("rencontre-habitants-village-montagne"),
      photo("refuge-montagne-ski-randonnee"),
      photo("vallee-et-pentes-du-haut-atlas-06026"),
    ],
  },
  {
    paragraphs: [
      "Nous quittons Ibrahim et son gîte pour rejoindre la route, parfaitement déneigée. Un jeune homme en chèche traditionnel est adossé à son scooter. Je m’apprête à sortir mon appareil photo, puis je me ravise. Il se dirige vers nous et nous demande… nos passeports.",
      "Mohammed était donc sérieux. Il nous a sans doute livrés tout cuits, étant parti peu avant nous du gîte en accompagnant les deux autres Français, sans guide. Ce matin-là, nos rapports avec Ibrahim étaient étranges. Quelque chose avait changé par rapport à la proximité que nous lui connaissions jusque-là. Il n’est pas venu nous saluer pour notre départ, alors que nous ne devions pas nous revoir. Cela m’a surpris. Peut-être savait-il pertinemment que ce n’était pas réellement un départ.",
      "« Vous avez l’interdiction formelle d’aller en montagne… sans guide local. » Telle est la ritournelle que me profère au téléphone le responsable de la sécurité touristique. Il n’y a aucune possibilité de discuter ; les arrangements « informels » ne sont plus de mise. La partie est perdue.",
    ],
    photos: [
      photo("skieur-porte-refuge"),
      photo("montee-a-ski-dans-la-neige-05968"),
      photo("montee-a-ski-dans-la-neige-05903"),
      photo("groupe-a-ski-dans-la-vallee-07076"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06219"),
    ],
  },
  {
    paragraphs: [
      "Je suis partagé sur cet événement, dont nous ne sommes pas coutumiers dans nos montagnes. Il nous a pris de court, nous renvoyant l’écho de décisions arbitraires, prises dans un contexte émotionnel fort. Ici l’avalanche meurtrière toute récente et le souvenir traumatique de l’assassinat sordide de deux touristes scandinaves à l’azib Likemt en 2018. En effet, nous sommes arrivés dans l’Atlas le lendemain d’une tragédie liée aux chutes de neige abondantes : trois randonneurs marocains, dont un guide local, ont été emportés dans une avalanche. L’administration marocaine, et particulièrement la « police touristique », est tendue : les « disparus du Toubkal » ont fait le tour des médias occidentaux.",
      "J’ai écrit à Mohammed ensuite, l’auxiliaire de la police touristique, pour lui demander les textes de loi qui régissent nos pratiques de ski dans les montagnes de l’Atlas, mais je n’ai reçu aucune réponse.",
      "De cet épisode, nous comprenons aussi que le guide local endosse un rôle « social » supplémentaire, celui de protéger les touristes face à de potentielles réactions de locaux. Pourtant, partout ailleurs, l’accueil qui nous a été réservé a été très chaleureux, y compris dans les villages les plus reculés et les moins touristiques. Et ce sont peut-être les souvenirs les plus précieux que nous garderons de cette aventure.",
    ],
    photos: [
      photo("groupe-a-ski-dans-la-vallee-06983"),
      photo("groupe-a-ski-dans-la-vallee-06990"),
      photo("groupe-a-ski-dans-la-vallee-07019"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06245"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06261"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06302"),
    ],
  },
  {
    heading: "Le Tazaghart (3 980 m), ou la fuite vers la montagne sauvage",
    paragraphs: [
      "À la lueur des phares de sa Dacia, Hassan remonte la route du petit village de Tizi Oussem. Il nous fait sentir qu’il n’aime pas cette route. Après le pharaonique chantier de construction d’un barrage hydroélectrique, la route large et bitumée s’est transformée en une piste terreuse, aux bas-flancs instables.",
      "Nous avons été expulsés des montagnes de Tacchdirt : *persona non grata*, touristes au potentiel médiatique trop important s’il nous arrivait quelque chose. Il nous fallait trouver un lieu moins contrôlé, moins surveillé. Nous sommes arrivés dans l’Atlas le lendemain d’une tragédie : trois randonneurs marocains, dont un guide local, ont été emportés dans une avalanche. L’administration marocaine, et particulièrement la « police touristique », est crispée : les répercussions médiatiques des « disparus du Toubkal » ont fait le tour des médias occidentaux.",
      "Sans l’importante chute de neige la veille de notre arrivée, Tizi Oussem aurait dû être le lieu de départ de notre traversée du Toubkal.",
    ],
    photos: [
      photo("montee-vers-les-hautes-pentes-07322"),
      photo("montee-vers-les-hautes-pentes-07340"),
      photo("montee-vers-les-hautes-pentes-07380"),
      photo("cretes-et-descente-en-neige-06408"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06304"),
    ],
  },
  {
    paragraphs: [
      "Quelques coups de fil de notre chauffeur aux amis d’amis nous déposent à l’entrée d’un gîte, dans la pénombre. La peinture des plafonds se décolle et parsème les matelas comme des confettis. Nous sommes invités à suivre nos hôtes dans le hammam. Le jeune homme dose l’eau chaude et l’eau froide dans un grand seau, et un plus petit seau sert à s’asperger. Le sol est brûlant, et l’odeur de mazout nous aiguille sur la manière dont il est chauffé. Lorsque le plus âgé des deux Berbères commence à me frotter énergiquement le haut du corps, je comprends que la douche, ici, est un rite collectif…",
      "Au programme, la Tazaghart, 2 200 m plus haut. Ici, aucune entrave, a priori. Inch’Allah.",
    ],
    photos: [
      photo("ski-de-randonnee-et-paysage-d-altitude-06312"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06318"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06336"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06362"),
    ],
  },
  {
    paragraphs: [
      "Le chemin remonte d’abord un flanc de montagne au milieu d’imposants genévriers, avant de déboucher à l’azib Tamsoult et son refuge homonyme. Ensuite, deux goulets apparaissent en violet sur mes cartes de pentes, et constituent des passages incertains. Le premier est exposé, mais franchissable à ski. Le second me laisse dubitatif : une cascade de glace barre le passage. J’hésite car il y a peut-être d’autres alternatives. Le vent s’est levé et il est déjà tard : je sais que cette prise de décision ne comptera pas de seconde chance. Il semble que le bord droit de la cascade soit mince, franchissable en s’aidant du rocher. Bingo !",
      "Depuis le Tizi Malooan, il ne semblait pas y avoir de difficulté sur ma carte, mais un ressaut rocheux nous barre l’accès au sommet. Un petit couloir dérobé se cache derrière une tour. Sans certitude, je m’y engage. Une nouvelle fois, un ressaut rocheux nous barre l’accès. Je le franchis non sans difficulté, et j’aide mes compagnons à l’aide de mon bâton. Nous nous dressons bientôt au sommet, bousculés par de violentes rafales et pris dans un épais brouillard.",
    ],
    photos: [
      photo("traversee-a-ski-et-meteo-montagne-07521"),
      photo("traversee-a-ski-et-meteo-montagne-07534"),
      photo("montee-vers-les-hautes-pentes-07413"),
      photo("montee-vers-les-hautes-pentes-07424"),
      photo("montee-vers-les-hautes-pentes-07473"),
      photo("monteur-ski-couloir-neige"),
    ],
  },
  {
    paragraphs: [
      "Je suis coutumier du vent et du brouillard, mais moins de ce givre marocain, pluie verglaçante qui lacère nos visages et nous recouvre d’une fine plaque de glace opaque. Le sommet donne accès au vaste plateau de la Tazaghart, balayé par les vents et en partie dégarni. Les crêtes de coq sont de vrais pièges, comme le brouillard, nous déroutant sans que nous en ayons conscience.",
      "Coup d’œil à mon téléphone : je me suis fait entraîner beaucoup trop à gauche, à l’extrémité ouest du plateau. Il nous faut remonter face aux bourrasques pour retrouver le bon cap, accepter de ne plus rien voir, déléguer la maîtrise de nos skis à la kinesthésie.",
      "Derniers virages dans l’Atlas, fin du ski, mais pas de l’aventure.",
    ],
    photos: [
      photo("traversee-a-ski-et-meteo-montagne-07556"),
      photo("traversee-a-ski-et-meteo-montagne-07563"),
      photo("traversee-a-ski-et-meteo-montagne-07569"),
      photo("traversee-a-ski-et-meteo-montagne-07578"),
    ],
  },
  {
    paragraphs: [
      "Tizgui est un petit village de montagne vivant. L’artère principale est une piste boueuse particulièrement animée en cette fin de journée. Le muezzin se met à chanter : sans regarder l’heure, nous savons qu’il est 19 h. Encore une bonne journée ! Nos gangues de glace ont fondu, nous sommes à présent trempés par la pluie qui tombe en continu.",
      "D’aspect extérieur, le gîte semble récent. Hussein, notre hôte, doit avoir 70 ans. Son regard est malicieux et sympathique. La barrière de la langue est frustrante : ici, personne ne parle le français. Nous remplissons le traditionnel registre et nos passeports sont pris en photo, comme tous les soirs. Les derniers visiteurs consignés dans ce registre sont passés en mars 2025 ! Ici, la pression touristique est beaucoup moins importante qu’autour d’Imlil.",
    ],
    photos: [
      photo("traversee-a-ski-et-meteo-montagne-07601"),
      photo("traversee-a-ski-et-meteo-montagne-07607"),
      photo("traversee-a-ski-et-meteo-montagne-07619"),
      photo("traversee-a-ski-et-meteo-montagne-07649"),
    ],
  },
  {
    paragraphs: [
      "Toutes nos affaires sont trempées, et nous demandons s’il est possible d’avoir un chauffage d’appoint. Alors que nous profitons d’une petite « Marquise » (NDLR : cigarette locale) sur la terrasse du toit avec Julien, nous sentons tout à coup l’odeur si agréable du feu de bois. L’odeur provient de la cage d’escalier. Étrange, il n’y avait aucun foyer dans le gîte. On se regarde, partageant un même questionnement : “Où ont-ils pu allumer un feu?!”.",
      "Le petit poêle portable trône au milieu du salon, le feu crépite. Hussein et son petit-fils, Mohammed, sont assis autour du foyer, profitant de la chaleur. Les fumées commencent à envahir l’espace, et les moyens de leur évacuation restent énigmatiques… L’intention était généreuse et louable, mais nos affaires restent trop trempées pour sécher ainsi. Le tajine est délicieux, c’est sans conteste le meilleur depuis notre arrivée.",
      "Après les mandarines et la tisane, alors que nous nous apprêtons à aller dormir, Hussein nous apporte un plat de couscous. Incompréhension heureuse. Nous n’avons pas d’autre choix que de lui faire honneur ! Hussein reste là, nous échangeons des regards. Il partage le thé avec nous. Et cette présence non verbale est, pour nous, le signe d’un accueil chaleureux.",
    ],
    photos: [
      photo("soiree-refuge-autour-du-feu"),
      photo("retour-de-traversee-et-ambiance-du-groupe-07802"),
      photo("groupe-a-ski-dans-la-vallee-07103"),
      photo("groupe-a-ski-dans-la-vallee-07105"),
      photo("traversee-a-ski-et-meteo-montagne-07665"),
      photo("traversee-ski-randonnee-vallee-berbere"),
      photo("traversee-groupe-a-ski"),
    ],
  },
  {
    heading: "Enseignements",
    paragraphs: [
      "Lors de ce voyage j’ai beaucoup appris. C’est la première fois que tout ne se passe pas comme prévu, que la ligne dévie, que son cheminement imaginé en amont ne se réalise pas. Si l’on est toujours prêt à composer avec les incertitudes de la montagne, celles de l’administration, quand elles sont ressenties comme arbitraires, sont toujours plus difficiles à accepter. Le Maroc a ses règles, et nous devons composer avec elles.",
      "J’avais entendu parler de l’obligation de prendre un guide local, mais selon des discours contradictoires. J’ignorais que le bivouac fût “interdit”. Mais l’est-il vraiment ? Ce qui gêne est peut-être davantage l’absence de contrôle par les autorités locales résultant du fait d’être “dans la nature”, aux sens propre comme figuré.",
      "De cette tentative de traversée, j’ai déjà construit ma ligne idéale pour le prochain voyage dans l’Atlas. Une ligne qui fait halte dans des villages peu touristiques, car ces moments de rencontre font partie des expériences les plus marquantes de ce périple marocain. Une ligne qui part du sud-ouest du massif, là où il n’y a aucune pression touristique, et qui évite volontairement le Toubkal et son agitation ! Vivement qu’il neige à nouveau là-bas pour un retour avec les skis dans ce massif si contrasté.",
    ],
    photos: [
      photo("ski-de-randonnee-et-paysage-d-altitude-06386"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06392"),
      photo("ski-de-randonnee-et-paysage-d-altitude-06399"),
      photo("sommets-neige-vue-panoramique"),
      photo("alpiniste-pic-rocheux"),
      photo("vallee-neige-ski-randonnee"),
      photo("cretes-et-descente-en-neige-06400"),
    ],
  },
];
