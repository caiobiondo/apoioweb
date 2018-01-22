import React from 'react';
import { StockAddButton } from './StockAddButton';
import { shallow } from 'enzyme';

describe('StockAddButton', () => {
  it('should render a custom floating button with actions', () => {
    const result = shallow(<StockAddButton />);

    expect(result).toMatchSnapshot();
  });

  it("opens 'add product to stock dialog'", () => {
    // given
    const fn = jest.fn();
    const result = shallow(<StockAddButton openAddStockModal={fn} />);

    // when
    result.instance().addProductToStockDialog();

    // then
    expect(fn).toBeCalled();
  });
});
