import { test, expect, Page } from '@playwright/test'
import config from '../playwright.config'
import { Language } from '../pages/LanguagePage'

let language: Language

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(config.baseURL)
  language = new Language(page)
})

test('@UI Verify the correct languages are displayed in the language dropdown', async () => {
  expect(await language.languageOptionsVisible()).toBe(true)
})
