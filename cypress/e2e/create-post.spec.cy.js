import { createPost } from "./create-post-utils";
import { loginWithValidCredentials } from "./login-utils";

describe('Create New Post Form Validation and Submission', () => {
  beforeEach(() => {
    cy.visit('/');
    loginWithValidCredentials();

    cy.visit('/create');
  });

  it('Validates form fields and submits successfully', () => {
    createPost();
  });
});
