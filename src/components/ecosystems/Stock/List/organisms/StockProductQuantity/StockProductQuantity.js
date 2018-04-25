import React, { Component } from 'react';
import { CounterInput, FormButton, Icon } from 'natura-ui';
import {
  Wrapper,
  submitButtonStyles,
  SubmittedAddedMessage,
  SubmittedRemovedMessage,
} from './StockProductQuantity.styles';
import { FormattedMessage } from 'react-intl';
import {
  UpdateStockProductMutation,
  RemoveStockProductMutation,
} from './StockProductQuantity.data';
import { graphql, compose } from 'react-apollo';
import { gtmPushDataLayerEvent, events, categories, actions } from 'utils/googleTagManager';

const FEEDBACK_TIMEOUT = 5000;
const MAX_PRODUCT_QTY = 100000;

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
    if (submittedQuantity > 0) {
      return this.updateStockProduct(submittedQuantity, productQuantityBeforeSubmit);
    }
    return this.removeStockProduct(submittedQuantity, productQuantityBeforeSubmit);
  };

  updateStockProduct = (submittedQuantity, productQuantityBeforeSubmit) => {
    this.props
      .updateStockProduct({
        variables: {
          input: {
            id: this.props.product.id,
            productCode: this.props.product.productCode,
            stockQuantity: submittedQuantity,
          },
        },
      })
      .then(() => {
        gtmPushDataLayerEvent({
          event: events.CHANGE_QUANTITY,
          category: categories.STOCK,
          action: actions.ADD,
          label: this.props.product.id,
          value: submittedQuantity,
        });

        this.showUpdateFeedback(submittedQuantity, productQuantityBeforeSubmit);
      });
  };

  removeStockProduct = (submittedQuantity, productQuantityBeforeSubmit) => {
    this.props
      .removeStockProduct({
        variables: {
          input: {
            id: this.props.product.id,
          },
        },
      })
      .then(() => {
        gtmPushDataLayerEvent({
          event: events.CHANGE_QUANTITY,
          category: categories.STOCK,
          action: actions.REMOVE,
          label: this.props.product.id,
          value: submittedQuantity,
        });

        this.showUpdateFeedback(submittedQuantity, productQuantityBeforeSubmit, () => {
          this.props.onRemove(this.props.product.id);
        });
      });
  };

  showUpdateFeedback = (submittedQuantity, productQuantityBeforeSubmit, callback) => {
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
      if (callback) {
        callback();
      }
    }, FEEDBACK_TIMEOUT);
    this.setState({ hideSubmittedMessageTimeout });
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
        <CounterInput
          min={0}
          max={MAX_PRODUCT_QTY}
          onChange={this.quantityChanged}
          value={this.state.quantity}
        />
        {this.renderBottom()}
      </Wrapper>
    );
  }
}

export { StockProductQuantity };

export default compose(
  graphql(UpdateStockProductMutation, {
    name: 'updateStockProduct',
  }),
  graphql(RemoveStockProductMutation, {
    name: 'removeStockProduct',
  }),
)(StockProductQuantity);
