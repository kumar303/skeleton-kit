// I'm pretty sure this config only exists for jest (currently).
module.exports = {
  plugins: [["react-native-web", { commonjs: true }]],
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};
