import validate from 'utils/validate';
import { translateFormError } from 'locale/utils';

const PHONE_CONSTRAINTS = {
  phone: {
    presence: {
      allowEmpty: false,
      message: translateFormError('formCustomerPhone', 'required'),
    },
  },
};

export default phone => validate(phone, PHONE_CONSTRAINTS);
