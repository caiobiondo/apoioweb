import React from 'react';
import { shallow } from 'enzyme';
import { StockProductQuantity } from './StockProductQuantity';

describe('Stock Product Quantity', () => {
  it('should render correctly', () => {
    const product = {
      id: 1,
      productCode: 'Code',
      stockQuantity: 10,
    };
    const result = shallow(<StockProductQuantity product={product} />);
    expect(result).toMatchSnapshot();
  });
});
