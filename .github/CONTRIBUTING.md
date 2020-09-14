# Contributing

Here's how to get started developing features for `skeleton-kit`. Thanks for helping out!

## Installation

[Node.JS](https://nodejs.org/en/) 10 or higher is required.

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

To deploy the Storybook build, first create a [GitHub token](https://github.com/settings/tokens/new?scopes=repo) with all `repo` scopes. Run this from the `main` branch to deploy:

```
GH_TOKEN=[your_token] yarn deploy-storybook
```

## Create a release

- Make sure all PRs have been merged
- Edit `package.json` and increment the version
- If there are breaking changes since the last release, make it a major release according to [semver](https://semver.org/) guidelines
- [Create a new release](https://github.com/kumar303/skeleton-kit/releases/new) from GitHub
- Check out that tag and run `yarn publish`
- TODO: [automate this](https://github.com/kumar303/skeleton-kit/issues/19)
