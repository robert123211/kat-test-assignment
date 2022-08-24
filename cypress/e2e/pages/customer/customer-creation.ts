export class CustomerCreation {
  readonly firstNameInput: string;
  readonly lastNameInput: string;
  readonly companyNameInput: string;
  readonly displayNameInput: string;
  readonly emailInput: string;
  readonly phoneInput: string;
  readonly commentInput: string;
  readonly billingAdrFirstNameInput: string;
  readonly billingAdrLastNameInput: string;
  readonly billingAdrCompanyInput: string;
  readonly billingAdrPhoneInput: string;
  readonly addressLine1Input: string;
  readonly addressLine2Input: string;
  readonly cityInput: string;
  readonly stateInput: string;
  readonly zipInput: string;
  readonly countryInput: string;
  readonly billingAdrInput: string;
  readonly extendedGrid: string;
  readonly saveBillingAdrBtn: string;

  constructor() {
    this.firstNameInput = '[data-testid="inputCustomerFirstName"]';
    this.lastNameInput = '[data-testid="inputCustomerLastName"]';
    this.displayNameInput = '[data-testid="inputCustomerDisplayName"]';
    this.phoneInput = '[data-testid="inputCustomerPhone"]';
    this.companyNameInput = '[data-testid="inputCustomerCompany"]';
    this.addressLine1Input = 'input[name="line1"]';
    this.addressLine2Input = 'input[name="line2"]';
    this.emailInput = '[data-testid="inputCustomerEmail"]';
    this.commentInput = '[data-testid="inputCustomerComment"]';
    this.billingAdrInput = '[data-testid="inputCustomerDefaultBillingAddress"]';
    this.billingAdrCompanyInput = 'input[name="company"]';
    this.billingAdrFirstNameInput = '[data-testid="firstNameTextField"]';
    this.extendedGrid = '[data-testid="gridExtended"]';
    this.billingAdrLastNameInput = 'input[name="lastName"]';
    this.billingAdrPhoneInput = 'input[name="phone"]';
    this.cityInput = 'input[name="city"]';
    this.stateInput = 'input[name="state"]';
    this.zipInput = 'input[name="zip"]';
    this.countryInput = 'input[name="country"]';
    this.saveBillingAdrBtn = '[data-testid="submitButton"]';
  }

  fillCustomerData(customer: {
    displayName: string;
    zip: string;
    lastName: string;
    country: string;
    city: string;
    companyName: string;
    firstName: string;
    phone: string;
    addressLine1: string;
    comment: string;
    addressLine2: string;
    state: string;
    email: string;
  }) {
    cy.get(this.lastNameInput).type(customer.lastName);
    cy.get(this.firstNameInput).type(customer.firstName);
    cy.get(this.companyNameInput).type(customer.companyName);
    cy.get(this.displayNameInput).should('contain', customer.displayName);
    cy.get(this.emailInput).type(customer.email);
    cy.get(this.phoneInput).type(customer.phone);
    cy.get(this.commentInput).type(customer.comment);
    cy.get(this.billingAdrInput).click();
    cy.get(this.extendedGrid).within(() => {
      cy.get(this.billingAdrFirstNameInput).type(customer.firstName);
      cy.get(this.billingAdrLastNameInput).type(customer.lastName);
      cy.get(this.billingAdrCompanyInput).type(customer.companyName);
      cy.get(this.billingAdrPhoneInput).type(customer.phone);
    });
    cy.get(this.addressLine1Input).type(`${customer.addressLine1}`).click();
    cy.get(this.billingAdrFirstNameInput).click(); // to get rid of the opening dropdown in address line 1- another option would be to select a option from the dropdown and save the filled data into fixture folder
    cy.get(this.addressLine2Input).focus().type(customer.addressLine2);
    cy.get(this.cityInput).focus().type(customer.city);
    cy.get(this.stateInput).focus().type(customer.state);
    cy.get(this.zipInput).focus().type(customer.zip);
    cy.get(this.countryInput).focus().type(customer.country);
    cy.get(this.saveBillingAdrBtn).click();
  }
}
