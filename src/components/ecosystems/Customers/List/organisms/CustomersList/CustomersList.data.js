import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const CustomersListQuery = gql`
  query CustomersListQuery($offset: Int!, $limit: Int!) {
    customers(offset: $offset, limit: $limit) {
      code
      name
      avatar
      email
      phone
      operator
    }
  }
`;
