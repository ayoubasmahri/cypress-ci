describe('Api Test', () => {
  context('Check API Health', () => {
    it('should return a 200 status and success: true', () => {
      cy.request(
        'GET',
        'https://practice.expandtesting.com/notes/api/health-check'
      ).then((response) => {
        expect(response.status).to.eq(200); // Ensure the status is 200
        expect(response.body.success).to.be.true; // Validate response structure
        cy.log(JSON.stringify(response.body)); // Log response
      });
    });
  });
  context('Login a user', () => {
    it('should log in successfully', () => {
      cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/users/login',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          email: 'govmastre@gmail.com',
          password: 'squids123',
        },
        form: true, // Ensures `application/x-www-form-urlencoded` encoding
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure success
        expect(response.body.success).to.be.true;
        cy.log(JSON.stringify(response.body));
      });
    });
  });
  context('forgot password', () => {
    it('should send an email for password reset', () => {
      cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/users/forgot-password',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: {
          email: 'govmastre@gmail.com',
        },
        form: true,
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure success
        expect(response.body.success).to.be.true;
        cy.log(JSON.stringify(response.body));
      });
    });
  });
  context('create note', () => {
    it('status 200 succes true', () => {
      cy.request({
        method: 'POST',
        url: 'https://practice.expandtesting.com/notes/api/notes',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-auth-token':
            'bd9c076933b94f1f97b5f8e7241474aba0d47597e9ea42efaf18c709d1925bff',
        },
        body: {
          title: 'first note',
          description: 'this is a note',
          category: 'Home',
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure success
        expect(response.body.success).to.be.true;
        cy.log(JSON.stringify(response.body));
      });
    });
  });

  context('get all notes', () => {
    it('get all notes', () => {
      cy.request({
        method: 'GET',
        url: 'https://practice.expandtesting.com/notes/api/notes',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'x-auth-token':
            'bd9c076933b94f1f97b5f8e7241474aba0d47597e9ea42efaf18c709d1925bff',
        },
      }).then((response) => {
        expect(response.status).to.eq(200); // Ensure success
        expect(response.body.success).to.be.true;
        cy.log(JSON.stringify(response.body));
      });
    });
  });
});
