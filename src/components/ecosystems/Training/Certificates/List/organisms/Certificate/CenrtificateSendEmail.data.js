import gql from 'graphql-tag';
import { Origem } from '../../../../../../../config';

export const CertificateSendEmailQuery = gql`
  query CertificateSendEmailQuery($categoryId: Int!, $sellerId: Int!, $emails: String) {
    trainingCertificateSendEmail(categoryId: $categoryId, sellerId: $sellerId, emails: $emails) {
      status
      totalOfElement
    }
  }
`;

export const CertificateSendEmailQueryOptions = {
  options(props) {
    return {
      variables: {
        categoryId: props.certificate.id,
        sellerId: props.user.codigo,
        origem: Origem,
      },
      fetchPolicy: 'cache-first',
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      certificateDownloadUrl: data.trainingCertificateSendEmail,
    };
  },
};
