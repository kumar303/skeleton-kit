module.exports = {
  setupFiles: ["<rootDir>src/__tests__/setupJsDom.js"],
  setupFilesAfterEnv: ["<rootDir>src/__tests__/setupTests.tsx"],
  testEnvironment: "node",
  testPathIgnorePatterns: [
    "/node_modules/",
    "<rootDir>/build/",
    "<rootDir>/src/__tests__/setup.*",
  ],
  // This needs to match the url in __tests__/setupJsDom.js
  testURL: "http://localhost",
};
