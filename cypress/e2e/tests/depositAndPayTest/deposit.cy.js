import depositPay from '../../../support/pageObjects/depositPay';
import UserSectionPage from '../../../support/pageObjects/UserSectionPage';
import LoginPage from '../../../support/pageObjects/LoginPage';

describe('Tests Deposits and Payment Methots', () => {
    let users;

    before(() => {
        cy.fixture('users/users.json').then((data) => {
            users = data;
        });
    });

    beforeEach(() => {
        const validUserList = Array.isArray(users.validUser) ? users.validUser : [users.validUser];
        const randomUser = validUserList[Math.floor(Math.random() * validUserList.length)];
        LoginPage.login(randomUser.username, randomUser.password);
    });




    it('TC165 - Verify Display of Deposit Payment Methods', () => {
        UserSectionPage.clickDepositLink();
        depositPay.verifyClickableDepositMethods();
    });

    it.only('TC166 - Verify Min/Max Limits for Deposit Methods', () => {
        UserSectionPage.clickDepositLink();
        depositPay.verifyMinMaxLimitsDepositMethod("jeton_cash")
    });
});