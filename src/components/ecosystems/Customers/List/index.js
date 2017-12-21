import React, { Component } from 'react';
import CustomersSearch from './organisms/CustomerSearch/CustomerSearch';
import CustomersList from './organisms/CustomersList/CustomersList';
import { Main, ActionButtonContainer, CustomersSearchContainer } from './index.styles';
import RemoveCustomerButton from './organisms/RemoveCustomerButton/RemoveCustomerButton';

class CustomersListWrapper extends Component {
  state = {
    empty: false,
    loading: true,
    selectedCustomers: [],
    filters: null,
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

  onSearch = filters => {
    this.setState({ filters });
  };

  render() {
    const { selectedCustomers, loading, empty, filters } = this.state;
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
        {!loading && (
          <CustomersSearchContainer>
            <CustomersSearch onSearch={this.onSearch} />
          </CustomersSearchContainer>
        )}
        <CustomersList
          filters={filters}
          onLoadFinished={this.onLoadFinished}
          onSelect={this.onSelectCustomer}
          selectedCustomers={selectedCustomers}
        />
      </Main>
    );
  }
}

export default CustomersListWrapper;
