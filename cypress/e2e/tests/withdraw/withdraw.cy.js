import depositPay from '../../../support/pageObjects/depositPay';
import UserSectionPage from '../../../support/pageObjects/UserSectionPage';
import LoginPage from '../../../support/pageObjects/LoginPage';
import withdraw from '../../../support/pageObjects/withdraw';

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




    it('TC154 - Verify Bank Images Are Displayed', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickWithdrawLink();
        depositPay.verifyClickableDepositMethods();
    });


    it.only('TC155 - Error Message for Unlinked Bank Account/method', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickWithdrawLink();
        withdraw.verifiMsgAccountIsNotLinked("acme-payments_light");
    });
});
