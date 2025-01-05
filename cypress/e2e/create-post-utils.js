export const createPost = () => {
  cy.get('button[type="submit"]')
    .click();
  cy.get('#title_help > .ant-form-item-explain-error')
    .should('contain', 'Please enter the title of the post!');
  cy.get('#body_help > .ant-form-item-explain-error')
    .should('contain', 'Please enter the post content!');
  
  cy.get('#title').type('My First Blog Post');
  cy.get('#body').type('My post body');

  cy.get('.ant-form-item-control-input-content > .ant-btn > span')
    .click();
  
  cy.url().should('not.include', '/create');
  cy.contains('Post created').should('be.visible'); 
}