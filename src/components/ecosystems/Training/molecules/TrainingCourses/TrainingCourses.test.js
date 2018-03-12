import React from 'react';
import TrainingCourses from './TrainingCourses';
import { shallow } from 'enzyme';

const setup = propOverrides => {
  const props = Object.assign(
    {
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
        },
        {
          title: 'new course',
          description: 'new course description',
          durationInSeconds: 1234,
          stoppedAt: 12,
          views: 12,
          dateUpload: '2017-04-20T00:00:00.000Z',
          type: 'HTML5',
          status: 'finished',
        },
      ],
      renderMenuItems: jest.fn(),
    },
    propOverrides,
  );

  const result = shallow(<TrainingCourses {...props} />);

  return {
    props,
    result,
  };
};

describe('TrainingCourses', () => {
  it('renders correctly', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });
});
