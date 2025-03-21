const { expect } = require ('@playwright/test')

class Language {
  constructor(page) {
    this.page = page

    this.languageBtn = '//button[@id="language"]'
  }

  async languageOptionsVisible() {
    return await this.page.isVisible(this.languageBtn)
  }
}

module.exports = { Language }