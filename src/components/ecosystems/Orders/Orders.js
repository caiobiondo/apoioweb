import React, { Component } from 'react';
import { Paper } from 'natura-ui';
import OrdersList from 'components/organisms/OrdersList/OrdersList';
import { scrolledContainer, Main } from './Orders.styles';

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
        <Paper style={containerStyle}>
          <OrdersList onLoadFinished={this.onLoadFinished} />
        </Paper>
      </Main>
    );
  }
}

export default Orders;
