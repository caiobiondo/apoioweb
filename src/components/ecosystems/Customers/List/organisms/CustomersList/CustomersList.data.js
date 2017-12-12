import gql from 'graphql-tag';

export const CustomersListQuery = gql`
  query CustomersListQuery {
    customers {
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
    }
  }
`;
