const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  baseURL: 'https://practicesoftwaretesting.com/',
  testDir: './tests',
  timeout: 30000,
  workers: 5,
  fullyParallel: true,
  reporter: 'html',
  use: {
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure', // Save videos for failed tests
    trace: 'on-first-retry', // Capture trace for failed tests on first retry
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* Test against branded browsers. */
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

});

