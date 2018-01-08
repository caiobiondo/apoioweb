import React, { Component } from 'react';
import StockSearch from './organisms/ListSearch';
import StockList from './organisms/ListTable';
import StockAddButton from './organisms/StockAddButton';
import { Main, StockSearchContainer, StockAddButtonContainer } from './index.styles';

class StockListWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    productSearch: '',
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  onSearch = filters => {
    this.setState({ productSearch: filters.name });
  };

  render() {
    const { loading, empty } = this.state;
    return (
      <Main loading={loading} empty={empty}>
        {!loading && (
          <StockSearchContainer>
            <StockSearch onSearch={this.onSearch} />
          </StockSearchContainer>
        )}
        {!loading && (
          <StockAddButtonContainer empty={empty}>
            <StockAddButton />
          </StockAddButtonContainer>
        )}
        <StockList onLoadFinished={this.onLoadFinished} productSearch={this.state.productSearch} />
      </Main>
    );
  }
}

export default StockListWrapper;
