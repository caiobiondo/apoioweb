import gql from 'graphql-tag';

export const UserDataQuery = gql`
  query UserDataQuery {
    user {
      codigo
      cdCanalCaptacao
      codigoCentro
    }
  }
`;
