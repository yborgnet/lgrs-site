# Migration SEO WordPress → Astro / GitHub

## Règle non négociable

- Ne jamais modifier `main`. Travailler uniquement sur `rebuild-v1`.
- Ne supprimer, désactiver ni modifier aucun contenu WordPress. WordPress reste la sauvegarde et la référence jusqu’à validation post-bascule.
- Domaine public à conserver : `https://lesgrandsraidsaski.com/`.
- Conserver chaque URL historique à l’identique dès que possible. Toute URL modifiée exige une redirection HTTP **301** précise vers son équivalent, jamais vers l’accueil.

## État vérifié le 22 septembre 2026

- WordPress : indexable (`blog_public=1`), permaliens `/%postname%/`, Yoast SEO actif.
- Sitemap actuel : `https://lesgrandsraidsaski.com/sitemap_index.xml`.
- `robots.txt` actuel autorise l’exploration ; il ne déclare pas le sitemap.
- Nouveau dépôt : `yborgnet/lgrs-site`, branche `rebuild-v1`; Astro 7.
- Le nouveau site utilise déjà les URL 2027 identiques à WordPress, notamment :
  - `/les-grands-raids-alpins/` — Les grands raids alpins
  - `/voyages-a-ski-en-itinerance/` — Voyages à ski & grands raids à ski en itinérance
  - `/voyages-a-ski-grands-raids-a-ski-en-itinerance/` — Voyages à ski & grands raids à ski en itinérance_2
  - `/carnets-de-voyage-ski/` — Carnets de voyage à ski
  - `/philosophie/` — Philosophie
  - `/prochains-voyages/` — Les prochains voyages
  - `/contact/` — Contact
  - `/yann-borgnet-guide-haute-montagne/` — Yann Borgnet — Guide de haute montagne
  - `/transition-raid-anthropologique-queyras/` — TRANSITION — Un raid anthropologique dans le Queyras
  - `/voyage-ski-randonnee/` — Voyage ski de randonnée
  - `/kosovo/` — KOSOVO
  - `/georgie-raid-ski-rando-traversee/` — GÉORGIE
  - `/raid-ski-kazakhstan-ile-alatau/` — KAZAKHSTAN
  - `/montenegro-2026/` — MONTÉNÉGRO 2026
  - `/grece-2026/` — GRÈCE 2026
  - `/maroc/` — MAROC
  - `/traversee-prokletije-ski-montenegro/` — MONTÉNÉGRO 2026
  - `/raid-ski-grece-tzoumerka-pinde/` — GRÈCE 2026
  - `/ski-randonnee-georgie-petit-caucase-2027/` — GÉORGIE — PETIT CAUCASE 2027
  - `/ski-randonnee-ouzbekistan-traversee-baysun/` — OUZBÉKISTAN — HISSAR 2027
  - `/ski-randonnee-armenie-sevan-aragats-2027/` — ARMÉNIE — SEVAN À L’ARAGATS 2027
  - `/raid-ski-mediterraneen-2027/` — RAID À SKI MÉDITERRANÉEN 2027
  - `/ski-randonnee-tadjikistan-zeravshan-2027/` — TADJIKISTAN — VALLÉES DU ZERAVSHAN 2027
  - `/alpes-ligures-traversee-ski-randonnee/` — ALPES LIGURES
  - `/traversee-ski-argentera-mercantour/` — ARGENTERA — MERCANTOUR
  - `/escalade-grandes-voies-sardaigne-octobre-2026/` — SARDAIGNE — GRANDES VOIES 2026
  - `/bernina-tour-massif-ski-randonnee/` — BERNINA — TOUR DU MASSIF

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
6. Conserver les slugs listés dans `docs/legacy-url-inventory.csv`. Pour toute différence, renseigner la colonne `nouvelle_url_cible` puis créer la règle 301 chez le futur gestionnaire de domaine/CDN.
7. Ajouter une page 404 utile, sans redirection automatique vers l’accueil.
8. À chaque étape stable : `npm run build`, puis commit clair et push sur `rebuild-v1`.

## Ce qui doit rester hors du dépôt tant que la migration n’est pas validée

- DNS du domaine, domaine personnalisé GitHub Pages et configuration HTTPS.
- Redirections 301 définitives : elles doivent être actives au niveau du serveur/CDN qui garde le domaine, car GitHub Pages ne remplace pas un vrai moteur de redirection par chemin.
- Désactivation, suppression ou changement de thème WordPress.

## Validation avant bascule

1. Comparer chaque URL prioritaire aux pages Astro correspondantes : code 200, titre, meta description, canonical, H1, contenu principal, image et liens internes.
2. Tester les redirections 301 de toutes les URL qui changent.
3. Vérifier `robots.txt`, sitemap, HTTPS, version canonique sans/www et erreurs 404.
4. Seulement alors : connecter le domaine à GitHub Pages, activer HTTPS, soumettre le nouveau sitemap dans Google Search Console.
5. Conserver WordPress et les 301 au minimum douze mois ; aucun retrait tant que Search Console ne montre pas une indexation stable.
