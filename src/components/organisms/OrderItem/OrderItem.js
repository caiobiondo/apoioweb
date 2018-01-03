import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Img from 'react-image';
import { formatCurrency } from 'locale/utils';
import { Loading, Icon, FormButton } from 'natura-ui';

import OrderItemDatum from '../OrderDetailsData/molecules/OrderItemDatum/OrderItemDatum';

import {
  OrderItemWrapper,
  OrderItemProductDescriptionCode,
  OrderItemProductDescription,
  OrderItemProductCode,
  OrderItemProductDataWrapper,
  OrderItemProductDescriptionWrapper,
  OrderItemProductImageWrapper,
  OrderItemProductImageFallback,
  OrderItemImportButtonWrapper,
  orderItemImportButtonStyles,
} from './OrderItem.styles';

export default class OrderItem extends Component {
  renderOrderItemProductCode = ({ codigoProduto, quantidadePontosUnitario }) => {
    const pointsElement = React.createElement(FormattedMessage, { id: 'orderItemPoints' });

    return (
      <OrderItemProductCode>
        <FormattedMessage id="orderItemProductCode" />
        : {codigoProduto} ({quantidadePontosUnitario} {pointsElement})
      </OrderItemProductCode>
    );
  };

  renderOrderItemProductImageFallback = () => {
    return (
      <OrderItemProductImageFallback>
        <Icon file="ico_pictureless" />
      </OrderItemProductImageFallback>
    );
  };

  renderOrderItemProductImage = ({ codigoProduto }) => {
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${codigoProduto}_1.jpg`;
    const fallbackImage = this.renderOrderItemProductImageFallback();
    const loader = React.createElement(Loading);

    return (
      <OrderItemProductImageWrapper>
        <Img src={imageUrl} loader={loader} unloader={fallbackImage} />
      </OrderItemProductImageWrapper>
    );
  };

  renderOrderItemImportButton = (importing, imported, onImport) => {
    if (!importing) {
      return null;
    }
    return (
      <OrderItemDatum>
        <OrderItemImportButtonWrapper>
          {imported && (
            <FormButton
              primary
              {...orderItemImportButtonStyles}
              label={<FormattedMessage id="orderItemImported" />}
            />
          )}
          {!imported && (
            <FormButton
              primary
              {...orderItemImportButtonStyles}
              onClick={onImport}
              label={<FormattedMessage id="orderItemImport" />}
            />
          )}
        </OrderItemImportButtonWrapper>
      </OrderItemDatum>
    );
  };

  render() {
    const { intl, importing, imported, orderItem, onImport } = this.props;
    const {
      produto: { description },
      quantidadeItem,
      valorTotal,
      quantidadePontosTotal,
    } = orderItem;

    return (
      <OrderItemWrapper>
        <OrderItemProductDescriptionWrapper>
          {this.renderOrderItemProductImage(orderItem)}
          <OrderItemProductDescriptionCode>
            <OrderItemProductDescription>{description}</OrderItemProductDescription>
            {this.renderOrderItemProductCode(orderItem)}
          </OrderItemProductDescriptionCode>
        </OrderItemProductDescriptionWrapper>
        <OrderItemProductDataWrapper>
          <OrderItemDatum label="orderItemQuantity" value={quantidadeItem} />
          <OrderItemDatum label="orderItemValue" value={formatCurrency(valorTotal, intl)} />
          <OrderItemDatum label="orderItemPoints" value={quantidadePontosTotal} />
          {this.renderOrderItemImportButton(importing, imported, onImport)}
        </OrderItemProductDataWrapper>
      </OrderItemWrapper>
    );
  }
}
