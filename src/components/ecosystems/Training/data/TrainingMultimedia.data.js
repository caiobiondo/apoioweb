import gql from 'graphql-tag';
import { Origem } from 'config';

const ITEMS_PER_PAGE = 20;

export const TrainingMultimediaQuery = gql`
  query TrainingMultimediaQuery(
    $sellerId: Int!
    $offset: Int!
    $limit: Int!
    $ciclo: Int
    $setor: Int
    $gerenciaMercado: Int
    $grupo: Int
    $papelDaConsultora: Int
    $canal: Int
    $gerenciaDeVendas: Int
    $regiao: Int
    $origem: String!
  ) {
    multimedias(
      sellerId: $sellerId
      offset: $offset
      limit: $limit
      ciclo: $ciclo
      setor: $setor
      gerenciaMercado: $gerenciaMercado
      grupo: $grupo
      papelDaConsultora: $papelDaConsultora
      canal: $canal
      gerenciaDeVendas: $gerenciaDeVendas
      regiao: $regiao
      origem: $origem
    ) {
      hasNextPage
      items {
        id
        title
        date_upload
        thumbnail
        type
        duration_in_seconds
        content {
          title
          download_url
          bearer_token
        }
        categories {
          id
          name
        }
      }
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return Object.assign({}, previousResult, {
    multimedias: {
      __typename: previousResult.multimedias.__typename,
      hasNextPage: fetchMoreResult.multimedias.hasNextPage,
      items: [...previousResult.multimedias.items, ...fetchMoreResult.multimedias.items],
    },
  });
};

export const TrainingMultimediaQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        offset: 0,
        limit: ITEMS_PER_PAGE,
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
      //fetchPolicy: 'cache-first',
      fetchPolicy: 'network',
    };
  },
  props({ data }) {
    const { refetch, loading } = data;
    const multimedias = data.multimedias && data.multimedias.items;
    const hasNextPage = (data.multimedias && data.multimedias.hasNextPage) || false;

    return {
      data,
      refetch,
      loading,
      multimedias,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = multimedias ? multimedias.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
