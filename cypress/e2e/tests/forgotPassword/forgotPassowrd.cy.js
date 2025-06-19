import LoginPage from '../../../support/pageObjects/LoginPage';
import forgotPassword from '../../../support/pageObjects/forgotPassword';

describe('Navigation Bar Test', () => {
    let users;
    let randomUser;

    before(() => {
        cy.fixture('users/users.json').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        const validUserList = Array.isArray(users.validUser) ? users.validUser : [users.validUser];
        randomUser = validUserList[Math.floor(Math.random() * validUserList.length)];
    });

    it.only('TC167 - Test close button', () => {
        LoginPage.visitBarra()
        forgotPassword.clickButtonLogin()
        forgotPassword.clickForgotPassword()
        forgotPassword.verifyUrlForgotPassword()
        LoginPage.clickCloseModal()
    });


});