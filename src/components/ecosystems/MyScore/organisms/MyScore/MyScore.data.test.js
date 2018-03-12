import { MyScoreQuery, MyScoreQueryOptions } from './MyScore.data';

describe('MyScoreQuery', () => {
  it('queries correctly', () => {
    expect(MyScoreQuery).toMatchSnapshot();
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
    };

    // when
    const options = MyScoreQueryOptions.options(props);

    // then
    expect(options).toEqual({
      forceFetch: true,
      variables: {
        consultantId: 1,
        commercialStructureMarketManagementId: 2,
        commercialStructureStrategicRegionId: 3,
        commercialStructureSalesManagementId: 4,
        commercialStructureSectorId: 5,
        commercialStructureGroupId: 0,
      },
    });
  });

  it('returns customized props', () => {
    // given
    const props = {
      data: {
        loading: false,
        growthStatus: 'growthStatus',
      },
    };

    // when
    const myScoreprops = MyScoreQueryOptions.props(props);

    // then
    expect(myScoreprops).toEqual({
      loadingScore: false,
      growthStatus: 'growthStatus',
    });
  });
});
