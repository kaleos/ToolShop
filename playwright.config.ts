import { defineConfig, devices } from '@playwright/test'

export interface PlaywrightConfig {
  baseURL: string
  loginURL: string
  registrationURL: string
  contactURL: string
  myAccountURL: string
  myFavoritesURL: string
  myProfileURL: string
  myInvoicesURL: string
  myMessagesURL: string
  handToolsURL: string
  powerToolsURL: string
  otherURL: string
  specialToolsURL: string
  rentalsURL: string
}

const config = defineConfig({
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
  workers: 5,
  retries: 3,
  fullyParallel: true,
  reporter: 'html',
  use: {
    viewport: { width: 1280, height: 720 },
    //video: 'retain-on-failure', // Save videos for failed tests
    trace: 'on-first-retry' // Capture trace for failed tests on first retry
  },

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        viewport: { width: 1280, height: 720 },
        screenshot: 'off', // I have manual screenshot in testLogic
        video: 'retain-on-failure', // Save videos for failed tests
        trace: 'on-first-retry' // Capture trace for failed tests on first retry
      }
    }
  ]
})

export default config
