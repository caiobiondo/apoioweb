import validate from 'validate.js';
import { translateFormError } from 'locale/utils';

const CUSTOMER_CONSTRAINTS = {
  fullName: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerFullName', 'required'),
    },
  },
  gender: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerGender', 'required'),
    },
  },
  birthDate: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerBirthDate', 'required'),
    },
  },
};

const PHONE_CONSTRAINTS = {
  phone: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerPhone', 'required'),
    },
  },
};

const validatePhone = phone => {
  return validate(phone, PHONE_CONSTRAINTS) || {};
};

const validateCustomer = customer => {
  const customerErrors = validate(customer, CUSTOMER_CONSTRAINTS) || {};

  if (customer.phones) {
    customerErrors.phones = customer.phones.map(validatePhone);
  }

  return customerErrors;
};

const validateCustomerAddress = () => {
  return {};
};

export { validateCustomer, validateCustomerAddress, validatePhone };
