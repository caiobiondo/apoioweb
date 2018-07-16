import gql from 'graphql-tag';
import { APP_VERSION, Origem } from '../../../../../../../config';

export const CourseViewHtml5Query = gql`
  query CourseViewHtml5Query(
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
    $appVersion: String!
    $origem: String!
  ) {
    courseHtml5(
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
      appVersion: $appVersion
      origem: $origem
    ) {
      id
      accessToken
      categoryTitle
      clientIdentifier
      clientSecrets
      courseContent {
        video
        html5
        web
        html5Embed
      }
      dateUpload
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

export const CourseViewHtml5QueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        courseId: props.courseId,
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
        appVersion: APP_VERSION,
        origem: Origem,
      },
      fetchPolicy: 'cache-and-network',
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      course: data.courseHtml5,
      refetch: data.refetch,
    };
  },
};
