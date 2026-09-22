// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Preview GitHub Pages actuelle : servie sous /lgrs-site/. À la bascule sur
// le domaine racine lesgrandsraidsaski.com, construire avec BASE_PATH=/
// (ex. `BASE_PATH=/ npm run build`) au lieu de modifier cette valeur par
// défaut — la preview /lgrs-site/ continue de fonctionner sans ce réglage.
const base = process.env.BASE_PATH || '/lgrs-site/';

// Astro ne préfixe pas automatiquement les cibles de `redirects` avec
// `base` (contrairement aux assets qu'il gère lui-même) : on le fait à la
// main pour que ces redirections restent correctes tant que la preview
// tourne sous /lgrs-site/, et deviennent des chemins racine à la bascule
// (base devient alors "/").
const prefixBase = (path) => `${base}${path.replace(/^\//, '')}`.replace(/\/{2,}/g, '/');

// https://astro.build/config
export default defineConfig({
  site: 'https://lesgrandsraidsaski.com',
  base,
  trailingSlash: 'always',
  integrations: [sitemap()],
  // Les 3 seules redirections validées (voir
  // docs/migration-seo/legacy-url-inventory.csv, categorie
  // "redirection_301_confirmee"). Toute autre ancienne URL WordPress non
  // reconstruite doit rester en 404 — jamais un catch-all vers l'accueil.
  redirects: {
    '/accueil/': prefixBase('/'),
    '/montenegro-2026/': prefixBase('/traversee-prokletije-ski-montenegro/'),
    '/grece-2026/': prefixBase('/raid-ski-grece-tzoumerka-pinde/'),
  },
});
