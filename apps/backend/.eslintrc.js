module.exports = {
  ...require("eslint-config/node"),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
