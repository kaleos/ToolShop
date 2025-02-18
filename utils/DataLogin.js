const base = require('@playwright/test')

exports.credentials = base.test.extend({
  validCredentials: {
    email: "test@email.com",
    password: "POhu375()",
  },
  invalidCredentials: {
    email: "invalid@email.com",
    password: "wrongpassword",
  },
  emptyCredentials: {
    email: "",
    password: "",
  },
})