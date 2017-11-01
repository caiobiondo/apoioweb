import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Wrapper } from './CustomCardSection.styles';

describe('Wrapper', () => {
  it('should render a wrapper', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(
      <Wrapper justifyContent="flex-start" alignItems="space-between" />,
    );
    expect(tree).toMatchSnapshot();
  });
});
