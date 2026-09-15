# Méthodologie GPX — carnets et voyages

Règles suivies pour transformer une trace GPX (carnet passé) ou un tracé
planifié (voyage à venir) en contenu éditorial (étapes, distances, dénivelés,
toponymie) sans jamais inventer de données.

Champ d'application : tout contenu dérivé d'un GPX dans `src/data/carnets/*`
et `src/data/voyages/*` (itinéraire, carte, hero).

## Principes généraux

- Le **GPX original ne doit jamais être modifié**. Il est archivé tel quel
  dans `data/gpx-sources/*.original.gpx`. Toute version affichée sur le site
  (`public/gpx/*.gpx`) est une version **dérivée** (simplifiée pour le web,
  voir plus bas), jamais un remplacement de l'original.
- Une seule source de vérité par carnet/voyage : les stats affichées (hero,
  encart Informations, carte, cartes-journée) sont **calculées** depuis la
  même structure `itinerary.days`, jamais recopiées en dur à plusieurs
  endroits (voir `src/lib/carnet/itinerary-totals.ts`).
- On ne devine jamais un découpage en jours, un nom de lieu ou une variante
  d'itinéraire. En cas d'ambiguïté réelle : on le signale (voir niveaux de
  confiance) plutôt que d'arbitrer silencieusement.

## Découpage en journées (carnet passé)

Priorité, dans l'ordre :

1. **Segments natifs du GPX** (`<trkseg>` séparés) si l'enregistrement les
   fournit déjà.
2. **Coupures temporelles** entre points consécutifs (`<time>`) — une pause
   longue (nuit, bivouac) se traduit par un écart de plusieurs heures entre
   deux points autrement proches géographiquement. Le seuil se juge trace par
   trace (ex. Bernina : seules 3 coupures > 9h sur toute la trace, sans
   ambiguïté avec les pauses courtes de la journée).
3. **Clusters géographiques** (le tracé reste immobile ou tourne sur place =
   halte/nuit) quand l'horodatage est absent ou peu fiable.
4. **Refuges / cabanes / bivouacs cités dans le récit**, utilisés pour
   confirmer qu'une coupure identifiée par 2. ou 3. correspond bien à un lieu
   réel de halte.
5. **Photos** (métadonnées EXIF, ou au minimum leur ordre de fichier) pour
   recouper la chronologie quand le texte seul ne suffit pas.
6. **Géographie** (cols, sommets, lignes de crête évidentes) en tout dernier
   recours, jamais comme découpage arbitraire "4 jours = 4 parts égales".

## Distance et dénivelé

- **Distance** : somme des distances géodésiques point à point (haversine)
  sur la trace réelle (pas la version simplifiée pour le web).
- **Dénivelé (D+/D−)** : calculé sur les altitudes `<ele>` réelles du GPX,
  après lissage — une moyenne glissante (fenêtre ~9 points) avec un seuil de
  bruit (~2 m) pour ignorer les micro-oscillations du capteur GPS/baro qui
  gonflent artificiellement le dénivelé cumulé. Le résultat brut (non lissé)
  est toujours comparé au résultat lissé pendant l'analyse, pour vérifier que
  le lissage ne masque pas un vrai passage technique.
- Ces paramètres (fenêtre, seuil) sont indicatifs, pas figés : à ajuster
  selon la densité et le bruit propre de chaque trace, en gardant trace du
  choix fait (commentaire dans le fichier de données, comme dans
  `src/data/carnets/bernina.ts`).
- Les totaux (distance, D+, D−, nombre de jours) sont exposés via
  `computeItineraryTotals()` et les formateurs de
  `src/lib/carnet/itinerary-totals.ts` — jamais recalculés à la main ailleurs.

## Trace dérivée pour le web

- La trace affichée sur la carte (`public/gpx/*.gpx`) est simplifiée
  (Ramer–Douglas–Peucker, epsilon de l'ordre de quelques mètres selon la
  trace) pour rester légère côté navigateur.
- Cette version dérivée ne sert **jamais** de base aux calculs de distance/
  dénivelé ni à la reconstruction des journées : ceux-ci s'appuient toujours
  sur le GPX original archivé.

## Toponymie — nommer le terrain traversé

### Dans les Alpes : croiser avec Camptocamp et Skitour

Pour tout itinéraire situé dans les Alpes, compléter systématiquement
l'analyse GPX/OSM avec **Camptocamp** et **Skitour**, utilisés comme
**sources secondaires de validation**, notamment pour :

- noms exacts des cols, sommets, glaciers ;
- noms de refuges / cabanes / bivouacs ;
- variantes classiques de montée ou de descente ;
- passages usuels à ski ;
- altitudes ;
- orthographe locale des toponymes ;
- cohérence générale du tracé avec les itinéraires connus du secteur.

**Important — ce que Camptocamp/Skitour ne doivent jamais faire** : le GPX
(carnet) ou le tracé planifié validé (voyage) reste la seule source de vérité
sur **où la trace est réellement/doit réellement passer**. Camptocamp et
Skitour servent à comprendre et nommer le terrain, confirmer un passage,
identifier une variante ou contrôler qu'un toponyme est cohérent — jamais à
remplacer arbitrairement la géométrie du GPX par l'itinéraire classique
décrit sur la fiche.

> Exemple : si Camptocamp décrit une voie classique passant par un col donné,
> mais que le GPX passe 500 m plus loin par une autre branche, on n'écrit pas
> que le raid est passé par ce col.

### Hors des Alpes

Ne pas forcer Camptocamp/Skitour quand ils n'apportent rien (Caucase, Asie
centrale, Balkans, etc.). Dans ces zones, privilégier : GPX/tracé + OSM /
OpenTopoMap + sources locales + récit + contacts locaux.

### Hiérarchie des sources

**Carnet (voyage déjà réalisé) :**

1. GPX original enregistré
2. Récit réel (texte déjà publié, jamais inventé)
3. Timestamps / photos / métadonnées
4. Camptocamp / Skitour (uniquement dans les Alpes)
5. OSM / OpenTopoMap
6. Autres cartes ou sources locales

**Voyage (à venir, programme planifié) :**

1. GPX planifié validé
2. Programme validé manuellement (avec Yann)
3. Camptocamp / Skitour (uniquement dans les Alpes)
4. OSM / OpenTopoMap
5. Autres sources locales

### Méthode de croisement, par journée alpine

Pour chaque journée située dans les Alpes, croiser si possible :

- la trace GPX (ou le tracé planifié) ;
- la fiche Camptocamp pertinente ;
- la fiche Skitour pertinente ;
- une carte OSM / OpenTopoMap.

Puis attribuer un niveau de confiance à chaque toponyme/passage retenu :

- **CONFIRMÉ** — GPX + au moins une source topographique concordante
  (waypoint ou tracé de référence qui recoupe précisément le passage).
- **TRÈS PROBABLE** — GPX + géographie + Camptocamp/Skitour concordants,
  mais sans point de repère exact sur la trace.
- **À VALIDER** — ambiguïté réelle, ou divergence entre les sources ; à
  signaler explicitement plutôt qu'à trancher seul.

## Distinction carnet vs voyage

- **Carnet** (trajet déjà parcouru, GPX enregistré) : les étapes peuvent être
  déduites automatiquement de la trace, en suivant la priorité de
  découpage ci-dessus.
- **Voyage** (trajet futur, encore à confirmer sur le terrain) : les étapes
  ne doivent **jamais** être déduites automatiquement de la seule géométrie
  d'un GPX planifié. Le programme, tel que validé manuellement, prime
  toujours sur ce que la trace pourrait suggérer géométriquement.
