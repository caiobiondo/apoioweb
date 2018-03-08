import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const TrainingCategoriesDetailsQuery = gql`
  query TrainingCategoriesDetails($sellerId: Int!, $categoryId: Int!, $offset: Int!, $limit: Int!) {
    trainingCoursesByCategory(
      sellerId: $sellerId
      categoryId: $categoryId
      offset: $offset
      limit: $limit
    ) {
      hasNextPage
      items {
        id
        title
        thumbnail
        dateUpload
        durationInSeconds
        type
        views
        stoppedAt
        status
        isfavorite
      }
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

  const previousResultIds = previousResult.trainingCoursesByCategory.items.map(item => item.id);
  const fetchMoreResultsToAdd = fetchMoreResult.trainingCoursesByCategory.items.filter(
    item => previousResultIds.indexOf(item.id) < 0,
  );

  return Object.assign({}, previousResult, {
    trainingCoursesByCategory: {
      __typename: previousResult.trainingCoursesByCategory.__typename,
      hasNextPage: fetchMoreResult.trainingCoursesByCategory.hasNextPage,
      items: [...previousResult.trainingCoursesByCategory.items, ...fetchMoreResultsToAdd],
    },
  });
};

export const TrainingCategoriesDetailsOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        categoryId: props.categoryId,
        limit: ITEMS_PER_PAGE,
        offset: 0,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    };
  },
  props({ data }) {
    const { refetch, loading, trainingCategory } = data;
    const trainingCourses = data.trainingCoursesByCategory && data.trainingCoursesByCategory.items;
    const hasNextPage =
      (data.trainingCoursesByCategory && data.trainingCoursesByCategory.hasNextPage) || false;

    return {
      data,
      refetch: refetch,
      loading: loading,
      trainingCourses,
      trainingCategory,
      hasNextPage,
      fetchMore() {
        if (data.loading) {
          return;
        }

        const offset = trainingCourses ? trainingCourses.length : 0;
        const variables = { offset };

        return data.fetchMore({
          variables,
          updateQuery,
        });
      },
    };
  },
};
