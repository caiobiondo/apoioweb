import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { StockAddButton } from './StockAddButton';

describe('StockAddButton', () => {
  it('should render a floating button with plus icon', () => {
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
});
