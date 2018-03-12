import React from 'react';
import { render } from 'enzyme';
import { CourseContent } from './CourseContent';

describe('CourseContent', () => {
  it('should render a player with the course content', () => {
    // given
    const props = {
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
    };

    // when
    const result = render(<CourseContent {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
