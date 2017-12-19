import React from 'react';
import { Icon, Table } from 'natura-ui';
import { formatCurrency, formatDate } from 'locale/utils';
import { injectIntl, FormattedMessage } from 'react-intl';
import { graphql, compose } from 'react-apollo';
import {
  DirectOrdersQuery,
  DirectOrdersQueryOptions,
  EcommerceOrdersQuery,
  EcommerceOrdersQueryOptions,
} from './PeriodHistory.data';

import {
  Wrapper,
  IconWrapper,
  CloseButton,
  OrderHistoryHeader,
  OrderHistoryTitle,
  OrderHistoryPoints,
  OrderHistoryPoint,
  OrderHistoryPointLabel,
  TableWrapper,
  TableDataWrapper,
} from './PeriodHistory.styles';

const ORDER_ICONS = {
  ecommerce: 'ico_monitor',
  direct: 'ico_marker',
};

const buildTableBody = props => {
  const allOrders = [...props.ecommerceOrders, ...props.directOrders];
  return allOrders.sort((a, b) => {
    if (a.entryOrderDate > b.entryOrderDate) {
      return 1;
    }

    if (a.entryOrderDate < b.entryOrderDate) {
      return -1;
    }

    return 0;
  });
};

const getPointsFrom = orders => {
  if (!orders) {
    return 0;
  }

  return orders.reduce((points, order) => {
    if (!order.totalOrderPoints) {
      return points;
    }

    return points + order.totalOrderPoints;
  }, 0);
};

export const PeriodHistory = props => {
  const { intl } = props;

  if (props.loadingDirectOrders || props.loadingEcommerceOrders) {
    return null;
  }

  const tableData = {
    columns: ['type', 'orderNumber', 'entryOrderDate', 'totalOrderPoints', 'totalOrderValue'],
    style: {
      icon: { width: '10%' },
      orderNumber: { width: '25%' },
      entryOrderDate: { width: '28%' },
      totalOrderPoints: { width: '15%' },
      totalOrderValue: { width: '20%', textAlign: 'right' },
    },
    renderer: {
      type: ({ value }) => (
        <IconWrapper>
          <Icon file={ORDER_ICONS[value]} />
        </IconWrapper>
      ),
      orderNumber: ({ value }) => (
        <TableDataWrapper>
          <FormattedMessage id="order" />&nbsp;
          {value}
        </TableDataWrapper>
      ),
      entryOrderDate: ({ value }) => (
        <TableDataWrapper>
          <FormattedMessage id="date" />&nbsp;
          {formatDate(value, intl)}
        </TableDataWrapper>
      ),
      totalOrderPoints: ({ value }) => `${value}pts`,
      totalOrderValue: ({ value }) => formatCurrency(value, intl),
    },
    body: buildTableBody(props),
  };

  const ecommercePoints = getPointsFrom(props.ecommerceOrders);
  const directPoints = getPointsFrom(props.directOrders);
  const totalPoints = ecommercePoints + directPoints;

  return (
    <Wrapper>
      <CloseButton onClick={props.onClose}>
        <Icon file="ico_times" />
      </CloseButton>
      <OrderHistoryHeader>
        <OrderHistoryTitle>
          <FormattedMessage id="orderHistory" />
        </OrderHistoryTitle>
        <OrderHistoryPoints>
          <OrderHistoryPoint>
            <OrderHistoryPointLabel>
              <span>
                <FormattedMessage id="digital" />:&nbsp;
              </span>
              <Icon file="ico_monitor" />
            </OrderHistoryPointLabel>
            <FormattedMessage id="cyclePoints" values={{ points: ecommercePoints }} />
          </OrderHistoryPoint>

          <OrderHistoryPoint>
            <OrderHistoryPointLabel>
              <span>
                <FormattedMessage id="presential" />:&nbsp;
              </span>
              <Icon file="ico_marker" />
            </OrderHistoryPointLabel>
            <FormattedMessage id="cyclePoints" values={{ points: directPoints }} />
          </OrderHistoryPoint>

          <OrderHistoryPoint>
            <FormattedMessage id="totalInCycle" />:&nbsp;
            <FormattedMessage id="cyclePoints" values={{ points: totalPoints }} />
          </OrderHistoryPoint>
        </OrderHistoryPoints>
      </OrderHistoryHeader>
      <TableWrapper>
        <Table data={tableData} />
      </TableWrapper>
    </Wrapper>
  );
};

const PeriodHistoryIntl = injectIntl(PeriodHistory);

const PeriodHistoryWithData = compose(
  graphql(DirectOrdersQuery, DirectOrdersQueryOptions),
  graphql(EcommerceOrdersQuery, EcommerceOrdersQueryOptions),
)(PeriodHistoryIntl);

export default PeriodHistoryWithData;
