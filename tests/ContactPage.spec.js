const { test, expect } = require('@playwright/test')
const { contactURL } = require('../playwright.config')
const { ContactPage } = require('../pages/ContactPage')
const { generateRandomMessage } = require('../utils/randomDataGenerator')

let gotToPage
let contactPage

test.beforeEach(async ({ page }) => { 
  gotToPage = await page.goto(contactURL)
  contactPage = new ContactPage(page)
});

test('@UI Verify all correct labels are displayed for the input fields', async () => {
  expect(await contactPage.fieldLabelsDisplayed('First Name')).toBe(true, 'First Name should be displayed')
  expect(await contactPage.fieldLabelsDisplayed('Last Name')).toBe(true, 'Last Name should be displayed')
  expect(await contactPage.fieldLabelsDisplayed('Email Address')).toBe(true, 'Email Address should be displayed')
  expect(await contactPage.fieldLabelsDisplayed('Subject')).toBe(true, 'Subject should be displayed')
  expect(await contactPage.fieldLabelsDisplayed('Message')).toBe(true, 'Message Code should be displayed')
  expect(await contactPage.fieldLabelsDisplayed('Attachment')).toBe(true, 'Attachment should be displayed')
})

test('@UI Verify an error message is displayed when required fields are not filled in', async () => {
  await contactPage.clickSendButton()
  await contactPage.requiredFieldMessagesVisible()
})

test('@Functional Verify creating a new message is working as intended', async () => {
  const userData = generateRandomMessage()
  await contactPage.sendMessage(
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.message
  )
  await contactPage.successMessageVisible()
})