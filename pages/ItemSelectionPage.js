const { expect } = require ('@playwright/test')

class ItemSelectionPage {
  constructor(page) {
    this.page = page
    
    this.locators = {
      combinationPliers: '//*[text()=" Combination Pliers "]',
      boltCutters: '//*[text()=" Bolt Cutters "]',
      homeBtn: '//a[contains(text(),"Home")]',
      addToCartBtn: '//button[@id="btn-add-to-cart"]',
      addToFavorites: '//button[@id="btn-add-to-favorites"]',
      productAdded: '//div[@aria-label="Product added to shopping cart."]',
      favoritesAdded: '//div[@aria-label="Product added to your favorites list."]',
      increaseQtyBtn: '//button[@id="btn-increase-quantity"]',
      quantityInput: '//input[@id="quantity-input"]'
    }
  }

  async enterQuantity() {
    await this.page.fill(this.locators.quantityInput, '3')
  }

  async addCombinationPliers() {
    await this.page.click(this.locators.combinationPliers)
  }

  async addBoltCutters() {
    await this.page.click(this.locators.boltCutters)
  }

  async clickHomeBtn() {
    await this.page.click(this.locators.homeBtn)
  }

  async clickAddToCart() {
    await this.page.click(this.locators.addToCartBtn)
  }

  async clickAddToFavorites() {
    await this.page.click(this.locators.addToFavorites)
  }

  async increaseQuantity() {
    await this.page.click(this.locators.increaseQtyBtn)
  }

  async productAddedPopup() {
    return await this.page.textContent(this.locators.productAdded)
  }

  async favoriteAddedPopup() {
    return await this.page.textContent(this.locators.favoritesAdded)
  }
}

module.exports = { ItemSelectionPage }