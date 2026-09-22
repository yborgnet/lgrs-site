export type CarnetPhoto = {
  src: string;
  alt: string;
  /** Dimensions réelles du fichier — permettent au navigateur de réserver le
   *  bon espace (ratio) avant même que l'image ait chargé : sans ça, un rail
   *  ou un portfolio dont la largeur dépend du ratio intrinsèque peut se
   *  disloquer pendant le chargement (voir CarnetGallery / CarnetStory). */
  width?: number;
  height?: number;
  caption?: string;
  /** object-position / background-position CSS, ex. "center 20%" — permet à
   *  chaque carnet de régler le recadrage d'une photo utilisée en plein cadre
   *  (hero, photo verticale, ou une miniature de rail avec `cropRatio`) sans
   *  toucher au composant. */
  position?: string;
  /** Ratio explicite (ex. "16/9") pour forcer un recadrage (object-fit: cover)
   *  sur UNE photo précise du rail du récit (voir CarnetStory) — l'exception,
   *  jamais la règle : par défaut une miniature de rail garde son ratio
   *  intrinsèque (width:100%, height:auto), sans aucun crop. N'a d'effet
   *  que combiné à `position`. */
  cropRatio?: string;
  /** true = la vraie photo n'est pas encore choisie (passe photo à venir) —
   *  `src`/`alt` restent renseignés à titre indicatif (ex. décrivent la photo
   *  WordPress d'origine) mais ne sont pas utilisés : le composant affiche un
   *  bloc placeholder sobre plutôt qu'un <img> cassé. Jamais généré ni choisi
   *  au hasard — juste un repère de mise en page en attendant. */
  placeholder?: boolean;
};

export type CarnetInfoField = {
  label: string;
  value: string;
};

/** Carte courte d'étape (résumé factuel, pas le récit complet).
 *  `via`, les distances et dénivelés viennent d'une analyse GPX réelle
 *  (voir data/gpx-sources/) — ne jamais les éditer à la main sans repasser
 *  par l'analyse ; `text` reste un champ libre pour une phrase de contexte. */
export type CarnetDayCard = {
  dayNum: string;
  title: string;
  text: string;
  via?: string[];
  distanceKm?: number;
  ascentM?: number;
  descentM?: number;
  elevationMin?: number;
  elevationMax?: number;
};

/** Une section du récit : un sous-titre optionnel et un ou plusieurs
 *  paragraphes — flux de lecture continu, les photos vivent séparément dans
 *  `story.storyDays` (voir CarnetStory). */
export type CarnetStorySection = {
  heading?: string;
  paragraphs: string[];
};

/** Une journée du raid telle qu'elle réapparaît dans le rail du récit (colonne
 *  de droite) — le fil de l'itinérance doit se "lire" jour par jour, pas par
 *  thème narratif. `route` vient de l'itinéraire validé (voir
 *  Carnet.itinerary.days[].title), jamais retapée à la main. `photos` forme
 *  une petite mosaïque dense (2 colonnes, voir .carnet-story__day-grid), dont
 *  le nombre de lignes suit la longueur du passage de récit consacré à cette
 *  journée plutôt qu'un quota fixe : 0-2 photos si le texte est court, 2-4 si
 *  moyen, 4-6 si long, jusqu'à 6-8 si très long — mais chaque journée doit
 *  avoir au moins une paire. Chronologique, jamais réordonnée pour un "best
 *  of" (contrairement au portfolio, voir Carnet.portfolio). */
export type CarnetStoryDay = {
  day: string;
  route: string;
  photos: CarnetPhoto[];
};

/** Résumé d'un carnet pour la page listing (/carnets-de-voyage-ski/) — dérivé
 *  du `Carnet` complet (voir src/data/carnets/index.ts), jamais retapé à la
 *  main : titre, sous-titre et méta viennent du masthead, pour qu'il n'existe
 *  qu'une seule source de vérité entre la page carnet et la page listing. */
