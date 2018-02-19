import {
  TrainingCoursesQuery,
  TrainingCoursesQueryOptions,
  updateQuery,
} from './TrainingCoursesList.data';

xdescribe('TrainingCoursesQuery', () => {
  it('should be the correct query', () => {
    expect(TrainingCoursesQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 }, productSearch: 'search' };

    const options = TrainingCoursesQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        limit: 10,
        offset: 0,
        filter: 'search',
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

  describe('updateQuery', () => {
    it('should return the previous result', () => {
      const previousResult = {
        courses: [1, 2],
      };

      const result = updateQuery(previousResult, { fetchMoreResult: null });

      expect(result).toEqual(previousResult);
    });

    it('should return the merge from previous and fetchMore result', () => {
      const previousResult = {
        courses: [1, 2],
      };
      const courses = [3, 4];

      const result = updateQuery(previousResult, { fetchMoreResult: { courses } });

      expect(result).toEqual({
        courses: [1, 2, 3, 4],
      });
    });
  });
});
