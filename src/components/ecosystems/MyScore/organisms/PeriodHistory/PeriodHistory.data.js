import gql from 'graphql-tag';

const buildCycleId = props => {
  let cycleNumber = props.cycleNumber.toString();
  cycleNumber = new Array(2 - cycleNumber.length + 1).join('0') + cycleNumber;
  return props.year + cycleNumber;
};

export const DirectOrdersQuery = gql`
  query DirectOrdersQuery($cycleId: String!) {
    cycleDirectOrders(cycleId: $cycleId) {
      type
      orderNumber
      entryOrderDate
      totalOrderValue
      totalOrderPoints
    }
  }
`;

export const DirectOrdersQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        cycleId: buildCycleId(props),
      },
    };
  },
  props({ data: { loading, cycleDirectOrders } }) {
    return {
      loadingDirectOrders: loading,
      directOrders: cycleDirectOrders,
    };
  },
};

export const EcommerceOrdersQuery = gql`
  query EcommerceOrdersQuery($cycleId: String!) {
    cycleEcommerceOrders(cycleId: $cycleId) {
      type
      orderNumber
      entryOrderDate
      totalOrderValue
      totalOrderPoints
    }
  }
`;

export const EcommerceOrdersQueryOptions = {
  options(props) {
    return {
      forceFetch: true,
      variables: {
        cycleId: buildCycleId(props),
      },
    };
  },
  props({ data: { loading, cycleEcommerceOrders } }) {
    return {
      loadingEcommerceOrders: loading,
      ecommerceOrders: cycleEcommerceOrders,
    };
  },
};
