import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, FormattedMessage } from 'react-intl';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';

import { CustomersListQuery } from '../CustomersList/CustomersList.data';
import { CustomerAddButtonContainer } from './RemoveCustomerButton.styles';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

class RemoveCustomerButton extends Component {
  state = {
    open: false,
  };

  removeCustomerModal = () => {
    this.setState({ open: true });
  };

  goToCustomerForm = () => {
    console.log('opens here customer add form');
  };

  onButtonAction = () => {
    if (this.props.isCustomerSelected) {
      this.removeCustomerModal();
    } else {
      this.goToCustomerForm();
    }
  };

  removeCustomer = () => {
    const { selected } = this.props;
    const customersIdToBeRemoved = selected.map(({ id }) => id);

    if (selected.length) {
      this.props
        .mutate({
          variables: { input: { ids: customersIdToBeRemoved } },
          optimisticResponse: {
            removeCustomers: { ids: customersIdToBeRemoved },
          },
          update: (store, { data: { removeCustomers } }) => {
            const data = store.readQuery({ query: CustomersListQuery });
            data.customers = data.customers.filter(
              ({ id }) => !customersIdToBeRemoved.includes(id),
            );
            store.writeQuery({ query: CustomersListQuery, data });
            this.setState({ open: false });
            this.props.remove();
          },
        })
        .then(() => {
          console.log('uhul!');
        });
    }
  };

  onCloseModal = () => {
    this.setState({ open: false });
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

    return (
      <CustomerAddButtonContainer>
        <CustomerButton action={this.onButtonAction} remove={this.props.isCustomerSelected} />
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
        </Dialog>
      </CustomerAddButtonContainer>
    );
  }
}

export const RemoveCustomerButtonWithIntl = injectIntl(RemoveCustomerButton);
export default graphql(RemoveCustomersMutation)(RemoveCustomerButtonWithIntl);
