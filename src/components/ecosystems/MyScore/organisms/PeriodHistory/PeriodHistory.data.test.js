import {
  DirectOrdersQuery,
  DirectOrdersQueryOptions,
  EcommerceOrdersQuery,
  EcommerceOrdersQueryOptions,
} from './PeriodHistory.data';

describe('DirectOrdersQuery', () => {
  it('should be the correct query', () => {
    expect(DirectOrdersQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = {
      year: 2017,
      cycleNumber: 5,
    };

    let options = EcommerceOrdersQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        cycleId: '201705',
      },
      forceFetch: true,
    });

    props.cycleNumber = 10;

    options = EcommerceOrdersQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        cycleId: '201710',
      },
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loadingDirectOrders: true,
        directOrders: [],
      },
    };

    const props = DirectOrdersQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});

describe('EcommerceOrdersQuery', () => {
  it('should be the correct query', () => {
    expect(EcommerceOrdersQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = {
      year: 2017,
      cycleNumber: 5,
    };

    let options = EcommerceOrdersQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        cycleId: '201705',
      },
      forceFetch: true,
    });

    props.cycleNumber = 10;

    options = EcommerceOrdersQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        cycleId: '201710',
      },
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loadingEcommerceOrders: true,
        directOrders: [],
      },
    };

    const props = EcommerceOrdersQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});
