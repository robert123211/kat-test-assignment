import {faker} from '@faker-js/faker';

export const generateCustomerData = function (): {
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
