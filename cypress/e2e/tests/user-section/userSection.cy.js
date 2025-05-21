import LoginPage from '../../../support/pageObjects/LoginPage';
import UserSectionPage from '../../../support/pageObjects/UserSectionPage';

describe('User Section Tests', () => {
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

    it('TC175 - should display user name and surname', () => {
        UserSectionPage.verifyUserNameDisplay(users.ValidName.username);
    });

    it('TC176 - should display account balance', () => {
        UserSectionPage.verifyAccountBalanceVisible();
    });

    it('TC177 - should toggle hidden balance option', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickButtonHidden();
    });

    it('TC178 - should display real money balance', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.verifyRealMoneyBalance();
    });

    it('TC179 - should display bonus balance', () => {
        UserSectionPage.verifyBonusBalance();
    });

    it('TC180 - should navigate to profile page', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickProfileLink();
    });

    it('TC181 - should navigate to inbox page', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickInboxLink();
    });

    it('TC182 - should navigate to bonuses page', () => {
        UserSectionPage.clickBonusesLink();
        cy.url().should('include', '/bonuses');
    });

    it('TC183 - should navigate to deposit page', () => {
        UserSectionPage.clickDepositLink();
    });

    it('TC184 - should navigate to withdraw page', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickWithdrawLink();
    });

    it('TC185 - should navigate to pending withdraw page', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickPendingWithdrawLink();
    });

    it('TC186 - should navigate to account statement page', () => {
        UserSectionPage.clickButtonPerfil();
        UserSectionPage.clickAccountStatementLink();
    });

    it('TC187 - should logout and redirect to homepage or login page', () => {
        UserSectionPage.clickLogout();
        cy.url().should('include', '/login'); // or '/' depending on implementation
    });
});
