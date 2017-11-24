import gql from 'graphql-tag';

export const UserDataQuery = gql`
  query UserDataQuery {
    user {
      codigo
      cdCanalCaptacao
      codigoCentro
      estrutura {
        gerenciaMercado {
          codigo
        }
        regiaoEstrategica {
          codigo
        }
        gerenciaVenda {
          codigo
        }
        setor {
          codigo
        }
      }
    }
  }
`;
