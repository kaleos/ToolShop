import { test, expect } from '@playwright/test'
import { loginFixtures } from '../fixtures/loginFixtures'
import config from '../playwright.config'
import { NavigationPage } from '../pages/NavigationPage'

const extendedTest = loginFixtures
let navigationPage: NavigationPage

extendedTest.beforeEach(async ({ page, loginPage, validCredentials }) => {
  await page.goto(config.baseURL)
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
  navigationPage = new NavigationPage(page, {
    contactURL: config.contactURL,
    myAccountURL: config.myAccountURL,
    myFavoritesURL: config.myFavoritesURL,
    myProfileURL: config.myProfileURL,
    myInvoicesURL: config.myInvoicesURL,
    myMessagesURL: config.myMessagesURL,
    baseURL: config.baseURL
  })
  await page.waitForLoadState('networkidle')
})

extendedTest('@UI Verify the user is able to navigate through various pages and verify URLs', async ({ page }) => {
  const tabs = ['My account', 'My favorites', 'My profile', 'My invoices', 'My messages', 'Contact', 'Home']
  for (const tab of tabs) {
    const expectedURL = await navigationPage.tabNavigation(tab)
    expect(page.url()).toMatch(new RegExp(`^${expectedURL.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}/?$`))
  }
})

extendedTest('@UI Verify Favorites, Profile, Invoices and Messages are displayed to the left when logged in', async () => {
  expect(await navigationPage.containerNavigationVisible('Favorites')).toBe(true)
  expect(await navigationPage.containerNavigationVisible('Profile')).toBe(true)
  expect(await navigationPage.containerNavigationVisible('Invoices')).toBe(true)
  expect(await navigationPage.containerNavigationVisible('Messages')).toBe(true)
})
