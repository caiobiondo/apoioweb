import gql from 'graphql-tag';
import { Origem } from '../../../../../../../config';

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
    $origem: String!
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
      origem: $origem
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
    return {
      data,
      refetch: data.refetch,
      loading: data.loading,
      trainingCategories: data.trainingCategoriesWithCourses,
    };
  },
};
