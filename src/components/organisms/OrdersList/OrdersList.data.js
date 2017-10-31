import gql from 'graphql-tag';

const OrdersListQuery = gql`
  query OrdersListQuery {
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

export default OrdersListQuery;
