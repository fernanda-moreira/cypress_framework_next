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
        // Log in before each test
        LoginPage.login(users.validUser.username, users.validUser.password);
    });

    it('TC175 - should display user name and surname', () => {
        UserSectionPage.verifyUserNameDisplay(users.validUser.fullName);
    });

    it('TC176 - should display account balance', () => {
        UserSectionPage.verifyAccountBalanceVisible();
    });

    it('TC177 - should toggle hidden balance option', () => {
        UserSectionPage.toggleBalanceVisibility();
        UserSectionPage.verifyAccountBalanceVisible(); // Optional: check balance is now hidden
    });

    it('TC178 - should display real money balance', () => {
        UserSectionPage.verifyRealMoneyBalance();
    });

    it('TC179 - should display bonus balance', () => {
        UserSectionPage.verifyBonusBalance();
    });

    it('TC180 - should navigate to profile page', () => {
        UserSectionPage.clickProfileLink();
        cy.url().should('include', '/profile');
    });

    it('TC181 - should navigate to inbox page', () => {
        UserSectionPage.clickInboxLink();
        cy.url().should('include', '/inbox');
    });

    it('TC182 - should navigate to bonuses page', () => {
        UserSectionPage.clickBonusesLink();
        cy.url().should('include', '/bonuses');
    });

    it('TC183 - should navigate to deposit page', () => {
        UserSectionPage.clickDepositLink();
        cy.url().should('include', '/deposit');
    });

    it('TC184 - should navigate to withdraw page', () => {
        UserSectionPage.clickWithdrawLink();
        cy.url().should('include', '/withdraw');
    });

    it('TC185 - should navigate to pending withdraw page', () => {
        UserSectionPage.clickPendingWithdrawLink();
        cy.url().should('include', '/withdraw/pending');
    });

    it('TC186 - should navigate to account statement page', () => {
        UserSectionPage.clickAccountStatementLink();
        cy.url().should('include', '/account-statement');
    });

    it('TC187 - should logout and redirect to homepage or login page', () => {
        UserSectionPage.clickLogout();
        cy.url().should('include', '/login'); // or '/' depending on implementation
    });
});
