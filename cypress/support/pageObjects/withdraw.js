class withdraw {


    verifiMsgAccountIsNotLinked(methodImageName) {
cy.get("iframe.w-full.h-full.bg-hex-f3f4f6")
            .should("be.visible")
            .invoke("attr", "src")
            .then((iframeUrl) => {
                const origin = new URL(iframeUrl).origin;
                cy.origin(origin, { args: { iframeUrl } }, ({ iframeUrl }) => {
                    cy.visit(iframeUrl);
                    cy.get("body").should("be.visible");

                    const testedMethods = [];

                    // Pega todas as imagens com src contendo .png
                    cy.get("img[src*='.png']").each(($img, index) => {
                        const src = $img.attr("src");
                        const match = src.match(/\/([\w-]+)\.png/); // extrai o nome do método do src

                        if (match) {
                            const methodImageName = match[1];
                            testedMethods.push(methodImageName);
                        }
                    }).then(() => {
                        testedMethods.forEach((methodImageName, index) => {
                            cy.log(`Testando método: ${methodImageName}`);

                            // Volta para a tela anterior se não for o primeiro
                            if (index > 0) {
                                cy.get('button.bg-color-l')
                                    .should('be.visible')
                                    .click();
                            }

                            // Clica na imagem do método atual
                            cy.get(`img[src*="${methodImageName}.png"]`)
                                .should("be.visible")
                                .eq(0)
                                .click();
                            cy.then(() => {
                                //const input = cy.get("input[name='amount']");
                                const submitButton = cy.get("button").contains("SUBMIT");

                                submitButton.click();
                                cy.get("div.text-xs.text-color-error").should("contain", "Amount must be a number");

                                //submitButton.click();
                                //cy.get("div.text-color-error").should("contain", "less than or equal to");
                            });
                        });
                    });
                });
            });
    }


}
export default new withdraw();
