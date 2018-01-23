/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';
import customerMessages from './messages/customer';
import genericMessages from './messages/generic';
import formValidationMessages from './messages/form_validation';
import stockMessages from './messages/stock';
import magazineMessages from './messages/magazine';

export default {
  'en-US': {
    ...customerMessages['en-US'],
    ...formValidationMessages['en-US'],
    ...genericMessages['en-US'],
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
    ...stockMessages['en-US'],
    ...magazineMessages['en-US'],
  },
  'pt-BR': {
    ...customerMessages['pt-BR'],
    ...formValidationMessages['pt-BR'],
    ...genericMessages['pt-BR'],
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
    ...stockMessages['pt-BR'],
    ...magazineMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
