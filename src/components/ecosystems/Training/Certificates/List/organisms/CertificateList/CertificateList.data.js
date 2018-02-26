import gql from 'graphql-tag';

export const CertificateListQuery = gql`
  query CertificateListQuery($sellerId: Int!, $userName: String!) {
    trainingCertificates(sellerId: $sellerId, userName: $userName) {
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
        offset: 0,
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
