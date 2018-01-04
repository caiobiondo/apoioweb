import React from 'react';
import { shallow } from 'enzyme';
import OrderInfo from './OrderInfo';
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

  const result = shallow(<OrderInfo {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderInfo', () => {
  it('renders order details info', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders order details info (in importing mode - collapsed)', () => {
    // given
    // when
    const { result } = setup({ importing: true });

    // then
    expect(result).toMatchSnapshot();
  });
});
