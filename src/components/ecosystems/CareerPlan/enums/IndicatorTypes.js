import { blue100, orange100, orange200 } from 'styles/colors';
import { IndicatorFieldsTypes } from './IndicatorFields';

export const IndicatorTypes = {
  ScoresTotal: 'scoresTotal',
  Registration: 'registration',
  Active: 'active',
};

export const IndicatorTypesColors = {
  get [IndicatorTypes.ScoresTotal]() {
    return blue100;
  },
  get [IndicatorTypes.Registration]() {
    return orange100;
  },
  get [IndicatorTypes.Active]() {
    return orange200;
  },
};

export const IndicatorFields = {
  [IndicatorTypes.ScoresTotal]: [
    IndicatorFieldsTypes.DirectSale,
    IndicatorFieldsTypes.NaturaNetwork,
  ],
  [IndicatorTypes.Registration]: [IndicatorFieldsTypes.DirectSale],
  [IndicatorTypes.Active]: [IndicatorFieldsTypes.DirectSale],
};

export const IndicatorTypesLabels = {
  get [IndicatorTypes.ScoresTotal]() {
    return 'Volume de Pontos';
  },
  get [IndicatorTypes.Registration]() {
    return 'Média de Cadastros';
  },
  get [IndicatorTypes.Active]() {
    return 'Atingido, Meta e Grupo';
  },
};
