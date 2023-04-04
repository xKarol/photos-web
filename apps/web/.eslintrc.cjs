/* eslint-disable @typescript-eslint/no-var-requires */
const nextConfig = require("@app/eslint-config/nextjs");

module.exports = {
  ...nextConfig,
  extends: [...nextConfig.extends, "next/core-web-vitals"],
  parserOptions: {
    root: true,
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
  },
};
