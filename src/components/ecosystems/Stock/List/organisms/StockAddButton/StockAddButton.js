import React, { Component } from 'react';
import { FloatingActionButton, Icon } from 'natura-ui';
import { withRouter } from 'react-router-dom';
import { IconWrapper } from './StockAddButton.styles';

class StockAddButton extends Component {
  importFromOrders = () => {
    this.props.history.push(`/my-stock/import/orders`);
  };

  render() {
    return (
      <FloatingActionButton iconWrapper={IconWrapper} onClick={this.importFromOrders}>
        <Icon file="ico_plus" />
      </FloatingActionButton>
    );
  }
}

export default withRouter(StockAddButton);
