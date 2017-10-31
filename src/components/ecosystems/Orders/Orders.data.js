import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const OrdersQuery = gql`
  query OrdersQuery {
    orders(id: 1) {
      cycle
      date
      estimatedDeliveryDate
      orderNumber
      orderValue
      status
      totalScore
    }
  }
`;

export default graphql(OrdersQuery);
