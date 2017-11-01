import React, { Component } from 'react';
import { List } from './OrdersList.styles';
import OrdersListQuery from './OrdersList.data';
import Order from '../../molecules/Order/Order';
import CustomCard from '../../molecules/CustomCard/CustomCard';
import { graphql } from 'react-apollo';

const renderOrder = order => {
  return (
    <Order
      key={order.orderNumber}
      color={CustomCard.SUCCESS}
      left={{
        body: {
          orderCycle: order.cycle,
          orderDate: order.date,
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
};

export class OrdersList extends Component {
  render() {
    return <List>{(this.props.data.orders || []).map(order => renderOrder(order))}</List>;
  }
}

export default graphql(OrdersListQuery)(OrdersList);
