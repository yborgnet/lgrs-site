## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Contenu GPX (carnets et voyages)

Avant toute reconstruction d'itinéraire (étapes, distance, dénivelé,
toponymie) à partir d'un GPX, suivre `docs/gpx-methodology.md` : hiérarchie
des sources, découpage en journées, lissage du dénivelé, et — pour les
itinéraires alpins — croisement systématique avec Camptocamp/Skitour comme
sources secondaires de validation (jamais pour remplacer la géométrie du
GPX).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
