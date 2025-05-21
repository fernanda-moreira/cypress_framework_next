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
}

export default new depositPay();