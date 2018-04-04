import { red100, orange100, yellow100, green100, green200 } from 'styles/colors';

export const IndicatorConcepts = {
  Below: 'ABAIXO',
  Attempt: 'ATENDE',
  Inside: 'DENTRO',
  Overcome: 'SUPERA',
  Exceed: 'EXCEDE',
};

export const IndicatorConceptsLabels = {
  get [IndicatorConcepts.Below]() {
    return 'Abaixo';
  },
  get [IndicatorConcepts.Attempt]() {
    return 'Atende';
  },
  get [IndicatorConcepts.Inside]() {
    return 'Dentro';
  },
  get [IndicatorConcepts.Overcome]() {
    return 'Supera';
  },
  get [IndicatorConcepts.Exceed]() {
    return 'Excede';
  },
};

export const IndicatorConceptsColors = {
  get [IndicatorConcepts.Below]() {
    return red100;
  },
  get [IndicatorConcepts.Attempt]() {
    return orange100;
  },
  get [IndicatorConcepts.Inside]() {
    return yellow100;
  },
  get [IndicatorConcepts.Overcome]() {
    return green100;
  },
  get [IndicatorConcepts.Exceed]() {
    return green200;
  },
};
