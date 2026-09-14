import { expect, Page } from '@playwright/test'

export class ItemSelectionPage {
  page: Page
  locators: Record<string, string>

  constructor(page: Page) {
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
      quantityInput: '//input[@id="quantity-input"]',

      //#region Message locators
      messageAddedToCart: '//div[@aria-label="Product added to shopping cart."]',
      messageAddedToFavorites: '//div[@aria-label="Product added to your favorites list."]'
      //#endregion
    }
  }

  async enterQuantity(): Promise<void> {
    await this.page.fill(this.locators.quantityInput, '3')
  }

  async addCombinationPliers(): Promise<void> {
    await this.page.click(this.locators.combinationPliers)
  }

  async addBoltCutters(): Promise<void> {
    await this.page.click(this.locators.boltCutters)
  }

  async clickHomeBtn(): Promise<void> {
    await this.page.click(this.locators.homeBtn)
  }

  async clickAddToCart(): Promise<void> {
    await this.page.click(this.locators.addToCartBtn)
    await expect(this.page.locator(this.locators.messageAddedToCart)).toHaveText(
      /Product added to shopping cart/
    )
  }

  async clickAddToFavorites(): Promise<void> {
    await this.page.click(this.locators.addToFavorites)
    await expect(this.page.locator(this.locators.messageAddedToFavorites)).toHaveText(
      /Product added to your favorites list/
    )
  }

  async increaseQuantity(): Promise<void> {
    await this.page.click(this.locators.increaseQtyBtn)
  }

  async productAddedPopup(): Promise<string | null> {
    return await this.page.textContent(this.locators.productAdded)
  }

  async favoriteAddedPopup(): Promise<string | null> {
    return await this.page.textContent(this.locators.favoritesAdded)
  }
}
