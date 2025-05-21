describe("Testando o site Nexto Casino", () => {
    it("Deve acessar a página inicial", () => {
        cy.visit(
            "https://www.nextocasino.com/account/financials/deposit/ft9xIZC1QbG3MSkS195Ko3mLJ3dKUu2Y61C5YehW0x47R9DCCtuYfiRKyfsgrCRV"
        );

        cy.get('input[name="email"]').type("finland-test@test.com");
        // cy.get('input[name="email"]').type("test@test.com");

        cy.get('[name="password"]').type("Ts123456");
        cy.contains("Login now").click();
        //cy.get('[id="headlessui-dialog-:r7:"]').contains("Deposit").click();

        cy.wait(5000);

        cy.get("iframe.w-full.h-full.bg-hex-f3f4f6")
            .should("be.visible")
            .invoke("attr", "src")
            .then((iframeUrl) => {
                cy.origin(new URL(iframeUrl).origin, { args: iframeUrl }, (url) => {
                    cy.visit(url); // Acessa diretamente a URL extraída

                    cy.get("body").should("be.visible"); // Garante que o body carregou

                    cy.get(
                        '[class="flex-1 relative flex flex-col md:pl-5 overflow-hidden"]'
                    ).click();

                    cy.contains("I dont want a bonus").click();

                    cy.window().then((win) => {
                        cy.stub(win, "open")
                            .callsFake((url) => {
                                cy.visit(url); // Redireciona para a URL aberta no popup
                            })
                            .as("windowOpen");
                    });

                    cy.contains("Submit").click();

                    cy.wait(2000); // Pequeno tempo para garantir a chamada

                    cy.get("@windowOpen").then((stub) => {
                        expect(stub).to.have.been.called; // Verifica manualmente
                    });
                });
            });
        cy.get('[name="CreditCard.LastName"]')
            .clear()
            .type("Testando Interações do Nique");
    });
});