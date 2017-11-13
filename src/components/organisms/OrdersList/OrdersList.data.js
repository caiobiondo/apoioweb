import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const OrdersListQuery = gql`
  query OrdersListQuery($offset: Int!, $limit: Int!) {
    orders(offset: $offset, limit: $limit) {
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

export const OrdersListQueryOptions = {
  options(props) {
    return {
      variables: {
        limit: ITEMS_PER_PAGE,
        offset: 0,
      },
      forceFetch: true,
    };
  },
  props({ data: { loading, orders, fetchMore } }) {
    return {
      loading,
      orders,
      fetchMore() {
        return fetchMore({
          variables: {
            offset: orders.length,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return previousResult;
            }
            return Object.assign({}, previousResult, {
              orders: [...previousResult.orders, ...fetchMoreResult.orders],
            });
          },
        });
      },
    };
  },
};
