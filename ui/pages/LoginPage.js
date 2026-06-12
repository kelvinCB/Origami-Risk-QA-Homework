const { expect } = require('@playwright/test');
const { config } = require('../../utils/config');

class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginTitle = page.getByRole('heading', { name: 'Login Page' });
    this.usernameInput = page.locator('#username');
    this.passwordInput = page.locator('#password');
    this.submitButton = page.getByRole('button', { name: 'Login' });
    this.flashMessage = page.locator('#flash');
    this.flashCloseButton = this.flashMessage.locator('a.close');
  }

  async goto() {
    await this.page.goto(config.loginPath);
    await expect(this.loginTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
  }

  async login(user) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.submitButton.click();
  }

  async loginWithEnter(user) {
    await this.usernameInput.fill(user.username);
    await this.passwordInput.fill(user.password);
    await this.passwordInput.press('Enter');
  }

  async expectPasswordInputMasked() {
    await expect(this.passwordInput).toHaveAttribute('type', 'password');
  }

  async expectErrorMessage(message) {
    await expect(this.flashMessage).toContainText(message);
  }

  async dismissFlashMessage() {
    await this.flashCloseButton.click();
    await expect(this.flashMessage).toHaveCount(0);
  }

  async expectOnLoginPage() {
    await expect(this.page).toHaveURL(/\/login$/);
    await expect(this.loginTitle).toBeVisible();
    await expect(this.usernameInput).toBeVisible();
  }
}

module.exports = { LoginPage };
