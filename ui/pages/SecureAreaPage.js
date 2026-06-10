const { expect } = require('@playwright/test');
const { LOGIN_MESSAGES } = require('../../utils/constants/messages');

class SecureAreaPage {
  constructor(page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Secure Area', exact: true });
    this.flashMessage = page.locator('#flash');
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
}

module.exports = { SecureAreaPage };