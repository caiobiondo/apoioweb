import React, { Component } from 'react';
import { CounterInput, FormButton, Icon } from 'natura-ui';
import {
  Wrapper,
  submitButtonStyles,
  SubmittedAddedMessage,
  SubmittedRemovedMessage,
} from './StockProductQuantity.styles';
import { FormattedMessage } from 'react-intl';
import { UpdateStockProductMutation } from './StockProductQuantity.data';
import { graphql } from 'react-apollo';

class StockProductQuantity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: props.product.stockQuantity,
      productOriginalQuantity: props.product.stockQuantity,
      submitting: false,
      showSubmittedMessage: false,
      productQuantityBeforeSubmit: null,
      hideSubmittedMessageTimeout: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product !== this.props.product) {
      this.setState({
        quantity: nextProps.product.stockQuantity,
        productOriginalQuantity: nextProps.product.stockQuantity,
        productQuantityBeforeSubmit: null,
      });
    }
  }

  submit = event => {
    const submittedQuantity = this.state.quantity;
    const productQuantityBeforeSubmit = this.state.productOriginalQuantity;
    event.stopPropagation();

    this.setState({ submitting: true });
    this.props
      .mutate({
        variables: {
          input: {
            id: this.props.product.id,
            productCode: this.props.product.productCode,
            stockQuantity: this.state.quantity,
          },
        },
      })
      .then(() => {
        this.setState({
          productOriginalQuantity: submittedQuantity,
          productQuantityBeforeSubmit: productQuantityBeforeSubmit,
          showSubmittedMessage: true,
          submitting: false,
        });

        clearTimeout(this.state.hideSubmittedMessageTimeout);
        const hideSubmittedMessageTimeout = setTimeout(() => {
          this.setState({
            showSubmittedMessage: false,
          });
        }, 5000);

        this.setState({ hideSubmittedMessageTimeout });
      });
  };

  quantityChanged = quantity => {
    this.setState({ quantity });
  };

  getSubmitLabel = () => {
    if (this.state.quantity < this.state.productOriginalQuantity) {
      return <FormattedMessage id="stockProductRemove" />;
    }

    return <FormattedMessage id="stockProductAdd" />;
  };

  renderSubmitButton = () => {
    const label = this.getSubmitLabel();

    return (
      <FormButton
        {...submitButtonStyles}
        primary
        disabled={this.state.submitting}
        onClick={this.submit}
        label={label}
      />
    );
  };

  renderRemovedMessage = quantity => {
    return (
      <SubmittedRemovedMessage>
        <Icon file="ico_times" />
        <FormattedMessage id="stockProductRemoved" values={{ quantity: quantity * -1 }} />
      </SubmittedRemovedMessage>
    );
  };

  renderAddedMessage = quantity => {
    return (
      <SubmittedAddedMessage>
        <Icon file="ico_check" />
        <FormattedMessage id="stockProductAdded" values={{ quantity }} />
      </SubmittedAddedMessage>
    );
  };

  renderSubmittedMessage = () => {
    const quantity = this.state.productOriginalQuantity - this.state.productQuantityBeforeSubmit;
    return quantity < 0 ? this.renderRemovedMessage(quantity) : this.renderAddedMessage(quantity);
  };

  renderBottom = () => {
    if (this.state.quantity !== this.state.productOriginalQuantity) {
      return this.renderSubmitButton();
    }

    if (this.state.showSubmittedMessage) {
      return this.renderSubmittedMessage();
    }

    return null;
  };

  render() {
    return (
      <Wrapper>
        <CounterInput min={0} onChange={this.quantityChanged} value={this.state.quantity} />
        {this.renderBottom()}
      </Wrapper>
    );
  }
}

export { StockProductQuantity };

export default graphql(UpdateStockProductMutation)(StockProductQuantity);
