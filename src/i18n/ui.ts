/** Langues du site. Le français est la langue par défaut, servie sans
 *  préfixe (/philosophie/) ; l'anglais et l'italien vivent sous /en/ et /it/
 *  avec les MÊMES slugs que le français (/en/philosophie/, /it/philosophie/). */
export const languages = {
  fr: "Français",
  en: "English",
  it: "Italiano",
} as const;

export type Lang = keyof typeof languages;
export const defaultLang: Lang = "fr";
export const langs = Object.keys(languages) as Lang[];

/** Libellés d'interface partagés (header, layouts, composants).
 *  Toute clé doit exister en `fr` ; en/it retombent sur le français si une
 *  clé manque. Les composants qui contiennent encore du texte français en dur
 *  doivent être migrés ici (voir docs/i18n/brief-traduction-chatgpt.md). */
export const ui = {
  fr: {
    "nav.label": "Navigation principale",
    "nav.voyages": "Voyages",
    "nav.philosophie": "Philosophie",
    "nav.carnets": "Carnets",
    "nav.contact": "Contact",
    "nav.openMenu": "Ouvrir le menu",
    "lang.label": "Langue",
    "site.title": "Les Grands Raids à Ski",
    "site.description":
      "Voyages et raids à ski de randonnée en itinérance, dans les Alpes et les montagnes du monde.",
  },
  en: {
    "nav.label": "Main navigation",
    "nav.voyages": "Trips",
    "nav.philosophie": "Philosophy",
    "nav.carnets": "Journals",
    "nav.contact": "Contact",
    "nav.openMenu": "Open menu",
    "lang.label": "Language",
    "site.title": "Les Grands Raids à Ski",
    "site.description":
      "Hut-to-hut and village-to-village ski touring journeys, in the Alps and mountains around the world.",
  },
  it: {
    "nav.label": "Navigazione principale",
    "nav.voyages": "Viaggi",
    "nav.philosophie": "Filosofia",
    "nav.carnets": "Diari",
    "nav.contact": "Contatti",
    "nav.openMenu": "Apri il menu",
    "lang.label": "Lingua",
    "site.title": "Les Grands Raids à Ski",
    "site.description":
      "Viaggi e traversate di scialpinismo in itineranza, sulle Alpi e sulle montagne del mondo.",
  },
} as const;

export type UiKey = keyof (typeof ui)["fr"];
