import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';

import { CustomersListQuery } from '../CustomersList/CustomersList.data';
import { CustomerAddButtonContainer, Bold } from './RemoveCustomerButton.styles';
import { RemoveCustomersMutation } from './RemoveCustomerButton.data';

class RemoveCustomerButton extends Component {
  state = {
    open: false,
  };

  removeCustomerModal = () => {
    this.setState({ open: true });
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
    return selected.map(cutomer => `${cutomer.name}, `);
  };

  render() {
    const actions = [
      <FlatButton label="Cancelar" primary={true} onClick={this.onCloseModal} />,
      <FlatButton label="Deletar" primary={true} onClick={this.removeCustomer} />,
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

export default graphql(RemoveCustomersMutation)(RemoveCustomerButton);
