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
  orderItemImportedButtonStyles,
} from './OrderItem.styles';

export default class OrderItem extends Component {
  renderProductImage = ({ codigoProduto }) => {
    const imageUrl = `http://rede.natura.net/image/sku/145x145/${codigoProduto}_1.jpg`;
    const fallbackImage = this.renderProductImageFallback();
    const loader = React.createElement(Loading);

    return (
      <OrderItemProductImageWrapper>
        <Img src={imageUrl} loader={loader} unloader={fallbackImage} />
      </OrderItemProductImageWrapper>
    );
  };

  renderProductImageFallback = () => {
    return (
      <OrderItemProductImageFallback>
        <Icon file="ico_pictureless" />
      </OrderItemProductImageFallback>
    );
  };

  renderProductCode = ({ codigoProduto, quantidadePontosUnitario }) => {
    const pointsElement = React.createElement(FormattedMessage, { id: 'orderItemPoints' });

    return (
      <OrderItemProductCode>
        <FormattedMessage id="orderItemProductCode" />
        : {codigoProduto} ({quantidadePontosUnitario} {pointsElement})
      </OrderItemProductCode>
    );
  };

  renderImportButton = (imported, onImport) => {
    if (imported) {
      return (
        <FormButton
          {...orderItemImportedButtonStyles}
          disabled
          icon={<Icon file="ico_check" />}
          label={<FormattedMessage id="orderItemImported" />}
        />
      );
    }
    return (
      <FormButton
        primary
        {...orderItemImportButtonStyles}
        onClick={onImport}
        label={<FormattedMessage id="orderItemImport" />}
      />
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
          {this.renderProductImage(orderItem)}
          <OrderItemProductDescriptionCode>
            <OrderItemProductDescription>{description}</OrderItemProductDescription>
            {this.renderProductCode(orderItem)}
          </OrderItemProductDescriptionCode>
        </OrderItemProductDescriptionWrapper>
        <OrderItemProductDataWrapper>
          <OrderItemDatum label="orderItemQuantity" value={quantidadeItem} />
          <OrderItemDatum label="orderItemValue" value={formatCurrency(valorTotal, intl)} />
          <OrderItemDatum label="orderItemPoints" value={quantidadePontosTotal} />
          {importing && (
            <OrderItemDatum>
              <OrderItemImportButtonWrapper>
                {this.renderImportButton(imported, onImport)}
              </OrderItemImportButtonWrapper>
            </OrderItemDatum>
          )}
        </OrderItemProductDataWrapper>
      </OrderItemWrapper>
    );
  }
}
