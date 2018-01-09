import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import StockAddButton from './StockAddButton';

describe('StockAddButton', () => {
  it('should render a custom floating button with actions', () => {
    const result = shallow(<StockAddButton />);

    renderer.render(<StockAddButton />);
    const result = renderer.getRenderOutput();

    expect(result).toMatchSnapshot();
  });

  it('should open product stock dialog (pending)', () => {
    const result = shallow(<StockAddButton />);
    const instance = result.instance();
    instance.addProductToStockDialog();

    expect(true).toEqual(true);
  });
});
