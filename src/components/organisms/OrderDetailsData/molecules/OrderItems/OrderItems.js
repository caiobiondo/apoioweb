import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Img from 'react-image';
import { formatCurrency } from 'locale/utils';

import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import OrderItemDatum from '../OrderItemDatum/OrderItemDatum';

import { Paper, Loading, Icon, FormButton } from 'natura-ui';
import {
  OrderDetailsWrapper,
  OrderItemsInfos,
  OrderItemsQuantityWrapper,
  OrderItemsQuantity,
  OrderItemsHeader,
  OrderItemsHeaderProductDescription,
  OrderItemsHeaderProductValuesWrapper,
  OrderItemsHeaderProductValueLabel,
  OrderItem,
  OrderItemProductDescriptionCode,
  OrderItemProductDescription,
  OrderItemProductCode,
  OrderItemProductDataWrapper,
  OrderItemProductDescriptionWrapper,
  OrderItemProductImageWrapper,
  OrderItemProductImageFallback,
  OrderItemWrapper,
  OrderItemImportButtonWrapper,
  orderItemImportButtonStyles,
} from './OrderItems.styles';

export default class OrderItems extends Component {
  renderOrderItems = orderItems => {
    const { importing } = this.props;
    if (!orderItems) return null;

    return (
      <div>
        <OrderItemsHeader>
          <OrderItemsHeaderProductDescription>
            <FormattedMessage id="orderItemProduct" />
          </OrderItemsHeaderProductDescription>
          <OrderItemsHeaderProductValuesWrapper>
            <OrderItemsHeaderProductValueLabel>
              <FormattedMessage id="orderItemQuantity" />
            </OrderItemsHeaderProductValueLabel>
            <OrderItemsHeaderProductValueLabel>
              <FormattedMessage id="orderItemValue" />
            </OrderItemsHeaderProductValueLabel>
            <OrderItemsHeaderProductValueLabel>
              <FormattedMessage id="orderItemPoints" />
            </OrderItemsHeaderProductValueLabel>
            {importing && <OrderItemsHeaderProductValueLabel />}
          </OrderItemsHeaderProductValuesWrapper>
        </OrderItemsHeader>
        {orderItems.map((orderItem, index) => this.renderOrderItem(orderItem, index))}
      </div>
    );
  };

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

  renderOrderItem = (orderItem, index) => {
    const { intl, importing } = this.props;
    const {
      produto: { description },
      quantidadeItem,
      valorTotal,
      quantidadePontosTotal,
    } = orderItem;

    return (
      <OrderItemWrapper key={index}>
        <OrderItem>
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
            {importing && (
              <OrderItemDatum>
                <OrderItemImportButtonWrapper>
                  <FormButton
                    primary
                    {...orderItemImportButtonStyles}
                    label={<FormattedMessage id="orderItemImport" />}
                  />
                </OrderItemImportButtonWrapper>
              </OrderItemDatum>
            )}
          </OrderItemProductDataWrapper>
        </OrderItem>
      </OrderItemWrapper>
    );
  };

  render() {
    const { order } = this.props;
    return (
      <Paper style={OrderDetailsWrapper}>
        <SectionTitle iconName="ico_box" value="orderItems" />
        <OrderItemsInfos>
          <OrderItemsQuantityWrapper>
            <FormattedMessage id="orderItemsBoughtQuantity" />
            <OrderItemsQuantity>({(order.itemEnviadoCaixa || []).length})</OrderItemsQuantity>
          </OrderItemsQuantityWrapper>
          {this.renderOrderItems(order.itemEnviadoCaixa)}
        </OrderItemsInfos>
      </Paper>
    );
  }
}
