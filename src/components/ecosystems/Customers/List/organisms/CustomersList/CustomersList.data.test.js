import { CustomersListQuery, CustomersListQueryOptions, updateQuery } from './CustomersList.data';

describe('CustomersListQuery', () => {
  it('should be the correct query', () => {
    expect(CustomersListQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = {};

    const options = CustomersListQueryOptions.options(props);

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
        loading: true,
        orders: [],
        fetchMore: fetchMore,
      },
    };

    const props = CustomersListQueryOptions.props(data);
    const fetchMoreResult = props.fetchMore();

    expect(props).toMatchSnapshot();
    expect(fetchMore).toBeCalledWith({ variables: { offset: 0 }, updateQuery });
    expect(fetchMoreResult).toEqual('application of fetchMore');
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        orders: [1, 2],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result', () => {
      const previousResult = {
        orders: [1, 2],
      };
      const orders = [3, 4];

      const result = updateQuery(previousResult, { fetchMoreResult: { orders } });

      expect(result).toEqual({
        orders: [1, 2, 3, 4],
      });
    });
  });
});
