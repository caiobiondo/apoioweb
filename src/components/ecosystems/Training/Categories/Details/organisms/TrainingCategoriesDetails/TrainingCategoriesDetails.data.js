import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 20;

export const TrainingCategoriesDetailsQuery = gql`
  query TrainingCategoriesDetails(
    $sellerId: Int!
    $categoryId: Int!
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
  ) {
    trainingCoursesByCategory(
      sellerId: $sellerId
      categoryId: $categoryId
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
    ) {
      hasNextPage
      items {
        id
        title
        thumbnail
        dateUpload
        durationInSeconds
        type
        views
        stoppedAt
        status
        isfavorite
      }
    }
    trainingCategory(sellerId: $sellerId, categoryId: $categoryId) {
      id
      name
      thumbnail
      banners {
        id
        thumbnail
        categoryId
      }
      totalOfCourses
      totalOfCoursesCompleted
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  const previousResultIds = previousResult.trainingCoursesByCategory.items.map(item => item.id);
  const fetchMoreResultsToAdd = fetchMoreResult.trainingCoursesByCategory.items.filter(
    item => previousResultIds.indexOf(item.id) < 0,
  );

  return Object.assign({}, previousResult, {
    trainingCoursesByCategory: {
      __typename: previousResult.trainingCoursesByCategory.__typename,
      hasNextPage: fetchMoreResult.trainingCoursesByCategory.hasNextPage,
      items: [...previousResult.trainingCoursesByCategory.items, ...fetchMoreResultsToAdd],
    },
  });
};

export const TrainingCategoriesDetailsOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        categoryId: props.categoryId,
        limit: ITEMS_PER_PAGE,
        offset: 0,
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
      fetchPolicy: 'cache-first',
    };
  },
  props({ data }) {
    const { refetch, loading, trainingCategory } = data;
    const trainingCourses = data.trainingCoursesByCategory && data.trainingCoursesByCategory.items;
    const hasNextPage =
      (data.trainingCoursesByCategory && data.trainingCoursesByCategory.hasNextPage) || false;

    return {
      data,
      refetch: refetch,
      loading: loading,
      trainingCourses,
      trainingCategory,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = trainingCourses ? trainingCourses.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
