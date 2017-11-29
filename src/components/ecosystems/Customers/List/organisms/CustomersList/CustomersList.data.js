import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const CustomersListQuery = gql`
  query CustomersListQuery($offset: Int!, $limit: Int!) {
    customers(offset: $offset, limit: $limit) {
      code
      name
      avatar
      email
      phone
      operator
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }
  return Object.assign({}, previousResult, {
    customers: [...previousResult.customers, ...fetchMoreResult.customers],
  });
};

export const CustomersListQueryOptions = {
  options(props) {
    return {
      variables: {
        limit: ITEMS_PER_PAGE,
        offset: 0,
      },
      forceFetch: true,
    };
  },
  props({ data: { loading, customers, fetchMore } }) {
    return {
      loading,
      customers,
      fetchMore() {
        return fetchMore({
          variables: {
            offset: customers.length,
          },
          updateQuery: updateQuery,
        });
      },
    };
  },
};
