import { StockProductsQuery, StockProductsQueryOptions, updateQuery } from './ListTable.data';

describe('MyStockProductsQuery', () => {
  it('should be the correct query', () => {
    expect(StockProductsQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { productSearch: 'search' };

    const options = StockProductsQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        limit: 10,
        offset: 0,
        productName: 'search',
      },
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: true,
        stockProducts: [],
        fetchMore: fetchMore,
      },
    };

    const props = StockProductsQueryOptions.props(data);
    const fetchMoreResult = props.fetchMore();

    expect(props).toMatchSnapshot();
    expect(fetchMore).toBeCalledWith({ variables: { offset: 0 }, updateQuery });
    expect(fetchMoreResult).toEqual('application of fetchMore');
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        stockProducts: [1, 2],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result', () => {
      const previousResult = {
        stockProducts: [1, 2],
      };
      const stockProducts = [3, 4];

      const result = updateQuery(previousResult, { fetchMoreResult: { stockProducts } });

      expect(result).toEqual({
        stockProducts: [1, 2, 3, 4],
      });
    });
  });
});
