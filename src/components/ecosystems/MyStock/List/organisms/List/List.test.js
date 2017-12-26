import React from 'react';
import { shallow } from 'enzyme';
import List from './List';

describe('Stock Product List', () => {
  it('should render the stock product list page', () => {
    expect(shallow(<List />)).toMatchSnapshot();
  });
});
