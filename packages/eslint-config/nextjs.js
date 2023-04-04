module.exports = {
  env: {
    node: true,
    browser: true,
  },
  extends: [
    "../../node_modules/@app/eslint-config/common",
    "../../node_modules/@app/eslint-config/nextjs.jest",
    "../../node_modules/@app/eslint-config/e2e",
    "plugin:tailwindcss/recommended",
  ],
  rules: {
    "unicorn/filename-case": [
      "error",
      {
        case: "kebabCase",
        ignore: ["^[[].*\\.tsx$"],
      },
    ],
  },
  ignorePatterns: ["node_modules", "**/*.js"],
};
