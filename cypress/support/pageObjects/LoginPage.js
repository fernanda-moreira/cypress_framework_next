class LoginPage {
    visit() {
        cy.visit('/?modal=login');
    }

    visitBarra() {
        cy.visit('/');
    }

    enterEmail(email) {
        cy.get('input[name="email"]').clear().type(email);
    }

    enterPassword(password) {
        cy.get('input[name="password"]').clear().type(password);
    }

    clickLoginButton() {
        cy.get('button[type="submit"]').click();
    }

    clickCloseModal() {
        cy.get('button.absolute.right-3.top-3', { timeout: 5000 }).should('be.visible').click();
    }

    verifyLoginSuccess() {
        cy.wait(2000);
        cy.url().should('include', '/');
        cy.contains('Welcome').should('be.visible');
    }

    verifyLoginError() {
        cy.contains('Wrong email or password').should('be.visible');
    }

    verifyInvalidEmailFormat() {
        cy.get('.text-sm.block.text-color-i.mt-1').should('contain', 'Email must be a valid email');
    }

    verifyEmptyEmailError() {
        cy.get('.text-sm.block.text-color-i.mt-1').should('contain', 'Email is a required field');
    }

    verifyEmptyPasswordError() {
        cy.get('.text-sm.block.text-color-i.mt-1').should('contain', 'Password is a required field');
    }

    clickRegisterNow() {
        cy.contains('button', 'Register now').click();
    }

    verifyRedirectToRegister() {
        cy.url().should('include', '?modal=register');
    }

    clickForgotPassword() {
        cy.get('button.text-color-e.underline.text-xs').click();
    }

    verifyForgotPasswordModalVisible() {
        cy.get('._modal_72swt_1._sm_72swt_9').should('be.visible');
    }

    togglePasswordVisibility() {
        cy.get('svg.w-4.h-4').click();
    }

    verifyPasswordFieldValue(expectedValue) {
        cy.get('input[name="password"]').invoke('val').should('eq', expectedValue);
    }

    verifyPasswordType(expectedType) {
        cy.get('input[name="password"]').should('have.attr', 'type', expectedType);
    }


    login(email, password) {
        this.visit();
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginButton();
        cy.wait(2000);
        this.clickCloseModal();
    }
}

export default new LoginPage();
