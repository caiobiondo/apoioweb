import gql from 'graphql-tag';

export const CourseViewQuery = gql`
  query CourseViewQuery(
    $sellerId: Int!
    $courseId: Int!
    $ciclo: Int
    $setor: Int
    $gerenciaMercado: Int
    $grupo: Int
    $papelDaConsultora: Int
    $canal: Int
    $gerenciaDeVendas: Int
    $regiao: Int
  ) {
    course(
      sellerId: $sellerId
      courseId: $courseId
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
      courseContent {
        video
        html5
        web
        videoEmbed
      }
      durationInSeconds
      description
      generalRating
      isfavorite
      myRating
      ratedByYou
      relatedCourses {
        id
        title
        thumbnail
        type
        url
      }
      status
      stoppedAt
      thumbnail
      title
      type
      views
    }
  }
`;

export const CourseViewQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        courseId: props.courseId,
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
      fetchPolicy: 'cache-and-network',
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      course: data.course,
      refetch: data.refetch,
    };
  },
};
