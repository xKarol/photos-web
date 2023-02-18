module.exports = {
  overrides: [
    {
      extends: ["plugin:jest/recommended"],
      files: [
        "**/__tests__/**/*.[jt]s?(x)",
        "**/__test__/**/*.[jt]s?(x)",
        "**/?(*.)+(spec|test).[jt]s?(x)",
      ],
      plugins: ["jest"],
      rules: {},
    },
  ],
};
