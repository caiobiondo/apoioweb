import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { UserDataQuery } from './withUserData.data';
import { Loading } from 'natura-ui';
import LocalStorageData from 'infra/LocalStorageData';
import { get } from 'lodash';

export const WithUserData = Component => {
  return class WithUserDataComponent extends PureComponent {
    render() {
      const { data } = this.props;
      if (!data || !data.user) {
        return <Loading background="transparent" />;
      }

      // workaround: sellers api does not return user's current cycle
      // this workaround uses localStorage's defined by webfv
      const { cycle } = new LocalStorageData();
      const user = {
        ...data.user,
        estrutura: {
          ...data.user.estrutura,
          ciclo: [
            {
              numero: get(data.user, 'estrutura.ciclo[0].numero', null) || cycle,
            },
          ],
        },
      };

      return <Component {...this.props} user={user} />;
    }
  };
};

export default function withUserData(Component, graphqlConnect = graphql) {
  const WithUserDataComponent = WithUserData(Component);

  return graphqlConnect(UserDataQuery)(WithUserDataComponent);
}
