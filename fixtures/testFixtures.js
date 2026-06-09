const base = require('@playwright/test');
const { LoginPage } = require('../ui/pages/LoginPage');
const { SecureAreaPage } = require('../ui/pages/SecureAreaPage');

const test = base.test.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  secureAreaPage: async ({ page }, use) => {
    await use(new SecureAreaPage(page));
  },
});

module.exports = {
  test,
  expect: base.expect,
};
