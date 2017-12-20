import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, FormattedMessage } from 'react-intl';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';
import { withRouter } from 'react-router-dom';

import { CustomersListQuery } from '../CustomersList/CustomersList.data';
import {
  dialogContainer,
  dialogContent,
  dialogTitle,
  dialogActions,
} from './RemoveCustomerButton.styles';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

export class RemoveCustomerButton extends Component {
  state = {
    open: false,
    success: false,
  };

  removeCustomerModal = () => {
    this.setState({ open: true });
  };

  goToCustomerForm = () => {
    this.props.history.push(`/new-customer`);
  };

  onButtonAction = () => {
    if (this.props.isCustomerSelected) {
      this.removeCustomerModal();
    } else {
      this.goToCustomerForm();
    }
  };

  removeCustomer = () => {
    const ids = this.customersIdToBeRemoved();

    if (this.props.selected && this.props.selected.length) {
      this.props
        .mutate({
          variables: { input: { ids: ids } },
          optimisticResponse: {
            removeCustomers: { ids: ids },
          },
          update: this.onUpdate,
        })
        .then(() => {
          this.setState({ success: true });
        });
    }
  };

  customersIdToBeRemoved = () => {
    return this.props.selected.map(({ id }) => id);
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  onUpdate = (store, { data: { removeCustomers } }) => {
    const data = store.readQuery({ query: CustomersListQuery });
    data.customers = data.customers.filter(({ id }) => !removeCustomers.ids.includes(id));
    store.writeQuery({ query: CustomersListQuery, data });
    this.setState({ open: true, success: true });
  };

  onFinish = () => {
    this.setState({ open: false, success: false });
    this.props.onRemove();
  };

  renderSelectedCustomers = () => {
    const { selected } = this.props;
    return selected.map(customer => customer.name || customer.nickname).join(', ');
  };

  renderConfirmationDialog = () => {
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'customerShouldBeRemoved' });
    const selectedCustomers = this.renderSelectedCustomers();
    const actions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        primary={false}
        onClick={this.onCloseModal}
        labelStyle={dialogActions}
      />,
      <FlatButton
        label={<FormattedMessage id="remove" />}
        primary={true}
        onClick={this.removeCustomer}
        labelStyle={dialogActions}
      />,
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.onCloseModal}
        contentStyle={dialogContainer}
        bodyStyle={dialogContent}
        titleStyle={dialogTitle}
      >
        <FormattedMessage
          id="customerShouldBeRemovedWarning"
          values={{
            names: <b>{selectedCustomers}</b>,
          }}
        />
      </Dialog>
    );
  };

  renderSuccessDialog = () => {
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'customerRemoved' });
    const actions = [
      <FlatButton
        label={<FormattedMessage id="ok" />}
        primary={true}
        onClick={this.onFinish}
        labelStyle={dialogActions}
      />,
    ];

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.onFinish}
        contentStyle={dialogContainer}
        bodyStyle={dialogContent}
        titleStyle={dialogTitle}
      />
    );
  };

  render() {
    const dialog = this.state.success
      ? this.renderSuccessDialog()
      : this.renderConfirmationDialog();

    return [
      <CustomerButton action={this.onButtonAction} remove={this.props.isCustomerSelected} />,
      dialog,
    ];
  }
}

export const RemoveCustomerButtonWithIntl = injectIntl(RemoveCustomerButton);
export const RemoveCustomerButtonWithData = graphql(RemoveCustomersMutation)(
  RemoveCustomerButtonWithIntl,
);
export default withRouter(RemoveCustomerButtonWithData);
