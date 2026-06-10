const { defineConfig, devices } = require('@playwright/test');
const { config } = require('./utils/config');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : config.workers,
  timeout: 30_000, //maximun time for test completion
  expect: {
    timeout: 5_000, //[assertions in Selenium, expect time]
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'reports/playwright-html', open: 'never' }],
    ['junit', { outputFile: 'reports/junit/results.xml' }],
  ],
  use: {
    baseURL: config.baseURL,
    headless: config.headless,
    actionTimeout: 10_000, //actions [click, fill, check....]
    navigationTimeout: 15_000, // browsers [goto, waitForURL]
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});