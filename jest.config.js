'use strict'

const { defaults } = require('jest-config')

module.exports = {
  collectCoverageFrom: [
    'src/**/*.ts?(x)',
    '!src/api/schema.ts',
    '!src/components/html/*.ts?(x)',
    '!src/*.ts?(x)',
  ],
  coverageDirectory: 'coverage',
  coverageThreshold: {
    global: { branches: 100, functions: 100, lines: 100, statements: 100 },
    'src/routes/home': { branches: 75 },
  },
  errorOnDeprecated: true,
  globals: { __IS_DEV__: false },
  moduleDirectories: [...defaults.moduleDirectories, '<rootDir>/src'],
  restoreMocks: true,
  setupFilesAfterEnv: ['<rootDir>/config/jest/setup.ts'],
  snapshotResolver: '<rootDir>/config/jest/snapshot-resolver.js',
  testMatch: ['<rootDir>/src/**/*(*.)test.ts?(x)'],
  testRunner: 'jest-circus/runner',
  transform: {
    '^(?!.*\\.(js|json|ts(x)?)$)': '<rootDir>/config/jest/file-transformer.js',
    '^.+\\.ts(x)?$': require.resolve('babel-jest'),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.js$'],
}
