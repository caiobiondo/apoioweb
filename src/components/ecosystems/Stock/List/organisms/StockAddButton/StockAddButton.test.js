import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StockAddButton from './StockAddButton';

describe('StockAddButton', () => {
  it('should render a floating button with add order icon', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<StockAddButton />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
