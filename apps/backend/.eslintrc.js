module.exports = {
  ...require("@app/eslint-config/node"),
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
  ignorePatterns: ["node_modules", "dist", "**/*.js", "prisma/types"],
};
