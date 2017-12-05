import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { Main, OrderAddButtonContainer } from './index.styles';

class CustomersListWrapper extends Component {
  constructor(props) {
    super(props);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  state = {
    empty: false,
    isCustomerSelected: false,
    customersSelected: [],
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  selectCustomer(customers) {
    this.setState({ isCustomerSelected: customers.length, customersSelected: customers });
  }

  removeCustomer() {
    if (this.state.isCustomerSelected) this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { loading, isCustomerSelected } = this.state;
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.handleClose} />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];
    return (
      <Main loading={loading}>
        <OrderAddButtonContainer remove={isCustomerSelected}>
          <CustomerButton action={this.removeCustomer} remove={isCustomerSelected} />
        </OrderAddButtonContainer>
        <CustomersList select={this.selectCustomer} />
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
      </Main>
    );
  }
}

export default CustomersListWrapper;
