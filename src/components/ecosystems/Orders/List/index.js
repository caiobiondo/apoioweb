import React, { Component } from 'react';
import OrdersList from 'components/organisms/OrdersList/OrdersList';
import OrderAddButton from 'components/atoms/OrderAddButton/OrderAddButton';
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
        <OrdersList onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}

export default Orders;
