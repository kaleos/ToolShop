import { test, expect, Page } from '@playwright/test'
import { RegisterPage } from '../pages/RegisterPage'
import config from '../playwright.config'
import { generateRandomUserData } from '../utils/randomDataGenerator'

let registerPage: RegisterPage

test.beforeEach(async ({ page }: { page: Page }) => {
  await page.goto(config.registrationURL)
  registerPage = new RegisterPage(page)
  // 'networkidle' is unreliable against a live third-party site; wait for
  // the form header instead, which only renders once the page has loaded.
  await page.locator(registerPage.locators.customerRegistrationHeader).waitFor({ state: 'visible' })
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
    userData.houseNumber,
    userData.postalCode,
    userData.city,
    userData.state,
    userData.country,
    userData.phone,
    userData.email,
    userData.password
  )
  // A successful registration redirects to the login page
  await registerPage.page.waitForURL(/\/auth\/login/)
})

test('@UI Verify the header "Customer Registration" is visible', async () => {
  expect(await registerPage.customerRegisterHeaderVisible()).toBe(true)
})

test('@UI Verify the different password strengths are visible', async () => {
  expect(await registerPage.passwordStrengthOptionsVisible()).toBe(true)
})

test('@UI Verify all correct labels are displayed for the input fields', async () => {
  expect(await registerPage.fieldLabelsDisplayed('First Name')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Last Name')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Date of Birth *')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Street')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Postal code')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('City')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('State')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Country')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Phone')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Email address')).toBe(true)
  expect(await registerPage.fieldLabelsDisplayed('Password')).toBe(true)
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
