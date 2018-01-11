import React, { Component } from 'react';
import { Loading, Icon, Modal, FormInput, FormButton, FlatButton, Dialog } from 'natura-ui';
import PropTypes from 'prop-types';
import { dialogContainer, dialogContent, dialogTitle, dialogActions } from 'styles/dialog';
import { translate } from 'locale';
import {
  StockItemProductImageWrapper,
  StockItemProductImageFallback,
} from './StockAddProductModal.styles';
import Img from 'react-image';
import {
  FetchProductQuery,
  FetchProductQueryOptions,
  AddStockProductMutation,
} from './StockAddProductModal.data';
import { graphql, compose } from 'react-apollo';
import { StockProductsQuery } from '../ListTable/ListTable.data';

export class StockAddProductModal extends Component {
  state = {
    successOpened: false,
    productQty: 1,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.productAddSearchDebounced !== this.props.productAddSearchDebounced) {
      this.props.data.refetch();
    }
  }

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
    const product = this.props.data.product;
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
          },
        },
        refetchQueries: [
          {
            query: StockProductsQuery,
            variables: {
              limit: 10,
              offset: 0,
              productName: '',
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

  renderSearch = () => {
    return (
      <FormInput
        onChange={this.props.onChangeProductAddSearch}
        name="productCode"
        label={translate('stockProductCodeLabel')}
        value={this.props.productAddSearch}
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
    console.log('************');
    // debugger;
    console.log(this.props.data);
    const { productAddSearchDebounced, data } = this.props;
    const fallbackImage = this.renderItemProductImageFallback();

    if (data.loading) {
      return 'Loading...';
    }

    if (productAddSearchDebounced === '') {
      return (
        <StockItemProductImageWrapper>
          <Img unloader={fallbackImage} />
          {'Nenhum produto selecionado...'}
        </StockItemProductImageWrapper>
      );
    }
    const product = this.props.data.product;
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${product.productId}_1.jpg`;
    const loader = React.createElement(Loading);

    return (
      <StockItemProductImageWrapper>
        <Img src={imageUrl} loader={loader} unloader={fallbackImage} />
        {product.name}
      </StockItemProductImageWrapper>
    );
  };

  renderForm = () => {
    return (
      <div>
        <FormInput
          onChange={this.onChangeProductQty}
          name="qty"
          label={translate('stockProductQuantityLabel')}
          value={this.state.productQty}
        />
        <FormButton
          primary
          disabled={false}
          label={translate('stockProductAdd')}
          onClick={this.onSubmit}
        />
      </div>
    );
  };

  render() {
    console.log('render');
    console.log('productAddSearchDebounced: ', this.props.productAddSearchDebounced);
    return [
      <Modal
        open={this.props.opened}
        showCloseButton={true}
        onCloseClick={this.props.handleClose}
        title={translate('stockProductAddModalTitle')}
      >
        {this.renderSearch()}
      </Modal>,
      this.renderSuccessDialog(),
    ];
  }
}

StockAddProductModal.propTypes = {
  handleClose: PropTypes.func,
  onChangeProductAddSearch: PropTypes.func,
  opened: PropTypes.bool,
  productAddSearch: PropTypes.string,
  productAddSearchDebounced: PropTypes.string,
  user: PropTypes.object,
};

export default compose(
  graphql(FetchProductQuery, FetchProductQueryOptions),
  graphql(AddStockProductMutation),
)(StockAddProductModal);
