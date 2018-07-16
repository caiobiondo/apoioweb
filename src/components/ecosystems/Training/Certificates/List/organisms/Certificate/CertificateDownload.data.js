import gql from 'graphql-tag';
import { APP_VERSION, Origem } from '../../../../../../../config';

export const CertificateDownloadQuery = gql`
  query CertificateDownloadQuery(
    $categoryId: Int!
    $sellerId: Int!
    $userName: String!
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
    trainingCertificateDownload(
      categoryId: $categoryId
      sellerId: $sellerId
      userName: $userName
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
      categoryId
      downloadUrl
    }
  }
`;

export const CertificateDownloadQueryOptions = {
  options(props) {
    return {
      variables: {
        categoryId: props.certificate.id,
        sellerId: props.user.codigo,
        userName: props.user.nomeCompleto,
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
      fetchPolicy: 'cache-first',
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      certificateDownloadUrl: data.trainingCertificateDownload,
    };
  },
};
