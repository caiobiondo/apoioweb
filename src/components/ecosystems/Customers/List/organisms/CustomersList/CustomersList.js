import React, { Component } from 'react';
import { Loading, CircularProgress, Paper, Table } from 'natura-ui';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import InfiniteScroll from 'react-infinite-scroller';

import {
  List,
  LoadingWrapper,
  scrolledContainer,
  fullContainer,
  cellStyle,
  Wrapper,
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

  render() {
    const { loading, customers, fetchMore, intl } = this.props;
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
        <Table data={tableData} />
      </Paper>
    );

    // <List>{orders.map(order => renderOrder(order, intl))}</List>
    // return (
    //   <Wrapper>
    //     <Paper style={scrolledContainer}>
    //       <InfiniteScroll
    //         loadMore={fetchMore}
    //         hasMore={false}
    //         loader={this.loader}
    //       >
    //
    //       </InfiniteScroll>
    //     </Paper>
    //   </Wrapper>
    // );
  }
}

export const CustomersListWithIntl = injectIntl(CustomersList);

export default graphql(CustomersListQuery, CustomersListQueryOptions)(CustomersListWithIntl);
