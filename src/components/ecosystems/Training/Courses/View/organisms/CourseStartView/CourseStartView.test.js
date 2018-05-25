import React from 'react';
import { shallow } from 'enzyme';
import { CourseStartView } from './CourseStartView';
import { ROUTE_PREFIX } from 'config';

jest.mock('config', () => ({
  PUBLIC_URL: 'http://test.com',
  FIRST_STEPS_COURSE_ID: 999,
}));

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };
  const client = {
    writeFragment: options => `writeFragment ${options}`,
    readQuery: options => `readQuery ${options}`,
    writeQuery: options => `writeQuery ${options}`,
  };
  global.dataLayer = {
    push: jest.fn(),
  };
  global.open = jest.fn().mockReturnValue({ addEventListener: jest.fn() });

  const props = Object.assign(
    {
      user: {
        codigo: 1234,
        estrutura: {
          ciclo: [
            {
              numero: 1,
            },
          ],
        },
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
        ratedByYou: 'false',
      },
      history: { push: jest.fn() },
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
      client,
    },
    propOverrides,
  );

  const result = shallow(<CourseStartView {...props} />);

  return {
    props,
    result,
  };
};

describe('Training Course Start View', () => {
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

  describe('when handleTrainingClick', () => {
    it('correctly call mutation', () => {
      // given

      // when
      const { result, props } = setup({ loading: false });
      result.instance().handleTrainingClick('initialized')();

      // then
      expect(props.mutate).toBeCalled();
    });

    describe('when finishing a training course', () => {
      it('asks for a course evaluation', async () => {
        // given
        const course = {
          id: 1,
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          stoppedAt: 12,
          views: 12,
          dateUpload: '2017-04-20T00:00:00.000Z',
          type: 'VIDEO',
          status: 'pending',
          isfavorite: true,
          relatedCourses: [],
          ratedByYou: 'false',
        };

        // when
        const { result } = setup({ loading: false, course });
        await result.instance().handleTrainingClick('terminated')();

        // then
        expect(result.instance().canEvaluate()).toBeTruthy();
      });

      describe('when course was already evaluated before', () => {
        it('does not ask for a course evaluation', async () => {
          // given
          const courseRatedByYou = {
            id: 1,
            title: 'new course',
            description: 'new course description',
            durationInSeconds: 1234,
            stoppedAt: 12,
            views: 12,
            dateUpload: '2017-04-20T00:00:00.000Z',
            type: 'VIDEO',
            status: 'finished',
            isfavorite: true,
            relatedCourses: [],
            ratedByYou: 'true',
          };

          // when
          const { result } = setup({ loading: false, course: courseRatedByYou });
          await result.instance().handleTrainingClick('terminated')();

          // then
          expect(result.instance().canEvaluate()).toBeFalsy();
        });
      });
    });

    describe('when starting/resuming a training course', () => {
      describe('when course type is web', () => {
        it('opens a new tab for a non static course', async () => {
          // given
          const course = {
            id: 1,
            title: 'new course',
            description: 'new course description',
            durationInSeconds: 1234,
            stoppedAt: 12,
            views: 12,
            dateUpload: '2017-04-20T00:00:00.000Z',
            type: 'WEB',
            status: 'pending',
            isfavorite: true,
            relatedCourses: [],
            ratedByYou: 'false',
            courseContent: {
              web: 'google.com',
              video: null,
              html5: null,
            },
          };

          // when
          const { result } = setup({ loading: false, course });
          await result.instance().handleTrainingClick('initialized')();

          // then
          expect(global.open).toBeCalledWith(course.courseContent.web, '_blank');
        });

        // it('opens a new tab with a local url for a static course', async () => {
        //   // given
        //   const mockCourseName = 'TestCourse';
        //   const course = {
        //     id: 999,
        //     title: 'new course 1',
        //     description: 'new course description 1',
        //     durationInSeconds: 1234,
        //     stoppedAt: 12,
        //     views: 12,
        //     dateUpload: '2017-04-20T00:00:00.000Z',
        //     type: 'WEB',
        //     status: 'pending',
        //     isfavorite: true,
        //     relatedCourses: [],
        //     ratedByYou: 'false',
        //     courseContent: {
        //       web: 'google.com',
        //       video: null,
        //       html5: null,
        //     },
        //   };
        //   const expectedUrl = `${process.env.PUBLIC_URL}/trainingCourses/${mockCourseName}`;

        //   // when
        //   const { result } = setup({ loading: false, course });
        //   await result.instance().handleTrainingClick('initialized')();

        //   // then
        //   expect(global.open).toBeCalledWith(expectedUrl, '_blank');
        // });
      });

      describe('when course type is video', () => {
        it('redirects to course details page', async () => {
          // given
          const course = {
            id: 1,
            title: 'new course',
            description: 'new course description',
            durationInSeconds: 1234,
            stoppedAt: 12,
            views: 12,
            dateUpload: '2017-04-20T00:00:00.000Z',
            type: 'VIDEO',
            status: 'pending',
            isfavorite: true,
            relatedCourses: [],
            ratedByYou: 'false',
            courseContent: {
              web: null,
              video: 'youtube.com',
              html5: null,
            },
          };

          // when
          const { result, props } = setup({ loading: false, course });
          await result.instance().handleTrainingClick('initialized')();

          // then
          expect(props.history.push).toBeCalledWith(
            `${ROUTE_PREFIX}/training/courses/${course.id}/video`,
          );
        });
      });
    });
  });
});
