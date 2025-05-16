/// <reference types="cypress" />

describe('Responsive Navbar Testing', () => {
  beforeEach(() => {
    cy.visit('https://campeonbet.com/') // Your actual website URL
  })

  // Test case 1: Desktop
  it('1. Tests navbar visibility on Desktop (1536x845)', () => {
    cy.viewport(1536, 845)
    cy.wait(500)
    cy.log('Testing viewport: Desktop (1536x845)')

    // For large screens, the desktop navbar should be visible
    cy.get('.2xl\\:flex').should('be.visible')
    // Mobile menu button should NOT be visible
    cy.get('.mr-6.xl\\:hidden').should('not.be.visible')
  })

  // Test case 2: iPad-2 (Tablet)
  it('2. Tests navbar visibility on ipad-2 (768x1024)', () => {
    cy.viewport(768, 1024)
    cy.wait(500)
    cy.log('Testing viewport: ipad-2 (768x1024)')

    // For tablet screens, the desktop navbar should be hidden and the mobile menu button should be visible
    cy.get('.2xl\\:flex').should('not.be.visible')
    cy.get('.mr-6.xl\\:hidden').should('be.visible')
    
    // Click the mobile menu button and verify that the mobile sidebar appears
    cy.get('.mr-6.xl\\:hidden').click()
    cy.get('._sidebar_hed3z_5').should('be.visible')
  })

  // Test case 3: iPhone-6+ (Mobile)
  it('3. Tests navbar visibility on iphone-6+ (414x736)', () => {
    cy.viewport(414, 736)
    cy.wait(500)
    cy.log('Testing viewport: iphone-6+ (414x736)')
    cy.get('.mr-6.xl\\:hidden').should('be.visible')
    cy.get('.mr-6.xl\\:hidden').click()
    cy.get('._sidebar_hed3z_5').should('be.visible')
  })

  // Test case 4: iPhone-6/7/8 (Mobile)
  it('4. Tests navbar visibility on iphone-6/7/8 (375x667)', () => {
    cy.viewport(375, 667)
    cy.wait(500)
    cy.log('Testing viewport: iphone-6/7/8 (375x667)')
    cy.get('.mr-6.xl\\:hidden').should('be.visible')
    cy.get('.mr-6.xl\\:hidden').click()
    cy.get('._sidebar_hed3z_5').should('be.visible')
  })

  // Test case 5: iPhone-13 (Mobile)
  it('5. Tests navbar visibility on iphone-13 (390x884)', () => {
    cy.viewport(390, 884)
    cy.wait(500)
    cy.log('Testing viewport: iphone-13 (390x884)')
    cy.get('.mr-6.xl\\:hidden').should('be.visible')
    cy.get('.mr-6.xl\\:hidden').click()
    cy.get('._sidebar_hed3z_5').should('be.visible')
  })

  // Test case 6: Samsung (Mobile)
  it('6. Tests navbar visibility on samsung (360x800)', () => {
    cy.viewport(360, 800)
    cy.wait(500)
    cy.log('Testing viewport: samsung (360x800)')

    cy.get('.mr-6.xl\\:hidden').should('be.visible')
    cy.get('.mr-6.xl\\:hidden').click()
    cy.get('._sidebar_hed3z_5').should('be.visible')
  })

  // Optional: Separate test case specifically testing menu opening on iPhone 6/7/8
  it('7. Tests if iphone-6/7/8 menu opens when clicked', () => {
    cy.viewport(375, 667)
    cy.wait(500)
    cy.log('Testing menu click on iphone-6/7/8 (375x667)')

    cy.get('.mr-6.xl\\:hidden').should('be.visible')
    cy.get('.mr-6.xl\\:hidden').click()
    cy.get('._sidebar_hed3z_5').should('be.visible')
  })
})
