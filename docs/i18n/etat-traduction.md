# Traduction intégrale EN / IT

## Couverture

- 32 pages françaises de référence, chacune déclinée en anglais et en italien :
  64 pages localisées, dont les 16 carnets, leur index, les cinq voyages 2027,
  les pages éditoriales, l’accueil, le contact et la newsletter.
- 50 modules de données localisés, avec les mêmes types, clés, tableaux,
  nombres, dates de départ, chemins de photos/GPX et identifiants que les sources.
- Les récits, légendes, textes alternatifs, métadonnées SEO et cinq plans SKI MED
  sont inclus. Les noms propres et la marque restent inchangés.
- Le français garde ses pages et imports de données d’origine. Les slugs sont
  identiques dans les trois langues. `404.astro` et les sauvegardes sont exclus.

## Organisation

Les modules `src/data/carnets/{en,it}/` et `src/data/voyages/{en,it}/` exposent les
mêmes exports et types que leurs sources françaises. `src/i18n/data.ts` crée des
copies localisées sans modifier les objets d’origine. Les textes sont stockés
localement dans `src/i18n/content/en.json` et `it.json`, indexés par le texte
français exact : chiffres et fichiers ne sont pas recopiés manuellement.

Une traduction absente fait échouer la compilation plutôt que d’afficher
silencieusement du français sur une page EN / IT. Les sources françaises
n’importent pas ce mécanisme et restent indépendantes. Les coordonnées, noms
sur les cartes, traces, fichiers, liens externes et identifiants sont préservés.
Les nombres et prix sont formatés dans la langue cible, sans recalcul.

Les données sont traduites à la compilation. Aucun service de traduction ni
aucune nouvelle dépendance npm n’est utilisé par le site. Les composants et
les liens internes utilisent les outils i18n existants. Le sélecteur de plans
SKI MED choisit ses données selon `Astro.currentLocale`.

## Vérifications

- Build statique réussi : 97 pages (96 dans les trois langues + 404), hors les
  trois redirections déjà existantes ; configuration et redirections inchangées.
- Builds vérifiés avec la base de prévisualisation `/lgrs-site/` et avec `/`,
  configuration utilisée en production.
- 96 pages contrôlées : langue HTML, canonique, hreflang FR / EN / IT /
  x-default, champs newsletter et 1 809 liens internes. Aucun lien vers une
  version française quand la version localisée existe, hors sélecteur FR.
- 50 modules contrôlés : 6 692 nombres et indicateurs et 3 544 chemins / liens /
  identifiants inchangés ; structure, dates de départ et balises HTML intactes.
- Vérification TypeScript des données et du module de localisation réussie,
  avec un compilateur isolé ; `package.json` et le fichier de verrouillage
  ne changent pas.
- Comparaison du build français avec celui d’avant traduction : contenu et
  structure identiques, hors ajouts attendus du sélecteur et des hreflang.
  Déclarations CSS françaises inchangées sur les 36 documents de référence
  (redirections comprises), après exclusion des styles propres aux pages EN/IT.
- Référence visuelle de l’accueil français capturée avant publication ; contrôle
  du site en ligne effectué lors de la publication.

Contrôles reproductibles après un build :

```sh
node scripts/i18n/check-data.mjs
python scripts/i18n/check-output.py --base /
```

Pour comparer le HTML français à un build de référence conservé :

```sh
python scripts/i18n/check-output.py --base /lgrs-site/ --baseline /chemin/vers/dist-reference
```

## Maintenance

Après un changement éditorial français, mettre à jour les deux dictionnaires
et les pages concernées, puis reconstruire et lancer les contrôles ci-dessus.
Continuer exclusivement sur `rebuild-v1` : chaque push déclenche le déploiement
en production. Aucun changement n’a été fait sur `main`.
