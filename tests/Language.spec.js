const { test, expect } = require ('@playwright/test')
const { baseURL } = require ('../playwright.config')
const { Language } = require ('../pages/LanguagePage')

let language

test.beforeEach(async ({ page }) => { 
  await page.goto(baseURL)
  language = new Language(page)
})

test('@UI Verify the correct languages are displayed in the language dropdown', async () => {
  const options = ['DE', 'EN', 'ES', 'FR', 'NL', 'TR']
  for (const option of options) {
    expect(await language.languageOptionsVisible(option)).toBe(true);
  }
})