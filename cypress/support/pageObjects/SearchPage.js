class SearchPage {
    visit() {
        cy.visit('https://nextocasino.com');
    }

    openSearchBar() {
        cy.get('button[class="relative w-full"]').click();
    }

    enterSearchTerm(term) {
        cy.get('input[placeholder="Search"]').clear().type(term);
    }

    verifySearchResultContains(text) {
        cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto')
            .find('div.text-color-b.text-sm.md\\:text-base.font-medium.truncate')
            .should('contain.text', text);
    }

    verifyNoSearchResults() {
        cy.get('.cursor-default.select-none.relative.text-color-b.text-center')
            .should('contain.text', 'No games found');
    }

    scrollToProviderFilter() {
        cy.get('.flex-shrink-0.md\\:w-52').scrollIntoView();
    }

    toggleProviderCheckbox(providerName) {
        cy.contains('div.truncate', providerName)
            .parents('label')
            .find('input[type="checkbox"]')
            .check({ force: true });
    }

    verifyGamesByProvider(providers) {
        const pattern = new RegExp(providers.join('|'));
        cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto')
            .find('div.mt-2')
            .each(($game) => {
                cy.wrap($game)
                    .find('div.text-color-e')
                    .invoke('text')
                    .should('match', pattern);
            });
    }
}

export default new SearchPage();
