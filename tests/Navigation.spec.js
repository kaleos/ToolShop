const { loginFixtures } = require('../fixtures/loginFixtures')
const { expect } = require('@playwright/test')
const { Navigation } = require('../pages/NavigationPage')

const test = loginFixtures

test('@UI Verify the user is able to navigate through various pages and verify URLs', async ({ loginPage, validCredentials, page }) => {
  await loginPage.clickSignInBtn();
  await loginPage.login(validCredentials.email, validCredentials.password)

  const navigation = new Navigation(page)
  const tabs = ['My account', 'My favorites', 'My profile', 'My invoices', 'My messages', 'Contact', 'Home']
  for (const tab of tabs) {
    const expectedURL = await navigation.tabNavigation(tab)
    expect(page.url()).toMatch(new RegExp(`^${expectedURL.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\$&')}/?$`))
  }
})