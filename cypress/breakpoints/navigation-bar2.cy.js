/// <reference types="cypress" />

describe('Responsive Navbar Testing' , () => {
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
      it(`Tests navbar visibility on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.wait(500)
        cy.log(`Testing viewport: ${viewport.name}`)
  
        if (viewport.isDesktop) {
          // For desktop, the desktop navbar should be visible and the mobile menu button hidden
          cy.get('.2xl\\:flex').should('be.visible')
          cy.get('.mr-6.xl\\:hidden').should('not.be.visible')
        } else {
          // For tablet/mobile, the desktop navbar should be hidden and the mobile menu button visible
          cy.get('.2xl\\:flex').should('not.be.visible')
          cy.get('.mr-6.xl\\:hidden').should('be.visible')
          // Click the mobile menu button and verify that the sidebar appears
          cy.get('.mr-6.xl\\:hidden').click()
          cy.get('._sidebar_hed3z_5').should('be.visible')
        }
      })
    })
  
    // Optional: Separate test case specifically testing menu opening on iPhone 6/7/8
    it('Tests if iphone-6/7/8 menu opens when clicked', () => {
      cy.viewport(375, 667)
      cy.wait(500)
      cy.log('Testing menu click on iphone-6/7/8 (375x667)')
      cy.get('.mr-6.xl\\:hidden').should('be.visible')
      cy.get('.mr-6.xl\\:hidden').click()
      cy.get('._sidebar_hed3z_5').should('be.visible')
    })
  })
  