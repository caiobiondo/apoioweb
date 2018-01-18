import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  productImageStyles,
  StockItemProductImageWrapper,
  StockItemProductImageFallback,
  StockItemProductDetails,
  StockItemProductDetailsName,
  StockItemProductDetailsCode,
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
    let productName, imageUrl, productCode;
    if (this.props.product) {
      productName = this.props.product.name;
      imageUrl = `http://rede.natura.net/image/sku/145x145/${this.props.product.productId}_1.jpg`;
      productCode = this.props.product.productId;
    } else {
      productName = 'Nenhum produto selecionado';
      imageUrl = null;
      productCode = null;
    }

    return (
      <StockItemProductImageWrapper>
        <ImageWithFallback
          fallbackImage="ico_pictureless"
          imageUrl={imageUrl}
          styles={productImageStyles}
        />
        <StockItemProductDetails>
          <StockItemProductDetailsName>{productName}</StockItemProductDetailsName>
          {productCode && (
            <StockItemProductDetailsCode>Código: {productCode}</StockItemProductDetailsCode>
          )}
        </StockItemProductDetails>
      </StockItemProductImageWrapper>
    );
  }
}

StockProduct.propTypes = {
  product: PropTypes.object,
};

export default StockProduct;
