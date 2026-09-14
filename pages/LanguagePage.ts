import { expect, Page } from '@playwright/test'

export class Language {
  page: Page
  locators: Record<string, string>

  constructor(page: Page) {
    this.page = page

    this.locators = {
      languageBtn: '//button[@id="language"]'
    }
  }

  async languageOptionsVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.languageBtn)
  }
}
