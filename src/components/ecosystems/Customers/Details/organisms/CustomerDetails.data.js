import gql from 'graphql-tag';

export const CustomerDetailsQuery = gql`
  query FetchCustomerDetails($customerId: Int!) {
    customer(customerId: $customerId) {
      id
      nickname
      name
      gender
      birthday
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
      cachePolicy: 'no-cache',
      forceFetch: true,
      variables: {
        customerId: props.match.params.customerId,
      },
    };
  },
};
