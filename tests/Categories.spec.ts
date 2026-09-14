import { test, expect, Page } from '@playwright/test'
import config from '../playwright.config'
import { Categories } from '../pages/CategoriesPage'

let categories: Categories

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(config.baseURL)
  categories = new Categories(page, {
    handToolsURL: config.handToolsURL,
    powerToolsURL: config.powerToolsURL,
    otherURL: config.otherURL,
    specialToolsURL: config.specialToolsURL,
    rentalsURL: config.rentalsURL
  })
})

test('@UI Verify the correct categories are displayed in the categories dropdown', async () => {
  expect(await categories.categoriesOptionsVisible()).toBe(true)
})

test('@Functional Verify selecting each category opens the correct page', async () => {
  const options = ['Hand Tools', 'Power Tools', 'Other', 'Special Tools', 'Rentals']
  const verifications: Record<
    string,
    () => Promise<void>
  > = {
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
