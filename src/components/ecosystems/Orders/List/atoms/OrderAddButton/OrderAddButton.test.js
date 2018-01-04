import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import OrderAddButton from './OrderAddButton';

describe('OrderAddButton', () => {
  it('should render a floating button with add order icon', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<OrderAddButton />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
