import React from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, Paper, Table } from 'natura-ui';
import { MyStockProductsQuery, MyStockProductsQueryOptions } from './List.data';
import withAuthErrorHandler from 'hocs/withAuthErrorHandler/withAuthErrorHandler';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

import StockProductQuantity from '../StockProductQuantity';
import StockProductInfo from '../../molecules/StockProductInfo';

import {
  WrapperStyle,
  TableWrapper,
  StockProductInfoWrapper,
  StockInputWrapper,
} from './List.styles';

const renderInfoCell = ({ value, row }) => (
  <StockProductInfoWrapper>
    <StockProductInfo product={row} />

    <StockInputWrapper>
      <StockProductQuantity product={row} />
    </StockInputWrapper>
  </StockProductInfoWrapper>
);

const renderStockCell = ({ value, row }) => <StockProductQuantity product={row} />;

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
