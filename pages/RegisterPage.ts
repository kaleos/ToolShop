import { expect, Page } from '@playwright/test'

export class RegisterPage {
  page: Page
  locators: Record<string, string>

  constructor(page: Page) {
    this.page = page

    this.locators = {
      //#region Field locators
      customerRegistrationHeader: '//*[text()="Customer registration"]',
      firstName: "//input[@id='first_name']",
      lastName: "//input[@id='last_name']",
      dateOfBirth: '//input[@id="dob"]',
      street: '//input[@id="street"]',
      postalCode: '//input[@id="postal_code"]',
      city: '//input[@id="city"]',
      state: '//input[@id="state"]',
      country: '//select[@id="country"]',
      phone: '//input[@id="phone"]',
      email: '//input[@id="email"]',
      password: '//input[@id="password"]',
      hideShowPassword: '//button[@class="btn btn-outline-secondary"]//fa-icon[@class="ng-fa-icon"]',
      registerButton: '//button[contains(text(),"Register")]',
      //#endregion

      //#region Required field message locators
      messageFirstName: '//*[text()=" First name is required "]',
      messageLastName: '//*[text()=" fields.last-name.required "]',
      messageDOB: '//*[text()=" Date of Birth is required "]',
      messageStreet: '//*[text()=" Street is required "]',
      messagePostalCode: '//*[text()=" Postcode is required "]',
      messageCity: '//*[text()=" City is required "]',
      messageState: '//*[text()=" State is required "]',
      messageCountry: '//*[text()=" Country is required "]',
      messagePhone: '//*[text()=" Phone is required. "]',
      messageEmailAddress: '//*[text()=" Email is required "]',
      messageOnePassword: '//*[text()=" Password is required "]',
      messageTwoPassword: '//*[text()=" Password must be minimal 6 characters long. "]',
      messageThreePassword: '//*[text()=" Password can not include invalid characters. "]',
      //#endregion

      //#region Label locators
      labelFirstName: '//*[text()="First name"]',
      labelLastName: '//*[text()="Last name"]',
      labelDOB: '//*[text()="Date of Birth *"]',
      labelStreet: '//*[text()="Street"]',
      labelPostalCode: '//*[text()="Postal code"]',
      labelCity: '//*[text()="City"]',
      labelState: '//*[text()="State"]',
      labelCountry: '//*[text()="Country"]',
      labelPhone: '//*[text()="Phone"]',
      labelEmailAddress: '//*[text()="Email address"]',
      labelPassword: '//*[text()="Password"]',
      labelPasswordStrength: '//*[text()=" Password strength: "]',
      labelpasswordStrengthOptions: '//div[@class="strength-labels"]'
      //#endregion
    }
  }

  async customerRegisterHeaderVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.customerRegistrationHeader)
  }

  async passwordStrengthOptionsVisible(): Promise<boolean> {
    return await this.page.isVisible(this.locators.labelpasswordStrengthOptions)
  }

  async getPasswordInputType(): Promise<string | null> {
    return await this.page.getAttribute(this.locators.password, 'type')
  }

  async clickHideShowPassword(): Promise<void> {
    await this.page.click(this.locators.hideShowPassword)
  }

  async register(
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    street: string,
    postalCode: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.page.fill(this.locators.firstName, firstName)
    await this.page.fill(this.locators.lastName, lastName)
    await this.page.fill(this.locators.dateOfBirth, dateOfBirth)
    await this.page.fill(this.locators.street, street)
    await this.page.fill(this.locators.postalCode, postalCode)
    await this.page.fill(this.locators.city, city)
    await this.page.fill(this.locators.state, state)
    await this.page.selectOption(this.locators.country, country)
    await this.page.fill(this.locators.phone, phone)
    await this.page.fill(this.locators.email, email)
    await this.page.fill(this.locators.password, password)
    await this.page.click(this.locators.registerButton)
  }

  async enterPassword(password: string): Promise<void> {
    await this.page.fill(this.locators.password, password)
  }

  async clickRegisterButton(): Promise<void> {
    await this.page.click(this.locators.registerButton)
  }

  async requiredFieldMessagesVisible(): Promise<void> {
    await expect(this.page.locator(this.locators.messageFirstName)).toBeVisible()
    await expect(this.page.locator(this.locators.messageLastName)).toBeVisible()
    await expect(this.page.locator(this.locators.messageDOB)).toBeVisible()
    await expect(this.page.locator(this.locators.messageStreet)).toBeVisible()
    await expect(this.page.locator(this.locators.messagePostalCode)).toBeVisible()
    await expect(this.page.locator(this.locators.messageCity)).toBeVisible()
    await expect(this.page.locator(this.locators.messageState)).toBeVisible()
    await expect(this.page.locator(this.locators.messageCountry)).toBeVisible()
    await expect(this.page.locator(this.locators.messagePhone)).toBeVisible()
    await expect(this.page.locator(this.locators.messageEmailAddress)).toBeVisible()
    await expect(this.page.locator(this.locators.messageOnePassword)).toBeVisible()
  }

  async fieldLabelsDisplayed(data: string): Promise<boolean> {
    const labelLocators: Record<string, string> = {
      'First Name': this.locators.labelFirstName,
      'Last Name': this.locators.labelLastName,
      'Date of Birth *': this.locators.labelDOB,
      'Street': this.locators.labelStreet,
      'Postal code': this.locators.labelPostalCode,
      'City': this.locators.labelCity,
      'State': this.locators.labelState,
      'Country': this.locators.labelCountry,
      'Phone': this.locators.labelPhone,
      'Email address': this.locators.labelEmailAddress,
      'Password': this.locators.labelPassword
    }
    const locator = labelLocators[data]
    if (locator) {
      return await this.page.isVisible(locator)
    }
    return false
  }
}
