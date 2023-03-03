module.exports = {
  overrides: [
    {
      extends: ["plugin:playwright/playwright-test"],
      files: ["**/e2e/**/*.[jt]s?(x)"],
    },
  ],
};
