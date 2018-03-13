import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const StockProductsQuery = gql`
  query StockProductsQuery($offset: Int!, $limit: Int!, $filter: String) {
    stockProducts(offset: $offset, limit: $limit, filter: $filter) {
      hasNextPage
      items {
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
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  const previousResultIds = previousResult.stockProducts.items.map(item => item.id);
  const fetchMoreResultsToAdd = fetchMoreResult.stockProducts.items.filter(
    item => previousResultIds.indexOf(item.id) < 0,
  );

  return Object.assign({}, previousResult, {
    stockProducts: {
      __typename: previousResult.stockProducts.__typename,
      hasNextPage: fetchMoreResult.stockProducts.hasNextPage,
      items: [...previousResult.stockProducts.items, ...fetchMoreResultsToAdd],
    },
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
    const { refetch, loading } = data;
    const stockProducts = data.stockProducts && data.stockProducts.items;
    const hasNextPage = (data.stockProducts && data.stockProducts.hasNextPage) || false;

    return {
      data,
      refetch,
      loading,
      stockProducts,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = stockProducts ? stockProducts.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
