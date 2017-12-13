import React, { Component } from 'react';
import { Loading, CircularProgress, Paper, Table } from 'natura-ui';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import Checkbox from 'components/atoms/Checkbox';

import {
  CustomerName,
  LoadingWrapper,
  fullContainer,
  cellStyle,
  SelectedRowStyle,
  Wrapper,
  TableWrapper,
  NameLabel,
  Avatar,
  LinkStyle,
} from './CustomersList.styles';
import { CustomersListQuery } from './CustomersList.data';
import EmptyList from 'components/molecules/EmptyList/EmptyList';

export class CustomersList extends Component {
  loader = (
    <LoadingWrapper>
      <CircularProgress thickness={2} />
    </LoadingWrapper>
  );

  state = {
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

  componentWillReceiveProps({ data, selectedCustomers }) {
    const { customers } = data;

    const parsedCustomers = (customers || []).map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.emails && customer.emails.length && customer.emails[0].email,
      phone: customer.phones && customer.phones.length && customer.phones[0].phone,
      operator: customer.phones && customer.phones.length && customer.phones[0].provider,
      avatar: '',
      style: this.isSelected(customer, selectedCustomers) ? SelectedRowStyle : null,
    }));

    this.setState({ data: { ...this.state.data, body: parsedCustomers } });
  }

  isLoading(loading, orders) {
    return loading && !orders;
  }

  isEmpty(loading, orders) {
    return !loading && (!orders || orders.length === 0);
  }

  isSelected = (customer, selectedCustomers) => {
    return selectedCustomers.filter(({ id }) => id === customer.id).length;
  };

  selectCustomer = customer => {
    const { select } = this.props;
    select(customer);
  };

  selectAllCustomers = () => {
    const { select } = this.props;
    const { customers } = this.props.data;
    select(customers);
  };

  renderCell = ({ value, row }) => {
    return (
      <div>
        {value}
        <Link style={LinkStyle} to={`/my-customers/${row.id}`} />
      </div>
    );
  };

  renderName = ({ value, row }) => {
    const nameInitials = value
      .replace(/[^a-zA-Z- ]/g, '')
      .match(/\b\w/g)
      .join('');
    return (
      <CustomerName>
        <Avatar>{row.avatar ? <img src={row.avatar} alt={value} /> : nameInitials}</Avatar>
        <NameLabel>
          {value}
          <Link style={LinkStyle} to={`/my-customers/${row.id}`} />
        </NameLabel>
      </CustomerName>
    );
  };

  renderSelect = ({ row }) => {
    const isSelected = this.props.selectedCustomers.find(custmr => custmr.id === row.id);
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
    const { loading, customers } = this.props.data;
    const { data } = this.state;

    if (isLoading(loading, customers)) {
      return <Loading background="transparent" />;
    }

    if (isEmpty(loading, customers)) {
      return (
        <Paper style={fullContainer}>
          <EmptyList icon="ico_box" titleId="customersEmptyList" />
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
