import gql from 'graphql-tag';

export const ProductsListQuery = gql`
  query ProductsListQuery($cycleId: String!, $filter: String) {
    products(cycleId: $cycleId, filter: $filter) {
      productId
      name
      description
      price
    }
  }
`;

export const AddStockProductMutation = gql`
  mutation AddStockProduct($input: AddStockProductInput!) {
    addStockProduct(input: $input) {
      stockProduct {
        id
        productCode
        productName
        stockQuantity
      }
    }
  }
`;

const getCycleIdFromUser = user => {
  return (
    user &&
    user.estrutura &&
    user.estrutura.ciclo &&
    user.estrutura.ciclo[0] &&
    user.estrutura.ciclo[0].numero &&
    String(user.estrutura.ciclo[0].numero)
  );
};

export const ProductsListQueryOptions = {
  options(props) {
    return {
      variables: {
        filter: props.productAddSearchDebounced,
        cycleId: getCycleIdFromUser(props.user),
      },
    };
  },
};
