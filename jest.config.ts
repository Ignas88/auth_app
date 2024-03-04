import { pathsToModuleNameMapper } from 'ts-jest'
import type {Config} from 'jest';
import { compilerOptions } from './tsconfig.json'

const config: Config = {
  clearMocks: true,
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "jsdom",
  transform: {
    '^.+\\.ts?$': 'ts-jest',
    '^.+\\.svg?$': '<rootDir>/jest-svg-transformer.js',
  },
  transformIgnorePatterns: [
    "/node_modules/^(query-string)",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  testMatch: [ "**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(test).[jt]s?(x)" ],
  roots: ['<rootDir>'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths /*, { prefix: '<rootDir>/' } */),
  setupFilesAfterEnv: [
    "<rootDir>/setupTests.ts"
  ],
};

export default config;
