import React, { Component } from 'react';
import { Loading } from 'natura-ui';
import { List, LoadingWrapper } from './OrdersList.styles';
import { OrdersListQuery, OrdersListQueryOptions } from './OrdersList.data';
import Order from 'components/molecules/Order/Order';
import CustomCard from 'components/molecules/CustomCard/CustomCard';
import EmptyOrders from 'components/molecules/EmptyOrders/EmptyOrders';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
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
      color={CustomCard.SUCCESS}
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
  render() {
    const { loading, orders, fetchMore, intl } = this.props;
    if (loading && !orders) {
      return <Loading />;
    }
    if (!loading && orders && orders.length === 0) {
      return <EmptyOrders />;
    }
    return (
      <InfiniteScroll
        loadMore={fetchMore}
        hasMore={true}
        loader={
          <LoadingWrapper>
            <FormattedMessage id="loading" />
          </LoadingWrapper>
        }
        useWindow={false}
      >
        <List>{orders.map(order => renderOrder(order, intl))}</List>
      </InfiniteScroll>
    );
  }
}

export const OrdersListWithIntl = injectIntl(OrdersList);

export default graphql(OrdersListQuery, OrdersListQueryOptions)(OrdersListWithIntl);
