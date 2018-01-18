import React from 'react';
import StockAddButton from './StockAddButton';
import { shallow } from 'enzyme';

describe('StockAddButton', () => {
  it('should render a custom floating button with actions', () => {
    const result = shallow(<StockAddButton />);

    expect(result).toMatchSnapshot();
  });
});
