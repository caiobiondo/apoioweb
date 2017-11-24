import React from 'react';
import { Paper, Icon, Table } from 'natura-ui';
import { formatCurrency } from 'locale/utils';
import { injectIntl, FormattedMessage } from 'react-intl';

import {
  Wrapper,
  IconWrapper,
  CloseButton,
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
        icon: 'ico_monitor',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_marker',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_monitor',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_monitor',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
      {
        icon: 'ico_marker',
        order: '#361352429',
        date: '24/02/2016',
        points: '10',
        value: '37.34',
      },
    ],
  };

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
            <FormattedMessage id="digital" />:&nbsp;
            <FormattedMessage id="cyclePoints" values={{ points: 900 }} />
          </OrderHistoryPoint>

          <OrderHistoryPoint>
            <FormattedMessage id="presential" />:&nbsp;
            <FormattedMessage id="cyclePoints" values={{ points: 772 }} />
          </OrderHistoryPoint>

          <OrderHistoryPoint>
            <FormattedMessage id="totalInCycle" />:&nbsp;
            <FormattedMessage id="cyclePoints" values={{ points: 1672 }} />
          </OrderHistoryPoint>
        </OrderHistoryPoints>
      </OrderHistoryHeader>
      <Table data={tableData} />
    </Wrapper>
  );
};

const PeriodHistoryIntl = injectIntl(PeriodHistory);
export default PeriodHistoryIntl;
