import React, { Component } from 'react';
import { FormButton, Card } from 'natura-ui';
import { List } from './Orders.styles';
import withData from './Orders.data';

class Orders extends Component {
  render() {
    return (
      <div>
        <h2>Meus Pedidos</h2>
        <List>
          <Card key={1}>
            <FormButton label="Pedido #1" primary={true} link="my-orders/1" />
          </Card>
        </List>
      </div>
    );
  }
}

export default withData(Orders);
