describe('Login form', () => { 
    beforeEach(() => {
        cy.visit('https://practice.expandtesting.com/login');
    });
    
    it('succesful Login', () => {
        cy.get('#username').type("practice");
        cy.get('#password').type("SuperSecretPassword!")
        cy.get('#login > .btn').click()
        cy.location("pathname").should("eq","/secure")
        cy.get("#flash").contains("You logged into a secure area!")
    });
    it('wrong username', () => {
        cy.get('#username').type("Ayoub");
        cy.get('#password').type("SuperSecretPassword!")
        cy.get('#login > .btn').click()
        cy.location("pathname").should("eq","/login")
        cy.get("#flash").contains("Your username is invalid!")       
    });
    it('wrong password', () => {
        cy.get('#username').type("practice");
        cy.get('#password').type("SuperSecreddddddddddtPassword!")
        cy.get('#login > .btn').click()
        cy.location("pathname").should("eq","/login")
        cy.get("#flash").contains("Your password is invalid!")       
    });
 })