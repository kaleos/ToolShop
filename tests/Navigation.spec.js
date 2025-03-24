const { test, expect } = require ('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { Navigation } = require ('../pages/NavigationPage')

let goToPage
let navigation

test.beforeEach(async ({ page }) => {
  goToPage = await page.goto(baseURL)
  navigation = new Navigation(page)
})

test('@UI Verify the user is able to navigate through some of the tabs on top', async () => {
  const tabs = ['Contact', 'Sign in', 'Home']
  for (const tab of tabs) {
    expect(await navigation.tabNavigation(tab)).toBe(true)
  }
})