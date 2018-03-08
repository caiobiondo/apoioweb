import gql from 'graphql-tag';

export const CourseEvaluationtQuery = gql`
  query CourseEvaluationtQuery {
    trainingEvaluations {
      id
      description
      order
    }
  }
`;

export const CourseEvaluationtQueryOptions = {
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
