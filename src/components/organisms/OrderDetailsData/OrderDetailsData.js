import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Loading } from 'natura-ui';
import { injectIntl } from 'react-intl';
import withAuthErrorHandler from 'hocs/withAuthErrorHandler/withAuthErrorHandler';
import withUserData from 'hocs/withUserData/withUserData';

import { OrderDetailsQuery, OrderDetailsQueryOptions } from './OrderDetailsData.data';

import OrderInfo from './molecules/OrderInfo/OrderInfo';
import OrderItems from '../../organisms/OrderItems/OrderItems';

export class OrderDetailsData extends Component {
  render() {
    const { importing, intl, data: { order, loading } } = this.props;

    if (loading) {
      return <Loading background="transparent" />;
    }

    return (
      <div>
        <OrderInfo order={order} intl={intl} importing={importing} />
        <OrderItems order={order} intl={intl} importing={importing} />
      </div>
    );
  }
}

export const OrderDetailsDataWithAuthErrorHandler = withAuthErrorHandler(OrderDetailsData);

export const OrderDetailsDataWithIntl = injectIntl(OrderDetailsData);

export const OrderDetailsDataWithData = graphql(OrderDetailsQuery, OrderDetailsQueryOptions)(
  OrderDetailsDataWithIntl,
);

export default withUserData(OrderDetailsDataWithData);
