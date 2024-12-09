# dotCMS Vue JS Example

This is a demo application that uses Vue.js to render the dotCMS demo instance.

If is based on the [official Vue.js example application in dotCMS/core](https://github.com/dotCMS/core/tree/main/examples/vuejs).

## Features and fixes of this fork
- The initial commit of this repo represents the state of the example application in the core repo. Subsequent commits represent my work.
- Upon initial load of the root page, the app did not refresh to show the front-page components. This is now fixed.
- `Activity` and `Banner` components referred to an incorrect image URL. This is now fixed.
- Fixed some warnings thrown by recent version of Vue.
- Added `VtlInclude` as a generic component that delegates rendering to an internal component specified in the prop `widgetCodeJSON.useComponent`.
- Implemented `BlogListing` to show the blog listing and `BlogPost` to show a blog entry.

## What do you need?
1. A dotCMS instance or you can use https://demo.dotcms.com
2. A valid AUTH token for the target instance (see: https://auth.dotcms.com/docs/latest/rest-api-authentication#creating-an-api-token-in-the-ui)
3. Node js 18+ and npm installed
4. Terminal
5. And a code editor.


## Get the Vue Example code

You can get the vue example by checking out the project repo
```bash
git clone -n --depth=1 --filter=tree:0 https://github.com/dotCMS/core
cd core
git sparse-checkout set --no-cone examples/vuejs
git checkout
```
The files will be found under the `examples/angular` folder

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
