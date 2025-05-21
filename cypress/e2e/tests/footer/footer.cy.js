import FooterPage from '../../../support/pageObjects/footer';

describe('Footer Navigation Test', () => {

    beforeEach(() => {
        cy.visit('/');
    });

    it('TC008 - should navigate to Terms & Conditions page from footer', () => {
        FooterPage.verificaFooterTermsAndConditions();
    });

    it('TC009 - should navigate to Privacy Policy page from footer', () => {
        FooterPage.verificaFooterPrivacyPolicy();
    });

    it('TC010 - should navigate to Responsible Gaming page from footer', () => {
        FooterPage.verificaFooterResponsibleGaming();
    });

    it('TC011 - should navigate to About Us page from footer', () => {
        FooterPage.verificaFooterAboutUs();
    });

    it('TC012 - should navigate to Contact Us page from footer', () => {
        FooterPage.verificaFooterContactUs();
    });

    it('TC013 - should navigate to FAQ page from footer', () => {
        FooterPage.verificaFooterFAQ();
    });

    it('TC014 - should navigate to Payments & Withdrawals page from footer', () => {
        FooterPage.verificaFooterPayments();
    });

});
