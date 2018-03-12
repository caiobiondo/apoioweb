import React, { Component } from 'react';
import OrderDetailsData from './organisms/OrderDetailsData/OrderDetailsData';
import { OrderDetailsWrapper } from './index.styles';

class OrderDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { id } = this.props.match.params;
    return (
      <OrderDetailsWrapper>
        <OrderDetailsData orderId={id} user={this.props.user} />
      </OrderDetailsWrapper>
    );
  }
}

export default OrderDetails;
