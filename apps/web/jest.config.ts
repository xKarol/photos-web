import nextJest from "next/jest";
import type { Config } from "@jest/types";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config.InitialOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",
  testPathIgnorePatterns: ["<rootDir>/e2e/"],
};

export default createJestConfig(customJestConfig);
