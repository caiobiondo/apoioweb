import React from 'react';
import { render, mount, shallow } from 'enzyme';
import { CourseContent } from './CourseContent';

const client = {
  writeFragment: options => `writeFragment ${options}`,
  readQuery: options => `readQuery ${options}`,
  writeQuery: options => `writeQuery ${options}`,
};

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
        stoppedAt: 123,
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
      client,
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
    it('correctly defined started state', done => {
      // given
      // when
      const { props } = setup({ loading: false });

      const result = mount(<CourseContent {...props} />);
      result.setState(
        {
          course: { ...props.course, status: 'started' },
          mutationStatus: 'initialized',
        },
        () => {
          result.instance().defineVideoCourseStatus();
          done();
        },
      );

      // then
      expect(props.mutate).toBeCalledWith({
        variables: {
          input: {
            action: 'initialized',
            stoppedAt: props.course.stoppedAt,
          },
          sellerId: props.sellerId,
          courseId: props.course.id,
        },
      });
    });

    it('correctly defined final paused state', done => {
      // given
      // when
      const { props } = setup({ loading: false });

      const result = mount(<CourseContent {...props} />);
      result.setState(
        {
          course: { ...props.course, status: 'paused' },
          mutationStatus: 'paused',
        },
        () => {
          result.instance().defineVideoCourseStatus();
          done();
        },
      );

      // then
      expect(props.mutate).toBeCalledWith({
        variables: {
          input: {
            action: 'paused',
            stoppedAt: props.course.stoppedAt,
          },
          sellerId: props.sellerId,
          courseId: props.course.id,
        },
      });
    });

    it('correctly defined final ended state', done => {
      // given
      // when
      const { props } = setup({ loading: false });

      const result = mount(<CourseContent {...props} />);
      result.setState(
        {
          course: { ...props.course, status: 'finished' },
          mutationStatus: 'terminated',
        },
        () => {
          result.instance().defineVideoCourseStatus();
          done();
        },
      );

      // then
      expect(props.mutate).toBeCalledWith({
        variables: {
          input: {
            action: 'terminated',
            stoppedAt: props.course.stoppedAt,
          },
          sellerId: props.sellerId,
          courseId: props.course.id,
        },
      });
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
