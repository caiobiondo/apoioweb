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
        overcoming
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
        overcoming
      }
    }
    concepts(sellerId: $sellerId, cycle: 1) {
      rangeStart
      rangeEnd
      value
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
