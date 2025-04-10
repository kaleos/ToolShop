const { loginFixtures } = require('../fixtures/loginFixtures')
const { expect } = require('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { NavigationPage } = require('../pages/NavigationPage')

const test = loginFixtures
let navigationPage

test.beforeEach(async ({ page, loginPage, validCredentials }) => {
  await page.goto(baseURL)
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
  navigationPage = new NavigationPage(page)
  await page.waitForLoadState('networkidle')
})

test('@UI Verify the user is able to navigate through various pages and verify URLs', async ({ page }) => {
  const tabs = ['My account', 'My favorites', 'My profile', 'My invoices', 'My messages', 'Contact', 'Home']
  for (const tab of tabs) {
    const expectedURL = await navigationPage.tabNavigation(tab)
    expect(page.url()).toMatch(new RegExp(`^${expectedURL.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}/?$`))
  }
})

test('@UI Verify Favorites, Profile, Invoices and Messages are displayed to the left when logged in', async () => {
  expect(await navigationPage.containerNavigationVisible('Favorites')).toBe(true, 'Favorites should be visible in the container menu')
  expect(await navigationPage.containerNavigationVisible('Profile')).toBe(true, 'Profile should be visible in the container menu')
  expect(await navigationPage.containerNavigationVisible('Invoices')).toBe(true, 'Invoices should be visible in the container menu')
  expect(await navigationPage.containerNavigationVisible('Messages')).toBe(true, 'Messages should be visible in the container menu')
})
