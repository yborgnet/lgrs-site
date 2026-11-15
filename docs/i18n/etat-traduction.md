# État de la traduction EN / IT

## Lot A — composants et layouts

Les libellés partagés passent par `src/i18n/ui.ts` : disponibilités, newsletter,
pop-up de contact (y compris validation et messages asynchrones), galeries,
lecture du récit, photos en attente, plans SKI MED, pieds de page et partenaires.

Les liens de navigation des composants passent par `localizedHref`, qui conserve
les fragments et paramètres, les liens externes et les chemins des fichiers.
Les canoniques des layouts Carnet et Voyage prennent en compte la langue.
Les formats des distances et nombres sont localisés. Les champs Brevo `locale`
du pop-up et de la page newsletter suivent la langue courante.

### Vérifications du lot A

- `npm run build` : succès (33 pages, hors redirections).
- Fixtures temporaires EN et IT : dictionnaires complets, mêmes paramètres
  d'interpolation, routes existantes / repli FR, fragments, paramètres, assets,
  liens externes ; rendu des disponibilités, pop-up et lightbox ; champ Brevo.
  Fixtures retirées après vérification.
- Comparaison avec le build avant modification : 36 documents français,
  aucun changement de contenu ni structure HTML après exclusion des scripts,
  des attributs de traduction ajoutés et du conditionnement des styles.
- Comparaison des déclarations CSS par sélecteur et contexte média : inchangées
  pour les 36 documents. L'ordre de regroupement des feuilles générées peut varier.
- Captures visuelles : non réalisées ; Chromium local ne démarre pas
  (`socket() failed: Operation not permitted`). Cette comparaison de code généré
  ne constitue pas une validation par capture pixel à pixel.

## Travail restant — lots B / C

Aucune page EN / IT permanente ni aucun jeu de données traduit n'a encore été
créé. La traduction complète du site n'est donc pas livrée.

1. Traduire les données et créer les pages EN / IT de l'accueil, des prochains
   voyages, des voyages 2027 et des deux pages générales sur les raids.
2. Traduire les pages éditoriales, contact, newsletter, film et Transition.
3. Traduire l'index des carnets, chaque carnet et les légendes de photos importées.
4. Brancher `SkiMedPlans.astro` sur les données de plans traduites selon la langue
   (il importe encore les données françaises ; seuls ses libellés sont localisés).
5. Contrôler titres et descriptions SEO, canoniques, hreflang, liens internes,
   français résiduel et intégrité des chiffres / dates / GPX / chemins d'assets.
6. Faire une vérification visuelle desktop et mobile dans un navigateur disponible.

Continuer exclusivement sur `rebuild-v1`, avec un build réussi avant chaque
commit ; chaque push sur cette branche déclenche le déploiement en production.
Le français demeure la référence et ses données restent inchangées.
