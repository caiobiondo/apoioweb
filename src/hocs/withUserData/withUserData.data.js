import gql from 'graphql-tag';

export const UserDataQuery = gql`
  query UserDataQuery {
    user {
      codigo
      cdCanalCaptacao
      codigoCentro
      acl {
        stock
        customers
        orders
        myScore
        training
        magazine
        cnd
      }
      estrutura {
        ciclo {
          numero
        }
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
