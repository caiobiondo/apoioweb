import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const TrainingCategoriesDetailsQuery = gql`
  query TrainingCategoriesDetails($sellerId: Int!, $categoryId: Int!) {
    trainingCoursesByCategory(sellerId: $sellerId, categoryId: $categoryId) {
      id
      title
      thumbnail
      durationInSeconds
      type
      stoppedAt
    }
    trainingCategory(sellerId: $sellerId, categoryId: $categoryId) {
      id
      name
      thumbnail
      banners {
        id
        thumbnail
        categoryId
      }
      totalOfCourses
      totalOfCoursesCompleted
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return Object.assign({}, previousResult, {
    trainingCoursesByCategory: [
      ...previousResult.trainingCoursesByCategory,
      ...fetchMoreResult.trainingCoursesByCategory,
    ],
  });
};

export const TrainingCategoriesDetailsOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        categoryId: props.categoryId,
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
      trainingCourses: data.trainingCoursesByCategory,
      trainingCategory: data.trainingCategory,
      hasMultiplePages:
        data.trainingCoursesByCategory && data.trainingCoursesByCategory.length >= ITEMS_PER_PAGE,
      fetchMore() {
        const offset = data.trainingCoursesByCategory ? data.trainingCoursesByCategory.length : 0;
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
