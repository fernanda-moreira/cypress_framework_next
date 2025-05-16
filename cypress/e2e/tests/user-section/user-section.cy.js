describe('Account Tests - After Successful Login', () => {
    beforeEach(() => {
      // Open the login page
      cy.visit('https://nextocasino.com/?modal=login');
  
      // Perform login
      cy.get('input[name="email"]').type(Cypress.env('universal_user_name'));
      cy.get('input[name="password"]').type(Cypress.env('universal_password'));
      cy.get('button[type="submit"]').click(); // Click submit button
  
      // Handle the welcome popup (if present)
      cy.get('svg.w-8.h-8.text-color-e', { timeout: 5000 }).should('be.visible').click(); // Close the modal
  
      // Ensure login is successful by checking for a unique user element
      cy.get('svg.w-5.h-5.text-color-b').should('be.visible'); // User icon
  
      // Navigate to profile page
      cy.get('div._circle_1wwlr_1 svg', { timeout: 5000 }).should('be.visible').click(); // Click the user icon
      cy.get('div.capitalize.block')
        .contains('my profile') // Locate and click the "my profile" link
        .click(); // Click it
  
      // Wait for the iframe to load and ensure the #app element is inside the iframe
      cy.get('#app > div._layout_e8ze2_11 > div.max-w-screen-3xl.w-full.mx-auto.relative > iframe', { timeout: 15000 }) // Your iframe selector
        .should('exist') // Wait for iframe to exist
        .and('be.visible'); // Ensure the iframe is visible
  
      // Switch to the iframe's body content using cy.get and cy.contents()
      cy.get('#app > div._layout_e8ze2_11 > div.max-w-screen-3xl.w-full.mx-auto.relative > iframe')
        .its('0.contentDocument.body')
        .should('not.be.empty') // Ensure the iframe body is not empty
        .then(cy.wrap); // Wrap the body content for further commands
    });
  
    it('1. Verifies personal details and KYC status', () => {
      // Ensure we are inside the iframe before searching for "Personal Information"
      cy.get('#app > div._layout_e8ze2_11 > div.max-w-screen-3xl.w-full.mx-auto.relative > iframe')
        .its('0.contentDocument.body')
        .should('not.be.empty')
        .then(cy.wrap) // Wrap the body so Cypress knows where to search
        .contains('Personal Information')
        .should('be.visible');
    });
  
    it('2. Should contain all required information inside #app', () => {
      // Define the key content to verify inside the iframe
      const contentChecks = [
        'Test Test', // User name or text
        'KYC unverified', // KYC status
        'Real money',
        '€603.58', // Real money amount
        'Bonus money',
        '€0.00', // Bonus money amount
        'My account', // My account section
        'Bonuses', // Bonuses section
        'Available', // Bonuses options
        'Active', // Bonuses options
        'Financials', // Financials section
        'Responsible gaming', // Responsible gaming section
        'Time-Out / Self-exclusion', // Responsible gaming option
      ];
  
      // Verify all the text content is present inside the iframe's body
      contentChecks.forEach((text) => {
        cy.get('body').contains(text).should('exist');
      });
  
      // Verify dropdown options under "My Account" inside the iframe
      const dropdownOptions = [
        'Personal info',
        'Documents',
        'Change password',
        'Messages',
      ];
  
      dropdownOptions.forEach((option) => {
        cy.get('body').contains(option).should('exist');
      });
  
      // Verify options under "Financials" inside the iframe
      const financialOptions = ['Deposit', 'Withdraw', 'Pending withdraws'];
      financialOptions.forEach((option) => {
        cy.get('body').contains(option).should('exist');
      });
    });
  
    // Other test cases as before...
  });
  