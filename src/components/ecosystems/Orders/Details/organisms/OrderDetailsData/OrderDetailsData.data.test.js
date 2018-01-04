import { OrderDetailsQuery, OrderDetailsQueryOptions } from './OrderDetailsData.data';

describe('OrderDetailsQuery', () => {
  it('queries correctly', () => {
    expect(OrderDetailsQuery).toMatchSnapshot();
  });

  it('queries with defined options correctly', () => {
    // given
    const props = {
      orderId: 1,
      user: {
        cdCanalCaptacao: 2,
        codigoCentro: 3,
      },
    };

    // when
    const options = OrderDetailsQueryOptions.options(props);

    // then
    expect(options).toEqual({
      variables: {
        orderId: 1,
        channelId: 2,
        costCenter: 3,
      },
    });
  });
});
