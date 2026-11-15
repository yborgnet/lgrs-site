# Brief — traduction du site lesgrandsraidsaski.com en anglais et en italien

Tu travailles sur le dépôt GitHub `yborgnet/lgrs-site` (site Astro 7, statique),
branche `rebuild-v1`. **Cette branche est déployée en production à chaque push**
(GitHub Pages, domaine lesgrandsraidsaski.com). Ne travaille jamais sur `main`.

Objectif : traduire l'intégralité du site en anglais (`en`) et en italien (`it`),
carnets de voyage compris. Le français reste la langue de référence et ne doit
pas changer, ni dans son texte ni dans son rendu visuel.

## 1. Ce qui est déjà en place (ne pas refaire)

- `astro.config.mjs` : i18n Astro configuré, `fr` par défaut **sans préfixe**,
  `en` et `it` sous `/en/` et `/it/`. Sitemap avec alternates hreflang.
- **Mêmes slugs dans toutes les langues** : `/philosophie/` → `/en/philosophie/`
  → `/it/philosophie/`. Ne traduis pas les slugs (ils servent à relier les
  versions entre elles).
- `src/i18n/ui.ts` : liste des langues et dictionnaire des libellés d'interface
  (`ui.fr`, `ui.en`, `ui.it`). Le français fait foi ; une clé absente en en/it
  retombe sur le français.
- `src/i18n/utils.ts` :
  - `getLang(Astro.currentLocale)` → langue de la page courante ;
  - `useTranslations(lang)` → fonction `t("cle")` ;
  - `localizedHref(lang, "/chemin-fr/")` → lien vers la version traduite si la
    page existe, sinon vers la page française (gère aussi le `base`) ;
  - `alternates(pathname)` → URLs de la page dans chaque langue existante.
- `src/components/LanguageSwitcher.astro` : sélecteur FR · EN · IT dans le
  header (desktop et menu mobile). Il détecte tout seul les pages traduites :
  une langue n'est cliquable que si le fichier `src/pages/<lang>/<slug>/index.astro`
  existe (sinon il renvoie à l'accueil de la langue, ou s'affiche grisé).
- `src/layouts/BaseLayout.astro` : `<html lang>`, `og:locale` et balises
  `<link rel="alternate" hreflang>` automatiques.
- `src/components/Header.astro` : déjà traduit (nav via `t()` et `localizedHref`).

Il n'y a **pas de fallback automatique** : une page n'existe en anglais ou en
italien que si tu crées son fichier. C'est voulu (pas de contenu français
dupliqué sous `/en/`).

## 2. Le travail à faire

### Étape A — Sortir le texte en dur des composants et layouts

Dans `src/components/**` et `src/layouts/**`, tout texte français écrit en dur
(titres de sections, boutons, libellés « Itinéraire », « Jour », « Dénivelé »,
« Fiche technique », textes alternatifs génériques, aria-label, mentions du
pop-up newsletter, de `ContactStrip`, `ContactPopup`, `Availability`,
`InformationGrid`, `CarnetLightbox`, etc.) doit passer par le dictionnaire :

```astro
---
import { getLang, useTranslations, localizedHref } from "../../i18n/utils";
const lang = getLang(Astro.currentLocale);
const t = useTranslations(lang);
---
<h2>{t("voyage.itinerary")}</h2>
<a href={localizedHref(lang, "/contact/")}>{t("cta.contact")}</a>
```

- Ajoute chaque clé dans `ui.fr` avec **exactement** le texte français actuel,
  puis dans `ui.en` et `ui.it`. Le rendu français doit rester identique au
  caractère près.
- Liens internes vers des pages : remplace `withBase("/xxx/")` par
  `localizedHref(lang, "/xxx/")`. Garde `withBase` pour les assets (images,
  GPX, favicon, PDF).
- Les `href` internes stockés dans les données (`src/data/**`, ex. liens entre
  étapes de la traversée des Alpes) restent des chemins français (`/argentera-…/`) ;
  c'est le composant qui les passe dans `localizedHref(lang, href)`.
