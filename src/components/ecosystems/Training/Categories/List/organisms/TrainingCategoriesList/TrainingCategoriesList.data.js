import gql from 'graphql-tag';

export const TrainingCategoriesQuery = gql`
  query TrainingCategoriesQuery(
    $sellerId: Int!
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
    trainingCategoriesWithCourses(
      sellerId: $sellerId
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
      id
      name
      tt
      thumbnail
      categories {
        id
        name
        thumbnail
      }
      courses {
        id
        title
        thumbnail
        durationInSeconds
        type
        stoppedAt
      }
    }
  }
`;

export const TrainingCategoriesQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        limit: 5,
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
    return {
      data,
      refetch: data.refetch,
      loading: data.loading,
      trainingCategories: data.trainingCategoriesWithCourses,
    };
  },
};
