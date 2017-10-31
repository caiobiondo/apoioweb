import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const OrdersQuery = gql`
  query OrdersQuery {
    orders(id: 1) {
      orderNumber
      orderValue
      totalScore
    }
  }
`;

export default graphql(OrdersQuery);
