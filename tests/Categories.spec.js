const { test, expect } = require ('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { Categories } = require ('../pages/CategoriesPage')

let categories

test.beforeEach(async ({ page }) => { 
  await page.goto(baseURL)
  categories = new Categories(page)
})

test('@UI Verify the correct categories are displayed in the categories dropdown', async () => {
  const options = ['Hand Tools', 'Power Tools', 'Other', 'Special Tools', 'Rentals']
  for (const option of options) {
    expect(await categories.categoriesOptionsVisible(option)).toBe(true);
  }
})

test('@Functional Verify selecting each category opens the correct page', async () => {
  const options = ['Hand Tools', 'Power Tools', 'Other', 'Special Tools', 'Rentals']
  const verifications = {
    'Hand Tools': async () => expect(await categories.isHandToolsPageDisplayed()).toBe(true),
    'Power Tools': async () => expect(await categories.isPowerToolsPageDisplayed()).toBe(true),
    'Other': async () => expect(await categories.isOtherPageDisplayed()).toBe(true),
    'Special Tools': async () => expect(await categories.isSpecialToolsPageDisplayed()).toBe(true),
    'Rentals': async () => expect(await categories.isRentalsPageDisplayed()).toBe(true)
  }
  for (const option of options) {
    await categories.categoriesOptionsSelect(option)
    await verifications[option]()
  }
})