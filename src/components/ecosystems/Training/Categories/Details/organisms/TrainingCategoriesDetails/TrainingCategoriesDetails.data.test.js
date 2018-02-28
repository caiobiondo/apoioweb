import {
  TrainingCategoriesDetailsQuery,
  TrainingCategoriesDetailsOptions,
  updateQuery,
} from './TrainingCategoriesDetails.data';

describe('TrainingCategoriesDetailsQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCategoriesDetailsQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 }, categoryId: 1 };

    const options = TrainingCategoriesDetailsOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: 1,
        categoryId: 1,
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
        trainingCoursesByCategory: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCategoriesDetailsOptions.props(data);
    const fetchMoreResult = props.fetchMore();

    expect(props).toMatchSnapshot();
    expect(fetchMore).toBeCalledWith({ variables: { offset: 0 }, updateQuery });
    expect(fetchMoreResult).toEqual('application of fetchMore');
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        trainingCoursesByCategory: [1, 2],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result', () => {
      const previousResult = {
        trainingCoursesByCategory: [1, 2],
      };
      const trainingCoursesByCategory = [3, 4];

      const result = updateQuery(previousResult, {
        fetchMoreResult: { trainingCoursesByCategory },
      });

      expect(result).toEqual({
        trainingCoursesByCategory: [1, 2, 3, 4],
      });
    });
  });
});