export type CarnetSummary = {
  slug: string;
  title: string;
  subtitle?: string;
  meta: string[];
  excerpt: string;
  cover: CarnetPhoto;
  /** Zones géographiques (slugs), ex. ["alpes"], ["alpes", "mediterranee"] —
   *  reprend la taxonomie déjà utilisée sur le site WordPress historique
   *  (filtres "PAR GRANDE ZONE" de /carnets-de-voyage-ski/) : Alpes, Hors
   *  Alpes, Balkans, Caucase, Méditerranée, Asie centrale. "hors-alpes" est
   *  ajouté automatiquement (voir buildZones ci-dessous) à tout carnet qui
   *  n'a pas "alpes" — jamais à taper à la main. */
  zones: string[];
  /** Extraite de `meta[0]` (la période), jamais retapée à la main — voir
   *  extractYear dans index.ts. Sert au filtre "PAR ANNÉE". */
  year: number | null;
  /** Seuls les carnets `published: true` apparaissent sur la page listing —
   *  évite les faux liens vers une page qui n'existe pas encore. */
  published: boolean;
};

export type Carnet = {
  slug: string;
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  masthead: {
    eyebrow: string;
    title: string;
    /** Sous-titre en Newsreader, sur sa propre ligne (ex. "Tour du massif") —
     *  volontairement distinct de `meta`, qui reste en petit Manrope gris. */
    subtitle?: string;
    /** Ligne de métadonnées sous le sous-titre — période, durée, distance,
     *  D+/D-… un point médian sépare chaque élément, tous au même style.
     *  Passer les valeurs déjà calculées (voir src/lib/carnet/itinerary-totals)
     *  plutôt que des nombres en dur quand elles existent dans l'itinéraire. */
    meta?: string[];
  };
  openingPhoto: CarnetPhoto;
  intro: {
    heading: string;
    paragraphs: string[];
    /** Grande photo verticale à côté du bloc intro + informations. */
    photo: CarnetPhoto;
  };
  info: {
    label: string;
    fields: CarnetInfoField[];
  };
  map?: {
    eyebrow: string;
    title: string;
    note?: string;
    gpx: string;
  };
  itinerary?: {
    eyebrow: string;
    title: string;
    intro?: string;
    days: CarnetDayCard[];
  };
  story: {
    eyebrow: string;
    /** Libellé du <summary> qui déplie le récit complet, ex. "Le récit complet". */
    toggleLabel: string;
    sections: CarnetStorySection[];
    /** Rail du récit (colonne de droite) : une mosaïque par journée du raid,
     *  indépendante du découpage en `sections` (une section peut couvrir
     *  plusieurs journées, ou aucune) — voir CarnetStoryDay. Absent ou vide =
     *  carnet sans passe photo (le texte reprend toute la largeur). */
    storyDays?: CarnetStoryDay[];
    /** Note éditoriale discrète après le dernier paragraphe (pas un paragraphe
     *  du récit) — ex. mention d'une publication d'origine (Alpine Mag) avec
     *  son lien réel, jamais une URL inventée. */
    sourceNote?: {
      text: string;
      linkLabel: string;
      href: string;
    };
    /** Liens de suite éditoriale après le récit (ex. vers un document externe,
     *  ou vers l'épisode suivant d'un projet en plusieurs segments) —
     *  distinct de `sourceNote` (mention d'une source déjà publiée). `href:
     *  null` = URL pas encore disponible : affiché comme repère textuel, pas
     *  comme lien cliquable, jamais une URL inventée pour combler. */
    closingLinks?: { label: string; href: string | null }[];
  };
  portfolio?: {
    eyebrow: string;
    /** Identité du voyage : le massif (Alpes) ou le pays (autre destination) —
     *  même échelle visuelle que le titre du hero, pas le nom de la traversée.
     *  En MAJUSCULES, comme `masthead.title` (ex. "ARGENTERA", "BERNINA") —
     *  même identité répétée deux fois sur la page. */
    title: string;
    /** Nom de la traversée ou de l'exploration elle-même, ex. "Traversée du
     *  Mercantour à l'Argentera" — sous-titre, distinct du massif/pays. */
    subtitle?: string;
    meta?: string;
    /** Toutes les photos disponibles du voyage (récit + inédites), dans un
     *  ordre éditorial "best of" en tête — jamais l'ordre chronologique brut :
     *  les `initialPortfolioCount` premières forment la mosaïque visible au
     *  chargement, le reste se déplie au clic (voir CarnetGallery). */
    photos: CarnetPhoto[];
    /** Nombre de photos visibles avant dépliage — éditorial, propre à chaque
     *  carnet selon sa composition (~15 par défaut, jamais une valeur
     *  mécanique) : voir CarnetGallery. */
    initialPortfolioCount?: number;
  };
  closing: {
    text?: string;
    ctaLabel: string;
    ctaHref: string;
  };
};
