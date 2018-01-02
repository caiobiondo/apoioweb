import React from 'react';
import { shallow } from 'enzyme';
import OrderItems from './OrderItems';
import orderData from '../../__mocks__/orderData.json';

const setup = propOverrides => {
  const props = Object.assign(
    {
      intl: {
        formatCurrency: value => `formatedCurrency ${value}`,
        formatDate: value => `formatedDate`,
        formatNumber: value => `formatedNumber ${value}`,
        formatTime: value => `formatedTime`,
      },
      order: orderData.order,
      importing: false,
    },
    propOverrides,
  );

  const result = shallow(<OrderItems {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderItems', () => {
  it('renders order details items list', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders order details items list (in importing mode)', () => {
    // given
    // when
    const { result } = setup({ importing: true });

    // then
    expect(result).toMatchSnapshot();
  });
});
