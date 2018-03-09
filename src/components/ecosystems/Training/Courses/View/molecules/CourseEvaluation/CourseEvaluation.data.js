import gql from 'graphql-tag';

export const CourseEvaluationQuery = gql`
  query CourseEvaluationtQuery {
    trainingEvaluations {
      id
      description
      order
    }
  }
`;

export const CourseAddEvaluationMutation = gql`
  mutation AddCourseEvaluations(
    $sellerId: Int!
    $courseId: Int!
    $input: AddCourseEvaluationInput!
  ) {
    addCourseEvaluations(sellerId: $sellerId, courseId: $courseId, input: $input) {
      status
      message
    }
  }
`;

export const CourseEvaluationQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      evaluations: data.trainingEvaluations,
    };
  },
};
