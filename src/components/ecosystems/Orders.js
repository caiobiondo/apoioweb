import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
          <Card key={2}>
            <Link to="my-orders/2">Pedido #2</Link>
          </Card>
          <Card key={3}>
            <Link to="my-orders/3">Pedido #3</Link>
          </Card>
        </ul>
      </div>
    );
  }
}

export default Orders;
