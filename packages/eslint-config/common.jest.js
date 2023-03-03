module.exports = {
  overrides: [
    {
      extends: ["plugin:jest/recommended"],
      files: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/__test__/**/*.[jt]s?(x)",
        "**/?(*.)+(test).[jt]s?(x)",
      ],
      plugins: ["jest"],
      rules: {
        "unicorn/prefer-module": "off",
        "@typescript-eslint/no-empty-function": "off",
      },
    },
  ],
};
