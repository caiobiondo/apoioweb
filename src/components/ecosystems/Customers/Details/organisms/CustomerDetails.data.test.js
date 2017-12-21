import { CustomerDetailsQuery, CustomerDetailsQueryOptions } from './CustomerDetails.data';

describe('CustomerDetailsQuery', () => {
  it('queries correctly', () => {
    expect(CustomerDetailsQuery).toMatchSnapshot();
  });

  it('queries with defined options correctly', () => {
    // given
    const props = {
      match: {
        params: {
          customerId: 1,
        },
      },
    };

    // when
    const options = CustomerDetailsQueryOptions.options(props);

    // then
    expect(options).toEqual({
      fetchPolicy: 'cache-and-network',
      forceFetch: true,
      variables: {
        customerId: 1,
      },
    });
  });
});
