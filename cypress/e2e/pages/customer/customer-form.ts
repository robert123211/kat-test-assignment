import {assertCustomerInputValue} from '../../../utils/customer-data-helper';

export class CustomerForm {
  private readonly firstNameInput: string;
  private readonly lastNameInput: string;
  private readonly companyNameInput: string;
  private readonly displayNameInput: string;
  private readonly emailInput: string;
  private readonly phoneInput: string;
  private readonly commentInput: string;
  private readonly billingAdrFirstNameInput: string;
  private readonly billingAdrLastNameInput: string;
  private readonly billingAdrCompanyInput: string;
  private readonly billingAdrPhoneInput: string;
  private readonly addressLine1Input: string;
  private readonly addressLine2Input: string;
  private readonly cityInput: string;
  private readonly stateInput: string;
  private readonly zipInput: string;
  private readonly countryInput: string;
  private readonly billingAdrInput: string;
  private readonly extendedGrid: string;
  private readonly saveBillingAdrBtn: string;
  private readonly moreBtn: string;
  private readonly deleteCustomerBtn: string;
  private readonly confirmDeleteBtn: string;
  private readonly removeBillingAdrBtn: string;

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
    this.deleteCustomerBtn = '[data-testid="cardHeaderMenuButtonDELETE"]';
    this.moreBtn = 'span.print-hide'; // should add a better selector into the UI
    this.confirmDeleteBtn = '[data-testid="confirmDeleteButton"]';
    this.removeBillingAdrBtn = '[data-testid="removeAddressButton"]';
  }

  fillCustomerData(
    customer: {
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
    },
    editCustomer = false
  ) {
    cy.intercept('POST', 'https://customers.katanamrp.com/api/customers').as(
      'customerPOST'
    );
    cy.intercept({
      method: 'PATCH',
      url: /^https:\/\/customers.katanamrp.com\/api\/customers/,
    }).as('customerPATCH');
    cy.get(this.firstNameInput).type(`${customer.firstName}{enter}`);
    if (editCustomer) {
      this.waitForCustomerChanges();
    } else {
      this.waitForCustomerCreation();
    }
    cy.get(this.lastNameInput).type(`${customer.lastName}{enter}`);
    this.waitForCustomerChanges();
    cy.get(this.companyNameInput).type(`${customer.companyName}{enter}`);
    cy.get(this.displayNameInput).click();
    cy.get('li').contains(customer.displayName).click();
    this.waitForCustomerChanges();
    cy.get(this.emailInput).type(`${customer.email}{enter}`);
    this.waitForCustomerChanges();
    cy.get(this.phoneInput).type(`${customer.phone}{enter}`);
    this.waitForCustomerChanges();
    cy.get(this.commentInput).type(`${customer.comment}{enter}`);
    this.waitForCustomerChanges();
    cy.get(this.billingAdrInput).click();
    cy.get(this.extendedGrid).within(() => {
      cy.get(this.billingAdrFirstNameInput).type(customer.firstName);
      cy.get(this.billingAdrLastNameInput).type(customer.lastName);
      cy.get(this.billingAdrCompanyInput).type(customer.companyName);
      cy.get(this.billingAdrPhoneInput).type(customer.phone);
    });
    cy.get(this.addressLine2Input).type(customer.addressLine2);
    cy.get(this.cityInput).type(customer.city);
    cy.get(this.stateInput).type(customer.state);
    cy.get(this.zipInput).type(customer.zip);
    cy.get(this.countryInput).type(customer.country);
    cy.get(this.addressLine1Input).type(`${customer.addressLine1}`);
    cy.get(this.saveBillingAdrBtn).click();
    cy.wait('@customerPATCH').then(req => {
      if (req.response !== undefined) {
        customer.id = req.response.body.id;
      }
    });
    cy.contains('All changes saved').should('be.visible');
  }

  waitForCustomerChanges() {
    cy.wait('@customerPATCH');
    cy.contains('All changes saved').should('be.visible');
  }

  waitForCustomerCreation() {
    cy.wait('@customerPOST');
    cy.contains('All changes saved').should('be.visible');
  }

  deleteCustomer() {
    cy.get(this.moreBtn).click();
    cy.get(this.deleteCustomerBtn).click();
    cy.get(this.confirmDeleteBtn).click();
  }

  clearForm(clearBillingAddress = false) {
    cy.intercept({
      method: 'PATCH',
      url: /^https:\/\/customers.katanamrp.com\/api\/customers/,
    }).as('customerPATCH');
    cy.get(this.displayNameInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    cy.get(this.firstNameInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    cy.get(this.lastNameInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    cy.get(this.companyNameInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    cy.get(this.emailInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    cy.get(this.phoneInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    cy.get(this.commentInput).find('input').clear().type('{enter}');
    this.waitForCustomerChanges();
    if (clearBillingAddress) {
      cy.get(this.billingAdrInput).click();
      cy.get(this.removeBillingAdrBtn).click();
    }
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
