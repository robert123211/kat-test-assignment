import {When, Then, Given} from '@badeball/cypress-cucumber-preprocessor';
import {Header} from '../pages/header';
import {
  generateCustomerBodyForPostRequest,
  generateCustomerData,
} from '../../utils/customer-data-helper';
import {CustomerForm} from '../pages/customer/customer-form';
import {CustomerList} from '../pages/customer/customer-list';
import undefinedError = Mocha.utils.undefinedError;
const header = new Header();
const customer = generateCustomerData();
const customers = new CustomerList();
const customerForm = new CustomerForm();

When(/^user navigates to customer creation page$/, () => {
  header.clickGlobalAdd();
  header.clickAddNewCustomer();
});
When(/^fills every value in the customer form$/, () => {
  customerForm.fillCustomerData(customer);
});
When(/^closes the form$/, () => {});
Then(/^customer should be visible in the customer list view$/, () => {
  header.goToContactsTab();
  customers.assertCustomerExists(customer);
});
Then(/^customer should have correct values in the detailed view$/, () => {
  if (customer.id !== null) {
    customers.goToCustomerDetailedView(customer.id);
    customerForm.assertCustomerDataCorrectness(customer);
  } else {
    throw undefinedError();
  }
});
Given(/^user has created a customer through API$/, () => {
  const customerBody = generateCustomerBodyForPostRequest();
  cy.get('@authObj').then(obj => {
    cy.request({
      method: 'POST',
      url: 'https://customers.katanamrp.com/api/customers',
      body: customerBody,
      headers: {
        authorization: `Bearer ${JSON.parse(obj).token}`,
      },
    }).as('customerPostReq');
  });
});
When(/^clicks delete customer$/, () => {
  customerForm.deleteCustomer();
});
Then(/^customer should be deleted$/, () => {
  customers.assertCustomerFilterHasNoResults();
});

When(/^user goes to customers list view$/, () => {
  header.goToContactsTab();
});
When(/^clicks on the created customer$/, () => {
  cy.get('@customerPostReq').then(req => {
    customers.filterCustomers('Name', req.body.name);
    customers.goToCustomerDetailedView(req.body.id);
  });
});
