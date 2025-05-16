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
    it('should navigate through all links in the navigation bar', () => {
        MainPage.verificaLinkCasino();
        MainPage.verificaLinkCasinoAoVivo();
        MainPage.verificaLinkEsportes();
        MainPage.verificaLinkLivespins();
        MainPage.verificaLinkPromocoes();
        MainPage.verificaLinkCalendario();
    });
});
 