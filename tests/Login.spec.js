const { test, expect } = require('@playwright/test');
const { baseURL } = require('../playwright.config');
const { LoginPage } = require('../pages/LoginPage');
const { credentials } = require('../utils/DataLogin');
const messages = require('../data/messages.json');

let goToPage;
let loginPage;

test.beforeEach(async ({ page }) => { 
  goToPage = await page.goto(baseURL); 
  loginPage = new LoginPage(page);
});

credentials('Verify a user can login with valid credentials', async ({ validCredentials }) => {
  await loginPage.clickSignInBtn();
  await loginPage.login(validCredentials.email, validCredentials.password);
});

credentials('Verify a user cannot login with invalid credentials', async ({ invalidCredentials }) => {
  await loginPage.clickSignInBtn();
  await loginPage.login(invalidCredentials.email, invalidCredentials.password);
  const errorMessage = await loginPage.getInvalidLoginMessage();
  expect(errorMessage).toBe(messages.invalidEmailPassword);
});

credentials('Verify a user cannot login with empty credentials', async ({ emptyCredentials }) => {
  await loginPage.clickSignInBtn();
  await loginPage.login(emptyCredentials.email, emptyCredentials.password);
  const requiredMessage = await loginPage.getRequiredFields();
  expect(requiredMessage.email).toBe(messages.emptyEmail);
  expect(requiredMessage.password).toBe(messages.emptyPassword);
});

credentials('Verify the hide/show toggle password is working', async ({ validCredentials }) => {
  await loginPage.clickSignInBtn();
  await loginPage.login(validCredentials.email, validCredentials.password);

  // Check initial type is 'password'
  let typeBefore = await loginPage.getPasswordInputType();
  expect(typeBefore).toBe('password');

  // Click the hide/show toggle button to reveal password
  await loginPage.clickHideShowPassword();
  
  // Check type has switched to 'text'
  let typeAfter = await loginPage.getPasswordInputType();
  expect(typeAfter).toBe('text');
});

test('Verify Forgot Password page is displayed when clicking on Forgot your password', async () => {
  await loginPage.clickSignInBtn();
  await loginPage.clickForgotPasswordLink();
  const forgotPasswordPage = await loginPage.forgotPasswordPageVisible();
  expect(forgotPasswordPage).toBe(true);
});

test('Verify the Set New Password button is displayed when clicking on Forgot your Password?', async () => {
  await loginPage.clickSignInBtn();
  await loginPage.clickForgotPasswordLink();
  const setNewPassword = await loginPage.setNewPasswordButtonVisible();
  expect(setNewPassword).toBe(true);
});
