# Migration SEO WordPress → Astro / GitHub

## Décision actée le 22 septembre 2026 — bascule complète, pas de cohabitation

Le domaine final `lesgrandsraidsaski.com` sert **exclusivement** le site Astro
statique. Décision explicite de Yann, qui remplace toute mention contraire
plus bas dans un brief antérieur :

- **Pas de routage hybride, pas de proxy/CDN applicatif** (type Cloudflare
  Worker) pour faire cohabiter Astro et WordPress derrière le même domaine.
- **Aucune page WordPress ne reste publique** après la bascule. WordPress
  devient une **sauvegarde strictement privée** (accès public fermé) une fois
  la bascule effectuée — jamais servi en production, même pour les anciennes
  URLs non reconstruites.
- Les **47 URLs historiques non reconstruites** dans Astro (voir
  `legacy-url-inventory.csv`, catégorie `non_migree_archive_wordpress`) ne
  seront **jamais migrées ni servies** : elles renverront une page **404**
  (ou 410 si l'hébergement le permet un jour) après la bascule — jamais une
  redirection vers l'accueil, jamais un catch-all.
- Seules **3 redirections** sont créées, celles confirmées par Yann dans
  l'inventaire (`redirection_301_confirmee`) : `/accueil/`, `/montenegro-2026/`,
  `/grece-2026/`. Elles sont déjà préparées côté Astro (voir
  `astro.config.mjs`) ; un vrai HTTP 301 sera ajouté côté DNS/registrar au
  moment de la bascule (GitHub Pages seul ne fait pas de redirection HTTP par
  chemin — la version Astro est une redirection HTML de repli).

## Règle non négociable

- Ne jamais modifier `main`. Travailler uniquement sur `rebuild-v1` jusqu'à la bascule.
- Ne rien désactiver, supprimer ni modifier sur WordPress tant qu'une sauvegarde complète (fichiers + base de données) n'est pas confirmée disponible — voir "Sauvegarde WordPress avant bascule" plus bas.
- Domaine public à conserver : `https://lesgrandsraidsaski.com/`.
- Conserver chaque URL Astro déjà existante à l'identique. Aucune redirection au-delà des 3 confirmées ; toute autre ancienne URL non reconstruite reste en 404.

## État vérifié le 22 septembre 2026

- WordPress : indexable (`blog_public=1`), permaliens `/%postname%/`, Yoast SEO actif.
- Sitemap actuel : `https://lesgrandsraidsaski.com/sitemap_index.xml`.
- `robots.txt` actuel autorise l’exploration ; il ne déclare pas le sitemap.
- Nouveau dépôt : `yborgnet/lgrs-site`, branche `rebuild-v1`; Astro 7.
- Le détail URL par URL (conservée à l'identique / redirection confirmée /
  abandonnée en 404) est dans `legacy-url-inventory.csv`, colonne
  `categorie` — c'est la source de vérité, ne pas la dupliquer ici (une
  liste recopiée dans ce fichier a dérivé une première fois, voir
  historique git). Au 22/09/2026 : 20 URLs `conservee_identique` (dont
  Contact, reconstruite avec formulaire Formspree), 3
  `redirection_301_confirmee`, 47 `non_migree_archive_wordpress` — ces
  47 ne seront pas reconstruites (décision ci-dessus) et resteront en 404
  après la bascule.

## À faire dans le dépôt

1. Avant toute modification : `git status`, puis `git log --oneline -10`. Ne pas écraser de travail existant.
2. Ajouter une génération de sitemap Astro produisant `/sitemap-index.xml` ou `/sitemap.xml`, avec les URL canoniques HTTPS sans `www`.
3. Ajouter `public/robots.txt` :

```txt
User-agent: *
Allow: /
Sitemap: https://lesgrandsraidsaski.com/sitemap-index.xml
```

4. Vérifier que chaque page a une seule balise `<title>`, une meta description, une canonical auto-référente et une image Open Graph.
5. Reprendre les textes utiles, les titres SEO, descriptions et images des pages WordPress équivalentes sans raccourcir les contenus déjà indexés.
6. Conserver les slugs listés dans `docs/migration-seo/legacy-url-inventory.csv` pour les URLs `conservee_identique`. Ne créer aucune redirection au-delà des 3 `redirection_301_confirmee` — pas de règle pour les 47 `non_migree_archive_wordpress`, elles doivent 404.
7. Ajouter une page 404 utile, sans redirection automatique vers l’accueil (fait : `src/pages/404.astro`).
8. À chaque étape stable : `npm run build`, puis commit clair et push sur `rebuild-v1`.

## Ce qui doit rester hors du dépôt tant que la bascule n'est pas faite

- DNS du domaine, domaine personnalisé GitHub Pages et configuration HTTPS.
- Merge vers `main` (le choix de la branche qui sert la prod se fait au moment de la bascule, pas avant).
- Toute action sur WordPress (désactivation, fermeture de l'accès public, changement de thème/config) tant que la sauvegarde ci-dessous n'est pas confirmée disponible.

## Sauvegarde WordPress avant bascule

WordPress devient une sauvegarde strictement privée après la bascule (voir
décision en tête de document) — donc plus servi publiquement du tout. Avant
d'y toucher, il faut une sauvegarde complète et vérifiée :

- Export complet de la **base de données** (toutes les tables, pas seulement
  posts/pages — options, médiathèque, réglages Yoast SEO, etc.).
- Copie complète des **fichiers** : `wp-content/uploads` (médiathèque),
  thème actif, plugins actifs et leur configuration, `wp-config.php` (sans le
  committer nulle part — il contient des secrets).
- Sauvegarde stockée dans un endroit qui restera accessible même si
  l'hébergement WordPress est fermé (téléchargement local + une copie hors
  du serveur d'hébergement).
- Vérification a minima : la sauvegarde s'ouvre/s'importe sans erreur (pas
  seulement "le fichier existe").

Je n'ai pas accès à l'admin WordPress ni à l'hébergement (OVH) : je ne peux
ni déclencher cette sauvegarde ni vérifier qu'elle existe. À faire par Yann,
ou en me donnant un accès (identifiants WP admin, ou SSH/FTP côté OVH,
ou un export déjà fait à inspecter) si tu veux que je vérifie le résultat.

## Liste de vérification finale avant bascule

1. Sauvegarde WordPress confirmée disponible et vérifiée (section ci-dessus).
2. Comparer chaque URL `conservee_identique` (20, dont Contact) aux pages Astro : code 200, titre, meta description, canonical, H1, contenu principal, image et liens internes.
3. Tester les 3 redirections (`/accueil/`, `/montenegro-2026/`, `/grece-2026/`) sur la preview GitHub Pages.
4. Confirmer qu'une URL de la liste des 47 non reconstruites répond bien 404 sur la preview (pas de redirection, pas de fuite vers l'accueil).
5. Vérifier `robots.txt`, sitemap, formulaire de contact (Formspree) en conditions réelles.
6. Décider et documenter la branche qui sert la prod (`rebuild-v1` ou `main`).
7. Seulement alors : suivre la procédure de bascule du domaine (build avec `BASE_PATH=/`, domaine personnalisé GitHub Pages, DNS, HTTPS, redirections 301 réelles côté DNS/registrar, soumission du sitemap à Google Search Console).
8. Une fois la bascule confirmée stable : fermer l'accès public à WordPress.
