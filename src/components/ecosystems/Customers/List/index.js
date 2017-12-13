import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList/CustomersList';
import { Main } from './index.styles';
import RemoveCustomerButton from './organisms/RemoveCustomerButton/RemoveCustomerButton';

class CustomersListWrapper extends Component {
  state = {
    selectedCustomers: [],
  };

  onSelectCustomer = customer => {
    const { selectedCustomers } = this.state;

    if (Array.isArray(customer)) {
      const costumers = customer.length !== selectedCustomers.length ? customer : [];
      return this.setState({
        selectedCustomers: [...costumers],
      });
    }

    const newSelected = selectedCustomers.filter(({ id }) => id !== customer.id);

    if (newSelected.length !== selectedCustomers.length) {
      return this.setState({ selectedCustomers: newSelected });
    }

    return this.setState({
      selectedCustomers: [...selectedCustomers, customer],
    });
  };

  onRemoveCustomer = () => {
    this.setState({ selectedCustomers: [] });
  };

  render() {
    const { selectedCustomers } = this.state;
    return (
      <Main>
        <RemoveCustomerButton
          selected={selectedCustomers}
          onRemove={this.onRemoveCustomer}
          isCustomerSelected={selectedCustomers.length}
        />
        <CustomersList onSelect={this.onSelectCustomer} selectedCustomers={selectedCustomers} />
      </Main>
    );
  }
}

export default CustomersListWrapper;
