const faker = require('faker') // Ensure faker is installed using npm or yarn

// Helper function to generate a secure password meeting the criteria
function generateSecurePassword(length = 8) {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lower = 'abcdefghijklmnopqrstuvwxyz'
  const digits = '0123456789'
  const specials = '@#$%&()[]{}'
  
  // Ensure at least one char from each requirement
  const getRandom = (str) => str[Math.floor(Math.random() * str.length)]
  let passwordChars = [
    getRandom(upper),
    getRandom(lower),
    getRandom(digits),
    getRandom(specials)
  ]
  
  // Fill remaining length with random characters from allowed groups
  const allChars = upper + lower + digits + specials;
  for (let i = passwordChars.length; i < length; i++) {
    passwordChars.push(getRandom(allChars))
  }
  
  // Shuffle the array to randomize the order
  for (let i = passwordChars.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [passwordChars[i], passwordChars[j]] = [passwordChars[j], passwordChars[i]]
  }
  return passwordChars.join('')
}

function generateRandomUserData() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dateOfBirth: faker.date.past(30, new Date()).toISOString().split('T')[0],
    street: faker.address.streetAddress(),
    postalCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.countryCode(),
    phone: faker.phone.phoneNumber().replace(/\D/g, '').substring(0, 10), // Modified to yield exactly 10 digits
    email: faker.internet.email(),
    password: generateSecurePassword(8) // Modified to yield a secure password meeting requirements
  }
}

module.exports = { generateRandomUserData }
