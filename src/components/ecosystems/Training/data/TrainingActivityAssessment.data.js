import gql from 'graphql-tag';
export const TrainingActivityUpdateMutation = gql`
  mutation AddActivityAnswers(
    $sellerId: Int!
    $activityId: Int!
    $input: AddActivityAnswersInput!
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
    addActivityAnswers(
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
      action
      stoppedAt
    }
  }
`;
