import {
  ScoreCyclesQuery,
  ScoreCyclesQueryOptions,
  PreviousPeriodQuery,
  PreviousPeriodQueryOptions,
} from './ScoreCycles.data';

describe('ScoreCyclesQuery', () => {
  it('queries correctly', () => {
    expect(ScoreCyclesQuery).toMatchSnapshot();
  });

  it('queries with defined options correctly', () => {
    // given
    const props = {
      user: {
        codigo: 1,
        estrutura: {
          gerenciaMercado: {
            codigo: 2,
          },
          regiaoEstrategica: {
            codigo: 3,
          },
          gerenciaVenda: {
            codigo: 4,
          },
          setor: {
            codigo: 5,
          },
        },
      },
      selectedPeriod: 'last',
      previousPeriod: {
        year: '2016',
        start: '201601',
      },
      growthStatus: {
        currentPlan: {
          levels: [{ levelId: 1, levelSequence: 1 }, { levelId: 2, levelSequence: 2 }],
          growthPlanYear: '2017',
        },
        currentLevelId: 2,
        cycle: '201708',
        parsedCycle: '2017/08',
        periodStartCycle: 1,
        periodEndCycle: 10,
      },
    };

    // when
    const options = ScoreCyclesQueryOptions.options(props);

    // then
    expect(options).toEqual({
      forceFetch: true,
      variables: {
        consultantId: 1,
        cycleStart: 1,
        cycleEnd: 10,
        cycle: '201601',
      },
    });
  });

  it('returns customized props', () => {
    // given
    const props = {
      data: {
        loading: false,
        scoreCycles: [],
      },
    };

    // when
    const scoreCyclesProps = ScoreCyclesQueryOptions.props(props);

    // then
    expect(scoreCyclesProps).toEqual({
      loadingCycles: false,
      scoreCycles: [],
    });
  });
});

describe('PreviousPeriodQuery', () => {
  it('queries correctly', () => {
    expect(PreviousPeriodQuery).toMatchSnapshot();
  });

  it('queries with defined options correctly', () => {
    // given
    const props = {
      user: {
        codigo: 1,
        estrutura: {
          gerenciaMercado: {
            codigo: 2,
          },
          regiaoEstrategica: {
            codigo: 3,
          },
          gerenciaVenda: {
            codigo: 4,
          },
          setor: {
            codigo: 5,
          },
        },
      },
      selectedPeriod: 'last',
      previousPeriod: {
        year: '2016',
        start: '201601',
      },
      growthStatus: {
        currentPlan: {
          levels: [{ levelId: 1, levelSequence: 1 }, { levelId: 2, levelSequence: 2 }],
          growthPlanYear: '2017',
        },
        currentLevelId: 2,
        cycle: '201708',
        parsedCycle: '2017/08',
        periodStartCycle: 1,
        periodEndCycle: 10,
      },
    };

    // when
    const options = PreviousPeriodQueryOptions.options(props);

    // then
    expect(options).toEqual({
      forceFetch: true,
      variables: {
        cycle: '201708',
      },
    });
  });

  it('returns customized props', () => {
    // given
    const props = {
      data: {
        loading: false,
        previousPeriod: [],
      },
    };

    // when
    const previousPeriodProps = PreviousPeriodQueryOptions.props(props);

    // then
    expect(previousPeriodProps).toEqual({
      loadingPreviousPeriod: false,
      previousPeriod: [],
    });
  });
});
