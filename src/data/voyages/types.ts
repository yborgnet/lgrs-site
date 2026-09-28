export type VoyagePhoto = {
  src: string;
  alt: string;
};

export type VoyageDayItem = {
  type: "day";
  dayNum: string;
  dateLabel?: string;
  highlightLabel?: string;
  title: string;
  /** Trusted HTML fragment (from source content, not user input). */
  text: string;
  variant?: "travel" | "highlight";
};

export type VoyageChapterItem = {
  type: "chapter";
  label: string;
  title: string;
};

export type VoyageItineraryItem = VoyageDayItem | VoyageChapterItem;

export type VoyageTitle =
  | string
  | {
      desktop: string;
      mobileLines: string[];
    };

export type Voyage = {
  slug: string;
  seo: {
    title: string;
    description: string;
    ogImage?: string;
  };
  masthead: {
    eyebrow: string;
    title: VoyageTitle;
    /** e.g. ["PETIT CAUCASE", "2027"] — rendered joined with " · ". */
    meta: string[];
  };
  description: {
    label: string;
    title: string;
    /** Trusted HTML fragments (from source content, not user input). */
    paragraphs: string[];
  };
  photoIntro?: VoyagePhoto;
  info: {
    label: string;
    fields: { label: string; value: string }[];
    /** Paragraphe libre sous la grille (ex. public visé du voyage). */
    note?: string;
  };
  photoInfo?: VoyagePhoto;
  bigPhoto?: VoyagePhoto;
  itinerary: {
    eyebrow: string;
    title: string;
    intro?: string;
    /** Image statique de secours, affichée si `gpx` est absent ou introuvable. */
    map?: VoyagePhoto;
    /** Chemin(s) public(s) vers le(s) fichier(s) GPX du voyage, ex. "/gpx/georgie-petit-caucase-2027.gpx". */
    gpx?: string | string[];
    /** Description accessible de la carte GPX (aria-label). */
    mapTitle?: string;
    items: VoyageItineraryItem[];
    note?: string;
  };
  techCta: {
    span: string;
    title: string;
    text: string;
    buttonText: string;
    buttonHref: string;
  };
};
