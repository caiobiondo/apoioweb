import React from 'react';
import { shallow } from 'enzyme';
import { TrainingCoursesList } from './TrainingCoursesList';

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };

  const props = Object.assign(
    {
      user: {
        codigo: 1234,
      },
      courses: [
        {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          stoppedAt: 12,
          views: 12,
          dateUpload: '2017-04-20T00:00:00.000Z',
          type: 'VIDEO',
          status: 'started',
          isfavorite: true,
        },
        {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          stoppedAt: 12,
          views: 12,
          dateUpload: '2017-04-20T00:00:00.000Z',
          type: 'HTML5',
          status: 'completed',
          isfavorite: false,
        },
      ],
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
      refetch: jest.fn(),
      onLoadFinished: jest.fn(),
      intl,
    },
    propOverrides,
  );

  const result = shallow(<TrainingCoursesList {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Courses List', () => {
  it('renders correctly when the list is not empty', () => {
    // given
    // when
    const { result } = setup({ fetchMore: jest.fn(), loading: false });

    // then
    expect(result).toMatchSnapshot();
  });

  it('should notify onLoadFinished callback when not loading', () => {
    // given
    // when
    const { result, props } = setup({
      fetchMore: jest.fn(),
      loading: false,
    });
    result.instance().componentWillReceiveProps({ loading: false, courses: props.courses });

    // then
    expect(props.onLoadFinished).toBeCalledWith(false, false);
  });

  describe('when handlingMenuItemClick', () => {
    it('correctly call mutation', () => {
      // given
      const menuItem = {
        props: {
          value: 'favorite',
          course: {
            id: 1,
            title: 'new course',
            description: 'new course description',
            durationInSeconds: 1234,
            stoppedAt: 12,
            views: 12,
            dateUpload: '2017-04-20T00:00:00.000Z',
            type: 'HTML5',
            status: 'completed',
            isfavorite: false,
          },
        },
      };

      // when
      const { result, props } = setup({ fetchMore: jest.fn(), loading: false });
      result.instance().handleMenuItemClick(null, menuItem);

      // then
      expect(props.mutate).toBeCalled();
    });
  });
});