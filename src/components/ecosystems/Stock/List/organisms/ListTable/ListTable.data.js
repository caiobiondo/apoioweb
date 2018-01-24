import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const StockProductsQuery = gql`
  query StockProductsQuery($offset: Int!, $limit: Int!, $filter: String) {
    stockProducts(offset: $offset, limit: $limit, filter: $filter) {
      id
      userId
      productCode
      productName
      productDescription
      productImage
      stockQuantity
      productPrice
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }
  return Object.assign({}, previousResult, {
    stockProducts: [...previousResult.stockProducts, ...fetchMoreResult.stockProducts],
  });
};

export const StockProductsQueryOptions = {
  options(props) {
    return {
      variables: {
        limit: ITEMS_PER_PAGE,
        offset: 0,
        filter: props.productSearch,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    };
  },
  props({ data }) {
    return {
      data,
      refetch: data.refetch,
      loading: data.loading,
      stockProducts: data.stockProducts,
      fetchMore() {
        const offset = data.stockProducts ? data.stockProducts.length : 0;
        return data.fetchMore({
          variables: {
            offset,
          },
          updateQuery: updateQuery,
        });
      },
    };
  },
};
