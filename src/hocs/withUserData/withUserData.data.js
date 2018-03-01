import gql from 'graphql-tag';

export const UserDataQuery = gql`
  query UserDataQuery {
    user {
      codigo
      cdCanalCaptacao
      codigoCentro
      nomeCompleto
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
        codigo
        codigoTipo
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
