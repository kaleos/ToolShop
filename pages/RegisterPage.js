const { expect } = require('@playwright/test')
const messages = require('../data/messages.json')

class RegisterPage {
  constructor(page) {
    this.page = page
    //#region Field locators
    this.customerRegistrationHeader = '//*[text()="Customer registration"]',
    this.firstName = "//input[@id='first_name']",
    this.lastName = "//input[@id='last_name']",
    this.dateOfBirth = '//input[@id="dob"]',
    this.street = '//input[@id="street"]',
    this.postalCode = '//input[@id="postal_code"]',
    this.city = '//input[@id="city"]',
    this.state = '//input[@id="state"]',
    this.country = '//select[@id="country"]'
    this.phone = '//input[@id="phone"]',
    this.email = '//input[@id="email"]',
    this.password = '//input[@id="password"]',
    this.hideShowPassword = '//button[@class="btn btn-outline-secondary"]//fa-icon[@class="ng-fa-icon"]',
    this.registerButton = '//button[contains(text(),"Register")]', 
    //#endregion

    //#region Required field message locators
    this.messageFirstName = '//*[text()=" First name is required "]',
    this.messageLastName = '//*[text()=" fields.last-name.required "]',
    this.messageDOB = '//*[text()=" Date of Birth is required "]',
    this.messageStreet = '//*[text()=" Street is required "]',
    this.messagePostalCode = '//*[text()=" Postcode is required "]',
    this.messageCity = '//*[text()=" City is required "]',
    this.messageState = '//*[text()=" State is required "]',
    this.messageCountry = '//*[text()=" Country is required "]',
    this.messagePhone = '//*[text()=" Phone is required. "]',
    this.messageEmailAddress = '//*[text()=" Email is required "]',
    this.messageOnePassword = '//*[text()=" Password is required "]',
    this.messageTwoPassword = '//*[text()=" Password must be minimal 6 characters long. "]',
    this.messageThreePassword = '//*[text()=" Password can not include invalid characters. "]',
    //#endregion

    //#region Label locators
    this.labelFirstName = '//*[text()="First name"]',
    this.labelLastName = '//*[text()="Last name"]',
    this.labelDOB = '//*[text()="Date of Birth *"]',
    this.labelStreet = '//*[text()="Street"]',
    this.labelPostalCode = '//*[text()="Postal code"]',
    this.labelCity = '//*[text()="City"]',
    this.labelState = '//*[text()="State"]',
    this.labelCountry = '//*[text()="Country"]',
    this.labelPhone = '//*[text()="Phone"]',
    this.labelEmailAddress = '//*[text()="Email address"]',
    this.labelPassword = '//*[text()="Password"]',
    this.labelPasswordStrength = '//*[text()=" Password strength: "]',
    this.labelpasswordStrengthOptions = '//div[@class="strength-labels"]'
    //#endregion
  }

  async customerRegisterHeaderVisible() {
    return await this.page.isVisible(this.customerRegistrationHeader)
  }

  async passwordStrengthOptionsVisible() {
    return await this.page.isVisible(this.labelpasswordStrengthOptions)
  }

  // New method to get the password input's type
  async getPasswordInputType() {
    return await this.page.getAttribute(this.password, 'type')
  }

  async clickHideShowPassword() {
    await this.page.click(this.hideShowPassword)
  }

  async register(firstName, lastName, dateOfBirth, street, postalCode, city, state, country, phone, email, password) {
    await this.page.fill(this.firstName, firstName)
    await this.page.fill(this.lastName, lastName)
    await this.page.fill(this.dateOfBirth, dateOfBirth)
    await this.page.fill(this.street, street)
    await this.page.fill(this.postalCode, postalCode)
    await this.page.fill(this.city, city)
    await this.page.fill(this.state, state)
    await this.page.selectOption(this.country, country)
    await this.page.fill(this.phone, phone)
    await this.page.fill(this.email, email)
    await this.page.fill(this.password, password)
    await this.page.click(this.registerButton)
  }

  async enterPassword(password) {
    await this.page.fill(this.password, password)
  }

  async clickRegisterButton() {
    await this.page.click(this.registerButton)
  }

  async requiredFieldMessagesVisible() {
    await expect(this.page.locator(this.messageFirstName)).toHaveText(messages.register.firstName)
    await expect(this.page.locator(this.messageLastName)).toHaveText(messages.register.lastName)
    await expect(this.page.locator(this.messageDOB)).toHaveText(messages.register.dateOfBirth)
    await expect(this.page.locator(this.messageStreet)).toHaveText(messages.register.street)
    await expect(this.page.locator(this.messagePostalCode)).toHaveText(messages.register.postalCode)
    await expect(this.page.locator(this.messageCity)).toHaveText(messages.register.city)
    await expect(this.page.locator(this.messageState)).toHaveText(messages.register.state)
    await expect(this.page.locator(this.messageCountry)).toHaveText(messages.register.country)
    await expect(this.page.locator(this.messagePhone)).toHaveText(messages.register.phone)
    await expect(this.page.locator(this.messageEmailAddress)).toHaveText(messages.register.emailAddress)
    await expect(this.page.locator(this.messageOnePassword)).toHaveText(messages.register.password[0])
    await expect(this.page.locator(this.messageTwoPassword)).toHaveText(messages.register.password[1])
    await expect(this.page.locator(this.messageThreePassword)).toHaveText(messages.register.password[2])
  }

  async fieldLabelsDisplayed(data) {
    let isVisible
    switch (data) {
        case 'First Name':
            isVisible = await this.page.isVisible(this.labelFirstName)
            break
        case 'Last Name':
            isVisible = await this.page.isVisible(this.labelLastName)
            break
        case 'Date Of Birth':
            isVisible = await this.page.isVisible(this.labelDOB)
            break
        case 'Street':
            isVisible = await this.page.isVisible(this.labelStreet)
            break
        case 'Postal Code':
            isVisible = await this.page.isVisible(this.labelPostalCode)
            break
        case 'City':
            isVisible = await this.page.isVisible(this.labelCity)
            break
        case 'State':
            isVisible = await this.page.isVisible(this.labelState)
            break
        case 'Country':
            isVisible = await this.page.isVisible(this.labelCountry)
            break
        case 'Phone':
            isVisible = await this.page.isVisible(this.labelPhone)
            break
        case 'Email Address':
            isVisible = await this.page.isVisible(this.labelEmailAddress)
            break
        case 'Password':
            isVisible = await this.page.isVisible(this.labelPassword)
            break
        case 'Password Strength':
            isVisible = await this.page.isVisible(this.labelPasswordStrength)
            break
        default:
            isVisible = false
    }
    return isVisible
}

}

module.exports = { RegisterPage }