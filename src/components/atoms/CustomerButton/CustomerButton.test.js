import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CustomerButton from './CustomerButton';

describe('CustomerButton', () => {
  it('should render a floating button with add order icon', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CustomerButton />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
