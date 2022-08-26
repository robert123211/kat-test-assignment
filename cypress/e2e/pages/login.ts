export class Login {
  private readonly usernameInput: string;
  private readonly passwordInput: string;
  private readonly signInButton: string;

  constructor() {
    this.usernameInput = '[aria-label="Email"]';
    this.passwordInput = '[aria-label="Password"]';
    this.signInButton = '[aria-label="Sign in"]';
  }

  navigate() {
    cy.visit('');
  }

  signIn(user: {username: string; password: string}) {
    cy.get(this.usernameInput).type(user.username);
    cy.get(this.passwordInput).type(user.password);
    cy.get(this.signInButton).click();
  }
}
