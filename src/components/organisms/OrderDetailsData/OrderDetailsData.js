import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { OrderDetailsQuery, OrderDetailsQueryOptions } from './OrderDetailsData.data';
import { formatDate, formatTime, formatCurrency } from 'locale/utils';
import withUserData from 'hocs/withUserData/withUserData';
import { orange100 } from 'styles/colors';

import SectionTitle from './molecules/SectionTitle/SectionTitle';
import OrderDatum from './molecules/OrderDatum/OrderDatum';

import { Paper, Loading } from 'natura-ui';
import {
  OrderDetailsWrapper,
  OrderInfos,
  OrderInfosColumn,
  OrderInfosRow,
  OrderItemsInfos,
  OrderItemsQuantityWrapper,
  OrderItemsQuantity,
  OrderItemsHeader,
  OrderItemsHeaderProductDescription,
  OrderItemsHeaderProductValuesWrapper,
  OrderItemsHeaderProductValueLabel,
  OrderItem,
  OrderItemDatumShort,
  OrderItemDatumMediumLong,
  OrderItemProductDescription,
  OrderItemProductDescriptionWrapper,
  OrderItemProductCode,
  OrderItemProductDatumLabel,
  OrderItemProductDatumValue,
  OrderItemWrapper,
  OrderData,
  OrderDatumValue,
} from './OrderDetailsData.styles';

