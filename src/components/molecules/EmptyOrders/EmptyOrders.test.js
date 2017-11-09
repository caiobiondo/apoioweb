import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EmptyOrders from './EmptyOrders';

describe('EmptyOrders', () => {
  it('should render a empty orders indicator', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<EmptyOrders />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
