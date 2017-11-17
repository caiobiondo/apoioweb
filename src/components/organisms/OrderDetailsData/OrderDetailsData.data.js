import gql from 'graphql-tag';

const OrderDetailsDataQuery = gql`
  query OrderDetailsDataQuery($orderId: Int!) {
    order(id: $orderId) {
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
          descricao
        }
        quantidadeItem
        valorTotal
      }
    }
  }
`;

export default OrderDetailsDataQuery;
