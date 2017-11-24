import React from 'react';
import { Paper, Icon } from 'natura-ui';
import {
  Wrapper,
  TableStyle,
  IconWrapper,
  OrderHistoryHeader,
  OrderHistoryTitle,
  OrderHistoryPoints,
  OrderHistoryPoint,
} from './PeriodHistory.styles';
import { injectIntl, FormattedMessage } from 'react-intl';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

const points = {
  digital: 10,
  presencial: 10,
  totalCicles: 10,
};

const tableData = {
  columns: ['icon', 'order', 'date', 'points', 'value'],
  renderer: {
    icon: iconPath => (
      <IconWrapper>
        <Icon file={iconPath} />
      </IconWrapper>
    ),
    order: value => `Pedido ${value}`,
    date: value => `Data ${value}`,
    points: value => `${value}pts`,
    value: value => `R$ ${value}`,
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

const renderCell = (value, key) => {
  if (tableData.renderer && !tableData.renderer[key]) {
    return <TableRowColumn>{value}</TableRowColumn>;
  }
  return (
    <TableRowColumn style={{ padding: '15px 0', fontSize: '17px', color: '#888' }}>
      {tableData.renderer[key](value)}
    </TableRowColumn>
  );
};

const renderTableHeader = () => {
  if (!tableData.header) return null;
  return (
    <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
      <TableRow style={{ border: 'none' }}>
        {Object.keys(tableData.header).map((key, index) => {
          return <TableHeaderColumn>{tableData.header[key]}</TableHeaderColumn>;
        })}
      </TableRow>
    </TableHeader>
  );
};

const renderTableBody = () => {
  if (!tableData.body) return null;
  return (
    <TableBody displayRowCheckbox={false}>
      {tableData.body.map(row => {
        return (
          <TableRow style={{ border: 'none' }}>
            {Object.keys(row).map((key, index) => {
              return renderCell(row[key], key);
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

const renderTableFooter = () => {
  if (!tableData.footer) return null;
  return (
    <TableFooter adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
      <TableRow style={{ border: 'none' }}>
        {Object.keys(tableData.header).map((key, index) => {
          return <TableRowColumn>{tableData.header[key]}</TableRowColumn>;
        })}
      </TableRow>
    </TableFooter>
  );
};

const PeriodHistory = () => (
  <Paper zDepth={2} style={Wrapper}>
    <OrderHistoryHeader>
      <OrderHistoryTitle>
        <FormattedMessage id="orderHistory" />
      </OrderHistoryTitle>
      <OrderHistoryPoints>
        {Object.keys(points).map((key, index) => {
          return (
            <OrderHistoryPoint>
              {key}: {points[key]}pts
            </OrderHistoryPoint>
          );
        })}
      </OrderHistoryPoints>
    </OrderHistoryHeader>
    <Table style={TableStyle}>
      {renderTableHeader()}
      {renderTableBody()}
      {renderTableFooter()}
    </Table>
  </Paper>
);

const PeriodHistoryIntl = injectIntl(PeriodHistory);
export default PeriodHistoryIntl;
