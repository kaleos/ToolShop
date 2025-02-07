const { test, expect } = require('@playwright/test');
const { baseURL } = require('../playwright.config');

let goToPage;

test.beforeEach(async ({ page }) => { 
  goToPage = await page.goto(baseURL); 
});