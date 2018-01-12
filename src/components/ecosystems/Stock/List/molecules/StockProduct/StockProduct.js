import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  productImageStyles,
  StockItemProductImageWrapper,
  StockItemProductImageFallback,
} from './StockProduct.styles';
import { Icon } from 'natura-ui';
import Img from 'react-image';
import ImageWithFallback from 'components/molecules/ImageWithFallback';

class StockProduct extends Component {
  state = {};

  renderItemProductImageFallback = () => {
    return (
      <StockItemProductImageFallback>
        <Icon file="ico_pictureless" />
      </StockItemProductImageFallback>
    );
  };

  render() {
    let productName;
    let imageUrl;
    if (this.props.product) {
      productName = this.props.product.name;
      imageUrl = `http://rede.natura.net/image/sku/145x145/${this.props.product.productId}_1.jpg`;
    } else {
      productName = 'Nenhum produto selecionado';
      imageUrl = null;
    }

    return (
      <StockItemProductImageWrapper>
        <ImageWithFallback
          fallbackImage="ico_pictureless"
          imageUrl={imageUrl}
          styles={productImageStyles}
        />
        {productName}
      </StockItemProductImageWrapper>
    );
  }
}

StockProduct.propTypes = {
  product: PropTypes.object,
};

export default StockProduct;
