export class Header {
  readonly contactsBtn: string;
  readonly globalAddBtn: string;
  readonly addCustomerBtn: string;

  constructor() {
    this.contactsBtn = '#contactsTab';
    this.globalAddBtn = '#globalAdd';
    this.addCustomerBtn = '#add-customer';
  }

  goToContactsTab() {
    cy.get(this.contactsBtn).click();
  }

  clickGlobalAdd() {
    cy.get(this.globalAddBtn).click();
  }

  clickAddNewCustomer() {
    cy.get(this.addCustomerBtn).click();
  }
}
