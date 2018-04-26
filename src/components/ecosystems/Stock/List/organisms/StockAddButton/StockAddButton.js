import React, { Component } from 'react';
import { ActionsFloatingButton } from 'natura-ui';
import { withRouter } from 'react-router-dom';
import { translate } from 'locale';

export class StockAddButton extends Component {
  importFromOrders = () => {
    this.props.history.push('/my-stock/import/orders');
  };

  addProductToStockDialog = () => {
    this.props.openAddStockModal();
  };

  actions = [
    {
      icon: 'ico_box',
      label: translate('stockImportFromOrders'),
      onClick: this.importFromOrders,
    },
    {
      icon: 'ico_plus',
      label: translate('stockAddProduct'),
      onClick: this.addProductToStockDialog,
    },
  ];

  render() {
    return (
      <ActionsFloatingButton
        actions={this.actions}
        open={this.props.open}
        close={this.props.close}
      />
    );
  }
}

export default withRouter(StockAddButton);
