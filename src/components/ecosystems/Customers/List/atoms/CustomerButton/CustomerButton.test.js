import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CustomerButton from './CustomerButton';

describe('CustomerButton', () => {
  it('should render a floating button with add icon', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CustomerButton />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render a floating button with remove icon', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<CustomerButton remove={true} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
