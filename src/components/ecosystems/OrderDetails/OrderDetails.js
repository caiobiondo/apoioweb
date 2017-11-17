import React, { Component } from 'react';
import OrderDetailsData from 'components/organisms/OrderDetailsData/OrderDetailsData';
import { OrderDetails } from './OrderDetails.styles';

class OrderDetails extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <OrderDetails>
        <OrderDetailsData orderId={id} />
      </OrderDetails>
    );
  }
}

export default OrderDetails;
