module.exports = {
  verbose: true,
  collectCoverage: true,
  coveragePathIgnorePatterns: ['node_modules', 'dist'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}', '!**/node_modules/**', '!src/index.ts', '!src/Mocks.ts'],
  coverageReporters: ['text', 'cobertura', 'html', 'lcov'],
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testRegex: '\\.spec\\.ts$',
  testResultsProcessor: 'jest-junit',
  reporters: [
    'default',
    [
      'jest-junit',
      { outputDirectory: 'testReports/unit', outputName: 'junitresults.xml', usePathForSuiteName: 'true' },
    ],
  ],
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  roots: ['./'],
};
