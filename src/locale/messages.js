/* eslint-enable sort-keys */
import myScoreMessages from './messages/my_score';
import orderMessages from './messages/order';
import customerMessages from './messages/customer';
import genericMessages from './messages/generic';
import formValidationMessages from './messages/form_validation';
import stockMessages from './messages/stock';
import magazineMessages from './messages/magazine';
import trainingMessages from './messages/training';
import personMessages from './messages/person';
import careerPlanMessages from './messages/career_plan';

export default {
  'en-US': {
    ...customerMessages['en-US'],
    ...formValidationMessages['en-US'],
    ...genericMessages['en-US'],
    ...myScoreMessages['en-US'],
    ...orderMessages['en-US'],
    ...stockMessages['en-US'],
    ...magazineMessages['en-US'],
    ...trainingMessages['en-US'],
    ...personMessages['en-US'],
    ...careerPlanMessages['en-US'],
  },
  'pt-BR': {
    ...customerMessages['pt-BR'],
    ...formValidationMessages['pt-BR'],
    ...genericMessages['pt-BR'],
    ...myScoreMessages['pt-BR'],
    ...orderMessages['pt-BR'],
    ...stockMessages['pt-BR'],
    ...magazineMessages['pt-BR'],
    ...trainingMessages['pt-BR'],
    ...personMessages['pt-BR'],
    ...careerPlanMessages['pt-BR'],
  },
};
/* eslint-disable sort-keys */
