describe('Footer Structure Testing', () => {
    beforeEach(() => {
      cy.visit('https://campeonbet.com/'); // Replace with your actual URL
      cy.scrollTo('bottom'); // Scroll to the bottom to ensure the footer is in view
      cy.wait(500); // Wait for any animations or delays
    });
  
    it('Should verify the footer and its subdivisions', () => {
      // Ensure the footer is present
      cy.get('footer.bg-color-f').should('exist');


    });
});