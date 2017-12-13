import React, { Component } from 'react';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { List, LoadingWrapper, scrolledContainer, fullContainer } from './OrdersList.styles';
import { OrdersListQuery, OrdersListQueryOptions } from './OrdersList.data';
import Order from 'components/molecules/Order/Order';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { formatDate, formatCurrency } from 'locale/utils';
import InfiniteScroll from 'react-infinite-scroller';
import withAuthErrorHandler from 'hocs/withAuthErrorHandler/withAuthErrorHandler';

const renderOrder = (order, intl) => {
  const orderDate = formatDate(order.dataPedido, intl, '-');
  const orderEstimatedDeliveryDate = formatDate(order.dataPrevisaoEntrega, intl, '-');
  const orderValue = formatCurrency(order.valor, intl, '-');
  const orderProfitsValue = formatCurrency(order.valorLucro, intl, '-');
  return (
    <Order
      key={order.codigoPedido}
      statusType={order.statusTipo}
      left={{
        body: {
          orderDate: orderDate,
          orderCycle: order.ciclo,
          orderEstimatedDeliveryDate: orderEstimatedDeliveryDate,
        },
        header: {
          orderNumber: `#${order.codigoPedido}`,
        },
      }}
      middle={{
        body: {
          orderTotalScore: order.pontos,
          orderProfitsValue: orderProfitsValue,
        },
        header: {
          orderValue: orderValue,
        },
      }}
      right={{
        details: `/my-orders/${order.codigoPedido}`,
        status: order.status,
      }}
    />
  );
};

export class OrdersList extends Component {
  componentWillReceiveProps({ loading, orders, onLoadFinished }) {
    if (!loading && onLoadFinished) {
      this.props.onLoadFinished(this._empty(loading, orders), this._loading(loading, orders));
    }
  }

  _loading(loading, orders) {
    return loading && !orders;
  }

  _empty(loading, orders) {
    return !loading && (!orders || orders.length === 0);
  }

  render() {
    const { loading, orders, fetchMore, intl } = this.props;
    if (this._loading(loading, orders)) {
      return <Loading background="transparent" />;
    }
    if (this._empty(loading, orders)) {
      return (
        <Paper style={fullContainer}>
          <EmptyList icon="ico_box" titleId="ordersEmptyList" descriptionId="ordersWithoutOrders" />
        </Paper>
      );
    }
    return (
      <Paper style={scrolledContainer}>
        <InfiniteScroll
          loadMore={fetchMore}
          hasMore={false}
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
          }
        >
          <List>{orders.map(order => renderOrder(order, intl))}</List>
        </InfiniteScroll>
      </Paper>
    );
  }
}

export const OrdersListWithAuthErrorHandler = withAuthErrorHandler(OrdersList);

export const OrdersListWithIntl = injectIntl(OrdersListWithAuthErrorHandler);

export default graphql(OrdersListQuery, OrdersListQueryOptions)(OrdersListWithIntl);
