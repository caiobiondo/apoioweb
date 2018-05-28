import React, { Component } from 'react';
import { Loading, CircularProgress, Paper } from 'natura-ui';
import { List, LoadingWrapper, scrolledContainer } from './OrdersList.styles';
import { OrdersListQuery, OrdersListQueryOptions } from './OrdersList.data';
import Order from '../../molecules/Order';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { formatDate, formatCurrency } from 'locale/utils';
import { CAPTA_ORDER_LIST_URL } from 'config';

import InfiniteScroll from 'components/organisms/InfiniteScroll';

const renderOrder = (order, importing, intl) => {
  const orderDate = formatDate(order.dataPedido, intl, '-');
  const orderEstimatedDeliveryDate = formatDate(order.dataPrevisaoEntrega, intl, '-');
  const orderValue = formatCurrency(order.valor, intl, '-');

  // Order details feature being hidden because capta's api is blocking it due to single sign on
  // let url = `${ROUTE_PREFIX}/my-orders/detail/${order.codigoPedido}`;
  // if (importing) {
  //   url = `${ROUTE_PREFIX}/my-stock/import/orders/detail/${order.codigoPedido}`;
  // }
  const url = CAPTA_ORDER_LIST_URL;

  return (
    <Order
      importing={importing}
      key={order.codigoPedido}
      statusType={order.statusTipo}
      left={{
        body: {
          orderDate: orderDate,
          orderEstimatedDeliveryDate: orderEstimatedDeliveryDate,
        },
        header: {
          orderNumber: `#${order.codigoPedido}`,
        },
      }}
      middle={{
        body: {
          orderTotalScore: order.pontos,
          orderCycle: order.ciclo,
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
    const { loading, orders, fetchMore, importing, intl, hasNextPage } = this.props;

    if (this._loading(loading, orders)) {
      return <Loading background="transparent" />;
    }

    return (
      <Paper style={scrolledContainer}>
        <InfiniteScroll
          onScroll={fetchMore}
          hasMore={hasNextPage}
          loading={loading}
          debounce={500}
          items={orders}
          emptyList={
            <EmptyList
              icon="ico_box"
              titleId="ordersEmptyList"
              descriptionId="ordersWithoutOrders"
            />
          }
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
          }
        >
          <List>{orders && orders.map(order => renderOrder(order, importing, intl))}</List>
        </InfiniteScroll>
      </Paper>
    );
  }
}

export const OrdersListWithIntl = injectIntl(OrdersList);

export default graphql(OrdersListQuery, OrdersListQueryOptions)(OrdersListWithIntl);
