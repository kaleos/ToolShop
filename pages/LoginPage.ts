import { expect, Page } from '@playwright/test'

export class LoginPage {
  page: Page
  locators: Record<string, string>

  constructor(page: Page) {
    this.page = page

    this.locators = {
      signInBtn: '//a[contains(text(),"Sign in")]',
      email: '//input[@id="email"]',
      password: '//input[@id="password"]',
      loginButton: '//input[@value="Login"]',
      hideShowPassword: '//button[@class="btn btn-outline-secondary"]//fa-icon[@class="ng-fa-icon"]',
      forgotPasswordLink: '//a[contains(text(),"Forgot your Password?")]',
      forgotPasswordPage: '//h3[contains(text(),"Forgot Password")]',
      setNewPasswordButton: '//input[@value="Set New Password"]',
      invalidLoginMessage: '//div[contains(text(),"Invalid email or password")]',
      emptyEmailMessage: '//div[contains(text(),"Email is required")]',
      emptyPasswordMessage: '//div[contains(text(),"Password is required")]',
      labelEmailAddress: '//*[text()="Email address *"]',
      labelPassword: '//*[text()="Password *"]'
    }
  }

  async clickSignInBtn(): Promise<void> {
    await this.page.click(this.locators.signInBtn)
  }

  async login(email: string, password: string): Promise<void> {
    await this.page.fill(this.locators.email, email)
    await this.page.fill(this.locators.password, password)
    await this.page.click(this.locators.loginButton)
  }

  async getInvalidLoginMessage(): Promise<string | null> {
    return await this.page.textContent(this.locators.invalidLoginMessage)
  }

  async getRequiredFields(): Promise<{ email: string | null; password: string | null }> {
    const emailMessage = await this.page.textContent(this.locators.emptyEmailMessage)
    const passwordMessage = await this.page.textContent(this.locators.emptyPasswordMessage)
    return { email: emailMessage, password: passwordMessage }
  }

  async clickHideShowPassword(): Promise<void> {
    await this.page.click(this.locators.hideShowPassword)
  }

  async getPasswordInputType(): Promise<string | null> {
    return await this.page.getAttribute(this.locators.password, 'type')
  }

  async clickForgotPasswordLink(): Promise<void> {
    await this.page.click(this.locators.forgotPasswordLink)
  }

  async forgotPasswordPageVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.forgotPasswordPage)
  }

  async setNewPasswordButtonVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.setNewPasswordButton)
  }

  async fieldLabelsDisplayed(data: string): Promise<boolean> {
    const labelLocators: Record<string, string> = {
      'Email address *': this.locators.labelEmailAddress,
      'Password *': this.locators.labelPassword
    }
    const locator = labelLocators[data]
    if (locator) {
      await this.page.waitForSelector(locator, { state: 'visible', timeout: 5000 })
      return await this.page.isVisible(locator)
    }
    return false
  }
}
