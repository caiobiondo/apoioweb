import gql from 'graphql-tag';
import { Origem } from '../../../../../../../config';

export const CertificateSendEmail = gql`
  mutation CertificateSendEmail(
    $sellerId: Int!
    $categoryId: Int!
    $ciclo: Int!
    $setor: Int
    $gerenciaMercado: Int
    $grupo: Int
    $papelDaConsultora: Int
    $canal: Int
    $gerenciaDeVendas: Int
    $regiao: Int
    $origem: String!
    $input: CertificateSendEmailInput!
  ) {
    certificateSendEmail(
      sellerId: $sellerId
      categoryId: $categoryId
      ciclo: $ciclo
      input: $input
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
    }
  }
`;

export const CourseEvaluationQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
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
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      certificateDownloadUrl: data.certificateSendEmail,
    };
  },
};
