import React, { Component } from 'react';
import { Modal, FormInput, FormButton, FlatButton, Dialog } from 'natura-ui';
import PropTypes from 'prop-types';
import { dialogContainer, dialogContent, dialogTitle, dialogActions } from 'styles/dialog';
import { translate } from 'locale';
import {
  bodyStyle,
  contentStyle,
  FormButtonStyles,
  FormButtonWrapper,
  FormWrapper,
  FormInputWrapper,
  titleStyle,
  ModalTitleWrapper,
  ModalContentWrapper,
  StockProductWrapper,
} from './StockAddProductModal.styles';
import { fetchProduct, AddStockProductMutation } from './StockAddProductModal.data';
import { graphql } from 'react-apollo';
import { StockProductsQuery } from '../ListTable/ListTable.data';
import debounce from 'lodash.debounce';
import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from 'utils/getUserParams';
import StockProduct from '../../molecules/StockProduct';
import SectionTitle from 'components/molecules/SectionTitle';

export class StockAddProductModal extends Component {
  state = {
    successOpened: false,
    productQty: 1,
    productCode: '',
    loadedProduct: null,
    loadingProduct: false,
    lastProductCode: '',
    importing: false,
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
  }, 1000);

  onChangeProductAddSearch = (event, productCode) => {
    this.setState({ productCode });
    this.loadProduct(productCode);
  };

  onSubmited = () => {
    this.setState({ successOpened: true, importing: false });
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
    this.setState({ importing: true });
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

  renderProduct = () => {
    return (
      <StockProductWrapper>
        <StockProduct product={this.state.loadedProduct} loading={this.state.loadingProduct} />
      </StockProductWrapper>
    );
  };

  allowSubmit = () => {
    return (
      this.state.loadedProduct &&
      !this.state.loadingProduct &&
      this.state.productQty &&
      this.state.productQty !== '0' &&
      !this.state.importing
    );
  };

  renderForm = () => {
    return (
      <FormWrapper>
        <FormInputWrapper>
          <FormInput
            onChange={this.onChangeProductAddSearch}
            name="productCode"
            label={translate('stockProductCodeLabel')}
            value={this.state.productCode}
          />
        </FormInputWrapper>
        <FormInputWrapper>
          <FormInput
            onChange={this.onChangeProductQty}
            name="qty"
            label={translate('stockProductQuantityLabel')}
            value={this.state.productQty}
          />
        </FormInputWrapper>
        <FormButtonWrapper>
          <FormButton
            primary
            disabled={!this.allowSubmit()}
            label={this.renderAddButtonLabel()}
            onClick={this.onSubmit}
            {...FormButtonStyles}
          />
        </FormButtonWrapper>
      </FormWrapper>
    );
  };

  renderAddButtonLabel = () => {
    if (this.state.importing) {
      return translate('stockProductAdding');
    }

    return translate('stockProductAdd');
  };

  renderTitle() {
    return (
      <ModalTitleWrapper>
        <SectionTitle value="stockProductAddModalTitle" iconName="ico_flask" />
      </ModalTitleWrapper>
    );
  }

  render() {
    return [
      <Modal
        open={this.props.opened}
        showCloseButton={true}
        onCloseClick={this.props.handleClose}
        title={this.renderTitle()}
        titleStyle={titleStyle}
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
        autoScrollBodyContent={true}
      >
        <ModalContentWrapper>
          {this.renderForm()}
          {this.renderProduct()}
        </ModalContentWrapper>
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
