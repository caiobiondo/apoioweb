import React, { Component } from 'react';
import OrderDetailsData from 'components/organisms/OrderDetailsData/OrderDetailsData';
import { OrderDetailsWrapper } from './OrderDetails.styles';

class OrderDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

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
