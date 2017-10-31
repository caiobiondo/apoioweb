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
        header: {
          orderNumber: `#${order.orderNumber}`
        },
        body: {
          orderDate: order.date,
          orderCycle: order.cycle,
          orderEstimatedDeliveryDate: order.estimatedDeliveryDate
        }
      }}
      middle={{
        header: {
          orderValue: `R$ ${order.orderValue}`
        },
        body: {
          orderTotalScore: order.totalScore
        }
      }}
      right={{
        status: order.status,
        details: `my-orders/${order.orderNumber}`
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
