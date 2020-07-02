# skeleton-kit

This is a React toolkit for creating low maintenance, pixel-perfect skeleton screens.

The skeleton screen technique lets you render a page before its data has loaded. Unlike spinners, they feel fast and let you defer only what's necessary.

## Goals

- Automatically adapt skeletons to real screens
- Fit into pixel perfect design systems
- No breakage, no maintenance burden, always in sync
- Make it easy to work with lists of unknown lengths
- Built to last: TypeScript, React hooks, accessibility, tests

## Development

Install [yarn](https://yarnpkg.com/) then type this to install all dependencies:

```
yarn
```

Run the test suite as you edit files:

```
yarn test --watch
```

Start a [storybook](https://storybook.js.org/) server:

```
yarn storybook
```

Check for [TypeScript](https://www.typescriptlang.org/) errors as you edit files:

```
yarn tsc -w
```

Check for [eslint](https://eslint.org/) errors:

```
yarn lint
```

## Alternatives

Most alternative skeleton libraries require the developer to build and maintain a separate skeleton screen that can easily get out of sync with the real screen.
However, here are a few libraries that share the same goals as `skeleton-kit`:

- [react-native-skeleton-content](https://github.com/alexZajac/react-native-skeleton-content) is a React Native libary that adapts to layouts in a similar manner
- [react-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) automatically adapts to web layouts but is limited in what it can do
