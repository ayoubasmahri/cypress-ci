describe('Handle Js alerts', () => {
    
    beforeEach(() => {
      cy.visit('https://the-internet.herokuapp.com/javascript_alerts')
    })
    it('check alert', () => {
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('I am a JS Alert');
          });
        cy.get(".example > ul > li > button").eq(0).click();
      })
    it('check confirm', () => {
        cy.on('window:confirm', (confirmText) => {
            expect(confirmText).to.equal('I am a JS Confirm');
            return true; // Simulate clicking 'OK'
          });
        cy.get(".example > ul > li > button").eq(1).click();
        cy.get('#result').contains("You clicked: Ok");
    });
    it('check prompt', () => {
        cy.window().then((win) => {
            cy.stub(win, 'prompt').returns('YES');
          });
        cy.get(".example > ul > li > button").eq(2).click();
        cy.get('#result').should('have.text', 'You entered: YES');
    });








});