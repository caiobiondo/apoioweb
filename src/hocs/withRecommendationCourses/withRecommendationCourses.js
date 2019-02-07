import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import {
  HasRecommendationQuery,
  HasRecommendationQueryOptions,
} from './withRecommendationCourses.data';
import { Loading } from 'natura-ui';

const WithRecommendationCourses = Component => {
  return class WithRecommendationCourses extends PureComponent {
    render() {
      const { data, recommended } = this.props;
      if (!recommended) {
        return <Loading background="transparent" />;
      }

      const hasRecommended = data.recommended && data.recommended.length > 0;
      return <Component {...this.props} hasRecommended={hasRecommended} />;
    }
  };
};

export default function withRecommendationCourses(Component, graphqlConnect = graphql) {
  const WithRecommendationCoursesComponent = WithRecommendationCourses(Component);

  return graphqlConnect(HasRecommendationQuery, HasRecommendationQueryOptions)(
    WithRecommendationCoursesComponent,
  );
}
