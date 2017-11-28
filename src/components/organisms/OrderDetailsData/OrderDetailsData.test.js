import React from 'react';
import { shallow } from 'enzyme';
import { OrderDetailsData } from './OrderDetailsData';
import { Loading } from 'natura-ui';

const setup = propOverrides => {
  const props = Object.assign(
    {
      intl: {
        formatCurrency: value => `formatedCurrency ${value}`,
        formatDate: value => `formatedDate ${value}`,
        formatNumber: value => `formatedNumber ${value}`,
        formatTime: value => `formatedTime ${value}`,
      },
      data: {
        order: {
          codigoPedido: 378325469,
          ciclo: '14/2017',
          dataPedido: '2017-10-06T18:40:55.000Z',
          status: 'CONCLUÍDO E APROVADO',
          quantidadeItens: 1,
          pontos: 68,
          meioCaptacao: 'WEB',
          envioBoleto: 'Impresso e Enviado com o Pedido',
          valor: 390.0799865722656,
          vlTaxaReal: 11.702399597167968,
          valorParcela: 200.89,
          qtdParcelas: 2,
          vlAPagarSomaTaxa: 401.78238616943355,
          formasPagamento: [
            {
              descricaoCan: '21/42 DIAS',
              descricaoWeb: '21/42 DIAS',
              valorAcumulado: 401.78238616943355,
              __typename: 'PaymentMethod',
            },
            {
              descricaoCan: '21/42 DIAS',
              descricaoWeb: '21/42 DIAS',
              valorAcumulado: 401.78238616943355,
              __typename: 'PaymentMethod',
            },
          ],
          numeroNotaFiscal: null,
          dataEmissaoNotaFiscal: null,
          modeloComercial: 'Consultora',
          entrega: {
            dtPrevisaoEntrega: '2017-10-11T03:00:00.000Z',
            dtNovaPrevisaoEntrega: null,
            dtPrevisaoEntregaProrrogada: null,
            dtRealEntrega: '2017-10-11T03:00:00.000Z',
            dtPrimeiraTentativaEntrega: null,
            dtSegundaTentativaEntrega: null,
            enderecoEntrega: {
              bairro: 'XANGRI LA',
              tipoLogradouro: 'R',
              nomeLogradouro: 'ACUCENA',
              numero: '0',
              complemento: 'B',
              cep: '32187090',
              cidade: 'CONTAGEM',
              estado: 'MG',
              __typename: 'DeliveryAddress',
            },
            __typename: 'Delivery',
          },
          ocorrencias: [
            {
              ocorrencia: 'INFORMATIVA',
              motivo: 'Saiu para Entrega',
              solucao: 'Saiu para Entrega',
              data: '2015-05-08T10:44:00.000Z',
              id: 87,
              __typename: 'Event',
            },
            {
              ocorrencia: 'ENTREGA',
              motivo:
                '1a. Tentativa de Entrega Sem Sucesso. Motivo: Ausência no Ato da Entrega - Aguarde Nova Tentativa.',
              solucao:
                '1a. Tentativa de Entrega Sem Sucesso - Ausência no Ato da Entrega - Aguarde Nova Tentativa.',
              data: '2015-05-07T16:39:00.000Z',
              id: 66,
              __typename: 'Event',
            },
            {
              ocorrencia: 'INFORMATIVA',
              motivo: 'Chegada Filial Destino',
              solucao: 'Chegada Filial Destino',
              data: '2015-05-07T05:40:00.000Z',
              id: 49,
              __typename: 'Event',
            },
            {
              ocorrencia: 'INFORMATIVA',
              motivo: 'Coletado pela Transportadora',
              solucao: 'Coletado pela Transportadora',
              data: '2015-05-06T18:46:00.000Z',
              id: 88,
              __typename: 'Event',
            },
          ],
          itemEnviadoCaixa: [
            {
              codigoProduto: 29415,
              quantidadePontosUnitario: 8,
              quantidadePontosTotal: 8,
              produto: {
                descricao: 'POLPA HIDRAT CORPO ANDIROBA EKOS        ',
                __typename: 'Product',
              },
              quantidadeItem: 1,
              valorTotal: 33.529998779296875,
              __typename: 'OrderItem',
            },
            {
              codigoProduto: 38889,
              quantidadePontosUnitario: 2,
              quantidadePontosTotal: 2,
              produto: {
                descricao: 'SOU SAB BARRA CREMOSIDADE 5X90G         ',
                __typename: 'Product',
              },
              quantidadeItem: 1,
              valorTotal: 8.399999618530273,
              __typename: 'OrderItem',
            },
          ],
          __typename: 'Order',
        },
      },
    },
    propOverrides,
  );

  const result = shallow(<OrderDetailsData {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderDetailsData', () => {
  it('renders order details', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders loading screen', () => {
    // given
    const props = {
      data: {
        loading: true,
      },
    };

    // when
    const { result } = setup(props);

    // then
    expect(result.find(Loading)).toHaveLength(1);
  });
});
