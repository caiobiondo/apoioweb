import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Orders extends Component {
  render() {
    return (
      <div>
        <h2>Meus Pedidos</h2>
        <ul>
          <li key={1}>
            <Link to="my-orders/1">Pedido #1</Link>
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
