describe('Apex Fusion - Trident Alkalinity Test', () => {
    it('should successfully run alkalinity test only', () => {
        // Validate credentials are configured
        const username = Cypress.env('username')
        const password = Cypress.env('password')

        if (!username || !password) {
            throw new Error('Missing credentials: USERNAME and PASSWORD environment variables must be set')
        }

        // Navigate to login page
        cy.visit('https://apexfusion.com/login');

        // Login with credentials
        cy.get('#index-login-username')
            .should('be.visible')
            .type(username);

        cy.get('#index-login-password')
            .should('be.visible')
            .type(password);

        cy.get('fieldset')
            .should('exist')
            .click();

        cy.get('.btn-primary')
            .should('be.visible')
            .click();

        cy.get('#index-panel .card')
            .should('exist')
            .submit();

        // Verify login succeeded - URL should change from /login
        cy.url()
            .should('not.include', '/login')
            .then(() => {
                cy.log('✅ Login successful');
            });

        // Navigate to Trident dashboard
        cy.get('.lead')
            .should('be.visible')
            .click();

        // Wait for Trident config to be visible instead of arbitrary wait
        cy.get('.dash-tri-config > .af', { timeout: 10000 })
            .should('be.visible')
            .click();

        // Start the alkalinity test (test-1 = alkalinity only)
        cy.get('.dash-tri-config-test-1')
            .should('be.visible')
            .click()
            .then(() => {
                cy.log('✅ Alkalinity test initiated successfully');
            });
    })
})


