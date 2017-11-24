import React from 'react';
import { Paper, Icon } from 'natura-ui';
import { formatCurrency } from 'locale/utils';
import NaturaTable from 'components/organisms/Table/Table';
import { injectIntl, FormattedMessage } from 'react-intl';

import {
  Wrapper,
  IconWrapper,
  OrderHistoryHeader,
  OrderHistoryTitle,
  OrderHistoryPoints,
  OrderHistoryPoint,
} from './PeriodHistory.styles';

const PeriodHistory = props => {
  const { intl } = props;

  const points = {
    digital: 10,
    presencial: 10,
    totalCicles: 10,
  };

  const tableData = {
    columns: ['icon', 'order', 'date', 'points', 'value'],
    style: {
      icon: { width: '10%' },
      order: { width: '30%' },
      date: { width: '28%' },
      points: { width: '15%' },
      value: { width: '15%', textAlign: 'right' },
    },
    renderer: {
      icon: iconPath => (
        <IconWrapper>
          <Icon file={iconPath} />
        </IconWrapper>
      ),
      order: value => `Pedido ${value}`,
      date: value => `Data ${value}`,
      points: value => `${value}pts`,
      value: value => formatCurrency(value, intl),
    },
    body: [
      {
        icon: 'ico_info',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_info',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_info',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_info',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
    ],
  };

  return (
    <Wrapper>
      <OrderHistoryHeader>
        <OrderHistoryTitle>
          <FormattedMessage id="orderHistory" />
        </OrderHistoryTitle>
        <OrderHistoryPoints>
          {Object.keys(points).map((key, index) => {
            return (
              <OrderHistoryPoint key={key}>
                {key}: {points[key]}pts
              </OrderHistoryPoint>
            );
          })}
        </OrderHistoryPoints>
      </OrderHistoryHeader>
      <NaturaTable data={tableData} />
    </Wrapper>
  );
};

const PeriodHistoryIntl = injectIntl(PeriodHistory);
export default PeriodHistoryIntl;
