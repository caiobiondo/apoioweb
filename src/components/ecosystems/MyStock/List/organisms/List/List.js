import React from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, Paper, Table } from 'natura-ui';
import { MyStockProductsQuery, MyStockProductsQueryOptions } from './List.data';
import withAuthErrorHandler from 'hocs/withAuthErrorHandler/withAuthErrorHandler';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

import TableStockCell from '../../molecules/TableStockCell';
import TableInfoCell from '../../molecules/TableInfoCell';

import { WrapperStyle, TableWrapper, TableInfoCellWrapper, StockInputWrapper } from './List.styles';

const renderInfoCell = ({ value, row }) => (
  <TableInfoCellWrapper>
    <TableInfoCell product={row} />

    <StockInputWrapper>
      <TableStockCell product={row} />
    </StockInputWrapper>
  </TableInfoCellWrapper>
);

const renderStockCell = ({ value, row }) => <TableStockCell product={row} />;

const TABLE_SCHEMA = {
  columns: ['info', 'stock'],
  style: {
    info: {},
    stock: {},
  },
  renderer: {
    info: renderInfoCell,
    stock: renderStockCell,
  },
  header: {
    info: <FormattedMessage id="stockProductHeaderName" />,
    stock: <FormattedMessage id="stockProductHeaderQuantity" />,
  },
};

const StockList = props => {
  if (props.loading) {
    return <Loading background="transparent" />;
  }

  if (!props.stockProducts) {
    return (
      <EmptyList
        icon="ico_forklift"
        titleId="stockEmptyList"
        descriptionId="stockEmptyListDescription"
      />
    );
  }

  return (
    <Paper style={WrapperStyle}>
      <TableWrapper>
        <Table data={{ ...TABLE_SCHEMA, body: props.stockProducts }} />
      </TableWrapper>
    </Paper>
  );
};

export const StockListWithAuthErrorHandler = withAuthErrorHandler(StockList);

export default graphql(MyStockProductsQuery, MyStockProductsQueryOptions)(
  StockListWithAuthErrorHandler,
);
