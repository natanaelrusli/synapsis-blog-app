import { loginWithValidCredentials } from "./login.spec.cy";

describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Open home page and display a post card component', () => {
    loginWithValidCredentials();

    cy.get('#post-card')
      .should('be.visible');
  })

  it('Open home page and display a search input component', () => {
    loginWithValidCredentials();

    cy.get('input[placeholder="Search by title"]')
      .should('be.visible');
  })
})