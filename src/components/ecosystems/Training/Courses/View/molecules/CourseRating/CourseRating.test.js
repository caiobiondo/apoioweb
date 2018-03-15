import React from 'react';
import { shallow } from 'enzyme';
import { CourseRating } from './CourseRating';

describe('CourseRating', () => {
  it('should render course rating', () => {
    // given
    const props = {
      course: {
        generalRating: 4,
        durationInSeconds: 60,
      },
    };

    // when
    const result = shallow(<CourseRating {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
