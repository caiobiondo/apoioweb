import gql from 'graphql-tag';

export const TrainingCategoriesQuery = gql`
  query TrainingCategoriesQuery($sellerId: Int!, $limit: Int!) {
    trainingCategoriesWithCourses(sellerId: $sellerId, limit: $limit) {
      id
      name
      tt
      thumbnail
      categories {
        id
        name
        thumbnail
      }
      courses {
        id
        title
        thumbnail
        durationInSeconds
        type
        stoppedAt
      }
    }
  }
`;

export const TrainingCategoriesQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        limit: 5,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    };
  },
  props({ data }) {
    return {
      data,
      refetch: data.refetch,
      loading: data.loading,
      trainingCategories: data.trainingCategoriesWithCourses,
    };
  },
};
