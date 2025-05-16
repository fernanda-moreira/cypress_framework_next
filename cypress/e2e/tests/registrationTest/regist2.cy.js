describe('Register Now Page Tests', () => {
  
    beforeEach(() => {
      cy.visit('https://nextocasino.com/?modal=register'); // Open the registration page
    });
  
    // 1. Test: Complete the first phase and move to the second phase
    it('1. should complete the first phase and move to the second phase and check visibility of all fields', () => {
        // Step 1: Fill out the first phase form with valid details
        cy.get('input[name="email"]').type('johndoe@example.com'); // Enter email
        cy.get('input[name="password"]').type('ValidPassword123');
        cy.get('select[name="currency"]').select('USD');
        cy.get('button').contains('Continue').click();
    
        // Verify that the required form fields are present in the second phase
        cy.get('input[name="firstName"]').should('be.visible');
        cy.get('input[name="lastName"]').should('be.visible');
        cy.get('select[name="gender"]').should('be.visible');  // Gender dropdown should be visible
        cy.get('select[name="gender"]').children('option').should('have.length.greaterThan', 1); // Ensure there are options in the select
    
        // Optionally, check that specific options (like Male, Female) are present in the select dropdown
        cy.get('select[ name="gender"]').contains('Male');  // Ensure 'Male' option is in the select dropdown
        cy.get('select[name="gender"]').contains('Female');  // Ensure 'Female' option is in the select dropdown
    
        // Verify that the Mobile Number dropdown is present and functional
        cy.get('select.outline-none.bg-color-c.border-1.border-color-g').should('be.visible'); // Ensure the Mobile Number dropdown is visible
        cy.get('select.outline-none.bg-color-c.border-1.border-color-g').children('option').should('have.length.greaterThan', 1); // Ensure there are multiple options in the dropdown
    
        // Optionally, check specific country code options
        cy.get('select.outline-none.bg-color-c.border-1.border-color-g').contains('+1'); // Ensure '+1' is an option
        cy.get('select.outline-none.bg-color-c.border-1.border-color-g').contains('+998'); // Ensure '+998' is an option
    
        // Verify the checkbox
        cy.get('input[type="checkbox"][name="accept"]').should('be.visible'); // Ensure the checkbox is visible
        cy.get('input[type="checkbox"][name="accept"]').should('not.be.checked'); // Verify the checkbox is not checked by default
      });
  
    // 2. Test: Validate small first name input
    it('2. should display an error if first name is less than 2 characters after clicking continue', () => {
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="password"]').type('ValidPassword123');
      cy.get('select[name="currency"]').select('USD');
      cy.get('button').contains('Continue').click();
  
      cy.get('input[name="firstName"]').should('be.visible');
      cy.get('input[name="firstName"]').type('J').blur();
      
      cy.get('button').contains('Continue').click();
  
      cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'First name must be at least 2 characters');
    });
  
    // 3. Test: Validate small last name input
    it('3. should display an error if last name is less than 2 characters after clicking continue', () => {
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="password"]').type('ValidPassword123');
      cy.get('select[name="currency"]').select('USD');
      cy.get('button').contains('Continue').click();
  
      cy.get('input[name="lastName"]').should('be.visible');
      cy.get('input[name="lastName"]').type('J').blur();
      cy.get('button').contains('Continue').click();
  
      cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'Last name must be at least 2 characters');
    });
  
    // // 4. Test: Validate missing date of birth
    // it('4. should display an error if date of birth is not selected after clicking continue', () => {
    //   cy.get('input[name="email"]').type('johndoe@example.com');
    //   cy.get('input[name="password"]').type('ValidPassword123');
    //   cy.get('select[name="currency"]').select('USD');
    //   cy.get('button').contains('Continue').click();
  
    //   cy.get('input[name="dob"]').should('be.visible').and('not.have.value');
    //   cy.get('button').contains('Continue').click();
      
    //   cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'Date of birth is required');
    // });
  
    // 5. Test: Validate missing gender selection
    it('5. should display an error if gender is not selected after clicking continue', () => {
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="password"]').type('ValidPassword123');
      cy.get('select[name="currency"]').select('USD');
      cy.get('button').contains('Continue').click();
  
      cy.get('select[name="gender"]').should('be.visible');
      cy.get('button').contains('Continue').click();
  
      cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'Gender is a required field');
    });
  
    // 6. Test: Validate missing city input
    it('6. should display an error if city is not entered after clicking continue', () => {
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="password"]').type('ValidPassword123');
      cy.get('select[name="currency"]').select('USD');
      cy.get('button').contains('Continue').click();
  
      cy.get('input[name="city"]').should('be.visible');
      cy.get('button').contains('Continue').click();
  
      cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'City is a required field');
    });
  


    // 7. Test: Validate invalid phone number input
    it('7. phone number is invalid', () => {
        // Step 1: Complete the first phase to reach the second phase
        cy.get('input[name="email"]').type('johndoe@example.com'); // Enter email
        cy.get('input[name="password"]').type('ValidPassword123');
        cy.get('select[name="currency"]').select('USD');
        cy.get('button').contains('Continue').click(); // Click continue to move to the second phase
        cy.wait(10000)
    

        // Step 3: Enter an invalid phone number 
        cy.get('w-2/3').type('fffffff'); // Invalid phone number input
      
        // Step 4: Click the "Continue" button to trigger validation
        cy.get('button').contains('Continue').click(); // Click continue to trigger validation
      
        // Step 5: Check that the error message is shown for invalid phone number
        cy.get('div.text-sm block text-color-i mt-1').should('contain', 'Invalid phone number'); // Verify the error message in the div
      });
      
       
    // 8. Test: Validate small address input
    it('8. should display an error if address is less than 2 characters after clicking continue', () => {
      cy.get('input[name="email"]').type('johndoe@example.com');
      cy.get('input[name="password"]').type('ValidPassword123');
      cy.get('select[name="currency"]').select('USD');
      cy.get('button').contains('Continue').click();
  
      cy.get('input[name="houseNumberAndStreetName"]').should('be.visible');
      cy.get('input[name="houseNumberAndStreetName"]').type('A').blur();
      cy.get('button').contains('Continue').click();
  
      cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'Address must be at least 2 characters');
    });
    
    it('9. should display a red border on the terms checkbox if not selected', () => {
        cy.get('input[name="email"]').type('johndoe@example.com');
        cy.get('input[name="password"]').type('ValidPassword123');
        cy.get('select[name="currency"]').select('USD');
        cy.get('button').contains('Continue').click();
      
        // Trigger validation by clicking "Continue" without selecting the checkbox
        cy.get('button').contains('Continue').click();
      
        // Verify the checkbox has the resolved red border color
        cy.get('input[name="accept"]')
          .should('have.css', 'border-color', 'rgb(240, 82, 82)'); // Validating against the resolved red color
      });
      
       describe('Positive Registration Flow Test', () => {
  
        beforeEach(() => {
          cy.visit('https://nextocasino.com/?modal=register'); // Open the registration page
        });
        
        it('should redirect to the next modal after completing the registration form correctly', () => {
          // Step 1: Complete the first phase to reach the second phase
          cy.get('input[name="email"]').type('johndoe@example.com'); // Enter a valid email
          cy.get('input[name="password"]').type('ValidPassword123'); // Enter a valid password
          cy.get('select[name="currency"]').select('USD'); // Select a valid currency
          cy.get('button').contains('Continue').click(); // Click continue to move to the second phase
      
          // Step 2: Fill out the second phase form correctly
          cy.get('input[name="firstName"]').type('John'); // Enter a valid first name
          cy.get('input[name="lastName"]').type('Doe'); // Enter a valid last name
          cy.get('select[name="gender"]').select('Male'); // Select gender
          cy.get('select').eq(5).select('+7').should('have.value', '+7');  // Asserts that the value is now "+7"
          cy.get('input[name="city"]').type('New York'); // Enter a valid city
          cy.get('input[name="houseNumberAndStreetName"]').type('123 Main St'); // Enter a valid address
          //cy.get('select[name="phoneCode"]').select('+1'); // Select valid country code
          cy.get('input[name="phoneNumber"]').type('1234567890'); // Enter a valid phone number
          cy.get('input[name="accept"]').check(); // Check the accept terms checkbox
      
          // Step 3: Click continue to trigger registration submission
          cy.get('button').contains('Continue').click(); // Click continue to submit the form
      
          // Step 4: Verify that the user is redirected to the next modal or page
          // Assuming the next modal contains a specific element (like a heading or success message)
          cy.get('.modal-header').should('contain', 'Welcome'); // Check that the next modal is displayed with a welcome message
      
          // Optionally, verify the URL or other elements to confirm successful redirection
          cy.url().should('include', '/welcome'); // Check that the URL contains the '/welcome' path (if applicable)
      
          // If the modal has a close button, you can test for its visibility
          cy.get('.close-modal-button').should('be.visible'); // Ensure the close modal button is visible
        });
      });
      

      
      
  
    // // The error message should be displayed on the first screen, but it actually after the second stage of registration
    // it('9. should display an error if the email is already registered', () => {
    //     cy.get('input[name="email"]').type('test@test.com');
    //     cy.get('input[name="password"]').type('ValidPassword123');
    //     cy.get('select[name="currency"]').select('USD');
    //     cy.get('button').contains('Continue').click();
  
    //     cy.get('div.text-sm.block.text-color-i.mt-1').should('contain', 'Email is already registered');
    // });

  


      


});

    
  