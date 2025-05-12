/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest/presets/default-esm',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        useESM: true,
        tsconfig: 'tsconfig.json'
      }
    ]
  },
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: "./reports",
        filename: "report.html",
        expand: true,
        openReport: true,
        includeConsoleLog: true,
      }
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  maxWorkers: 4,
  workerIdleMemoryLimit: '512MB'
};

export default config;