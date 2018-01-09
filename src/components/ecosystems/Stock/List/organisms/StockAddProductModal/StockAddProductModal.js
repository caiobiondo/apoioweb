import React, { Component } from 'react';
import { Modal, FormInput, FlatButton, Dialog } from 'natura-ui';
import PropTypes from 'prop-types';
import StockAddProduct from '../StockAddProduct';
import { dialogContainer, dialogContent, dialogTitle, dialogActions } from 'styles/dialog';
import { translate } from 'locale';

export default class StockAddProductModal extends Component {
  state = {
    search: '',
    successOpened: false,
  };

  onChangeFilter = (event, search) => {
    this.setState({ search });
  };

  onSubmit = () => {
    this.setState({ search: '', successOpened: true });
    this.props.handleClose();
  };

  onClose = () => {
    this.setState({ successOpened: false });
  };

  renderSuccessDialog = () => {
    const title = translate('stockProductSuccessfullyAdded');
    const actions = [
      <FlatButton
        label={translate('ok')}
        primary={true}
        onClick={this.onClose}
        labelStyle={dialogActions}
      />,
    ];

    return (
      <Dialog
        key="successDialog"
        title={title}
        actions={actions}
        modal={false}
        open={this.state.successOpened}
        onRequestClose={this.onClose}
        contentStyle={dialogContainer}
        bodyStyle={dialogContent}
        titleStyle={dialogTitle}
      />
    );
  };

  render() {
    const { search } = this.state;
    return [
      <Modal
        open={this.props.opened}
        showCloseButton={true}
        onCloseClick={this.props.handleClose}
        title={translate('stockProductAddModalTitle')}
      >
        <FormInput
          onChange={this.onChangeFilter}
          name="search"
          label={translate('stockProductCodeLabel')}
          value={this.state.search}
        />
        {search && <StockAddProduct search={this.state.search} onSubmit={this.onSubmit} />}
      </Modal>,
      this.renderSuccessDialog(),
    ];
  }
}

StockAddProductModal.propTypes = {
  opened: PropTypes.bool,
  handleClose: PropTypes.func,
};
