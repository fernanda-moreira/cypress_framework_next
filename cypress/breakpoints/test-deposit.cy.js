describe("Testando o site Nexto Casino", () => {
    it("Deve acessar a página inicial", () => {
        // Acessa a página de depósito do site Nexto Casino
        cy.visit(
            "https://www.nextocasino.com/account/financials/deposit/ft9xIZC1QbG3MSkS195Ko3mLJ3dKUu2Y61C5YehW0x7v5lbxRt4x3sgtXAMKmbAf0Je67CtW6d_wYOchdaXAWQ"
        );

        // Preenche o campo de e-mail
        cy.get('input[name="email"]').type("test@test.com");

        // Preenche o campo de senha
        cy.get('[name="password"]').type("Ts123456");

        // Clica no botão de login "Login now"
        cy.contains("Login now").click();

        // Clica no botão de depósito (segundo botão na grid)
        cy.get('.grid > ._secondary_i1e1t_9').click();

        // Aguarda 5 segundos para garantir que o iframe carregue
        cy.wait(5000);

        // Encontra o iframe de pagamento e extrai sua URL
        cy.get("iframe.w-full.h-full.bg-hex-f3f4f6")
            .should("be.visible") // Garante que o iframe está visível
            .invoke("attr", "src") // Obtém a URL do atributo "src" do iframe
            .then((iframeUrl) => {
                // Usa cy.origin() para interagir com um domínio diferente
                cy.get("iframe.w-full.h-full.bg-hex-f3f4f6")
                .should("be.visible")
                .invoke("attr", "src")
                .then((iframeUrl) => {
                    // Acessa diretamente a URL extraída sem usar cy.origin()
                    cy.visit(iframeUrl);
            
                    cy.get("body").should("be.visible"); // Garante que o body carregou
            
                    cy.get('[class="flex-1 relative flex flex-col md:pl-5 overflow-hidden"]')
                        //.find('[href="/financials/deposit/ft9xIZC1QbG3MSkS195Ko3mLJ3dKUu2Y61C5YehW0x47R9DCCtuYfiRKyfsgrCRV"]')
                      //  .click();
                    //   cy.get('input[name="number"]').type(4059310181757001);

                    cy.contains("I dont want a bonus").click();

                    // Intercepta a tentativa de abrir uma nova aba/janela
                    cy.window().then((win) => {
                        cy.stub(win, "open") // Intercepta a função window.open
                            .callsFake((url) => {
                                cy.visit(url); // Em vez de abrir uma nova aba, navega para a URL dentro da mesma página
                            })
                            .as("windowOpen"); // Dá um nome ao stub para futuras verificações
                    });

                    // Clica no botão de "Submit" (enviar)
                    cy.contains("Submit").click();

                    // Aguarda 2 segundos para garantir que a chamada da função ocorreu
                    cy.wait(2000);

                    // Verifica se o stub (interceptação de window.open) foi chamado corretamente
                    // cy.get("@windowOpen").then((stub) => {
                    //     expect(stub).to.have.been.called; // Testa se a função foi chamada
                    // });
                });
            });

        // Após sair do contexto do iframe, preenche um campo no formulário de pagamento
        cy.get('[name="number"]')
            .clear() // Limpa o campo antes de digitar
            .type("123"); // Digita um sobrenome de teste

            cy.get('[name="CreditCard.Number"]').clear().type("4059310181757001");
            cy.get('[name="CreditCard.ExpirationMonth"]').clear().type("10");
            cy.get('[name="CreditCard.ExpirationYear"]').clear().type("10");
            cy.get('[name="CreditCard.CVV"]').clear().type("122");
            cy.get('[name="CreditCard.BillingAddress2"]').clear().type("Test adress");

            cy.get('#CreditCard > .md-raised').click


    });
});