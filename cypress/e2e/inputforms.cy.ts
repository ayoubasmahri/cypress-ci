describe('Input Forms', () => { 
    it('', () => {
        cy.visit('https://practice.expandtesting.com/inputs');
        cy.get('#input-number').type("6969696696");
        cy.get('#input-text').type("Test");
        cy.get('#input-password').type("p@ssw0rd");
        cy.get('#input-date').type("2025-02-05");
        cy.get('#btn-display-inputs').click()
        cy.get('#output-number').contains("6969696696");
        cy.get('#output-text').contains("Test");
        cy.get('#output-password').contains("p@ssw0rd");
        cy.get('#output-date').contains("2025-02-05");

    });







 })