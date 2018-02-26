import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PageMenu from './PageMenu';

describe('PageMenu atom', () => {
  it('should render a menu to training page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<PageMenu />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
