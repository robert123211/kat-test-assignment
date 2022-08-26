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
let newCustomerData: {
  id?: number;
  zip: string;
  lastName: string;
  country: string;
  city: string;
  displayName: string;
  companyName: string;
  firstName: string;
  phone: string;
  addressLine1: string;
  comment: string;
  addressLine2: string;
  state: string;
  email: string;
};
const customers = new CustomerList();
const customerForm = new CustomerForm();

When(/^user navigates to customer creation page$/, () => {
  header.clickGlobalAdd();
  header.clickAddNewCustomer();
});
Given(/^user has created a customer through API$/, () => {
  const customerBody = generateCustomerBodyForPostRequest();
  cy.get<string>('@authObj').then(obj => {
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
  cy.get<{
    body: {
      name: string;
      id: number;
    };
  }>('@customerPostReq').then(req => {
    customers.filterCustomers('Name', req.body.name);
    customers.goToCustomerDetailedView(req.body.id);
  });
});
When(/^clears (.*) in the customer form$/, (wholeForm: string) => {
  if (wholeForm.toLowerCase() === 'true') {
    customerForm.clearForm(true);
  } else {
    customerForm.clearForm();
  }
});
Then(/^customer values should be updated$/, () => {});
When(/^fills every value in the (.*) customer form$/, (operation: string) => {
  newCustomerData = generateCustomerData();
  switch (operation) {
    case 'edit':
      customerForm.fillCustomerData(newCustomerData, true);
      break;
    case 'create':
      customerForm.fillCustomerData(customer);
      break;
    default:
      break;
  }
});
Then(
  /^(.*) customer operation changes should be visible in the customer list view$/,
  (operation: string) => {
    let customerData;
    header.goToContactsTab();
    if (operation === 'create') {
      customerData = customer;
    } else {
      customerData = newCustomerData;
      customers.clearFilter('Name');
    }
    customers.assertCustomerExists(customerData);
  }
);
Then(
  /^customer should have correct values in the detailed view after (.*) operation$/,
  (operation: string) => {
    let customerData;
    if (customer.id !== null) {
      if (operation === 'create') {
        customerData = customer;
      } else {
        customerData = newCustomerData;
      }
      customers.goToCustomerDetailedView(customerData.id);
      customerForm.assertCustomerDataCorrectness(customerData);
    } else {
      throw undefinedError();
    }
  }
);
When(/^edits the created customer values in the list view$/, () => {
  cy.get<{
    body: {
      name: string;
      id: number;
      comment: string;
    };
  }>('@customerPostReq').then(req => {
    newCustomerData = generateCustomerData();
    newCustomerData.displayName = req.body.name;
    newCustomerData.comment = req.body.comment;
    newCustomerData.id = req.body.id;
    customers.filterCustomers('Name', req.body.name);
    customers.editCustomerDetails(req.body.id, newCustomerData);
  });
});
