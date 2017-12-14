import React, { Component } from 'react';
import CustomersList from './organisms/CustomersList/CustomersList';
import { Main, ActionButtonContainer } from './index.styles';
import RemoveCustomerButton from './organisms/RemoveCustomerButton/RemoveCustomerButton';

class CustomersListWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    selectedCustomers: [],
  };

  onLoadFinished = (empty, loading) => {
    this.setState({ empty: empty, loading: loading });
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
    const { selectedCustomers, loading, empty } = this.state;
    return (
      <Main loading={loading} empty={empty}>
        {!loading && (
          <ActionButtonContainer empty={empty}>
            <RemoveCustomerButton
              selected={selectedCustomers}
              onRemove={this.onRemoveCustomer}
              isCustomerSelected={selectedCustomers.length}
            />
          </ActionButtonContainer>
        )}
        <CustomersList
          onLoadFinished={this.onLoadFinished}
          onSelect={this.onSelectCustomer}
          selectedCustomers={selectedCustomers}
        />
      </Main>
    );
  }
}

export default CustomersListWrapper;
