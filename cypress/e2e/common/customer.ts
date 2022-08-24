import {When, Then} from '@badeball/cypress-cucumber-preprocessor';
import {Header} from '../pages/header';
import {generateCustomerData} from '../../utils/customer-data-helper';
import {CustomerCreation} from '../pages/customer/customer-creation';
import {CustomerList} from '../pages/customer/customer-list';
const header = new Header();
const customer = generateCustomerData();

When(/^user navigates to customer creation page$/, () => {
  header.clickGlobalAdd();
  header.clickAddNewCustomer();
});
When(/^fills every value in the customer form$/, () => {
  const customerCreation = new CustomerCreation();
  customerCreation.fillCustomerData(customer);
});
When(/^closes the form$/, () => {});
Then(/^customer should be visible in the customer list view$/, () => {
  header.goToContactsTab();

  const customers = new CustomerList();
  customers.assertCustomerExists(customer);
});
Then(/^customer should have correct values in the detailed view$/, () => {});
