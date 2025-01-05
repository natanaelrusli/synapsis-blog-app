const API_KEY = '8e34dcf56bd52fadba748c5c422ff9c92833c30b2a2e72a0a22d2ad7fd4c816c';

const enterApiToken = () => {
  cy.get('input[placeholder="Enter your GoRest API token"]')
      .should('be.visible')
      .type(API_KEY);
}

const selectUser = () => {
  cy.get('.ant-select-selector')
    .should('be.visible')
    .click();
  
  cy.get('div.ant-select-item.ant-select-item-option')
    .should('be.visible')
    .first()
    .invoke('attr', 'title')
    .then((userName) => {
      cy.wrap(userName).as('selectedUserName');

      cy.get('div.ant-select-item.ant-select-item-option')
        .first()
        .click();
    });
}

export const loginWithValidCredentials = () => {
  selectUser();
  enterApiToken();

  cy.get('button')
    .contains('Get Started')
    .should('be.visible')
    .click();

  cy.get('@selectedUserName').then((userName) => {
    expect(userName)
    cy.contains(`Hello, ${userName}`).should('exist');
  });
}

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