import { test, expect, Page } from '@playwright/test'
import config from '../playwright.config'
import { HomePage } from '../pages/HomePage'

let homePage: HomePage

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(config.baseURL)
  homePage = new HomePage(page)
  // 'networkidle' is unreliable against a live third-party site; wait for
  // the logo instead, which only renders once the page has fully loaded.
  await page.locator(homePage.locators.toolShopLogo).waitFor({ state: 'visible' })
})

test('@UI Verify the Toolshop logo is displayed on top', async () => {
  expect(await homePage.toolShopLogoVisible()).toBe(true)
})

test('@UI Verify a banner is displayed on top of the page', async () => {
  expect(await homePage.bannerVisible()).toBe(true)
})

test('@UI Verify the language button is displayed on top of the page', async () => {
  expect(await homePage.languageBtnVisible()).toBe(true)
})

test('@UI Verify all the correct headers are displayed in the sidebar', async () => {
  expect(await homePage.headersDisplayed('Sort')).toBe(true)
  expect(await homePage.headersDisplayed('Price Range')).toBe(true)
  expect(await homePage.headersDisplayed('Search')).toBe(true)
  expect(await homePage.headersDisplayed('Filters')).toBe(true)
  expect(await homePage.headersDisplayed('By Category:')).toBe(true)
  expect(await homePage.headersDisplayed('By Brand:')).toBe(true)
})

test('@UI Verify all the correct filter options are displayed in the sidebar', async () => {
  await homePage.sidebarFilterOptions()
})

test('@UI Verify the correct options are displayed in the Sort dropdown', async () => {
  expect(await homePage.sortOptionsDisplayed()).toBe(true)
})
