import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import { shallow } from 'enzyme';
import StockList from './index';

const baseState = {
  empty: false,
  loading: true,
  productSearch: '',
};

describe('StockList Ecosystem', () => {
  it('should render the stock list page', () => {
    const renderer = new ShallowRenderer();

    renderer.render(<StockList />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should update product search filter on state', () => {
    const productSearch = 'a name';
    const expectedState = { ...baseState, productSearch };

    const result = shallow(<StockList />);
    const instance = result.instance();
    instance.onSearch(productSearch);

    expect(instance.state).toEqual(expectedState);
  });

  it('should update empty and loading state', () => {
    const expectedState = { ...baseState, empty: true, loading: false };

    const result = shallow(<StockList />);
    const instance = result.instance();
    instance.onLoadFinished(true, false);

    expect(instance.state).toEqual(expectedState);
  });
});
