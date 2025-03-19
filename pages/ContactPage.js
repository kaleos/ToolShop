const { expect } = require('@playwright/test')
const messages = require('../data/messages.json')

class ContactPage {
  constructor(page) {
    this.page = page

    //#region Field locators
    this.firstName = "//input[@id='first_name']"
    this.lastName = "//input[@id='last_name']"
    this.email = '//input[@id="email"]'
    this.subject = '//select[@id="subject"]'
    this.message = '//textarea[@id="message"]'
    this.sendBtn = '//input[@type="submit"]'
    this.attachment = '//input[@id="attachment"]'
    //#endregion

    //#region Label locators
    this.labelFirstName = '//label[@for="first_name"]'
    this.labelLastName = '//label[@for="last_name"]'
    this.labelEmailAddress = '//label[@for="email"]'
    this.labelSubject = '//label[@for="subject"]'
    this.labelMessage = '//label[@for="message"]'
    this.labelAttachment = '//label[@for="attachment"]'
    //#endregion

    //#region Required field message locators
    this.messageFirstName = '//*[text()="First name is required"]'
    this.messageLastName = '//*[text()="Last name is required"]'
    this.messageEmailAddress = '//*[text()="Email is required"]'
    this.messageSubject = '//*[text()="Subject is required"]'
    this.messageMessage = '//*[text()="Message is required"]'
    this.messageSuccess = '//div[@role="alert"]'
    //#endregion
  }

  async sendMessage(firstName, lastName, email, message) {
    await this.page.fill(this.firstName, firstName)
    await this.page.fill(this.lastName, lastName)
    await this.page.fill(this.email, email)
    await this.page.fill(this.message, message)
    // Randomly select an option from the subject dropdown
    const randomSubject = await this.page.$eval(this.subject, select => {
      const options = Array.from(select.options)
      return options[Math.floor(Math.random() * options.length)].value
    })
    await this.page.selectOption(this.subject, randomSubject)
    await this.page.click(this.sendBtn)
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
        case 'Email Address':
            isVisible = await this.page.isVisible(this.labelEmailAddress)
            break
        case 'Subject':
            isVisible = await this.page.isVisible(this.labelSubject)
            break
        case 'Message':
            isVisible = await this.page.isVisible(this.labelMessage)
            break
        case 'Attachment':
            isVisible = await this.page.isVisible(this.labelAttachment)
            break
        default:
            isVisible = false
    }
    return isVisible
  }

  async requiredFieldMessagesVisible() {
    await expect(this.page.locator(this.messageFirstName)).toHaveText(messages.contact.firstName)
    await expect(this.page.locator(this.messageLastName)).toHaveText(messages.contact.lastName)
    await expect(this.page.locator(this.messageEmailAddress)).toHaveText(messages.contact.emailAddress)
    await expect(this.page.locator(this.messageSubject)).toHaveText(messages.contact.subject)
    await expect(this.page.locator(this.messageMessage)).toHaveText(messages.contact.message)
  }

  async clickSendButton() {
    await this.page.click(this.sendBtn)
  }

  async successMessageVisible() {
    await expect(this.page.locator(this.messageSuccess)).toHaveText(messages.contact.successMessage)
  }

}

module.exports = { ContactPage }