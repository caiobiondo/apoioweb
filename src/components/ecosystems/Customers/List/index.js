import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Main, OrderAddButtonContainer, Bold } from './index.styles';

class CustomersListWrapper extends Component {
  constructor(props) {
    super(props);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.removeCustomerModal = this.removeCustomerModal.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
    this.onCloseModal = this.onCloseModal.bind(this);
  }

  state = {
    empty: false,
    isCustomerSelected: false,
    customersSelected: [],
    open: false,
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  selectCustomer(customers) {
    this.setState({ isCustomerSelected: customers.length, customersSelected: customers });
  }

  removeCustomerModal() {
    const { isCustomerSelected } = this.state;
    if (isCustomerSelected) this.setState({ open: true });
  }

  removeCustomer() {
    const { customersSelected } = this.state;
    this.setState({ open: false });
    console.log(customersSelected);
  }

  onCloseModal() {
    this.setState({ open: false });
  }

  renderSelectedCustomers() {
    const { customersSelected } = this.state;
    return customersSelected.map(cutomer => `${cutomer.name}, `);
  }

  render() {
    const { loading, isCustomerSelected } = this.state;
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
      <Main loading={loading}>
        <OrderAddButtonContainer remove={isCustomerSelected}>
          <CustomerButton action={this.removeCustomerModal} remove={isCustomerSelected} />
        </OrderAddButtonContainer>
        <CustomersList select={this.selectCustomer} />
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
      </Main>
    );
  }
}

export default CustomersListWrapper;
