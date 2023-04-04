module.exports = {
  env: {
    node: true,
  },
  extends: [
    "../../node_modules/@app/eslint-config/common",
    "../../node_modules/@app/eslint-config/node.jest",
  ],
  ignorePatterns: ["node_modules", "**/*.js", "dist"],
};
