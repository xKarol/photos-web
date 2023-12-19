module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:unicorn/recommended",
    "plugin:prettier/recommended",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "warn",
    "@typescript-eslint/ban-ts-comment": "off",
    "unicorn/prevent-abbreviations": "off",
    "unicorn/no-null": "off",
    "unicorn/better-regex": "off",
    "unicorn/catch-error-name": "off",
    "unicorn/prefer-top-level-await": "off",
  },
  ignorePatterns: ["node_modules"],
};
