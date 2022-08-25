import {Given} from '@badeball/cypress-cucumber-preprocessor';
import {Login} from '../pages/login';

Given(/^user is authenticated$/, () => {
  cy.intercept({
    method: 'GET',
    url: /^https:\/\/sales.katanamrp.com\/api\/salesOrderOpenLists/,
  }).as('getSales');
  const login = new Login();
  cy.readFile('cypress/fixtures/testUser.json').then(user => {
    login.navigate();
    login.signIn(user);
    cy.wait('@getSales');
    cy.getLocalStorage('katana_auth').then(obj => {
      cy.wrap(obj).as('authObj');
    });
  });
});
