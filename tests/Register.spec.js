const { test, expect } = require('@playwright/test')
const { RegisterPage } = require('../pages/RegisterPage')
const { registrationURL } = require('../playwright.config')
const { generateRandomUserData } = require('../utils/randomDataGenerator')

let goToPage
let registerPage

test.beforeEach(async ({ page }) => { 
  goToPage = await page.goto(registrationURL)
  await page.waitForLoadState('networkidle')
  registerPage = new RegisterPage(page)
})

test('@UI Verify an error message is displayed when required fields are not filled in', async () => {
  await registerPage.clickRegisterButton()
  await registerPage.requiredFieldMessagesVisible()
})

test('@Functional Verify a new user can be registered', async () => {
  const userData = generateRandomUserData()
  await registerPage.register(
    userData.firstName,
    userData.lastName,
    userData.dateOfBirth,
    userData.street,
    userData.postalCode,
    userData.city,
    userData.state,
    userData.country,
    userData.phone,
    userData.email,
    userData.password
  )
})

test('@UI Verify the header "Customer Registration" is visible', async () => {
  expect(await registerPage.customerRegisterHeaderVisible()).toBe(true, 'Customer registration')
})

test('@UI Verify the different password strengths are visible', async () => {
  const options = ['Weak', 'Moderate', 'Strong', 'Very Strong', 'Excellent']
  for (const option of options) {
    expect(await registerPage.passwordStrengthOptionsVisible(option)).toBe(true)
  }
  
})

test('@UI Verify all correct labels are displayed for the input fields', async () => {
  expect(await registerPage.fieldLabelsDisplayed('First Name')).toBe(true, 'First Name should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Last Name')).toBe(true, 'Last Name should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Date Of Birth')).toBe(true, 'Date Of Birth should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Street')).toBe(true, 'Street should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Postal Code')).toBe(true, 'Postal Code should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('City')).toBe(true, 'City should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('State')).toBe(true, 'State should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Country')).toBe(true, 'Country should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Phone')).toBe(true, 'Phone should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Email Address')).toBe(true, 'Email Address should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Password')).toBe(true, 'Password should be displayed')
  expect(await registerPage.fieldLabelsDisplayed('Password Strength')).toBe(true, 'Password Strength should be displayed')
})

test('@Functional Verify the hide/show toggle password is working', async () => {
  await registerPage.enterPassword('password157')

  // Check initial type is 'password'
  let typeBefore = await registerPage.getPasswordInputType()
  expect(typeBefore).toBe('password')

  // Click the hide/show toggle button to reveal password
  await registerPage.clickHideShowPassword()
  
  // Check type has switched to 'text'
  let typeAfter = await registerPage.getPasswordInputType()
  expect(typeAfter).toBe('text')
})