import {
  TrainingCategoriesQuery,
  TrainingCategoriesQueryOptions,
  updateQuery,
} from './TrainingCategoriesList.data';

describe('TrainingCategoriesQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCategoriesQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 } };

    const options = TrainingCategoriesQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: 1,
        limit: 5,
      },
      forceFetch: true,
      fetchPolicy: 'cache-and-network',
    });
  });

  it('should be the correct query props', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: true,
        trainingCategories: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCategoriesQueryOptions.props(data);
    const fetchMoreResult = props.fetchMore();

    expect(props).toMatchSnapshot();
    expect(fetchMore).toBeCalledWith({ variables: { offset: 0 }, updateQuery });
    expect(fetchMoreResult).toEqual('application of fetchMore');
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        trainingCategories: [1, 2],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result', () => {
      const previousResult = {
        trainingCategoriesWithCourses: [1, 2],
      };
      const trainingCategoriesWithCourses = [3, 4];

      const result = updateQuery(previousResult, {
        fetchMoreResult: { trainingCategoriesWithCourses },
      });

      expect(result).toEqual({
        trainingCategoriesWithCourses: [1, 2, 3, 4],
      });
    });
  });
});
