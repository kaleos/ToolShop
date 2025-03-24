const { expect } = require ('@playwright/test')
const { handToolsURL } = require('../playwright.config')
const { powerToolsURL } = require('../playwright.config')
const { otherURL } = require('../playwright.config')
const { specialToolsURL } = require('../playwright.config')
const { rentalsURL } = require('../playwright.config')

class Categories {
  constructor(page) {
    this.page = page

    this.locators = {
      //#region Categories locators
      categoriesBtn: '//a[@data-test="nav-categories"]'
      //#endregion
  }
}

  async categoriesOptionsVisible() {
    return await this.page.isVisible(this.locators.categoriesBtn)
  }

  async categoriesOptionsSelect(option) {
    await this.page.click(this.locators.categoriesBtn)
    await this.page.click(`//a[text()='${option}']`)
  }

  async isHandToolsPageDisplayed() {
    const currentURL = await this.page.url()
    return currentURL === handToolsURL
  }

  async isPowerToolsPageDisplayed() {
    const currentURL = await this.page.url()
    return currentURL === powerToolsURL
  }

  async isOtherPageDisplayed() {
    const currentURL = await this.page.url()
    return currentURL === otherURL
  }

  async isSpecialToolsPageDisplayed() {
    const currentURL = await this.page.url()
    return currentURL === specialToolsURL
  }

  async isRentalsPageDisplayed() {
    const currentURL = await this.page.url()
    return currentURL === rentalsURL
  }
}

module.exports = { Categories }