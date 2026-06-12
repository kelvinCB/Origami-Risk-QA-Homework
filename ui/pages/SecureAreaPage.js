const { expect } = require('@playwright/test');
const { LOGIN_MESSAGES } = require('../../utils/constants/messages');

class SecureAreaPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Secure Area', exact: true });
    this.flashMessage = page.locator('#flash');
    this.flashCloseButton = this.flashMessage.locator('a.close');
    this.logoutButton = page.getByRole('link', { name: 'Logout' });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(/\/secure$/);
    await expect(this.heading).toBeVisible();
    await expect(this.flashMessage).toContainText(LOGIN_MESSAGES.success);
    await expect(this.logoutButton).toBeVisible();
  }

  async logout() {
    await this.logoutButton.click();
  }

  async dismissFlashMessage() {
    await this.flashCloseButton.click();
    await expect(this.flashMessage).toHaveCount(0);
  }
}

module.exports = { SecureAreaPage };