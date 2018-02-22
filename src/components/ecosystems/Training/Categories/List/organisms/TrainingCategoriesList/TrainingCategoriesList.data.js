import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

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

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return Object.assign({}, previousResult, {
    trainingCategoriesWithCourses: [
      ...previousResult.trainingCategoriesWithCourses,
      ...fetchMoreResult.trainingCategoriesWithCourses,
    ],
  });
};

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
      hasMultiplePages:
        data.trainingCategoriesWithCourses &&
        data.trainingCategoriesWithCourses.length >= ITEMS_PER_PAGE,
      fetchMore() {
        const offset = data.trainingCategoriesWithCourses
          ? data.trainingCategoriesWithCourses.length
          : 0;
        return data.fetchMore({
          variables: {
            offset,
          },
          updateQuery: updateQuery,
        });
      },
    };
  },
};
