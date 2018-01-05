import React, { Component } from 'react';
import { FormInput, FormButton } from 'natura-ui';
import PropTypes from 'prop-types';

export class StockAddProductForm extends Component {
  state = {
    productQty: 1,
  };

  onChangeProductQty = (event, productQty) => {
    this.setState({ productQty });
  };

  onSubmit = () => {
    console.log('adicionando produto');
    this.props.onSubmit();
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
  productId: PropTypes.number,
  onSubmit: PropTypes.func,
};

export default StockAddProductForm;
