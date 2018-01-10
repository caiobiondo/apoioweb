import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Loading } from 'natura-ui';
import { injectIntl } from 'react-intl';

import { OrderDetailsQuery, OrderDetailsQueryOptions } from './OrderDetailsData.data';

import OrderInfo from './molecules/OrderInfo/OrderInfo';
import OrderItems from '../../organisms/OrderItems/OrderItems';

export class OrderDetailsData extends Component {
  render() {
    const { importing, intl, user, data: { order, loading } } = this.props;

    if (loading) {
      return <Loading background="transparent" />;
    }

    return (
      <div>
        <OrderInfo order={order} intl={intl} importing={importing} />
        <OrderItems order={order} intl={intl} importing={importing} user={user} />
      </div>
    );
  }
}

export const OrderDetailsDataWithIntl = injectIntl(OrderDetailsData);

export default graphql(OrderDetailsQuery, OrderDetailsQueryOptions)(OrderDetailsDataWithIntl);
