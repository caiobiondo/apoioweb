import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
  updateQuery,
} from './TrainingCourses.data';

describe('TrainingCoursesQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCoursesQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 }, status: null, favorite: null };

    const options = TrainingCoursesQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: 1,
        limit: 10,
        offset: 0,
        status: null,
        favorite: null,
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
        courses: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCoursesQueryOptions.props(data);
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
        courses: [],
        fetchMore: fetchMore,
      },
    };

    const props = TrainingCoursesQueryOptions.props(data);
    props.fetchMore();

    expect(fetchMore).not.toBeCalled();
  });

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        courses: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result on items array', () => {
      const previousResult = {
        courses: {
          items: [{ id: 1 }, { id: 2 }],
        },
      };
      const courses = {
        items: [{ id: 3 }, { id: 4 }],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { courses } });

      expect(result.courses.items).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]);
    });

    it('should return the updated value of hasNextPage', () => {
      const previousResult = {
        courses: {
          items: [],
          hasNextPage: true,
        },
      };
      const courses = {
        items: [],
        hasNextPage: false,
      };

      const result = updateQuery(previousResult, { fetchMoreResult: { courses } });

      expect(result.courses.hasNextPage).toBeFalsy();
    });
  });
});
