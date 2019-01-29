import gql from 'graphql-tag';
import { Origem } from '../../../../../../../config';

export const certificateSendEmail = gql`
  mutation certificateSendEmail(
    $categoryId: Int!
    $sellerId: Int!
    $emails: String!
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
    certificateSendEmail(
      categoryId: $categoryId
      sellerId: $sellerId
      emails: $emails
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
      totalOfElement
    }
  }
`;

export const CertificateSendEmailOptions = {
  options(props, emails) {
    return {
      variables: {
        categoryId: props.certificate.id,
        sellerId: props.user.codigo,
        emails: emails,
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
      loading: data.loading,
      certificateDownloadUrl: data.certificateSendEmail,
    };
  },
};
