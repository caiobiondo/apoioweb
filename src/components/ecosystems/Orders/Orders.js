import React, { Component } from 'react';
import { FormButton, Card } from 'natura-ui';
import { List } from './Orders.styles';
import withData from './Orders.data';
import { FormattedMessage } from 'react-intl';

class Orders extends Component {
  render() {
    return (
      <div>
        <h2>
          <FormattedMessage id="my_orders" />
        </h2>
        <List>
          {(this.props.data.orders || []).map((order, index) => {
            const label = `Pedido #${order.orderNumber}`;
            const link = `my-orders/${order.orderNumber}`;
            return (
              <Card key={index}>
                <FormButton label={label} primary={true} link={link} />
              </Card>
            );
          })}
        </List>
      </div>
    );
  }
}

export default withData(Orders);
