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

    it('TC166 - Verify Min/Max Limits for Deposit Methods', () => {
        UserSectionPage.clickDepositLink();
        //depositPay.verifyAllDepositMethodsLimits()
        depositPay.verifyMinMaxLimitsDepositMethod("jeton_cash")
        depositPay.clickBack("mastercard_light", '0')
        depositPay.clickBack("mastercard_light", '1')
        depositPay.clickBack("visa_light", '0')
        depositPay.clickBack("visa_light", '1')
        depositPay.clickBack("visa_light", '2')
        depositPay.clickBack("visa_light", '3')
        depositPay.clickBack("visa_light", '4')
        depositPay.clickBack("visa_light", '5')
    });

    it('TC167 - Verify Bonus Section is Available for All Methods', () => {
        UserSectionPage.clickDepositLink();
        depositPay.verifyHaveBonusDontWantABonus("jeton_cash")
        depositPay.clickBackBonus("mastercard_light", '0')
        depositPay.clickBackBonus("mastercard_light", '1')
    });
});