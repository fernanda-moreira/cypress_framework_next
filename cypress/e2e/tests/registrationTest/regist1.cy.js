describe('Register Now Page - Modal 1 Tests', () => {
    beforeEach(() => {
      cy.visit('https://nextocasino.com/?modal=register'); // Open the registration page
    });
  
    // 1. Test: Verify the page loads correctly
    it(' 1. should load the register now page', () => {
      cy.url().should('include', 'modal=register'); // Check the page URL
      cy.get('input[name="email"]').should('be.visible'); // Ensure email field is visible
      cy.get('input[name="password"]').should('be.visible'); // Ensure password field is visible
      cy.get('select[name="currency"]').should('be.visible'); // Ensure currency dropdown is visible
    });
  
    // 2. Test: Verify the email field is required
    it(' 2. should display error for empty email field', () => {
      cy.get('input[name="email"]').clear(); // Clear the email field
      cy.get('input[name="password"]').type('ValidPassword123'); // Enter a valid password
      
      // Click the 'Continue' button (adjust the selector if necessary)
      cy.get('button').contains('Continue').click(); // Ensure 'Continue' is inside a button or other correct element
    
      // Check for the error message that should appear (use the correct selector for the error message)
      cy.get('.text-sm.block.text-color-i.mt-1')  // This is the error message selector you provided
        .should('contain', 'Email is a required field'); // Check that the error message is correct
    });
  
    // 3. Test: Verify valid email submission
    it(' 3. should submit the form with a valid email and proceed to the next stage', () => {
      // Step 1: Fill out the form with valid information
      cy.get('input[name="email"]').type('test@test.com'); // Enter a valid email
      cy.get('input[name="password"]').type('ValidPassword123'); // Enter a valid password
      cy.get('select[name="currency"]').select('EUR'); // Select EUR currency
      cy.get('input[name="bonusCode"]').type('DISCOUNT10'); // Enter an optional promo code
      
      // Step 2: Click the 'Continue' button to submit the form
      cy.get('button').contains('Continue').click(); // Ensure 'Continue' is inside a button or other correct element
      
      // Step 3: Wait for the second modal to appear and check for visibility
      cy.get('.w-full.text-center.mt-8.mt-8.font-medium', { timeout: 10000 }).should('be.visible'); // Ensure modal appears within 10 seconds
  
    });
  
    // 4. Test: Verify password field is required
    it(' 4. should display error for empty password field', () => {
      cy.get('input[name="email"]').type('test@test.com'); // Enter email
      cy.get('input[name="password"]').clear(); // Clear the password field
      cy.get('button').contains('Continue').click(); // Ensure 'Continue' is inside a button or other correct element
      cy.get('.text-sm.block.text-color-i.mt-1')  // This is the error message selector you provided
        .should('contain', 'Password must be at least 6 characters'); // Check that the error message is correct
    });
   
  
    // 5. Test: Verify currency dropdown selection
    it(' 5. should allow currency selection', () => {
      cy.get('select[name="currency"]').select('AUD'); // Select AUD
      cy.get('select[name="currency"]').should('have.value', 'AUD'); // Verify selected value
    });
  
    // 6. Test: Verify that the "Bonus Code" field is optional
    it(' 6. should not show an error if bonus code is not provided', () => {
      cy.get('input[name="email"]').type('test@test.com'); // Enter valid email
      cy.get('input[name="password"]').type('ValidPassword123'); // Enter valid password
      cy.get('select[name="currency"]').select('EUR'); // Select currency
      cy.get('input[name="bonusCode"]').clear(); // Leave bonus code field empty
      
      cy.get('button').contains('Continue').click(); // Click 'Continue'
      
      // Check that no error is displayed for the bonus code field
      cy.get('.text-sm.block.text-color-i.mt-1')  // This is the error message selector you provided
      .should('not.exist'); // Ensure that no error message appears for the bonus code field
        });
  
        
  
    // 7. Test: Verify email format validation
    it(' 7. should show error for invalid email format', () => {
      cy.get('input[name="email"]').type('invalid-email'); // Enter invalid email format
      cy.get('input[name="password"]').type('ValidPassword123'); // Enter valid password
      cy.get('select[name="currency"]').select('USD'); // Select currency
      cy.get('button').contains('Continue').click(); // Click 'Continue'
  
      // Check that an error message for email format is displayed
      cy.get('.text-sm.block.text-color-i.mt-1')  // This is the error message selector you provided
        .should('contain', 'Email must be a valid email'); // Adjust based on actual error message for invalid email format
    });
      
    // 8. Test: Verify error messages for empty required fields after clicking the "Continue" button
    it(' 8. should show error messages for empty email and password fields', () => {
      // Step 1: Clear the email and password fields
      cy.get('input[name="email"]').clear(); // Clear the email field
      cy.get('input[name="password"]').clear(); // Clear the password field
  
      // Step 2: Click the 'Continue' button to submit the form with empty fields
      cy.get('button').contains('Continue').click(); // Click the 'Continue' button
  
      // Step 3: Verify the error message for the email field
      cy.get('.text-sm.block.text-color-i.mt-1') // Selector for the email error message
        .should('contain', 'Email is a required field'); // Check if email error message appears
  
      // Step 4: Verify the error message for the password field
      cy.get('.text-sm.block.text-color-i.mt-1') // Selector for the password error message
        .should('contain', 'Password must be at least 6 characters'); // Check if password error message appears
  
        // 9. Test: Verify "Currency" dropdown contains all expected values
    it(' 9. should have all the expected currencies in the dropdown', () => {
      const expectedCurrencies = ['USD', 'EUR', 'GBP', 'AUD', 'BRL' , 'CAD' ,'NZD']; // List of expected currency options
  
      cy.get('select[name="currency"]').within(() => {
        expectedCurrencies.forEach(currency => {
          cy.get('option').contains(currency).should('exist'); // Ensure each expected currency option exists in the dropdown
        });
      });
    });
  
    });
    
      it('9. Should give an apropriate error message for each type of weak password ', () => {
      // Visit the registration page
      cy.visit('https://nextocasino.com/?modal=register');
    
      // Enter a valid email to trigger the password validation flow
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('select[name="currency"]').select('USD');
    
      // Test: Password with less than 6 characters
      cy.get('input[name="password"]').type('aaaaa'); // Less than 6 characters
      cy.get('button').contains('Continue').click(); // Press Continue
      cy.get('div.text-sm.block.text-color-i.mt-1')
        .should('contain', 'Password must be at least 6 characters');
    
      // Test: Password with more than 6 characters but no uppercase letters
      cy.get('input[name="password"]').clear().type('aaaaaa'); // No uppercase letters
      cy.get('button').contains('Continue').click(); // Press Continue
      cy.get('div.text-sm.block.text-color-i.mt-1')
        .should('contain', 'Password must have at least 1 uppercase letter');
    
      // Test: Password with uppercase letters but no numbers or special characters
      cy.get('input[name="password"]').clear().type('Aaaaaa'); // Uppercase letters, no number/special character
      cy.get('button').contains('Continue').click(); // Press Continue
      cy.get('div.text-sm.block.text-color-i.mt-1')
        .should('contain', 'Password must have at least 1 number or special character (@,!,#, etc).');
    
      // Test: Valid password starting with uppercase
      cy.get('input[name="password"]').clear().type('Apassword1!'); // Valid password
      cy.get('button').contains('Continue').click(); // Press Continue
      cy.get('div.text-sm.block.text-color-i.mt-1').should('not.exist'); // No error message
  
    });
    
       // 10. Test: Verify successful registration
      it(' 10. should register successfully with valid information', () => {
      cy.get('input[name="email"]').type('test@test.com'); // Valid email
      cy.get('input[name="password"]').type('ValidPassword123'); // Valid password
      cy.get('select[name="currency"]').select('USD'); // Select USD currency
      cy.get('input[name="bonusCode"]').type('NEWUSER'); // Enter promo code
      cy.get('button').contains('Continue').click(); // Ensure 'Continue' is inside a button or other correct element
  
      cy.get('div._modal_72swt_1._lg_72swt_20').should('be.visible');
    });
 
      // 11. Modal closes correctly when close button (X) is clicked
      it('11. should close the modal when close button (X) is clicked', () => {
      // Ensure the modal is visible first before interacting with it
      cy.get('svg.w-8.h-8.text-color-e')
      .should('be.visible')  // Ensure the close button is visible before clicking
      .click();  // Click the close button

      // Wait for the modal to disappear after the click
      cy.get('div._modal_72swt_1._lg_72swt_20', { timeout: 10000 })  // Correct modal class
      .should('not.exist');  // Ensure the modal no longer exists

    });
     
    // 12. should show error for passwords less than 6 characters
      it('12. should show error for passwords less than 6 characters', () => {
      cy.get('input[name="email"]').type('test@example.com'); // Enter a valid email
      cy.get('input[name="password"]').type('abc'); // Password less than 6 characters
      cy.get('button').contains('Continue').click(); // Click the Continue button
  
      // Verify error message
      cy.get('.text-sm.block.text-color-i.mt-1')
        .should('contain', 'Password must be at least 6 characters'); // Adjust the selector and message as needed
    });

      // 13. should show error for passwords without uppercase letters 
      it('13. should show error for passwords without uppercase letters', () => {
      cy.get('input[name="email"]').type('test@example.com'); // Enter a valid email
      cy.get('input[name="password"]').type('password123'); // No uppercase letters
      cy.get('button').contains('Continue').click(); // Click the Continue button
  
      // Verify error message
      cy.get('.text-sm.block.text-color-i.mt-1')
        .should('contain', 'Password must have at least 1 uppercase letter');
    });
  

    // 14.should show error for passwords without numbers or special characters
    it('14. should show error for passwords without numbers or special characters', () => {
      cy.get('input[name="email"]').type('test@example.com'); // Enter a valid email
      cy.get('input[name="password"]').type('Password'); // No numbers or special characters
      cy.get('button').contains('Continue').click(); // Click the Continue button
  
      // Verify error message
      cy.get('.text-sm.block.text-color-i.mt-1')
        .should('contain', 'Password must have at least 1 number or special character (@,!,#, etc).');
    });

  //   it('should show an error for an invalid or expired promo code', () => {
  //     cy.visit('https://nextocasino.com/?modal=register'); // Open the registration page
    
  //     // Fill out valid fields
  //     cy.get('input[name="email"]').type('test@example.com'); // Enter a valid email
  //     cy.get('input[name="password"]').type('ValidPassword1!'); // Enter a valid password
  //     cy.get('select[name="currency"]').select('USD'); // Select currency
    
  //     // Enter an invalid or expired promo code
  //   cy.get('input[name="bonusCode"]').type('EXPIRED123'); // Enter invalid promo code
  //   cy.get('button').contains('Continue').click(); // Click Continue

  //  // Verify error message for the promo code
  //   cy.get('.text-sm.block.text-color-e') // Adjust to the label or error message container
  //     .should('contain', 'Promo code is invalid or expired'); // Check for appropriate error message
  //   });
    
    
 
      
  
  });
  
 
  
  