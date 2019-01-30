import gql from 'graphql-tag';

export const TrainingActivityUpdateMutation = gql`
  mutation UpdateActivity(
    $sellerId: Int!
    $activityId: Int!
    $input: UpdateActivityInput!
    $ciclo: Int!
    $roleId: Int
    $grupo: Int!
    $gerenciaDeVendas: Int!
    $regiao: Int!
    $setor: Int!
    $gerenciaMercado: Int!
    $papelDaConsultora: Int!
    $canal: Int!
    $origem: String!
  ) {
    updateActivity(
      sellerId: $sellerId
      activityId: $activityId
      input: $input
      ciclo: $ciclo
      roleId: $roleId
      grupo: $grupo
      gerenciaDeVendas: $gerenciaDeVendas
      gerenciaMercado: $gerenciaMercado
      regiao: $regiao
      setor: $setor
      papelDaConsultora: $papelDaConsultora
      canal: $canal
      origem: $origem
    ) {
      status
      message
    }
  }
`;
