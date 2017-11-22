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
  OrderDatumShort,
  OrderDatumShortMedium,
  OrderDatumMedium,
  OrderDatumLong,
  OrderDatumLabel,
  OrderDatumValue,
} from './OrderDetailsData.styles';

export class OrderDetailsData extends Component {
  renderOrderItems(orderItems) {
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
        {(orderItems || []).map(orderItem => this.renderOrderItem(orderItem))}
      </div>
    );
  }

  renderOrderItem(orderItem) {
    const { intl } = this.props;

    return (
      <OrderItemWrapper>
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

  renderAddress(address) {
    return (
      <OrderData>
        <OrderDatumLong>
          <OrderDatumValue>
            {`${address.tipoLogradouro} ${address.nomeLogradouro}, ${address.numero} - ${
              address.bairro
            }`}
          </OrderDatumValue>
          <OrderDatumValue>{`${address.cidade} - ${address.estado}`}</OrderDatumValue>
          <OrderDatumValue>
            CEP: {`${address.cep.slice(0, 5)}-${address.cep.slice(5)}`}
          </OrderDatumValue>
        </OrderDatumLong>
      </OrderData>
    );
  }

  renderEvents(events) {
    return events.map(event => this.renderEvent(event));
  }

  renderEvent(event) {
    const { intl } = this.props;

    return (
      <OrderData key={event.id}>
        <OrderDatumLong>
          <OrderDatumLabel>
            <FormattedMessage id="orderEvents" />
          </OrderDatumLabel>
          <OrderDatumValue>{event.ocorrencia}</OrderDatumValue>
        </OrderDatumLong>
        <OrderDatumLong>
          <OrderDatumLabel>
            <FormattedMessage id="orderEventMotive" />
          </OrderDatumLabel>
          <OrderDatumValue>{event.motivo}</OrderDatumValue>
        </OrderDatumLong>
        <OrderDatumLong>
          <OrderDatumLabel>
            <FormattedMessage id="orderEventSolution" />
          </OrderDatumLabel>
          <OrderDatumValue>{event.solucao}</OrderDatumValue>
        </OrderDatumLong>
        <OrderDatumMedium>
          <OrderDatumLabel>
            <FormattedMessage id="orderEventDate" />
          </OrderDatumLabel>
          <OrderDatumValue>{formatDate(event.data, intl, '-')}</OrderDatumValue>
        </OrderDatumMedium>
        <OrderDatumMedium>
          <OrderDatumLabel>
            <FormattedMessage id="orderEventHour" />
          </OrderDatumLabel>
          <OrderDatumValue>{formatTime(event.data, intl, '-')}</OrderDatumValue>
        </OrderDatumMedium>
      </OrderData>
    );
  }

  render() {
    const { data, intl } = this.props;
    const { order } = data;

    const dataPedido = formatDate(order.dataPedido, intl, '-');

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
                  <OrderDatum type="shortMedium" label="orderCycle" value={order.ciclo} />
                  <OrderDatum type="medium" label="orderData" value={dataPedido} />
                  <OrderDatumLong>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderStatus" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.status}</OrderDatumValue>
                  </OrderDatumLong>
                  <OrderDatumShortMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderItemsQuantity" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.quantidadeItens}</OrderDatumValue>
                  </OrderDatumShortMedium>
                  <OrderDatumShortMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderTotalScore" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.pontos}</OrderDatumValue>
                  </OrderDatumShortMedium>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderReception" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.meioCaptacao}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumLong>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderPaymentSlip" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.envioBoleto}</OrderDatumValue>
                  </OrderDatumLong>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderValues" />
                <OrderData>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDetailsOrderValue" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{formatCurrency(order.valor, intl)}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderTaxValue" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{formatCurrency(order.vlTaxaReal, intl)}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderInstallmentsNumber" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.qtdParcelas}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderInstallmentValue" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{formatCurrency(order.valorParcela, intl)}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderValue" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatCurrency(order.vlAPagarSomaTaxa, intl)}
                    </OrderDatumValue>
                  </OrderDatumShort>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderPayment" />
                <OrderData>
                  <OrderDatumLong>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderPaymentMessage" />
                    </OrderDatumLabel>
                    {this.renderPaymentMethods(order.formasPagamento)}
                  </OrderDatumLong>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderReceipt" />
                <OrderData>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderReceiptNumber" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.numeroNotaFiscal}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderReceiptEmitDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.dataEmissaoNotaFiscal, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderReceiptModel" />
                    </OrderDatumLabel>
                    <OrderDatumValue>{order.modeloComercial}</OrderDatumValue>
                  </OrderDatumShort>
                </OrderData>
              </OrderInfosRow>
            </OrderInfosColumn>
            <OrderInfosColumn>
              <OrderInfosRow>
                <SectionTitle color={orange100} value="orderDelivery" />
                <OrderData>
                  <OrderDatumMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDeliveryEstimatedDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.entrega.dtPrevisaoEntrega, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDeliveryNewEstimatedDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.entrega.dtNovaPrevisaoEntrega, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDeliveryExtendedEstimatedDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.entrega.dtPrevisaoEntregaProrrogada, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDeliveryFirstTryDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.entrega.dtPrimeiraTentativaEntrega, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDeliverySecondTryDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.entrega.dtSegundaTentativaEntrega, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>
                      <FormattedMessage id="orderDeliveryRealDate" />
                    </OrderDatumLabel>
                    <OrderDatumValue>
                      {formatDate(order.entrega.dtRealEntrega, intl, '-')}
                    </OrderDatumValue>
                  </OrderDatumMedium>
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
