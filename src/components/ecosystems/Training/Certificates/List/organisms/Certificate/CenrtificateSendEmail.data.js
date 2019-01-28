import gql from 'graphql-tag';

export const certificateSendEmail = gql`
  mutation certificateSendEmail($categoryId: Int!, $sellerId: Int!, $emails: String!) {
    certificateSendEmail(
      input: { category_id: $categoryId, sellerId: $sellerId, emails: $emails }
    ) {
      status
      totalOfElement
    }
  }
`;

export const CertificateSendEmailOptions = {
  options(props) {
    return {
      variables: {
        // eslint-disable-next-line camelcase
        category_id: props.certificate.id,
        sellerId: props.user.codigo,
        emails: props.emails,
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
