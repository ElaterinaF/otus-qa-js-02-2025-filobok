/** @type {import('jest').Config} */
const config = {
    maxWorkers: 4,
    maxRetries: 5,
    workerIdleMemoryLimit: '512MB',
    reporters: [
      'default',
      [
        'jest-html-reporters',
        {
          publicPath: "./reports",
          filename: "report.html",
          expand: true,
          openReport: true,
          includeConsoleLog: true, // Добавлено для отображения логов
        }
      ]
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
    },
  };

  module.exports = config;