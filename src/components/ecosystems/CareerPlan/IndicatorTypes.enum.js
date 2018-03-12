import { blue100, orange100, orange200 } from 'styles/colors';

export const IndicatorTypes = {
  PointsVolume: 1,
  RegisterAverage: 2,
  Attained: 3,
};

export const IndicatorTypesColors = {
  get [IndicatorTypes.PointsVolume]() {
    return blue100;
  },
  get [IndicatorTypes.RegisterAverage]() {
    return orange100;
  },
  get [IndicatorTypes.Attained]() {
    return orange200;
  },
};

export const IndicatorTypesLabels = {
  get [IndicatorTypes.PointsVolume]() {
    return 'Volume de Pontos';
  },
  get [IndicatorTypes.RegisterAverage]() {
    return 'Média de Cadastros';
  },
  get [IndicatorTypes.Attained]() {
    return 'Atingido, Meta e Grupo';
  },
};
