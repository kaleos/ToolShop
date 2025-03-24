const { expect } = require('@playwright/test')
const messages = require('../data/messages.json')

class ContactPage {
  constructor(page) {
    this.page = page

    this.locators = {
      //#region Field locators
      firstName: '//input[@id="first_name"]',
      lastName: '//input[@id="last_name"]',
      email: '//input[@id="email"]',
      subject: '//select[@id="subject"]',
      message: '//textarea[@id="message"]',
      sendBtn: '//input[@type="submit"]',
      attachment: '//input[@id="attachment"]',
      //#endregion

      //#region Label locators
      labelFirstName: '//label[@for="first_name"]',
      labelLastName: '//label[@for="last_name"]',
      labelEmailAddress: '//label[@for="email"]',
      labelSubject: '//label[@for="subject"]',
      labelMessage: '//label[@for="message"]',
      labelAttachment: '//label[@for="attachment"]',
      //#endregion

      //#region Required field message locators
      messageFirstName: '//*[text()="First name is required"]',
      messageLastName: '//*[text()="Last name is required"]',
      messageEmailAddress: '//*[text()="Email is required"]',
      messageSubject: '//*[text()="Subject is required"]',
      messageMessage: '//*[text()="Message is required"]',
      messageSuccess: '//div[@role="alert"]'
    //#endregion
  }
  }

  async sendMessage(firstName, lastName, email, message) {
    await this.page.fill(this.locators.firstName, firstName)
    await this.page.fill(this.locators.lastName, lastName)
    await this.page.fill(this.locators.email, email)
    await this.page.fill(this.locators.message, message)
    // Randomly select an option from the subject dropdown
    const randomSubject = await this.page.$eval(this.locators.subject, select => {
      const options = Array.from(select.options)
      return options[Math.floor(Math.random() * options.length)].value
    })
    await this.page.selectOption(this.locators.subject, randomSubject)
    await this.page.click(this.locators.sendBtn)
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
        case 'Email Address':
            isVisible = await this.page.isVisible(this.locators.labelEmailAddress)
            break
        case 'Subject':
            isVisible = await this.page.isVisible(this.locators.labelSubject)
            break
        case 'Message':
            isVisible = await this.page.isVisible(this.locators.labelMessage)
            break
        case 'Attachment':
            isVisible = await this.page.isVisible(this.locators.labelAttachment)
            break
        default:
            isVisible = false
    }
    return isVisible
  }

  async requiredFieldMessagesVisible() {
    await expect(this.page.locator(this.locators.messageFirstName)).toHaveText(messages.contact.firstName)
    await expect(this.page.locator(this.locators.messageLastName)).toHaveText(messages.contact.lastName)
    await expect(this.page.locator(this.locators.messageEmailAddress)).toHaveText(messages.contact.emailAddress)
    await expect(this.page.locator(this.locators.messageSubject)).toHaveText(messages.contact.subject)
    await expect(this.page.locator(this.locators.messageMessage)).toHaveText(messages.contact.message)
  }

  async clickSendButton() {
    await this.page.click(this.locators.sendBtn)
  }

  async successMessageVisible() {
    await expect(this.page.locator(this.locators.messageSuccess)).toHaveText(messages.contact.successMessage)
  }

}

module.exports = { ContactPage }