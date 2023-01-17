const nodeConfig = require("eslint-config/node");

module.exports = {
  "root": true,
  ...nodeConfig,
  "extends": [...nodeConfig.extends],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
