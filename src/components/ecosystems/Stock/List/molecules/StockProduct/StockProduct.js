import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StockItemProductImageWrapper,
  StockItemProductImageFallback,
  StockItemProductLoadingWrapper,
  StockItemProductDetails,
  StockItemProductDetailsName,
  StockItemProductDetailsCode,
} from './StockProduct.styles';
import { Icon, CircularProgress, Loading } from 'natura-ui';
import Img from 'react-image';

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
    const loader = React.createElement(Loading);
    const fallbackImage = this.renderItemProductImageFallback();
    const imageUrl =
      this.props.product &&
      `http://rede.natura.net/image/sku/145x145/${this.props.product.productId}_1.jpg`;

    if (this.props.loading) {
      return (
        <StockItemProductLoadingWrapper>
          <CircularProgress thickness={3} />
        </StockItemProductLoadingWrapper>
      );
    }

    return (
      <StockItemProductImageWrapper>
        <Img src={imageUrl} loader={loader} unloader={fallbackImage} />
        <StockItemProductDetails>
          <StockItemProductDetailsName>
            {(this.props.product && this.props.product.name) || 'Nenhum produto selecionado'}
          </StockItemProductDetailsName>
          {this.props.product &&
            this.props.product.productId && (
              <StockItemProductDetailsCode>
                Código: {this.props.product.productId}
              </StockItemProductDetailsCode>
            )}
        </StockItemProductDetails>
      </StockItemProductImageWrapper>
    );
  }
}

StockProduct.propTypes = {
  product: PropTypes.object,
  loading: PropTypes.bool,
};

export default StockProduct;
