import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, Paper, Table } from 'natura-ui';
import { StockProductsQuery, StockProductsQueryOptions } from './ListTable.data';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

import StockProductQuantity from '../StockProductQuantity';
import StockProductInfo from '../../molecules/StockProductInfo';
import InfiniteScroll from 'components/organisms/InfiniteScroll';

import {
  WrapperStyle,
  TableWrapper,
  StockProductInfoWrapper,
  StockInputWrapper,
} from './ListTable.styles';

export class ListTable extends Component {
  state = {
    hasMoreItems: true,
  };

  constructor(props) {
    super(props);

    this.tableSchema = {
      columns: ['info', 'stock'],
      style: {
        info: {},
        stock: {},
      },
      renderer: {
        info: this.renderInfoCell,
        stock: this.renderStockCell,
      },
      header: {
        info: <FormattedMessage id="stockProductHeaderName" />,
        stock: <FormattedMessage id="stockProductHeaderQuantity" />,
      },
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.productSearch !== this.props.productSearch) {
      this.props.refetch();
    }
  }

  componentWillReceiveProps({ loading, stockProducts }) {
    this.notifyLoadFinish(loading, stockProducts);
  }

  notifyLoadFinish = (loading, stockProducts) => {
    if (!loading && this.props.onLoadFinished) {
      this.props.onLoadFinished(
        this.isEmpty(loading, stockProducts),
        this.isLoading(loading, stockProducts),
      );
    }
  };

  isLoading = (loading, stockProducts) => {
    return loading && !stockProducts;
  };

  isEmpty = (loading, stockProducts) => {
    return !loading && (!stockProducts || stockProducts.length === 0);
  };

  onProductRemove = () => {
    this.props.refetch();
  };

  renderInfoCell = ({ value, row }) => {
    return (
      <StockProductInfoWrapper>
        <StockProductInfo product={row} />

        <StockInputWrapper>
          <StockProductQuantity product={row} />
        </StockInputWrapper>
      </StockProductInfoWrapper>
    );
  };

  renderStockCell = ({ value, row }) => {
    return <StockProductQuantity product={row} onRemove={this.onProductRemove} />;
  };

  render() {
    const { fetchMore, hasNextPage, loading, stockProducts } = this.props;
    const emptyListText = this.props.productSearch
      ? 'emptySearchResult'
      : 'stockEmptyListDescription';

    if (!stockProducts && loading) {
      return <Loading background="transparent" />;
    }

    return (
      <Paper style={WrapperStyle}>
        <InfiniteScroll
          onScroll={fetchMore}
          hasMore={hasNextPage}
          loading={loading}
          debounce={500}
          items={stockProducts}
          emptyList={
            <EmptyList
              icon="ico_list_add"
              titleId="coursesEmptyList"
              descriptionId={emptyListText}
            />
          }
        >
          <TableWrapper>
            <Table data={{ ...this.tableSchema, body: this.props.stockProducts }} />
          </TableWrapper>
        </InfiniteScroll>
      </Paper>
    );
  }
}

export default graphql(StockProductsQuery, StockProductsQueryOptions)(ListTable);
