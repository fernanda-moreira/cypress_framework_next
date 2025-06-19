class forgotPassword {
    clickButtonLogin() {
        cy.get('button.uppercase.text-color-e').click();

    }

    clickForgotPassword() {
        cy.get('button.text-color-e.underline.text-xs')
            .click({ force: true });
    }


    verifyUrlForgotPassword() {
        // Verifica se foi redirecionado para a URL correta
        cy.url().should('include', '/?modal=reset_password');

        // Verifica se a mensagem "Reset your password" está visível
        cy.get('div.text-center.mt-8.sm\\:mt-16.font-medium')
            .should('be.visible')
            .and('have.text', 'Reset your password');
    }

}
export default new forgotPassword();
