import React, { Component } from 'react';
import OrdersList from './organisms/OrdersList/OrdersList';
import OrderAddButton from './atoms/OrderAddButton/OrderAddButton';
import { Main, OrderAddButtonContainer } from './index.styles';

class Orders extends Component {
  state = {
    empty: false,
    loading: true,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  render() {
    const { loading, empty } = this.state;
    return (
      <Main loading={loading} empty={empty}>
        {!loading && (
          <OrderAddButtonContainer empty={empty}>
            <OrderAddButton />
          </OrderAddButtonContainer>
        )}
        <OrdersList onLoadFinished={this.onLoadFinished} user={this.props.user} />
      </Main>
    );
  }
}

export default Orders;
