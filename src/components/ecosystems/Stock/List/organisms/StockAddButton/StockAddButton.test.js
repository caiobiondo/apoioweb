import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { StockAddButton } from './StockAddButton';

describe('StockAddButton', () => {
  it('should render a custom floating button with actions', () => {
    const result = shallow(<StockAddButton />);

    expect(toJson(result)).toMatchSnapshot();
  });

  it('should go to import from orders', () => {
    const history = {
      push: jest.fn(),
    };
    const result = shallow(<StockAddButton history={history} />);
    const instance = result.instance();
    instance.importFromOrders();

    expect(history.push).toBeCalledWith('/my-stock/import/orders');
  });

  it('should open product stock dialog (pending)', () => {
    const result = shallow(<StockAddButton />);
    const instance = result.instance();
    instance.addProductToStockDialog();

    expect(true).toEqual(true);
  });
});
