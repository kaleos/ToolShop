import { test as base } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { generateRandomUserData } from '../utils/randomDataGenerator'

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

interface LoginWorkerFixtures {
  workerCredentials: LoginCredentials
}

const loginURL = 'https://practicesoftwaretesting.com/auth/login'
const registrationURL = 'https://practicesoftwaretesting.com/auth/register'

export const loginFixtures = base.extend<LoginFixtures, LoginWorkerFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(loginURL)
    const loginPage = new LoginPage(page)
    await use(loginPage)
  },

  // Registered once per worker process and reused by every test that worker
  // runs. Previously all specs shared one hardcoded account, so with
  // fullyParallel + multiple workers, several tests were logged into the
  // same account at once and stomped on each other's cart/favorites/session
  // state. A unique account per worker removes that cross-test contention.
  workerCredentials: [
    async ({ browser }, use) => {
      const userData = generateRandomUserData()
      const context = await browser.newContext()
      const page = await context.newPage()

      await page.goto(registrationURL)
      const registerPage = new RegisterPage(page)
      await registerPage.register(
        userData.firstName,
        userData.lastName,
        userData.dateOfBirth,
        userData.street,
        userData.houseNumber,
        userData.postalCode,
        userData.city,
        userData.state,
        userData.country,
        userData.phone,
        userData.email,
        userData.password
      )
      // Registration redirects to the login page on success.
      await page.waitForURL(/\/auth\/login/, { timeout: 15000 })
      await context.close()

      await use({ email: userData.email, password: userData.password })
    },
    { scope: 'worker' }
  ],

  validCredentials: async ({ workerCredentials }, use) => {
    await use(workerCredentials)
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
