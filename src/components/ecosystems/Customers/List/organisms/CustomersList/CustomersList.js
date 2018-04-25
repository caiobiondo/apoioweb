import React, { Component } from 'react';
import { Loading, CircularProgress, Paper, Table, Checkbox } from 'natura-ui';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import CustomerAvatar from '../../../atoms/CustomerAvatar';
import { gtmPushDataLayerEvent, events, categories, actions, labels } from 'utils/googleTagManager';

import {
  CustomerName,
  LoadingWrapper,
  fullContainer,
  cellStyle,
  SelectedRowStyle,
  Wrapper,
  TableWrapper,
  NameLabel,
  CustomerAvatarStyle,
  LinkStyle,
} from './CustomersList.styles';
import { CustomersListQuery } from './CustomersList.data';
import EmptyList from 'components/molecules/EmptyList/EmptyList';

export class CustomersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        columns: ['select', 'name', 'email', 'phone', 'operator'],
        style: {
          select: {
            width: '1px',
            ...cellStyle,
          },
          name: {
            ...cellStyle,
            color: '#222',
            fontSize: '17px',
            fontWeight: '500',
          },
          email: cellStyle,
          phone: cellStyle,
          operator: cellStyle,
        },
        renderer: {
          name: this.renderName,
          email: this.renderCell,
          phone: this.renderCell,
          operator: this.renderCell,
          select: this.renderSelect,
          thead: {
            select: this.renderSelectAll,
          },
        },
        header: {
          name: <FormattedMessage id="customerName" />,
          email: <FormattedMessage id="customerEmail" />,
          phone: <FormattedMessage id="customerPhone" />,
          operator: <FormattedMessage id="customerPhoneProvider" />,
        },
      },
    };
  }

  loader = (
    <LoadingWrapper>
      <CircularProgress thickness={2} />
    </LoadingWrapper>
  );

  componentWillReceiveProps({ data, selectedCustomers, filters }) {
    const { loading, customers } = data;

    const filteredCustomers = this.filterCustomers(customers, filters);

    const parsedCustomers = filteredCustomers.map(customer => ({
      id: customer.id,
      name: customer.nickname || customer.name,
      email: customer.emails && customer.emails.length && customer.emails[0].email,
      phone: customer.phones && customer.phones.length && customer.phones[0].phone,
      operator: customer.phones && customer.phones.length && customer.phones[0].provider,
      avatar: '',
      style: this.isSelected(customer, selectedCustomers) ? SelectedRowStyle : null,
    }));

    this.setState({ data: { ...this.state.data, body: parsedCustomers } });

    this.notifyLoadFinish(loading, parsedCustomers);
  }

  filterCustomers = (customers, filters) => {
    if (!customers) {
      return [];
    }
    if (!filters || !filters.name) {
      return customers;
    }

    const regexp = new RegExp(filters.name.toLowerCase(), 'i');
    const filteredCustomers = customers.filter(
      customer =>
        (customer.nickname && regexp.test(customer.nickname.toLowerCase())) ||
        (customer.name && regexp.test(customer.name.toLowerCase())),
    );

    gtmPushDataLayerEvent({
      event: events.SEARCH_CUSTOMER,
      category: categories.REGISTRATION,
      action: actions.SEARCH_REGISTRATION,
      label: labels.CUSTOMER,
      searchResults: filteredCustomers.length,
    });

    return filteredCustomers;
  };

  notifyLoadFinish = (loading, customers) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(
        this.isEmpty(loading, customers),
        this.isLoading(loading, customers),
      );
    }
  };

  isLoading = (loading, customers) => {
    return loading && !customers;
  };

  isEmpty = (loading, customers) => {
    return !loading && (!customers || customers.length === 0);
  };

  isSelected = (customer, selectedCustomers) => {
    return selectedCustomers.find(({ id }) => id === customer.id);
  };

  selectCustomer = customer => {
    this.props.onSelect(customer);
  };

  selectAllCustomers = () => {
    const { customers } = this.props.data;
    this.props.onSelect(customers);
  };

  renderCell = ({ value, row }) => {
    return (
      <div>
        {value || '-'}
        <Link style={LinkStyle} to={`/my-customers/detail/${row.id}`} />
      </div>
    );
  };

  renderName = ({ value, row }) => {
    return (
      <CustomerName>
        <CustomerAvatar name={value} avatar={row.avatar} style={CustomerAvatarStyle} />
        <NameLabel>
          {value}
          <Link style={LinkStyle} to={`/my-customers/detail/${row.id}`} />
        </NameLabel>
      </CustomerName>
    );
  };

  renderSelect = ({ row }) => {
    const isSelected = this.isSelected(row, this.props.selectedCustomers);
    return (
      <div className={isSelected ? 'is-selected' : ''} onClick={() => this.selectCustomer(row)}>
        <Checkbox checked={isSelected} />
      </div>
    );
  };

  renderSelectAll = () => {
    return (
      <div onClick={() => this.selectAllCustomers()}>
        <Checkbox />
      </div>
    );
  };

  render() {
    const { isLoading, isEmpty } = this;
    const { loading } = this.props.data;
    const { data } = this.state;

    if (isLoading(loading, data.body)) {
      return <Loading background="transparent" />;
    }

    if (isEmpty(loading, data.body)) {
      const emptyListText = this.props.isFiltered
        ? 'emptySearchResult'
        : 'customersEmptyListDescription';

      return (
        <Paper style={fullContainer}>
          <EmptyList
            icon="ico_add_customer"
            titleId="customersEmptyList"
            descriptionId={emptyListText}
          />
        </Paper>
      );
    }

    return (
      <Paper style={Wrapper}>
        <TableWrapper>
          <Table data={data} />
        </TableWrapper>
      </Paper>
    );
  }
}

export default graphql(CustomersListQuery)(CustomersList);
