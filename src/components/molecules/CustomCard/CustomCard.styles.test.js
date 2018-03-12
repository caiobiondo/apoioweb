import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Wrapper, Border, Content, cardStyle } from './CustomCard.styles';

describe('Wrapper', () => {
  it('should render a wrapper', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Wrapper />);
    expect(tree).toMatchSnapshot();
  });

  it('should render a border', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Border color="#fff" />);
    expect(tree).toMatchSnapshot();
  });

  it('should render a content', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Content />);
    expect(tree).toMatchSnapshot();
  });

  it('should be the correct card style', () => {
    expect(cardStyle).toMatchSnapshot();
  });
});
