module.exports = {
  env: {
    node: true,
  },
  extends: [
    "../../node_modules/eslint-config/common",
    "../../node_modules/eslint-config/node.jest",
    // "plugin:promise/recommended",
  ],
  rules: {
    // "@typescript-eslint/no-explicit-any": "off",
  },
  ignorePatterns: ["dist"],
};
