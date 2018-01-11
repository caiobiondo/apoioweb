import gql from 'graphql-tag';
import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from 'utils/getUserParams';
import ApolloClientCreator from 'infra/ApolloClientCreator';
import { GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY, CNO_TOKEN_LOCAL_STORAGE_KEY } from 'config';

const client = new ApolloClientCreator(
  GRAPHQL_URI,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  CNO_TOKEN_LOCAL_STORAGE_KEY,
).create();

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

export const fetchProduct = (productCode, user) => {
  return client
    .query({
      query: FetchProductQuery,
      variables: {
        productId: productCode,
        cycleId: getCycleIdFromUser(user),
        commercialStructureId: getCommercialStructureIdFromUser(user),
        commercialStructureTypeId: getCommercialStructureTypeIdFromUser(user),
      },
    })
    .then(({ data }) => data.product);
};
