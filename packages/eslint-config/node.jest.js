const jestEslint = require("./common.jest");
const overrides = jestEslint.overrides[0];

module.exports = {
  overrides: [
    {
      env: {
        "jest/globals": true,
      },
      ...overrides,
    },
  ],
};
