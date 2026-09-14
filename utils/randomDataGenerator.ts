import faker from 'faker'

interface UserData {
  firstName: string
  lastName: string
  dateOfBirth: string
  street: string
  houseNumber: string
  postalCode: string
  city: string
  state: string
  country: string
  phone: string
  email: string
  password: string
}

interface MessageData {
  firstName: string
  lastName: string
  email: string
  message: string
}

// Helper function to generate a secure password meeting the criteria
function generateSecurePassword(length: number = 8): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const specials = '@#$%&()[]{}'
  
  // Ensure at least one char from each requirement
  const getRandom = (str: string): string => str[Math.floor(Math.random() * str.length)]
  let passwordChars: string[] = [
    getRandom(upper),
    getRandom(lower),
    getRandom(digits),
    getRandom(specials)
  ]
  
  // Fill remaining length with random characters from allowed groups
  const allChars = upper + lower + digits + specials
  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(getRandom(allChars))
  }
  
  // Shuffle the array to randomize the order
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]
  }
  return passwordChars.join('')
}

function yearsAgo(years: number): Date {
  const date = new Date()
  date.setFullYear(date.getFullYear() - years)
  return date
}

function generateRandomUserData(): UserData {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    // The site rejects customers under 18, so pick a DOB 18-70 years ago
    dateOfBirth: faker.date
      .between(yearsAgo(70), yearsAgo(18))
      .toISOString()
      .split('T')[0],
    street: faker.address.streetName(),
    houseNumber: faker.datatype.number({ min: 1, max: 9999 }).toString(),
    postalCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.countryCode(),
    phone: faker.phone
      .phoneNumber()
      .replace(/\D/g, '')
      .substring(0, 10), // Modified to yield exactly 10 digits
    email: faker.internet.email(),
    password: generateSecurePassword(8) // Modified to yield a secure password meeting requirements
  }
}

function generateRandomMessage(): MessageData {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    message: faker.lorem.paragraphs(1)
  }
}

export { generateRandomUserData, generateRandomMessage, UserData, MessageData }
