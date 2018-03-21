import gql from 'graphql-tag';

export const IndicatorListQuery = gql`
  query OrdersListQuery($sellerId: Int!, $year: Int!) {
    indicators(sellerId: $sellerId, year: $year) {
      indicatorType
      cycles {
        cycle
      }
    }
  }
`;

export const IndicatorListQueryOptions = {
  options({ user }) {
    return {
      variables: {
        year: 0,
        sellerId: user.codigo,
      },
      forceFetch: true,
    };
  },
  props({ data }) {
    return {
      data,
      loading: data.loading,
      indicators: data.indicators,
    };
  },
};
