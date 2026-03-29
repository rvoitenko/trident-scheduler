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

        // Click the Trident config gear button to open dropdown
        cy.get('button.dash-tri-config', { timeout: 10000 })
            .should('be.visible')
            .click();

        // Wait for sibling dropdown menu to open, then click Alkalinity
        cy.get('.dash-tri-config + .dropdown-menu', { timeout: 8000 })
            .should('be.visible')
            .contains('.dropdown-item', 'Alkalinity')
            .click({ force: true })
            .then(() => {
                cy.log('✅ Alkalinity test initiated successfully');
            });
    })
})


