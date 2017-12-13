import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList/CustomersList';
import { Main } from './index.styles';
import RemoveCustomerButton from './organisms/RemoveCustomerButton/RemoveCustomerButton';

class CustomersListWrapper extends Component {
  state = {
    empty: false,
    selectedCustomers: [],
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
  };

  selectCustomer = customer => {
    const { selectedCustomers } = this.state;

    if (customer.length) {
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
    const { loading, selectedCustomers } = this.state;
    return (
      <Main loading={loading}>
        <RemoveCustomerButton
          selected={selectedCustomers}
          onRemove={this.onRemoveCustomer}
          isCustomerSelected={selectedCustomers.length}
        />
        <CustomersList select={this.selectCustomer} selectedCustomers={selectedCustomers} />
      </Main>
    );
  }
}

export default CustomersListWrapper;
