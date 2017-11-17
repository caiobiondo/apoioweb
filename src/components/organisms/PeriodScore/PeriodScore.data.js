import gql from 'graphql-tag';

export const PeriodScoreQuery = gql`
  query PeriodScoreQuery {
    growthStatus {
      currentLevelName
      currentLevelId
      periodTotalPoints
      periodNaturaNetwork
      periodDirectSales
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
    };
  },
  props({ data: { loading, growthStatus } }) {
    return {
      loading,
      growthStatus,
    };
  },
};
