import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import MyScore from './MyScore';

describe('MyScore', () => {
  it('should render the my score page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<MyScore />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
