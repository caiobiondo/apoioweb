import React, { Component } from 'react';
import { Card, Icon } from 'natura-ui';
import {
  SectionTitle,
  SectionTitleSymbol,
  SectionTitleLabel,
  OrderDetailsCard,
  OrderInfos,
  OrderInfosColumn,
  OrderInfosRow,
  OrderData,
  OrderDataTitle,
  OrderDatumShort,
  OrderDatumShortMedium,
  OrderDatumMedium,
  OrderDatumLong,
  OrderDatumLabel,
  OrderDatumValue,
} from './OrderDetails.styles';

class OrderDetails extends Component {
  render() {
    const { id } = this.props.match.params;
    return (
      <OrderDetailsCard>
        <Card>
          <SectionTitle>
            <SectionTitleSymbol>
              <Icon file="ico_info" />
            </SectionTitleSymbol>
            <SectionTitleLabel>Informações</SectionTitleLabel>
          </SectionTitle>
          <OrderInfos>
            <OrderInfosColumn>
              <OrderInfosRow>
                <OrderDataTitle>Dados do pedido</OrderDataTitle>
                <OrderData>
                  <OrderDatumShort>
                    <OrderDatumLabel>Número do pedido</OrderDatumLabel>
                    <OrderDatumValue>#{id}</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShortMedium>
                    <OrderDatumLabel>Ciclo</OrderDatumLabel>
                    <OrderDatumValue>#{id}</OrderDatumValue>
                  </OrderDatumShortMedium>
                  <OrderDatumShortMedium>
                    <OrderDatumLabel>Data</OrderDatumLabel>
                    <OrderDatumValue>#{id}</OrderDatumValue>
                  </OrderDatumShortMedium>
                  <OrderDatumLong>
                    <OrderDatumLabel>Situacao</OrderDatumLabel>
                    <OrderDatumValue>Pedido guardando confirmacao de pagamento</OrderDatumValue>
                  </OrderDatumLong>
                  <OrderDatumShortMedium>
                    <OrderDatumLabel>Quantidade de itens</OrderDatumLabel>
                    <OrderDatumValue>12</OrderDatumValue>
                  </OrderDatumShortMedium>
                  <OrderDatumShortMedium>
                    <OrderDatumLabel>Total de pontos</OrderDatumLabel>
                    <OrderDatumValue>140</OrderDatumValue>
                  </OrderDatumShortMedium>
                  <OrderDatumShort>
                    <OrderDatumLabel>Meio de captacao</OrderDatumLabel>
                    <OrderDatumValue>Web</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumLong>
                    <OrderDatumLabel>Boleto</OrderDatumLabel>
                    <OrderDatumValue>000000000000000000000000000000000</OrderDatumValue>
                  </OrderDatumLong>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <OrderDataTitle>Valores</OrderDataTitle>
                <OrderData>
                  <OrderDatumShort>
                    <OrderDatumLabel>Valor do pedido</OrderDatumLabel>
                    <OrderDatumValue>R$ 417,34</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>Taxa</OrderDatumLabel>
                    <OrderDatumValue>R$ 0,00</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>Nº de parcelas</OrderDatumLabel>
                    <OrderDatumValue>2</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>Valor da parcela</OrderDatumLabel>
                    <OrderDatumValue>2 x R$ 208,67</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>Valor final</OrderDatumLabel>
                    <OrderDatumValue>R$ 417,34</OrderDatumValue>
                  </OrderDatumShort>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <OrderDataTitle>Pagamento</OrderDataTitle>
                <OrderData>
                  <OrderDatumLong>
                    <OrderDatumLabel>
                      O pagamento para este pedido foi dividido da seguinte forma
                    </OrderDatumLabel>
                    <OrderDatumValue>Cartao ELO 2x de R$ 208,67</OrderDatumValue>
                  </OrderDatumLong>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <OrderDataTitle>Nota fiscal</OrderDataTitle>
                <OrderData>
                  <OrderDatumShort>
                    <OrderDatumLabel>Numero da nota fiscal</OrderDatumLabel>
                    <OrderDatumValue>5242952343453</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>Data de emissao</OrderDatumLabel>
                    <OrderDatumValue>24/04/2017</OrderDatumValue>
                  </OrderDatumShort>
                  <OrderDatumShort>
                    <OrderDatumLabel>Modelo comercial</OrderDatumLabel>
                    <OrderDatumValue>Consultora</OrderDatumValue>
                  </OrderDatumShort>
                </OrderData>
              </OrderInfosRow>
            </OrderInfosColumn>
            <OrderInfosColumn>
              <OrderInfosRow>
                <OrderDataTitle>Entrega</OrderDataTitle>
                <OrderData>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Data prevista</OrderDatumLabel>
                    <OrderDatumValue>30/04/2017</OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Nova previsao</OrderDatumLabel>
                    <OrderDatumValue>02/05/2017</OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Prev. entrega prorrogada</OrderDatumLabel>
                    <OrderDatumValue>-</OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Data primeira tentativa</OrderDatumLabel>
                    <OrderDatumValue>02/05/2017</OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Data segunda tentativa</OrderDatumLabel>
                    <OrderDatumValue>-</OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Data real da entrega</OrderDatumLabel>
                    <OrderDatumValue>02/05/2017</OrderDatumValue>
                  </OrderDatumMedium>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <OrderDataTitle>Ocorrencia de transporte</OrderDataTitle>
                <OrderData>
                  <OrderDatumLong>
                    <OrderDatumLabel>Ocorrencia</OrderDatumLabel>
                    <OrderDatumValue>Atraso de carregamento</OrderDatumValue>
                  </OrderDatumLong>
                  <OrderDatumLong>
                    <OrderDatumLabel>Ocorrencia</OrderDatumLabel>
                    <OrderDatumValue>Falta de energia eletrica</OrderDatumValue>
                  </OrderDatumLong>
                  <OrderDatumLong>
                    <OrderDatumLabel>Solucao para a consultora</OrderDatumLabel>
                    <OrderDatumValue>-</OrderDatumValue>
                  </OrderDatumLong>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Data</OrderDatumLabel>
                    <OrderDatumValue>29/04/2017</OrderDatumValue>
                  </OrderDatumMedium>
                  <OrderDatumMedium>
                    <OrderDatumLabel>Hora</OrderDatumLabel>
                    <OrderDatumValue>12:00:00</OrderDatumValue>
                  </OrderDatumMedium>
                </OrderData>
              </OrderInfosRow>
              <OrderInfosRow>
                <OrderDataTitle>Endereco de entrega</OrderDataTitle>
                <OrderData>
                  <OrderDatumLong>
                    <OrderDatumValue>Rua Antonio Dias, 360 - Pocao</OrderDatumValue>
                    <OrderDatumValue>Santa Maria de Itabira/MG</OrderDatumValue>
                    <OrderDatumValue>CEP: 35910-000</OrderDatumValue>
                  </OrderDatumLong>
                </OrderData>
              </OrderInfosRow>
            </OrderInfosColumn>
          </OrderInfos>
        </Card>
      </OrderDetailsCard>
    );
  }
}

export default OrderDetails;
