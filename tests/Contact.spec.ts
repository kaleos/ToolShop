import { test, expect, Page } from '@playwright/test'
import config from '../playwright.config'
import { ContactPage } from '../pages/ContactPage'
import { generateRandomMessage } from '../utils/randomDataGenerator'

let contactPage: ContactPage

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(config.contactURL)
  contactPage = new ContactPage(page)
})

test('@UI Verify all correct labels are displayed for the input fields', async () => {
  expect(await contactPage.fieldLabelsDisplayed('First Name')).toBe(true)
  expect(await contactPage.fieldLabelsDisplayed('Last Name')).toBe(true)
  expect(await contactPage.fieldLabelsDisplayed('Email Address')).toBe(true)
  expect(await contactPage.fieldLabelsDisplayed('Subject')).toBe(true)
  expect(await contactPage.fieldLabelsDisplayed('Message')).toBe(true)
  expect(await contactPage.fieldLabelsDisplayed('Attachment')).toBe(true)
})

test('@UI Verify an error message is displayed when required fields are not filled in', async () => {
  await contactPage.clickSendButton()
  await contactPage.requiredFieldMessagesVisible()
})

test('@Functional Verify creating a new message is working as intended', async () => {
  const userData = generateRandomMessage()
  await contactPage.sendMessage(userData.firstName, userData.lastName, userData.email, userData.message)
  await contactPage.successMessageVisible()
})
