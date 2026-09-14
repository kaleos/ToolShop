import { expect, Page } from '@playwright/test'

interface CategoriesConfig {
  handToolsURL: string
  powerToolsURL: string
  otherURL: string
  specialToolsURL: string
  rentalsURL: string
}

export class Categories {
  page: Page
  locators: Record<string, string>
  config: CategoriesConfig

  constructor(page: Page, config: CategoriesConfig) {
    this.page = page
    this.config = config

    this.locators = {
      //#region Categories locators
      categoriesBtn: '//*[contains(text(), "Categories")]'
      //#endregion
    }
  }

  async categoriesOptionsVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.categoriesBtn)
  }

  async categoriesOptionsSelect(option: string): Promise<void> {
    await this.page.click(this.locators.categoriesBtn)
    await this.page.click(`//a[contains(text(), '${option}')]`)
  }

  async isHandToolsPageDisplayed(): Promise<boolean> {
    const currentURL = await this.page.url()
    return currentURL === this.config.handToolsURL
  }

  async isPowerToolsPageDisplayed(): Promise<boolean> {
    const currentURL = await this.page.url()
    return currentURL === this.config.powerToolsURL
  }

  async isOtherPageDisplayed(): Promise<boolean> {
    const currentURL = await this.page.url()
    return currentURL === this.config.otherURL
  }

  async isSpecialToolsPageDisplayed(): Promise<boolean> {
    const currentURL = await this.page.url()
    return currentURL === this.config.specialToolsURL
  }

  async isRentalsPageDisplayed(): Promise<boolean> {
    const currentURL = await this.page.url()
    return currentURL === this.config.rentalsURL
  }
}
