import gql from 'graphql-tag';

export const CertificateListQuery = gql`
  query CertificateListQuery(
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
    trainingCertificates(
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
      id
      name
      thumbnail
      percentageOfCompletedCourse
      isCompleted
      downloadUrl
    }
  }
`;

export const CertificateListQueryOptions = {
  options(props) {
    return {
      variables: {
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
      forceFetch: true,
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
