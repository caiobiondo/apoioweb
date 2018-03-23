import { OrdersListQuery, OrdersListQueryOptions, updateQuery } from './OrdersList.data';

describe('OrdersListQuery', () => {
  it('should be the correct query', () => {
    expect(OrdersListQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = {};

    const options = OrdersListQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        limit: 10,
        offset: 0,
      },
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: false,
        orders: [],
        fetchMore: fetchMore,
      },
    };

    const props = OrdersListQueryOptions.props(data);
    const fetchMoreResult = props.fetchMore();

    expect(props).toMatchSnapshot();
    expect(fetchMore).toBeCalledWith({ variables: { offset: 0 }, updateQuery });
    expect(fetchMoreResult).toEqual('application of fetchMore');
  });

  it('should not call fetchMore when the data is still loading', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: true,
        orders: [],
        fetchMore: fetchMore,
      },
    };

    const props = OrdersListQueryOptions.props(data);
    props.fetchMore();

    expect(fetchMore).not.toBeCalled();
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        orders: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result on items array', () => {
      const previousResult = {
        orders: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };
      const orders = {
        items: [{ id: 3 }, { id: 4 }],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { orders } });

      expect(result.orders.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    });

    it('should return the updated value of hasNextPage', () => {
      const previousResult = {
        orders: {
          items: [],
          hasNextPage: true,
        },
      };
      const orders = {
        items: [],
        hasNextPage: false,
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { orders } });

      expect(result.orders.hasNextPage).toBeFalsy();
    });
  });
});
