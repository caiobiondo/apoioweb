import gql from 'graphql-tag';

export const UpdateStockProductMutation = gql`
  mutation UpdateStockProduct($input: UpdateStockProductInput!) {
    updateStockProduct(input: $input) {
      stockProduct {
        id
        productCode
        stockQuantity
      }
    }
  }
`;

export const RemoveStockProductMutation = gql`
  mutation RemoveStockProduct($input: RemoveStockProductInput!) {
    removeStockProduct(input: $input) {
      count
    }
  }
`;
