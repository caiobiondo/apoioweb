import React from 'react';
import StockAddButton from './StockAddButton';
import { shallow } from 'enzyme';

describe('StockAddButton', () => {
  it('should render a custom floating button with actions', () => {
    const result = shallow(<StockAddButton />);

    expect(result).toMatchSnapshot();
  });

  it('should open product stock dialog (pending)', () => {
    const result = shallow(<StockAddButton />);
    const instance = result.instance();
    instance.addProductToStockDialog();

    expect(instance).toMatchSnapshot();
  });
});
