class depositPay {
    verifyClickableDepositMethods() {
        cy.get("iframe.w-full.h-full.bg-hex-f3f4f6")
            .should("be.visible")
            .invoke("attr", "src")
            .then((iframeUrl) => {
                cy.origin(new URL(iframeUrl).origin, { args: iframeUrl }, (url) => {
                    cy.visit(url);
                    cy.get("body").should("be.visible");

                    // Pega todas as imagens e garante que estão visíveis e clicáveis (sem clicar)
                    cy.get("img").each(($img) => {
                        cy.wrap($img).should("be.visible");

                        const isInsideLink = $img.parents("a").length > 0;
                        const hasOnClick = $img.attr("onclick") !== undefined;

                        expect(isInsideLink || hasOnClick, `Imagem com alt="${$img.attr('alt')}" deve ser clicável`).to.be.true;
                    });
                });
            });
    }

    verifyMinMaxLimitsDepositMethod(methodImageName) {
        cy.get("iframe.w-full.h-full.bg-hex-f3f4f6")
            .should("be.visible")
            .invoke("attr", "src")
            .then((iframeUrl) => {
                const origin = new URL(iframeUrl).origin;
                cy.origin(origin, { args: { iframeUrl, methodImageName } }, ({ iframeUrl, methodImageName }) => {
                    cy.visit(iframeUrl);
                    cy.get("body").should("be.visible");
                    cy.wait(1000);

                    cy.get(`img[src*="${methodImageName}.png"]`)
                        .should("be.visible")
                        .click();

                    let minValue, maxValue;

                    cy.get("div.truncate")
                        .contains(/^Min:/)
                        .invoke("text")
                        .then((text) => {
                            minValue = parseFloat(text.replace(/[^\d,]/g, "").replace(",", "."));
                        });

                    cy.get("div.truncate")
                        .contains(/^Max:/)
                        .invoke("text")
                        .then((text) => {
                            const cleanText = text.replace(/[^\d,]/g, "").replace(",", "");
                            maxValue = parseFloat(cleanText);
                        });

                    cy.then(() => {
                        const input = cy.get("input[name='amount']");
                        const submitButton = cy.get("button").contains("Submit");

                        input.clear().type((minValue - 0.01).toFixed(2));
                        submitButton.click();
                        cy.get("div.text-color-error").should("contain", "greater than or equal to");

                        input.clear().type((maxValue + 0.01).toFixed(2));
                        submitButton.click();
                        cy.get("div.text-color-error").should("contain", "less than or equal to");
                    });
                });
            });
    }
}
export default new depositPay();