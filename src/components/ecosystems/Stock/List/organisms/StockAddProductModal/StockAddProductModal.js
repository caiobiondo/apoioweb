import React, { Component } from 'react';
import { Modal, FormInput, FormButton, FlatButton, Dialog } from 'natura-ui';
import PropTypes from 'prop-types';
import { dialogContent, dialogTitle, dialogActions } from 'styles/dialog';
import { translate } from 'locale';
import {
  bodyStyle,
  contentStyle,
  dialogContentStyle,
  FormButtonStyles,
  FormButtonWrapper,
  FormWrapper,
  FormInputWrapper,
  titleStyle,
  ModalTitleWrapper,
  ModalContentWrapper,
  StockProductWrapper,
} from './StockAddProductModal.styles';
import { FetchProductQuery, AddStockProductMutation } from './StockAddProductModal.data';
import { graphql, withApollo } from 'react-apollo';
import { StockProductsQuery } from '../ListTable/ListTable.data';
import debounce from 'lodash.debounce';
import {
  getCycleIdFromUser,
  getCommercialStructureIdFromUser,
  getCommercialStructureTypeIdFromUser,
} from 'utils/getUserParams';
import StockProduct from '../../molecules/StockProduct';
import SectionTitle from 'components/molecules/SectionTitle';

const MAX_PRODUCT_QTY = 100000;

export class StockAddProductModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openFeedbackDialog: false,
      productQty: 1,
      productCode: '',
      loadedProduct: null,
      loadingProduct: false,
      lastProductCode: '',
      importing: false,
    };
  }

  loadProduct = debounce(productCode => {
    if (!productCode) {
      this.setState({ loadedProduct: null, loadingProduct: false });
      return;
    }

    this.setState({
      lastProductCode: productCode,
    });

    this.props.client
      .query({
        query: FetchProductQuery,
        variables: {
          productId: productCode,
          cycleId: getCycleIdFromUser(this.props.user),
          commercialStructureId: getCommercialStructureIdFromUser(this.props.user),
          commercialStructureTypeId: getCommercialStructureTypeIdFromUser(this.props.user),
        },
      })
      .catch(() => {
        return null;
      })
      .then(res => {
        this.setState({ loadedProduct: null });

        if (res && res.data && res.data.product) {
          if (res.data.product.productId.toString() === this.state.lastProductCode) {
            this.setState({
              loadedProduct: res.data.product,
            });
          }
        }

        this.setState({ loadingProduct: false });
      });
  }, 1000);

  onChangeProductAddSearch = (event, productCode) => {
    this.setState({ productCode, loadingProduct: true });
    this.loadProduct(productCode);
  };

  onFinished = dialogTitle => {
    this.setState(
      {
        openFeedbackDialog: true,
        feedbackDialogTitle: dialogTitle,
        importing: false,
      },
      this.props.handleClose(),
    );
  };

  onClose = () => {
    this.setState(
      {
        openFeedbackDialog: false,
        lastProductCode: '',
        loadedProduct: null,
        productCode: '',
      },
      this.props.handleClose(),
    );
  };

  onChangeProductQty = (event, productQty) => {
    if (parseInt(productQty, 10) > MAX_PRODUCT_QTY) return;
    this.setState({ productQty });
  };

  onSubmit = () => {
    const { user } = this.props;
    const product = this.state.loadedProduct;
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${product.productId}_1.jpg`;
    this.setState({ importing: true });
    return this.props
      .mutate({
        variables: {
          input: {
            productCode: product.productId,
            stockQuantity: this.state.productQty,
            productName: product.name,
            productDescription: product.description,
            productImage: imageUrl,
            productPrice: product.price,
            cycleId: getCycleIdFromUser(user),
            commercialStructureId: getCommercialStructureIdFromUser(user),
            commercialStructureTypeId: getCommercialStructureTypeIdFromUser(user),
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
      .then(() => {
        this.onFinished(translate('stockProductAddSuccessful'));
      })
      .catch(err => {
        console.log('err', err);
        this.onFinished(translate('stockProductAddFailure'));
      });
  };

  renderFeedbackDialog = () => {
    const title = this.state.feedbackDialogTitle;
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
        key={'successDialog'}
        title={title}
        actions={actions}
        modal={false}
        open={this.state.openFeedbackDialog}
        onRequestClose={this.onClose}
        contentStyle={dialogContentStyle}
        bodyStyle={dialogContent}
        titleStyle={dialogTitle}
      />
    );
  };

  renderProduct = () => {
    return (
      <StockProductWrapper>
        <StockProduct
          product={this.state.loadedProduct}
          loading={this.state.loadingProduct}
          productCode={this.state.productCode}
        />
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
      </FormWrapper>
    );
  };

  renderFormButtom = () => {
    return (
      <FormButtonWrapper>
        <FormButton
          primary
          disabled={!this.allowSubmit()}
          label={this.renderAddButtonLabel()}
          onClick={this.onSubmit}
          {...FormButtonStyles}
        />
      </FormButtonWrapper>
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
        onCloseClick={this.onClose}
        title={this.renderTitle()}
        titleStyle={titleStyle}
        contentStyle={contentStyle}
        bodyStyle={bodyStyle}
        autoScrollBodyContent={true}
        key={'stockAddProductModal'}
      >
        <ModalContentWrapper>
          {this.renderForm()}
          {this.renderProduct()}
        </ModalContentWrapper>
        {this.renderFormButtom()}
      </Modal>,
      this.renderFeedbackDialog(),
    ];
  }
}

StockAddProductModal.propTypes = {
  handleClose: PropTypes.func,
  opened: PropTypes.bool,
  user: PropTypes.object,
};

export default withApollo(graphql(AddStockProductMutation)(StockAddProductModal));
