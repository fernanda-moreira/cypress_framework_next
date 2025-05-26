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
        const validUserList = Array.isArray(users.validUser) ? users.validUser : [users.validUser];
        const randomUser = validUserList[Math.floor(Math.random() * validUserList.length)];
        LoginPage.login(randomUser.username, randomUser.password);
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
    it('TC002 - should navigate to All Games page as guest', () => {
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

    it('TC009 - should visually display 5.5 games in Live Casino carousel (no scroll)', () => {
    cy.get('div._flex_qgay7_17').eq(1).within(() => {
        // Get all game cards in this carousel
        cy.get('div._game_qgay7_1')
            .then(($cards) => {
                const container = $cards[0].parentElement.parentElement; // scroll container
                const containerRect = container.getBoundingClientRect();

                // Count how many cards are fully or partially visible
                const visibleCards = [...$cards].filter(card => {
                    const rect = card.getBoundingClientRect();
                    return rect.left < containerRect.right && rect.right > containerRect.left;
                });

                // Expect 6 cards visible (5 full, 1 partial = 5.5)
                expect(visibleCards.length).to.eq(8);
            });
        });
    });

    it('TC010 - should visually display 8 games in Provider display section (no scroll)', () => {
    cy.visit('/');

        // Scroll to the provider section
         cy.get('div._flex_rbhr4_1').first().scrollIntoView();

        cy.get('div._flex_rbhr4_1').first().within(() => {
        cy.get('div._game_qgay7_1').then(($cards) => {
            const container = $cards[0].parentElement.parentElement;
            const containerRect = container.getBoundingClientRect();

            const visibleCards = [...$cards].filter(card => {
                const rect = card.getBoundingClientRect();
                return rect.left < containerRect.right && rect.right > containerRect.left;
            });

            expect(visibleCards.length).to.eq(8);
        });
        });
});

    it.only('TC011 - should display all games after clicking "Show All"', () => {
    cy.visit('/');

    // Scroll to ensure the button is in view
    cy.get('div._showAll_qgay7_27').first().scrollIntoView();

    // Click the Show All button
    cy.get('div._showAll_qgay7_27').first().click();

    // Ensure redirected or that many more game cards are loaded
    cy.get('div._game_qgay7_1').should('have.length.greaterThan', 20);
    });

    });

