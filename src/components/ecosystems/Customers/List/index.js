import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList';
import CustomerButton from 'components/atoms/CustomerButton/CustomerButton';
import { Main, OrderAddButtonContainer } from './Orders.styles';

class CustomersListWrapper extends Component {
  constructor(props) {
    super(props);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.removeCustomer = this.removeCustomer.bind(this);
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
    if (!this.state.customersSelected.length) return;
    console.log(this.state.customersSelected);
  }

  render() {
    const { loading, isCustomerSelected } = this.state;
    return (
      <Main loading={loading}>
        <OrderAddButtonContainer remove={isCustomerSelected}>
          <CustomerButton action={this.removeCustomer} remove={isCustomerSelected} />
        </OrderAddButtonContainer>
        <CustomersList select={this.selectCustomer} />
      </Main>
    );
  }
}

export default CustomersListWrapper;
