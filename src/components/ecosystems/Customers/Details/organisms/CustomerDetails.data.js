import gql from 'graphql-tag';

export const CustomerDetailsQuery = gql`
  query FetchCustomerDetails($customerId: Int!) {
    customer(customerId: $customerId) {
      id
      nickname
      name
      gender
      comment
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

export const CustomerDetailsQueryOptions = {
  options(props) {
    return {
      variables: {
        customerId: props.match.params.customerId,
      },
    };
  },
};
