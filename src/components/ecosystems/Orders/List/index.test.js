import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import Orders from './index';

describe('Orders', () => {
  it('should render the orders page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Orders />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the orders page with scrolled container (not loading)', () => {
    const result = shallow(<Orders />);
    const instance = result.instance();

    instance.onLoadFinished(false, false);

    expect(instance.state).toEqual({ empty: false, loading: false });
  });

  it('should render the orders page without scrolled container (empty)', () => {
    const result = shallow(<Orders />);
    const instance = result.instance();

    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual({ empty: true, loading: false });
  });
});
