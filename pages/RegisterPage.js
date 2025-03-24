const { expect } = require('@playwright/test')
const messages = require('../data/messages.json')

class RegisterPage {
  constructor(page) {
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

  async customerRegisterHeaderVisible() {
    return await this.page.isVisible(this.locators.customerRegistrationHeader)
  }

  async passwordStrengthOptionsVisible() {
    return await this.page.isVisible(this.locators.labelpasswordStrengthOptions)
  }

  // New method to get the password input's type
  async getPasswordInputType() {
    return await this.page.getAttribute(this.locators.password, 'type')
  }

  async clickHideShowPassword() {
    await this.page.click(this.locators.hideShowPassword)
  }

  async register(firstName, lastName, dateOfBirth, street, postalCode, city, state, country, phone, email, password) {
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

  async enterPassword(password) {
    await this.page.fill(this.locators.password, password)
  }

  async clickRegisterButton() {
    await this.page.click(this.locators.registerButton)
  }

  async requiredFieldMessagesVisible() {
    await expect(this.page.locator(this.locators.messageFirstName)).toHaveText(messages.register.firstName)
    await expect(this.page.locator(this.locators.messageLastName)).toHaveText(messages.register.lastName)
    await expect(this.page.locator(this.locators.messageDOB)).toHaveText(messages.register.dateOfBirth)
    await expect(this.page.locator(this.locators.messageStreet)).toHaveText(messages.register.street)
    await expect(this.page.locator(this.locators.messagePostalCode)).toHaveText(messages.register.postalCode)
    await expect(this.page.locator(this.locators.messageCity)).toHaveText(messages.register.city)
    await expect(this.page.locator(this.locators.messageState)).toHaveText(messages.register.state)
    await expect(this.page.locator(this.locators.messageCountry)).toHaveText(messages.register.country)
    await expect(this.page.locator(this.locators.messagePhone)).toHaveText(messages.register.phone)
    await expect(this.page.locator(this.locators.messageEmailAddress)).toHaveText(messages.register.emailAddress)
    await expect(this.page.locator(this.locators.messageOnePassword)).toHaveText(messages.register.password[0])
    await expect(this.page.locator(this.locators.messageTwoPassword)).toHaveText(messages.register.password[1])
    await expect(this.page.locator(this.locators.messageThreePassword)).toHaveText(messages.register.password[2])
  }

  async fieldLabelsDisplayed(data) {
    let isVisible
    switch (data) {
        case 'First Name':
            isVisible = await this.page.isVisible(this.locators.labelFirstName)
            break
        case 'Last Name':
            isVisible = await this.page.isVisible(this.locators.labelLastName)
            break
        case 'Date Of Birth':
            isVisible = await this.page.isVisible(this.locators.labelDOB)
            break
        case 'Street':
            isVisible = await this.page.isVisible(this.locators.labelStreet)
            break
        case 'Postal Code':
            isVisible = await this.page.isVisible(this.locators.labelPostalCode)
            break
        case 'City':
            isVisible = await this.page.isVisible(this.locators.labelCity)
            break
        case 'State':
            isVisible = await this.page.isVisible(this.locators.labelState)
            break
        case 'Country':
            isVisible = await this.page.isVisible(this.locators.labelCountry)
            break
        case 'Phone':
            isVisible = await this.page.isVisible(this.locators.labelPhone)
            break
        case 'Email Address':
            isVisible = await this.page.isVisible(this.locators.labelEmailAddress)
            break
        case 'Password':
            isVisible = await this.page.isVisible(this.locators.labelPassword)
            break
        case 'Password Strength':
            isVisible = await this.page.isVisible(this.locators.labelPasswordStrength)
            break
        default:
            isVisible = false
    }
    return isVisible
  }
}

module.exports = { RegisterPage }