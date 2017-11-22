import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { injectIntl, FormattedMessage } from 'react-intl';
import { OrderDetailsQuery, OrderDetailsQueryOptions } from './OrderDetailsData.data';
import { formatDate, formatTime, formatCurrency } from 'locale/utils';
import withUserData from 'hocs/withUserData/withUserData';

import { Paper, Icon, Loading } from 'natura-ui';
import {
  SectionTitle,
  SectionTitleSymbol,
  SectionTitleLabel,
  OrderDetailsCard,
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
  OrderDataTitle,
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
          <OrderItemsHeaderProductDescription>Produto</OrderItemsHeaderProductDescription>
          <OrderItemsHeaderProductValuesWrapper>
            <OrderItemsHeaderProductValueLabel>Quantidade</OrderItemsHeaderProductValueLabel>
            <OrderItemsHeaderProductValueLabel>Valor</OrderItemsHeaderProductValueLabel>
            <OrderItemsHeaderProductValueLabel>Pontos</OrderItemsHeaderProductValueLabel>
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
              <OrderItemProductDatumLabel>Quantidade</OrderItemProductDatumLabel>
              <OrderItemProductDatumValue>{orderItem.quantidadeItem}</OrderItemProductDatumValue>
            </OrderItemDatumShort>
            <OrderItemDatumShort>
              <OrderItemProductDatumLabel>Valor</OrderItemProductDatumLabel>
              <OrderItemProductDatumValue>
                {formatCurrency(orderItem.valorTotal, intl)}
              </OrderItemProductDatumValue>
            </OrderItemDatumShort>
            <OrderItemDatumShort>
              <OrderItemProductDatumLabel>Pontos</OrderItemProductDatumLabel>
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
            {`${address.tipoLogradouro} ${address.nomeLogradouro}, ${address.numero} - ${address.bairro}`}
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

    if (data.loading) {
      return <Loading background="transparent" />;
    }

    return (
      <div>
        <OrderDetailsCard>
          <Paper>
            <SectionTitle>
              <SectionTitleSymbol>
                <Icon file="ico_info" />
              </SectionTitleSymbol>
              <SectionTitleLabel>
                <FormattedMessage id="orderInformations" />
              </SectionTitleLabel>
            </SectionTitle>
            <OrderInfos>
              <OrderInfosColumn>
                <OrderInfosRow>
                  <OrderDataTitle>
                    <FormattedMessage id="orderData" />
                  </OrderDataTitle>
                  <OrderData>
                    <OrderDatumShort>
                      <OrderDatumLabel>
                        <FormattedMessage id="orderNumber" />
                      </OrderDatumLabel>
                      <OrderDatumValue>{order.codigoPedido}</OrderDatumValue>
                    </OrderDatumShort>
                    <OrderDatumShortMedium>
                      <OrderDatumLabel>
                        <FormattedMessage id="orderCycle" />
                      </OrderDatumLabel>
                      <OrderDatumValue>{order.ciclo}</OrderDatumValue>
                    </OrderDatumShortMedium>
                    <OrderDatumShortMedium>
                      <OrderDatumLabel>
                        <FormattedMessage id="orderDate" />
                      </OrderDatumLabel>
                      <OrderDatumValue>{formatDate(order.dataPedido, intl, '-')}</OrderDatumValue>
                    </OrderDatumShortMedium>
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
                  <OrderDataTitle>
                    <FormattedMessage id="orderValues" />
                  </OrderDataTitle>
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
                  <OrderDataTitle>
                    <FormattedMessage id="orderPayment" />
                  </OrderDataTitle>
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
                  <OrderDataTitle>
                    <FormattedMessage id="orderReceipt" />
                  </OrderDataTitle>
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
                  <OrderDataTitle>
                    <FormattedMessage id="orderDelivery" />
                  </OrderDataTitle>
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
                  <OrderDataTitle>
                    <FormattedMessage id="orderEvents" />
                  </OrderDataTitle>
                  {this.renderEvents(order.ocorrencias)}
                </OrderInfosRow>
                <OrderInfosRow>
                  <OrderDataTitle>
                    <FormattedMessage id="orderDeliveryAddress" />
                  </OrderDataTitle>
                  {this.renderAddress(order.entrega.enderecoEntrega)}
                </OrderInfosRow>
              </OrderInfosColumn>
            </OrderInfos>
          </Paper>
        </OrderDetailsCard>
        <OrderDetailsCard>
          <Paper>
            <SectionTitle>
              <SectionTitleSymbol>
                <Icon file="ico_box" />
              </SectionTitleSymbol>
              <SectionTitleLabel>
                <FormattedMessage id="orderItems" />
              </SectionTitleLabel>
            </SectionTitle>
            <OrderItemsInfos>
              <OrderItemsQuantityWrapper>
                <FormattedMessage id="orderItemsBoughtQuantity" />
                <OrderItemsQuantity>({(order.itemEnviadoCaixa || []).length})</OrderItemsQuantity>
              </OrderItemsQuantityWrapper>
              {this.renderOrderItems(order.itemEnviadoCaixa)}
            </OrderItemsInfos>
          </Paper>
        </OrderDetailsCard>
      </div>
    );
  }
}

export const OrderDetailsDataWithIntl = injectIntl(OrderDetailsData);

export const OrderDetailsDataWithData = graphql(OrderDetailsQuery, OrderDetailsQueryOptions)(
  OrderDetailsDataWithIntl,
);

export default withUserData(OrderDetailsDataWithData);
