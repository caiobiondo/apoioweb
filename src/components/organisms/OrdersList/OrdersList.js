import React, { Component } from 'react';
import { List } from './OrdersList.styles';
import OrdersListQuery from './OrdersList.data';
import Order from 'components/molecules/Order/Order';
import CustomCard from 'components/molecules/CustomCard/CustomCard';
import { graphql } from 'react-apollo';

const renderOrder = order => {
  /* eslint-disable sort-keys */
  return (
    <Order
      key={order.orderNumber}
      color={CustomCard.SUCCESS}
      left={{
        body: {
          orderDate: order.date,
          orderCycle: order.cycle,
          orderEstimatedDeliveryDate: order.estimatedDeliveryDate,
        },
        header: {
          orderNumber: `#${order.orderNumber}`,
        },
      }}
      middle={{
        body: {
          orderTotalScore: order.totalScore,
        },
        header: {
          orderValue: `R$ ${order.orderValue}`,
        },
      }}
      right={{
        details: `my-orders/${order.orderNumber}`,
        status: order.status,
      }}
    />
  );
  /* eslint-enable sort-keys */
};

export class OrdersList extends Component {
  render() {
    return <List>{(this.props.data.orders || []).map(order => renderOrder(order))}</List>;
  }
}

export default graphql(OrdersListQuery)(OrdersList);
