import { loginWithValidCredentials } from "./login-utils";

describe('User profile page', () => {
  beforeEach(() => {
    cy.visit('/');
    loginWithValidCredentials();

    cy.visit('/me');
  });

  it('Displays the profile page', () => {
    cy.get('h3')
      .contains('My Profile');
    
    cy.get('@selectedUserName').then((userName) => {
      expect(userName)
      cy.contains(`${userName}`).should('exist');
    });
  })

  it('Edit a post', () => {
    // createPost();

    cy.get(':nth-child(1) > .ant-card-body > .ant-flex-gap-small > .ant-btn-color-default')
      .click()

    cy.get('input.ant-input.ant-input-outlined.mb-2')
      .should('be.visible')
      .type(`updated post ${Date.now()}`)

    cy.get(':nth-child(1) > .ant-card-body > .ant-flex-gap-small > .ant-btn-color-default')
      .click()
    
    cy.contains('Post updated').should('be.visible'); 
  })

  it('Delete a post', () => {
    cy.get(':nth-child(1) > .ant-card-body > .ant-flex-gap-small > .ant-btn-dangerous')
      .click();
    
    cy.contains('button', 'Yes')
      .should('be.visible')
      .click();
    
    cy.contains('Post deleted').should('be.visible'); 
  })
})