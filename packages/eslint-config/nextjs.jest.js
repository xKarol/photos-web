const jestEslint = require("./common.jest");
const overrides = jestEslint.overrides[0];
module.exports = {
  overrides: [
    {
      ...overrides,
      extends: [...overrides.extends, "plugin:testing-library/react"],
      plugins: [...overrides.plugins, "jest-dom"],
    },
  ],
};
