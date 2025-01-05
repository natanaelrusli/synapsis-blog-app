import { enterApiToken, loginWithValidCredentials, selectUser } from "./login-utils";

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should return error if no user selected', () => {
    enterApiToken();
    
    cy.get('button')
      .contains('Get Started')
      .click();
    
    cy.get('div')
      .contains('Please select a user')
      .should('be.visible');
  });

  it('should return error if no API Key entered', () => {
    selectUser();

    cy.get('button')
      .contains('Get Started')
      .click();
    
    cy.get('div')
      .contains('Please enter your API token')
      .should('be.visible');
  });

  it('should log in with valid credentials', () => {
    loginWithValidCredentials();
  });
});