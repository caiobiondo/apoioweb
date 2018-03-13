import gql from 'graphql-tag';

export const CourseViewQuery = gql`
  query CourseViewQuery($sellerId: Int!, $courseId: Int!) {
    course(sellerId: $sellerId, courseId: $courseId) {
      id
      courseContent {
        video
        html5
        web
      }
      durationInSeconds
      description
      generalRating
      isfavorite
      myRating
      ratedByYou
      relatedCourses {
        id
        title
        thumbnail
        type
        url
      }
      status
      stoppedAt
      thumbnail
      title
      type
      views
    }
  }
`;

export const CourseViewQueryOptions = {
  options(props) {
    return {
      variables: {
        sellerId: props.user.codigo,
        courseId: props.courseId,
      },
      forceFetch: true,
    };
  },

  props({ data }) {
    return {
      data,
      loading: data.loading,
      course: data.course,
    };
  },
};
