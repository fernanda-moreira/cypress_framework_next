/// <reference types="cypress" />

describe('Responsive Game Display Testing', () => {
    beforeEach(() => {
      cy.visit('https://campeonbet.com/') // Replace with actual URL
      cy.wait(2000) // Wait for games to load dynamically
    })
  
    // Define viewports and expected game count per screen size
    const viewports = [
      { name: 'Desktop (1536x845)', width: 1536, height: 845, isDesktop: true, expectedGames: 6 },
      { name: 'iPad-2 (768x1024)', width: 768, height: 1024, isDesktop: false, expectedGames: 4 },
      { name: 'iPhone-6+ (414x736)', width: 414, height: 736, isDesktop: false, expectedGames: 2 },
      { name: 'iPhone-6/7/8 (375x667)', width: 375, height: 667, isDesktop: false, expectedGames: 2 },
      { name: 'iPhone-13 (390x884)', width: 390, height: 884, isDesktop: false, expectedGames: 2 },
      { name: 'Samsung (360x800)', width: 360, height: 800, isDesktop: false, expectedGames: 2 }
    ]
  
    viewports.forEach((viewport) => {
      it(`Should display the correct number of games on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.wait(1000) // Allow UI to adjust
  
        cy.log(`Testing viewport: ${viewport.name}`)
  
        // Ensure game grid is loaded
        cy.get('.game-grid, .games-list') // Replace with actual class selector
          .should('be.visible')
  
        // Check number of visible games
        cy.get('.game-card:visible') // Replace with actual game card selector
          .should('have.length', viewport.expectedGames)
      })
    })
  })
  





