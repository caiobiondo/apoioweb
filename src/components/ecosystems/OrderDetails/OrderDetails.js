import React, { Component } from 'react';
import OrderDetailsData from 'components/organisms/OrderDetailsData/OrderDetailsData';

class OrderDetails extends Component {
  render() {
    const { id } = this.props.match.params;
    return <OrderDetailsData orderId={id} />;
  }
}

export default OrderDetails;
