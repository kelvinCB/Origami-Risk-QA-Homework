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

  // additional tests

  test('Login with empty username and valid password @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.emptyUsername);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidUsername);
    await loginPage.expectOnLoginPage();
  });

  test('Login with valid username and empty password @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.emptyPassword);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidPassword);
    await loginPage.expectOnLoginPage();
  });

  test('Login with both fields empty @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.emptyUsernameAndPassword);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidUsername);
    await loginPage.expectOnLoginPage();
  });

  test('Login with leading and trailing spaces in username @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.usernameWithSpaces);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidUsername);
    await loginPage.expectOnLoginPage();
  });

  test('Login with leading and trailing spaces in password @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.passwordWithSpaces);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidPassword);
    await loginPage.expectOnLoginPage();
  });

  test('Login with username using different casing @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.usernameCasing);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidUsername);
    await loginPage.expectOnLoginPage();
  });

  test('Login with password using different casing @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.passwordCasing);

    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidPassword);
    await loginPage.expectOnLoginPage();
  });

  test('Verify password field masks input @smoke @positive @extra', async ({ loginPage }) => {
    await loginPage.expectPasswordInputMasked();
  });

  test('Verify pressing Enter from the password field submits the form @smoke @positive @extra', async ({ loginPage, secureAreaPage }) => {
    await loginPage.loginWithEnter(USERS.valid);

    await secureAreaPage.expectLoaded();
  });

});