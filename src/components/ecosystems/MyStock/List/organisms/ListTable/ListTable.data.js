import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const MyStockProductsQuery = gql`
  query MyStockProductsQuery($offset: Int!, $limit: Int!, $productName: String) {
    stockProducts(offset: $offset, limit: $limit, productName: $productName) {
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

export const MyStockProductsQueryOptions = {
  options(props) {
    return {
      variables: {
        limit: ITEMS_PER_PAGE,
        offset: 0,
        productName: props.productSearch,
      },
      forceFetch: true,
    };
  },
  props({ data }) {
    return {
      data,
      refetch: data.refetch,
      loading: data.loading,
      stockProducts: data.stockProducts,
      fetchMore(productSearch) {
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
