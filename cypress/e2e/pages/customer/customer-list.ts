export class CustomerList {
  readonly customerNameFilter: string;
  readonly customerNameCell: string;

  constructor() {
    this.customerNameFilter = '[data-testid="nameFilterInput"]';
    this.customerNameCell = '[data-testid="cellName"]';
  }

  assertCustomerExists(customer: {
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
  }) {
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/customers.katanamrp.com\/api\/customers/,
    }).as('getCustomers');
    cy.wait('@getCustomers');
    const customerRow = `[row-id="${customer.id}"]`;
    cy.get(this.customerNameFilter).type(customer.displayName);
    cy.get(customerRow)
      .should('contain', customer.displayName)
      .should('contain', customer.email)
      .and('contain', customer.phone)
      .and('contain', customer.comment);
  }

  goToCustomerDetailedView(customerId: number | undefined) {
    const customerRow = `[row-id="${customerId}"]`;
    cy.get(customerRow).filter(':visible').find(this.customerNameCell).click();
  }
}
