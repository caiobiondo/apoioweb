import React from 'react';
import { TrainingCourse } from './TrainingCourse';
import { shallow } from 'enzyme';

const setup = propOverrides => {
  const intl = {
    formatMessage: value => `formatedMessage ${value}`,
  };

  const props = Object.assign(
    {
      course: {
        title: 'new course',
        description: 'new course description',
        durationInSeconds: 1234,
        stoppedAt: 12,
        views: 12,
        dateUpload: '2017-04-20T00:00:00.000Z',
        type: 'VIDEO',
        status: 'completed',
      },
      intl,
    },
    propOverrides,
  );

  const result = shallow(<TrainingCourse {...props} />);

  return {
    props,
    result,
  };
};

describe('TrainingCourse', () => {
  it('renders correctly', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  describe('when type HTML5', () => {
    it('renders correctly', () => {
      // given
      // when
      const { result } = setup({
        course: {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: null,
          dateUpload: '2017-04-20T00:00:00.000Z',
          stoppedAt: null,
          views: 12,
          type: 'HTML5',
          status: 'completed',
        },
      });

      // then
      expect(result).toMatchSnapshot();
    });
  });

  describe('when status started', () => {
    it('renders correctly', () => {
      // given
      // when
      const { result } = setup({
        course: {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          dateUpload: '2017-04-20T00:00:00.000Z',
          stoppedAt: 12,
          views: 12,
          type: 'VIDEO',
          status: 'started',
        },
      });

      // then
      expect(result).toMatchSnapshot();
    });
  });
});
