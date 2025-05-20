class MainPage {
    // Open side menu
    openMenu() {
        cy.get('button.mr-6.xl\\:mr-0.xl\\:hidden').should('be.visible').click();
    }

    // Navigation Bar Links (TC001)
    verificaLinkCasino() {
        this.openMenu();
        cy.get('a[href="/casino"]:visible').first().click();
        cy.url().should('include', '/casino');
    }

    verificaLinkCasinoAoVivo() {
        this.openMenu();
        cy.get('a[href="/casino/live_casino"]:visible').first().click();
        cy.url().should('include', '/casino/live_casino');
    }

    verificaLinkEsportes() {
        this.openMenu();
        cy.get('a[href="/sports/delasport"]:visible').first().click();
        cy.url().should('include', '/sports/delasport');
    }

    verificaLinkLivespins() {
        this.openMenu();
        cy.get('a[href="/livespins"]:visible').first().click();
        cy.url().should('include', '/livespins');
    }

    verificaLinkPromocoes() {
        this.openMenu();
        cy.get('a[href="/promotions"]:visible').first().click();
        cy.url().should('include', '/promotions');
    }

    verificaLinkCalendario() {
        this.openMenu();
        cy.get('a[href="/calendar"]:visible').first().click();
        cy.url().should('include', '/calendar');
    }

    // TC002
    checkGamingOptionsButtons() {
        cy.get('.gaming-options button').each(($btn) => {
            cy.wrap($btn).should('be.visible').click();
        });
    }

    // TC003
    checkCategoryNavigation() {
        cy.get('.category-menu a').each(($link) => {
            cy.wrap($link).should('be.visible').click();
        });
    }

    // TC004 / TC028
    checkDepositNowPopup() {
        cy.get('.popup .deposit-now').should('be.visible').click();
        cy.url().should('include', '/deposit');
    }

    // TC005 to TC010
    checkFooterLink(selector, expectedUrlPart) {
        cy.get(selector).should('be.visible').click();
        cy.url().should('include', expectedUrlPart);
    }

    // TC011
    checkHeaderVisible() {
        cy.get('header').should('be.visible');
    }

    // TC012
    checkGamingOptionsBarVisible() {
        cy.get('.gaming-options').should('be.visible');
    }

    // TC013
    checkFooterVisible() {
        cy.get('footer').should('be.visible');
    }

    // TC014
    checkHoverEffects() {
        cy.get('a').first().trigger('mouseover');
        // Add hover effect check logic if styles change
    }

    // TC015
    checkGameThumbnailsVisible() {
        cy.get('.game-thumbnail').should('be.visible');
    }

    // TC016
    checkSearchBarFunctionality(keyword) {
        cy.get('input[type="search"]').type(keyword);
        cy.get('button.search').click();
        cy.get('.game-list').should('contain', keyword);
    }

    // TC017
    checkGameProviderFilter() {
        cy.get('.provider-filter select').select(1);
        cy.get('.game-thumbnail').should('exist');
    }

    // TC018
    checkSearchBarInputLimit(maxLength = 50) {
        const longInput = 'a'.repeat(maxLength + 10);
        cy.get('input[type="search"]').type(longInput).invoke('val').should('have.length.lte', maxLength);
    }

    // TC019
    checkSearchBarNoResults() {
        cy.get('input[type="search"]').clear().type('nonexistentgame');
        cy.get('.no-results').should('be.visible');
    }

    // TC020
    clickShowAll() {
        cy.get('button.show-all').click();
        cy.get('.game-list .game-item').should('have.length.greaterThan', 10);
    }

    // TC021
    clickPlayButton() {
        cy.get('.play-button').first().click();
    }

    // TC023
    checkDefaultLanguage(expectedLang) {
        cy.document().its('documentElement.lang').should('eq', expectedLang);
    }

    // TC024/025
    checkCategorySubtitles() {
        cy.get('.category-subtitle').each(($el) => {
            cy.wrap($el).invoke('text').should('match', /\d+/);
        });
    }

    // TC026
    checkTranslatedContent(expectedText) {
        cy.get('body').should('contain.text', expectedText);
    }
}

export default new MainPage();
