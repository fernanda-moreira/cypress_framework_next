class FooterPage {
    verificaFooterTermsAndConditions() {
        cy.get('a[href="/templates/terms_and_conditions"]').should('be.visible').click();
        cy.url().should('include', '/templates/terms_and_conditions');
    }

    verificaFooterPrivacyPolicy() {
        cy.get('a[href="/templates/privacy_policy"]').should('be.visible').click();
        cy.url().should('include', '/templates/privacy_policy');
    }

    verificaFooterResponsibleGaming() {
        cy.get('a[href="/templates/responsible_gaming"]').should('be.visible').click();
        cy.url().should('include', '/templates/responsible_gaming');
    }

    verificaFooterAboutUs() {
        cy.get('a[href="/templates/about_us"]').should('be.visible').click();
        cy.url().should('include', '/templates/about_us');
    }

    verificaFooterContactUs() {
        cy.get('a[href="/templates/contact_us"]').should('be.visible').click();
        cy.url().should('include', '/templates/contact_us');
    }

    verificaFooterFAQ() {
        cy.get('a[href="/templates/faq"]').should('be.visible').click();
        cy.url().should('include', '/templates/faq');
    }

    verificaFooterPayments() {
        cy.get('a[href="/payments"]').should('be.visible').click();
        cy.url().should('include', '/payments');
    }
}

export default new FooterPage();
