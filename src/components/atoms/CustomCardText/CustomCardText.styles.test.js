import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Wrapper } from './CustomCardText.styles';

describe('Wrapper', () => {
  it('should render a wrapper', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Wrapper color="#fff" />);
    expect(tree).toMatchSnapshot();
  });
});
