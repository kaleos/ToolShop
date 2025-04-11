const { expect } = require ('@playwright/test')

class CartPage {
  constructor(page) {
    this.page = page
    
    this.locators = {

      cartIcon: '//a[@aria-label="cart"]',
      quantityInput: '//input[@data-test="product-quantity"]',
      xButtonDelete: '//a[@class="btn btn-danger"]',
      
    }
  }

  async clickCartIcon() {
    await this.page.click(this.locators.cartIcon)
  }

  async clickXDelete() {
    await this.page.click(this.locators.xButtonDelete)
  }

  async enterQuantity() {
    await this.page.fill(this.locators.quantityInput, '')
    await this.page.fill(this.locators.quantityInput, '3')
  }

}

module.exports = { CartPage }