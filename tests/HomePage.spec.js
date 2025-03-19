const { test, expect } = require ('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { HomePage } = require ('../pages/HomePage')
const messages = require ('../data/messages.json')

let goToPage
let homePage

test.beforeEach(async ({ page }) => { 
  goToPage = await page.goto(baseURL)
  homePage = new HomePage(page)
  await page.waitForLoadState('networkidle')
})

test('@UI Verify the Toolshop logo is displayed on top', async () => {
  await homePage.toolShopLogoVisible()
})

test('@UI Verify a banner is displayed on top of the page', async () => {
  await homePage.bannerVisible()
})

test('@UI Verify the language button is displayed on top of the page', async () => {
  await homePage.languageBtnVisible()
})

test('@UI Verify all the correct headers are displayed in the sidebar', async () => {
  expect(await homePage.headersDisplayed('Sort')).toBe(true, 'Sort should be displayed')
  expect(await homePage.headersDisplayed('Price Range')).toBe(true, 'Price Range should be displayed')
  expect(await homePage.headersDisplayed('Search')).toBe(true, 'Search should be displayed')
  expect(await homePage.headersDisplayed('Filters')).toBe(true, 'Filters should be displayed')
  expect(await homePage.headersDisplayed('By Category:')).toBe(true, 'By Category: should be displayed')
  expect(await homePage.headersDisplayed('By Brand:')).toBe(true, 'By Brand: should be displayed')
})

test('@UI Verify all the correct filter options are displayed in the sidebar', async () => {
  await homePage.sidebarFilterOptions()
})

test('@UI Verify the correct options are displayed in the Sort dropdown', async () => {
  const options = ['Price (Low - High)', 'Price (High - Low)', 'Name (A - Z)', 'Name (Z - A)']
  for (const option of options) {
    expect(await homePage.sortOptionsDisplayed(option)).toBe(true);
  }
})

test('@UI Verify the correct language options are displayed in its dropdown', async () => {
  const options = ['DE', 'EN', 'ES', 'FR', 'NL', 'TR']
  for (const option of options) {
    expect(await homePage.languageBtnVisible(option)).toBe(true);
  }
})

test('@UI Verify all correct menu items are displayed in the upper right corner', async () => {
  const options = ['Home', 'Categories', 'Contact', 'Sign in']
  for (const option of options) {
    expect(await homePage.mainMenuItemsVisible(option)).toBe(true);
  }
})

test('@UI Verify all the correct options are available under Categories', async () => {
  const options = ['Hand Tools', 'Power Tools', 'Other', 'Special Tools', 'Rentals']
  for (const option of options) {
    expect(await homePage.categoryOptionsVisible(option)).toBe(true);
  }
})

test('@UI Verify a message is displayed for items not found', async() => {
  await homePage.checkboxGrinder()
  const noProductsMessage = await homePage.getNoProductsFound()
  expect(noProductsMessage).toBe(messages.home.noProductsFound)
})

test('@UI Verify Out of stock is displayed for an item', async () => {
  await homePage.waitForOutOfStock()
  const outOfStockMessage = await homePage.getOutOfStock()
  expect(outOfStockMessage).toBe(messages.home.outOfStock)
})

test('@UI Verify page navigation via the left and right arrows is functional', async () => {
  await homePage.clickNextPage()
  await homePage.clickPreviousPage()
})

test('@UI Verify page navigation via pagination is functional', async () => {
  await homePage.clickPaginationPages()
})

test('@Functional Verify the price slider is functional', async () => {
  await homePage.adjustLeftHandle(50) // Move left handle by 50px
  await homePage.adjustRightHandle(-30) // Move right handle by 30px

  // Validate the slider values
  const leftValue = await homePage.getLeftHandleValue()
  const rightValue = await homePage.getRightHandleValue()
  console.log(`Left Handle Value: ${leftValue}, Right Handle Value: ${rightValue}`)
})

test('@Functional Verify an item can be searched via the search field with pressing Enter', async() => {
  await homePage.enterTextInSearchField('Hammer')
  await homePage.pressEnterKeyOnSearchField()
  expect(await homePage.searchCaptionDisplayed('Searched for: hammer')).toBe(true, 'Searched for: hammer should be displayed')
})

test('@Functional Verify an item can be searched via the search field with the Search button', async() => {
  await homePage.enterTextInSearchField('Pliers')
  await homePage.searchButtonClick()
  expect(await homePage.searchCaptionDisplayed('Searched for: pliers')).toBe(true, 'Searched for: pliers should be displayed')
})

test('@Functional Verify an item search can be canceled with the X button', async() => {
  await homePage.enterTextInSearchField('Pliers')
  await homePage.xButtonClick()
  expect(await homePage.isSearchFieldEmpty()).toBe(true, 'Search field should be empty')
})
