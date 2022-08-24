export class CustomerList {
  assertCustomerExists(customer: {
    displayName: string;
    email: string;
    phone: string;
    comment: string;
  }) {
    cy.contains(customer.displayName)
      .parent()
      .should('contain', customer.email)
      .and('contain', customer.phone)
      .and('contain', customer.comment);
  }
}
