import React, { Component } from 'react';
import OrderDetailsData from 'components/organisms/OrderDetailsData/OrderDetailsData';
import { OrderDetailsWrapper } from './OrderDetails.styles';

class OrderDetails extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <OrderDetailsWrapper>
        <OrderDetailsData orderId={id} />
      </OrderDetailsWrapper>
    );
  }
}

export default OrderDetails;
