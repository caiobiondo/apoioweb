import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { formatDate, formatTime, formatCurrency } from 'locale/utils';
import { orange100 } from 'styles/colors';
import { Paper } from 'natura-ui';

import SectionTitle from 'components/molecules/SectionTitle/SectionTitle';
import OrderDatum from '../OrderDatum/OrderDatum';

import {
  OrderDetailsWrapper,
  OrderInfos,
  OrderInfosColumn,
  OrderInfosRow,
  OrderData,
} from './OrderInfo.styles';
import { OrderDatumValue } from '../OrderDatum/OrderDatum.styles';

export default class OrderInfo extends Component {
  renderPaymentMethods = paymentMethods => {
    return paymentMethods.map((paymentMethod, index) => {
      return this.renderPaymentMethod(paymentMethod, index);
    });
  };

  renderPaymentMethod = ({ descricaoWeb, valorAcumulado }, index) => {
    const { intl } = this.props;

    return (
      <OrderDatumValue key={index}>
        {`${descricaoWeb} - ${formatCurrency(valorAcumulado, intl)}`}
      </OrderDatumValue>
    );
  };

  renderAddressStreet = ({ tipoLogradouro, nomeLogradouro, numero, bairro }) => {
    return `${tipoLogradouro} ${nomeLogradouro}, ${numero} - ${bairro}`;
  };

  renderAddressZipcode = ({ cep }) => {
    return ` ${cep.slice(0, 5)}-${cep.slice(5)}`;
  };

  renderAddress = address => {
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
  };

  renderEvents = events => {
    return events.map(event => this.renderEvent(event));
  };

  renderEvent = ({ id, ocorrencia, motivo, solucao, data }) => {
    const { intl } = this.props;

    return (
      <OrderData key={id}>
        <OrderDatum type="long" label="orderEvents" value={ocorrencia} />
        <OrderDatum type="long" label="orderEventMotive" value={motivo} />
        <OrderDatum type="long" label="orderEventSolution" value={solucao} />
        <OrderDatum type="medium" label="orderEventDate" value={formatDate(data, intl, '-')} />
        <OrderDatum type="medium" label="orderEventHour" value={formatTime(data, intl, '-')} />
      </OrderData>
    );
  };

