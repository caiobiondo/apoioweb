import withAuthentication from './withAuthentication';
import withUserData from './withUserData';
import withAcl from './withAcl';
import withErrorHandler from './withErrorHandler';
import withLoadable from './withLoadable';
import withRecommendationCourses from './withRecommendationCourses';

/* eslint-disable prettier/prettier */

export default (Component, resource) => {
  return withAuthentication(
    withUserData(
      withAcl(withRecommendationCourses(withErrorHandler(withLoadable(Component))), resource),
    ),
  );
};
