import React from 'react';
import { Paper } from 'natura-ui';
import { Wrapper, TableStyle } from './PeriodHistory.styles';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

const tableData = {
  header: {
    icon: 'Icon',
    order: 'Order',
    date: 'Date',
    points: 'Points',
    value: 'Value',
  },
  columns: ['icon', 'order', 'date', 'points', 'value'],
  body: [
    {
      icon: 'mobile',
      order: '#361352429',
      date: '24/02/2016',
      points: '10',
      value: '37.34',
    },
    {
      icon: 'mobile',
      order: '#361352429',
      date: '24/02/2016',
      points: '10',
      value: '37.34',
    },
    {
      icon: 'mobile',
      order: '#361352429',
      date: '24/02/2016',
      points: '10',
      value: '37.34',
    },
    {
      icon: 'mobile',
      order: '#361352429',
      date: '24/02/2016',
      points: '10',
      value: '37.34',
    },
  ],
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
              return <TableRowColumn>{row[key]}</TableRowColumn>;
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

const TableExampleSimple = () => (
  <Paper zDepth={2} style={Wrapper}>
    <Table style={TableStyle}>
      {renderTableHeader()}
      {renderTableBody()}
      {renderTableFooter()}
    </Table>
  </Paper>
);

export default TableExampleSimple;
