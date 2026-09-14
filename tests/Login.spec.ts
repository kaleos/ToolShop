import { test, expect } from '@playwright/test'
import { loginFixtures } from '../fixtures/loginFixtures'

const extendedTest = loginFixtures

extendedTest('@Functional Verify a user can login with valid credentials', async ({ loginPage, validCredentials }) => {
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)
})

extendedTest('@Functional Verify a user cannot login with invalid credentials', async ({ loginPage, invalidCredentials }) => {
  await loginPage.clickSignInBtn()
  await loginPage.login(invalidCredentials.email, invalidCredentials.password)
  const errorMessage = await loginPage.getInvalidLoginMessage()
  expect(errorMessage).toContain('Invalid email or password')
})

extendedTest('@Functional Verify a user cannot login with empty credentials', async ({ loginPage, emptyCredentials }) => {
  await loginPage.clickSignInBtn()
  await loginPage.login(emptyCredentials.email, emptyCredentials.password)
  const requiredMessage = await loginPage.getRequiredFields()
  expect(requiredMessage.email).toContain('Email is required')
  expect(requiredMessage.password).toContain('Password is required')
})

extendedTest('@Functional Verify the hide/show toggle password is working', async ({ loginPage, validCredentials }) => {
  await loginPage.clickSignInBtn()
  await loginPage.login(validCredentials.email, validCredentials.password)

  // Check initial type is 'password'
  let typeBefore = await loginPage.getPasswordInputType()
  expect(typeBefore).toBe('password')

  // Click the hide/show toggle button to reveal password
  await loginPage.clickHideShowPassword()

  // Check type has switched to 'text'
  let typeAfter = await loginPage.getPasswordInputType()
  expect(typeAfter).toBe('text')
})

extendedTest('@Functional Verify Forgot Password page is displayed when clicking on Forgot your password', async ({ loginPage }) => {
  await loginPage.clickSignInBtn()
  await loginPage.clickForgotPasswordLink()
  const forgotPasswordPage = await loginPage.forgotPasswordPageVisible()
  expect(forgotPasswordPage).toBe(true)
})

extendedTest('@Functional Verify the Set New Password button is displayed when clicking on Forgot your Password?', async ({ loginPage }) => {
  await loginPage.clickSignInBtn()
  await loginPage.clickForgotPasswordLink()
  const setNewPassword = await loginPage.setNewPasswordButtonVisible()
  expect(setNewPassword).toBe(true)
})

extendedTest('@UI Verify all correct labels are displayed for the input fields', async ({ loginPage }) => {
  expect(await loginPage.fieldLabelsDisplayed('Email address *')).toBe(true)
  expect(await loginPage.fieldLabelsDisplayed('Password *')).toBe(true)
})
