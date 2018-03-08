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
    const props = { user: { codigo: 1 } };

    const options = TrainingCategoriesDetailsOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: 1,
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

  it('should not call fetchMore when the data is still loading', () => {
    const fetchMore = jest.fn().mockReturnValue('application of fetchMore');
    const data = {
      data: {
        loading: true,
        trainingCoursesByCategory: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCategoriesDetailsOptions.props(data);
    props.fetchMore();

    expect(fetchMore).not.toBeCalled();
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        trainingCoursesByCategory: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result on items array', () => {
      const previousResult = {
        trainingCoursesByCategory: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };
      const trainingCoursesByCategory = {
        items: [{ id: 3 }, { id: 4 }],
      };

      const result = updateQuery(previousResult, {
        fetchMoreResult: { trainingCoursesByCategory },
      });

      expect(result.trainingCoursesByCategory.items).toEqual([
        { id: 1 },
        { id: 2 },
        { id: 3 },
        { id: 4 },
      ]);
    });

    it('should return the updated value of hasNextPage', () => {
      const previousResult = {
        trainingCoursesByCategory: {
          items: [],
          hasNextPage: true,
        },
      };
      const trainingCoursesByCategory = {
        items: [],
        hasNextPage: false,
      };

      const result = updateQuery(previousResult, {
        fetchMoreResult: { trainingCoursesByCategory },
      });

      expect(result.trainingCoursesByCategory.hasNextPage).toBeFalsy();
    });
  });
});
