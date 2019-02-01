import React, { PureComponent } from 'react';
import { graphql } from 'react-apollo';
import { UserDataQuery } from './withUserData.data';
import { Loading } from 'natura-ui';
import LocalStorageData from 'infra/LocalStorageData';
import { get } from 'lodash';

export const WithUserData = Component => {
  return class WithUserDataComponent extends PureComponent {
    render() {
      const { data } = this.props; //const data = userMock;
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
// prettier-ignore
const userMock = {  
  "variables":{  },
  "loading":false,
  "networkStatus":7,
  "user":{  
     "codigo":16578,
     "cdCanalCaptacao":8,
     "codigoCentro":5800,
     "nomeCompleto":"NADIRCE IZIDIO DE OLIVEIRA",
     "cdPapelAtivo":2,
     "acl":{  
        "stock":true,
        "customers":true,
        "orders":true,
        "myScore":true,
        "training":true,
        "magazine":true,
        "cnd":true,
        "careerPlan":null,
        "__typename":"AclStructure"
     },
     "estrutura":{  
        "codigo":10497,
        "codigoTipo":5,
        "ciclo":[  
           {  
              "numero":201902,
              "__typename":"UserCycle"
           }
        ],
        "gerenciaMercado":{  
           "codigo":2,
           "__typename":"MarketManagement"
        },
        "regiaoEstrategica":{  
           "codigo":2,
           "__typename":"StrategicRegion"
        },
        "gerenciaVenda":{  
           "codigo":145,
           "__typename":"SalesManagement"
        },
        "setor":{  
           "codigo":176,
           "__typename":"Sector"
        },
        "__typename":"UserStructure"
     },
     "__typename":"User"
  }
};
