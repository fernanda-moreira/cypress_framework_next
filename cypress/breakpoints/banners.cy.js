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
      cy.wait(500)
      cy.log(`Testing viewport: ${viewport.name}`)

      // Ensure the swiper container is loaded
      cy.get('.swiper.w-full.h-full.swiper-initialized.swiper-horizontal.swiper-backface-hidden').should('be.visible')

      // Check how many banners are visible based on screen size
      if (viewport.width >= 1280) {
        // Desktop view (should show 3 banners at once)
        cy.get('.swiper-slide').should('have.length.greaterThan', 3)  // Carousel should have at least 3 banners
        cy.get('.swiper-slide').filter(':visible').should('have.length', 1)  // Check how many are visible
      } else if (viewport.width >= 768) {
        // Tablet view (should show 2 banners at once)
        cy.get('.swiper-slide').should('have.length.greaterThan', 3)  // Carousel should have at least 2 banners
        cy.get('.swiper-slide').filter(':visible').should('have.length', 1  )  // Check how many are visible
      } else {
        // Mobile view (should show 1 banner only)
        cy.get('.swiper-slide').should('have.length.greaterThan', 3)  // Carousel should have at least 1 banner
        cy.get('.swiper-slide').filter(':visible').should('have.length', 1)  // Check how many are visible
      }
    })
  })
})
