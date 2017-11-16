import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import Orders from './Orders';

describe('Orders', () => {
  it('should render the orders page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<Orders />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the orders page without scrolled container (not loading)', () => {
    const result = shallow(<Orders />);
    const instance = result.instance();

    instance.onLoadFinished();

    expect(instance.state).toEqual({ loading: false });
  });
});
