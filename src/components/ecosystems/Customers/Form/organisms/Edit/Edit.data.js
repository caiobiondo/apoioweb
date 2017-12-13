import gql from 'graphql-tag';

export const UpdateCustomerMutation = gql`
  mutation UpdateCustomer($input: UpdateCustomerInput!) {
    updateCustomer(input: $input) {
      customer {
        id
        name
        nickname
      }
    }
  }
`;

export const FindCustomerQuery = gql`
  query FindCustomerQuery($customerId: Int!) {
    customer(customerId: $customerId) {
      id
      nickname
      name
      gender
      comment
      birthday
      emails {
        email
      }
      phones {
        phone
        provider
      }
      addresses {
        additional_address
        city
        neighborhood
        street_name
        street_number
        state
        zipcode
      }
    }
  }
`;

export const FindCustomerQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        customerId: props.match.params.id,
      },
    };
  },
  props({ data: { loading, customer } }) {
    return {
      loading,
      customer,
    };
  },
};
