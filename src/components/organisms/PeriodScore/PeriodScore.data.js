import gql from 'graphql-tag';

export const PeriodScoreQuery = gql`
  query PeriodScoreQuery(
    $consultantId: Int!
    $commercialStructureMarketManagementId: Int!
    $commercialStructureStrategicRegionId: Int!
    $commercialStructureSalesManagementId: Int!
    $commercialStructureSectorId: Int!
    $consultantCommercialModelId: Int!
    $commercialStructureCountryId: Int!
    $consultantCountryId: Int!
    $commercialStructureGroupId: Int!
  ) {
    growthStatus(
      consultantId: $consultantId
      consultantCountryId: $consultantCountryId
      consultantCommercialModelId: $consultantCommercialModelId
      commercialStructureCountryId: $commercialStructureCountryId
      commercialStructureMarketManagementId: $commercialStructureMarketManagementId
      commercialStructureStrategicRegionId: $commercialStructureStrategicRegionId
      commercialStructureSalesManagementId: $commercialStructureSalesManagementId
      commercialStructureSectorId: $commercialStructureSectorId
      commercialStructureGroupId: $commercialStructureGroupId
    ) {
      currentLevelName
      currentLevelId
      periodTotalPoints
      periodNaturaNetwork
      periodDirectSales
      periodStartCycle
      periodEndCycle
      cycle
      currentPlan {
        growthPlanName
        levels {
          levelId
          levelName
          levelSequence
          levelPointsRangeStart
          levelPointsRangeEnd
          levelPointsRemaining
          color_r
          color_g
          color_b
        }
      }
    }
  }
`;

export const PeriodScoreQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        consultantId: props.user.codigo,
        commercialStructureMarketManagementId: props.user.estrutura.gerenciaMercado.codigo,
        commercialStructureStrategicRegionId: props.user.estrutura.regiaoEstrategica.codigo,
        commercialStructureSalesManagementId: props.user.estrutura.gerenciaVenda.codigo,
        commercialStructureSectorId: props.user.estrutura.setor.codigo,
        consultantCommercialModelId: 1,
        commercialStructureCountryId: 1,
        consultantCountryId: 1,
        commercialStructureGroupId: 8186, //fix
      },
    };
  },
  props({ data: { loading, growthStatus } }) {
    return {
      loadingScore: loading,
      growthStatus,
    };
  },
};

export const ScoreCyclesQuery = gql`
  query ScoreCyclesQuery(
    $consultantId: Int!
    $consultantCommercialModelId: Int!
    $consultantCountryId: Int!
    $cycleStart: Int!
    $cycleEnd: Int!
    $cycle: Int!
  ) {
    scoreCycles(
      consultantId: $consultantId
      consultantCommercialModelId: $consultantCommercialModelId
      consultantCountryId: $consultantCountryId
      cycleStart: $cycleStart
      cycleEnd: $cycleEnd
      cycle: $cycle
    ) {
      totalScore {
        nm_cycle
        vl_score
      }
    }
  }
`;

export const ScoreCyclesQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        consultantId: props.user.codigo,
        consultantCommercialModelId: 1,
        consultantCountryId: 1,
        cycleStart: 1, //fix
        cycleEnd: 10, //fix
        cycle: 201711, //fix
      },
    };
  },
  props({ data: { loading, scoreCycles } }) {
    return {
      loadingCycles: loading,
      scoreCycles,
    };
  },
};
