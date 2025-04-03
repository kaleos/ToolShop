const { defineConfig, devices } = require('@playwright/test')

module.exports = defineConfig({
  baseURL: 'https://practicesoftwaretesting.com/',
  loginURL: 'https://practicesoftwaretesting.com/auth/login',
  registrationURL: 'https://practicesoftwaretesting.com/auth/register',
  contactURL: 'https://practicesoftwaretesting.com/contact',
  myAccountURL: 'https://practicesoftwaretesting.com/account',
  myFavoritesURL: 'https://practicesoftwaretesting.com/account/favorites',
  myProfileURL: 'https://practicesoftwaretesting.com/account/profile',
  myInvoicesURL: 'https://practicesoftwaretesting.com/account/invoices',
  myMessagesURL: 'https://practicesoftwaretesting.com/account/messages',
  handToolsURL: 'https://practicesoftwaretesting.com/category/hand-tools',
  powerToolsURL: 'https://practicesoftwaretesting.com/category/power-tools',
  otherURL: 'https://practicesoftwaretesting.com/category/other',
  specialToolsURL: 'https://practicesoftwaretesting.com/category/special-tools',
  rentalsURL: 'https://practicesoftwaretesting.com/rentals',
  testDir: './tests',
  timeout: 30000,
  workers: 6,
  retries: 4,
  fullyParallel: true,
  reporter: 'html',
  use: {
    viewport: { width: 1280, height: 720 },
    video: 'retain-on-failure', // Save videos for failed tests
    trace: 'on-first-retry', // Capture trace for failed tests on first retry
  },

  projects: [
    // {
    //   name: 'safari',
    //   use: {
    //       browserName: 'webkit',
    //       headless: false,
    //       viewport: { width: 1280, height: 720 },
    //       screenshot: 'off', // I have manual screenshot in testLogic
    //       video: 'retain-on-failure', // Save videos for failed tests
    //       trace: 'on-first-retry', // Capture trace for failed tests on first retry
    //     }
    // },
    {
      name: 'chrome',
      use: {
          browserName: 'chromium',
          headless: false,
          viewport: { width: 1280, height: 720 },
          screenshot: 'off', // I have manual screenshot in testLogic
          video: 'retain-on-failure', // Save videos for failed tests
          trace: 'on-first-retry', // Capture trace for failed tests on first retry
          //...devices['Galaxy S9+'],
          //...devices['iPhone 13']
        }
    },
    // {
    //   name: 'edge',
    //   use: {
    //       browserName: 'chromium',
    //       channel: 'msedge',
    //       headless: false,
    //       viewport: { width: 1280, height: 720 },
    //       screenshot: 'off', // I have manual screenshot in testLogic
    //       video: 'retain-on-failure', // Save videos for failed tests
    //       trace: 'on-first-retry', // Capture trace for failed tests on first retry
    //     }
    // },
    // {
    //   name: 'firefox',
    //   use: {
    //       browserName: 'firefox',
    //       headless: false,
    //       viewport: { width: 1280, height: 720 },
    //       screenshot: 'off', // I have manual screenshot in testLogic
    //       video: 'retain-on-failure', // Save videos for failed tests
    //       trace: 'on-first-retry', // Capture trace for failed tests on first retry
    //     }
    // },
],
})
