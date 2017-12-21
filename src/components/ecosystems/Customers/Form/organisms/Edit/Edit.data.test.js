import { UpdateCustomerMutation, FindCustomerQuery, FindCustomerQueryOptions } from './Edit.data';

describe('UpdateCustomerMutation', () => {
  it('should be the correct mutation', () => {
    expect(UpdateCustomerMutation).toMatchSnapshot();
  });
});

describe('FindCustomerQuery', () => {
  it('should be the correct query', () => {
    expect(FindCustomerQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = {
      match: {
        params: {
          id: 'id',
        },
      },
    };

    const options = FindCustomerQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        customerId: 'id',
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        customer: {
          id: 'id',
          prop: 'value',
        },
      },
    };

    const props = FindCustomerQueryOptions.props(data);

    expect(props).toEqual({
      loading: true,
      customer: {
        id: 'id',
        prop: 'value',
      },
    });
  });
});
