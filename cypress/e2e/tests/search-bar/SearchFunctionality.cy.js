import SearchPage from '../../../support/pageObjects/SearchPage';

describe('Search Functionality Tests', () => {
    beforeEach(() => {
        SearchPage.visit();
    });

    it('1. should display the search bar', () => {
        SearchPage.openSearchBar();
    });

    it('2. should search for a game by name', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        cy.wait(1000);
        SearchPage.verifySearchResultContains('Buffalo');
    });

    it('3. should search with a partial game name', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Pho');
        cy.wait(1000);
        SearchPage.verifySearchResultContains('Pho');
    });

    it('4. should show no results for an invalid game name', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('aaaaaaaaaaaaaaa');
        cy.wait(1000);
        SearchPage.verifyNoSearchResults();
    });

    it('5. should filter games by the "Betsoft" provider', () => {
        SearchPage.openSearchBar();
        SearchPage.scrollToProviderFilter();
        SearchPage.toggleProviderCheckbox('Betsoft');
        cy.wait(1000);
        SearchPage.verifyGamesByProvider(['Betsoft']);
    });

    it('6. should filter games by multiple providers', () => {
        SearchPage.openSearchBar();
        SearchPage.scrollToProviderFilter();
        SearchPage.toggleProviderCheckbox('1X2');
        SearchPage.toggleProviderCheckbox('Apollo');
        cy.wait(1000);
        SearchPage.verifyGamesByProvider(['1X2', 'Apollo']);
    });

    // Additional Test Cases Below

    it('7. should reset search input when closing and reopening search', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        SearchPage.closeSearchBar();
        SearchPage.openSearchBar();
        SearchPage.verifySearchInputIsEmpty();
    });

    it('8. should trigger search on pressing Enter key', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo', { pressEnter: true });
        cy.wait(1000);
        SearchPage.verifySearchResultContains('Buffalo');
    });

    it('9. should deselect provider filter on second click', () => {
        SearchPage.openSearchBar();
        SearchPage.scrollToProviderFilter();
        SearchPage.toggleProviderCheckbox('Betsoft');
        SearchPage.toggleProviderCheckbox('Betsoft'); // Deselect
        cy.wait(1000);
        SearchPage.verifyGamesByProvider([]);
    });

    it('10. should show game thumbnails in results', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        cy.wait(1000);
        SearchPage.verifyResultsContainThumbnails();
    });

    it('11. should not show duplicate results', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        cy.wait(1000);
        SearchPage.verifyNoDuplicateResults();
    });

    it('12. should persist filters after search input', () => {
        SearchPage.openSearchBar();
        SearchPage.scrollToProviderFilter();
        SearchPage.toggleProviderCheckbox('Betsoft');
        SearchPage.enterSearchTerm('Buffalo');
        cy.wait(1000);
        SearchPage.verifyFilterState(['Betsoft']);
    });

    it('13. should highlight matching text in results', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        cy.wait(1000);
        SearchPage.verifyMatchHighlighting('Buffalo');
    });

    it('14. should not overflow with long search terms', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('a'.repeat(300));
        SearchPage.verifyNoUIBreak();
    });

    it('15. should update results on backspace', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        cy.wait(1000);
        SearchPage.enterSearchTerm('Buffal'); // Simulate backspace
        cy.wait(1000);
        SearchPage.verifySearchResultContains('Buffal');
    });

    it('16. should clear input when clicking X icon', () => {
        SearchPage.openSearchBar();
        SearchPage.enterSearchTerm('Buffalo');
        SearchPage.clickClearInput();
        SearchPage.verifySearchInputIsEmpty();
        SearchPage.verifyResultsReset();
    });
});
