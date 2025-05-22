class MainPage {
    // Open side menu
    openMenu() {
        cy.get('button.mr-6.xl\\:mr-0.xl\\:hidden').should('be.visible').click();
    }

    // TC001 - Navigation Bar Links
    verificaLinkCasino() {
        this.openMenu();
        cy.wait(100);
        cy.get('a[href="/casino"]:visible').first().click();
        cy.url().should('include', '/casino');
    }

    verificaLinkCasinoAoVivo() {
        this.openMenu();
        cy.wait(100);
        cy.get('a[href="/live_casino"]:visible').first().click();
        cy.url().should('include', '/casino/live_casino');
    }

    verificaLinkEsportes() {
        this.openMenu();
        cy.wait(100);
        cy.get('a[href="/sports/delasport"]:visible').first().click();
        cy.url().should('include', '/sports/delasport');
    }

    verificaLinkLivespins() {
        this.openMenu();
        cy.wait(100);
        cy.get('a[href="/livespins"]:visible').first().click();
        cy.url().should('include', '/livespins');
    }

    verificaLinkPromocoes() {
        this.openMenu();
        cy.wait(100);
        cy.get('a[href="/promotions"]:visible').first().click();
        cy.url().should('include', '/promotions');
    }

    verificaLinkCalendario() {
        this.openMenu();
        cy.wait(100);
        cy.get('a[href="/calendar"]:visible').first().click();
        cy.url().should('include', '/calendar');
    }

    // Guest Navigation - Updated with `.first()` and `:visible`
    verificaLinkAllGamesGuest() {
        cy.wait(100);
        cy.get('a[href="/casino/all_games"]:visible').first().should('be.visible').click();
        cy.url().should('include', '/casino/all_games');
    }

    verificaLinkSlotGamesGuest() {
        cy.wait(100);
        cy.get('a[href="/casino/slot_games"]:visible').first().should('be.visible').click();
        cy.url().should('include', '/casino/slot_games');
    }

    verificaLinkLiveCasinoGuest() {
        cy.wait(100);
        cy.get('a[href="/casino/live_casino"]:visible').first().should('be.visible').click();
        cy.url().should('include', '/casino/live_casino');
    }

    verificaLinkVirtualGamesGuest() {
        cy.wait(100);
        cy.get('a[href="/casino/virtual_games"]:visible').first().should('be.visible').click();
        cy.url().should('include', '/casino/virtual_games');
    }

    verificaLinkTopTableAndCrashGamesGuest() {
        cy.wait(100);
        cy.get('a[href="/casino/casino_games"]:visible').first().should('be.visible').click();
        cy.url().should('include', '/casino/casino_games');
    }

    verificaLinkLuckyGamesGuest() {
        cy.wait(100);
        cy.get('a[href="/casino/lucky_games"]:visible').first().should('be.visible').click();
        cy.url().should('include', '/casino/lucky_games');
    }

    // Optional: Uncomment if needed for broader checks
    // checkGamingOptionsMenuLinks() {
    //     const menuLinks = [
    //         '/all_games',
    //         '/slots',
    //         '/live_casino',
    //         '/casino/virtual_games',
    //         '/casino/top_table_and_crash_games',
    //         '/casino/lucky_games'
    //     ];

    //     menuLinks.forEach((path) => {
    //         cy.get(`a[href="${path}"]:visible`).first().click();
    //         cy.url().should('include', path);
    //         cy.log(`Verified menu link to: ${path}`);
    //         cy.visit('/casino'); // Return to base after each test
    //     });
    // }

    // checkCategoryNavigation() {
    //     cy.get('.category-menu a[href^="#"]').each(($link) => {
    //         const href = $link.attr('href');
    //         if (href) {
    //             cy.wrap($link).should('be.visible').click();
    //             cy.get(href).should('exist').and('be.visible');
    //             cy.log(`Navigated to in-page section: ${href}`);
    //         }
    //     });
    // }
}

export default new MainPage();
