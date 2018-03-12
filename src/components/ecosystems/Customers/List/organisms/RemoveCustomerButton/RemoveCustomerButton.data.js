import gql from 'graphql-tag';

export const RemoveCustomersMutation = gql`
  mutation RemoveCustomersMutation($input: RemoveCustomersInput!) {
    removeCustomers(input: $input) {
      ids
    }
  }
`;
