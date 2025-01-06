export const enterApiToken = () => {
  cy.get('input[placeholder="Enter your GoRest API token"]')
      .should('be.visible')
      .type(Cypress.env('API_KEY'));
}

export const selectUser = () => {
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