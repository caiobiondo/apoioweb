import gql from 'graphql-tag';
import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from 'utils/getUserParams';

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

export const FetchProductQueryOptions = {
  options(props) {
    console.log('FetchProductQueryOptions');
    return {
      variables: {
        productId: props.productAddSearchDebounced,
        cycleId: getCycleIdFromUser(props.user),
        commercialStructureId: getCommercialStructureIdFromUser(props.user),
        commercialStructureTypeId: getCommercialStructureTypeIdFromUser(props.user),
      },
    };
  },
};
