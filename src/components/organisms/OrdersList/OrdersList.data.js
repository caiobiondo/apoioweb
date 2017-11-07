import gql from 'graphql-tag';

const OrdersListQuery = gql`
  query OrdersListQuery {
    orders(id: 1) {
      codigoPedido
      dataPedido
      ciclo
      dataPrevisaoEntrega
      valor
      pontos
      valorLucro
      status
    }
  }
`;

export default OrdersListQuery;
