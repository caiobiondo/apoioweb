import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList';
import { Main } from './index.styles';
import RemoveCustomerButton from './organisms/RemoveCustomerButton';

class CustomersListWrapper extends Component {
  constructor(props) {
    super(props);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.onRemoveCustomer = this.onRemoveCustomer.bind(this);
  }

  state = {
    empty: false,
    selectedCustomers: [],
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  selectCustomer(customer) {
    const { selectedCustomers } = this.state;
    const newSelected = selectedCustomers.filter(({ id }) => id !== customer.id);

    if (newSelected.length !== selectedCustomers.length) {
      return this.setState({ selectedCustomers: newSelected });
    }

    this.setState({
      selectedCustomers: [...selectedCustomers, customer],
    });
  }

  onRemoveCustomer() {
    this.setState({ selectedCustomers: [] });
  }

  render() {
    const { loading, selectedCustomers } = this.state;
    console.log(selectedCustomers);
    return (
      <Main loading={loading}>
        <RemoveCustomerButton
          selected={selectedCustomers}
          remove={this.onRemoveCustomer}
          isCustomerSelected={selectedCustomers.length}
        />
        <CustomersList select={this.selectCustomer} selectedCustomers={selectedCustomers} />
      </Main>
    );
  }
}

export default CustomersListWrapper;
