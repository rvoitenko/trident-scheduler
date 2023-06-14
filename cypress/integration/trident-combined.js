describe('Window', () => {
    it('get the document object', () => {
        const username = Cypress.env('username')
        const password = Cypress.env('password')
        cy.visit('https://apexfusion.com/login');
        cy.get('#index-login-password').type(password, { force: true });
        cy.get('#index-login-password').type(password);
        cy.get('fieldset').click();
        cy.get('.btn-primary').click();
        cy.get('#index-panel .card').submit();
        cy.get('.lead').click();
        cy.get('.dash-tri-config > .af').click();
        cy.get('.dash-tri-config-triple').click({ force: true });
    })
})
