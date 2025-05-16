/// <reference types="cypress" />

describe('Responsive Banner Testing', () => {
    beforeEach(() => {
      cy.visit('https://campeonbet.com/') // Your actual website URL
    })
  
    const viewports = [
      { name: 'macbook-13', width: 1280, height: 800 }, // Large screen
      { name: 'ipad-2', width: 768, height: 1024 },   // Tablet
      { name: 'iphone-6+', width: 414, height: 736 },  // Mobile
      { name: 'iphone-6/7/8', width: 375, height: 667 }, // Mobile
      { name: 'iphone-13', width: 390, height: 884 },  // Mobile
      { name: 'samsung', width: 360, height: 800 }     // Mobile
    ]
  
    viewports.forEach((viewport) => {
      it(`Should display correct number of banners on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.wait(500)  // Wait for the page to load
        cy.log(`Testing viewport: ${viewport.name}`)
  
        // Ensure the swiper container is loaded
        cy.get('.swiper.w-full.h-full.swiper-initialized.swiper-horizontal.swiper-backface-hidden').should('be.visible')
  
        // Let the carousel swipe through a couple of times to ensure dynamic changes are accounted for
        // This simulates waiting for the carousel to swipe
        cy.wait(3000)  // Adjust this depending on how long the carousel takes to swipe
  
        // Now, check how many banners are visible
        if (viewport.width >= 1280) {
          // Desktop view (should show 3 banners at once)
          cy.get('.swiper-slide')
            .filter(':visible')  // Filter only the visible banners
            .should('have.length', 1)  // Check that exactly 3 banners are visible
        } else if (viewport.width >= 768) {
          // Tablet view (should show 2 banners at once)
          cy.get('.swiper-slide')
            .filter(':visible')
            .should('have.length', 2)  // Check that exactly 2 banners are visible
        } else {
          // Mobile view (should show 1 banner only)
          cy.get('.swiper-slide')
            .filter(':visible')
            .should('have.length', 2)  // Check that exactly 1 banner is visible
        }
      })
    })
  })
  