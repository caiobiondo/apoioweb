/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';

export default {
  'en-US': {
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
  },
  'pt-BR': {
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
