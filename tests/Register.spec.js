const { test, expect } = require('@playwright/test');
const { RegisterPage } = require('../pages/RegisterPage');
const { generateRandomUserData } = require('../utils/randomDataGenerator');

test('Verify a new user can be registered', async ({ page }) => {
  const registerPage = new RegisterPage(page);
  const userData = generateRandomUserData();

  await registerPage.goTo();
  await registerPage.clickSignInBtn();
  await registerPage.clickRegisterBtn();
  await registerPage.register(
    userData.firstName,
    userData.lastName,
    userData.dateOfBirth,
    userData.address,
    userData.postalCode,
    userData.city,
    userData.state,
    userData.country,
    userData.phone,
    userData.email,
    userData.password
  );
});