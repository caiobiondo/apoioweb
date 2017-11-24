import React from 'react';
import { TableStyle, TableRowStyle, TableCellStyle } from './Table.styles';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter,
} from 'material-ui/Table';

const NaturaTable = props => {
  const { data } = props;

  const renderCell = (value, key) => {
    let cellStyle = TableCellStyle;

    if (data.renderer && !data.renderer[key])
      return <TableRowColumn key={key}>{value}</TableRowColumn>;

    if (data.style && data.style[key]) cellStyle = { ...TableCellStyle, ...data.style[key] };

    return (
      <TableRowColumn key={key} style={cellStyle}>
        {data.renderer[key](value)}
      </TableRowColumn>
    );
  };

  const renderTableHeader = () => {
    if (!data.header) return null;
    return (
      <TableHeader adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
        <TableRow style={{ border: 'none' }}>
          {data.columns.map(cell => {
            return <TableHeaderColumn key={cell}>{data.header[cell]}</TableHeaderColumn>;
          })}
        </TableRow>
      </TableHeader>
    );
  };

  const renderTableBody = () => {
    if (!data.body) return null;
    return (
      <TableBody displayRowCheckbox={false}>
        {data.body.map((row, index) => {
          return (
            <TableRow key={index} style={TableRowStyle}>
              {data.columns.map(cell => {
                return renderCell(row[cell], cell);
              })}
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  const renderTableFooter = () => {
    if (!data.footer) return null;
    return (
      <TableFooter adjustForCheckbox={false} displaySelectAll={false} enableSelectAll={false}>
        <TableRow style={{ border: 'none' }}>
          {data.columns.map(cell => {
            return <TableRowColumn key={cell}>{data.header[cell]}</TableRowColumn>;
          })}
        </TableRow>
      </TableFooter>
    );
  };

  return (
    <Table style={TableStyle}>
      {renderTableHeader()}
      {renderTableBody()}
      {renderTableFooter()}
    </Table>
  );
};

export default NaturaTable;
