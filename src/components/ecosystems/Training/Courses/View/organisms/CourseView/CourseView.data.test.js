import { CourseViewQuery, CourseViewQueryOptions } from './CourseView.data';

describe('CourseViewQuery', () => {
  it('should be the correct query', () => {
    expect(CourseViewQuery).toMatchSnapshot();
  });

  it('should be the correct query options', () => {
    const props = { user: { codigo: 1 }, courseId: 2 };

    const options = CourseViewQueryOptions.options(props);

    expect(options).toEqual({
      variables: {
        sellerId: 1,
        courseId: 2,
      },
      forceFetch: true,
    });
  });

  it('should be the correct query props', () => {
    const data = {
      data: {
        loading: true,
        course: {},
        refetch: jest.fn(),
      },
    };

    const props = CourseViewQueryOptions.props(data);

    expect(props).toMatchSnapshot();
  });
});
