import en from './content/en.json';
import it from './content/it.json';
import type { Lang } from './ui';

const dictionaries: Record<'en' | 'it', Record<string, string>> = { en, it };

/** Identifiers, locations and files remain the same in every language. */
const unchanged = new Set([
  'slug', 'src', 'gpx', 'ogImage', 'href', 'buttonHref', 'ctaHref',
  'whatsappCommunityUrl', 'position', 'cropRatio', 'zones', 'id',
  'defaultVariant', 'letter', 'type', 'variant', 'direction', 'name', 'via',
  'fichierWeb', 'file', 'dateTimeOriginal', 'confianceLocalisation',
  'certitudeLocalisation', 'certitude', 'certitudeGpx', 'confiance', 'action',
  'original', 'capture', 'jour', 'localisation', 'toponymeSecteur', 'toponyme',
]);

function technical(value: string): boolean {
  return !/[A-Za-zÀ-ÿ]/.test(value)
    || /^(?:https?:|mailto:|tel:|\/|#)/.test(value)
    || /^[\w%-]+\.(?:jpg|jpeg|png|webp|gpx|pdf)$/i.test(value)
    || /^(?:[0-9.,\s+−–—/★☆%]|km|m|D\+|D−|D-)+$/.test(value)
    || /^\d{4}-\d\d-\d\d/.test(value);
}

/**
 * Localised data retain the exact French types and structure. Only text leaves
 * are replaced. Every translation is stored locally and resolved at build time;
 * the site makes no translation-service requests. Missing copy fails the build
 * rather than silently putting French text on an English or Italian page.
 */
export function localizeData<T>(value: T, lang: Lang, key = ''): T {
  if (lang === 'fr' || unchanged.has(key)) return value;
  if (typeof value === 'string') {
    // Pure prices and measured distances are formatted, never recalculated.
    const price = value.match(/^(\d[\d \u00a0\u202f.,]*)\s*€$/);
    if (price) {
      const amount = Number(price[1].replace(/[ \u00a0\u202f]/g, '').replace(',', '.'));
      if (Number.isFinite(amount)) {
        const number = new Intl.NumberFormat(lang === 'en' ? 'en-GB' : 'it-IT', { maximumFractionDigits: 2, useGrouping: "always" }).format(amount);
        return (lang === 'en' ? `€${number}` : `${number} €`) as T;
      }
    }
    if (lang === 'en' && /^\d+,\d+ km$/.test(value)) return value.replace(',', '.') as T;
    if (technical(value)) return value;
    const translated = dictionaries[lang][value];
    if (translated === undefined) throw new Error(`Missing ${lang} translation for ${key}: ${value.slice(0, 100)}`);
    return translated as T;
  }
  if (Array.isArray(value)) return value.map((item) => localizeData(item, lang, key)) as T;
  if (value && typeof value === 'object' && Object.getPrototypeOf(value) === Object.prototype) {
    return Object.fromEntries(Object.entries(value).map(([field, item]) => [field, localizeData(item, lang, field)])) as T;
  }
  return value;
}
