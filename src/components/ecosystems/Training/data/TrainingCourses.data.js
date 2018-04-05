import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const TrainingCoursesQuery = gql`
  query TrainingCoursesQuery(
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
    ) {
      hasNextPage
      items {
        id
        accessToken
        categoryTitle
        clientIdentifier
        clientSecrets
        courseContent {
          video
          html5
          web
        }
        dateUpload
        durationInSeconds
        isfavorite
        ratedByYou
        status
        stoppedAt
        thumbnail
        title
        type
        views
      }
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  const previousResultIds = previousResult.courses.items.map(item => item.id);
  const fetchMoreResultsToAdd = fetchMoreResult.courses.items.filter(
    item => previousResultIds.indexOf(item.id) < 0,
  );

  return Object.assign({}, previousResult, {
    courses: {
      __typename: previousResult.courses.__typename,
      hasNextPage: fetchMoreResult.courses.hasNextPage,
      items: [...previousResult.courses.items, ...fetchMoreResultsToAdd],
    },
  });
};

export const TrainingCoursesQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        limit: ITEMS_PER_PAGE,
        offset: 0,
        status: props.status,
        favorite: props.favorite,
        filter: props.courseFilter,
        ciclo:
          props.user.estrutura.ciclo &&
          props.user.estrutura.ciclo[0] &&
          props.user.estrutura.ciclo[0].numero,
        setor: props.user.estrutura.setor.codigo,
        gerenciaMercado: props.user.estrutura.gerenciaMercado.codigo,
        grupo: props.user.estrutura.codigo,
        papelDaConsultora: props.user.cdPapelAtivo,
        canal: props.user.cdCanalCaptacao,
        gerenciaDeVendas: props.user.estrutura.gerenciaVenda.codigo,
        regiao: props.user.estrutura.regiaoEstrategica.codigo,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    };
  },
  props({ data }) {
    const { refetch, loading } = data;
    const courses = data.courses && data.courses.items;
    const hasNextPage = (data.courses && data.courses.hasNextPage) || false;

    return {
      data,
      refetch,
      loading,
      courses,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = courses ? courses.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
