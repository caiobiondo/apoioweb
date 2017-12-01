import gql from 'graphql-tag';

export const PeriodScoreQuery = gql`
  query PeriodScoreQuery(
    $consultantId: Int!
    $commercialStructureMarketManagementId: Int!
    $commercialStructureStrategicRegionId: Int!
    $commercialStructureSalesManagementId: Int!
    $commercialStructureSectorId: Int!
    $commercialStructureGroupId: Int!
  ) {
    growthStatus(
      consultantId: $consultantId
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
      parsedCycle
      currentPlan {
        growthPlanName
        growthPlanYear
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
        commercialStructureGroupId: 0, //props.user.estrutura.grupo.codigo,
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
  query ScoreCyclesQuery($consultantId: Int!, $cycleStart: Int!, $cycleEnd: Int!, $cycle: Int!) {
    scoreCycles(
      consultantId: $consultantId
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
    let cycle = props.growthStatus.cycle;

    if (props.selectedPeriod === 'last') {
      cycle = props.previousPeriod.start;
    }

    return {
      forceFetch: true,
      variables: {
        consultantId: props.user.codigo,
        cycleStart: props.growthStatus.periodStartCycle,
        cycleEnd: props.growthStatus.periodEndCycle,
        cycle: cycle,
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

export const PreviousPeriodQuery = gql`
  query PreviousPeriodQuery($cycle: String!) {
    previousPeriod(cycle: $cycle) {
      start
      year
    }
  }
`;

export const PreviousPeriodQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        cycle: props.growthStatus.cycle,
      },
    };
  },
  props({ data: { loading, previousPeriod } }) {
    return {
      loadingPreviousPeriod: loading,
      previousPeriod,
    };
  },
};
