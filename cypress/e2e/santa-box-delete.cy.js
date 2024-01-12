const users = require("../fixtures/users.json");


describe("user can create a box and run it", () => {
    const boxPageUrl = "/account/boxes";
    const deleteBoxUrl = "/api/box/QeBEb8";

    beforeEach(() => {
        cy.visit("/login");
        cy.login(users.userAutor.email, users.userAutor.password);
        cy.get('.layout-1__header-wrapper-fixed [href="/account/boxes"]').click();
    });

    it.only("user DELETE THE BOX", () => {
        // Первый запрос
        cy.request({
            method: "GET",
            headers: {
                Cookie: Cypress.env("myCookieHeader"),
            },
            url: Cypress.env("baseUrl") + boxPageUrl,
        }).then((response) => {
            expect(response.status).to.eq(200);
        });

        // Второй запрос
        cy.request({
            method: "DELETE",
            headers: {
                Cookie: Cypress.env("mCookieHeader"),
            },
            url: Cypress.env("baseUrl") + deleteBoxUrl,
            body: {},
        }).then((response) => {
            expect(response.status).to.eq(200);
            
        });
    });
});