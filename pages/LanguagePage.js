const { expect } = require ('@playwright/test')

class Language {
  constructor(page) {
    this.page = page

    this.locators = {
      languageBtn: '//button[@id="language"]'
  }
}

  async languageOptionsVisible() {
    return await this.page.isVisible(this.locators.languageBtn)
  }
}

module.exports = { Language }