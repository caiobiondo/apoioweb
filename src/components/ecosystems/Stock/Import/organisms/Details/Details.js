import React, { Component } from 'react';
import OrderDetailsData from 'components/organisms/OrderDetailsData/OrderDetailsData';
import { StockImportOrderDetailsWrapper } from './Details.styles';

class StockImportOrderDetails extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <StockImportOrderDetailsWrapper>
        <OrderDetailsData orderId={id} importing={true} />
      </StockImportOrderDetailsWrapper>
    );
  }
}

export default StockImportOrderDetails;
