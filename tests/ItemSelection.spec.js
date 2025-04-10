const { loginFixtures } = require('../fixtures/loginFixtures')
const { expect } = require('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { ItemSelectionPage } = require ('../pages/ItemSelectionPage')

const test = loginFixtures

let itemSelectionPage

test.beforeEach(async ({ page, loginPage, validCredentials }) => {
  await page.goto(baseURL)
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
  itemSelectionPage = new ItemSelectionPage(page)
  await page.waitForLoadState('networkidle')
})

test('@Functional Verify an item can be added to the cart successfully', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToCart()
  expect(await itemSelectionPage.productAddedPopup()).toBe(' Product added to shopping cart. ', 'The product added popup should be displayed')
})

test('@Functional Verify an item can be added to the favorites successfully', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.clickAddToFavorites()
  expect(await itemSelectionPage.favoriteAddedPopup()).toBe(' Product added to your favorites list. ', 'The favorites added popup should be displayed')
})

test('@Functional Verify increasing the quantity of an item with + is successful', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.increaseQuantity()
  await itemSelectionPage.clickAddToCart()
  expect(await itemSelectionPage.productAddedPopup()).toBe(' Product added to shopping cart. ', 'The product added popup should be displayed')
})

test('@Functional Verify increasing the quantity of an item by entering a number is successful', async () => {
  await itemSelectionPage.clickHomeBtn()
  await itemSelectionPage.addCombinationPliers()
  await itemSelectionPage.enterQuantity()
  await itemSelectionPage.clickAddToCart()
  expect(await itemSelectionPage.productAddedPopup()).toBe(' Product added to shopping cart. ', 'The product added popup should be displayed')
})