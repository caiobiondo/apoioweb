import gql from 'graphql-tag';

export const ProductsListQuery = gql`
  query ProductsListQuery($cycleId: String!, $filter: String) {
    products(cycleId: $cycleId, filter: $filter) {
      productId
      name
    }
  }
`;

export const ProductsListQueryOptions = {
  options(props) {
    return {
      variables: {
        filter: props.search,
        cycleId: '201718',
      },
      forceFetch: true,
    };
  },
};
