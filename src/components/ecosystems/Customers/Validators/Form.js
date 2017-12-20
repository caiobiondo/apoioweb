import validateCustomer from './Customer';
import validatePhone from './Phone';
import validateAddress from './Address';

const validatePhones = customer => {
  const phoneErrors = customer.phones.map(validatePhone);
  const anyError = phoneErrors.some(error => !!error);
  return anyError ? phoneErrors : null;
};

const validateAddresses = customer => {
  const addressErrors = customer.addresses.map(validateAddress);
  const anyError = addressErrors.some(error => !!error);
  return anyError ? addressErrors : null;
};

export default customer => {
  let errors = {},
    anyError = false;
  const customerErrors = validateCustomer(customer);
  const phoneErrors = customer.phones && validatePhones(customer);
  const addressErrors = customer.addresses && validateAddresses(customer);

  if (customerErrors) {
    errors = customerErrors;
    anyError = true;
  }

  if (phoneErrors) {
    errors.phones = phoneErrors;
    anyError = true;
  }

  if (addressErrors) {
    errors.addresses = addressErrors;
    anyError = true;
  }

  return anyError ? errors : null;
};
