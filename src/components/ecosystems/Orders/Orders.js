import React, { Component } from 'react';
import { Paper } from 'natura-ui';
import OrdersList from 'components/organisms/OrdersList/OrdersList';
import OrderAddButton from 'components/atoms/OrderAddButton/OrderAddButton';
import { scrolledContainer, Main, OrderAddButtonContainer } from './Orders.styles';

class Orders extends Component {
  state = {
    loading: true,
  };

  onLoadFinished = () => {
    this.setState({ loading: false });
  };

  render() {
    const { loading } = this.state;
    const containerStyle = loading ? {} : scrolledContainer;
    return (
      <Main>
        {!loading && (
          <OrderAddButtonContainer>
            <OrderAddButton />
          </OrderAddButtonContainer>
        )}
        <Paper style={containerStyle}>
          <OrdersList onLoadFinished={this.onLoadFinished} />
        </Paper>
      </Main>
    );
  }
}

export default Orders;
