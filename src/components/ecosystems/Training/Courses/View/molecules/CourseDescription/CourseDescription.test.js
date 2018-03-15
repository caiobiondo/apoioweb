import React from 'react';
import { shallow } from 'enzyme';
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
    };

    // when
    const result = shallow(<CourseDescription {...props} />);

    // then
    expect(result).toMatchSnapshot();
  });
});
