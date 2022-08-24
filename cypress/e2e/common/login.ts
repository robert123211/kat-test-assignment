import {Given} from '@badeball/cypress-cucumber-preprocessor';
import {Login} from '../pages/login';

Given(/^user is authenticated$/, () => {
  const login = new Login();
  cy.readFile('cypress/fixtures/testUser.json').then(user => {
    login.navigate();
    login.signIn(user);
  });
});
