/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  modulePathIgnorePatterns: [
    "<rootDir>/dist/",
    "<rootDir>/src/__tests__/utils.ts",
  ],
  setupFilesAfterEnv: ["jest-extended/all", "<rootDir>/jest.setup.ts"],
  collectCoverageFrom: ["src/**/*.{js,jsx,ts,tsx}"],
};
