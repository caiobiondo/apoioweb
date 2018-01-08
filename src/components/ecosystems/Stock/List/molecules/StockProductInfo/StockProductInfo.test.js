import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StockProductInfo from './StockProductInfo';

describe('StockProductInfo', () => {
  it('should render the stock product info', () => {
    const renderer = new ShallowRenderer();
    const product = {
      productImage: 'an image',
      productName: 'name',
      productCode: 123,
    };

    renderer.render(<StockProductInfo product={product} />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });
});
