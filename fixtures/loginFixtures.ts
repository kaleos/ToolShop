import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginFixtures {
  loginPage: LoginPage
  validCredentials: LoginCredentials
  invalidCredentials: LoginCredentials
  emptyCredentials: LoginCredentials
}

const loginURL = 'https://practicesoftwaretesting.com/auth/login'

export const loginFixtures = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(loginURL)
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },
  validCredentials: {
    email: 'test2864@email.com',
    password: 'Weksitef489()'
  },
  invalidCredentials: {
    email: 'invalid@email.com',
    password: 'wrongpassword'
  },
  emptyCredentials: {
    email: '',
    password: ''
  }
})
