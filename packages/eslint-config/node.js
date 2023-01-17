module.exports = {
  env: {
    node: true,
  },
  extends: [
    "../../node_modules/eslint-config/common",
    "../../node_modules/eslint-config/node.jest",
  ],
  ignorePatterns: ["node_modules", "**/*.js", "dist"],
};
