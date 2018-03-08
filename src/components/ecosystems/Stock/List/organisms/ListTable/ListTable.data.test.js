import { StockProductsQuery, StockProductsQueryOptions, updateQuery } from './ListTable.data';

describe('StockProductsQuery', () => {
  it('should be the correct query', () => {
    expect(StockProductsQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { productSearch: null };

    const options = StockProductsQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        filter: null,
        limit: 10,
        offset: 0,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should be the correct query props', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: false,
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

  it('should not call fetchMore when the data is still loading', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: true,
        stockProducts: [],
        fetchMore: fetchMore,
      },
    };

    const props = StockProductsQueryOptions.props(data);
    props.fetchMore();

    expect(fetchMore).not.toBeCalled();
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        stockProducts: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result on items array', () => {
      const previousResult = {
        stockProducts: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };
      const stockProducts = {
        items: [{ id: 3 }, { id: 4 }],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { stockProducts } });

      expect(result.stockProducts.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    });

    it('should return the updated value of hasNextPage', () => {
      const previousResult = {
        stockProducts: {
          items: [],
          hasNextPage: true,
        },
      };
      const stockProducts = {
        items: [],
        hasNextPage: false,
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { stockProducts } });

      expect(result.stockProducts.hasNextPage).toBeFalsy();
    });
  });
});