export class OrderDetailsData extends Component {
  renderOrderItems(orderItems) {
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
          </OrderItemsHeaderProductValuesWrapper>
        </OrderItemsHeader>
        {orderItems.map((orderItem, index) => this.renderOrderItem(orderItem, index))}
      </div>
    );
  }

  renderOrderItem(orderItem, index) {
    const { intl } = this.props;

    return (
      <OrderItemWrapper key={index}>
        <OrderItem>
          <OrderItemProductDescriptionWrapper>
            <OrderItemProductDescription>{orderItem.produto.descricao}</OrderItemProductDescription>
            <OrderItemProductCode>
              Código: {orderItem.codigoProduto} ({orderItem.quantidadePontosUnitario} pontos)
            </OrderItemProductCode>
          </OrderItemProductDescriptionWrapper>
          <OrderItemDatumMediumLong>
            <OrderItemDatumShort>
              <OrderItemProductDatumLabel>
                <FormattedMessage id="orderItemQuantity" />
              </OrderItemProductDatumLabel>
              <OrderItemProductDatumValue>{orderItem.quantidadeItem}</OrderItemProductDatumValue>
            </OrderItemDatumShort>
            <OrderItemDatumShort>
              <OrderItemProductDatumLabel>
                <FormattedMessage id="orderItemValue" />
              </OrderItemProductDatumLabel>
              <OrderItemProductDatumValue>
                {formatCurrency(orderItem.valorTotal, intl)}
              </OrderItemProductDatumValue>
            </OrderItemDatumShort>
            <OrderItemDatumShort>
              <OrderItemProductDatumLabel>
                <FormattedMessage id="orderItemPoints" />
              </OrderItemProductDatumLabel>
              <OrderItemProductDatumValue>
                {orderItem.quantidadePontosTotal}
              </OrderItemProductDatumValue>
            </OrderItemDatumShort>
          </OrderItemDatumMediumLong>
        </OrderItem>
      </OrderItemWrapper>
    );
  }

  renderPaymentMethods(paymentMethods) {
    return paymentMethods.map((paymentMethod, index) => {
      return this.renderPaymentMethod(paymentMethod, index);
    });
  }

  renderPaymentMethod(paymentMethod, index) {
    const { intl } = this.props;

    return (
      <OrderDatumValue key={index}>
        {`${paymentMethod.descricaoWeb} - ${formatCurrency(paymentMethod.valorAcumulado, intl)}`}
      </OrderDatumValue>
    );
  }

  renderAddressStreet({ tipoLogradouro, nomeLogradouro, numero, bairro }) {
    return `${tipoLogradouro} ${nomeLogradouro}, ${numero} - ${bairro}`;
  }

  renderAddressZipcode({ cep }) {
    return ` ${cep.slice(0, 5)}-${cep.slice(5)}`;
  }

  renderAddress(address) {
    return (
      <OrderData>
        <OrderDatum type="long">
          <OrderDatumValue>{this.renderAddressStreet(address)}</OrderDatumValue>
          <OrderDatumValue>{`${address.cidade} - ${address.estado}`}</OrderDatumValue>
          <OrderDatumValue>
            <FormattedMessage id="orderDeliveryAddressZipcode" />:
            {this.renderAddressZipcode(address)}
          </OrderDatumValue>
        </OrderDatum>
      </OrderData>
    );
  }

  renderEvents(events) {
    return events.map(event => this.renderEvent(event));
  }

  renderEvent(event) {
    const { intl } = this.props;
    const { id, ocorrencia, motivo, solucao, data } = event;

    return (
      <OrderData key={id}>
        <OrderDatum type="long" label="orderEvents" value={ocorrencia} />
        <OrderDatum type="long" label="orderEventMotive" value={motivo} />
        <OrderDatum type="long" label="orderEventSolution" value={solucao} />
        <OrderDatum type="medium" label="orderEventDate" value={formatDate(data, intl, '-')} />
        <OrderDatum type="medium" label="orderEventHour" value={formatTime(data, intl, '-')} />
      </OrderData>
    );
  }

  render() {
    const { data, intl } = this.props;
    const { order } = data;

    if (data.loading) {
      return <Loading background="transparent" />;
    }

    return (
      <div>
        <Paper style={OrderDetailsWrapper}>
          <SectionTitle iconName="ico_info" value="orderInformations" />
          <OrderInfos>
            <OrderInfosColumn>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderData" />
                <OrderData>
                  <OrderDatum type="short" label="orderNumber" value={order.codigoPedido} />
                  <OrderDatum type="short" label="orderCycle" value={order.ciclo} />
                  <OrderDatum
                    type="short"
                    label="orderData"
                    value={formatDate(order.dataPedido, intl, '-')}
                  />
                  <OrderDatum type="long" label="orderStatus" value={order.status} />
                  <OrderDatum
                    type="short"
                    label="orderItemsQuantity"
                    value={order.quantidadeItens}
                  />
                  <OrderDatum type="short" label="orderTotalScore" value={order.pontos} />
                  <OrderDatum type="short" label="orderReception" value={order.meioCaptacao} />
                  <OrderDatum type="long" label="orderPaymentSlip" value={order.envioBoleto} />
                </OrderData>
              </OrderInfosRow>

              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderValues" />
                <OrderData>
                  <OrderDatum
                    type="short"
                    label="orderDetailsOrderValue"
                    value={formatCurrency(order.valor, intl)}
                  />
                  <OrderDatum
                    type="short"
                    label="orderTaxValue"
                    value={formatCurrency(order.vlTaxaReal, intl)}
                  />
                  <OrderDatum
                    type="short"
                    label="orderInstallmentsNumber"
                    value={order.qtdParcelas}
                  />
                  <OrderDatum
                    type="short"
                    label="orderInstallmentValue"
                    value={formatCurrency(order.valorParcela, intl)}
                  />
                  <OrderDatum
                    type="short"
                    label="orderValue"
                    value={formatCurrency(order.vlAPagarSomaTaxa, intl)}
                  />
                </OrderData>
              </OrderInfosRow>

              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderPayment" />
                <OrderData>
                  <OrderDatum type="long" label="orderPaymentMessage">
                    {this.renderPaymentMethods(order.formasPagamento)}
                  </OrderDatum>
                </OrderData>
              </OrderInfosRow>

              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderReceipt" />
                <OrderData>
                  <OrderDatum
                    type="short"
                    label="orderReceiptNumber"
                    value={order.numeroNotaFiscal}
                  />
                  <OrderDatum
                    type="short"
                    label="orderReceiptEmitDate"
                    value={formatDate(order.dataEmissaoNotaFiscal, intl, '-')}
                  />
                  <OrderDatum
                    type="short"
                    label="orderReceiptModel"
                    value={order.modeloComercial}
                  />
                </OrderData>
              </OrderInfosRow>
            </OrderInfosColumn>

            <OrderInfosColumn>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderDelivery" />
                <OrderData>
                  <OrderDatum
                    type="medium"
                    label="orderDeliveryEstimatedDate"
                    value={formatDate(order.entrega.dtPrevisaoEntrega, intl, '-')}
                  />
                  <OrderDatum
                    type="medium"
                    label="orderDeliveryNewEstimatedDate"
                    value={formatDate(order.entrega.dtNovaPrevisaoEntrega, intl, '-')}
                  />
                  <OrderDatum
                    type="medium"
                    label="orderDeliveryExtendedEstimatedDate"
                    value={formatDate(order.entrega.dtPrevisaoEntregaProrrogada, intl, '-')}
                  />
                  <OrderDatum
                    type="medium"
                    label="orderDeliveryFirstTryDate"
                    value={formatDate(order.entrega.dtPrimeiraTentativaEntrega, intl, '-')}
                  />
                  <OrderDatum
                    type="medium"
                    label="orderDeliverySecondTryDate"
                    value={formatDate(order.entrega.dtSegundaTentativaEntrega, intl, '-')}
                  />
                  <OrderDatum
                    type="medium"
                    label="orderDeliveryRealDate"
                    value={formatDate(order.entrega.dtRealEntrega, intl, '-')}
                  />
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderEvents" />
                {this.renderEvents(order.ocorrencias)}
              </OrderInfosRow>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderDeliveryAddress" />
                {this.renderAddress(order.entrega.enderecoEntrega)}
              </OrderInfosRow>
            </OrderInfosColumn>
          </OrderInfos>
        </Paper>
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
      </div>
    );
  }
}

export const OrderDetailsDataWithIntl = injectIntl(OrderDetailsData);

export const OrderDetailsDataWithData = graphql(OrderDetailsQuery, OrderDetailsQueryOptions)(
  OrderDetailsDataWithIntl,
);

export default withUserData(OrderDetailsDataWithData);
