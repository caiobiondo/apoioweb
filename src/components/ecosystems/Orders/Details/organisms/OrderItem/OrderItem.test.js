import React from 'react';
import { shallow } from 'enzyme';
import OrderItem from './OrderItem';
import orderData from '../OrderDetailsData/__mocks__/orderData.json';

const setup = propOverrides => {
  const props = Object.assign(
    {
      intl: {
        formatCurrency: value => `formatedCurrency ${value}`,
        formatDate: value => `formatedDate`,
        formatNumber: value => `formatedNumber ${value}`,
        formatTime: value => `formatedTime`,
      },
      orderItem: orderData.order.itemEnviadoCaixa[0],
      importing: false,
    },
    propOverrides,
  );

  const result = shallow(<OrderItem {...props} />);

  return {
    props,
    result,
  };
};

describe('OrderItem', () => {
  it('renders order details item', () => {
    // given
    // when
    const { result } = setup();

    // then
    expect(result).toMatchSnapshot();
  });

  it('renders order details item (in importing mode)', () => {
    // given
    // when
    const { result } = setup({ importing: true });

    // then
    expect(result).toMatchSnapshot();
  });
});
