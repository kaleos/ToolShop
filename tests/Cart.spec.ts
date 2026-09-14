import { test, expect } from '@playwright/test'
import { loginFixtures } from '../fixtures/loginFixtures'
import config from '../playwright.config'
import { ItemSelectionPage } from '../pages/ItemSelectionPage'
import { CartPage } from '../pages/CartPage'

const extendedTest = loginFixtures

let itemSelectionPage: ItemSelectionPage
let cartPage: CartPage

extendedTest.beforeEach(async ({ page, loginPage, validCredentials }) => {
  await page.goto(config.baseURL)
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
  itemSelectionPage = new ItemSelectionPage(page)
  cartPage = new CartPage(page)
  // 'networkidle' is unreliable against a live third-party site (background
  // polling/analytics can keep it from ever going quiet); wait for the
  // account menu instead, which only renders once login has completed.
  await page.locator('//*[@id="menu"]').waitFor({ state: 'visible' })
})

extendedTest('@Functional Verify the quantity of an item can be changed from within the cart', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()
  await cartPage.enterQuantity()
})

extendedTest('@Functional Verify an item can be deleted from within the cart with X', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()
  await cartPage.clickXDelete()
})

extendedTest('@UI Verify all 4 correct labels are displayed on top of the page', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()

  await expect(cartPage.page.locator(cartPage.locators.labelCart)).toBeVisible()
  await expect(cartPage.page.locator(cartPage.locators.labelSignIn)).toBeVisible()
  await expect(cartPage.page.locator(cartPage.locators.labelBillingAddress)).toBeVisible()
  await expect(cartPage.page.locator(cartPage.locators.labelPayment)).toBeVisible()
})

extendedTest('@Functional Verify the user can make a full purchase', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()
  await cartPage.checkoutBtn1()
  await cartPage.checkoutBtn2()
  await cartPage.checkoutBtn3()
  await cartPage.selectPaymentMethod('Cash on Delivery')
  await cartPage.confirmBtn1()
  await cartPage.confirmBtn2()
})
