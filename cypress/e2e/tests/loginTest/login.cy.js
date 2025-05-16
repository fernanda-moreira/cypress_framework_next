import LoginPage from '../../../support/pageObjects/LoginPage';

describe('Login Page Tests', () => {
    let users;

    before(() => {
        cy.fixture('users/users.json').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        LoginPage.visit();
    });

    it('1. should login successfully with valid credentials', () => {
        const { username, password } = users.validUser;
        LoginPage.enterEmail(username);
        LoginPage.enterPassword(password);
        LoginPage.clickLoginButton();
        LoginPage.clickCloseModal();
        LoginPage.verifyLoginSuccess();
    });

    it('2. should show error message for invalid credentials', () => {
        const { username, password } = users.invalidUser;
        LoginPage.enterEmail(username);
        LoginPage.enterPassword(password);
        LoginPage.clickLoginButton();
        LoginPage.verifyLoginError();
    });

    it('3. should show error for invalid email format', () => {
        LoginPage.enterEmail('invalid-email-format');
        LoginPage.enterPassword('ValidPassword123');
        LoginPage.clickLoginButton();
        LoginPage.verifyInvalidEmailFormat();
    });

    it('4. should show error for empty email field', () => {
        LoginPage.enterEmail('');
        LoginPage.enterPassword('ValidPassword123');
        LoginPage.clickLoginButton();
        LoginPage.verifyEmptyEmailError();
    });

    it('5. should show error for empty password field', () => {
        LoginPage.enterEmail(users.validUser.username);
        LoginPage.enterPassword('');
        LoginPage.clickLoginButton();
        LoginPage.verifyEmptyPasswordError();
    });

    it('6. should redirect to registration page when "Register Now" is clicked', () => {
        LoginPage.clickRegisterNow();
        LoginPage.verifyRedirectToRegister();
    });

    it('7. should display forgot password modal when "Forgot your password?" is clicked', () => {
        LoginPage.clickForgotPassword();
        LoginPage.verifyForgotPasswordModalVisible();
    });

    it('8. should handle long email and password inputs gracefully', () => {
        const longEmail = 'veryloaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaangemailaddressfortestingpurposes@example.com';
        const longPassword = 'a'.repeat(256);
        LoginPage.enterEmail(longEmail);
        LoginPage.enterPassword(longPassword);
        LoginPage.clickLoginButton();

        // You can assert either a failed login or successful validation message depending on app behavior
        LoginPage.verifyLoginError();
    });

    it('9. should toggle password visibility', () => {
        LoginPage.enterPassword('TestPassword123');

        // Initially hidden
        LoginPage.verifyPasswordType('password');
        LoginPage.verifyPasswordFieldValue('TestPassword123');

        // Toggle visible
        LoginPage.togglePasswordVisibility();
        LoginPage.verifyPasswordType('text');
        LoginPage.verifyPasswordFieldValue('TestPassword123');

        // Toggle back
        LoginPage.togglePasswordVisibility();
        LoginPage.verifyPasswordType('password');
        LoginPage.verifyPasswordFieldValue('TestPassword123');
    });
});