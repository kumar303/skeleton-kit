module.exports = {
  stories: ["../stories/**/*.stories.[tj]s[x]"],
  addons: [
    "@storybook/preset-typescript",
    "@storybook/addon-actions",
    "@storybook/addon-links",
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("ts-loader"),
          options: { configFile: "tsconfig.json" },
        },
        // Optional
        {
          loader: require.resolve("react-docgen-typescript-loader"),
        },
      ],
    });
    config.resolve.extensions.push(".ts", ".tsx");
    return config;
  },
};
