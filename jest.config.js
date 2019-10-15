module.exports = {
    globals: {
      "ts-jest": {
        tsConfig: "tsconfig.json"
      }
    },
    moduleFileExtensions: [
      "ts",
      "js",
    ],
    transform: {
      "^.+\\.(ts|tsx)$": "ts-jest"
    },
    testMatch: [
      "**/__tests__/**/*.test.(ts|js)"
    ],
    testEnvironment: "node",
    collectCoverage: false,
    collectCoverageFrom: [
      "src/**/*.(ts|js)"
    ],
    setupFilesAfterEnv: [
        "jest-mock-console/dist/setupTestFramework.js"
    ]
  };