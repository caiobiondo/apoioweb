import React, { Component } from 'react';
import EmptyList from 'components/molecules/EmptyList/EmptyList';
import { Loading, CircularProgress, Paper, Table } from 'natura-ui';
import { StockProductsQuery, StockProductsQueryOptions } from './ListTable.data';
import { graphql } from 'react-apollo';
import { FormattedMessage } from 'react-intl';

import StockProductQuantity from '../StockProductQuantity';
import StockProductInfo from '../../molecules/StockProductInfo';
import InfiniteScroll from 'react-infinite-scroller';

import {
  WrapperStyle,
  TableWrapper,
  StockProductInfoWrapper,
  LoadingWrapper,
  StockInputWrapper,
  fullContainer,
} from './ListTable.styles';

export class ListTable extends Component {
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

  componentWillReceiveProps({ stockProducts, loading }) {
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
    if (this.props.loading) {
      return <Loading background="transparent" />;
    }

    if (!this.props.stockProducts || !this.props.stockProducts.length) {
      return (
        <Paper style={fullContainer}>
          <EmptyList
            icon="ico_forklift"
            titleId="stockEmptyList"
            descriptionId="stockEmptyListDescription"
          />
        </Paper>
      );
    }

    return (
      <Paper style={WrapperStyle}>
        <InfiniteScroll
          loadMore={this.props.fetchMore}
          hasMore={false}
          loader={
            <LoadingWrapper>
              <CircularProgress thickness={2} />
            </LoadingWrapper>
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
