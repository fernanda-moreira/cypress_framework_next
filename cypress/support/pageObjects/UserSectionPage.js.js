class UserSectionPage {
    verifyUserNameDisplay(expectedName) {
        cy.get('[data-testid="user-full-name"]').should('contain', expectedName);
    }

    verifyAccountBalanceVisible() {
        cy.get('[data-testid="account-balance"]').should('be.visible');
    }

    toggleBalanceVisibility() {
        cy.get('[data-testid="toggle-balance"]').click();
    }

    verifyRealMoneyBalance() {
        cy.get('[data-testid="real-money-balance"]').should('exist');
    }

    verifyBonusBalance() {
        cy.get('[data-testid="bonus-balance"]').should('exist');
    }

    clickProfileLink() {
        cy.get('[data-testid="profile-link"]').click();
    }

    clickInboxLink() {
        cy.get('[data-testid="inbox-link"]').click();
    }

    clickBonusesLink() {
        cy.get('[data-testid="bonuses-link"]').click();
    }

    clickDepositLink() {
        cy.get('[data-testid="deposit-link"]').click();
    }

    clickWithdrawLink() {
        cy.get('[data-testid="withdraw-link"]').click();
    }

    clickPendingWithdrawLink() {
        cy.get('[data-testid="pending-withdraw-link"]').click();
    }

    clickAccountStatementLink() {
        cy.get('[data-testid="account-statement-link"]').click();
    }

    clickLogout() {
        cy.get('[data-testid="logout-link"]').click();
    }
}

export default new UserSectionPage();
