import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const OrdersListQuery = gql`
  query OrdersListQuery($offset: Int!, $limit: Int!) {
    orders(offset: $offset, limit: $limit) {
      hasNextPage
      items {
        codigoPedido
        dataPedido
        ciclo
        dataPrevisaoEntrega
        valor
        pontos
        valorLucro
        status
        statusTipo
      }
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  const previousResultIds = previousResult.orders.items.map(item => item.id);
  const fetchMoreResultsToAdd = fetchMoreResult.orders.items.filter(
    item => previousResultIds.indexOf(item.id) < 0,
  );

  return Object.assign({}, previousResult, {
    orders: {
      hasNextPage: fetchMoreResult.orders.hasNextPage,
      items: [...previousResult.orders.items, ...fetchMoreResultsToAdd],
    },
  });
};

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
  props({ data }) {
    const { refetch, loading } = data;
    const orders = data.orders && data.orders.items;
    const hasNextPage = (data.orders && data.orders.hasNextPage) || false;

    return {
      data,
      refetch,
      loading,
      orders,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = orders ? orders.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
