import React, { Component } from 'react';
import { Paper } from 'natura-ui';
import OrdersList from 'components/organisms/OrdersList/OrdersList';
import { scrolledContainer } from './Orders.styles';

class Orders extends Component {
  render() {
    return (
      <Paper style={scrolledContainer}>
        <OrdersList />
      </Paper>
    );
  }
}

export default Orders;
