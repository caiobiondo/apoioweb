import validate from 'utils/validate';
import { translateFormError } from 'locale/utils';

const CUSTOMER_CONSTRAINTS = {
  name: {
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
  birthday: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerBirthDate', 'required'),
    },
  },
};

export default customer => validate(customer, CUSTOMER_CONSTRAINTS);
