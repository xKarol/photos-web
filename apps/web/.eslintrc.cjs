/* eslint-disable @typescript-eslint/no-var-requires */
const nextConfig = require('eslint-config/nextjs')

module.exports = {
  root: true,
  ...nextConfig,
  extends: [...nextConfig.extends,"next/core-web-vitals"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}