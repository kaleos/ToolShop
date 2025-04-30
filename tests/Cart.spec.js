const { loginFixtures } = require('../fixtures/loginFixtures')
const { expect } = require('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { ItemSelectionPage } = require ('../pages/ItemSelectionPage')
const { CartPage } = require ('../pages/CartPage')

const test = loginFixtures

let itemSelectionPage
let cartPage

test.beforeEach(async ({ page, loginPage, validCredentials }) => {
  await page.goto(baseURL)
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
  itemSelectionPage = new ItemSelectionPage(page)
  cartPage = new CartPage(page)
  await page.waitForLoadState('networkidle')
})

test('@Functional Verify the quantity of an item can be changed from within the cart', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()
  await cartPage.enterQuantity()
})

test('@Functional Verify an item can be deleted from within the cart with X', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()
  await cartPage.clickXDelete()
})

test('@UI Verify all 4 correct labels are displayed on top of the page', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  await cartPage.clickCartIcon()

  await expect(cartPage.page.locator(cartPage.locators.labelCart)).toBeVisible()
  await expect(cartPage.page.locator(cartPage.locators.labelSignIn)).toBeVisible()
  await expect(cartPage.page.locator(cartPage.locators.labelBillingAddress)).toBeVisible()
  await expect(cartPage.page.locator(cartPage.locators.labelPayment)).toBeVisible()
})

test('@Functional Verify the user can make a full purchase', async () => {
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