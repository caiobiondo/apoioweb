import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Wrapper } from './CustomerButton.styles';

describe('CustomerButton Styles', () => {
  it('should not include transform into Wrapper style', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Wrapper remove={false} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should include transform into Wrapper style', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Wrapper remove={true} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
