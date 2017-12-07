/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';
import customerMessages from './messages/customer';

export default {
  'en-US': {
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
    ...customerMessages['en-US'],
  },
  'pt-BR': {
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
    ...customerMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
