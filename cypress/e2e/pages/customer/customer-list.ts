export class CustomerList {
  readonly customerNameFilter: string;
  readonly customerEmailFilter: string;
  readonly customerPhoneFilter: string;
  readonly customerCommentFilter: string;
  readonly customerNameCell: string;

  constructor() {
    this.customerNameFilter = '[data-testid="nameFilterInput"]';
    this.customerEmailFilter = '[data-testid="emailFilterInput"]';
    this.customerPhoneFilter = '[data-testid="phoneFilterInput"]';
    this.customerCommentFilter = '[data-testid="commentFilterInput"]';
    this.customerNameCell = '[data-testid="cellName"]';
  }

  filterCustomers(column: string, searchPhrase: string) {
    let selector: string;
    switch (column) {
      case 'Name':
        selector = this.customerNameFilter;
        break;
      case 'Email':
        selector = this.customerEmailFilter;
        break;
      case 'Phone':
        selector = this.customerPhoneFilter;
        break;
      case 'Comment':
        selector = this.customerCommentFilter;
        break;
      default:
        break;
    }
    cy.get(selector!).type(searchPhrase);
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
    this.filterCustomers(this.customerNameFilter, customer.displayName);
    cy.get(customerRow)
      .should('contain', customer.displayName)
      .should('contain', customer.email)
      .and('contain', customer.phone)
      .and('contain', customer.comment);
  }

  goToCustomerDetailedView(customerId: number | undefined) {
    const customerRow = `[row-id="${customerId}"]`;
    cy.get(customerRow).filter(':visible').find(this.customerNameCell).click();
    cy.contains('All changes saved').should('be.visible');
  }

  assertCustomerFilterHasNoResults() {
    cy.get(this.customerNameFilter).should('be.visible');
    cy.contains('Loading').should('not.exist');
    cy.get(this.customerNameCell).should('not.exist');
  }
}
