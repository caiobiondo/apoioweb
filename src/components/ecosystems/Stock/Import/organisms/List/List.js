import React, { Component } from 'react';
import OrdersList from 'components/ecosystems/Orders/List/organisms/OrdersList/OrdersList';
import { Main } from 'components/ecosystems/Orders/List/index.styles';

export default class StockImportOrdersList extends Component {
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
        <OrdersList importing={true} onLoadFinished={this.onLoadFinished} />
      </Main>
    );
  }
}
