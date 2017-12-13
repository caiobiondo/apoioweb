/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';
import customerMessages from './messages/customer';
import genericMessages from './messages/generic';

export default {
  'en-US': {
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
    ...customerMessages['en-US'],
    ...genericMessages['en-US'],
  },
  'pt-BR': {
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
    ...customerMessages['pt-BR'],
    ...genericMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
