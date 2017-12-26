import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Main } from './index.styles';

describe('ActionButtonContainer Styles', () => {
  it('should render the main container with full container mixin applied', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Main loading={true} empty={false} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the main container with full container mixin applied', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Main loading={false} empty={true} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the main container with full container mixin applied', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Main loading={true} empty={true} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the main container without full container mixin applied', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<Main loading={false} empty={false} />);
    expect(tree).toMatchSnapshot();
  });
});
