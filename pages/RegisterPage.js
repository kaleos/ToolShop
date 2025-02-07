const { expect } = require('@playwright/test');
const { baseURL } = require('../playwright.config');

class RegisterPage {
  constructor(page) {
    this.page = page;

    this.signInBtn = '//a[contains(text(),"Sign in")]',
    this.registerAccountBtn = '//a[contains(text(),"Register your account")]',
    this.firstName = "//input[@id='first_name']",
    this.lastName = "//input[@id='last_name']",
    this.dateOfBirth = '//input[@id="dob"]',
    this.address = '//input[@id="address"]',
    this.postalCode = '//input[@id="postcode"]',
    this.city = '//input[@id="city"]',
    this.state = '//input[@id="state"]',
    this.country = '//select[@id="country"]'
    this.phone = '//input[@id="phone"]',
    this.email = '//input[@id="email"]',
    this.password = '//input[@id="password"]',
    this.registerButton = '//button[contains(text(),"Register")]'
  }

  async goTo() {
    await this.page.goto(baseURL);
  }

  async clickSignInBtn() {
    await this.page.click(this.signInBtn);
  }

  async clickRegisterBtn() {
    await this.page.click(this.registerAccountBtn);
  }

  async register(firstName, lastName, dateOfBirth, address, postalCode, city, state, country, phone, email, password) {
    await this.page.fill(this.firstName, firstName);
    await this.page.fill(this.lastName, lastName);
    await this.page.fill(this.dateOfBirth, dateOfBirth);
    await this.page.fill(this.address, address);
    await this.page.fill(this.postalCode, postalCode);
    await this.page.fill(this.city, city);
    await this.page.fill(this.state, state);
    await this.page.selectOption(this.country, country);
    await this.page.fill(this.phone, phone);
    await this.page.fill(this.email, email);
    await this.page.fill(this.password, password);
    await this.page.click(this.registerButton);
  }
}

module.exports = { RegisterPage };