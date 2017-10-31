import React, { Component } from 'react';
import { Card } from 'natura-ui';
import OrderList from '../../organisms/OrdersList/OrdersList';

class Orders extends Component {
  render() {
    return (
      <Card>
        <OrderList />
      </Card>
    );
  }
}

export default Orders;
