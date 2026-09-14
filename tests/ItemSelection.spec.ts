import { test, expect } from '@playwright/test'
import { loginFixtures } from '../fixtures/loginFixtures'
import config from '../playwright.config'
import { ItemSelectionPage } from '../pages/ItemSelectionPage'

const extendedTest = loginFixtures

let itemSelectionPage: ItemSelectionPage

extendedTest.beforeEach(async ({ page, loginPage, validCredentials }) => {
  await page.goto(config.baseURL)
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
  itemSelectionPage = new ItemSelectionPage(page)
  // 'networkidle' is unreliable against a live third-party site; wait for
  // the account menu instead, which only renders once login has completed.
  await page.locator('//*[@id="menu"]').waitFor({ state: 'visible' })
})

extendedTest('@Functional Verify an item can be added to the cart successfully', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
})

extendedTest('@Functional Verify an item can be added to the favorites successfully', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToFavorites()
})

extendedTest('@Functional Verify increasing the quantity of an item with + is successful', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.increaseQuantity()
  await itemSelectionPage.clickAddToCart()
})

extendedTest('@Functional Verify increasing the quantity of an item by entering a number is successful', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.enterQuantity()
  await itemSelectionPage.clickAddToCart()
})
