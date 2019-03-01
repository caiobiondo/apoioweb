import React, { Component } from 'react';
import BaseFormSearch from 'components/molecules/BaseFormSearch/BaseFormSearch';
import CustomersList from './organisms/CustomersList/CustomersList';
import {
  Main,
  ActionButtonContainer,
  CustomersSearchContainer,
  SelectedCustomersDescription,
} from './index.styles';
import RemoveCustomerButton from './organisms/RemoveCustomerButton/RemoveCustomerButton';
import CustomerSpeedDial from './organisms/CustomerSpeedDial/CustomerSpeedDial';
import { translate } from 'locale';

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
    const isFiltered = filters && filters.name;
    const totalSelectedCustomers = selectedCustomers.length;

    const baseFormSearchProps = {
      onSearch: this.onSearch,
      searchValue: this.state.courseFilter,
      sectionTitle: { iconName: 'ico_add_customer', value: 'myCustomers' },
      description: 'customersSearchInfo',
      inputLabel: 'customerName',
    };

    return (
      <Main loading={loading} empty={empty}>
        {!loading && <CustomerSpeedDial />}
        {!loading && (
          <CustomersSearchContainer>
            <BaseFormSearch {...baseFormSearchProps} />
          </CustomersSearchContainer>
        )}
        <SelectedCustomersDescription>
          {totalSelectedCustomers > 1 && (
            <span>
              {totalSelectedCustomers} {translate('selectedCustomers')}
            </span>
          )}
        </SelectedCustomersDescription>
        <CustomersList
          filters={filters}
          onLoadFinished={this.onLoadFinished}
          onSelect={this.onSelectCustomer}
          selectedCustomers={selectedCustomers}
          isFiltered={isFiltered}
        />
      </Main>
    );
  }
}

export default CustomersListWrapper;
