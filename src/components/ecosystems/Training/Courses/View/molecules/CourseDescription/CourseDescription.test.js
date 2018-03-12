import React from 'react';
import { render } from 'enzyme';
import { CourseDescription } from './CourseDescription';

describe('CourseDescription', () => {
  it('should render course description and title', () => {
    // given
    const props = {
      course: {
        id: 1,
        title: 'Title',
        description: 'Description',
      },
      sellerId: 123,
    };

    // when
    const result = render(<CourseDescription {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
