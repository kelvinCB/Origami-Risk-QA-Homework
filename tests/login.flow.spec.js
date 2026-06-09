const { test } = require('../fixtures/testFixtures');
const { USERS } = require('../test-data/users');
const { LOGIN_MESSAGES } = require('../utils/constants/messages');

test.describe('@login Login flow', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('successful login @smoke @positive @mandatory', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(USERS.valid);

    await secureAreaPage.expectLoaded();
  });

  test('login with invalid username @negative @mandatory', async ({ loginPage }) => {
    await loginPage.login(USERS.invalidUsername);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidUsername);
    await loginPage.expectOnLoginPage();
  });

  test('login with invalid password @negative @mandatory', async ({ loginPage }) => {
    await loginPage.login(USERS.invalidPassword);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidPassword);
    await loginPage.expectOnLoginPage();
  });
});