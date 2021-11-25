# Catalogue

This project was generated using [Nx](https://nx.dev).

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

## Generate an application

Run `nx g @nrwl/react:app webcomponents` to generate an application.

## Generate a library

Run `nx g @nrwl/react:lib ui/search` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@catalogue/mylib`.

## Development server

Run `nx serve catalogue` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you
change any of the source files.

## Code scaffolding

```
cd libs/ui/search/
nx g @nrwl/react:component cat-search-filter-menu --export
```

to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use
the `--prod` flag for a production build.

Analyze bundle:

```
nx run catalogue:build:production --statsJson
npm analyze:app
```

Linting:

```
npm lint-all
```

## Running unit tests

Run `nx test catalogue` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e catalogue` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

```
nx e2e catalogue-e2e --watch
```

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
