import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  testMatch: ["**/?(*.)+(spec|test).[tj]s?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: [
    "<rootDir>/src/test/setupServer.ts",
    "<rootDir>/setupTests.ts", // ここを修正
  ],
  transform: {
    "^.+\\.jsx?$": "babel-jest", // これを追加
    "^.+\\.[tj]sx?$": "babel-jest", // ここで .tsx? ファイルも含める
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};

export default config;
