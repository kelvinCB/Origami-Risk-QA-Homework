const { expect } = require('@playwright/test');
const { config } = require('../../utils/config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator('#flash');
  }

  async goto() {
    // The login page is enough once the DOM is ready; waiting for full load
    // makes CI brittle on slow upstream resources.
    await this.page.goto(config.loginPath, { waitUntil: 'domcontentloaded' });
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(user) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }

  async expectErrorMessage(message) {
    await expect(this.flashMessage).toContainText(message);
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.usernameInput).toBeVisible();
  }
}

module.exports = { LoginPage };
