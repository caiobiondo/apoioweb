import React from 'react';
import { shallow } from 'enzyme';
import { CourseView } from './CourseView';

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };

  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
      course: {
        id: 1,
        title: 'new course',
        description: 'new course description',
        durationInSeconds: 1234,
        stoppedAt: 12,
        views: 12,
        dateUpload: '2017-04-20T00:00:00.000Z',
        type: 'VIDEO',
        status: 'started',
        isfavorite: true,
        relatedCourses: [],
      },
      mutate: jest.fn().mockReturnValue(
        Promise.resolve({
          data: {
            updateCourse: {
              status: true,
              message: 'success',
            },
          },
        }),
      ),
      onLoadFinished: jest.fn(),
      refetch: jest.fn(),
      intl,
    },
    propOverrides,
  );

  const result = shallow(<CourseView {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Course View', () => {
  it('renders correctly when loading', () => {
    // given
    // when
    const { result } = setup({ loading: true, course: null });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the course is not defined', () => {
    // given
    // when
    const { result } = setup({ loading: false, course: {} });

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders correctly when the course is defined', () => {
    // given
    // when
    const { result } = setup({ loading: false });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    // given
    // when
    const { result, props } = setup({
      loading: false,
    });
    result.instance().componentWillReceiveProps({ loading: false, course: props.course });

    // then
    expect(props.onLoadFinished).toBeCalledWith(false, false);
  });

  describe('when handleMyListClick', () => {
    it('correctly call mutation', () => {
      // given

      // when
      const { result, props } = setup({ loading: false });
      result.instance().handleMyListClick();

      // then
      expect(props.mutate).toBeCalled();
    });
  });
});
