import {assertCustomerInputValue} from '../../../utils/customer-data-helper';

export class CustomerForm {
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
    id?: number;
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
    cy.intercept('POST', 'https://customers.katanamrp.com/api/customers').as(
      'customerPOST'
    );
    cy.intercept({
      method: 'PATCH',
      url: /^https:\/\/customers.katanamrp.com\/api\/customers/,
    }).as('customerPATCH');
    cy.get(this.firstNameInput).type(`${customer.firstName}{enter}`);
    cy.wait('@customerPOST');
    cy.get(this.lastNameInput).type(`${customer.lastName}{enter}`);
    cy.wait('@customerPATCH');
    cy.get(this.companyNameInput).type(`${customer.companyName}{enter}`);
    cy.wait('@customerPATCH').then(req => {
      if (req.response !== undefined) {
        customer.id = req.response.body.id;
      }
    });
    cy.get(this.displayNameInput)
      .find('input')
      .invoke('val')
      .then(val => {
        expect(val).to.eq(customer.displayName);
      });
    cy.get(this.emailInput).type(`${customer.email}{enter}`);
    cy.wait('@customerPATCH');
    cy.get(this.phoneInput).type(`${customer.phone}{enter}`);
    cy.wait('@customerPATCH');
    cy.get(this.commentInput).type(`${customer.comment}{enter}`);
    cy.wait('@customerPATCH');
    cy.get(this.billingAdrInput).click();
    cy.get(this.extendedGrid).within(() => {
      cy.get(this.billingAdrFirstNameInput).type(customer.firstName);
      cy.get(this.billingAdrLastNameInput).type(customer.lastName);
      cy.get(this.billingAdrCompanyInput).type(customer.companyName);
      cy.get(this.billingAdrPhoneInput).type(customer.phone);
    });
    cy.get(this.addressLine2Input).type(customer.addressLine2);
    cy.get(this.cityInput).focus().type(customer.city);
    cy.get(this.stateInput).focus().type(customer.state);
    cy.get(this.zipInput).focus().type(customer.zip);
    cy.get(this.countryInput).focus().type(customer.country);
    cy.get(this.addressLine1Input).type(`${customer.addressLine1}`);
    cy.get(this.saveBillingAdrBtn).click();
    cy.wait('@customerPATCH');
  }

  assertCustomerDataCorrectness(customer: {
    id?: number;
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
    cy.wait('@getCustomers');
    assertCustomerInputValue(this.firstNameInput, customer.firstName);
    assertCustomerInputValue(this.lastNameInput, customer.lastName);
    assertCustomerInputValue(this.displayNameInput, customer.displayName);
    assertCustomerInputValue(this.phoneInput, customer.phone);
    assertCustomerInputValue(this.emailInput, customer.email);
    assertCustomerInputValue(this.phoneInput, customer.phone);
    assertCustomerInputValue(this.commentInput, customer.comment);
    cy.get(this.billingAdrInput).click();
    cy.get(this.extendedGrid).within(() => {
      assertCustomerInputValue(
        this.billingAdrFirstNameInput,
        customer.firstName
      );
      assertCustomerInputValue(
        this.billingAdrLastNameInput,
        customer.lastName,
        false
      );
      assertCustomerInputValue(
        this.billingAdrCompanyInput,
        customer.companyName,
        false
      );
      assertCustomerInputValue(
        this.billingAdrPhoneInput,
        customer.phone,
        false
      );
    });
    assertCustomerInputValue(
      this.addressLine2Input,
      customer.addressLine2,
      false
    );
    assertCustomerInputValue(this.cityInput, customer.city, false);
    assertCustomerInputValue(this.stateInput, customer.state, false);
    assertCustomerInputValue(this.zipInput, customer.zip, false);
    assertCustomerInputValue(this.countryInput, customer.country, false);
    assertCustomerInputValue(
      this.addressLine1Input,
      customer.addressLine1,
      false
    );
  }
}
