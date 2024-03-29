describe('Window', () => {
    it('get the document object', () => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.visit('https://apexfusion.com/login');
        cy.get('#index-login-username').type(username);
        cy.get('#index-login-password').type(password, { force: true });
        cy.get('fieldset').click();
        cy.get('.btn-primary').click({ force: true });
        cy.get('#index-panel .card').submit();
        cy.get('.lead').click({ force: true }); // Forcing the click action
        cy.wait(1000); // wait for 1000 milliseconds, adjust as needed
        cy.get('.dash-tri-config > .af').click({ force: true });
        cy.get('.dash-tri-config-test-0').click({ force: true });
    })
})
