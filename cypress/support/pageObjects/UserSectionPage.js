class UserSectionPage {
    verifyUserNameDisplay(expectedName) {
        cy.get('button._myAccountButton_e8ze2_28 div.text-color-e.font-medium.text-right.truncate')
            .should('contain', expectedName);
    }

    verifyAccountBalanceVisible() {
        cy.get('.text-sm > .text-color-b').should('be.visible');
    }

    clickButtonPerfil() {
        cy.get('button._myAccountButton_e8ze2_28').click();

    }
    clickButtonHidden() {
        cy.get('svg.cursor-pointer.text-color-e').click();
        cy.get('div.text-color-b.text-right').should('contain', '***');
    }

    toggleBalanceVisibility() {
        cy.get('[data-testid="toggle-balance"]').click();
    }

    verifyRealMoneyBalance() {
        cy.get('label:contains("Real money")') // encontra o label
            .parent() // vai para o div pai
            .find('div.text-neutral-300.font-bold') // encontra o valor
            .invoke('text') // extrai o texto
            .then((realMoney) => {
                // limpa espaços, se necessário
                const valorReal = realMoney.trim();
                cy.get('.text-sm > .text-color-b')
                    .invoke('text')
                    .then((valorExibido) => {
                        expect(valorExibido.trim()).to.eq(valorReal);
                    });
            });
    }

    verifyBonusBalance() {
        cy.get('[data-testid="bonus-balance"]').should('exist');
    }

    clickProfileLink() {
        cy.get('a[href="/account/profile/personal_info"]').click();
        cy.url().should('include', '/account/profile/personal_info');
    }

    clickInboxLink() {
        cy.get('a[href="/account/profile/inbox"]').click();
        cy.url().should('include', '/account/profile/inbox');
    }

    clickBonusesLink() {
        cy.get('[data-testid="bonuses-link"]').click();
    }

    clickDepositLink() {
        cy.get('a[href="/account/financials/deposit"]').eq(0).click();
        cy.url().should('include', '/account/financials/deposit');
    }

    clickDepositModal() {
        cy.get('.grid > ._secondary_i1e1t_9').should('be.visible').click()
        cy.url().should('include', '/account/financials/deposit');
    }

    clickWithdrawLink() {
        cy.get('a[href="/account/financials/withdraw"]').click();
        cy.url().should('include', '/account/financials/withdraw')
    }

    clickPendingWithdrawLink() {
        cy.get('a[href="/account/financials/pending_withdraws"]').click();
        cy.url().should('include', '/account/financials/pending_withdraws')
    }

    clickAccountStatementLink() {
        cy.get('a[href="/account/history/account_statement"]').click();
        cy.url().should('include', '/account/history/account_statement')
    }

    clickLogout() {
        cy.get('[data-testid="logout-link"]').click();
    }
}

export default new UserSectionPage();
