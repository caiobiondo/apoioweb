import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Img from 'react-image';
import {
  StockItemProductImageWrapper,
  StockItemProductImageFallback,
} from './StockAddProduct.styles';
import { Icon, Loading } from 'natura-ui';
import { ProductsListQuery, ProductsListQueryOptions } from './StockAddProduct.data';
import { graphql } from 'react-apollo';
import StockAddProductForm from '../StockAddProductForm/StockAddProductForm';

export class StockAddProduct extends Component {
  renderItemProductImageFallback = () => {
    return (
      <StockItemProductImageFallback>
        <Icon file="ico_pictureless" />
      </StockItemProductImageFallback>
    );
  };

  render() {
    if (this.props.data.loading) {
      return 'Loading...';
    }

    if (this.props.data.products.length === 0) {
      return 'Produto nao encontrado...';
    }

    const product = this.props.data.products[0];
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${product.productId}_1.jpg`;
    const fallbackImage = this.renderItemProductImageFallback();
    const loader = React.createElement(Loading);

    return (
      <StockItemProductImageWrapper>
        <Img src={imageUrl} loader={loader} unloader={fallbackImage} />
        {product.name}
        <StockAddProductForm product={product} enabled={true} onSubmit={this.props.onSubmit} />
      </StockItemProductImageWrapper>
    );
  }
}

StockAddProduct.propTypes = {
  data: PropTypes.shape({
    loading: PropTypes.bool,
    products: PropTypes.array,
    refetch: PropTypes.func,
  }),
  onSubmit: PropTypes.func,
  search: PropTypes.string,
};

export default graphql(ProductsListQuery, ProductsListQueryOptions)(StockAddProduct);
