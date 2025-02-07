const faker = require('faker'); // Ensure faker is installed using npm or yarn

function generateRandomUserData() {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dateOfBirth: faker.date.past(30, new Date()).toISOString().split('T')[0],
    address: faker.address.streetAddress(),
    postalCode: faker.address.zipCode(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.countryCode(),
    phone: faker.phone.phoneNumber(),
    email: faker.internet.email(),
    password: faker.internet.password()
  };
}

module.exports = { generateRandomUserData };
