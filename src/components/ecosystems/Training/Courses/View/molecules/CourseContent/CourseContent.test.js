import React from 'react';
import { render, mount, shallow } from 'enzyme';
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
          videoEmbed: '',
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
      refetch: jest.fn(),
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

  describe('when defineVideoCourseStatus', () => {
    it('correctly defined final hasStarted state', done => {
      // given
      // when
      const { props } = setup({ loading: false });

      const result = mount(<CourseContent {...props} />);
      result.setState({ hasStarted: true }, () => {
        result.instance().defineVideoCourseStatus();
        done();
      });

      // then
      expect(result.state('hasStarted')).toBe(false);
    });

    it('correctly defined final paused state', done => {
      // given
      // when
      const { props } = setup({ loading: false });

      const result = mount(<CourseContent {...props} />);
      result.setState({ paused: true }, () => {
        result.instance().defineVideoCourseStatus();
        done();
      });

      // then
      expect(result.state('paused')).toBe(false);
    });

    it('correctly defined final ended state', done => {
      // given
      // when
      const { props } = setup({ loading: false });

      const result = mount(<CourseContent {...props} />);
      result.setState({ ended: true }, () => {
        result.instance().defineVideoCourseStatus();
        done();
      });

      // then
      expect(result.state('ended')).toBeTruthy();
    });

    it('shows evaluation modal', done => {
      // given
      const params = {
        course: {
          id: 1,
          title: '',
          type: 'VIDEO',
          ratedByYou: 'false',
          courseContent: {
            video: '',
            videoEmbed: '',
          },
          thumbnail: '',
        },
        loading: false,
      };
      // when
      const { props } = setup(params);

      const result = shallow(<CourseContent {...props} />);

      result.setState({ ended: true }, () => {
        result.instance().defineVideoCourseStatus();
        done();
      });

      // then
      expect(result.find('Apollo(Apollo(CourseEvaluation))').exists()).toBeTruthy();
    });
  });
});
