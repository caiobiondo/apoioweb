import gql from 'graphql-tag';

export const OrderDetailsQuery = gql`
  query OrderDetailsQuery($orderId: Int!, $channelId: Int!, $costCenter: Int) {
    order(orderId: $orderId, channelId: $channelId, costCenter: $costCenter) {
      codigoPedido
      ciclo
      dataPedido
      status
      quantidadeItens
      pontos
      meioCaptacao
      envioBoleto
      valor
      vlTaxaReal
      valorParcela
      qtdParcelas
      vlAPagarSomaTaxa
      formasPagamento {
        descricaoCan
        descricaoWeb
        valorAcumulado
      }
      numeroNotaFiscal
      dataEmissaoNotaFiscal
      modeloComercial
      entrega {
        dtPrevisaoEntrega
        dtNovaPrevisaoEntrega
        dtPrevisaoEntregaProrrogada
        dtRealEntrega
        dtPrimeiraTentativaEntrega
        dtSegundaTentativaEntrega
        enderecoEntrega {
          bairro
          tipoLogradouro
          nomeLogradouro
          numero
          complemento
          cep
          cidade
          estado
        }
      }
      ocorrencias {
        ocorrencia
        motivo
        solucao
        data
        id
      }
      itemEnviadoCaixa {
        codigoProduto
        quantidadePontosUnitario
        quantidadePontosTotal
        produto {
          description
        }
        quantidadeItem
        valorTotal
      }
    }
  }
`;

export const OrderDetailsQueryOptions = {
  options(props) {
    return {
      variables: {
        orderId: props.orderId,
        channelId: props.user.cdCanalCaptacao,
        costCenter: props.user.codigoCentro,
      },
    };
  },
};
