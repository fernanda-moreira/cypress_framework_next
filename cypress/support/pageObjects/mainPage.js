class MainPage {

    // Abre o menu lateral
    openMenu() {
        cy.get('button.mr-6.xl\\:mr-0.xl\\:hidden')
            .should('be.visible')
            .click();
    }

    // Clica no link do Cassino
    verificaLinkCasino() {
        this.openMenu();
        cy.get('a[href="/casino"].text-color-e')  // Localiza o link do cassino
            .first()  // Garante que clique no primeiro elemento encontrado
            .should('be.visible')  // Verifica se está visível
            .click();  // Clica no link
        cy.url().should('include', '/casino');  // Verifica se a URL inclui "/casino"
    }

    // Clica no link do Cassino ao Vivo
    verificaLinkCasinoAoVivo() {
        this.openMenu();
        cy.get('a[href="/casino/live_casino"]')  // Localiza o link do cassino ao vivo
            .eq(2)  // Clica no terceiro elemento da lista
            .should('be.visible')
            .click();
        cy.url().should('include', '/casino/live_casino');
    }

    // Clica no link de Esportes
    verificaLinkEsportes() {
        this.openMenu();
        cy.get('a[href="/sports/delasport"]')  // Localiza o link de esportes
            .should('be.visible')
            .click();
        cy.url().should('include', '/sports/delasport');
    }

    // Clica no link do Livespins
    verificaLinkLivespins() {
        this.openMenu();
        cy.get('a[href="/livespins"]')  // Localiza o link do Livespins
            .should('be.visible')
            .click();
        cy.url().should('include', '/livespins');
    }

    // Clica no link de Promoções
    verificaLinkPromocoes() {
        this.openMenu();
        cy.get('a[href="/promotions"]')  // Localiza o link de promoções
            .eq(1)  // Acessa o segundo elemento da lista
            .should('be.visible')
            .click();
        cy.url().should('include', '/promotions');
    }

    // Clica no link de Calendário
    verificaLinkCalendario() {
        this.openMenu();
        cy.get('a[href="/calendar"]')  // Localiza o link do calendário
            .eq(1)  // Acessa o segundo elemento da lista
            .should('be.visible')
            .click();
        cy.url().should('include', '/calendar');
    }
}

export default new MainPage();
