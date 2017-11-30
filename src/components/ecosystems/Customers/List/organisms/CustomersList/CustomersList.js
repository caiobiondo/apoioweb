import React, { Component } from 'react';
import { Loading, CircularProgress, Paper, Table } from 'natura-ui';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
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
    this.selectCustomer = this.selectCustomer.bind(this);

    this.state = {
      data: {
        columns: ['select', 'name', 'email', 'phone', 'operator'],
        style: {
          select: {
            width: '5%',
            ...cellStyle,
          },
          name: cellStyle,
          email: cellStyle,
          phone: cellStyle,
          operator: cellStyle,
        },
        renderer: {
          name: this.renderName,
          select: this.renderSelect,
        },
        header: {
          name: 'NOME',
          email: 'EMAIL',
          phone: 'TELEFONE',
          operator: 'OPERADORA',
        },
      },
      selectedCustomers: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    const data = { ...this.state.data, body: nextProps.customers };
    this.setState({ data });
  }

  loading(loading, orders) {
    return loading && !orders;
  }

  empty(loading, orders) {
    return !loading && (!orders || orders.length === 0);
  }

  selectCustomer(selectedCustomer) {
    let selectedCustomers = [];
    if (this.state.selectedCustomers.filter(c => c.code === selectedCustomer.code).length) {
      selectedCustomers = this.state.selectedCustomers.filter(
        c => c.code !== selectedCustomer.code,
      );
      this.props.select(selectedCustomers);
      return this.setState({ selectedCustomers });
    }
    selectedCustomers = [...this.state.selectedCustomers, selectedCustomer];
    this.props.select(selectedCustomers);
    this.setState({ selectedCustomers });
  }

  renderName({ value, row }) {
    const names = value.split(' ');
    const initials = names[0].substring(0, 1) + names[names.length - 1].substring(0, 1);
    return (
      <CustomerName>
        <Avatar>{row.avatar ? <img src={row.avatar} alt={value} /> : initials}</Avatar>
        <NameLabel>{value}</NameLabel>
      </CustomerName>
    );
  }

  renderSelect({ row }) {
    const isSelected = this.state.selectedCustomers.filter(customer => customer.code === row.code);

    if (true) {
      return (
        <div onClick={() => this.selectCustomer(row)}>
          <Checkbox checked={isSelected.length} />
        </div>
      );
    }
  }

  render() {
    const { loading, customers } = this.props;
    const { data } = this.state;

    if (this.loading(loading, customers)) {
      return <Loading background="transparent" />;
    }

    if (this.empty(loading, customers)) {
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

export default graphql(CustomersListQuery, CustomersListQueryOptions)(CustomersListWithIntl);
