/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';
import customerMessages from './messages/customer';
import customersListMessages from './messages/customers_list';

export default {
  'en-US': {
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
    ...customerMessages['en-US'],
    ...customersListMessages['en-US'],
  },
  'pt-BR': {
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
    ...customerMessages['pt-BR'],
    ...customersListMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
