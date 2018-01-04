import React, { Component } from 'react';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { List, LoadingWrapper, scrolledContainer, fullContainer } from './OrdersList.styles';
import { OrdersListQuery, OrdersListQueryOptions } from './OrdersList.data';
import Order from '../../molecules/Order';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { formatDate, formatCurrency } from 'locale/utils';
import InfiniteScroll from 'react-infinite-scroller';
import withAuthErrorHandler from 'hocs/withAuthErrorHandler/withAuthErrorHandler';
import withErrorHandler from 'hocs/withErrorHandler/withErrorHandler';

const renderOrder = (order, importing, intl) => {
  const orderDate = formatDate(order.dataPedido, intl, '-');
  const orderEstimatedDeliveryDate = formatDate(order.dataPrevisaoEntrega, intl, '-');
  const orderValue = formatCurrency(order.valor, intl, '-');
  const orderProfitsValue = formatCurrency(order.valorLucro, intl, '-');

  let url = `/my-orders/detail/${order.codigoPedido}`;
  if (importing) {
    url = `/my-stock/import/orders/detail/${order.codigoPedido}`;
  }

  return (
    <Order
      importing={importing}
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
        details: url,
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
    const { loading, orders, fetchMore, importing, intl } = this.props;
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
          <List>{orders.map(order => renderOrder(order, importing, intl))}</List>
        </InfiniteScroll>
      </Paper>
    );
  }
}

export const OrdersListWithErrorHandler = withErrorHandler(OrdersList);

export const OrdersListWithAuthErrorHandler = withAuthErrorHandler(OrdersListWithErrorHandler);

export const OrdersListWithIntl = injectIntl(OrdersListWithAuthErrorHandler);

export default graphql(OrdersListQuery, OrdersListQueryOptions)(OrdersListWithIntl);
