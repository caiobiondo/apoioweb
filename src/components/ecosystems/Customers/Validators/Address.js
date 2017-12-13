import validate from 'validate.js';
import { translateFormError } from 'locale/utils';

/* eslint-disable camelcase */
const ADDRESS_CONSTRAINTS = {
  zipcode: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerZipCode', 'required'),
    },
  },
  street_name: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerAddress', 'required'),
    },
  },
  street_number: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerNumber', 'required'),
    },
  },
  neighborhood: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerNeighborhood', 'required'),
    },
  },
  city: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerCity', 'required'),
    },
  },
  state: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerState', 'required'),
    },
  },
};
/* eslint-enable camelcase */

export default address => validate(address, ADDRESS_CONSTRAINTS) || {};
