import gql from 'graphql-tag';
import { Origem } from '../../../../../../../config';

export const CertificateListQuery = gql`
  query CertificateListQuery(
    $sellerId: Int!
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
    trainingCertificates(
      sellerId: $sellerId
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
      thumbnail
      percentageOfCompletedCourse
      isCompleted
    }
  }
`;

export const CertificateListQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
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
      certificates: data.trainingCertificates,
    };
  },
};
