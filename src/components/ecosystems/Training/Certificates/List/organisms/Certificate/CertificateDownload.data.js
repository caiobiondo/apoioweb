import gql from 'graphql-tag';

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
      loading: data.loading,
      certificateDownloadUrl: data.trainingCertificateDownload,
    };
  },
};
