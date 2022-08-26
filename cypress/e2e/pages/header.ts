import {CustomerList} from './customer/customer-list';

export class Header {
  private readonly contactsBtn: string;
  private readonly globalAddBtn: string;
  private readonly addCustomerBtn: string;

  constructor() {
    this.contactsBtn = '#contactsTab';
    this.globalAddBtn = '#globalAdd';
    this.addCustomerBtn = '#add-customer';
  }

  goToContactsTab() {
    cy.get(this.contactsBtn).click();
    const customers = new CustomerList();
    customers.waitForCustomersApiResponse();
  }

  clickGlobalAdd() {
    cy.get(this.globalAddBtn).click();
  }

  clickAddNewCustomer() {
    cy.get(this.addCustomerBtn).click();
  }
}
