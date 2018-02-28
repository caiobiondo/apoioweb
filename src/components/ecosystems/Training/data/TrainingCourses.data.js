import gql from 'graphql-tag';

const ITEMS_PER_PAGE = 10;

export const TrainingCoursesQuery = gql`
  query TrainingCoursesQuery(
    $sellerId: Int!
    $offset: Int!
    $limit: Int!
    $status: String
    $favorite: Boolean
  ) {
    courses(
      sellerId: $sellerId
      offset: $offset
      limit: $limit
      status: $status
      favorite: $favorite
    ) {
      id
      accessToken
      categoryTitle
      clientIdentifier
      clientSecrets
      courseContent {
        video
        html5
        web
      }
      dateUpload
      durationInSeconds
      isfavorite
      ratedByYou
      status
      stoppedAt
      thumbnail
      title
      type
      views
    }
  }
`;

export const updateQuery = (previousResult, { fetchMoreResult }) => {
  if (!fetchMoreResult) {
    return previousResult;
  }

  return Object.assign({}, previousResult, {
    courses: [...previousResult.courses, ...fetchMoreResult.courses],
  });
};

export const TrainingCoursesQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        limit: ITEMS_PER_PAGE,
        offset: 0,
        status: props.status,
        favorite: props.favorite,
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
      courses: data.courses,
      hasMultiplePages: data.courses && data.courses.length >= ITEMS_PER_PAGE,
      fetchMore() {
        const offset = data.courses ? data.courses.length : 0;
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
