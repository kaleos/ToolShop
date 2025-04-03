const base = require('@playwright/test')
const { LoginPage } = require('../pages/LoginPage')
const { loginURL } = require('../playwright.config')

exports.loginFixtures = base.test.extend({
  loginPage: async ({ page }, use) => {
    await page.goto(loginURL)
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  validCredentials: {
    email: "test4545@email.com",
    password: "Weksitef489()",
  },
  invalidCredentials: {
    email: "invalid@email.com",
    password: "wrongpassword",
  },
  emptyCredentials: {
    email: "",
    password: "",
  },
})
