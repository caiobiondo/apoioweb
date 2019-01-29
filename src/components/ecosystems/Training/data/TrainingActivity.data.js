import gql from 'graphql-tag';
import { Origem } from 'config';

export const ActivityViewQuery = gql`
  query ActivityViewQuery(
    $sellerId: Int!
    $activityId: Int!
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
    activity(
      sellerId: $sellerId
      activityId: $activityId
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
      status
      message
      totalOfElement
      finished
      courseContent {
        video
        html5
        web
        scorm
      }
      accessToken
      results {
        id
        title
        order
        status
        questions {
          id
          description
          type
          alternatives {
            id
            description
            selected
          }
        }
      }
    }
  }
`;

export const ActivityViewQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        activityId: props.courseId,
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
      fetchPolicy: 'cache-and-network',
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      activity: data.activity,
      refetch: data.refetch,
    };
  },
};