  renderOrderData = order => {
    const {
      codigoPedido,
      ciclo,
      dataPedido,
      status,
      quantidadeItens,
      pontos,
      meioCaptacao,
      envioBoleto,
    } = order;
    const { intl } = this.props;

    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderData" />
        <OrderData>
          <OrderDatum type="short" label="orderNumber" value={codigoPedido} />
          <OrderDatum type="short" label="orderCycle" value={ciclo} />
          <OrderDatum type="short" label="orderDate" value={formatDate(dataPedido, intl, '-')} />
          <OrderDatum type="long" label="orderStatus" value={status} />
          <OrderDatum type="short" label="orderItemsQuantity" value={quantidadeItens} />
          <OrderDatum type="short" label="orderTotalScore" value={pontos} />
          <OrderDatum type="short" label="orderReception" value={meioCaptacao} />
          <OrderDatum type="long" label="orderPaymentSlip" value={envioBoleto} />
        </OrderData>
      </OrderInfosRow>
    );
  };

  renderOrderValues = ({ valor, vlTaxaReal, qtdParcelas, valorParcela, vlAPagarSomaTaxa }) => {
    const { intl } = this.props;

    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderValues" />
        <OrderData>
          <OrderDatum
            type="short"
            label="orderDetailsOrderValue"
            value={formatCurrency(valor, intl)}
          />
          <OrderDatum type="short" label="orderTaxValue" value={formatCurrency(vlTaxaReal, intl)} />
          <OrderDatum type="short" label="orderInstallmentsNumber" value={qtdParcelas} />
          <OrderDatum
            type="short"
            label="orderInstallmentValue"
            value={formatCurrency(valorParcela, intl)}
          />
          <OrderDatum
            type="short"
            label="orderValue"
            value={formatCurrency(vlAPagarSomaTaxa, intl)}
          />
        </OrderData>
      </OrderInfosRow>
    );
  };

  renderOrderPaymentMethods = ({ formasPagamento }) => {
    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderPayment" />
        <OrderData>
          <OrderDatum type="long" label="orderPaymentMessage">
            {this.renderPaymentMethods(formasPagamento)}
          </OrderDatum>
        </OrderData>
      </OrderInfosRow>
    );
  };

  renderOrderReceipt = ({ numeroNotaFiscal, dataEmissaoNotaFiscal, modeloComercial }) => {
    const { intl } = this.props;

    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderReceipt" />
        <OrderData>
          <OrderDatum type="short" label="orderReceiptNumber" value={numeroNotaFiscal} />
          <OrderDatum
            type="short"
            label="orderReceiptEmitDate"
            value={formatDate(dataEmissaoNotaFiscal, intl, '-')}
          />
          <OrderDatum type="short" label="orderReceiptModel" value={modeloComercial} />
        </OrderData>
      </OrderInfosRow>
    );
  };

  renderOrderDelivery = ({ entrega }) => {
    const {
      dtPrevisaoEntrega,
      dtNovaPrevisaoEntrega,
      dtPrevisaoEntregaProrrogada,
      dtPrimeiraTentativaEntrega,
      dtSegundaTentativaEntrega,
      dtRealEntrega,
    } = entrega;
    const { intl } = this.props;

    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderDelivery" />
        <OrderData>
          <OrderDatum
            type="medium"
            label="orderDeliveryEstimatedDate"
            value={formatDate(dtPrevisaoEntrega, intl, '-')}
          />
          <OrderDatum
            type="medium"
            label="orderDeliveryNewEstimatedDate"
            value={formatDate(dtNovaPrevisaoEntrega, intl, '-')}
          />
          <OrderDatum
            type="medium"
            label="orderDeliveryExtendedEstimatedDate"
            value={formatDate(dtPrevisaoEntregaProrrogada, intl, '-')}
          />
          <OrderDatum
            type="medium"
            label="orderDeliveryFirstTryDate"
            value={formatDate(dtPrimeiraTentativaEntrega, intl, '-')}
          />
          <OrderDatum
            type="medium"
            label="orderDeliverySecondTryDate"
            value={formatDate(dtSegundaTentativaEntrega, intl, '-')}
          />
          <OrderDatum
            type="medium"
            label="orderDeliveryRealDate"
            value={formatDate(dtRealEntrega, intl, '-')}
          />
        </OrderData>
      </OrderInfosRow>
    );
  };

  renderOrderEvents = ({ ocorrencias }) => {
    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderEvents" />
        {this.renderEvents(ocorrencias)}
      </OrderInfosRow>
    );
  };

  renderOrderDeliveryAddress = ({ entrega: { enderecoEntrega } }) => {
    return (
      <OrderInfosRow>
        <SectionTitle color={orange100} value="orderDeliveryAddress" />
        {this.renderAddress(enderecoEntrega)}
      </OrderInfosRow>
    );
  };

  render() {
    const { order } = this.props;
    return (
      <Paper style={OrderDetailsWrapper}>
        <SectionTitle iconName="ico_info" value="orderInformations" />
        <OrderInfos>
          <OrderInfosColumn>
            {this.renderOrderData(order)}
            {this.renderOrderValues(order)}
            {this.renderOrderPaymentMethods(order)}
            {this.renderOrderReceipt(order)}
          </OrderInfosColumn>

          <OrderInfosColumn>
            {this.renderOrderDelivery(order)}
            {this.renderOrderEvents(order)}
            {this.renderOrderDeliveryAddress(order)}
          </OrderInfosColumn>
        </OrderInfos>
      </Paper>
    );
  }
}
