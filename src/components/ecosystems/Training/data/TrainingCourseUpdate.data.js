import gql from 'graphql-tag';

export const TrainingCourseUpdateMutation = gql`
  mutation UpdateCourse($sellerId: Int!, $courseId: Int!, $input: UpdateCourseInput!) {
    updateCourse(sellerId: $sellerId, courseId: $courseId, input: $input) {
      status
      message
    }
  }
`;
