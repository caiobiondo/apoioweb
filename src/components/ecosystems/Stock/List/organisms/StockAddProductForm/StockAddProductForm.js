import React, { Component } from 'react';
import { FormInput, FormButton } from 'natura-ui';
import PropTypes from 'prop-types';
import { AddStockProductMutation } from './StockAddProductForm.data';
import { StockProductsQuery } from '../ListTable/ListTable.data';
import { graphql } from 'react-apollo';

export class StockAddProductForm extends Component {
  state = {
    productQty: 1,
  };

  onChangeProductQty = (event, productQty) => {
    this.setState({ productQty });
  };

  onSubmit = () => {
    const { product } = this.props;
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
      .then(this.props.onSubmit);
  };

  render() {
    const { enabled } = this.props;
    return (
      <div>
        <FormInput
          onChange={this.onChangeProductQty}
          name="qty"
          label="Quantidade"
          value={this.state.productQty}
        />
        <FormButton primary disabled={!enabled} label="Adicionar" onClick={this.onSubmit} />
      </div>
    );
  }
}

StockAddProductForm.propTypes = {
  enabled: PropTypes.bool,
  product: PropTypes.object,
  onSubmit: PropTypes.func,
};

export default graphql(AddStockProductMutation)(StockAddProductForm);
