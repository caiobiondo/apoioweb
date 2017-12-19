import gql from 'graphql-tag';

import ApolloClientCreator from 'infra/ApolloClientCreator';
import { GRAPHQL_URI, ACCESS_TOKEN_LOCAL_STORAGE_KEY, CNO_TOKEN_LOCAL_STORAGE_KEY } from 'config';

const client = new ApolloClientCreator(
  GRAPHQL_URI,
  ACCESS_TOKEN_LOCAL_STORAGE_KEY,
  CNO_TOKEN_LOCAL_STORAGE_KEY,
).create();

export const AddressQuery = gql`
  query AddressQuery($zipcode: String) {
    addressInfo(zipcode: $zipcode) {
      additional_address
      city
      neighborhood
      street_name
      street_number
      state
      zipcode
    }
  }
`;

export const fetchAddress = zipcode => {
  return client
    .query({ query: AddressQuery, variables: { zipcode } })
    .then(({ data }) => data.addressInfo);
};
