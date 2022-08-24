import {When, Then} from '@badeball/cypress-cucumber-preprocessor';
import {Header} from '../pages/header';
import {generateCustomerData} from '../../utils/customer-data-helper';
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
