import React, { Component } from 'react';
import StockSearch from './organisms/ListSearch';
import StockList from './organisms/ListTable';
import StockAddButton from './organisms/StockAddButton';
import { Main, StockSearchContainer, StockAddButtonContainer } from './index.styles';
import StockAddProductModal from './organisms/StockAddProductModal';
import { gtmPushDataLayerEvent, events } from 'utils/googleTagManager';

class StockListWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    productSearch: '',
    addStockModalOpen: false,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  onSearch = filters => {
    this.setState({ productSearch: filters.name });
  };

  openAddStockModal = () => {
    this.setState({ addStockModalOpen: true });
  };

  handleClose = () => {
    this.setState({ addStockModalOpen: false });
  };

  openAddButton = () => {
    gtmPushDataLayerEvent({
      event: events.EXPAND_ADD_BUTTON,
    });
  };

  closeAddButton = () => {
    gtmPushDataLayerEvent({
      event: events.COLLAPSE_ADD_BUTTON,
    });
  };

  render() {
    const { loading, empty } = this.state;
    return (
      <Main>
        {!loading && (
          <StockSearchContainer>
            <StockSearch onSearch={this.onSearch} />
          </StockSearchContainer>
        )}
        {!loading && (
          <StockAddButtonContainer empty={empty}>
            <StockAddButton
              openAddStockModal={this.openAddStockModal}
              open={this.openAddButton}
              close={this.closeAddButton}
            />
          </StockAddButtonContainer>
        )}
        <StockAddProductModal
          opened={this.state.addStockModalOpen}
          handleClose={this.handleClose}
          user={this.props.user}
        />
        <StockList onLoadFinished={this.onLoadFinished} productSearch={this.state.productSearch} />
      </Main>
    );
  }
}

export default StockListWrapper;
