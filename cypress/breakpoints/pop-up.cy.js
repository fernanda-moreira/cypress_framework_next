/// <reference types="cypress" />

describe('Responsive Login Testing', () => {
    beforeEach(() => {
      cy.visit('https://campeonbet.com/')
    })
  
    // Viewports 
    const viewports = [
      { name: 'Desktop (1536x845)', width: 1536, height: 845, isDesktop: true },
      { name: 'iPad-2 (768x1024)', width: 768, height: 1024, isDesktop: false },
      { name: 'iPhone-6+ (414x736)', width: 414, height: 736, isDesktop: false },
      { name: 'iPhone-6/7/8 (375x667)', width: 375, height: 667, isDesktop: false },
      { name: 'iPhone-13 (390x884)', width: 390, height: 884, isDesktop: false },
      { name: 'Samsung (360x800)', width: 360, height: 800, isDesktop: false }
    ]
  
    viewports.forEach((viewport) => {
      it(`Tests pop-up visibility on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.wait(500)
        cy.log(`Testing viewport: ${viewport.name}`)
  
        // ✅ Scroll 60% down the page to trigger the pop-up
        cy.scrollTo('0%', '60%', { duration: 1500 }) // Scroll to 60% of the page height
        cy.wait(1000) // Wait for any animations or delays
  
        // ✅ Assert pop-up is visible
        cy.get('.bg-color-b.fixed.w-80.sm\\:w-100.rounded-xl.left-0.right-0.mx-auto.z-10._initial_1yjze_1._slideUp_1yjze_7.h-40.-bottom-40')
          .should('be.visible')
      })
    })
  })
  