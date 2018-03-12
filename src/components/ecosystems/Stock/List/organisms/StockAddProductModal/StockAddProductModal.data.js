import gql from 'graphql-tag';

export const FetchProductQuery = gql`
  query FetchProductQuery(
    $cycleId: String!
    $productId: String!
    $commercialStructureId: Int!
    $commercialStructureTypeId: Int!
  ) {
    product(
      cycleId: $cycleId
      productId: $productId
      commercialStructureId: $commercialStructureId
      commercialStructureTypeId: $commercialStructureTypeId
    ) {
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
