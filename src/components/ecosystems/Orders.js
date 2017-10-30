import React, { Component } from 'react';
import { FormButton, Card } from 'natura-ui';

class Orders extends Component {
  render() {
    return (
      <div>
        <h2>Meus Pedidos</h2>
        <ul>
          <Card key={1}>
            <FormButton label="Pedido #1" primary={true} link="my-orders/1" />
          </Card>
        </ul>
      </div>
    );
  }
}

export default Orders;
