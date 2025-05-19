/** @type {import('jest').Config} */
const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
        useESM: false, 
        isolatedModules: true 
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
        includeConsoleLog: true,
      }
    ]
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  maxWorkers: 1, 
  globals: {
    'ts-jest': {
      diagnostics: false 
    }
  }
};

module.exports = config; 