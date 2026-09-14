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
  await page.waitForLoadState('networkidle')
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
