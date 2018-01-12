import React, { Component } from 'react';
import { Loading, Icon, Modal, FormInput, FormButton, FlatButton, Dialog } from 'natura-ui';
import PropTypes from 'prop-types';
import { dialogContainer, dialogContent, dialogTitle, dialogActions } from 'styles/dialog';
import { translate } from 'locale';
import {
  FormButtonWrapper,
  FormWrapper,
  StockItemProductImageWrapper,
  StockItemProductImageFallback,
} from './StockAddProductModal.styles';
import Img from 'react-image';
import { fetchProduct, AddStockProductMutation } from './StockAddProductModal.data';
import { graphql } from 'react-apollo';
import { StockProductsQuery } from '../ListTable/ListTable.data';
import debounce from 'lodash.debounce';
import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from 'utils/getUserParams';

export class StockAddProductModal extends Component {
  state = {
    successOpened: false,
    productQty: 1,
    productCode: '',
    loadedProduct: null,
    loadingProduct: false,
    lastProductCode: '',
  };

  loadProduct = debounce(productCode => {
    if (!productCode) {
      this.setState({ loadedProduct: null });
      return;
    }

    this.setState({
      loadingProduct: true,
      lastProductCode: productCode,
    });

    fetchProduct(productCode, this.props.user)
      .catch(() => {
        return null;
      })
      .then(product => {
        if (productCode === this.state.lastProductCode) {
          this.setState({
            loadingProduct: false,
            loadedProduct: product,
          });
        }
      });
  }, 500);

  onChangeProductAddSearch = (event, productCode) => {
    this.setState({ productCode });
    this.loadProduct(productCode);
  };

  onSubmited = () => {
    this.setState({ successOpened: true });
    this.props.handleClose();
  };

  onClose = () => {
    this.setState({ successOpened: false });
  };

  onChangeProductQty = (event, productQty) => {
    this.setState({ productQty });
  };

  onSubmit = () => {
    const product = this.state.loadedProduct;
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${product.productId}_1.jpg`;
    this.props
      .mutate({
        variables: {
          input: {
            productCode: product.productId,
            stockQuantity: this.state.productQty,
            productName: product.name,
            productDescription: product.description,
            productImage: imageUrl,
            productPrice: product.price,
            cycleId: getCycleIdFromUser(this.props.user),
            commercialStructureId: getCommercialStructureIdFromUser(this.props.user),
            commercialStructureTypeId: getCommercialStructureTypeIdFromUser(this.props.user),
          },
        },
        refetchQueries: [
          {
            query: StockProductsQuery,
            variables: {
              limit: 10,
              offset: 0,
              filter: '',
            },
          },
        ],
      })
      .then(this.onSubmited);
  };

  renderSuccessDialog = () => {
    const title = translate('stockProductSuccessfullyAdded');
    const actions = [
      <FlatButton
        label={translate('ok')}
        primary={true}
        onClick={this.onClose}
        labelStyle={dialogActions}
      />,
    ];

    return (
      <Dialog
        key="successDialog"
        title={title}
        actions={actions}
        modal={false}
        open={this.state.successOpened}
        onRequestClose={this.onClose}
        contentStyle={dialogContainer}
        bodyStyle={dialogContent}
        titleStyle={dialogTitle}
      />
    );
  };

  renderItemProductImageFallback = () => {
    return (
      <StockItemProductImageFallback>
        <Icon file="ico_pictureless" />
      </StockItemProductImageFallback>
    );
  };

  renderProduct = () => {
    const fallbackImage = this.renderItemProductImageFallback();
    if (this.state.loadingProduct) {
      return 'Loading...';
    }

    if (!this.state.loadedProduct) {
      return (
        <StockItemProductImageWrapper>
          <Img unloader={fallbackImage} />
          {'Nenhum produto selecionado...'}
        </StockItemProductImageWrapper>
      );
    }

    const product = this.state.loadedProduct;
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${product.productId}_1.jpg`;
    const loader = React.createElement(Loading);

    return (
      <StockItemProductImageWrapper>
        <Img src={imageUrl} loader={loader} unloader={fallbackImage} />
        {product.name}
      </StockItemProductImageWrapper>
    );
  };

  allowSubmit = () => {
    return (
      this.state.loadedProduct &&
      !this.state.loadingProduct &&
      this.state.productQty &&
      this.state.productQty !== '0'
    );
  };

  renderForm = () => {
    return (
      <FormWrapper>
        <FormInput
          onChange={this.onChangeProductAddSearch}
          name="productCode"
          label={translate('stockProductCodeLabel')}
          value={this.state.productCode}
        />
        <FormInput
          onChange={this.onChangeProductQty}
          name="qty"
          label={translate('stockProductQuantityLabel')}
          value={this.state.productQty}
        />
        <FormButtonWrapper>
          <FormButton
            primary
            disabled={!this.allowSubmit()}
            label={translate('stockProductAdd')}
            onClick={this.onSubmit}
          />
        </FormButtonWrapper>
      </FormWrapper>
    );
  };

  render() {
    console.log('render');
    return [
      <Modal
        open={this.props.opened}
        showCloseButton={true}
        onCloseClick={this.props.handleClose}
        title={translate('stockProductAddModalTitle')}
      >
        {this.renderProduct()}
        {this.renderForm()}
      </Modal>,
      this.renderSuccessDialog(),
    ];
  }
}

StockAddProductModal.propTypes = {
  handleClose: PropTypes.func,
  opened: PropTypes.bool,
  user: PropTypes.object,
};

export default graphql(AddStockProductMutation)(StockAddProductModal);
