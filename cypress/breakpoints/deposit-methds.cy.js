describe('Login and Deposit Test', () => {
    beforeEach(() => {
      cy.visit('https://nextocasino.com/?modal=login'); // Open login page
    });
  
    it('should login, close deposit popup, navigate to deposit page, scroll down, and select the specific deposit method', () => {
      // Enter valid email
      cy.get('input[name="email"]').type(Cypress.env('universal_user_name'));
  
      // Enter valid password
      cy.get('input[name="password"]').type(Cypress.env('universal_password'));
  
      // Click the submit button
      cy.get('button._secondary_i1e1t_9[type="submit"]').click();
  
      // Verify successful login
      cy.url().should('include', 'https://nextocasino.com/');
  
      // Wait for potential popup
      cy.wait(2000);
  
      // Close the deposit popup if it appears
      cy.get('button.absolute.right-3.top-3')
        .should('be.visible')
        .click();
  
      // Wait a bit to ensure smooth transition
      cy.wait(1000);
  
      // Click the main Deposit button
      cy.get('a[href="/account/financials/deposit"]')
        .first()
        .should('be.visible')
        .click({ force: true });
  
      // Verify redirection to the deposit page
      cy.url().should('include', '/account/financials/deposit');
  
      // Scroll down to ensure deposit options are visible
      cy.scrollTo('bottom');
      cy.wait(1000);
  
      // Ensure the iframe containing deposit methods is present
      cy.get('iframe.w-full.h-full').should('be.visible');
  
      // Access the iframe's content and click on the specific deposit method (e.g., Mastercard)
      cy.get('iframe.w-full.h-full')
        .its('0.contentDocument')
        .should('exist')
        .then((iframe) => {
          const iframeBody = iframe.body;
          cy.wrap(iframeBody)
            .find('a[href="/financials/deposit/ft9xIZC1QbG3MSkS195Ko3mLJ3dKUu2Y61C5YehW0x7e9N3DKZCXi6Sv-SLzhWx76p_swTk3ocZyuUz7Q_gniw"]')
            .should('be.visible')
            .click();
        });
  
      // Verify that the URL now includes the deposit method path
      cy.url().should('include', '/financials/deposit/');
    });
  });
  