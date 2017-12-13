import validateCustomer from './Customer';
import validatePhone from './Phone';
import validateCustomerAddress from './Address';

export default customer => {
  const customerErrors = validateCustomer(customer) || {};

  if (customer.phones) {
    customerErrors.phones = customer.phones.map(validatePhone);
  }

  if (customer.addresses) {
    customerErrors.addresses = customer.addresses.map(validateCustomerAddress);
  }

  return customerErrors;
};
