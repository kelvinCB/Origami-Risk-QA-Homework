const { test, expect } = require('../fixtures/testFixtures');
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

  test('Verify logout returns the user to the login page @smoke @positive @extra', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(USERS.valid);
    await secureAreaPage.expectLoaded();
    await secureAreaPage.logout();
    await loginPage.expectOnLoginPage();
  });

  test('Verify logout success message after signing out @smoke @positive @extra', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(USERS.valid);
    await secureAreaPage.expectLoaded();
    await secureAreaPage.logout();
    await loginPage.expectErrorMessage(LOGIN_MESSAGES.logoutSuccess);
  });

  test('Verify direct navigation to /secure is blocked when not authenticated @smoke @negative @extra', async ({ page, loginPage }) => {
    await page.goto('/secure');
    await loginPage.expectOnLoginPage();
    await loginPage.expectErrorMessage(LOGIN_MESSAGES.secureAreaBlocked);
  });

  test('Verify browser back behavior after logout @smoke @negative @extra', async ({ page, loginPage, secureAreaPage }) => {
    await loginPage.login(USERS.valid);
    await secureAreaPage.expectLoaded();
    await secureAreaPage.logout();
    await loginPage.expectOnLoginPage();

    await page.goBack();
    await page.reload();

    await loginPage.expectOnLoginPage();
    await loginPage.expectErrorMessage(LOGIN_MESSAGES.secureAreaBlocked);
  });
  
  test('Verify flash message can be dismissed with the close button on Secure Area page @smoke @positive @extra', async ({ loginPage, secureAreaPage }) => {
    await loginPage.login(USERS.valid);
    await secureAreaPage.expectLoaded();
    await secureAreaPage.dismissFlashMessage();
  });

  test('Verify flash message can be dismissed with the close button on Login page @smoke @negative @extra', async ({ loginPage }) => {
    await loginPage.login(USERS.invalidUsername);
    await loginPage.expectErrorMessage(LOGIN_MESSAGES.invalidUsername);
    await loginPage.dismissFlashMessage();
  });

  test('Verify mobile viewport layout for the login page @smoke @extra', async ({ page, loginPage }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await loginPage.goto();

    const viewport = page.viewportSize();
    const loginElements = [
      loginPage.loginTitle,
      loginPage.usernameInput,
      loginPage.passwordInput,
      loginPage.submitButton,
    ];

    for (const element of loginElements) {
      const elementBox = await element.boundingBox();

      expect(elementBox).not.toBeNull();
      expect(elementBox.x).toBeGreaterThanOrEqual(0);
      expect(elementBox.x + elementBox.width).toBeLessThanOrEqual(viewport.width);
    }
  });

});
