import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';

import { injectIntl } from 'react-intl';
import { CustomersListQuery } from '../CustomersList/CustomersList.data';
import { CustomerAddButtonContainer, Bold } from './RemoveCustomerButton.styles';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

class RemoveCustomerButton extends Component {
  constructor(props) {
    super(props);
    this.renderSelectedCustomers = this.renderSelectedCustomers.bind(this);
    this.removeCustomerModal = this.removeCustomerModal.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  state = {
    open: false,
  };

  removeCustomerModal() {
    this.setState({ open: true });
  }

  removeCustomer() {
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
          // refetchQueries: [{ query: CustomersListQuery }],
        })
        .then(() => {
          console.log('uhul!');
        });
    }
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  renderSelectedCustomers() {
    const { selected } = this.props;
    return selected.map(cutomer => `${cutomer.name}, `);
  }

  render() {
    const actions = [
      <FlatButton label="Cancelar" primary={true} onClick={this.onCloseModal} />,
      <FlatButton
        label="Deletar"
        primary={true}
        keyboardFocused={true}
        onClick={this.removeCustomer}
      />,
    ];
    return (
      <CustomerAddButtonContainer remove={this.props.remove}>
        <CustomerButton action={this.removeCustomerModal} remove={this.props.isCustomerSelected} />
        <Dialog
          title="Excluir Cliente?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.removeCustomer}
        >
          Tem certeza que deseja deletar <Bold>{this.renderSelectedCustomers()}</Bold> da sua lista
          lista de clientes?
        </Dialog>
      </CustomerAddButtonContainer>
    );
  }
}

export const RemoveCustomerButtonWithIntl = injectIntl(RemoveCustomerButton);
export default graphql(RemoveCustomersMutation)(RemoveCustomerButtonWithIntl);
