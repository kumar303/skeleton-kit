# Contributing

Here's how to set yourself up to develop features for `skeleton-kit`.

## Installation

Install [yarn](https://yarnpkg.com/) then type this to install all dependencies:

```
yarn
```

## Development

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

Check for [prettier](https://prettier.io/) formatting errors:

```
yarn prettier-check
```

## Deploying Storybook

To deploy the Storybook build, first create a [GitHub token](https://github.com/settings/tokens) with all `repo` scopes. Run this from the `main` branch to deploy:

```
GH_TOKEN=[your_token] yarn deploy-storybook
```
