import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import EmptyCustomers from './EmptyCustomers';

describe('EmptyCustomers', () => {
  it('should render a empty orders indicator', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<EmptyCustomers />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
