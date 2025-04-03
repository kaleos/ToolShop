const { expect } = require('@playwright/test')
const { contactURL, myAccountURL, myFavoritesURL, myProfileURL, myInvoicesURL, myMessagesURL, baseURL } = require('../playwright.config')

class NavigationPage {
  constructor(page) {
    this.page = page;
    // Assign URLs to instance config for use in tabNavigation
    this.config = { contactURL, myAccountURL, myFavoritesURL, myProfileURL, myInvoicesURL, myMessagesURL, baseURL }
    this.locators = {   

      //#region Navigation locators
      contactBtn: '//a[contains(text(),"Contact")]',
      homeBtn: '//a[contains(text(),"Home")]',
      //#endregion
      
      //#region Account dropdown locators
      menuBtn: '//a[@id="menu"]',
      myAccountOption: '//a[contains(text(),"My account")]',
      myFavoritesOption: '//a[contains(text(),"My favorites")]',
      myProfileOption: '//a[contains(text(),"My profile")]',
      myInvoicesOption: '//a[contains(text(),"My invoices")]',
      myMessagesOption: '//a[contains(text(),"My messages")]',
      //#endregion

      //#region Left container locators
      favorites: '//a[@routerlink="favorites"]',
      profile: '//a[@routerlink="profile"]',
      invoices: '//a[@routerlink="invoices"]',
      messages: '//a[@routerlink="messages"]'
    }
  }

  async tabNavigation(tab) {
    let expectedURL
    switch(tab) {
      case 'My account':
        await this.page.click(this.locators.menuBtn)
        await this.page.click(this.locators.myAccountOption)
        expectedURL = this.config.myAccountURL
        break
      case 'My favorites':
        await this.page.click(this.locators.menuBtn)
        await this.page.click(this.locators.myFavoritesOption)
        expectedURL = this.config.myFavoritesURL
        break
      case 'My profile':
        await this.page.click(this.locators.menuBtn)
        await this.page.click(this.locators.myProfileOption)
        expectedURL = this.config.myProfileURL
        break
      case 'My invoices':
        await this.page.click(this.locators.menuBtn)
        await this.page.click(this.locators.myInvoicesOption)
        expectedURL = this.config.myInvoicesURL
        break
      case 'My messages':
        await this.page.click(this.locators.menuBtn)
        await this.page.click(this.locators.myMessagesOption)
        expectedURL = this.config.myMessagesURL
        break
      case 'Contact':
        await this.page.click(this.locators.contactBtn)
        expectedURL = this.config.contactURL
        break
      case 'Home':
        await this.page.click(this.locators.homeBtn)
        expectedURL = this.config.baseURL
        break
      default:
        throw new Error(`No locator defined for tab: ${tab}`)
    }
    // Use a regex to allow for an optional trailing slash
    await this.page.waitForURL(new RegExp(`^${expectedURL.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}/?$`))
    // Return the expected URL for further verification
    return expectedURL
  }

  async containerNavigationVisible(section) {
    let isVisible
    switch(section) {
      case 'Favorites':
        isVisible = await this.page.isVisible(this.locators.favorites)
        break
      case 'Profile':
        isVisible = await this.page.isVisible(this.locators.profile)
        break
      case 'Invoices':
        isVisible = await this.page.isVisible(this.locators.invoices)
        break
      case 'Messages':
        isVisible = await this.page.isVisible(this.locators.messages)
        break
      default:
        isVisible = false
    }
    return isVisible
  }
}

module.exports = { NavigationPage }