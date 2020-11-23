describe('Test Login page', () => {
  it('Login with a invalid account', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[type=email]').type('modular123@gmail.com');
    cy.get('input[type=password]').type('testing');
    cy.contains('Entrar').click();
    cy.contains('Access Unauthorized');
  });

  it('Login without email', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[type=email]').click();
    cy.get('input[type=password]').type('testing');
    cy.contains('Entrar').click();
    cy.contains('Email é necessário');
  });

  it('Login without password', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[type=email]').type('modular123@gmail.com');
    cy.get('input[type=password]').click();
    cy.contains('Entrar').click();
    cy.contains('Senha é necessária');
  });

  it('Login with a valid account', () => {
    cy.visit('http://localhost:8080/');
    cy.get('input[type=email]').type('modular123@gmail.com');
    cy.get('input[type=password]').type('modular123');
    cy.contains('Entrar').click();
    cy.url().should('include', '/home');
  });
});