- Formats dépendants de la langue :
  - `SkiMedPlanBody.astro` : `toLocaleString("fr-FR")` → locale selon `lang`
    (`fr-FR`, `en-GB`, `it-IT`) ;
  - `src/pages/index.astro` : `localeCompare(…, "fr", …)` → langue courante ;
  - `ContactPopup.astro` et `newsletter/index.astro` : champ caché
    `name="locale" value="fr"` → valeur = `lang` (garder les mêmes noms de
    champs Brevo, ne pas toucher à l'endpoint).

### Étape B — Données traduites

Les textes des voyages et des carnets vivent dans `src/data/voyages/*.ts` et
`src/data/carnets/*.ts` (+ `index.ts`, `skiMedPlans.ts`, `src/data/contact.ts`).

- Crée pour chaque fichier une version `src/data/voyages/en/<nom>.ts`,
  `src/data/voyages/it/<nom>.ts` (idem pour `carnets/`), **même type TypeScript,
  même structure, mêmes clés**, en ne traduisant que les champs de texte
  (titres, sous-titres, paragraphes, légendes, `alt`, labels).
- Ne modifie jamais : slugs, chemins de photos, GPX, coordonnées, chiffres
  (distances, dénivelés, prix, effectifs), dates de départ, identifiants,
  liens externes. Les stats GPX sont exactes et ne se retraduisent pas.
- Les champs HTML (« Trusted HTML fragment ») restent du HTML valide : traduis
  le texte, conserve les balises.
- Crée des index localisés (`src/data/carnets/en/index.ts`, etc.) ou une
  fonction `getCarnets(lang)` / `getVoyages(lang)` — à toi de choisir la forme
  la plus simple, du moment que les pages françaises continuent d'importer
  exactement les mêmes données qu'aujourd'hui.

### Étape C — Pages

Pour chaque page de `src/pages/` (sauf `404.astro` et `index.astro.backup`),
crée `src/pages/en/<même-slug>/index.astro` et `src/pages/it/<même-slug>/index.astro`
(et `src/pages/en/index.astro`, `src/pages/it/index.astro` pour l'accueil) :

- copie la page française, ajuste la profondeur des imports (`../../../`),
  importe les données `en`/`it` ;
- traduis le texte écrit directement dans la page ;
- `title` et `description` traduits et optimisés pour le référencement dans la
  langue (requêtes du type « ski touring trip Georgia », « hut-to-hut ski
  traverse », « viaggio scialpinismo Georgia », « traversata scialpinistica ») ;
- `canonical` = `https://lesgrandsraidsaski.com/en/<slug>/` (resp. `/it/`) ;
- n'ajoute pas de redirections dans `astro.config.mjs`.

Ordre de travail conseillé (un commit par lot, build vert à chaque fois) :
1. Étape A (composants) ;
2. accueil, prochains-voyages, voyages 2027 (Arménie, Géorgie Petit Caucase,
   Ouzbékistan, Tadjikistan, raid ski méditerranéen / SKI MED),
   voyage-ski-randonnee, raid-a-ski ;
3. philosophie, yann-borgnet-guide-haute-montagne, contact, newsletter,
   le-film, transition-raid-anthropologique-queyras ;
4. carnets-de-voyage-ski (index) puis chaque carnet.

Fais l'anglais et l'italien d'une même page dans le même lot, pour que le
sélecteur ne propose jamais une langue à moitié faite.

## 3. Consignes de traduction

Ton de la marque : éditorial, sobre, aéré, artisanal, anti-marketing. Pas de
superlatifs publicitaires, pas d'emojis, pas de points d'exclamation ajoutés.
Traduis le sens et la voix de l'auteur (Yann Borgnet, guide de haute montagne,
docteur en géographie), pas mot à mot. Les récits des carnets sont écrits à la
première personne : garde cette voix, son humour, ses images.

Anglais : britannique (`en-GB`), orthographe britannique. Italien : registre
soutenu mais naturel, terminologie de la montagne italienne.

Glossaire :

| Français | English | Italiano |
|---|---|---|
| raid à ski | ski traverse / ski touring journey | traversata scialpinistica / raid con gli sci |
| ski de randonnée | ski touring | scialpinismo |
| de village en village | village to village | di villaggio in villaggio |
| itinérance | journeying on the move / multi-day traverse | itineranza |
| refuge | hut (mountain hut) | rifugio |
| gîte, maison d'hôtes | guesthouse | casa per ospiti / locanda |
| guide de haute montagne UIAGM | IFMGA mountain guide | guida alpina UIAGM |
| carnet(s) de voyage | trip journal(s) | diario/diari di viaggio |
| fiche technique | technical sheet | scheda tecnica |
| dénivelé positif (D+) | ascent (D+) | dislivello positivo (D+) |
| journée de réserve | reserve day | giorno di riserva |
| peaux de phoque | skins | pelli di foca |
| couteaux | ski crampons | rampant |
| pension complète / demi-pension | full board / half board | pensione completa / mezza pensione |
| prochains voyages | upcoming trips | prossimi viaggi |
| traversée des Alpes en segments | Alps traverse in segments | traversata delle Alpi a tappe |

À ne pas traduire : « Les Grands Raids à Ski », « SKI MED », « Itin-Errer »
(jeu de mots du titre de la page Philosophie : garde-le et rends le sous-titre
dans la langue), noms de sponsors (Scott, CAMP, Pyrenex, Arva), noms de
personnes, noms de refuges et de sommets.

Toponymes : utilise le nom usuel de la langue cible (Géorgie → Georgia /
Georgia ; Arménie → Armenia ; Ouzbékistan → Uzbekistan ; Tadjikistan →
Tajikistan / Tagikistan ; Monténégro → Montenegro ; Grèce → Greece / Grecia ;
Alpes Ligures → Ligurian Alps / Alpi Liguri ; Écrins → Écrins / Écrins ;
Mercantour → Mercantour). Pour les vallées et villages, garde la forme locale
déjà utilisée dans le texte français.

Nombres et prix : système métrique partout. Prix en anglais `€2,450`, en
italien `2.450 €`. Dates en toutes lettres selon l'usage de la langue
(`6–14 March 2027`, `6–14 marzo 2027`).

## 4. Contraintes techniques

- Le rendu des pages françaises ne doit pas bouger d'un pixel (le desktop de
  l'accueil a été validé). Compare avant/après si tu touches un composant.
- Pas de nouvelle dépendance npm.
- `npm run build` doit passer sans erreur avant chaque commit ; corrige aussi
  les erreurs TypeScript des fichiers de données traduits (même type que le
  français).
- Vérifie qu'aucune page `en`/`it` ne contient de lien interne vers une page
  française alors que la version traduite existe (tous les liens internes via
  `localizedHref`).
- Après chaque lot, cherche le français oublié dans `dist/en` et `dist/it`
  (ex. `grep -rlE " (le|la|les|des|du|une|est|avec|pour) " dist/en`) et traite
  ce qui reste, hors noms propres.
- Messages de commit en français, descriptifs (ex. « Traduction EN/IT : pages
  voyages 2027 »). Push sur `rebuild-v1` uniquement.
