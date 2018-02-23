import gql from 'graphql-tag';

export const CertificateListQuery = gql`
  query CertificateListQuery($sellerId: Int!) {
    trainingCertificates(sellerId: $sellerId) {
      id
      name
      thumbnail
      percentageOfCompletedCourse
    }
  }
`;

export const CertificateListQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
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
