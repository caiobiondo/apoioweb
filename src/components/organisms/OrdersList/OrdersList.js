import React, { Component } from 'react';
import { Loading, CircularProgress } from 'natura-ui';
import { List, LoadingWrapper } from './OrdersList.styles';
import { OrdersListQuery, OrdersListQueryOptions } from './OrdersList.data';
import Order from 'components/molecules/Order/Order';
import EmptyOrders from 'components/molecules/EmptyOrders/EmptyOrders';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { formatDate, formatCurrency } from 'locale/utils';
import InfiniteScroll from 'react-infinite-scroller';

const renderOrder = (order, intl) => {
  const orderDate = formatDate(order.dataPedido, intl);
  const orderEstimatedDeliveryDate = formatDate(order.dataPrevisaoEntrega, intl);
  const orderValue = formatCurrency(order.valor, intl);
  const orderProfitsValue = formatCurrency(order.valorLucro, intl);
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
        details: `my-orders/${order.codigoPedido}`,
        status: order.status,
      }}
    />
  );
};

export class OrdersList extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading && this.props.onLoadFinished) {
      this.props.onLoadFinished();
    }
  }

  render() {
    const { loading, orders, fetchMore, intl } = this.props;
    if (loading && !orders) {
      return <Loading background="transparent" />;
    }
    if (!loading && (!orders || orders.length === 0)) {
      return <EmptyOrders />;
    }
    return (
      <InfiniteScroll
        loadMore={fetchMore}
        hasMore={true}
        loader={
          <LoadingWrapper>
            <CircularProgress thickness={2} />
          </LoadingWrapper>
        }
      >
        <List>{orders.map(order => renderOrder(order, intl))}</List>
      </InfiniteScroll>
    );
  }
}

export const OrdersListWithIntl = injectIntl(OrdersList);

export default graphql(OrdersListQuery, OrdersListQueryOptions)(OrdersListWithIntl);
