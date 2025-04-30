const { expect } = require ('@playwright/test')
const messages = require('../data/messages.json')

class CartPage {
  constructor(page) {
    this.page = page
    
    this.locators = {

      cartIcon: '//a[@aria-label="cart"]',
      quantityInput: '//input[@data-test="product-quantity"]',
      xButtonDelete: '//a[@class="btn btn-danger"]',
      messageDeleteConfirmation: '//div[@aria-label="Product deleted."]',
      checkoutBtn1: '//button[@data-test="proceed-1"]',
      checkoutBtn2: '//button[@data-test="proceed-2"]',
      checkoutBtn3: '//button[@data-test="proceed-3"]',
      paymentMethod: '//select[@id="payment-method"]',
      confirmBtn1: '//*[text()=" Confirm "]',
      confirmBtn2: '//*[text()=" Confirm "]',

      //#region Label locators
      labelCart: '//*[text()="Cart"]',
      labelSignIn: '(//*[text()="Sign in"])[2]',
      labelBillingAddress: '(//*[text()="Billing Address"])[1]',
      labelPayment: '(//*[text()="Payment"])[1]',
      //#endregion

      //#region Message locators
      messagePaymentSuccessful: '//div[@data-test="payment-success-message"]',
      messageThankYouForOrder: '//div[@id="order-confirmation"]',
      //#endregion
    }
  }

  async clickCartIcon() {
    await this.page.click(this.locators.cartIcon)
  }

  async checkoutBtn1() {
    await this.page.click(this.locators.checkoutBtn1)
  }

  async checkoutBtn2() {
    await this.page.click(this.locators.checkoutBtn2)
  }

  async checkoutBtn3() {
    await this.page.click(this.locators.checkoutBtn3)
  }

  async confirmBtn1() {
    await this.page.click(this.locators.confirmBtn1)
    await expect(this.page.locator(this.locators.messagePaymentSuccessful)).toHaveText(messages.product.successfulPayment)
  }

  async confirmBtn2() {
    await this.page.click(this.locators.confirmBtn2)
    await expect(this.page.locator(this.locators.messageThankYouForOrder)).toHaveText(/Thanks for your order! Your invoice number is.*/);
  }

  async clickXDelete() {
    await this.page.click(this.locators.xButtonDelete)
    await expect(this.page.locator(this.locators.messageDeleteConfirmation)).toHaveText(messages.product.productDeleted)
  }

  async enterQuantity() {
    await this.page.fill(this.locators.quantityInput, '')
    await this.page.fill(this.locators.quantityInput, '3')
  }

  async selectPaymentMethod(method) {
    await this.page.locator(this.locators.paymentMethod).selectOption({ label: method });
  }

}

module.exports = { CartPage }

