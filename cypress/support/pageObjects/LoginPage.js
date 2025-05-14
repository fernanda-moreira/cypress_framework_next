class LoginPage {
    visit() {
        cy.visit('/?modal=login');
    }

    enterEmail(email) {
        cy.get('input[name="email"]').type(email);
    }

    enterPassword(password) {
        cy.get('input[name="password"]').type(password);
    }

    clickLoginButton() {
        cy.get('button[type="submit"]').click();
    }

    verifyLoginSuccess() {
        // Aguarda o carregamento da página após o login
        cy.wait(2000); // Ajuste o tempo conforme necessário
        //cy.get('button.absolute.right-3.top-3').should('be.visible').click();
        cy.url().should('include', '/');
        cy.contains('Welcome').should('be.visible');
    }

    clickCloseModal() {
        // Espera até o botão estar visível antes de clicar
        cy.get('button.absolute.right-3.top-3', { timeout: 5000 }).should('be.visible').click();
    }

    verifyLoginError() {
        cy.contains('Wrong email or password').should('be.visible');
    }

    // 🚀 Novo método para realizar o login completo
    login(email, password) {
        this.visit();
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginButton();
        cy.wait(2000); // Aguarda o carregamento do próximo modal
        this.clickCloseModal();
    }
}

export default new LoginPage();
