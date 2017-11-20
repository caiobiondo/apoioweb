import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { UserDataQuery } from './withUserData.data';
import { Loading } from 'natura-ui';

export const WithUserData = Component => {
  return class WithUserDataComponent extends PureComponent {
    render() {
      const { data } = this.props;
      if (!data || !data.user) {
        return <Loading background="transparent" />;
      }
      return <Component {...this.props} user={data.user} />;
    }
  };
};

export default function withUserData(Component, graphqlConnect = graphql) {
  const WithUserDataComponent = WithUserData(Component);

  return graphqlConnect(UserDataQuery)(WithUserDataComponent);
}
