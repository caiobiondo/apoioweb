import gql from 'graphql-tag';

export const CustomerDetailsQuery = gql`
  query CustomerDetailsQuery($customerId: Int!) {
    customer(id: $customerId) {
      codigo
    }
  }
`;

export const CustomerDetailsQueryOptions = {
  options(props) {
    return {
      variables: {
        customerId: props.customerId,
      },
    };
  },
};
