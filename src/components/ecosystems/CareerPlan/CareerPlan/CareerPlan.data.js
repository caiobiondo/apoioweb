import gql from 'graphql-tag';

export const IndicatorListQuery = gql`
  query OrdersListQuery($sellerId: Int!) {
    currentIndicators: indicators(sellerId: $sellerId, year: 1) {
      indicatorType
      significance
      cycles {
        cycle
        isClosed
        objective
        directSale
        naturaNetwork
        overcoming {
          cycle
          value
          concept
        }
      }
    }
    pastIndicators: indicators(sellerId: $sellerId, year: 2) {
      indicatorType
      significance
      cycles {
        cycle
        isClosed
        objective
        directSale
        naturaNetwork
        overcoming {
          cycle
          value
          concept
        }
      }
    }
    concepts(sellerId: $sellerId, cycle: 1) {
      rangeStart
      rangeEnd
      value
    }
  }
`;

export const OvercomingQuery = gql`
  query OvercomingQuery(
    $sellerId: Int!
    $cycleArray: [Int]!
    $indicatorType: String!
    $directSale: [Float]!
    $naturaNetwork: [Float]!
  ) {
    overcoming(
      sellerId: $sellerId
      cycleArray: $cycleArray
      indicatorType: $indicatorType
      directSale: $directSale
      naturaNetwork: $naturaNetwork
    ) {
      cycle
      value
      concept
    }
  }
`;

export const ConsolidatedOvercomingQuery = gql`
  query ConsolidatedOvercomingQuery($sellerId: Int!, $year: Int!, $simulation: [IndicatorInput]!) {
    consolidatedOvercoming(sellerId: $sellerId, year: $year, simulation: $simulation) {
      cycle
      value
      concept
    }
  }
`;

export const IndicatorListQueryOptions = {
  options({ user }) {
    return {
      variables: {
        sellerId: user.codigo,
      },
      forceFetch: true,
    };
  },
  props({ data }) {
    return {
      data,
      loading: data.loading,
      indicators: data.currentIndicators,
      pastIndicators: data.pastIndicators,
      concepts: data.concepts,
    };
  },
};
