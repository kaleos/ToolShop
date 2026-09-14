import { expect, Page } from '@playwright/test'

export class CartPage {
  page: Page
  locators: Record<string, string>

  constructor(page: Page) {
    this.page = page

    this.locators = {
      cartIcon: '//a[@aria-label="cart"]',
      quantityInput: '//input[@id="quantity"]',
      xButtonDelete: '//a[@class="btn btn-danger"]',
      messageDeleteConfirmation: '//div[@aria-label="Product deleted."]',
      checkoutBtn1: '//button[contains(text(), "Proceed")]',
      checkoutBtn2: '//button[contains(text(), "Proceed")]',
      checkoutBtn3: '//button[contains(text(), "Proceed")]',
      paymentMethod: '//select[@id="payment-method"]',
      confirmBtn1: '//button[contains(text(), "Confirm")]',
      confirmBtn2: '//button[contains(text(), "Confirm")]',

      //#region Label locators
      labelCart: '//*[text()="Cart"]',
      labelSignIn: '(//*[text()="Sign in"])[1]',
      labelBillingAddress: '(//*[text()="Billing Address"])[1]',
      labelPayment: '(//*[text()="Payment"])[1]',
      //#endregion

      //#region Message locators
      messagePaymentSuccessful: '//div[contains(text(), "Payment successful")]',
      messageThankYouForOrder: '//div[@id="order-confirmation"]'
      //#endregion
    }
  }

  async clickCartIcon(): Promise<void> {
    await this.page.click(this.locators.cartIcon)
  }

  async checkoutBtn1(): Promise<void> {
    await this.page.click(this.locators.checkoutBtn1)
  }

  async checkoutBtn2(): Promise<void> {
    await this.page.click(this.locators.checkoutBtn2)
  }

  async checkoutBtn3(): Promise<void> {
    await this.page.click(this.locators.checkoutBtn3)
  }

  async confirmBtn1(): Promise<void> {
    await this.page.click(this.locators.confirmBtn1)
    await expect(this.page.locator(this.locators.messagePaymentSuccessful)).toHaveText(
      /Payment successful/
    )
  }

  async confirmBtn2(): Promise<void> {
    await this.page.click(this.locators.confirmBtn2)
    await expect(this.page.locator(this.locators.messageThankYouForOrder)).toHaveText(
      /Thanks for your order! Your invoice number is.*/
    )
  }

  async clickXDelete(): Promise<void> {
    await this.page.click(this.locators.xButtonDelete)
    await expect(this.page.locator(this.locators.messageDeleteConfirmation)).toHaveText(
      /Product deleted/
    )
  }

  async enterQuantity(): Promise<void> {
    await this.page.fill(this.locators.quantityInput, '')
    await this.page.fill(this.locators.quantityInput, '3')
  }

  async selectPaymentMethod(method: string): Promise<void> {
    await this.page.locator(this.locators.paymentMethod).selectOption({ label: method })
  }
}
