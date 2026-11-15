import { ui, defaultLang, langs, type Lang, type UiKey } from "./ui";
import { withBase } from "../lib/url";

/** Langue de la page courante, d'après l'URL (Astro.currentLocale). */
export function getLang(locale: string | undefined): Lang {
  return (langs as string[]).includes(locale ?? "") ? (locale as Lang) : defaultLang;
}

/** Traduction d'un libellé d'interface, avec repli sur le français. */
export function useTranslations(lang: Lang) {
  return (key: UiKey): string =>
    (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
}

/** Toutes les pages réellement présentes dans src/pages, sous forme de
 *  chemins de route ("/", "/philosophie/", "/en/philosophie/"…). Sert à ne
 *  proposer une langue que si la page traduite existe (pas de 404, pas de
 *  doublon de contenu français sous /en/). */
const pageFiles = import.meta.glob("/src/pages/**/*.astro");
const routes = new Set(
  Object.keys(pageFiles).map((file) =>
    file
      .replace(/^\/src\/pages/, "")
      .replace(/index\.astro$/, "")
      .replace(/\.astro$/, "/"),
  ),
);

/** Chemin de route sans base ni préfixe de langue : "/en/kosovo/" → "/kosovo/". */
export function stripLang(pathname: string): string {
  const base = import.meta.env.BASE_URL;
  let p = pathname.startsWith(base) ? "/" + pathname.slice(base.length) : pathname;
  p = p.replace(/\/{2,}/g, "/");
  const m = p.match(/^\/(en|it)(\/|$)/);
  if (m) p = p.slice(m[1].length + 1) || "/";
  if (!p.endsWith("/")) p += "/";
  return p;
}

/** Chemin de route d'une page dans une langue donnée (sans base). */
export function routeFor(lang: Lang, path: string): string {
  return lang === defaultLang ? path : `/${lang}${path}`;
}

export function hasRoute(route: string): boolean {
  return routes.has(route);
}

/** Lien interne localisé : version traduite si elle existe, sinon la page
 *  française. À utiliser pour tous les liens internes des pages en/it. */
export function localizedHref(lang: Lang, path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const [, pathname, suffix = ""] = path.match(/^([^?#]*)(.*)$/)!;
  // Files are assets (PDF, GPX, photos), never translated routes.
  if (/\.[^/]+$/.test(pathname)) return withBase(path);
  const route = routeFor(lang, pathname);
  return withBase((hasRoute(route) ? route : pathname) + suffix);
}

/** Pour le sélecteur de langue et les balises hreflang : URL de la page
 *  courante dans chaque langue où elle existe (null sinon). */
export function alternates(pathname: string): Record<Lang, string | null> {
  const path = stripLang(pathname);
  return Object.fromEntries(
    langs.map((l) => {
      const route = routeFor(l, path);
      return [l, hasRoute(route) ? withBase(route) : null];
    }),
  ) as Record<Lang, string | null>;
}
