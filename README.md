# Svelte App

This is my personal webpack template for svelte apps. It leverages a more
modern webpack development server called
[webpack-plugin-serve](https://github.com/shellscape/webpack-plugin-serve).

The svelte bits are borrowed from
[sveltejs/template-webpack](https://github.com/sveltejs/template-webpack),
the officially supported svelte webpack template.

To create a new project, use [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit davidroeca/svelte-template-wps app
cd app
```

You will need [node](https://nodejs.org/) 10.0.0+ installed on your
machine.

## Get started

```bash
cd app
yarn install
# OR
npm install
```

Then start the dev server

```bash
yarn start
# OR
npm run start
```

Navigate to `localhost:8000` to see the app. It has live reloading supported
until [HMR](https://github.com/sveltejs/svelte/issues/2377) is sorted out.

## Production build

```bash
yarn build
# OR
npm run build
```

Deploy these files however you see fit.
