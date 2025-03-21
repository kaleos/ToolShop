const { expect } = require('@playwright/test')

class LoginPage {
  constructor(page) {
    this.page = page

    this.signInBtn = '//a[contains(text(),"Sign in")]'
    this.email = '//input[@id="email"]'
    this.password = '//input[@id="password"]'
    this.loginButton = '//input[@value="Login"]'
    this.hideShowPassword = '//button[@class="btn btn-outline-secondary"]//fa-icon[@class="ng-fa-icon"]'
    this.forgotPasswordLink = '//a[contains(text(),"Forgot your Password?")]'
    this.forgotPasswordPage = '//h3[contains(text(),"Forgot Password")]'
    this.setNewPasswordButton = '//input[@value="Set New Password"]'

    //#region Required field message locators
    this.invalidLoginMessage = '//div[contains(text(),"Invalid email or password")]'
    this.emptyEmailMessage = '//div[contains(text(),"Email is required")]'
    this.emptyPasswordMessage = '//div[contains(text(),"Password is required")]'
    //#endregion
    
    //#region Label locators
    this.labelEmailAddress = '//*[text()="Email address *"]'
    this.labelPassword = '//*[text()="Password *"]'
    //#endregion
  }

  async clickSignInBtn() {
    await this.page.click(this.signInBtn)
  }

  async login(email, password) {
    await this.page.fill(this.email, email)
    await this.page.fill(this.password, password)
    await this.page.click(this.loginButton)
  }

  async getInvalidLoginMessage() {
    return await this.page.textContent(this.invalidLoginMessage)
  }

  async getRequiredFields() {
    const emailMessage = await this.page.textContent(this.emptyEmailMessage)
    const passwordMessage = await this.page.textContent(this.emptyPasswordMessage)
    return { email: emailMessage, password: passwordMessage }
  }

  async clickHideShowPassword() {
    await this.page.click(this.hideShowPassword)
  }

  // New method to get the password input's type
  async getPasswordInputType() {
    return await this.page.getAttribute(this.password, 'type')
  }

  async clickForgotPasswordLink() {
    await this.page.click(this.forgotPasswordLink)
  }

  async forgotPasswordPageVisible() {
    return await this.page.isVisible(this.forgotPasswordPage)
  }

  async setNewPasswordButtonVisible() {
    return await this.page.isVisible(this.setNewPasswordButton)
  }

  async fieldLabelsDisplayed(data) {
    const locators = {
      'Email address *': this.labelEmailAddress,
      'Password *': this.labelPassword
    }
    const locator = locators[data]
    if (locator) {
      await this.page.waitForSelector(locator, { state: 'visible', timeout: 5000 })
      return await this.page.isVisible(locator)
    }
    return false
  }
}

module.exports = { LoginPage }