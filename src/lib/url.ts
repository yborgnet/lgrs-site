/** Préfixe un chemin local (page interne ou asset sous public/) avec le
 *  `base` Astro (ex. "/lgrs-site/" en preview GitHub Pages, "/" en local et
 *  en prod) — jamais de préfixe écrit en dur dans les composants.
 *  Laisse passer les URLs absolues (http(s)://, //), les ancres (#...) et
 *  les liens mailto:/tel:. */
export function withBase(path: string): string {
  if (/^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(path)) return path;
  const base = import.meta.env.BASE_URL;
  return path.startsWith("/") ? `${base}${path.slice(1)}` : `${base}${path}`;
}
