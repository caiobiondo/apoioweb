import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import CustomCardText from './CustomCardText';

describe('CustomCardText', () => {
  it('should render a custom card text', () => {
    const renderer = new ShallowRenderer();
    const color = '#fff';

    renderer.render(<CustomCardText color={color}>text</CustomCardText>);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
