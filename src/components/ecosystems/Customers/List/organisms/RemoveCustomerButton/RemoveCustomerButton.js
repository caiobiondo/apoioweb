import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, FormattedMessage } from 'react-intl';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';
import { withRouter } from 'react-router-dom';

import { CustomersListQuery } from '../CustomersList/CustomersList.data';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

export class RemoveCustomerButton extends Component {
  state = {
    open: false,
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
          // console.log('uhul!');
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
    this.setState({ open: false });
    this.props.onRemove();
  };

  renderSelectedCustomers = () => {
    const { selected } = this.props;
    return selected.map(customer => customer.name).join(', ');
  };

  render() {
    const { intl } = this.props;
    const title = intl.formatMessage({ id: 'customerShouldBeRemoved' });
    const selectedCustomers = this.renderSelectedCustomers();
    const actions = [
      <FlatButton
        label={<FormattedMessage id="cancel" />}
        primary={true}
        onClick={this.onCloseModal}
      />,
      <FlatButton
        label={<FormattedMessage id="remove" />}
        primary={true}
        onClick={this.removeCustomer}
      />,
    ];

    return [
      <CustomerButton action={this.onButtonAction} remove={this.props.isCustomerSelected} />,
      <Dialog
        title={title}
        actions={actions}
        modal={false}
        open={this.state.open}
        onRequestClose={this.removeCustomer}
      >
        <FormattedMessage
          id="customerShouldBeRemovedWarning"
          values={{
            names: <b>{selectedCustomers}</b>,
          }}
        />
      </Dialog>,
    ];
  }
}

export const RemoveCustomerButtonWithIntl = injectIntl(RemoveCustomerButton);
export const asd = graphql(RemoveCustomersMutation)(RemoveCustomerButtonWithIntl);
export default withRouter(asd);
