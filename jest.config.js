const packageJson = require("./package");
module.exports = {
  displayName: packageJson.name,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.ts", "!test/**/*.*"],
  coveragePathIgnorePatterns: ["node_modules", "dist"],
  coverageReporters: ["text", "cobertura", "html", "lcov"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleDirectories: ["<rootDir>/dist", "<rootDir>/node_modules"],
  transform: {
    "^.+\\.ts?$": "ts-jest",
  },
  preset: "ts-jest",
  testRegex: "\\.spec\\.ts$",
  testResultsProcessor: "jest-junit",
  reporters: [
    "default",
    [
      "jest-junit",
      {
        outputDirectory: "testReports/unit",
        outputName: "junitresults.xml",
        usePathForSuiteName: "true",
      },
    ],
  ],
  roots: ["<rootDir>/tests"],
};
