import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { Main, OrderAddButtonContainer } from './Orders.styles';

describe('Orders Styles', () => {
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

  it('should render the order add button container with 20% from bottom', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<OrderAddButtonContainer empty={true} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render the order add button container with 10% from bottom', () => {
    const renderer = new ShallowRenderer();
    const tree = renderer.render(<OrderAddButtonContainer empty={false} />);
    expect(tree).toMatchSnapshot();
  });
});
