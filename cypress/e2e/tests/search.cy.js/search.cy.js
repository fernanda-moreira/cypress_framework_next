import nextoSelectors from '../../../selectors/css.js';  // Two levels up and then into selectors

    
describe('Search Functionality Tests', () => {
beforeEach(() => {
cy.visit('https://nextocasino.com');  // Use the base URL from the selectors
});

    
    it('1. should display the search bar', () => {
        cy.get(nextoSelectors.searchButton).click();  // Use selector from nextoSelectors
      });

  
  
    it('2. should search for a game by name', () => {
    cy.get('button[class="relative w-full"]').click();
    cy.get('input[placeholder="Search"].bg-transparent.text-color-b.outline-none.border-0.focus\\:shadow-none.focus\\:ring-offset-0.focus\\:ring-0.placeholder-color-l.px-0.py-4.flex-1')
      .clear()
      .type('Pho Sho');

    cy.wait(1000);

    cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto') // This is the container for game results
      .find('div.text-color-b.text-sm.md\\:text-base.font-medium.truncate') // Target the game name within each result
      .should('contain.text', 'Pho Sho'); // Check if the game name exists in the results
    });

  
    // 3.: Search with Partial Game Name
    it('3. should search with a partial game name', () => {
       cy.get('button[class="relative w-full"]').click();
       cy.get('input[placeholder="Search"]').clear().type('Pho')
       cy.wait(1000)

       cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto') // This is the container for game results
        .find('div.text-color-b.text-sm.md\\:text-base.font-medium.truncate') // Target the game name within each result
        .should('contain.text', 'Pho'); // Check if the game name exists in the results
           
    });
  
      // 4. Search with No Results
      it('4. should show no results for an invalid game name', () => {
      cy.get('button[class="relative w-full"]').click(); // Open search bar
      cy.get('input[placeholder="Search"]').clear().type('aaaaaaaaaaaaaaa'); // Type an invalid game name
      cy.wait(1000); // Wait for results to be processed

      // Ensure the "No games found" message appears
      cy.get('.cursor-default.select-none.relative.text-color-b.text-center') // This is the container for no results
      .should('contain.text', 'No games sfound'); // Assert the "No games found" message is visible
     });
    

     it('Clicks the "Amigo Gaming" checkbox', () => {
      // Ensure the filter section is visible
      cy.get('.flex-shrink-0.md\\:w-52').scrollIntoView();
    
      // ✅ Find the "Amigo Gaming" label and interact with its checkbox
      cy.contains('div.truncate', 'Belatra')
        .parents('label') // Move up to the parent label
        .click(); // ✅ Click the label to toggle the checkbox
    
      // ✅ Verify that the checkbox is now checked
      cy.contains('div.truncate', 'Belatra')
        .parents('label')
        .find('input[type="checkbox"]')
        .should('be.checked');
        });
    

      // 5. Provider Checkbox Selection
      it('5. should filter games by the "Betsoft" provider', () => {
      cy.get('button[class="relative w-full"]').click();
      // Open the provider filter section
      cy.get('.flex-shrink-0.md\\:w-52').scrollIntoView();
      cy.contains('div.truncate', 'Betsoft')
      .parents('label') // Move up to the parent label which contains the checkbox
      .find('input[type="checkbox"]') // Find the checkbox within the label
      .check(); // Check the checkbox
      // Wait for the results to update (you may adjust the wait time depending on the site’s responsiveness)
      cy.wait(1000);
    

      // Assert that the game results contain only games related to "Betsoft"
      cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto')
      .find('div.mt-2') // This is the container for each game result
      .each(($game) => {
      cy.wrap($game)
      .find('div.text-color-e') // The provider name is in this div
      .should('contain.text', 'Betsoft'); // Verify that the provider name is "1X2"
     })
      });

    it('6. should filter games by selected providers', () => {
    
    cy.get('button[class="relative w-full"]').click();

    cy.get('.flex-shrink-0.md\\:w-52').scrollIntoView();

    cy.contains('div.truncate', 'Betsoft')
    .parents('label') // Move up to the parent label which contains the checkbox
    .find('input[type="checkbox"]') // Find the checkbox within the label
    .check(); // Check the checkbox

    cy.contains('div.truncate', 'Triple Cash or Crash')
    .parents('label') // Move up to the parent label which contains the checkbox
    .find('input[type="checkbox"]') // Find the checkbox within the label
    .check(); // Check the checkbox
    cy.wait(1000);

    cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto')
    .find('div.mt-2') // This is the container for each game result
    .each(($game) => {
      cy.wrap($game)
        .find('div.text-color-e') // The provider name is in this div
        .invoke('text') // Extract the text content
        .should('match', /(Betsoft|Triple Cash or Crash)/); // Verify that the provider name is either "1X2" or "Apollo"
  

    });

     // 6. Filter games by multiple providers simultaneously
  it('6. should filter games by selected providers', () => {
    cy.get('button[class="relative w-full"]').click();

    // Scroll to the provider section and select multiple providers
    cy.get('.flex-shrink-0.md\\:w-52').scrollIntoView();

    cy.contains('div.truncate', '1X2')
      .parents('label')
      .find('input[type="checkbox"]')
      .check();

    cy.contains('div.truncate', 'Apollo')
      .parents('label')
      .find('input[type="checkbox"]')
      .check();

    cy.wait(1000);

    // Assert results match selected providers
    cy.get('.flex.items-stretch.space-x-1.flex-1.sm\\:p-4.overflow-auto')
      .find('div.mt-2')
      .each(($game) => {
        cy.wrap($game)
          .find('div.text-color-e')
          .invoke('text')
          .should('match', /(1X2|Apollo)/);
      });
  }); 
  
  });
  
  





//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.get('.provider-checkbox').first().check(); // Assuming there's a provider checkbox
//       cy.get('.game-list').should('contain', 'Book of Dead'); // Ensure filtered results are shown
//     });
  
//     // TC7: Provider Checkbox Filtering
//     it('TC7: should filter games based on provider selection', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('.provider-checkbox').first().check();
//       cy.get('.game-list').should('contain', 'Provider Name'); // Ensure games from the selected provider are shown
//     });
  
//     // TC8: Search and Multiple Providers Selection
//     it('TC8: should allow multiple provider selections', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('.provider-checkbox').eq(0).check();
//       cy.get('.provider-checkbox').eq(1).check(); // Select two providers
//       cy.get('.game-list').should('contain', 'Provider 1').and('contain', 'Provider 2'); // Verify games from both providers are listed
//     });
  
//     // TC9: Clear Search Bar
//     it('TC9: should clear the search bar', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.get('button').contains('Clear').click(); // Assuming there's a clear button
//       cy.get('input[name="search"]').should('be.empty'); // Check that the search bar is cleared
//     });
  
//     // TC10: Search and Reset Provider Filters
//     it('TC10: should reset provider filters after search', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('.provider-checkbox').first().check();
//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.get('button').contains('Reset Filters').click(); // Reset button to clear filters
//       cy.get('.provider-checkbox').should('not.be.checked'); // Ensure filters are reset
//     });
  
//     // TC11: Search with Special Characters
//     it('TC11: should handle search with special characters', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Star*Game!'); // Test special characters
//       cy.get('.game-list').should('contain', 'Star Game'); // Ensure special characters don't break search
//     });
  
//     // TC12: Search with Multiple Words
//     it('TC12: should search with multiple words', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Mega Jackpot');
//       cy.get('.game-list').should('contain', 'Mega Jackpot'); // Check if multi-word search works
//     });
  
//     // TC13: Search for a Game and Check Pagination
//     it('TC13: should handle pagination after search', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.get('.game-list').should('contain', 'Book of Dead');
//       cy.get('.pagination').should('be.visible'); // Ensure pagination is visible
//     });
  
//     // TC14: Search Results Display Correctness
//     it('TC14: should display correct search results', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.get('.game-list').children().should('have.length.greaterThan', 0); // Ensure some results are displayed
//     });
  
//     // TC15: Search Bar Clears After Modal Close
//     it('TC15: should clear search bar after closing the modal', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.get('button').contains('Close').click(); // Assuming there's a close button
//       cy.get('input[name="search"]').should('be.empty'); // Ensure the search bar is cleared
//     });
  
//     // TC16: Search Functionality After Page Refresh
//     it('TC16: should maintain search functionality after page refresh', () => {
//       cy.get('button').contains('Search Games').click();
//       cy.get('input[name="search"]').type('Book of Dead');
//       cy.reload(); // Refresh the page
//       cy.get('input[name="search"]').should('have.value', 'Book of Dead'); // Ensure search input retains its value
//       cy.get('.game-list').should('contain', 'Book of Dead'); // Ensure results are still visible
//     });
 });
  