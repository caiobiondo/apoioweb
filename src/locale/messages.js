/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';
import customerMessages from './messages/customer';
import genericMessages from './messages/generic';
import customersListMessages from './messages/customers_list';
import formValidationMessages from './messages/form_validation';

export default {
  'en-US': {
    ...customerMessages['en-US'],
    ...customersListMessages['en-US'],
    ...formValidationMessages['en-US'],
    ...genericMessages['en-US'],
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
  },
  'pt-BR': {
    ...customerMessages['pt-BR'],
    ...customersListMessages['pt-BR'],
    ...formValidationMessages['pt-BR'],
    ...genericMessages['pt-BR'],
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
