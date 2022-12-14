import {faker} from '@faker-js/faker';

export const generateCustomerBodyForPostRequest = function (): {
  firstName: string;
  lastName: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  comment: string;
} {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    firstName: firstName,
    lastName: lastName,
    name: `${firstName} ${lastName}`,
    company: faker.company.name(),
    email: faker.internet.email(),
    phone: faker.phone.number(),
    comment: faker.lorem.sentence(5),
  };
};

export const generateCustomerData = function (): {
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
} {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  return {
    firstName: firstName,
    lastName: lastName,
    companyName: faker.company.name(),
    displayName: `${firstName} ${lastName}`,
    email: faker.internet.email(firstName, lastName),
    phone: faker.phone.number(),
    comment: faker.lorem.sentences(3),
    addressLine1: faker.address.streetAddress(),
    addressLine2: faker.address.secondaryAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
  };
};

export const assertCustomerInputValue = function (
  selector: string,
  expectedValue: string,
  queryInputFromDiv = true
): void {
  if (queryInputFromDiv) {
    cy.get(selector)
      .should('be.visible')
      .find('input')
      .invoke('val')
      .then(actualValue => {
        expect(actualValue).to.eq(expectedValue);
      });
  } else {
    cy.get(selector)
      .should('be.visible')
      .invoke('val')
      .then(actualValue => {
        expect(actualValue).to.eq(expectedValue);
      });
  }
};

export const createCustomerByApi = function (): void {
  const customerBody = generateCustomerBodyForPostRequest();
  cy.get<string>('@authObj').then(obj => {
    cy.request({
      method: 'POST',
      url: 'https://customers.katanamrp.com/api/customers',
      body: customerBody,
      headers: {
        authorization: `Bearer ${JSON.parse(obj).token}`,
      },
    }).as('customerPostReq');
  });
};
