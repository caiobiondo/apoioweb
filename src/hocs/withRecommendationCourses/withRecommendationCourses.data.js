import gql from 'graphql-tag';
import { Origem } from 'config';

const ITEMS_PER_PAGE = 20;

export const HasRecommendationQuery = gql`
  query HasRecommendationCoursesQuery(
    $sellerId: Int!
    $offset: Int!
    $limit: Int!
    $status: String
    $favorite: Boolean
    $filter: String
    $ciclo: Int
    $setor: Int
    $gerenciaMercado: Int
    $grupo: Int
    $papelDaConsultora: Int
    $canal: Int
    $gerenciaDeVendas: Int
    $regiao: Int
    $origem: String!
    $recommended: Boolean
  ) {
    courses(
      sellerId: $sellerId
      offset: $offset
      limit: $limit
      status: $status
      favorite: $favorite
      filter: $filter
      ciclo: $ciclo
      setor: $setor
      gerenciaMercado: $gerenciaMercado
      grupo: $grupo
      papelDaConsultora: $papelDaConsultora
      canal: $canal
      gerenciaDeVendas: $gerenciaDeVendas
      regiao: $regiao
      origem: $origem
      recommended: $recommended
    ) {
      hasNextPage
      items {
        id
      }
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return Object.assign({}, previousResult, {
    recommended: {
      __typename: previousResult.courses.__typename,
      hasNextPage: fetchMoreResult.courses.hasNextPage,
      items: [...previousResult.courses.items, ...fetchMoreResult.courses.items],
    },
  });
};

export const HasRecommendationQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        limit: ITEMS_PER_PAGE,
        offset: 0,
        status: props.status,
        favorite: props.favorite,
        recommended: true,
        filter: props.courseFilter,
        ciclo:
          props.user.estrutura.ciclo &&
          props.user.estrutura.ciclo[0] &&
          props.user.estrutura.ciclo[0].numero,
        setor: props.user.estrutura.codigoTipo > 3 ? props.user.estrutura.setor.codigo : 0,
        gerenciaMercado: props.user.estrutura.gerenciaMercado.codigo,
        grupo: props.user.estrutura.codigoTipo > 4 ? props.user.estrutura.codigo : 0,
        papelDaConsultora: props.user.cdPapelAtivo,
        canal: props.user.cdCanalCaptacao,
        gerenciaDeVendas:
          props.user.estrutura.codigoTipo > 2 ? props.user.estrutura.gerenciaVenda.codigo : 0,
        regiao:
          props.user.estrutura.codigoTipo > 1 ? props.user.estrutura.regiaoEstrategica.codigo : 0,
        origem: Origem,
      },
      fetchPolicy: 'cache-first',
    };
  },
  props({ data }) {
    const { refetch, loading } = data;
    const recommended = data.courses && data.courses.items;
    const hasNextPage = (data.courses && data.courses.hasNextPage) || false;

    return {
      data,
      refetch,
      loading,
      recommended,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = recommended ? recommended.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
