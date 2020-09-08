module.exports = {
  parser: "@typescript-eslint/parser",
  root: true,
  extends: [
    "airbnb",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "plugin:react-hooks/recommended",
    // airbnb adds the react plugin which is why we need this.
    "prettier/react",
  ],
  plugins: ["jest", "@typescript-eslint"],
  env: {
    "jest/globals": true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/explicit-module-boundary-types": "error",
    "import/extensions": [
      "error",
      "never",
      {
        // This is for importing storybook modules.
        stories: "always",
      },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.spec.tsx",
          "**/__tests__/**/*.*",
          "stories/**/*.*",
        ],
      },
    ],
    "import/prefer-default-export": "off",
    "no-console": "error",
    "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
    "react/require-default-props": "off",
    "react-hooks/exhaustive-deps": "error",

    // The following rules are disabled because we use TypeScript.
    "import/no-unresolved": "off",
    "no-restricted-syntax": "off",
    "react/jsx-props-no-spreading": "off",
    "react/no-unused-prop-types": "off",
    "react/prop-types": "off",
  },
};
