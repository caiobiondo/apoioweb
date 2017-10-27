import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FormButton } from 'natura-ui';

class Orders extends Component {
  render() {
    return (
      <div>
        <h2>Meus Pedidos</h2>
        <ul>
          <li key={1}>
            <FormButton label="Pedido #1" link="my-orders/1" />
          </li>
          <li key={2}>
            <Link to="my-orders/2">Pedido #2</Link>
          </li>
          <li key={3}>
            <Link to="my-orders/3">Pedido #3</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default Orders;
