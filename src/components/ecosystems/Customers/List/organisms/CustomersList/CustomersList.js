import React, { Component } from 'react';
import { Loading, CircularProgress, Paper, Table } from 'natura-ui';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';

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
  }

  loading(loading, orders) {
    return loading && !orders;
  }

  empty(loading, orders) {
    return !loading && (!orders || orders.length === 0);
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

  render() {
    const { loading, customers } = this.props;
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

    const tableData = {
      columns: ['name', 'email', 'phone', 'operator'],
      style: {
        name: cellStyle,
        email: cellStyle,
        phone: cellStyle,
        operator: cellStyle,
      },
      renderer: {
        name: this.renderName,
      },
      header: {
        name: 'Nome',
        email: 'Email',
        phone: 'Telefone',
        operator: 'Operadore',
      },
      body: customers,
    };

    console.log(tableData);
    return (
      <Paper style={Wrapper}>
        <TableWrapper>
          <Table data={tableData} />
        </TableWrapper>
      </Paper>
    );
  }
}

export const CustomersListWithIntl = injectIntl(CustomersList);

export default graphql(CustomersListQuery, CustomersListQueryOptions)(CustomersListWithIntl);
