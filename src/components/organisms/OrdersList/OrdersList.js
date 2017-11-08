import React, { Component } from 'react';
import { List } from './OrdersList.styles';
import OrdersListQuery from './OrdersList.data';
import Order from 'components/molecules/Order/Order';
import CustomCard from 'components/molecules/CustomCard/CustomCard';
import { graphql } from 'react-apollo';
import { injectIntl } from 'react-intl';
import { formatDate, formatCurrency } from 'locale/utils';

const renderOrder = (order, intl) => {
  const orderDate = formatDate(order.dataPedido, intl);
  const orderEstimatedDeliveryDate = formatDate(order.dataPrevisaoEntrega, intl);
  const orderValue = formatCurrency(order.valor, intl);
  const orderProfitsValue = formatCurrency(order.valorLucro, intl);
  /* eslint-disable sort-keys */
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
  /* eslint-enable sort-keys */
};

export class OrdersList extends Component {
  render() {
    const { data, intl } = this.props;
    return <List>{(data.orders || []).map(order => renderOrder(order, intl))}</List>;
  }
}

export const OrdersListWithIntl = injectIntl(OrdersList);

export default graphql(OrdersListQuery)(OrdersListWithIntl);
