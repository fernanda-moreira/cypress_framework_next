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
      it(`Tests navbar visibility on ${viewport.name}`, () => {
        cy.viewport(viewport.width, viewport.height)
        cy.wait(500)
        cy.log(`Testing viewport: ${viewport.name}`)
  
        if (viewport.isDesktop) {
          // ✅ Desktop: Navbar should be visible, mobile menu should NOT be visible
          cy.get('._primary_i1e1t_1.inline-block.font-medium.uppercase.relative.rounded-full.py-1\\.5.px-4.md\\:py-2.text-sm')
            .should('be.visible')

        } else {
          // ✅ Mobile/Tablet: Navbar should be hidden, mobile menu should be visible
          cy.get('.uppercase.text-color-e.transition-colors.hover\\:text-color-b.text-sm.font-medium')
          .should('be.visible')
//uppercase text-color-e transition-colors hover:text-color-b text-sm font-medium 
//
        }
      })
    })

  })
  //Get all the test cases from this code 
  //Finish those who are still waiting 
  //Understand which 