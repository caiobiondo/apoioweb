import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CourseViewHeader from './CourseViewHeader';

describe('CourseViewHeader molecules', () => {
  it('should render a menu to training page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CourseViewHeader />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
