const { test, expect } = require ('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { Categories } = require ('../pages/CategoriesPage')

let goToPage
let categories

test.beforeEach(async ({ page }) => { 
  goToPage = await page.goto(baseURL)
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
  for (const option of options) {
    await categories.categoriesOptionsSelect(option)
    if (option === 'Hand Tools') {
      expect(await categories.isHandToolsPageDisplayed()).toBe(true)
    } else if (option === 'Power Tools') {
      expect(await categories.isPowerToolsPageDisplayed()).toBe(true)
    } else if (option === 'Other') {
      expect(await categories.isOtherPageDisplayed()).toBe(true)
    } else if (option === 'Special Tools') {
      expect(await categories.isSpecialToolsPageDisplayed()).toBe(true)
    } else if (option === 'Rentals') {
      expect(await categories.isRentalsPageDisplayed()).toBe(true)
    }
  }
})