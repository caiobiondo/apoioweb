import React, { Component } from 'react';
import { Loading, CircularProgress, Paper, Table } from 'natura-ui';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { Link } from 'react-router-dom';
import Checkbox from '../../molecules/Checkbox';

import {
  CustomerName,
  LoadingWrapper,
  fullContainer,
  cellStyle,
  Wrapper,
  TableWrapper,
  NameLabel,
  Avatar,
  LinkStyle,
} from './CustomersList.styles';
import { CustomersListQuery, CustomersListQueryOptions } from './CustomersList.data';
import EmptyCustomers from '../../molecules/EmptyCustomers/EmptyCustomers';

class CustomersList extends Component {
  constructor(props) {
    super(props);

    this.loader = (
      <LoadingWrapper>
        <CircularProgress thickness={2} />
      </LoadingWrapper>
    );

    this.renderName = this.renderName.bind(this);
    this.renderSelect = this.renderSelect.bind(this);
    this.renderSelectAll = this.renderSelectAll.bind(this);
    this.selectCustomer = this.selectCustomer.bind(this);
    this.selectAllCustomers = this.selectAllCustomers.bind(this);

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
          name: 'NOME',
          email: 'EMAIL',
          phone: 'TELEFONE',
          operator: 'OPERADORA',
        },
      },
    };
  }

  componentWillReceiveProps(nextProps) {

    const { customers } = nextProps.data;
    const { data } = this.state;

    const parsedCutomers = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.emails && customer.emails.length && customer.emails[0].email,
      phone: customer.phones && customer.phones.length && customer.phones[0].phone,
      operator: customer.phones && customer.phones.length && customer.phones[0].provider,
      avatar: '',
    }));

    this.setState({ data: { ...data, body: parsedCutomers } });
  }

  isLoading(loading, orders) {
    return loading && !orders;
  }

  isEmpty(loading, orders) {
    return !loading && (!orders || orders.length === 0);
  }


  selectCustomer(customer) {
    const { select } = this.props;
    select(customer);
  }

  selectAllCustomers() {
    const { select } = this.props;
    const { customers } = this.props.data;
    select(customers);
  }

  renderCell({ value, row }) {
    return (
      <div>
        {value}
        <Link style={LinkStyle} to={`/my-customers/${row.id}`} />
      </div>
    );
  }

  renderName({ value, row }) {
    const names = value.split(' ');
    const initials = names[0].substring(0, 1) + names[names.length - 1].substring(0, 1);
    return (
      <CustomerName>
        <Avatar>{row.avatar ? <img src={row.avatar} alt={value} /> : initials}</Avatar>
        <NameLabel>
          {value}
          <Link style={LinkStyle} to={`/my-customers/${row.id}`} />
        </NameLabel>
      </CustomerName>
    );
  }

  renderSelect({ row }) {
    const isSelected = this.props.selectedCustomers.find(custmr => custmr.id === row.id);
    return (
      <div className={isSelected ? 'is-selected' : ''} onClick={() => this.selectCustomer(row)}>
        <Checkbox checked={isSelected} />
      </div>
    );
  }

  renderSelectAll() {
    return (
      <div onClick={() => this.selectAllCustomers()}>
        <Checkbox />
      </div>
    );
  }

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
          <EmptyCustomers />
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

export const CustomersListWithIntl = injectIntl(CustomersList);
export default graphql(CustomersListQuery)(CustomersListWithIntl);
