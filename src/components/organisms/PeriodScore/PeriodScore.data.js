import gql from 'graphql-tag';

export const PeriodScoreQuery = gql`
  query PeriodScoreQuery(
    $consultantId: Int!
    $commercialStructureMarketManagementId: Int!
    $commercialStructureStrategicRegionId: Int!
    $commercialStructureSalesManagementId: Int!
    $commercialStructureSectorId: Int!
    $consultantCommercialModelId: Int!
    $comercialStructureCountryId: Int!
    $consultantCountryId: Int!
  ) {
    growthStatus(
      consultantId: $consultantId
      commercialStructureMarketManagementId: $commercialStructureMarketManagementId
      commercialStructureStrategicRegionId: $commercialStructureStrategicRegionId
      commercialStructureSalesManagementId: $commercialStructureSalesManagementId
      commercialStructureSectorId: $commercialStructureSectorId
      consultantCommercialModelId: $consultantCommercialModelId
      comercialStructureCountryId: $comercialStructureCountryId
      consultantCountryId: $consultantCountryId
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
    console.log(props.user);
    return {
      forceFetch: true,
      variables: {
        consultantId: props.user.codigo,
        commercialStructureMarketManagementId: props.user.estrutura.gerenciaMercado.codigo,
        commercialStructureStrategicRegionId: props.user.estrutura.regiaoEstrategica.codigo,
        commercialStructureSalesManagementId: props.user.estrutura.gerenciaVenda.codigo,
        commercialStructureSectorId: props.user.estrutura.setor.codigo,
        consultantCommercialModelId: 1,
        comercialStructureCountryId: 1,
        consultantCountryId: 1,
      },
    };
  },
  props({ data: { loading, growthStatus } }) {
    return {
      loading,
      growthStatus,
    };
  },
};
