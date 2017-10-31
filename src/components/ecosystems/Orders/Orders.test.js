import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import Orders from './Orders';

describe('Orders', () => {
  it('should render the orders page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Orders />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
