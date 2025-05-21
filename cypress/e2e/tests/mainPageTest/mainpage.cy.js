import MainPage from '../../../support/pageObjects/mainPage';
import LoginPage from '../../../support/pageObjects/LoginPage';

describe('Navigation Bar Test', () => {
    let users;

    before(() => {
        cy.fixture('users/users.json').then((data) => {
            users = data;   
        });
    });

    beforeEach(() => {
        const validUser = users.validUser;
        LoginPage.login(validUser.username, validUser.password); 
    });

    // TC001 - Logged in navigation test
    it('TC001 - should navigate through all links in the navigation bar', () => {
        MainPage.verificaLinkCasino();
        //MainPage.verificaLinkCasinoAoVivo();
        MainPage.verificaLinkEsportes();
        MainPage.verificaLinkLivespins();
        MainPage.verificaLinkPromocoes();
        MainPage.verificaLinkCalendario();
    });

    // TC002 - Guest navigation test for Slot Games
    it('TC002 - should navigate to Slot Games page as guest', () => {
    cy.clearCookies(); // Ensure no session
    cy.visit('/');     // Start from home page
    MainPage.verificaLinkAllGamesGuest();
    });



    it('TC003 - should navigate to Slot Games page as guest', () => {
    cy.clearCookies();
    cy.visit('/');
    MainPage.verificaLinkSlotGamesGuest();
    });

    it('TC004 - should navigate to Live Casino page as guest', () => {
    cy.clearCookies();
    cy.visit('/');
    MainPage.verificaLinkLiveCasinoGuest();
    });

    it('TC005 - should navigate to Virtual Games page as guest', () => {
    cy.clearCookies();
    cy.visit('/');
    MainPage.verificaLinkVirtualGamesGuest();
    });

    it('TC006 - should navigate to Top Table & Crash Games page as guest', () => {
    cy.clearCookies();
    cy.visit('/');
    MainPage.verificaLinkTopTableAndCrashGamesGuest();
    });

    it('TC007 - should navigate to Lucky Games page as guest', () => {
    cy.clearCookies();
    cy.visit('/');
    MainPage.verificaLinkLuckyGamesGuest();
    });

    // // ✅ TC002 - Gaming Menu Options Clickability
    // it('TC002 - Menu options are clickable and redirect correctly', () => {
    //     MainPage.checkGamingOptionsMenuLinks();
    // });

    // // ✅ TC003 - In-page Game Category Navigation
    // it('TC003 - In-page game category navigation scrolls correctly', () => {
    //     MainPage.checkCategoryNavigation();
    // });
});
