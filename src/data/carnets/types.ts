export type CarnetPhoto = {
  src: string;
  alt: string;
  caption?: string;
  /** object-position / background-position CSS, ex. "center 20%" — permet à
   *  chaque carnet de régler le recadrage d'une photo utilisée en plein cadre
   *  (hero, photo verticale) sans toucher au composant. */
  position?: string;
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

/** Une section du récit : un sous-titre optionnel et un ou plusieurs paragraphes.
 *  Les photos d'illustration ne sont plus intercalées ligne à ligne : elles vivent
 *  dans la colonne dédiée (voir `story.dayPhotos`), organisées par journée. */
export type CarnetStorySection = {
  heading?: string;
  paragraphs: string[];
};

/** Petit groupe de photos associé à une journée, affiché dans la colonne droite
 *  du récit — sélection éditoriale, pas la totalité des photos de la journée. */
export type CarnetDayPhotoGroup = {
  dayNum: string;
  photos: CarnetPhoto[];
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
    dayPhotos: CarnetDayPhotoGroup[];
  };
  portfolio?: {
    eyebrow: string;
    title: string;
    meta?: string;
    photos: CarnetPhoto[];
  };
  closing: {
    text?: string;
    ctaLabel: string;
    ctaHref: string;
  };
};
