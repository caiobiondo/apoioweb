import gql from 'graphql-tag';

export const CreateCustomerMutation = gql`
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      customer {
        id
        name
        nickname
      }
    }
  }
`;
