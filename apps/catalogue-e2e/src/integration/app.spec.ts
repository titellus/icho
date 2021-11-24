import { getGreeting } from '../support/app.po';

describe('catalogue', () => {
  beforeEach(() => {
    cy.visit('/')
  });

  it('should display welcome message', () => {
    cy.get('#signin button').first().should('be.disabled');
    cy.login('admin', '');
    cy.get('#signin button').first().should('be.disabled');
    cy.login('admin', 'admin');

    // Function helper example, see `../support/app.po.ts` file
    getGreeting().contains('Welcome to catalogue!');
  });
});
