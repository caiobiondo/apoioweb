import gql from 'graphql-tag';

export const TrainingCourseUpdateMutation = gql`
  mutation UpdateCourse(
    $sellerId: Int!
    $courseId: Int!
    $input: UpdateCourseInput!
    $ciclo: Int!
    $roleId: Int
    $grupo: Int!
    $gerenciaDeVendas: Int!
    $regiao: Int!
    $setor: Int!
    $gerenciaMercado: Int!
    $papelDaConsultora: Int!
    $canal: Int!
    $appVersion: String!
    $origem: String!
  ) {
    updateCourse(
      sellerId: $sellerId
      courseId: $courseId
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
      appVersion: $appVersion
      origem: $origem
    ) {
      status
      message
    }
  }
`;
