import React from 'react';
import { render, mount } from 'enzyme';
import { CourseContent } from './CourseContent';

const setup = propOverrides => {
  const props = Object.assign(
    {
      course: {
        id: 1,
        title: '',
        type: 'VIDEO',
        ratedByYou: 'true',
        courseContent: {
          video: '',
        },
        thumbnail: '',
      },
      sellerId: 123,
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
    },
    propOverrides,
  );

  return {
    props,
  };
};

describe('CourseContent', () => {
  it('should render a player with the course content', () => {
    // given
    const { props } = setup();

    // when
    const result = render(<CourseContent {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });

  describe('when handleStateChange', () => {
    it('correctly call mutation', () => {
      // given
      const state = {
        ended: true,
        hasStarted: true,
        paused: true,
        currentTime: 1,
      };

      // when
      const { props } = setup({ loading: false });
      const result = mount(<CourseContent {...props} />);

      result.instance().handleStateChange(state, null);

      // then
      expect(props.mutate).toBeCalled();
    });

    it('correctly call mutation and trow an error', () => {
      // given
      const state = {
        ended: false,
        hasStarted: true,
        paused: true,
        currentTime: 1,
      };
      // when
      const { props } = setup({
        loading: false,
        mutate: jest.fn().mockReturnValue(
          Promise.reject({
            data: {
              updateCourse: {
                status: false,
                message: 'error',
              },
            },
          }),
        ),
      });

      const result = mount(<CourseContent {...props} />);

      result.instance().handleStateChange(state, null);

      // then
      expect(props.mutate).toBeCalled();
    });
  });
});
