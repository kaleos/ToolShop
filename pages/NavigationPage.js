const { expect } = require ('@playwright/test')
const { contactURL, loginURL, baseURL } = require('../playwright.config')

class Navigation {
  constructor(page) {
    this.page = page;
    this.locators = {     
      //#region Navigation locators
      contactBtn: '//a[contains(text(),"Contact")]',
      signInBtn: '//a[contains(text(),"Sign in")]',
      homeBtn: '//a[contains(text(),"Home")]'
      //#endregion
    }
  }

  async tabNavigation(tab) {
    let expectedURL
    switch(tab) {
      case 'Contact':
        await this.page.click(this.locators.contactBtn)
        expectedURL = contactURL
        break;
      case 'Sign in':
        await this.page.click(this.locators.signInBtn)
        expectedURL = loginURL
        break;
      case 'Home':
        await this.page.click(this.locators.homeBtn)
        expectedURL = baseURL
        break;
      default:
        throw new Error(`No locator defined for tab: ${tab}`)
    }
    await this.page.waitForURL(expectedURL)
    return true
  }
}

module.exports = { Navigation }