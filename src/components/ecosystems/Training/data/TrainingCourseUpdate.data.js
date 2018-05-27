import gql from 'graphql-tag';

export const TrainingCourseUpdateMutation = gql`
  mutation UpdateCourse(
    $sellerId: Int!
    $courseId: Int!
    $input: UpdateCourseInput!
    $currentCycle: Int
    $roleId: Int
  ) {
    updateCourse(
      sellerId: $sellerId
      courseId: $courseId
      input: $input
      currentCycle: $currentCycle
      roleId: $roleId
    ) {
      status
      message
    }
  }
`;
