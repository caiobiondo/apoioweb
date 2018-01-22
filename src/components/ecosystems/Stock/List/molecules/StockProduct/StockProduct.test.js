import React from 'react';
import StockProduct from './StockProduct';
import { shallow } from 'enzyme';

const setup = propOverrides => {
  const props = Object.assign(
    {
      product: {
        description: 'new product',
        name: 'new product',
        price: '10',
        productId: '1',
      },
    },
    propOverrides,
  );

  const result = shallow(<StockProduct {...props} />);

  return {
    props,
    result,
  };
};

describe('StockProduct', () => {
  it('renders correctly', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });
});
