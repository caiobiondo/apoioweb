import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import StockImportOrdersList from './List';

describe('StockImportOrdersList', () => {
  it('should render the stock import orders page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<StockImportOrdersList />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should render the stock import orders page with scrolled container (not loading)', () => {
    const result = shallow(<StockImportOrdersList />);
    const instance = result.instance();

    instance.onLoadFinished(false, false);

    expect(instance.state).toEqual({ empty: false, loading: false });
  });

  it('should render the stock import orders page without scrolled container (empty)', () => {
    const result = shallow(<StockImportOrdersList />);
    const instance = result.instance();

    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual({ empty: true, loading: false });
  });
});
