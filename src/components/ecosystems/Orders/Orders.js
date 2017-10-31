import React, { Component } from 'react';
import { Card } from 'natura-ui';
import { List } from './Orders.styles';
import withData from './Orders.data';
import Order from '../../molecules/Order/Order';
import CustomCard from '../../molecules/CustomCard/CustomCard';

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

class Orders extends Component {
  render() {
    return (
      <Card>
        <List>
          {(this.props.data.orders || []).map(order => {
            return renderOrder(order);
          })}
        </List>
      </Card>
    );
  }
}

export default withData(Orders);
